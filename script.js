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
  const makeRenderer = (canvas, wrap, z) => { const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, wrap.clientWidth / wrap.clientHeight, .1, 100), renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); camera.position.z = z; renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); const resize = () => { camera.aspect = wrap.clientWidth / wrap.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(wrap.clientWidth, wrap.clientHeight); }; resize(); addEventListener('resize', resize); return { scene, camera, renderer }; };

  const sphereCanvas = $('#sphere-canvas');
  if (sphereCanvas) {
    const wrap = sphereCanvas.parentElement, { scene, camera, renderer } = makeRenderer(sphereCanvas, wrap, 6.4), group = new THREE.Group(); scene.add(group);
    const count = innerWidth < 760 ? 90 : 170, points = [];
    for (let i = 0; i < count; i++) { const y = 1 - i / (count - 1) * 2, radius = Math.sqrt(1 - y * y), theta = Math.PI * (3 - Math.sqrt(5)) * i; points.push(new THREE.Vector3(Math.cos(theta) * radius * 2.3, y * 2.3, Math.sin(theta) * radius * 2.3)); }
    const pos = points.flatMap(p => [p.x, p.y, p.z]), dotGeo = new THREE.BufferGeometry(); dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); group.add(new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: 0x4d8dff, size: .045, transparent: true, opacity: .9 })));
    const linePos = []; points.forEach((point, a) => points.slice(a + 1).forEach(other => { if (point.distanceTo(other) < .62) linePos.push(point.x, point.y, point.z, other.x, other.y, other.z); })); const lineGeo = new THREE.BufferGeometry(); lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3)); group.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x294f9e, transparent: true, opacity: .55 }))); group.add(new THREE.Mesh(new THREE.SphereGeometry(.14, 16, 16), new THREE.MeshBasicMaterial({ color: 0x4d8dff, transparent: true, opacity: .5 })));
    let mx = 0, my = 0, rx = 0, ry = 0, auto = 0; wrap.addEventListener('mousemove', event => { const box = wrap.getBoundingClientRect(); mx = (event.clientX - box.left) / box.width * 2 - 1; my = (event.clientY - box.top) / box.height * 2 - 1; });
    const animate = () => { if (!reduced) { auto += .0016; ry += (mx * .5 - ry) * .04; rx += (my * .3 - rx) * .04; group.rotation.set(rx * .5, auto + ry, 0); requestAnimationFrame(animate); } renderer.render(scene, camera); }; animate();
  }

  const canvas = $('#stack-canvas'), host = $('#stack-labels');
  if (!canvas || !host) return;
  const data = [['Generative AI','Models that create text, images, and structured outputs.'],['Agentic AI','Systems that plan, use tools, and act toward a goal.'],['RAG','Grounding outputs in retrieved, up-to-date knowledge.'],['LLMs','The reasoning core of modern AI systems.'],['Computer Vision','Models that understand visual data.'],['Python','The language connecting pipelines, models, and agents.'],['LangGraph','Orchestrating multi-step, stateful agent workflows.'],['PyTorch','Training and fine-tuning deep learning models.'],['Embeddings','Turning meaning into searchable vectors.'],['Vector Databases','Fast storage and retrieval for embeddings.'],['APIs','Connecting models, tools, and services.'],['Docker','Packaging systems to run consistently.'],['AWS','Cloud infrastructure for AI systems.']];
  const wrap = canvas.parentElement, { scene, camera, renderer } = makeRenderer(canvas, wrap, 7.6), group = new THREE.Group(), nodes = []; scene.add(group); const center = new THREE.Mesh(new THREE.SphereGeometry(.16, 16, 16), new THREE.MeshBasicMaterial({ color: 0xedffff })); group.add(center); const centerLabel = document.createElement('div'); centerLabel.className = 'node-label center'; centerLabel.textContent = 'AI'; host.append(centerLabel); const lines = [];
  data.forEach(([name, description], i) => { const y = 1 - i / (data.length - 1) * 2, r = Math.sqrt(1 - y * y), theta = Math.PI * (3 - Math.sqrt(5)) * i * 1.4, position = new THREE.Vector3(Math.cos(theta) * r * 3, y * 3, Math.sin(theta) * r * 3), mesh = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 12), new THREE.MeshBasicMaterial({ color: 0x4d8dff })); mesh.position.copy(position); group.add(mesh); const label = document.createElement('button'); label.type = 'button'; label.className = 'node-label'; label.textContent = name; label.setAttribute('aria-label', `Show ${name} details`); host.append(label); label.addEventListener('click', () => { $$('.node-label', host).forEach(item => item.classList.remove('active')); label.classList.add('active'); $('#stack-info .k').textContent = name; $('#stack-info .v').textContent = description; }); nodes.push({ mesh, label }); lines.push(0,0,0,position.x,position.y,position.z); }); const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3)); group.add(new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 0x294f9e, transparent:true, opacity:.6 })));
  const project = (position, label) => { const p = position.clone().applyMatrix4(group.matrixWorld).project(camera); label.style.transform = `translate(-50%,-50%) translate(${(p.x * .5 + .5) * wrap.clientWidth}px,${(-p.y * .5 + .5) * wrap.clientHeight}px)`; label.style.opacity = p.z < 1 ? '1' : '0'; }; let auto = 0; const loop = () => { if (!reduced) { auto += .0009; group.rotation.y = auto; } group.updateMatrixWorld(); nodes.forEach(node => project(node.mesh.position, node.label)); project(center.position, centerLabel); renderer.render(scene, camera); if (!reduced) requestAnimationFrame(loop); }; loop();
})();
