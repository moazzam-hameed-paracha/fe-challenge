"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { InfiniteCarousel } from "@/components/ui/infinite-carousel";

/**
 * Reviews Section Component
 * Displays customer testimonials in an infinite carousel
 * Features responsive design with different layouts for mobile/desktop
 */
export function ReviewsSection() {
  const reviews = [
    {
      name: "Richard Song",
      role: "CEO - Epsilla",
      review: "We had tried all the pdf extraction tool and AnyParser gave us the most accurate results.",
      image: "/placeholder.svg",
    },
    {
      name: "Ethan Zheng",
      role: "CTO - Jobright",
      review:
        "AnyParser outperformed 10+ other parsers in our benchmarks, delivering top-tier resume parsing accuracy with the fastest multi-model LLM solution—all while maintaining exceptional performance.",
      image: "/placeholder.svg",
    },
    {
      name: "Jon Conradt",
      role: "Principal Scientist - AWS",
      review:
        "AnyParser's advanced multimodal AI delivers where other approaches fail. Complex documents require this fusion of sight and language.",
      image: "/placeholder.svg",
    },
    {
      name: "Cass",
      role: "Senior Scientist - AWS",
      review:
        "As an AI educator, I seek SOTA solutions for my ML practitioner students. AnyParser enhances retrieval accuracy in document parsing while balancing security, cost, and efficiency—an innovative tool for any pipeline!",
      image: "/placeholder.svg",
    },
    {
      name: "Felix Bai",
      role: "Sr. Solution Architect - AWS",
      review:
        "I am impressed by AnyParser's innovation in the space of AI and LLM, including the novel methodologies of synthetic data generation, retriever model fine-tuning in RAG, and their open-source products out of those innovations.",
      image: "/placeholder.svg",
    },
    {
      name: "Steve Cooper",
      role: "Cofounder - ai ticker chat",
      review:
        "I have validated the quality of AnyParser goes far beyond traditional OCR tools like Langchain / Unstructured. Looking forward to using this in our future projects.",
      image: "/placeholder.svg",
    },
    {
      name: "Jamal",
      role: "CEO - xtrategise",
      review: "It's far better than other tools! Our data analysts are able to triple their outputs.",
      image: "/placeholder.svg",
    },
  ];

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
          <GradientText>Reviews</GradientText>
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
                        src={review.image}
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
                        src={review.image}
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
