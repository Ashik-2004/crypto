import { useState, useEffect, useCallback } from 'react';

const COIN_SLUGS = ['bitcoin', 'ethereum', 'solana', 'cardano', 'ripple', 'dogecoin', 'polkadot', 'avalanche'];
const COIN_IDS = '1,1027,5426,2010,52,74,6636,5805'; // CMC IDs for above coins

const ICON_MAP = {
    BTC: { icon: 'currency_bitcoin', color: '#f97316', bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)' },
    ETH: { icon: 'diamond', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)' },
    SOL: { icon: 'bolt', color: '#14b8a6', bg: 'rgba(20,184,166,0.15)', border: 'rgba(20,184,166,0.3)' },
    ADA: { icon: 'hub', color: '#1d4ed8', bg: 'rgba(29,78,216,0.15)', border: 'rgba(29,78,216,0.3)' },
    XRP: { icon: 'water_drop', color: '#6366f1', bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)' },
    DOGE: { icon: 'pets', color: '#eab308', bg: 'rgba(234,179,8,0.15)', border: 'rgba(234,179,8,0.3)' },
    DOT: { icon: 'radio_button_checked', color: '#e11d86', bg: 'rgba(225,29,134,0.15)', border: 'rgba(225,29,134,0.3)' },
    AVAX: { icon: 'landscape', color: '#ef4444', bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)' },
};

function formatPrice(price) {
    if (price >= 1) return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return '$' + price.toFixed(6);
}

function formatMarketCap(cap) {
    if (cap >= 1e12) return (cap / 1e12).toFixed(2) + 'T';
    if (cap >= 1e9) return (cap / 1e9).toFixed(1) + 'B';
    if (cap >= 1e6) return (cap / 1e6).toFixed(1) + 'M';
    return cap.toLocaleString();
}

function formatChange(pct) {
    const sign = pct >= 0 ? '+' : '';
    return sign + pct.toFixed(1) + '%';
}

// Generate a simple sparkline path from recent notion of direction
function generateSparkPath(positive) {
    const points = [];
    let y = positive ? 35 : 5;
    for (let i = 0; i <= 10; i++) {
        const delta = (Math.random() - (positive ? 0.35 : 0.65)) * 8;
        y = Math.max(2, Math.min(38, y + delta));
        points.push(`${i * 10} ${y}`);
    }
    return 'M' + points.join(' L');
}

export default function useCryptoData() {
    const [coins, setCoins] = useState([]);
    const [globalMetrics, setGlobalMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            // Fetch latest listings
            const listingsRes = await fetch(
                '/api/cmc/v1/cryptocurrency/listings/latest?limit=20&convert=USD'
            );

            if (!listingsRes.ok) {
                throw new Error(`API error: ${listingsRes.status}`);
            }

            const listingsData = await listingsRes.json();

            if (listingsData.status?.error_code !== 0) {
                throw new Error(listingsData.status?.error_message || 'API error');
            }

            // Map the data to our format
            const mappedCoins = listingsData.data.map((coin, index) => {
                const symbol = coin.symbol;
                const iconInfo = ICON_MAP[symbol] || {
                    icon: 'token', color: '#94a3b8',
                    bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.3)',
                };
                const quote = coin.quote.USD;
                const positive = quote.percent_change_24h >= 0;

                return {
                    id: coin.id,
                    rank: String(index + 1).padStart(2, '0'),
                    name: coin.name,
                    symbol: symbol,
                    price: formatPrice(quote.price),
                    priceRaw: quote.price,
                    change: formatChange(quote.percent_change_24h),
                    changeRaw: quote.percent_change_24h,
                    positive,
                    cap: formatMarketCap(quote.market_cap),
                    capRaw: quote.market_cap,
                    volume24h: formatMarketCap(quote.volume_24h),
                    icon: iconInfo.icon,
                    iconColor: iconInfo.color,
                    iconBg: iconInfo.bg,
                    iconBorder: iconInfo.border,
                    sparkPath: generateSparkPath(positive),
                    watchlisted: false,
                };
            });

            setCoins(mappedCoins);

            // Fetch global metrics
            try {
                const globalRes = await fetch('/api/cmc/v1/global-metrics/quotes/latest?convert=USD');
                if (globalRes.ok) {
                    const globalData = await globalRes.json();
                    if (globalData.data) {
                        const g = globalData.data;
                        setGlobalMetrics({
                            totalMarketCap: formatMarketCap(g.quote.USD.total_market_cap),
                            totalMarketCapChange: formatChange(g.quote.USD.total_market_cap_yesterday_percentage_change),
                            totalMarketCapChangePositive: g.quote.USD.total_market_cap_yesterday_percentage_change >= 0,
                            btcDominance: g.btc_dominance.toFixed(1) + '%',
                            ethDominance: g.eth_dominance.toFixed(1) + '%',
                            activeCryptos: g.active_cryptocurrencies,
                        });
                    }
                }
            } catch {
                // Global metrics are optional — non-critical
            }

            setError(null);
        } catch (err) {
            console.error('Failed to fetch crypto data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Refresh every 60s
        return () => clearInterval(interval);
    }, [fetchData]);

    return { coins, globalMetrics, loading, error, refetch: fetchData };
}
