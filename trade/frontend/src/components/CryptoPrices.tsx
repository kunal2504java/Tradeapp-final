import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  RefreshCw, 
  BarChart3, 
  DollarSign,
  Clock,
  Activity,
  Zap
} from 'lucide-react';

type CryptoPriceData = {
  id: number;
  symbol: string;
  name: string;
  price: number;
  priceFormatted: string;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  marketCapFormatted: string;
  volume24hFormatted: string;
  lastUpdated: string;
  rank: number;
  trend: {
    '1h': 'up' | 'down' | 'neutral';
    '24h': 'up' | 'down' | 'neutral';
    '7d': 'up' | 'down' | 'neutral';
  };
};

type CryptoPricesResponse = {
  success: boolean;
  data: CryptoPriceData[];
  cached: boolean;
  lastUpdated: string;
  nextUpdate?: string;
  error?: string;
};

type MarketOverview = {
  totalMarketCap: number;
  totalMarketCapFormatted: string;
  total24hVolume: number;
  total24hVolumeFormatted: string;
  avgChange24h: number;
  topGainers: CryptoPriceData[];
  topLosers: CryptoPriceData[];
};

const CRYPTO_ICONS: Record<string, string> = {
  BTC: '₿',
  ETH: 'Ξ',
  USDT: '₮',
  USDC: '$',
  BNB: '🔸',
  ADA: '₳',
  SOL: '◎',
  MATIC: '🟣',
  XRP: '◉',
  DOGE: 'Ð',
  DOT: '●',
  AVAX: '🔺',
  LINK: '🔗',
  UNI: '🦄',
  LTC: 'Ł'
};

export default function CryptoPrices() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '24h' | '7d'>('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Query for crypto prices
  const { 
    data: pricesData, 
    isLoading: pricesLoading, 
    error: pricesError, 
    refetch: refetchPrices 
  } = useQuery({
    queryKey: ['crypto-prices'],
    queryFn: () => api<CryptoPricesResponse>('/api/crypto/prices'),
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    retry: 2
  });

  // Query for market overview
  const { data: marketData, isLoading: marketLoading } = useQuery({
    queryKey: ['market-overview'],
    queryFn: () => api<{ success: boolean; data: MarketOverview }>('/api/crypto/market-overview'),
    refetchInterval: 5 * 60 * 1000,
    retry: 2
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchPrices();
    setIsRefreshing(false);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral', size = 16) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={size} className="text-green-500" />;
      case 'down':
        return <TrendingDown size={size} className="text-red-500" />;
      default:
        return <Minus size={size} className="text-gray-500" />;
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const formatPercent = (percent: number) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  const getCryptoIcon = (symbol: string) => {
    return CRYPTO_ICONS[symbol] || '●';
  };

  if (pricesLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
            <span className="text-muted-foreground">Loading crypto prices...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (pricesError || !pricesData?.success) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-500 mb-4">Failed to load cryptocurrency prices</p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw size={16} className="mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const prices = pricesData.data || [];
  const market = marketData?.data;

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      {market && !marketLoading && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 size={20} className="text-yellow-500" />
              Market Overview
              <Badge variant={market.avgChange24h >= 0 ? "default" : "destructive"}>
                {formatPercent(market.avgChange24h)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Market Cap</p>
                <p className="text-lg font-bold">{market.totalMarketCapFormatted}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">24h Volume</p>
                <p className="text-lg font-bold">{market.total24hVolumeFormatted}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Top Gainer</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{market.topGainers[0]?.symbol}</span>
                  <span className="text-green-500 text-sm">
                    +{market.topGainers[0]?.percentChange24h.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Top Loser</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{market.topLosers[0]?.symbol}</span>
                  <span className="text-red-500 text-sm">
                    {market.topLosers[0]?.percentChange24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Price Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} className="text-yellow-500" />
              Cryptocurrency Prices
              {pricesData.cached && (
                <Badge variant="secondary" className="text-xs">
                  Cached
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              {/* Timeframe selector */}
              <div className="flex rounded-lg border">
                {(['1h', '24h', '7d'] as const).map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className="rounded-none first:rounded-l-lg last:rounded-r-lg px-3 py-1 h-8"
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
              >
                <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
          {pricesData.lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={14} />
              Last updated: {new Date(pricesData.lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {/* Top 5 cryptos in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
            {prices.slice(0, 5).map((crypto) => {
              const change = crypto[`percentChange${selectedTimeframe}` as keyof CryptoPriceData] as number;
              const trend = crypto.trend[selectedTimeframe];
              
              return (
                <Card key={crypto.id} className="relative overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getCryptoIcon(crypto.symbol)}</span>
                        <div>
                          <p className="font-bold text-sm">{crypto.symbol}</p>
                          <p className="text-xs text-muted-foreground">#{crypto.rank}</p>
                        </div>
                      </div>
                      {getTrendIcon(trend, 20)}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-lg font-bold">{crypto.priceFormatted}</p>
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${getChangeColor(change)}`}>
                          {formatPercent(change)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {selectedTimeframe}
                        </span>
                      </div>
                    </div>
                    
                    {/* Background gradient based on trend */}
                    <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-10 ${
                      trend === 'up' ? 'bg-green-500' : 
                      trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
                    }`} />
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed table for all cryptos */}
          <div className="rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">#</th>
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-right p-3 font-medium">Price</th>
                    <th className="text-right p-3 font-medium">1h</th>
                    <th className="text-right p-3 font-medium">24h</th>
                    <th className="text-right p-3 font-medium">7d</th>
                    <th className="text-right p-3 font-medium">Market Cap</th>
                    <th className="text-right p-3 font-medium">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((crypto, index) => (
                    <tr 
                      key={crypto.id} 
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-3">
                        <span className="text-sm font-medium">{crypto.rank}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{getCryptoIcon(crypto.symbol)}</span>
                          <div>
                            <p className="font-medium">{crypto.symbol}</p>
                            <p className="text-xs text-muted-foreground">{crypto.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <span className="font-mono font-medium">{crypto.priceFormatted}</span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {getTrendIcon(crypto.trend['1h'], 12)}
                          <span className={`text-sm ${getChangeColor(crypto.percentChange1h)}`}>
                            {formatPercent(crypto.percentChange1h)}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {getTrendIcon(crypto.trend['24h'], 12)}
                          <span className={`text-sm font-medium ${getChangeColor(crypto.percentChange24h)}`}>
                            {formatPercent(crypto.percentChange24h)}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {getTrendIcon(crypto.trend['7d'], 12)}
                          <span className={`text-sm ${getChangeColor(crypto.percentChange7d)}`}>
                            {formatPercent(crypto.percentChange7d)}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <span className="text-sm">{crypto.marketCapFormatted}</span>
                      </td>
                      <td className="p-3 text-right">
                        <span className="text-sm">{crypto.volume24hFormatted}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Status footer */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap size={12} />
              <span>Powered by CoinMarketCap API</span>
              {pricesData.error && (
                <Badge variant="destructive" className="text-xs">
                  API Issue
                </Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              Auto-refresh: 5 minutes
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}