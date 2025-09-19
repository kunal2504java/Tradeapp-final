import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="bg-gradient-primary rounded-2xl p-8 shadow-elegant">
              {/* Mock Dashboard */}
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">Portfolio Value</div>
                  <div className="text-green-500 text-sm">+12.5%</div>
                </div>
                <div className="text-3xl font-bold text-navy mb-6">$125,847.32</div>
                
                {/* Mini Charts */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Bitcoin</div>
                    <div className="font-semibold text-navy">$42,500</div>
                    <div className="text-xs text-green-500">+2.3%</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Ethereum</div>
                    <div className="font-semibold text-navy">$3,200</div>
                    <div className="text-xs text-green-500">+4.1%</div>
                  </div>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="h-32 bg-gradient-to-r from-gold/20 to-gold/40 rounded-lg flex items-end justify-around p-2">
                  <div className="w-4 bg-gold rounded-t-sm" style={{ height: '60%' }}></div>
                  <div className="w-4 bg-gold rounded-t-sm" style={{ height: '80%' }}></div>
                  <div className="w-4 bg-gold rounded-t-sm" style={{ height: '40%' }}></div>
                  <div className="w-4 bg-gold rounded-t-sm" style={{ height: '90%' }}></div>
                  <div className="w-4 bg-gold rounded-t-sm" style={{ height: '70%' }}></div>
                  <div className="w-4 bg-gold rounded-t-sm" style={{ height: '100%' }}></div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-gold text-navy rounded-full p-3 shadow-lg">
              <div className="text-sm font-bold">24/7</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-500 text-white rounded-full p-3 shadow-lg">
              <div className="text-sm font-bold">+15%</div>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-gold"></div>
              <div>
                <p className="text-gold font-semibold text-sm uppercase tracking-wide">PROFIT FROM</p>
                <h2 className="text-4xl font-bold text-navy font-poppins">PRICE DIFFERENCES</h2>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-navy mb-6">
              Automated Trading, Superior Results
            </h3>

            <div className="space-y-4 mb-8 text-gray-600">
              <p className="text-lg leading-relaxed">
                <span className="text-gold font-semibold">Fox Trading revolutionizes arbitrage trading</span> 
                by capturing fleeting opportunities across hundreds of exchanges simultaneously. Our advanced 
                algorithms identify and execute profitable trades faster than any human trader could.
              </p>
              
              <p className="leading-relaxed">
                Experience the power of automated arbitrage with our sophisticated trading bots that monitor 
                price differences 24/7. From risk management to portfolio optimization, access the entire 
                cryptocurrency market from one comprehensive dashboard.
              </p>

              <p className="leading-relaxed">
                Join thousands of traders who trust Fox Trading for consistent profits through systematic 
                arbitrage strategies, institutional-grade security, and real-time performance monitoring.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="font-medium">High-Speed Execution</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="font-medium">Multi-Exchange Access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="font-medium">Automated Trading Bots</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="font-medium">Real-Time Monitoring</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-gold text-navy hover:bg-gold/90 font-semibold shadow-gold-glow"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;