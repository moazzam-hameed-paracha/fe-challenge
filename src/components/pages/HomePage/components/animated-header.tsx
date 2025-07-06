"use client";

import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { X } from "lucide-react";
import { GradientText } from "../../../ui/gradient-text";
import { useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
// Import Shadcn Select components:
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useSearchParams } from "next/navigation";

export function AnimatedHeader() {
  const t = useTranslations("AnimatedHeader");
  // Navigation items
  const navItems = [
    { name: t("navItems.Home"), href: "#home" },
    { name: t("navItems.AI Hub"), href: "#ai-hub" },
    { name: t("navItems.Features"), href: "#features" },
    { name: t("navItems.Applications"), href: "#applications" },
    { name: t("navItems.Statistics"), href: "#statistics" },
    { name: t("navItems.Team"), href: "#team" },
    { name: t("navItems.Partners"), href: "#partners" },
    { name: t("navItems.FAQ"), href: "#faq" },
    { name: t("navItems.Pricing"), href: "#pricing" },
    { name: t("navItems.Contact"), href: "#contact" },
  ];
  const defaultItem = navItems[0].name;

  const [hoveredItem, setHoveredItem] = useState<string>(defaultItem);
  const [hoveredRect, setHoveredRect] = useState({ width: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile: whether menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Next.js App Router hooks
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();

  // Locales array: only "en" for now. If adding more locales later, extend this list.
  const locales = [
    { label: "English", value: "en" },
    // e.g. { label: "Español", value: "es" }, ...
  ];

  // Extract current locale from the pathname's first segment.
  // E.g. pathname "/en/about" -> locale "en"; if no match, fallback to "en"
  const pathSegments = pathname.split("/").filter(Boolean); // e.g. ["en", "about"]
  const firstSegment = pathSegments[0] || "";
  const hasLocalePrefix = locales.some((l) => l.value === firstSegment);
  const currentLocale = hasLocalePrefix ? firstSegment : "en";
  // If default locale should not be prefixed in URLs, you might treat hasLocalePrefix=false and currentLocale="en",
  // but avoid prefix when rebuilding URL. See comments below.

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

  // Handle locale change for App Router
  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Build new pathname: strip existing locale segment if present, then prefix newLocale.
    let newPathname = pathname;
    if (hasLocalePrefix) {
      // Remove "/oldLocale" prefix
      const restSegments = pathSegments.slice(1); // drop first
      newPathname = "/" + restSegments.join("/");
    }
    // If newPathname becomes just "/" or empty, ensure "/"
    if (!newPathname || newPathname === "") {
      newPathname = "/";
    }
    // Prefix with new locale. If you want to always prefix (even default), do:
    newPathname = `/${newLocale}${newPathname === "/" ? "" : newPathname}`;
    // If you DO NOT want to prefix default locale (e.g. en) with "/en", add logic:
    // if (newLocale === "en") {
    //   newPathname = hasLocalePrefix
    //     ? "/" + pathSegments.slice(1).join("/")
    //     : pathname; // keep as-is if already no prefix
    // }

    // Reconstruct search params
    const search = searchParams.toString();
    const finalUrl = search ? `${newPathname}?${search}` : newPathname;

    router.push(finalUrl);
  };

  // Compute selectedLocale for the Select component
  const selectedLocale = currentLocale;

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
            {/* Link to homepage under current locale */}
            <Link href={hasLocalePrefix ? `/${currentLocale}/` : `/${currentLocale}/`}>
              <GradientText>{t("brand")}</GradientText>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1 relative" ref={navRef} onMouseLeave={handleMouseLeave}>
            {/* Hover box */}
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

          {/* Language Toggle Selector using Shadcn Select */}
          <div className="hidden md:flex items-center space-x-4">
            <Select value={selectedLocale} onValueChange={(val) => handleLocaleChange(val)}>
              <SelectTrigger className="w-[120px] px-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {locales.map((loc) => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mobile burger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
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
                {/* Mobile locale selector */}
                <div className="pt-4 border-t border-gray-800">
                  <Select
                    value={selectedLocale}
                    onValueChange={(val) => {
                      setMenuOpen(false);
                      handleLocaleChange(val);
                    }}
                  >
                    <SelectTrigger className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {locales.map((loc) => (
                        <SelectItem key={loc.value} value={loc.value}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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
