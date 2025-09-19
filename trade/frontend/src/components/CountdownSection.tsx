import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2437,
    hours: 15,
    minutes: 8,
    seconds: 23
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else if (days > 0) {
          seconds = 59;
          minutes = 59;
          hours = 23;
          days--;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-gold via-transparent to-gold"></div>
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M50 5L60 35L90 35L68 57L78 85L50 70L22 85L32 57L10 35L40 35Z\" fill=\"%23FFC107\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')"
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-12 bg-gold"></div>
            <div>
              <p className="text-gold font-semibold text-sm uppercase tracking-wide">GET TOKENS</p>
              <h2 className="text-4xl font-bold text-navy font-poppins">BEFORE TIME UP</h2>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gold rounded-2xl p-8 text-center shadow-gold-glow">
              <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
                -{timeLeft.days}
              </div>
              <div className="border-t-2 border-navy pt-2">
                <div className="text-navy font-semibold uppercase text-sm tracking-wide">DAYS</div>
              </div>
            </div>

            <div className="bg-gold rounded-2xl p-8 text-center shadow-gold-glow">
              <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
                -{timeLeft.hours}
              </div>
              <div className="border-t-2 border-navy pt-2">
                <div className="text-navy font-semibold uppercase text-sm tracking-wide">HOURS</div>
              </div>
            </div>

            <div className="bg-gold rounded-2xl p-8 text-center shadow-gold-glow">
              <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
                -{timeLeft.minutes}
              </div>
              <div className="border-t-2 border-navy pt-2">
                <div className="text-navy font-semibold uppercase text-sm tracking-wide">MINUTES</div>
              </div>
            </div>

            <div className="bg-gold rounded-2xl p-8 text-center shadow-gold-glow">
              <div className="text-4xl md:text-5xl font-bold text-navy mb-2">
                -{timeLeft.seconds}
              </div>
              <div className="border-t-2 border-navy pt-2">
                <div className="text-navy font-semibold uppercase text-sm tracking-wide">SECONDS</div>
              </div>
            </div>
          </div>

          {/* Token Info */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="text-2xl font-bold text-navy mb-2">1 COIN = 0.3 USD</div>
                <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Coin Now
                </Button>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="space-y-2">
                <div className="text-lg text-gray-600">Total Tokens Budget</div>
                <div className="text-4xl md:text-5xl font-bold text-gold">56,369,252</div>
                <div className="text-sm text-gray-500">Tokens Available</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-card">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-navy font-semibold">Token Sale Progress</span>
                <span className="text-gold font-bold">67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-gold h-4 rounded-full transition-all duration-1000" 
                  style={{ width: '67%' }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
              <div>
                <div className="font-bold text-navy">18.2M</div>
                <div>Sold</div>
              </div>
              <div>
                <div className="font-bold text-navy">37.8M</div>
                <div>Total Supply</div>
              </div>
              <div>
                <div className="font-bold text-navy">19.6M</div>
                <div>Remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;