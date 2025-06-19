import { GradientText } from "@/components/ui/gradient-text";

/**
 * Footer Component
 * Site footer with organized links and company information
 * Features gradient text headers and responsive grid layout
 */
export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/50 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold mb-8">
              <GradientText>Energent.ai</GradientText>
            </h3>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">
              <GradientText>Socials</GradientText>
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Main Links */}
          <div>
            <h4 className="font-semibold mb-4">
              <GradientText>Links</GradientText>
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Applications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AI O&G Specialist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AI HR
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AI Data Scientist
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">
              <GradientText>Resources</GradientText>
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Deployment Overview
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AWS Deployment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Azure Deployment
                </a>
              </li>
            </ul>
          </div>

          {/* Additional Links Column 1 */}
          <div>
            <ul className="space-y-2 text-sm text-gray-400 mt-8">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Company
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Additional Links Column 2 */}
          <div>
            <ul className="space-y-2 text-sm text-gray-400 mt-8">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800/50 mt-8 pt-8">
          <p className="text-gray-400 text-sm">© 2025, Cambio Corp. - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
