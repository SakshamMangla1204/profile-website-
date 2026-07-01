"use client";

import { useEffect, useRef } from "react";

export function SideAura() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      // Create particles only on the left and right edges
      for (let i = 0; i < 30; i++) {
        const side = Math.random() > 0.5 ? 0 : canvas.width;
        particles.push({
          x: side,
          y: Math.random() * canvas.height,
          vx: (side === 0 ? 1 : -1) * (0.1 + Math.random() * 0.15),
          vy: (Math.random() - 0.5) * 0.1,
          size: 0.5 + Math.random() * 1.5,
          alpha: 0.1 + Math.random() * 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (p.x < -20 || p.x > canvas.width + 20) {
          p.x = Math.random() > 0.5 ? 0 : canvas.width;
          p.y = Math.random() * canvas.height;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grad.addColorStop(0, `hsla(262, 83%, 58%, ${p.alpha})`);
        grad.addColorStop(1, `hsla(262, 83%, 58%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);
      });

      frame = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}