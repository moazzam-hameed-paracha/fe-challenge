"use client";

import React, { useEffect, useRef } from "react";

/**
 * CursorFollower Component
 * Renders a small theme-colored dot that follows the mouse path with a lagged smooth motion.
 * The dot moves immediately towards the cursor but interpolates its position for a smoother trailing effect.
 * Usage: Include <CursorFollower /> at root level (e.g., in Layout) so it can track mouse events globally.
 */
const CursorFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  // target coordinates
  const targetX = useRef(0);
  const targetY = useRef(0);
  // current coordinates
  const currentX = useRef(0);
  const currentY = useRef(0);
  // animation frame
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // interpolate current towards target
      const dx = targetX.current - currentX.current;
      const dy = targetY.current - currentY.current;
      // adjust the factor for speed: smaller factor = slower (50% slower than before)
      const factor = 0.05;
      currentX.current += dx * factor;
      currentY.current += dy * factor;
      // apply to dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX.current - 4}px, ${currentY.current - 4}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Initial render: place dot off-screen
  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "8px",
        height: "8px",
        backgroundColor: "#70befa",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate3d(-100px, -100px, 0)",
        zIndex: 9999,
        transition: "background-color 0.2s",
      }}
    />
  );
};

export default CursorFollower;
