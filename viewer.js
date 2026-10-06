/* 3D corner: lazy Three.js viewer (CC0 models). Loads only when scrolled into
   view; static fallback when WebGL/CDN unavailable or file:// (GLB fetch needs http). */
(function () {
  var box = document.getElementById('viewer3d');
  var canvas = document.getElementById('gl');
  var fallback = document.getElementById('glFallback');
  if (!box || !canvas) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var started = false;

  function showFallback() {
    if (fallback) fallback.hidden = false;
    canvas.style.display = 'none';
  }
  // No WebGL at all -> don't even try the CDN.
  try {
    var gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) { showFallback(); return; }
  } catch (e) { showFallback(); return; }

  function init() {
    if (started) return;
    started = true;
    Promise.all([import('three'), import('three/addons/controls/OrbitControls.js'), import('three/addons/loaders/GLTFLoader.js')])
      .then(setup).catch(showFallback);
  }

  function setup(mods) {
    var THREE = mods[0], OrbitControls = mods[1].OrbitControls, GLTFLoader = mods[2].GLTFLoader;
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    } catch (e) { showFallback(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);
    scene.add(new THREE.HemisphereLight(0xfff6e6, 0x8a6f4d, 1.15));
    var sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(3, 5, 4);
    scene.add(sun);

    var disc = new THREE.Mesh(
      new THREE.CircleGeometry(1, 48),
      new THREE.MeshStandardMaterial({ color: 0xe7d3ac, roughness: 1 })
    );
    disc.rotation.x = -Math.PI / 2;
    scene.add(disc);

    var controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 0.6;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI * 0.55;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 1.4;

    var loader = new GLTFLoader();
    var cache = {}, current = null;
    var FILES = { sign_hospital: 'assets/models/sign_hospital.glb', firstaid_kit: 'assets/models/firstaid_kit.glb', pickup_health: 'assets/models/pickup_health.glb' };

    function frame(obj) {
      var bb = new THREE.Box3().setFromObject(obj);
      var size = bb.getSize(new THREE.Vector3()).length();
      var center = bb.getCenter(new THREE.Vector3());
      disc.scale.setScalar(Math.max(size * 0.75, 0.4));
      disc.position.y = bb.min.y - 0.001;
      controls.target.copy(center);
      var dist = size * 1.9;
      camera.position.set(center.x + dist * 0.7, center.y + dist * 0.45, center.z + dist * 0.7);
      camera.near = dist / 100;
      camera.far = dist * 20;
      camera.updateProjectionMatrix();
    }
    function show(name) {
      if (current) current.visible = false;
      if (cache[name]) { current = cache[name]; current.visible = true; frame(current); return; }
      loader.load(FILES[name], function (gltf) {
        cache[name] = gltf.scene;
        scene.add(gltf.scene);
        if (current) current.visible = false;
        current = gltf.scene;
        frame(current);
      }, undefined, function () { showFallback(); });
    }
    var pillBox = document.getElementById('modelPills');
    if (pillBox) pillBox.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || !b.dataset.model) return;
      pillBox.querySelectorAll('button').forEach(function (x) { x.classList.remove('is-sel'); x.setAttribute('aria-pressed', 'false'); });
      b.classList.add('is-sel');
      b.setAttribute('aria-pressed', 'true');
      show(b.dataset.model);
    });

    function size() {
      var w = canvas.clientWidth || 300, h = canvas.clientHeight || 300;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    size();
    window.addEventListener('resize', size);
    show('sign_hospital');
    renderer.setAnimationLoop(function () { controls.update(); renderer.render(scene, camera); });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { init(); io.disconnect(); } });
    }, { rootMargin: '300px' });
    io.observe(box);
  } else { init(); }
})();
