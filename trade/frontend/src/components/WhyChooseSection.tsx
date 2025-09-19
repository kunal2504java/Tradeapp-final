import { Shield, Wallet, Smartphone, DollarSign, RefreshCw, Zap } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "High-Speed Execution",
    description: "Our bots execute trades in milliseconds to capture the slimmest price gaps across exchanges, ensuring you never miss a profitable arbitrage opportunity."
  },
  {
    icon: RefreshCw,
    title: "Multi-Exchange Connectivity",
    description: "Link all your exchange accounts and trade across them seamlessly. Our platform supports 100+ exchanges for maximum arbitrage potential."
  },
  {
    icon: Smartphone,
    title: "Advanced Algorithms",
    description: "Proprietary algorithms identify and validate the most profitable opportunities using real-time market data and advanced statistical analysis."
  },
  {
    icon: DollarSign,
    title: "Automated Trading Bots",
    description: "Deploy our pre-configured bots or customize your own strategy. Set your parameters and let our bots work 24/7 to generate profits."
  },
  {
    icon: Wallet,
    title: "Real-Time Monitoring",
    description: "A live dashboard to track your bots' performance and profits. Monitor all your trades, profits, and market opportunities in real-time."
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your funds and data are protected with end-to-end encryption, multi-factor authentication, and cold storage security protocols."
  }
];

const WhyChooseSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-12 bg-gold"></div>
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-wide">WHY YOU</p>
              <h2 className="text-4xl font-bold text-navy font-poppins">CHOOSE FOX TRADING</h2>
            </div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the advantages that make Fox Trading the preferred choice for cryptocurrency 
            trading and investment solutions worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon Container */}
                <div className="mb-6">
                  <div className="bg-navy rounded-2xl p-4 w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-gold-glow transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-gold" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-navy mb-4 font-poppins group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/50 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-card">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-navy mb-2">Trusted by Industry Leaders</h3>
            <p className="text-gray-600">Our security and compliance certifications</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-gold text-2xl font-bold">256-bit</div>
              <div className="text-sm text-gray-600">SSL Encryption</div>
            </div>
            <div className="space-y-2">
              <div className="text-gold text-2xl font-bold">FDIC</div>
              <div className="text-sm text-gray-600">Insured</div>
            </div>
            <div className="space-y-2">
              <div className="text-gold text-2xl font-bold">SOC 2</div>
              <div className="text-sm text-gray-600">Type II Certified</div>
            </div>
            <div className="space-y-2">
              <div className="text-gold text-2xl font-bold">PCI DSS</div>
              <div className="text-sm text-gray-600">Level 1 Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;