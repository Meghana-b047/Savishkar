import { useEffect, useRef, useCallback } from 'react';

const PARTICLE_COUNT = 36;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function initParticles(canvas) {
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      r: randomBetween(1, 2.5),
      vx: randomBetween(-0.18, 0.18),
      vy: randomBetween(-0.28, -0.08),
      opacity: randomBetween(0.25, 0.7),
      color: Math.random() > 0.6 ? '139,92,246' : Math.random() > 0.5 ? '6,182,212' : '129,140,248',
    });
  }
  return particles;
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const spotlightRef = useRef({ x: -9999, y: -9999 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mouse spotlight
    const { x, y } = spotlightRef.current;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 340);
    grad.addColorStop(0, 'rgba(139,92,246,0.07)');
    grad.addColorStop(0.5, 'rgba(6,182,212,0.03)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Particles
    particlesRef.current.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.color},0.5)`;
      ctx.fill();
      ctx.shadowBlur = 0;

      p.x += p.vx;
      p.y += p.vy;

      // wrap around
      if (p.y < -5) p.y = canvas.height + 5;
      if (p.x < -5) p.x = canvas.width + 5;
      if (p.x > canvas.width + 5) p.x = -5;
    });

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      spotlightRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Deep cosmic base */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: '#06071a',
          pointerEvents: 'none',
        }}
      />

      {/* Drifting gradient orbs */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Orb 1 — violet top-left */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)',
          animation: 'orb1Drift 18s ease-in-out infinite',
          filter: 'blur(1px)',
        }} />

        {/* Orb 2 — cyan bottom-right */}
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
          animation: 'orb2Drift 22s ease-in-out infinite',
          filter: 'blur(1px)',
        }} />

        {/* Orb 3 — indigo center */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '35%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)',
          animation: 'orb3Drift 26s ease-in-out infinite',
          filter: 'blur(2px)',
        }} />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          opacity: 0.028,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
        }}
      />
    </>
  );
}
