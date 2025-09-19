import { Wallet, ArrowRight, Repeat } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: "CONNECT YOUR EXCHANGES",
    description: "Securely link your exchange accounts via API keys. Our platform supports 100+ exchanges including Binance, Coinbase, Kraken, and more.",
    step: "01"
  },
  {
    icon: ArrowRight,
    title: "CONFIGURE YOUR BOT", 
    description: "Set your trading pairs, investment amount, and risk tolerance. Choose from pre-built strategies or create your own custom arbitrage bot.",
    step: "02"
  },
  {
    icon: Repeat,
    title: "DEPLOY & MONITOR",
    description: "Launch your bot and watch it execute trades from your live dashboard. Monitor performance, profits, and adjust settings in real-time.",
    step: "03"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-12 bg-gold"></div>
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-wide">HOW IT</p>
              <h2 className="text-4xl font-bold text-navy font-poppins">WORKS</h2>
            </div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Getting started with arbitrage trading is simple and straightforward. 
            Follow these three easy steps to begin generating profits from market inefficiencies.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden lg:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gold/30"></div>
            <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-gold rounded-full border-4 border-white shadow-lg"></div>
            </div>

            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-gray-50 rounded-2xl p-8 text-center relative z-10 hover:shadow-elegant transition-all duration-300 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gold text-navy rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-gold-glow">
                      {step.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-8 mt-4">
                    <div className="bg-gold rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-10 w-10 text-navy" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-navy mb-4 font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gold/30 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-gold/20 rounded-full"></div>
                </div>

                {/* Mobile Connecting Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <div className="bg-gold rounded-full p-2">
                      <ArrowRight className="h-4 w-4 text-navy transform rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-primary rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Earning?</h3>
              <p className="text-gray-200 mb-6">
                Join thousands of traders who trust Fox Trading for consistent arbitrage profits and automated trading success.
              </p>
              <button className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors shadow-gold-glow">
                Start Arbitrage Trading Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;