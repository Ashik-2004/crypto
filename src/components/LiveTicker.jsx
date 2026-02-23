import styles from './LiveTicker.module.css';

export default function LiveTicker({ coins = [], globalMetrics }) {
    // Build ticker items from live data
    const tickerItems = [];

    // Global market data
    if (globalMetrics) {
        tickerItems.push({ label: 'Market Cap:', value: globalMetrics.totalMarketCap, extra: globalMetrics.totalMarketCapChange, positive: globalMetrics.totalMarketCapChangePositive });
        tickerItems.push(null); // dot separator
        tickerItems.push({ label: 'BTC Dom:', value: globalMetrics.btcDominance, dim: true });
        tickerItems.push(null);
    }

    // Top coins
    const topCoins = coins.slice(0, 8);
    topCoins.forEach((coin, i) => {
        tickerItems.push({
            label: coin.symbol + ':',
            value: coin.price,
            extra: coin.change,
            positive: coin.positive,
            dim: i % 2 === 1,
        });
        tickerItems.push(null); // dot separator
    });

    // Fallback if no data loaded yet
    if (tickerItems.length === 0) {
        tickerItems.push({ label: 'Loading', value: 'market data...', dim: true });
    }

    return (
        <div className={`glass-nav ${styles.bar}`}>
            <div className={`ticker-track ${styles.track}`}>
                <TickerItems items={tickerItems} />
                <TickerItems items={tickerItems} />
            </div>
        </div>
    );
}

function TickerItems({ items }) {
    return (
        <>
            {items.map((item, i) =>
                item === null
                    ? <span key={i} className={styles.dot} />
                    : (
                        <span key={i} className={`mono ${styles.item}`}>
                            <span style={{ color: item.dim ? '#64748b' : '#f1f5f9' }}>
                                {item.label} {item.value}
                            </span>
                            {item.extra && (
                                <span className={item.positive ? 'text-success' : 'text-danger'} style={{ marginLeft: 4 }}>
                                    {item.extra}
                                </span>
                            )}
                        </span>
                    )
            )}
        </>
    );
}
