"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * CursorFollower Component
 * Renders a small theme-colored dot that follows the mouse path with a 0.5s delay.
 * Usage: Include <CursorFollower /> at root level (e.g., in Layout) so it can track mouse events globally.
 */
const CursorFollower: React.FC = () => {
  // Delay in milliseconds
  const delay = 500;
  // Queue of mouse positions with timestamp
  const positionsRef = useRef<Array<{ x: number; y: number; time: number }>>([]);
  // State for the follower dot position
  const [dotPos, setDotPos] = useState<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      // Push position with current timestamp
      positionsRef.current.push({ x, y, time: Date.now() });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const now = Date.now();
      // Process queued positions to find ones older than delay
      const queue = positionsRef.current;
      while (queue.length > 0) {
        const pos = queue[0];
        if (now - pos.time >= delay) {
          // This position is ready to be shown
          setDotPos({ x: pos.x, y: pos.y });
          queue.shift(); // remove it
        } else {
          break;
        }
      }
      // Schedule next frame
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  if (!dotPos) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: dotPos.x,
        top: dotPos.y,
        width: "8px",
        height: "8px",
        backgroundColor: "#70befa",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    />
  );
};

export default CursorFollower;
