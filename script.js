(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const nav = $('#nav'), toggle = $('.nav-toggle'), links = $('#site-links');
  const setNav = () => nav.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', setNav, { passive: true }); setNav();
  if (toggle && links) {
    const close = () => { links.classList.remove('open'); nav.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); };
    toggle.addEventListener('click', () => { const open = links.classList.toggle('open'); nav.classList.toggle('menu-open', open); toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
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
  // Control pointer-driven interactions separately for globe (hero) and stack (logo orbit)
  const globeMouseEffects = true; // enable mouse interaction on the hero globe
  const stackMouseEffects = false; // disable pointer interactions on the logo orbit
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
    if (globeMouseEffects) {
      wrap.addEventListener('mousemove', e => {
        setPointer(e.clientX, e.clientY); hovering = true;
        targetRotY = mouse.x * .35; targetRotX = mouse.y * .2;
      });
      wrap.addEventListener('mouseleave', () => { hovering = false; activeIndices.clear(); });
      wrap.addEventListener('touchmove', e => {
        if (e.touches[0]) { setPointer(e.touches[0].clientX, e.touches[0].clientY); hovering = true; }
      }, { passive: true });
    }

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
        { label: 'AI', icon: null, desc: 'The intelligence layer that brings models, data, and application logic together.', category: 'Core Intelligence', role: 'Transforms model capabilities into useful application behavior.' },
        { label: 'LLMs', mark: 'LLM', desc: 'Large language models enable applications to understand instructions, generate responses, and work with contextual information.', category: 'Language and Reasoning', role: 'Provides language understanding and generation.' },
        { label: 'RAG', mark: 'RAG', desc: 'Connect language models to relevant external information to produce responses grounded in retrieved context.', category: 'Retrieval and Context', role: 'Supplies up-to-date, relevant context to models.' },
        { label: 'LangChain', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', desc: "Connect models, prompts, retrievers, tools, and external services into structured AI application workflows.", category: 'Orchestration', role: 'Orchestrates multi-step model interactions.' },
        { label: 'LangGraph', mark: 'LG', desc: 'Build multi-step AI workflows with explicit control flow, persistent state, and support for human intervention.', category: 'Workflow Control', role: 'Manages stateful, auditable workflows.' },
        { label: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', desc: 'The foundation for data processing, model integration, backend logic, automation, and AI application development.', category: 'Development', role: 'Primary development language and scripting.' },
        { label: 'Computer Vision', mark: 'CV', desc: 'Extract meaningful information from images and video through visual recognition, classification, and image understanding.', category: 'Visual Intelligence', role: 'Transforms pixels into structured information.' },
        { label: 'Vector DB', mark: 'VDB', desc: 'Store and search vector embeddings to retrieve semantically relevant information for knowledge-based AI applications.', category: 'Knowledge Retrieval', role: 'Provides semantic search for retrieval.' },
        { label: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', desc: 'Use cloud infrastructure and managed services to run, integrate, and scale applications.', category: 'Cloud Infrastructure', role: 'Hosts, scales, and integrates services.' },
        { label: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', desc: 'Package applications and their dependencies into consistent environments for development and deployment.', category: 'Deployment', role: 'Ensures consistent runtime environments.' },
        { label: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', desc: 'Develop neural networks, experiment with machine learning models, and build model-powered applications.', category: 'Model Development', role: 'Framework for model development and experimentation.' },
        { label: 'APIs', mark: '{}', desc: 'Connect AI capabilities with frontend interfaces, databases, external services, and other application components.', category: 'Integration', role: 'Exposes and composes system capabilities.' }
      ];

      const infoK = document.querySelector('#stack-info .k');
      const infoCategory = document.querySelector('#stack-info .category');
      const infoDesc = document.querySelector('#stack-info .info-desc');
      const infoRole = document.querySelector('#stack-info .info-role');

      const nodeEls = [];

      function build() {
        svg.innerHTML = '';
        pulsesLayer.innerHTML = '';
        nodeEls.length = 0;
        nodesLayer.innerHTML = '';
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        // use a single radius so nodes move in a perfect circle (no oval)
        // slightly larger radius for more breathing room like the reference
        const radius = Math.min(w, h) * 0.38;

        // draw subtle guiding rings in the SVG overlay
        if (svg) {
          svg.innerHTML = '';
          svg.setAttribute('width', String(w));
          svg.setAttribute('height', String(h));
          svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
          svg.style.position = 'absolute'; svg.style.left = '0'; svg.style.top = '0'; svg.style.pointerEvents = 'none';
          const cx = w / 2, cy = h / 2;
          const rx = radius, ry = Math.round(radius * 0.62);
          const ns = 'http://www.w3.org/2000/svg';
          const ring = document.createElementNS(ns, 'ellipse');
          ring.setAttribute('cx', String(cx)); ring.setAttribute('cy', String(cy));
          ring.setAttribute('rx', String(rx)); ring.setAttribute('ry', String(ry));
          ring.setAttribute('fill', 'none'); ring.setAttribute('stroke', 'rgba(95,245,230,0.08)');
          ring.setAttribute('stroke-width', '2'); ring.setAttribute('stroke-dasharray', '6 18');
          svg.appendChild(ring);
          const ring2 = document.createElementNS(ns, 'ellipse');
          ring2.setAttribute('cx', String(cx)); ring2.setAttribute('cy', String(cy));
          ring2.setAttribute('rx', String(Math.round(rx * 0.84))); ring2.setAttribute('ry', String(Math.round(ry * 0.84)));
          ring2.setAttribute('fill', 'none'); ring2.setAttribute('stroke', 'rgba(95,245,230,0.04)');
          ring2.setAttribute('stroke-width', '1.5'); ring2.setAttribute('stroke-dasharray', '4 20');
          svg.appendChild(ring2);
        }

        SKILLS.forEach(({ label, mark, icon, desc }, i) => {
          const angle = (360 / SKILLS.length) * i - 90;
          const rad = angle * Math.PI / 180;
          const node = document.createElement('button');
          node.type = 'button';
          node.className = 'orbit-card';
          node.innerHTML = icon
            ? `<span class="orbit-face"><span class="orbit-logo"><img src="${icon}" alt="" loading="lazy"></span><span class="orbit-name">${label}</span></span>`
            : `<span class="orbit-face"><span class="orbit-logo orbit-mark">${mark}</span><span class="orbit-name">${label}</span></span>`;
          node.setAttribute('aria-label', `Show ${label} details`);
          node.style.setProperty('--i', i);
          node.style.setProperty('--total', SKILLS.length);
          // compute pure circular tx/ty using a single radius
          node.style.setProperty('--tx', `${(Math.cos(rad) * radius).toFixed(1)}px`);
          node.style.setProperty('--ty', `${(Math.sin(rad) * radius).toFixed(1)}px`);
          node.style.setProperty('--depth', Math.sin(rad).toFixed(3));
          // explicit stacking so front-most nodes render above others
          node.style.zIndex = String(200 + Math.round(Math.sin(rad) * 100));
          node.dataset.index = i;
          nodesLayer.appendChild(node);
          nodeEls.push(node);

          // draw a small marker on the svg ring at this node position
          if (svg) {
            const cx = w / 2, cy = h / 2;
            const rx = radius, ry = Math.round(radius * 0.62);
            const mx = Math.round(cx + Math.cos(rad) * rx);
            const my = Math.round(cy + Math.sin(rad) * ry);
            const ns = 'http://www.w3.org/2000/svg';
            const dot = document.createElementNS(ns, 'circle');
            dot.setAttribute('cx', String(mx)); dot.setAttribute('cy', String(my));
            dot.setAttribute('r', '3'); dot.setAttribute('fill', 'rgba(95,245,230,0.85)'); dot.setAttribute('opacity', '0.9');
            svg.appendChild(dot);
          }

          if (stackMouseEffects) {
            node.addEventListener('mouseenter', () => setActive(i));
            node.addEventListener('mouseleave', clearActive);
          }
          // keep keyboard focus behaviour for accessibility
          node.addEventListener('focus', () => setActive(i));
          node.addEventListener('blur', clearActive);
          node.addEventListener('click', () => {
            setActive(i);
            if (infoK) infoK.textContent = label;
            if (infoV) infoV.textContent = desc;
          });

        });
      }

      function setActive(i) {
        stage.classList.add('has-active');
        nodeEls.forEach((el, idx) => el.classList.toggle('active', idx === i));
        const s = SKILLS[i];
        if (s) {
          if (infoK) infoK.textContent = s.label;
          if (infoCategory) infoCategory.textContent = s.category || '';
          if (infoDesc) infoDesc.textContent = s.desc || '';
          if (infoRole) infoRole.textContent = s.role || '';
        }
      }
      function clearActive() {
        stage.classList.remove('has-active');
        nodeEls.forEach(el => el.classList.remove('active'));
      }

      if (stackMouseEffects) {
        core.addEventListener('mouseenter', () => {
          stage.classList.add('tracking');
        });
        core.addEventListener('mouseleave', () => stage.classList.remove('tracking'));
      }
      core.addEventListener('click', () => {
        clearActive();
        setActive(0);
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
      // default selected node
      setTimeout(() => setActive(0), 80);
    }
  }
})();
