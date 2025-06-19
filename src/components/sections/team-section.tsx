"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { InfiniteCarousel } from "@/components/ui/infinite-carousel";

/**
 * Team Section Component
 * Showcases team members in an infinite scrolling carousel
 * Features hoverable cards with team member information
 */
export function TeamSection() {
  const teamMembers = [
    { name: "CEO", role: "Chief Executive Officer", image: "/placeholder.svg?height=200&width=200" },
    { name: "David Li", role: "CTO", image: "/placeholder.svg?height=200&width=200" },
    { name: "Alex Wang", role: "Lead Engineer", image: "/placeholder.svg?height=200&width=200" },
    { name: "Sarah Chen", role: "Product Manager", image: "/placeholder.svg?height=200&width=200" },
    { name: "Mike Johnson", role: "AI Researcher", image: "/placeholder.svg?height=200&width=200" },
    { name: "Lisa Zhang", role: "UX Designer", image: "/placeholder.svg?height=200&width=200" },
  ];

  return (
    <AnimatedSection className="py-20 px-6 bg-gray-900/30">
      <div className="container mx-auto">
        {/* Section title */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientText>Meet our team</GradientText>
        </motion.h2>

        {/* Team carousel */}
        <InfiniteCarousel speed={30}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <Card className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm w-64 hover:border-gray-700/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  {/* Team member photo */}
                  <div className="w-24 h-24 bg-gray-800/50 rounded-full mx-auto mb-4 overflow-hidden border-2 border-gray-700/50">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Team member name */}
                  <h3 className="font-semibold mb-1 text-lg">
                    <GradientText>{member.name}</GradientText>
                  </h3>

                  {/* Team member role */}
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </InfiniteCarousel>
      </div>
    </AnimatedSection>
  );
}
