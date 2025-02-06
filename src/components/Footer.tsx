import { Shield, Globe, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
          <footer className="bg-gray-900 backdrop-blur-lg text-gray-300 py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-white font-semibold mb-4">Platform</h3>
                  <ul className="space-y-2">
                    <li><a href="#features" className="hover:text-white">Features</a></li>
                    <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
                    <li><a href="#" className="hover:text-white">Pricing</a></li>
                    <li><a href="#" className="hover:text-white">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Support</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white">Help Center</a></li>
                    <li><a href="#" className="hover:text-white">Contact Us</a></li>
                    <li><a href="#" className="hover:text-white">Community</a></li>
                    <li><a href="#" className="hover:text-white">Resources</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Legal</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white">Security</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Connect</h3>
                  <div className="flex space-x-4">
                    <Shield className="w-6 h-6" />
                    <Globe className="w-6 h-6" />
                    <MessageSquare className="w-6 h-6" />
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
