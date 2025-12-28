"use client";

import React, { useEffect, useRef } from "react";

type SplashCursorProps = {
  //   className?: string;
  containerClassName?: string;
  usePrimaryColors?: boolean;
};

type Splash = {
  x: number;
  y: number;
  radius: number;
  color: string;
  life: number;
};

const SplashCursor: React.FC<SplashCursorProps> = ({
  //   className,
  containerClassName,
  usePrimaryColors = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const splashes = useRef<Splash[]>([]);

  const colors = usePrimaryColors
    ? ["#fdd1d9", "#fba4bc", "#f575a5", "#eb519b", "#de1d8d", "#be1588"]
    : ["#ff6b6b", "#f7d794", "#f8a5c2", "#63cdda", "#c44569", "#786fa6"];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth * (window.devicePixelRatio || 1);
      canvas.height = container.clientHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const getRandomColor = () =>
      colors[Math.floor(Math.random() * colors.length)];

    const addSplash = (x: number, y: number) => {
      splashes.current.push({
        x,
        y,
        radius: Math.random() * 30 + 20,
        color: getRandomColor(),
        life: 1,
      });
    };

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw splashes
      splashes.current.forEach((s, i) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(s.color)}, ${s.life})`;
        ctx.fill();
        s.radius += 0.5;
        s.life -= 0.02;
        if (s.life <= 0) splashes.current.splice(i, 1);
      });

      requestAnimationFrame(animate);
    };
    animate();

    // Mouse and touch handlers
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      if (e instanceof MouseEvent) {
        addSplash(e.clientX - rect.left, e.clientY - rect.top);
      } else {
        for (let i = 0; i < e.touches.length; i++) {
          const t = e.touches[i];
          addSplash(t.clientX - rect.left, t.clientY - rect.top);
        }
      }
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("touchmove", handleMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("touchmove", handleMove);
    };
  }, [colors]);

  // Helper to convert hex to rgb string
  const hexToRgb = (hex: string) => {
    const c = hex.replace("#", "");
    const bigint = parseInt(c, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  };

  return (
    <div
      ref={containerRef}
      className={containerClassName || "absolute inset-0 pointer-events-none"}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default SplashCursor;
