"use client";

import type React from "react";

import { useEffect, useState } from "react";

interface AnimatedBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Animated Border Button Component
 * Creates a button with an animated gradient border that rotates continuously
 * Used for primary CTAs throughout the site
 */
export function AnimatedBorderButton({ children, className = "", ...props }: AnimatedBorderButtonProps) {
  const [gradientAngle, setGradientAngle] = useState(0);

  // Continuously rotate the gradient angle for animated border effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle((prev) => (prev + 3) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      className={`relative text-sm cursor-pointer text-white ${className}`}
      style={
        {
          "--c": "#171717",
          "--p": "10%",
          "--light": "#70befa",
          "--gradient-angle": `${gradientAngle}deg`,
          background: `linear-gradient(var(--c), var(--c)) padding-box,
                     conic-gradient(from var(--gradient-angle),
                       transparent,
                       var(--light) var(--p),
                       transparent calc(var(--p) * 2)) border-box`,
          border: "1px solid transparent",
          borderRadius: "1rem",
          padding: "10px 24px",
        } as React.CSSProperties
      }
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
