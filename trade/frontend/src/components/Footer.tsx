import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import foxLogo from '@/assets/fox-logo.png';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={foxLogo} 
                alt="Fox Trading Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold font-poppins">Fox Trading</h3>
                <p className="text-xs text-gray-400">Investment Co.</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Fox Trading & Investment Co. is a leading cryptocurrency trading platform 
              dedicated to providing secure, transparent, and profitable digital asset 
              management solutions for traders worldwide.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-gold/10 hover:bg-gold hover:text-navy p-2 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gold/10 hover:bg-gold hover:text-navy p-2 rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gold/10 hover:bg-gold hover:text-navy p-2 rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gold/10 hover:bg-gold hover:text-navy p-2 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-xl font-bold text-gold mb-6 font-poppins">Useful Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-gold transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-gold transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h4 className="text-xl font-bold text-gold mb-6 font-poppins">Other Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#business-plan" className="text-gray-300 hover:text-gold transition-colors">
                  Business Plan
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-gold transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                  Connect
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-xl font-bold text-gold mb-6 font-poppins">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    123 Financial District<br />
                    Crypto City, CC 12345<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <a 
                  href="mailto:support@foxtrading.com" 
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  support@foxtrading.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" />
                <a 
                  href="tel:+15551234567" 
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>

              <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
                <div className="text-gold font-semibold mb-2">24/7 Customer Support</div>
                <div className="text-gray-300 text-sm">
                  Our dedicated support team is available around the clock to assist you 
                  with any questions or concerns.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 Fox Trading and Investment Co. All Rights Reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Made with ❤️ for crypto traders</span>
              <span>•</span>
              <span>Secure • Reliable • Profitable</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
