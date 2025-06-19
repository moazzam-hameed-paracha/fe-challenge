"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedHeader = () => {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  // Animated Header Component
  const [hoveredItem, setHoveredItem] = useState<string | null>(navItems[0].name);
  const [hoveredRect, setHoveredRect] = useState({ width: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    if (!navRef.current) return;

    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = event.currentTarget.getBoundingClientRect();

    setHoveredRect({
      width: itemRect.width,
      left: itemRect.left - navRect.left,
    });
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // make the first item active by default
  useEffect(() => {
    if (navRef.current) {
      const firstItem = navRef.current.querySelector("a");
      if (firstItem) {
        const itemRect = firstItem.getBoundingClientRect();
        setHoveredRect({
          width: itemRect.width,
          left: itemRect.left - navRef.current.getBoundingClientRect().left,
        });
      }
    }
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-center">
        <div ref={navRef} className="hidden md:flex items-center space-x-1 relative" onMouseLeave={handleMouseLeave}>
          {hoveredItem && (
            <motion.div
              className="absolute h-10 bg-blue-600/20 rounded-lg border border-blue-500/30 pointer-events-none"
              initial={false}
              animate={{
                width: hoveredRect.width,
                left: hoveredRect.left,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

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
    </nav>
  );
};

export default AnimatedHeader;
