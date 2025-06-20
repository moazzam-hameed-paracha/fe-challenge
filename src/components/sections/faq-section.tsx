"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { useTranslations } from "next-intl";

/**
 * FAQ Section Component
 * Interactive FAQ with expandable questions and answers
 * Features responsive grid layout and smooth animations
 */
export function FAQSection() {
  const t = useTranslations("FAQSection");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = t.raw("faqs");

  return (
    <AnimatedSection className="py-20 px-6">
      <div className="max-w-6xl mx-auto" id="faq">
        {/* Section title */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-left mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>{t("title")}</GradientText>
        </motion.h2>
        {/* Subheader */}
        <p className="text-gray-400 mb-12">{t("subtitle")}</p>
      </div>

      {/* FAQ grid - responsive: 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {faqs.map((faq: { q: string; a: string }, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-transparent border border-gray-700/50 rounded-lg h-full">
              <CardContent className="p-0">
                {/* FAQ question button */}
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold pr-4">
                    <GradientText>{faq.q}</GradientText>
                  </h3>
                  <div className="flex-shrink-0 w-6 h-6 border-2 border-[#70befa] flex items-center justify-center transition-all duration-200 ">
                    {expandedFaq === index ? (
                      <Minus className="w-3 h-3 text-[#70befa]" />
                    ) : (
                      <Plus className="w-3 h-3 text-[#70befa]" />
                    )}
                  </div>
                </button>

                {/* FAQ answer with animation */}
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
