const chartData = [
  { month: 'Jan', sales: 220, balance: 620, revenue: 330 },
  { month: 'Feb', sales: 350, balance: 580, revenue: 380 },
  { month: 'Mar', sales: 420, balance: 450, revenue: 420 },
  { month: 'Apr', sales: 340, balance: 350, revenue: 310 },
  { month: 'May', sales: 480, balance: 250, revenue: 480 },
  { month: 'Jun', sales: 380, balance: 340, revenue: 350 },
  { month: 'Jul', sales: 350, balance: 340, revenue: 350 },
  { month: 'Aug', sales: 230, balance: 270, revenue: 250 },
  { month: 'Sep', sales: 240, balance: 250, revenue: 270 },
  { month: 'Oct', sales: 340, balance: 480, revenue: 480 },
  { month: 'Nov', sales: 600, balance: 620, revenue: 580 },
  { month: 'Dec', sales: 520, balance: 590, revenue: 500 },
];

const GrowthChartSection = () => {
  return (
    <section className="py-20 bg-gradient-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-1 h-12 bg-gold"></div>
              <div>
                <p className="text-gold font-semibold text-sm uppercase tracking-wide">TRACK YOUR</p>
                <h2 className="text-4xl font-bold text-white font-poppins">ARBITRAGE PROFITS</h2>
              </div>
          </div>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">
            Visualize cumulative profit growth over time and see how our arbitrage platform 
            consistently delivers superior returns through automated trading strategies.
          </p>
        </div>

        {/* Chart Container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            {/* Chart Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Arbitrage Performance & Profits</h3>
                <p className="text-gray-300">Total: 12,847 arbitrage trades executed this period</p>
              </div>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gold rounded-sm"></div>
                  <span className="text-gray-300 text-sm">Arbitrage Profits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-gray-300 text-sm">Portfolio Value</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Trading Volume</span>
                </div>
              </div>
            </div>

            {/* Simple Visual Chart */}
            <div className="h-96 bg-navy/20 rounded-xl p-6 flex items-end justify-between gap-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1">
                  <div className="relative flex items-end h-64">
                    {/* Sales Bar */}
                    <div 
                      className="bg-gold rounded-t-md w-6 mr-1 transition-all duration-1000 hover:bg-gold/80"
                      style={{ height: `${(data.sales / 600) * 100}%` }}
                      title={`Sales: ${data.sales}`}
                    ></div>
                    
                    {/* Balance Line Dot */}
                    <div 
                      className="absolute w-3 h-3 bg-white rounded-full border-2 border-white shadow-lg"
                      style={{ 
                        bottom: `${(data.balance / 700) * 100}%`,
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                      title={`Balance: ${data.balance}`}
                    ></div>
                    
                    {/* Revenue Line Dot */}
                    <div 
                      className="absolute w-2 h-2 bg-red-400 rounded-full"
                      style={{ 
                        bottom: `${(data.revenue / 600) * 100}%`,
                        right: '0'
                      }}
                      title={`Revenue: ${data.revenue}`}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-300 text-center">{data.month}</div>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-1">+145%</div>
                <div className="text-gray-300 text-sm">Annual Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">$12.8M</div>
                <div className="text-gray-300 text-sm">Total Volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-1">98.7%</div>
                <div className="text-gray-300 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-gray-300 text-sm">Market Access</div>
              </div>
            </div>
          </div>

          {/* Performance Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-gold text-2xl font-bold mb-2">Q4 2024</div>
              <div className="text-white font-semibold mb-1">Best Performance</div>
              <div className="text-gray-300 text-sm">Achieved 156% returns with our AI-driven trading algorithms</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-gold text-2xl font-bold mb-2">500K+</div>
              <div className="text-white font-semibold mb-1">Active Traders</div>
              <div className="text-gray-300 text-sm">Growing community of successful cryptocurrency traders</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-gold text-2xl font-bold mb-2">$2.5B</div>
              <div className="text-white font-semibold mb-1">Assets Under Management</div>
              <div className="text-gray-300 text-sm">Trusted with billions in cryptocurrency investments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthChartSection;