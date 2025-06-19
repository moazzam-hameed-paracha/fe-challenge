"use client";

import React, { FC, useEffect, useRef, useState, MouseEvent } from "react";
import { motion, useScroll } from "framer-motion";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { GradientText } from "@/components/ui/gradient-text";

/**
 * BlobCanvas Component
 * Renders and animates soft, theme-colored blobs that merge and split like cells.
 * Constraints:
 * - Max 3 blobs
 * - Blobs stay fully within canvas bounds
 * - Blobs are slightly misshapen and always changing shape
 * - 50% brighter than before
 */
const BlobCanvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrame: number;

    type Blob = { x: number; y: number; r: number; vx: number; vy: number };
    const blobs: Blob[] = [];
    // Brighter theme blue gradients (~50% brighter)
    const colors = ["rgba(115, 160, 195, 0.3)", "rgba(72, 104, 128, 0.2)"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // initialize up to 3 blobs with larger radii (~250–350px)
    for (let i = 0; i < 3; i++) {
      const r = 250 + Math.random() * 100;
      blobs.push({
        x: r + Math.random() * (canvas.width - 2 * r),
        y: r + Math.random() * (canvas.height - 2 * r),
        r,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = Date.now() / 1000;
      blobs.forEach((b, i) => {
        // shape distortion factors
        const sx = 1 + Math.sin(t + i) * 0.2;
        const sy = 1 + Math.cos(t + i) * 0.2;

        // gently vary radius baseline
        b.r += Math.sin(t + i * 1.3) * 0.1;

        // enforce bounds so blob stays fully inside
        if (b.x - b.r * sx < 0 && b.vx < 0) b.vx = -b.vx;
        if (b.x + b.r * sx > canvas.width && b.vx > 0) b.vx = -b.vx;
        if (b.y - b.r * sy < 0 && b.vy < 0) b.vy = -b.vy;
        if (b.y + b.r * sy > canvas.height && b.vy > 0) b.vy = -b.vy;

        // move
        b.x += b.vx;
        b.y += b.vy;

        // create radial gradient
        const grad = ctx.createRadialGradient(b.x, b.y, b.r * 0.3, b.x, b.y, b.r);
        grad.addColorStop(0, colors[i % colors.length]);
        grad.addColorStop(1, "transparent");

        // draw misshapen blob via ellipse
        ctx.beginPath();
        ctx.ellipse(b.x, b.y, b.r * sx, b.r * sy, 0, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ mixBlendMode: "screen" }} />;
};

/**
 * Hero Section Component
 * - Shows a splash of "Energant.ai" for 2s, then fades into the main hero
 * - Displays animated blobs in the background
 * - Uses dual-CTA design: "Try for Free" & "Contact Us →"
 */
export const HeroSection: FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // hide splash after 2s
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // header scroll logic (if needed)
  useEffect(() => {
    const unsub = scrollY.onChange((y) => setIsScrolled(y > 50));
    return unsub;
  }, [scrollY]);

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      {/* moving blobs */}
      <BlobCanvas />

      {/* Splash Overlay */}
      {showSplash && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.8, duration: 0.4 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold text-[#70befa]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Energant.ai
          </motion.h1>
        </motion.div>
      )}

      {/* Main Hero Content */}
      {!showSplash && (
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 leading-snug"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GradientText>The AI Agent Helps You Think and Do.</GradientText>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-400 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Revolutionize your workflow with intelligent automation and decision-making capabilities
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="inline-flex rounded-lg bg-black bg-opacity-60 p-1">
              <a href="#" className="px-6 py-1 text-white font-medium">
                Try for Free
              </a>
              <a href="#" className="ml-4 px-6 py-1 text-[#70befa] font-medium border border-[#70befa] rounded-lg">
                Contact Us →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
