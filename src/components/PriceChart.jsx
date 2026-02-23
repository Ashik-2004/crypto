import { useState } from 'react';
import styles from './PriceChart.module.css';

export default function PriceChart() {
    const [chartType, setChartType] = useState('Line');

    return (
        <div className={`glass hover-glow rounded-xl ${styles.card}`}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.coinInfo}>
                    <div className={styles.coinIcon}>
                        <span className="material-symbols-outlined" style={{ color: '#f97316' }}>currency_bitcoin</span>
                    </div>
                    <div>
                        <div className={styles.coinTitle}>
                            <h2 className={styles.coinName}>Bitcoin</h2>
                            <span className={`mono ${styles.coinPair}`}>BTC/USD</span>
                        </div>
                        <div className={styles.priceRow}>
                            <span className={`mono ${styles.price}`}>$68,432.12</span>
                            <span className={`text-success ${styles.change}`}>
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_drop_up</span>
                                +4.2%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Chart type toggle */}
                <div className={styles.toggle}>
                    {['Line', 'Candle'].map(t => (
                        <button
                            key={t}
                            className={`${styles.toggleBtn} ${chartType === t ? styles.toggleActive : ''}`}
                            onClick={() => setChartType(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart SVG */}
            <div className={styles.chartWrap}>
                <svg
                    viewBox="0 0 1000 400"
                    preserveAspectRatio="none"
                    className={styles.svg}
                >
                    <defs>
                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#0d7ff2" stopOpacity="0.30" />
                            <stop offset="100%" stopColor="#0d7ff2" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    {[100, 200, 300].map(y => (
                        <line key={y} x1="0" x2="1000" y1={y} y2={y}
                            stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                    ))}
                    {/* Area fill */}
                    <path
                        d="M0 320 C 100 300, 200 350, 300 280 C 400 210, 500 240, 600 150 C 700 60, 800 120, 900 80 C 950 60, 1000 40, 1000 40 V 400 H 0 Z"
                        fill="url(#chartGradient)"
                    />
                    {/* Line */}
                    <path
                        d="M0 320 C 100 300, 200 350, 300 280 C 400 210, 500 240, 600 150 C 700 60, 800 120, 900 80 C 950 60, 1000 40, 1000 40"
                        fill="none"
                        stroke="#0d7ff2"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    {/* Live dot */}
                    <circle cx="1000" cy="40" fill="#0d7ff2" r="4">
                        <animate attributeName="r" dur="2s" repeatCount="indefinite" values="4;6;4" />
                    </circle>
                </svg>

                {/* X-axis labels */}
                <div className={`mono ${styles.xAxis}`}>
                    {['08:00 AM', '12:00 PM', '04:00 PM', '08:00 PM', '12:00 AM', 'Now'].map(t => (
                        <span key={t}>{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
