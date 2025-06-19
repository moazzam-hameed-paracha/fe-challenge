"use client";

import type React from "react";

import {
  AIIntegrationHubSection,
  AnimatedHeader,
  ApplicationsSection,
  ContactSection,
  CoreFeaturesSection,
  DemoVideoSection,
  FAQSection,
  Footer,
  HeroSection,
  NoCodeSection,
  PartnersSection,
  PricingSection,
  ReviewsSection,
  StatisticsSection,
  TeamSection,
} from "@/components/sections";

/**
 * Home Page Component
 * Main landing page that orchestrates all sections
 * Provides the overall page structure and layout with proper section ordering
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Fixed navigation header */}
      <AnimatedHeader />

      {/* Page sections in logical order */}
      <HeroSection />
      <AIIntegrationHubSection />
      <DemoVideoSection />
      <NoCodeSection />
      <CoreFeaturesSection />
      <ApplicationsSection />
      <StatisticsSection />
      <TeamSection />
      <PartnersSection />
      <PricingSection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />

      {/* Site footer */}
      <Footer />
    </div>
  );
}
