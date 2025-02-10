import { Shield } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
          <footer className="bg-gray-900 backdrop-blur-lg text-gray-300 py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-white font-semibold mb-4">Platform</h3>
                  <ul className="space-y-2">
                    <li><a href="#features" className="hover:text-white">Features</a></li>
                    <li><a href="#report-crime" className="hover:text-white">Report Crime</a></li>
                    <li><a href="#resources" className="hover:text-white">Resources</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Support</h3>
                  <ul className="space-y-2">
                    <li><a href="/pages/support/help-center" className="hover:text-white">Help Center</a></li>
                    <li><a href="/pages/support/contact-us" className="hover:text-white">Contact Us</a></li>
                    <li><a href="/pages/support/faq" className="hover:text-white">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Legal</h3>
                  <ul className="space-y-2">
                    <li><Link href="/pages/legal/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                    <li><Link href="/pages/legal/terms" className="hover:text-white">Terms of Service</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Connect</h3>
                  <div className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <Shield className="w-8 h-8 text-[#0466c8]" />
                    <span className="ml-2 text-xl font-bold text-[#979dac] hover:text-white transition-colors">
                      CyberGuard
                    </span>
                  </Link>
                </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                <p>© 2025 CyberGuard. All rights reserved.</p>
              </div>
            </div>
          </footer>
  );
};
