import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calculator, TrendingUp } from 'lucide-react';

// Mock exchange rates
const exchangeRates = {
  'bitcoin-usd': 43250.00,
  'bitcoin-eur': 39875.50,
  'bitcoin-gbp': 34128.75,
  'ethereum-usd': 2650.00,
  'ethereum-eur': 2445.75,
  'ethereum-gbp': 2089.25,
  'litecoin-usd': 72.50,
  'litecoin-eur': 66.85,
  'litecoin-gbp': 57.15,
};

const coins = [
  { id: 'bitcoin', name: 'Bitcoin (BTC)', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum (ETH)', symbol: 'ETH' },
  { id: 'litecoin', name: 'Litecoin (LTC)', symbol: 'LTC' },
];

const currencies = [
  { id: 'usd', name: 'US Dollar', symbol: 'USD' },
  { id: 'eur', name: 'Euro', symbol: 'EUR' },
  { id: 'gbp', name: 'British Pound', symbol: 'GBP' },
];

const CalculatorSection = () => {
  const [amount, setAmount] = useState('1');
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [calculatedValue, setCalculatedValue] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const rateKey = `${selectedCoin}-${selectedCurrency}`;
    const rate = exchangeRates[rateKey as keyof typeof exchangeRates] || 0;
    setExchangeRate(rate);
    
    const numAmount = parseFloat(amount) || 0;
    setCalculatedValue(numAmount * rate);
  }, [amount, selectedCoin, selectedCurrency]);

  const selectedCoinData = coins.find(coin => coin.id === selectedCoin);
  const selectedCurrencyData = currencies.find(curr => curr.id === selectedCurrency);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Calculator */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-gold"></div>
              <div>
                <p className="text-gold font-semibold text-sm uppercase tracking-wide">ARBITRAGE PROFIT</p>
                <h2 className="text-4xl font-bold text-navy font-poppins">CALCULATOR</h2>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="h-6 w-6 text-gold" />
                <h3 className="text-xl font-bold text-navy">Estimate Your Potential Profit</h3>
              </div>

              <div className="space-y-6">
                {/* Investment Amount */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    → Investment Amount:
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter investment amount (e.g., 1000)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-2 border-gold/20 focus:border-gold"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the amount you want to invest in arbitrage trading.
                  </p>
                </div>

                {/* Buy Exchange Price */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    → Buy Exchange Price:
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter buy price (e.g., 43000)"
                    defaultValue="43000"
                    className="border-2 border-gold/20 focus:border-gold"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Price on the exchange where you'll buy the cryptocurrency.
                  </p>
                </div>

                {/* Sell Exchange Price */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    → Sell Exchange Price:
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter sell price (e.g., 43150)"
                    defaultValue="43150"
                    className="border-2 border-gold/20 focus:border-gold"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Price on the exchange where you'll sell the cryptocurrency.
                  </p>
                </div>

                {/* Trading Fees */}
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">
                    → Trading Fees (%):
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter total fees (e.g., 0.5)"
                    defaultValue="0.5"
                    className="border-2 border-gold/20 focus:border-gold"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Combined trading fees from both exchanges (as percentage).
                  </p>
                </div>

                {/* Results */}
                <div className="bg-gold/10 rounded-xl p-6 border-2 border-gold/20">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">
                        → Potential Profit Per Trade:
                      </label>
                      <div className="text-3xl font-bold text-green-600">
                        +$36.75
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Estimated profit from the price difference minus trading fees.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">
                        → Profit Margin:
                      </label>
                      <div className="text-lg text-navy">
                        3.67%
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Percentage return on your investment per arbitrage trade.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1">
                        → Daily Potential (10 trades):
                      </label>
                      <div className="text-lg text-green-600 font-bold">
                        +$367.50
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Estimated daily profit with automated trading.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button className="flex-1 bg-gold text-navy hover:bg-gold/90">
                    Start Arbitrage Bot
                  </Button>
                  <Button variant="outline" className="flex-1 border-gold text-gold hover:bg-gold hover:text-navy">
                    Set Price Alerts
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Dashboard Image */}
          <div className="relative">
            <div className="bg-gradient-primary rounded-2xl p-8 shadow-elegant">
              {/* Mock Trading Dashboard */}
              <div className="bg-white rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">Fox Trading Dashboard</div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-xs text-blue-600 mb-1">Portfolio</div>
                    <div className="font-bold text-navy">$1,340</div>
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12.5%
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-xs text-red-600 mb-1">Revenue</div>
                    <div className="font-bold text-navy">$125M+</div>
                    <div className="text-xs text-green-600">+89%</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-xs text-green-600 mb-1">Activity</div>
                    <div className="font-bold text-navy">540</div>
                    <div className="text-xs text-green-600">+8%</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-xs text-purple-600 mb-1">Users</div>
                    <div className="font-bold text-navy">+89%</div>
                    <div className="text-xs text-green-600">+26%</div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="h-32 bg-gradient-to-br from-gold/20 via-gold/10 to-transparent rounded-lg flex items-end justify-between p-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={i}
                      className="bg-gold rounded-t-sm w-4"
                      style={{ height: `${20 + Math.random() * 80}%` }}
                    ></div>
                  ))}
                </div>

                {/* Activity List */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Bitcoin Purchase</span>
                    </div>
                    <span className="text-green-600">+$2,400</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Ethereum Trade</span>
                    </div>
                    <span className="text-green-600">+$1,200</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gold text-navy rounded-full p-3 shadow-gold-glow">
              <div className="text-sm font-bold">Live</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;