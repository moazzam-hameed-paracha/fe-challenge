"use client";

import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { motion, useScroll } from "framer-motion";

/**
 * Animated Header Component
 * Fixed navigation header with smooth animations and hover effects
 * Features dynamic background blur based on scroll position
 */
export function AnimatedHeader() {
  // Navigation items
  const navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];
  const defaultItem = navItems[0].name;

  const [hoveredItem, setHoveredItem] = useState<string>(defaultItem);
  const [hoveredRect, setHoveredRect] = useState({ width: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Update header appearance based on scroll position
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  // Set initial hover box on mount
  useEffect(() => {
    if (navRef.current) {
      const firstAnchor = navRef.current.querySelector("a");
      if (firstAnchor) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = firstAnchor.getBoundingClientRect();
        setHoveredRect({
          width: itemRect.width,
          left: itemRect.left - navRect.left,
        });
      }
    }
  }, []);

  // Handle hover effect for navigation items
  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>, item: string) => {
    if (!navRef.current) return;

    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = event.currentTarget.getBoundingClientRect();

    setHoveredRect({
      width: itemRect.width,
      left: itemRect.left - navRect.left,
    });
    setHoveredItem(item);
  };

  // Reset to default "Home" when mouse leaves
  const handleMouseLeave = () => {
    if (!navRef.current) return;
    const firstAnchor = navRef.current.querySelector("a");
    if (firstAnchor) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = firstAnchor.getBoundingClientRect();
      setHoveredRect({
        width: itemRect.width,
        left: itemRect.left - navRect.left,
      });
      setHoveredItem(defaultItem);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-gray-950/20 backdrop-blur-xl border-b border-gray-800/20" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-center">
        <div ref={navRef} className="flex items-center space-x-1 relative" onMouseLeave={handleMouseLeave}>
          {/* Transparent box, colored border, subtle glow */}
          {hoveredItem && (
            <motion.div
              className="absolute h-10 rounded-lg pointer-events-none"
              initial={false}
              animate={{
                width: hoveredRect.width,
                left: hoveredRect.left,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{
                backgroundColor: "transparent",
                border: "1px solid #70befa",
                boxShadow: "0 2px 8px rgba(112, 190, 250, 0.3)",
              }}
            />
          )}

          {/* Navigation items */}
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 z-10"
              onMouseEnter={(e) => handleMouseEnter(e, item.name)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
