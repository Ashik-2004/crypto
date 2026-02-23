import styles from './MarketSentiment.module.css';

export default function MarketSentiment({ globalMetrics }) {
    // Fear & Greed index (CoinMarketCap doesn't provide this directly,
    // so we approximate from market cap change direction)
    const value = globalMetrics ? Math.min(100, Math.max(0, 50 + (globalMetrics.totalMarketCapChangePositive ? 24 : -18))) : 74;
    const radius = 40;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (value / 100) * circ;

    let sentimentLabel = 'Neutral';
    let sentimentClass = '';
    let sentimentDesc = 'Market is in a balanced state.';
    if (value >= 75) {
        sentimentLabel = 'Extreme Greed';
        sentimentClass = 'text-success';
        sentimentDesc = 'Market is showing high bullish momentum.';
    } else if (value >= 55) {
        sentimentLabel = 'Greed';
        sentimentClass = 'text-success';
        sentimentDesc = 'Market sentiment is leaning bullish.';
    } else if (value >= 45) {
        sentimentLabel = 'Neutral';
        sentimentClass = 'text-primary';
        sentimentDesc = 'Market is in a balanced state.';
    } else if (value >= 25) {
        sentimentLabel = 'Fear';
        sentimentClass = 'text-danger';
        sentimentDesc = 'Market sentiment is leaning bearish.';
    } else {
        sentimentLabel = 'Extreme Fear';
        sentimentClass = 'text-danger';
        sentimentDesc = 'Market is showing strong bearish pressure.';
    }

    return (
        <div className={`glass hover-glow ${styles.card}`}>
            <div className={styles.titleRow}>
                <h3 className={styles.title}>Market Sentiment</h3>
                <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: 18 }}>info</span>
            </div>

            <div className={styles.gaugeWrap}>
                {/* SVG gauge circle */}
                <div className={styles.ring}>
                    <svg viewBox="0 0 100 100" className={styles.gaugeSvg}>
                        {/* Track */}
                        <circle cx="50" cy="50" r={radius} fill="none" stroke="#1e293b" strokeWidth="8" />
                        {/* Value arc */}
                        <circle
                            cx="50" cy="50" r={radius}
                            fill="none"
                            stroke={value >= 50 ? '#00FF41' : '#FF3131'}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circ}
                            strokeDashoffset={offset}
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.8s ease' }}
                        />
                    </svg>
                    <div className={styles.gaugeInner}>
                        <span className={`mono ${styles.gaugeValue}`}>{value}</span>
                        <p className={styles.gaugeLabel}>Index</p>
                    </div>
                </div>

                <div className={styles.sentiment}>
                    <span className={`${sentimentClass} ${styles.sentimentText}`}>{sentimentLabel}</span>
                    <p className={styles.sentimentDesc}>{sentimentDesc}</p>
                </div>

                {/* Extra global info */}
                {globalMetrics && (
                    <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#64748b', marginTop: 4 }}>
                        <span>BTC: {globalMetrics.btcDominance}</span>
                        <span>ETH: {globalMetrics.ethDominance}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
