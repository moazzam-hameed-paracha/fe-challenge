import type React from "react";
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Gradient Text Component
 * Applies a gradient from white to brand blue for text elements
 * Used for headings and important text throughout the site
 */
export function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-white to-[#70befa] bg-clip-text text-transparent ${className}`}
      style={{ backgroundImage: "linear-gradient(90deg, #fff, #70befa)" }}
    >
      {children}
    </span>
  );
}
