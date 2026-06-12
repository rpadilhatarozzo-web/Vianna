import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 120;
const MAX_DISTANCE = 140;
const PARTICLE_SPEED = 0.18;

export default function HeroBackground3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ─────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 300;

    // ── Partículas ───────────────────────────────────────────
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 600;
      const y = (Math.random() - 0.5) * 400;
      const z = (Math.random() - 0.5) * 200;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      velocities.push(
        (Math.random() - 0.5) * PARTICLE_SPEED,
        (Math.random() - 0.5) * PARTICLE_SPEED,
        (Math.random() - 0.5) * PARTICLE_SPEED * 0.3
      );
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xe5005e,
      size: 2.5,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Linhas de conexão ────────────────────────────────────
    const lineGeo = new THREE.BufferGeometry();
    // pré-alocar buffer para o pior caso
    const maxLines = PARTICLE_COUNT * PARTICLE_COUNT;
    const linePositions = new Float32Array(maxLines * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineSegmentsMaterial
      ? new THREE.LineBasicMaterial({ color: 0xe5005e, transparent: true, opacity: 0.15, vertexColors: false })
      : new THREE.LineBasicMaterial({ color: 0xe5005e, transparent: true, opacity: 0.15 });

    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // ── Resize ───────────────────────────────────────────────
    function resize() {
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || document.body);

    // ── Mouse parallax ───────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;

    function onMouseMove(e) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 20;
    }
    window.addEventListener("mousemove", onMouseMove);

    // ── Loop de animação ──────────────────────────────────────
    let animId;
    const pos = particleGeo.attributes.position;

    function animate() {
      animId = requestAnimationFrame(animate);

      // Mover partículas
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos.array[i * 3] += velocities[i * 3];
        pos.array[i * 3 + 1] += velocities[i * 3 + 1];
        pos.array[i * 3 + 2] += velocities[i * 3 + 2];

        // Bounce nas bordas
        if (Math.abs(pos.array[i * 3]) > 300) velocities[i * 3] *= -1;
        if (Math.abs(pos.array[i * 3 + 1]) > 200) velocities[i * 3 + 1] *= -1;
        if (Math.abs(pos.array[i * 3 + 2]) > 100) velocities[i * 3 + 2] *= -1;
      }
      pos.needsUpdate = true;

      // Desenhar linhas entre partículas próximas
      let lineIdx = 0;
      const lp = lineGeo.attributes.position.array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pos.array[i * 3] - pos.array[j * 3];
          const dy = pos.array[i * 3 + 1] - pos.array[j * 3 + 1];
          const dz = pos.array[i * 3 + 2] - pos.array[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < MAX_DISTANCE) {
            lp[lineIdx++] = pos.array[i * 3];
            lp[lineIdx++] = pos.array[i * 3 + 1];
            lp[lineIdx++] = pos.array[i * 3 + 2];
            lp[lineIdx++] = pos.array[j * 3];
            lp[lineIdx++] = pos.array[j * 3 + 1];
            lp[lineIdx++] = pos.array[j * 3 + 2];
          }
        }
      }

      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.setDrawRange(0, lineIdx / 3);

      // Parallax suave da câmera
      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (mouseY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  );
}
