import styles from './MarketSentiment.module.css';

export default function MarketSentiment() {
    const value = 74;
    const radius = 40;
    const circ = 2 * Math.PI * radius; // ~251.3
    const offset = circ - (value / 100) * circ;

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
                            stroke="#0d7ff2"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circ}
                            strokeDashoffset={offset}
                            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                        />
                    </svg>
                    <div className={styles.gaugeInner}>
                        <span className={`mono ${styles.gaugeValue}`}>{value}</span>
                        <p className={styles.gaugeLabel}>Index</p>
                    </div>
                </div>

                <div className={styles.sentiment}>
                    <span className={`text-success ${styles.sentimentText}`}>Extreme Greed</span>
                    <p className={styles.sentimentDesc}>Market is showing high bullish momentum.</p>
                </div>
            </div>
        </div>
    );
}
