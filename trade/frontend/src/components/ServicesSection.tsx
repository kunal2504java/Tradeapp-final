import { TrendingUp, ShoppingCart, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: TrendingUp,
    title: "Automated Arbitrage Bots",
    description: "Our flagship service for hands-free trading. Deploy sophisticated bots that scan markets 24/7 to execute profitable arbitrage trades automatically.",
    features: ["Pre-configured Strategies", "Custom Bot Builder", "Risk Management", "Performance Analytics"]
  },
  {
    icon: BarChart3,
    title: "Portfolio & Profit Tracking", 
    description: "Consolidate and monitor your assets across all exchanges. Track your arbitrage profits, performance metrics, and trading history in one dashboard.",
    features: ["Multi-Exchange View", "Profit Analytics", "Risk Assessment", "Tax Reporting"]
  },
  {
    icon: ShoppingCart,
    title: "Advanced Market Analytics",
    description: "Tools to help you identify trends and opportunities manually. Access real-time market data, price spreads, and arbitrage opportunities.",
    features: ["Price Monitoring", "Spread Analysis", "Market Alerts", "Historical Data"]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-12 bg-gold"></div>
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-wide">OUR</p>
              <h2 className="text-4xl font-bold text-navy font-poppins">SERVICES</h2>
            </div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Specialized arbitrage trading solutions designed to maximize your profits through 
            automated market analysis and high-speed execution across multiple exchanges.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="group relative">
                {/* Service Card */}
                <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-300 h-full">
                  {/* Service Image/Icon Area */}
                  <div className="relative mb-6 h-48 bg-gradient-primary rounded-xl flex items-center justify-center overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-8 gap-1 h-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="bg-gold rounded-full opacity-30 animate-pulse" 
                            style={{ 
                              animationDelay: `${i * 0.1}s`,
                              height: Math.random() * 100 + '%' 
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Main Icon */}
                    <div className="relative z-10 bg-gold rounded-full p-6 shadow-gold-glow">
                      <IconComponent className="h-12 w-12 text-navy" />
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 bg-gold/20 rounded-full p-2">
                      <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-gold/20 rounded-full p-3">
                      <div className="w-3 h-3 bg-gold rounded-full animate-pulse animation-delay-500"></div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-navy font-poppins group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-navy text-sm">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/30 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Services Banner */}
        <div className="mt-16 bg-gradient-primary rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need Custom Solutions?</h3>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Our team of experts can create tailored cryptocurrency solutions for enterprises, 
            institutions, and high-volume traders. Get in touch to discuss your specific requirements.
          </p>
          <button className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors shadow-gold-glow">
            Contact Our Experts
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;