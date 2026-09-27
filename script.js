(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const nav = $('#nav'), toggle = $('.nav-toggle'), links = $('#site-links');
  const setNav = () => nav.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', setNav, { passive: true }); setNav();
  if (toggle && links) {
    const close = () => { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); };
    toggle.addEventListener('click', () => { const open = links.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
    $$('a', links).forEach(link => link.addEventListener('click', close));
    addEventListener('keydown', event => { if (event.key === 'Escape' && links.classList.contains('open')) { close(); toggle.focus(); } });
  }

  const reveal = $$('.reveal');
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); revealObserver.unobserve(entry.target); } }), { threshold: .15, rootMargin: '0px 0px -60px 0px' });
  reveal.forEach(item => revealObserver.observe(item));
  const drawObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('drawn'); drawObserver.unobserve(entry.target); } }), { threshold: .35 });
  $$('#flow-row, #pipe-1, #pipe-2').forEach(item => drawObserver.observe(item));

  const track = $('#journey-track'), fill = $('#journey-fill'), steps = $$('.journey-step');
  const journey = () => { const rect = track.getBoundingClientRect(), p = Math.max(0, Math.min(1, (innerHeight * .85 - rect.top) / rect.height)); fill.style.width = `${p * 100}%`; steps.forEach((step, i) => step.classList.toggle('lit', p >= i / (steps.length - 1))); };
  addEventListener('scroll', journey, { passive: true }); journey();
  const traits = $$('#trait-row .trait');
  new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { traits.forEach((trait, i) => setTimeout(() => trait.classList.add('on'), reduced ? 0 : i * 140)); } }), { threshold: .5 }).observe($('#trait-row'));

  if (!window.THREE) return;
  const makeRenderer = (canvas, wrap, z) => { const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, 1, .1, 100), renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); camera.position.z = z; renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); const resize = () => { const w = wrap.clientWidth || 1, h = wrap.clientHeight || 1; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false); }; resize(); addEventListener('resize', resize); if (window.ResizeObserver) new ResizeObserver(resize).observe(wrap); addEventListener('load', resize); requestAnimationFrame(resize); return { scene, camera, renderer, resize }; };

  const sphereCanvas = $('#sphere-canvas');
  if (sphereCanvas) {
    const wrap = sphereCanvas.parentElement, { scene, camera, renderer } = makeRenderer(sphereCanvas, wrap, 7.5);
    const TEAL = 0x6fd8c9, TEAL_BRIGHT = 0xbdfff0;
    const globe = new THREE.Group(); scene.add(globe);

    // ---- graticule sphere (lat/long grid) + node sample points ----
    const R = 3, LAT_STEPS = 14, LON_STEPS = 18, SEG = 48;
    const nodePositions = [], lineGeoPositions = [];
    const pointOnSphere = (lat, lon) => {
      const phi = (90 - lat) * Math.PI / 180, theta = lon * Math.PI / 180;
      return new THREE.Vector3(R * Math.sin(phi) * Math.cos(theta), R * Math.cos(phi), R * Math.sin(phi) * Math.sin(theta));
    };
    for (let i = 1; i < LAT_STEPS; i++) {
      const lat = -90 + (180 / LAT_STEPS) * i; let prev = null;
      for (let j = 0; j <= SEG; j++) {
        const p = pointOnSphere(lat, (360 / SEG) * j);
        if (prev) lineGeoPositions.push(prev.x, prev.y, prev.z, p.x, p.y, p.z);
        prev = p; if (j % 3 === 0) nodePositions.push(p);
      }
    }
    for (let i = 0; i < LON_STEPS; i++) {
      const lon = (360 / LON_STEPS) * i; let prev = null;
      for (let j = 0; j <= SEG; j++) {
        const p = pointOnSphere(-90 + (180 / SEG) * j, lon);
        if (prev) lineGeoPositions.push(prev.x, prev.y, prev.z, p.x, p.y, p.z);
        prev = p;
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineGeoPositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: .28 });
    globe.add(new THREE.LineSegments(lineGeo, lineMat));

    // ---- dot sprite texture ----
    const dotTex = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const ctx = c.getContext('2d'), g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, 'rgba(200,255,245,1)');
      g.addColorStop(.35, 'rgba(111,216,201,.9)');
      g.addColorStop(1, 'rgba(111,216,201,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();

    const nodeCount = nodePositions.length;
    const nodeArr = new Float32Array(nodeCount * 3);
    nodePositions.forEach((p, i) => { nodeArr[i * 3] = p.x; nodeArr[i * 3 + 1] = p.y; nodeArr[i * 3 + 2] = p.z; });
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodeArr, 3));
    const nodeMat = new THREE.PointsMaterial({ size: .09, map: dotTex, transparent: true, depthWrite: false, color: TEAL, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    globe.add(new THREE.Points(nodeGeo, nodeMat));

    const core = new THREE.Mesh(new THREE.SphereGeometry(.55, 32, 32), new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: .55 }));
    const coreGlow = new THREE.Mesh(new THREE.SphereGeometry(.9, 32, 32), new THREE.MeshBasicMaterial({ color: TEAL, transparent: true, opacity: .08 }));
    globe.add(core, coreGlow);

    // invisible sphere used for pointer raycasting
    const hitSphere = new THREE.Mesh(new THREE.SphereGeometry(R * 1.02, 24, 24), new THREE.MeshBasicMaterial({ visible: false }));
    globe.add(hitSphere);

    // ---- travelling activation paths ----
    const MAX_PATHS = 5, pathLines = [];
    for (let i = 0; i < MAX_PATHS; i++) {
      const pGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      const pMat = new THREE.LineBasicMaterial({ color: TEAL_BRIGHT, transparent: true, opacity: 0 });
      const line = new THREE.Line(pGeo, pMat); globe.add(line);
      pathLines.push({ line, target: null, life: 0 });
    }

    let activeIndices = new Set(), lastActivate = 0;
    const activateNear = point => {
      const dists = [];
      for (let i = 0; i < nodeCount; i++) dists.push([nodePositions[i].distanceTo(point), i]);
      dists.sort((a, b) => a[0] - b[0]);
      const picked = dists.slice(0, 3).map(d => d[1]);
      activeIndices = new Set(picked);
      const now = performance.now();
      if (now - lastActivate > 260) {
        lastActivate = now;
        const slot = pathLines.find(p => p.life <= 0) || pathLines[0];
        slot.target = nodePositions[picked[0]].clone(); slot.life = 1;
      }
    };

    const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2(-10, -10);
    let hovering = false, targetRotY = 0, targetRotX = 0;
    const baseSpin = .0009;
    const setPointer = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };
    wrap.addEventListener('mousemove', e => {
      setPointer(e.clientX, e.clientY); hovering = true;
      targetRotY = mouse.x * .35; targetRotX = mouse.y * .2;
    });
    wrap.addEventListener('mouseleave', () => { hovering = false; activeIndices.clear(); });
    wrap.addEventListener('touchmove', e => {
      if (e.touches[0]) { setPointer(e.touches[0].clientX, e.touches[0].clientY); hovering = true; }
    }, { passive: true });

    let tick = 0;
    const animate = () => {
      if (!reduced) {
        tick += 1;
        globe.rotation.y += hovering ? baseSpin * 3.2 : baseSpin;
        globe.rotation.x += (targetRotX - globe.rotation.x) * .04;
        if (hovering) globe.rotation.y += targetRotY * .0015;

        const pulseSpeed = hovering ? .06 : .02;
        core.material.opacity = .55 + Math.sin(tick * pulseSpeed) * (hovering ? .25 : .08);
        coreGlow.scale.setScalar(1 + Math.sin(tick * pulseSpeed) * (hovering ? .18 : .05));

        if (hovering) {
          raycaster.setFromCamera(mouse, camera);
          const hit = raycaster.intersectObject(hitSphere)[0];
          if (hit) activateNear(globe.worldToLocal(hit.point.clone()));
        }

        nodeMat.size = .09 + (activeIndices.size > 0 ? .02 : 0) + (hovering ? Math.sin(tick * .1) * .005 : 0);
        pathLines.forEach(p => {
          if (p.life > 0 && p.target) {
            p.life -= .02;
            p.line.material.opacity = Math.max(p.life, 0) * .85;
            const attr = p.line.geometry.attributes.position;
            attr.setXYZ(0, 0, 0, 0); attr.setXYZ(1, p.target.x, p.target.y, p.target.z);
            attr.needsUpdate = true;
          } else {
            p.line.material.opacity = 0;
          }
        });
        lineMat.opacity += ((hovering ? .4 : .28) - lineMat.opacity) * .05;

        requestAnimationFrame(animate);
      }
      renderer.render(scene, camera);
    };
    animate();
    if (reduced) { globe.rotation.set(.15, .4, 0); renderer.render(scene, camera); }
  }

  {
    const stage = document.getElementById('stack-stage');
    const svg = document.getElementById('stack-lines');
    const nodesLayer = document.getElementById('stack-nodes');
    const pulsesLayer = document.getElementById('stack-pulses');
    const core = document.getElementById('stack-core');

    if (stage && svg && nodesLayer && pulsesLayer && core) {
      const SKILLS = [
        ['Agentic AI', 'Systems that plan, use tools, and act toward a goal.'],
        ['Generative AI', 'Models that create text, images, and structured outputs.'],
        ['LLMs', 'The reasoning core of modern AI systems.'],
        ['RAG', 'Grounding outputs in retrieved, up-to-date knowledge.'],
        ['Computer Vision', 'Models that understand visual data.'],
        ['LangGraph', 'Orchestrating multi-step, stateful agent workflows.'],
        ['Embeddings', 'Turning meaning into searchable vectors.'],
        ['APIs', 'Connecting models, tools, and services.'],
        ['AWS', 'Cloud infrastructure for AI systems.'],
        ['Docker', 'Packaging systems to run consistently.'],
        ['Vector Databases', 'Fast storage and retrieval for embeddings.'],
        ['PyTorch', 'Training and fine-tuning deep learning models.'],
        ['Python', 'The language connecting pipelines, models, and agents.']
      ];

      const infoK = document.querySelector('#stack-info .k');
      const infoV = document.querySelector('#stack-info .v');

      let cx = 0, cy = 0, radius = 0;
      const nodeEls = [], lineEls = [], pulseEls = [];

      function build() {
        nodesLayer.innerHTML = '';
        svg.innerHTML = '';
        pulsesLayer.innerHTML = '';
        nodeEls.length = 0; lineEls.length = 0; pulseEls.length = 0;

        const w = stage.clientWidth, h = stage.clientHeight;
        if (!w || !h) return;
        cx = w / 2; cy = h / 2;
        radius = Math.min(w, h) * 0.36;

        core.style.left = cx + 'px';
        core.style.top = cy + 'px';
        core.style.transform = 'translate(-50%,-50%)';
        core.style.position = 'absolute';

        const n = SKILLS.length;
        SKILLS.forEach(([label, desc], i) => {
          const angle = (-90 + (360 / n) * i) * Math.PI / 180;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);

          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', cx); line.setAttribute('y1', cy);
          line.setAttribute('x2', x); line.setAttribute('y2', y);
          line.classList.add('edge');
          line.dataset.index = i;
          svg.appendChild(line);
          lineEls.push(line);

          const node = document.createElement('button');
          node.type = 'button';
          node.className = 'node';
          node.textContent = label;
          node.setAttribute('aria-label', `Show ${label} details`);
          node.style.left = x + 'px';
          node.style.top = y + 'px';
          node.dataset.index = i;
          nodesLayer.appendChild(node);
          nodeEls.push(node);

          node.addEventListener('mouseenter', () => setActive(i));
          node.addEventListener('mouseleave', clearActive);
          node.addEventListener('focus', () => setActive(i));
          node.addEventListener('blur', clearActive);
          node.addEventListener('click', () => {
            setActive(i);
            if (infoK) infoK.textContent = label;
            if (infoV) infoV.textContent = desc;
          });

          if (!reduced) {
            const dx = x - cx, dy = y - cy;
            const pulse = document.createElement('div');
            pulse.className = 'pulse';
            pulse.style.left = cx + 'px';
            pulse.style.top = cy + 'px';
            pulse.style.setProperty('--dx', dx + 'px');
            pulse.style.setProperty('--dy', dy + 'px');
            const duration = 2.8 + (i % 5) * 0.45;
            const delay = (i * 0.55) % 3.2;
            pulse.style.animationDuration = duration + 's';
            pulse.style.animationDelay = delay + 's';
            pulsesLayer.appendChild(pulse);
            pulseEls.push(pulse);
          }
        });
      }

      function setActive(i) {
        stage.classList.add('has-active');
        nodeEls.forEach((el, idx) => el.classList.toggle('active', idx === i));
        lineEls.forEach((el, idx) => el.classList.toggle('active', idx === i));
        if (SKILLS[i]) {
          if (infoK) infoK.textContent = SKILLS[i][0];
          if (infoV) infoV.textContent = SKILLS[i][1];
        }
      }
      function clearActive() {
        stage.classList.remove('has-active');
        nodeEls.forEach(el => el.classList.remove('active'));
        lineEls.forEach(el => el.classList.remove('active'));
      }

      core.addEventListener('mouseenter', () => {
        stage.classList.remove('has-active');
        lineEls.forEach(el => { el.style.opacity = '0.7'; });
      });
      core.addEventListener('mouseleave', () => {
        lineEls.forEach(el => { el.style.opacity = ''; });
      });
      core.addEventListener('click', () => {
        clearActive();
        if (infoK) infoK.textContent = 'AI';
        if (infoV) infoV.textContent = 'The center everything else in this stack is built around.';
      });

      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(build, 120);
      });

      if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => {
          build();
        });
        ro.observe(stage);
      }

      build();
    }
  }
})();
