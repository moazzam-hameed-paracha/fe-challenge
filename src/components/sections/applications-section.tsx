"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { useTranslations } from "next-intl";

/**
 * Applications Section Component
 * Showcases different AI application use cases with images and CTAs
 */
export function ApplicationsSection() {
  const t = useTranslations("ApplicationsSection");
  const applications = [
    {
      key: "ai_hr",
      imageSrc: "/ai-hr.webp",
    },
    {
      key: "ai_data_scientist",
      imageSrc: "/ai-data-scientist.webp",
    },
    {
      key: "ai_og_specialist",
      imageSrc: "/ai-o-g-specialist.webp",
    },
  ];

  return (
    <AnimatedSection className="py-20 px-6 bg-transparent">
      <div className="container mx-auto max-w-6xl" id="applications">
        {/* Section title: left-aligned, larger */}
        <motion.h2
          className="text-6xl md:text-7xl font-bold text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>{t("title")}</GradientText>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {applications.map((app, idx) => (
            <motion.div
              key={idx}
              className="relative h-full flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Top gradient border */}
              <div
                className="absolute top-0 left-0 w-full h-2"
                style={{ background: "linear-gradient(to right, transparent, #70befa, transparent)" }}
              />
              {/* Outer container with theme border */}
              <div className="border border-white/20 rounded-lg overflow-hidden flex flex-col h-full">
                {/* Placeholder image */}
                <div className="relative w-full aspect-video mb-6">
                  <img
                    src={app.imageSrc}
                    alt={t(`applications.${app.key}.title`)}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="px-8 flex flex-col">
                  <h4 className="text-2xl">
                    <GradientText>0{idx + 1}</GradientText> {t(`applications.${app.key}.title`)}
                  </h4>
                </div>
                {/* Content Card */}
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-gray-400 flex-1 leading-relaxed mb-6">
                    {t(`applications.${app.key}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
