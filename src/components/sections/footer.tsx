"use client";

import React from "react";
import { GradientText } from "@/components/ui/gradient-text";

/**
 * Footer Component
 * Site footer with organized links and company information
 * Features gradient text headers and responsive grid layout
 */
export function Footer() {
  const socials = [
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
  ];

  const applications = [
    { name: "AI O&G Specialist", href: "#" },
    { name: "AI HR", href: "#" },
    { name: "AI Data Scientist", href: "#" },
  ];

  const resources = [
    { name: "Security Whitepaper", href: "#" },
    { name: "Deployment Overview", href: "#" },
    { name: "AWS Deployment", href: "#" },
    { name: "Azure Deployment", href: "#" },
    { name: "Templates", href: "#" },
  ];

  const additionalLinks = [
    { name: "Company", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">
              <GradientText>Energent.ai</GradientText>
            </h3>
          </div>

          {/* Socials */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">
              <GradientText>Socials</GradientText>
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {socials.map((social, idx) => (
                <li key={idx}>
                  <a href={social.href} className="hover:text-white transition-colors">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: grouped */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">
              <GradientText>Links</GradientText>
            </h4>
            {/* Applications subgroup */}
            <div className="mb-6">
              <h5 className="font-semibold text-white mb-2">Applications</h5>
              <ul className="space-y-2 text-sm text-gray-400 ml-0 md:ml-2">
                {applications.map((app, idx) => (
                  <li key={idx}>
                    <a href={app.href} className="hover:text-white transition-colors">
                      {app.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Resources subgroup */}
            <div>
              <h5 className="font-semibold text-white mb-2">Resources</h5>
              <ul className="space-y-2 text-sm text-gray-400 ml-0 md:ml-2">
                {resources.map((res, idx) => (
                  <li key={idx}>
                    <a href={res.href} className="hover:text-white transition-colors">
                      {res.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Links on mobile below resources */}
            <div className="mt-4 md:mt-6">
              <ul className="space-y-2 text-sm text-gray-400">
                {additionalLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Empty or future content placeholder*/}
          <div className="hidden md:block"></div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800/50 mt-8 pt-8 text-left">
          <p className="text-white text-sm">© {new Date().getFullYear()}, Energent.ai - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
