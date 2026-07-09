/* ============================================================
   hero3d.js — Three.js particle field for the hero.
   Performance strategy:
   - Loaded as an ES module, deferred until after first paint
   - Skipped entirely for prefers-reduced-motion
   - Device pixel ratio capped at 1.75
   - Single BufferGeometry + PointsMaterial (one draw call for
     ~2600 particles) + one wireframe torus knot (second call)
   - Render loop pauses when the hero leaves the viewport or the
     tab is hidden (IntersectionObserver + visibilitychange)
   - Mouse parallax is lerped, no layout reads in the loop
   ============================================================ */

import * as THREE from "three";

const canvas = document.getElementById("hero-canvas");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && !reduceMotion) init();

function init() {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,           // points + wireframe don't need MSAA
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 60);
  camera.position.set(0, 0, 11);

  /* --- Particle field: points scattered on a large sphere shell --- */
  const COUNT = 2600;
  const positions = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    // biased shell distribution: most points far, some close for depth
    const r = 6 + Math.pow(Math.random(), 0.6) * 9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
    positions[i * 3 + 2] = r * Math.cos(phi) - 4;
    sizes[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // Soft round sprite drawn once on a tiny canvas (no texture download)
  const sprite = (() => {
    const c = document.createElement("canvas");
    c.width = c.height = 48;
    const g = c.getContext("2d");
    const grad = g.createRadialGradient(24, 24, 0, 24, 24, 24);
    grad.addColorStop(0, "rgba(178,232,240,1)");
    grad.addColorStop(0.4, "rgba(64,150,166,0.55)");
    grad.addColorStop(1, "rgba(64,150,166,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 48, 48);
    return new THREE.CanvasTexture(c);
  })();

  const points = new THREE.Points(
    geo,
    new THREE.PointsMaterial({
      size: 0.16,
      map: sprite,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color("#49b3c1"),
      opacity: 0.85,
    })
  );
  scene.add(points);

  /* --- Signature form: slowly-turning wireframe torus knot --- */
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(2.6, 0.72, 140, 18, 2, 3),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color("#2b464f"),
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    })
  );
  knot.position.set(3.4, 1.1, -1);
  scene.add(knot);

  /* --- Resize --- */
  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas.parentElement;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // On narrow screens push the knot back so type stays clear
    knot.position.x = w < 720 ? 1.6 : 3.4;
    knot.position.z = w < 720 ? -4 : -1;
  }
  resize();
  addEventListener("resize", resize, { passive: true });

  /* --- Pointer parallax (lerped) --- */
  let mx = 0, my = 0, tx = 0, ty = 0;
  addEventListener("pointermove", (e) => {
    tx = (e.clientX / innerWidth - 0.5) * 2;
    ty = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });

  /* --- Render loop with visibility gating --- */
  let running = false;
  let rafId = 0;
  const clock = new THREE.Clock();

  function frame() {
    const t = clock.getElapsedTime();
    mx += (tx - mx) * 0.045;
    my += (ty - my) * 0.045;

    points.rotation.y = t * 0.028 + mx * 0.12;
    points.rotation.x = my * 0.08;
    knot.rotation.x = t * 0.12;
    knot.rotation.y = t * 0.16 + mx * 0.2;

    camera.position.x = mx * 0.5;
    camera.position.y = -my * 0.35;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(frame);
  }
  function start() { if (!running) { running = true; clock.start(); rafId = requestAnimationFrame(frame); } }
  function stop() { running = false; cancelAnimationFrame(rafId); }

  new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), {
    threshold: 0.02,
  }).observe(canvas);

  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start()
  );
}
