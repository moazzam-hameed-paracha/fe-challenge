"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";

/**
 * Partners Section Component
 * Simple section displaying partner logos
 * Features hover animations and responsive layout
 */
export function PartnersSection() {
  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section title */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>Our partners</GradientText>
        </motion.h2>

        {/* Partner logos */}
        <motion.div
          className="flex justify-center items-center space-x-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-24 h-24 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700/50"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-2xl">🔷</span>
          </motion.div>
          <motion.div
            className="w-24 h-24 bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700/50"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-2xl">🟢</span>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
