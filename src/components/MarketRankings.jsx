import { useState } from 'react';
import styles from './MarketRankings.module.css';

const COINS = [
    {
        rank: '01',
        name: 'Bitcoin', symbol: 'BTC',
        price: '$68,432.12', change: '+4.2%', positive: true,
        cap: '1.34T',
        icon: 'currency_bitcoin', iconColor: '#f97316', iconBg: 'rgba(249,115,22,0.15)', iconBorder: 'rgba(249,115,22,0.3)',
        sparkPath: 'M0 30 L10 25 L20 35 L30 20 L40 22 L50 15 L60 25 L70 10 L80 15 L90 5 L100 10',
        watchlisted: false,
    },
    {
        rank: '02',
        name: 'Ethereum', symbol: 'ETH',
        price: '$3,845.54', change: '-0.8%', positive: false,
        cap: '462.1B',
        icon: 'diamond', iconColor: '#3b82f6', iconBg: 'rgba(59,130,246,0.15)', iconBorder: 'rgba(59,130,246,0.3)',
        sparkPath: 'M0 10 L10 15 L20 10 L30 20 L40 15 L50 30 L60 25 L70 35 L80 30 L90 38 L100 35',
        watchlisted: true,
    },
    {
        rank: '03',
        name: 'Solana', symbol: 'SOL',
        price: '$172.84', change: '+12.4%', positive: true,
        cap: '76.8B',
        icon: 'bolt', iconColor: '#14b8a6', iconBg: 'rgba(20,184,166,0.15)', iconBorder: 'rgba(20,184,166,0.3)',
        sparkPath: 'M0 35 L10 30 L20 32 L30 25 L40 28 L50 20 L60 22 L70 15 L80 18 L90 5 L100 2',
        watchlisted: false,
    },
    {
        rank: '04',
        name: 'Cardano', symbol: 'ADA',
        price: '$0.482', change: '-2.1%', positive: false,
        cap: '17.2B',
        icon: 'hub', iconColor: '#1d4ed8', iconBg: 'rgba(29,78,216,0.15)', iconBorder: 'rgba(29,78,216,0.3)',
        sparkPath: 'M0 15 L10 20 L20 18 L30 25 L40 22 L50 35 L60 32 L70 38 L80 35 L90 30 L100 32',
        watchlisted: false,
    },
];

export default function MarketRankings() {
    const [filter, setFilter] = useState('All Assets');

    return (
        <section className={`glass hover-glow ${styles.section}`}>
            {/* Header */}
            <div className={styles.header}>
                <h3 className={styles.title}>Market Rankings</h3>
                <div className={styles.filterGroup}>
                    {['All Assets', 'Gainer', 'Losers'].map(f => (
                        <button
                            key={f}
                            className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.thead}>
                            <th># Rank</th>
                            <th>Coin Name</th>
                            <th className={styles.right}>Price</th>
                            <th className={styles.right}>24h Change</th>
                            <th className={styles.right}>Market Cap</th>
                            <th className={styles.center}>Last 7 Days</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {COINS.map(coin => (
                            <tr key={coin.rank} className={styles.row}>
                                <td className={`mono ${styles.rankCell}`}>{coin.rank}</td>
                                <td>
                                    <div className={styles.coinCell}>
                                        <div
                                            className={styles.coinIcon}
                                            style={{ background: coin.iconBg, border: `1px solid ${coin.iconBorder}` }}
                                        >
                                            <span className="material-symbols-outlined" style={{ color: coin.iconColor, fontSize: 18 }}>
                                                {coin.icon}
                                            </span>
                                        </div>
                                        <div>
                                            <div className={styles.coinName}>{coin.name}</div>
                                            <div className={`mono ${styles.coinSymbol}`}>{coin.symbol}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className={`mono ${styles.right} ${styles.dataCell}`}>{coin.price}</td>
                                <td className={`mono ${styles.right} ${styles.dataCell} ${coin.positive ? 'text-success' : 'text-danger'}`}>
                                    {coin.change}
                                </td>
                                <td className={`mono ${styles.right} ${styles.dataCell}`} style={{ color: '#cbd5e1' }}>{coin.cap}</td>
                                <td className={styles.center}>
                                    <div className={styles.spark}>
                                        <svg viewBox="0 0 100 40" className={styles.sparkSvg}>
                                            <path
                                                d={coin.sparkPath}
                                                fill="none"
                                                stroke={coin.positive ? '#00FF41' : '#FF3131'}
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </div>
                                </td>
                                <td className={styles.right}>
                                    <button
                                        className={`${styles.starBtn} ${coin.watchlisted ? styles.starActive : ''}`}
                                    >
                                        <span className="material-symbols-outlined">star</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <button className={`text-primary ${styles.viewAll}`}>View All 1,240 Assets</button>
            </div>
        </section>
    );
}
