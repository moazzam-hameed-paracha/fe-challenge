"use client";

import React from "react";
import { GradientText } from "@/components/ui/gradient-text";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Footer Component
 * Site footer with organized links and company information
 * Features gradient text headers and responsive grid layout
 */
export function Footer() {
  const t = useTranslations("Footer");
  const socials = t.raw("socials");
  const applications = t.raw("applications");
  const resources = t.raw("resources");
  const additionalLinks = t.raw("additionalLinks");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">
              <GradientText>{t("brand")}</GradientText>
            </h3>
          </div>

          {/* Socials */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">
              <GradientText>{t("socialsTitle")}</GradientText>
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {socials.map((social: { name: string }, idx: number) => (
                <li key={idx}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {social.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: grouped */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">
              <GradientText>{t("linksTitle")}</GradientText>
            </h4>
            {/* Applications subgroup */}
            <div className="mb-6">
              <h5 className="font-semibold text-white mb-2">{t("applicationsTitle")}</h5>
              <ul className="space-y-2 text-sm text-gray-400 ml-0 md:ml-2">
                {applications.map((app: { name: string }, idx: number) => (
                  <li key={idx}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {app.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Resources subgroup */}
            <div>
              <h5 className="font-semibold text-white mb-2">{t("resourcesTitle")}</h5>
              <ul className="space-y-2 text-sm text-gray-400 ml-0 md:ml-2">
                {resources.map((res: { name: string }, idx: number) => (
                  <li key={idx}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {res.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Links on mobile below resources */}
            <div className="mt-4 md:mt-6">
              <ul className="space-y-2 text-sm text-gray-400">
                {additionalLinks.map((link: { name: string }, idx: number) => (
                  <li key={idx}>
                    <Link href="#" className="hover:text-white transition-colors">
                      {link.name}
                    </Link>
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
          <p className="text-white text-sm">{t("copyright", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
