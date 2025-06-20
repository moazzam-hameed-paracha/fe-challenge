"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/gradient-text";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * BlobCanvas Component
 * Renders and animates soft, theme-colored blobs that merge and split like cells.
 * Constraints:
 * - Max 3 blobs
 * - Blobs stay fully within canvas bounds
 * - Blobs are slightly misshapen and always changing shape
 * - 50% brighter than before
 * Calls onReady once the first draw completes
 */
const BlobCanvas: FC<{ onReady?: () => void }> = ({ onReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrame: number;

    type Blob = { x: number; y: number; r: number; vx: number; vy: number };
    const blobs: Blob[] = [];
    // Brighter theme blue gradients (~50% brighter)
    const colors = ["#5ab4fa", "#6cb7f1"];

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

    let firstDraw = true;
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

      if (firstDraw && onReady) {
        onReady();
        firstDraw = false;
      }
      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [onReady]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ mixBlendMode: "screen" }} />;
};

/**
 * Hero Section Component
 * - Shows a splash of "Energant.ai" for 2s, then fades into the main hero
 * - Displays animated blobs in the background
 * - Uses dual-CTA design: "Try for Free" & "Contact Us →"
 * - Main content spans full width, with animated underline once canvas is ready
 */
export const HeroSection: FC = () => {
  const t = useTranslations("HeroSection");
  const [showSplash, setShowSplash] = useState(true);
  const [canvasReady, setCanvasReady] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  // hide splash after 2s
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // when canvas ready and heading exists, measure underline width
  useEffect(() => {
    if (canvasReady && headingRef.current) {
      const rect = headingRef.current.getBoundingClientRect();
      setUnderlineWidth(rect.width);
    }
  }, [canvasReady]);

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      {/* moving blobs */}
      <BlobCanvas onReady={() => setCanvasReady(true)} />

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
            {t("splashTitle")}
          </motion.h1>
        </motion.div>
      )}

      {/* Main Hero Content */}
      {!showSplash && (
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            ref={headingRef}
            className="text-5xl md:text-7xl font-bold mb-4 leading-snug w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GradientText>{t("title")}</GradientText>
          </motion.h1>

          {/* Animated underline when canvas ready */}
          {canvasReady && underlineWidth > 0 && (
            <motion.div
              className="h-1 bg-[#70befa] mt-1"
              initial={{ width: 0 }}
              animate={{ width: underlineWidth }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}

          <motion.p
            className="text-lg text-gray-400 mb-6 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="inline-flex rounded-lg bg-black bg-opacity-60 p-1">
              <Link href="#ai-hub" className="px-6 py-1 text-white font-medium">
                {t("tryForFree")}
              </Link>
              <a
                href="#contact"
                className="ml-4 px-6 py-1 text-[#70befa] font-medium border border-[#70befa] rounded-lg"
              >
                {t("contactUs")}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};
