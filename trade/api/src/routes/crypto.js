import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import axios from 'axios';

export const cryptoRouter = Router();
cryptoRouter.use(requireAuth);

// Debug log to confirm router is loaded
console.log('Crypto router initialized');

// Cache for storing price data
let priceCache = {
    data: null,
    lastUpdated: null,
    CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
};

// Top cryptocurrencies to fetch
const TOP_CRYPTOS = [
    'BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'ADA', 'SOL', 'MATIC', 
    'XRP', 'DOGE', 'DOT', 'AVAX', 'LINK', 'UNI', 'LTC'
];

// Fetch prices from CoinMarketCap
async function fetchCryptoPrices() {
    const apiKey = process.env.COINMARKETCAP_API_KEY;
    
    if (!apiKey) {
        throw new Error('CoinMarketCap API key not configured');
    }

    const symbols = TOP_CRYPTOS.join(',');
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}&convert=USD`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                'X-CMC_PRO_API_KEY': apiKey,
                'Accept': 'application/json',
            },
        });

        const data = response.data;
        
        console.log('CoinMarketCap API Response Status:', data.status);
        console.log('Number of cryptos received:', Object.keys(data.data || {}).length);
        
        if (data.status.error_code !== 0) {
            throw new Error(`CoinMarketCap API error: ${data.status.error_message}`);
        }

        // Transform the data into a more usable format
        const transformedData = Object.values(data.data).map(crypto => {
            const usdQuote = crypto.quote?.USD || {};
            return {
                id: crypto.id,
                symbol: crypto.symbol,
                name: crypto.name,
                price: usdQuote.price || 0,
                priceFormatted: formatPrice(usdQuote.price),
                percentChange1h: usdQuote.percent_change_1h || 0,
                percentChange24h: usdQuote.percent_change_24h || 0,
                percentChange7d: usdQuote.percent_change_7d || 0,
                marketCap: usdQuote.market_cap || 0,
                volume24h: usdQuote.volume_24h || 0,
                lastUpdated: crypto.last_updated,
                rank: crypto.cmc_rank || 999
            };
        });

        // Sort by rank
        transformedData.sort((a, b) => a.rank - b.rank);

        return transformedData;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        throw error;
    }
}

// Format price based on value
function formatPrice(price) {
    if (!price || price === null || price === undefined) {
        return '$0.00';
    }
    if (price >= 1) {
        return `$${price.toFixed(2)}`;
    } else if (price >= 0.01) {
        return `$${price.toFixed(4)}`;
    } else {
        return `$${price.toFixed(8)}`;
    }
}

// Format market cap and volume
function formatLargeNumber(num) {
    if (num >= 1e12) {
        return `$${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
        return `$${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
        return `$${(num / 1e6).toFixed(2)}M`;
    } else if (num >= 1e3) {
        return `$${(num / 1e3).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
}

// Get current prices (with caching)
cryptoRouter.get('/prices', async (req, res) => {
    console.log('Crypto prices endpoint called');
    console.log('API Key available:', !!process.env.COINMARKETCAP_API_KEY);
    try {
        const now = new Date();
        
        // Check if cache is still valid
        if (priceCache.data && 
            priceCache.lastUpdated && 
            (now - priceCache.lastUpdated) < priceCache.CACHE_DURATION) {
            
            return res.json({
                success: true,
                data: priceCache.data,
                cached: true,
                lastUpdated: priceCache.lastUpdated,
                nextUpdate: new Date(priceCache.lastUpdated.getTime() + priceCache.CACHE_DURATION)
            });
        }

        // Fetch fresh data
        console.log('Fetching fresh crypto prices from CoinMarketCap...');
        const prices = await fetchCryptoPrices();
        
        // Enhanced data with formatting
        const enhancedPrices = prices.map(crypto => ({
            ...crypto,
            marketCapFormatted: formatLargeNumber(crypto.marketCap),
            volume24hFormatted: formatLargeNumber(crypto.volume24h),
            trend: {
                '1h': crypto.percentChange1h > 0 ? 'up' : crypto.percentChange1h < 0 ? 'down' : 'neutral',
                '24h': crypto.percentChange24h > 0 ? 'up' : crypto.percentChange24h < 0 ? 'down' : 'neutral',
                '7d': crypto.percentChange7d > 0 ? 'up' : crypto.percentChange7d < 0 ? 'down' : 'neutral'
            }
        }));

        // Update cache
        priceCache.data = enhancedPrices;
        priceCache.lastUpdated = now;

        return res.json({
            success: true,
            data: enhancedPrices,
            cached: false,
            lastUpdated: now,
            nextUpdate: new Date(now.getTime() + priceCache.CACHE_DURATION)
        });

    } catch (error) {
        console.error('Error in crypto prices endpoint:', error);
        
        // Return cached data if available, even if expired
        if (priceCache.data) {
            return res.json({
                success: true,
                data: priceCache.data,
                cached: true,
                error: 'Failed to fetch fresh data, returning cached data',
                lastUpdated: priceCache.lastUpdated
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Failed to fetch cryptocurrency prices',
            message: error.message
        });
    }
});

// Get specific crypto price
cryptoRouter.get('/price/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        const symbolUpper = symbol.toUpperCase();

        // Check cache first
        if (priceCache.data) {
            const crypto = priceCache.data.find(c => c.symbol === symbolUpper);
            if (crypto) {
                return res.json({
                    success: true,
                    data: crypto,
                    cached: true
                });
            }
        }

        // If not in cache, fetch fresh data
        const prices = await fetchCryptoPrices();
        const crypto = prices.find(c => c.symbol === symbolUpper);

        if (!crypto) {
            return res.status(404).json({
                success: false,
                error: `Cryptocurrency ${symbolUpper} not found`
            });
        }

        return res.json({
            success: true,
            data: crypto,
            cached: false
        });

    } catch (error) {
        console.error(`Error fetching ${req.params.symbol} price:`, error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch cryptocurrency price'
        });
    }
});

// Get market overview
cryptoRouter.get('/market-overview', async (req, res) => {
    try {
        // This would typically require a separate API call for global market data
        // For now, we'll calculate from our cached data
        if (!priceCache.data) {
            const prices = await fetchCryptoPrices();
            priceCache.data = prices;
            priceCache.lastUpdated = new Date();
        }

        const totalMarketCap = priceCache.data.reduce((sum, crypto) => sum + crypto.marketCap, 0);
        const total24hVolume = priceCache.data.reduce((sum, crypto) => sum + crypto.volume24h, 0);
        
        // Calculate average 24h change (weighted by market cap)
        const weightedChange24h = priceCache.data.reduce((sum, crypto) => {
            return sum + (crypto.percentChange24h * crypto.marketCap);
        }, 0) / totalMarketCap;

        const marketOverview = {
            totalMarketCap: totalMarketCap,
            totalMarketCapFormatted: formatLargeNumber(totalMarketCap),
            total24hVolume: total24hVolume,
            total24hVolumeFormatted: formatLargeNumber(total24hVolume),
            avgChange24h: weightedChange24h,
            topGainers: priceCache.data
                .filter(crypto => crypto.percentChange24h > 0)
                .sort((a, b) => b.percentChange24h - a.percentChange24h)
                .slice(0, 5),
            topLosers: priceCache.data
                .filter(crypto => crypto.percentChange24h < 0)
                .sort((a, b) => a.percentChange24h - b.percentChange24h)
                .slice(0, 5)
        };

        return res.json({
            success: true,
            data: marketOverview,
            lastUpdated: priceCache.lastUpdated
        });

    } catch (error) {
        console.error('Error fetching market overview:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch market overview'
        });
    }
});

// Clear cache (for testing)
cryptoRouter.post('/clear-cache', async (req, res) => {
    priceCache.data = null;
    priceCache.lastUpdated = null;
    
    return res.json({
        success: true,
        message: 'Price cache cleared'
    });
});