import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MapPin, Phone, Clock } from 'lucide-react';
import foxLogo from '@/assets/fox-logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top Bar */}
      <div className="bg-gold py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm text-navy">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Financial District, Crypto City, CC 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
            </div>
            <div className="hidden md:block font-semibold">
              WELCOME TO FOX TRADING & INVESTMENT CO.
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src={foxLogo} 
                alt="Fox Trading Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-primary font-poppins">Fox Trading</h1>
                <p className="text-xs text-muted-foreground">Investment Co.</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#home" className="font-medium text-primary hover:text-gold transition-colors">
                HOME
              </a>
              <a href="#about" className="font-medium text-foreground hover:text-gold transition-colors">
                ABOUT US
              </a>
              <a href="#services" className="font-medium text-foreground hover:text-gold transition-colors">
                SERVICES
              </a>
              <a href="#business-plan" className="font-medium text-foreground hover:text-gold transition-colors">
                BUSINESS PLAN
              </a>
              <a href="#contact" className="font-medium text-foreground hover:text-gold transition-colors">
                CONTACT
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <Link to="/app">
                  <Button className="bg-gold text-navy hover:bg-gold/90">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-navy">Login Now</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gold text-navy hover:bg-gold/90">Register</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <a href="#home" className="font-medium text-primary">HOME</a>
                <a href="#about" className="font-medium text-foreground">ABOUT US</a>
                <a href="#services" className="font-medium text-foreground">SERVICES</a>
                <a href="#business-plan" className="font-medium text-foreground">BUSINESS PLAN</a>
                <a href="#contact" className="font-medium text-foreground">CONTACT</a>
                <div className="flex flex-col gap-2 mt-4">
                  {isAuthenticated ? (
                    <Link to="/app">
                      <Button className="w-full bg-gold text-navy hover:bg-gold/90">Go to Dashboard</Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-navy">Login Now</Button>
                      </Link>
                      <Link to="/register">
                        <Button className="w-full bg-gold text-navy hover:bg-gold/90">Register</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;