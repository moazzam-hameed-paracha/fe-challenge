"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { AnimatedBorderButton } from "../../../ui/animated-border-button";
import { useTranslations } from "next-intl";

/**
 * No-Code Automation Section
 * Highlights ease of use with a bold headline and CTA
 */
export function NoCodeSection() {
  const t = useTranslations("NoCodeSection");
  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-8 leading-snug text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>{t("headline1")}</GradientText>
          <br />
          <GradientText>{t("headline2")}</GradientText>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <AnimatedBorderButton className="text-lg px-8 py-3">{t("cta")}</AnimatedBorderButton>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
