"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { InfiniteCarousel } from "@/components/ui/infinite-carousel";
import { useTranslations } from "next-intl";

/**
 * Reviews Section Component
 * Displays customer testimonials in an infinite carousel
 * Features responsive design with different layouts for mobile/desktop
 */
export function ReviewsSection() {
  const t = useTranslations("ReviewsSection");
  const reviews = t.raw("reviews") as Array<{ name: string; role: string; review: string }>;

  return (
    <AnimatedSection className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section title */}
        <motion.h2
          className="max-w-6xl mx-auto text-5xl md:text-6xl font-bold text-left mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>{t("title")}</GradientText>
        </motion.h2>

        {/* Reviews carousel */}
        <InfiniteCarousel speed={40}>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
            >
              <Card className="border border-gray-800/50 rounded-lg hover:shadow-[0px_0px_2px_0.5px_rgba(112,190,250,0.75)] transition-all duration-300 w-80">
                <CardContent className="p-8">
                  {/* Review quote */}
                  <div className="mb-6 p-4 border border-gray-800/50 rounded-lg">
                    <p className="text-gray-300 text-sm leading-relaxed">&quot;{review.review}&quot;</p>
                  </div>

                  {/* Reviewer profile - Desktop layout */}
                  <div className="hidden md:flex items-center gap-3 p-4 border border-gray-800/50 rounded-lg">
                    <div className="h-[50px] w-[50px] flex-shrink-0 relative">
                      <Image
                        src="/placeholder.svg"
                        alt={review.name}
                        fill
                        className="w-full aspect-square object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        <GradientText>{review.name}</GradientText>
                      </p>
                      <p className="text-gray-400 text-sm">{review.role}</p>
                    </div>
                  </div>

                  {/* Reviewer profile - Mobile/Tablet layout */}
                  <div className="md:hidden text-center">
                    <div className="h-[50px] w-[50px] mx-auto mb-3 relative">
                      <Image
                        src="/placeholder.svg"
                        alt={review.name}
                        fill
                        className="w-full aspect-square object-cover rounded-full"
                      />
                    </div>
                    <p className="font-semibold">
                      <GradientText>{review.name}</GradientText>
                    </p>
                    <p className="text-gray-400 text-sm">{review.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </InfiniteCarousel>
      </div>
    </AnimatedSection>
  );
}
