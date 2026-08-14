/**
 * Hannah Elangovan Portfolio — 3D Interactive Hero & GLSL Shader Scene
 * Integrates Three.js 3D Commerce & Law Geometries with Custom Liquid Gold Shader
 */

(function () {
  'use strict';

  // Check if THREE is available
  if (typeof THREE === 'undefined') {
    console.warn('Three.js is not loaded yet.');
    return;
  }

  const container = document.getElementById('hero-canvas-container');
  const shaderCanvas = document.getElementById('hero-shader-canvas');

  if (!container) return;

  // ==========================================
  // 1. GLSL LIQUID LUXURY BACKGROUND SHADER
  // ==========================================
  if (shaderCanvas) {
    (function initShader() {
      const gl = shaderCanvas.getContext('webgl') || shaderCanvas.getContext('experimental-webgl');
      if (!gl) return;

      function resizeShader() {
        const w = shaderCanvas.parentElement ? shaderCanvas.parentElement.clientWidth : window.innerWidth;
        const h = shaderCanvas.parentElement ? shaderCanvas.parentElement.clientHeight : window.innerHeight;
        if (shaderCanvas.width !== w || shaderCanvas.height !== h) {
          shaderCanvas.width = w;
          shaderCanvas.height = h;
        }
      }
      resizeShader();
      window.addEventListener('resize', resizeShader);

      const vs = `
        attribute vec2 a_position;
        varying vec2 v_texCoord;
        void main() {
          v_texCoord = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fs = `
        precision highp float;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_mode; // 0.0 = Founder (Gold), 1.0 = Scholar (Navy/Law)
        varying vec2 v_texCoord;

        void main() {
          vec2 uv = v_texCoord;
          vec2 mouse = u_mouse / u_resolution;
          
          // Organic fluid wave equations
          float noise = sin(uv.x * 6.0 + u_time * 0.4) * cos(uv.y * 6.0 + u_time * 0.3);
          noise += sin((uv.x + uv.y) * 4.0 - u_time * 0.35);
          
          // Mouse proximity glow
          float dist = distance(uv, mouse);
          float glow = smoothstep(0.45, 0.0, dist) * 0.25;
          
          // Color palettes
          vec3 navyDark = vec3(0.04, 0.06, 0.08);
          vec3 charcoal = vec3(0.09, 0.10, 0.12);
          vec3 goldAccent = vec3(0.85, 0.70, 0.32);
          vec3 lawAccent = vec3(0.38, 0.55, 0.85);

          vec3 activeAccent = mix(goldAccent, lawAccent, u_mode);
          
          vec3 finalColor = mix(navyDark, charcoal, noise * 0.5 + 0.5);
          finalColor += activeAccent * glow;
          finalColor += activeAccent * (noise * 0.04 + 0.01);
          
          gl_FragColor = vec4(finalColor, 0.75);
        }
      `;

      function createShader(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      }

      const prog = gl.createProgram();
      gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs));
      gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

      const pos = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(prog, 'u_time');
      const uRes = gl.getUniformLocation(prog, 'u_resolution');
      const uMouse = gl.getUniformLocation(prog, 'u_mouse');
      const uMode = gl.getUniformLocation(prog, 'u_mode');

      let mousePos = { x: shaderCanvas.width / 2, y: shaderCanvas.height / 2 };
      window.addEventListener('mousemove', (e) => {
        const rect = shaderCanvas.getBoundingClientRect();
        if (rect.width && rect.height) {
          const nx = (e.clientX - rect.left) / rect.width;
          const ny = 1.0 - (e.clientY - rect.top) / rect.height;
          mousePos.x = nx * shaderCanvas.width;
          mousePos.y = ny * shaderCanvas.height;
        }
      });

      let currentModeValue = 0.0;
      let targetModeValue = 0.0;

      window.setShaderMode = function (isScholar) {
        targetModeValue = isScholar ? 1.0 : 0.0;
      };

      function renderShader(time) {
        resizeShader();
        gl.viewport(0, 0, shaderCanvas.width, shaderCanvas.height);
        
        currentModeValue += (targetModeValue - currentModeValue) * 0.05;

        if (uTime) gl.uniform1f(uTime, time * 0.001);
        if (uRes) gl.uniform2f(uRes, shaderCanvas.width, shaderCanvas.height);
        if (uMouse) gl.uniform2f(uMouse, mousePos.x, mousePos.y);
        if (uMode) gl.uniform1f(uMode, currentModeValue);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(renderShader);
      }
      renderShader(0);
    })();
  }

  // ==========================================
  // 2. THREE.JS 3D HYBRID INTERACTIVE SCENE
  // ==========================================
  let width = container.clientWidth || window.innerWidth;
  let height = container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
  camera.position.z = 8.5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Master Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const goldKeyLight = new THREE.PointLight(0xf3e5ab, 3, 25);
  goldKeyLight.position.set(6, 6, 6);
  scene.add(goldKeyLight);

  const rimLight = new THREE.PointLight(0x7096d1, 2, 25);
  rimLight.position.set(-6, -4, 4);
  scene.add(rimLight);

  // 1. Central "Sphere of Commerce"
  const sphereGeo = new THREE.SphereGeometry(1.6, 64, 64);
  const sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0xd4af37,
    emissive: 0x221805,
    roughness: 0.15,
    metalness: 0.85,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transmission: 0.4,
    transparent: true,
    opacity: 0.92
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  masterGroup.add(sphere);

  // Inner Core Icosahedron (Precision & Structure)
  const innerGeo = new THREE.IcosahedronGeometry(1.1, 1);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const innerCore = new THREE.Mesh(innerGeo, innerMat);
  masterGroup.add(innerCore);

  // 2. Orbital Rings of Jurisprudence & Law
  const rings = [];
  const ringConfigs = [
    { radius: 2.5, tube: 0.04, rx: 0.4, ry: 0.2, color: 0xf0e0c8 },
    { radius: 2.9, tube: 0.03, rx: -0.6, ry: 0.8, color: 0xd4af37 },
    { radius: 3.3, tube: 0.035, rx: 1.1, ry: -0.4, color: 0x93c5fd }
  ];

  ringConfigs.forEach((config) => {
    const ringGeo = new THREE.TorusGeometry(config.radius, config.tube, 24, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: config.color,
      metalness: 0.9,
      roughness: 0.18
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = config.rx;
    ring.rotation.y = config.ry;
    masterGroup.add(ring);
    rings.push({ mesh: ring, speedX: (Math.random() - 0.5) * 0.006, speedY: (Math.random() + 0.5) * 0.005 });
  });

  // 3. Floating Golden Stardust Particles
  const particleCount = 240;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 14;
    positions[i + 1] = (Math.random() - 0.5) * 12;
    positions[i + 2] = (Math.random() - 0.5) * 10;
    scales[i / 3] = Math.random() * 0.05 + 0.02;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xf3e5ab,
    size: 0.06,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // Mouse Parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  // Scroll Reactivity
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // Identity State
  let isScholarMode = false;
  window.set3DIdentityMode = function (isScholar) {
    isScholarMode = isScholar;
    if (window.setShaderMode) {
      window.setShaderMode(isScholar);
    }
  };

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse lerp
    targetX += (mouseX * 1.5 - targetX) * 0.05;
    targetY += (-mouseY * 1.5 - targetY) * 0.05;

    masterGroup.position.x = targetX;
    masterGroup.position.y = targetY - (scrollY * 0.0015);

    // Dynamic rotation
    const rotSpeed = isScholarMode ? 0.003 : 0.006;
    masterGroup.rotation.y += rotSpeed;
    masterGroup.rotation.x = targetY * 0.4;

    innerCore.rotation.y -= 0.008;
    innerCore.rotation.x += 0.005;

    // Rings independent orbits
    rings.forEach((r, idx) => {
      r.mesh.rotation.z += r.speedY;
      r.mesh.rotation.x += r.speedX;
    });

    // Particle drift
    particleSystem.rotation.y = elapsedTime * 0.02;
    particleSystem.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

    // Mode Color Lerp
    const targetSphereColor = isScholarMode ? new THREE.Color(0x3b82f6) : new THREE.Color(0xd4af37);
    sphereMat.color.lerp(targetSphereColor, 0.05);

    const targetKeyLightColor = isScholarMode ? new THREE.Color(0x93c5fd) : new THREE.Color(0xf3e5ab);
    goldKeyLight.color.lerp(targetKeyLightColor, 0.05);

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
})();
