"use client";

import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { X } from "lucide-react";
import { GradientText } from "../ui/gradient-text";

/**
 * Animated Header Component
 * Fixed navigation header with smooth animations and hover effects
 * Features dynamic background blur based on scroll position
 * Responsive: burger menu on mobile that slides open
 */
export function AnimatedHeader() {
  // Navigation items
  const navItems = [
    { name: "Home", href: "#" },
    { name: "AI Hub", href: "#ai-hub" },
    { name: "Features", href: "#features" },
    { name: "Applications", href: "#applications" },
    { name: "Statistics", href: "#statistics" },
    { name: "Team", href: "#team" },
    { name: "Partners", href: "#partners" },
    { name: "FAQ", href: "#faq" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];
  const defaultItem = navItems[0].name;

  const [hoveredItem, setHoveredItem] = useState<string>(defaultItem);
  const [hoveredRect, setHoveredRect] = useState({ width: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile: whether menu is open
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 ${
          isScrolled ? "bg-gray-950/20 backdrop-blur-xl border-b border-gray-800/20" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between h-16">
          {/* Logo or Brand */}
          <div className="text-xl font-bold text-white">
            <a href="#">
              <GradientText>Energant.ai</GradientText>
            </a>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1 relative" ref={navRef} onMouseLeave={handleMouseLeave}>
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

          {/* Mobile burger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {/* Burger lines animated */}
            <motion.span
              className="block w-6 h-0.5 bg-white mb-1"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white mb-1"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900/90 z-50 flex"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="relative w-full max-w-xs bg-gray-950 p-6">
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
              {/* Menu items */}
              <nav className="mt-12 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-lg text-gray-200 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            {/* Click outside to close */}
            <div className="flex-1" onClick={toggleMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
