import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FFC107\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1.5\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}></div>
      </div>

      <div className="absolute top-1/4 left-10 animate-pulse opacity-30">
        <TrendingUp className="h-8 w-8 text-gold" />
      </div>
      <div className="absolute top-1/3 right-20 animate-pulse opacity-30">
        <Shield className="h-6 w-6 text-gold" />
      </div>
      <div className="absolute bottom-1/4 left-20 animate-pulse opacity-30">
        <Zap className="h-10 w-10 text-gold" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-poppins leading-tight">
            Unlock Market Inefficiencies with
            <span className="block text-gold">Automated Arbitrage</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our platform scans hundreds of exchanges in real-time to execute high-speed trades, 
            turning price differences into profit for you.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">500K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">$2.5B+</div>
              <div className="text-gray-300">Trading Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
            <Button 
              size="lg" 
              className="bg-gold text-navy hover:bg-gold/90 text-lg px-8 py-6 font-semibold shadow-gold-glow"
            >
              Start Trading
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white bg-white text-navy hover:bg-white/90 hover:text-navy text-lg px-8 py-6 font-semibold"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
            <Link to="/login" className="text-white/80 hover:text-gold transition-colors text-lg underline">Guest Login</Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="text-gray-300 text-sm">Trusted by</div>
            <div className="flex items-center gap-6 text-gray-400">
              <span className="text-sm font-medium">SEC Compliant</span>
              <span className="text-sm">•</span>
              <span className="text-sm font-medium">FDIC Insured</span>
              <span className="text-sm">•</span>
              <span className="text-sm font-medium">ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;