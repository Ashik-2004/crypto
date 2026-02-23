import { useState } from 'react';
import styles from './MarketRankings.module.css';

export default function MarketRankings({ coins = [], loading }) {
    const [filter, setFilter] = useState('All Assets');

    // Filter coins based on selected filter
    const filteredCoins = coins.filter(coin => {
        if (filter === 'Gainer') return coin.positive;
        if (filter === 'Losers') return !coin.positive;
        return true;
    });

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
                        {loading && coins.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
                                    Loading market data...
                                </td>
                            </tr>
                        ) : filteredCoins.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
                                    No coins match this filter.
                                </td>
                            </tr>
                        ) : (
                            filteredCoins.map(coin => (
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <button className={`text-primary ${styles.viewAll}`}>
                    View All {coins.length > 0 ? coins.length : '—'} Assets
                </button>
            </div>
        </section>
    );
}
