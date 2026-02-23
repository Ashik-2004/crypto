import { useState, useMemo } from 'react';
import styles from './ConvertAssets.module.css';

const CRYPTO_LIST = [
    { symbol: 'BTC', label: 'Bitcoin', icon: 'currency_bitcoin', color: '#f97316' },
    { symbol: 'ETH', label: 'Ethereum', icon: 'diamond', color: '#3b82f6' },
    { symbol: 'USDT', label: 'Tether', icon: 'attach_money', color: '#22c55e' },
    { symbol: 'SOL', label: 'Solana', icon: 'bolt', color: '#14b8a6' },
    { symbol: 'XRP', label: 'XRP', icon: 'water_drop', color: '#6366f1' },
    { symbol: 'BNB', label: 'BNB', icon: 'toll', color: '#eab308' },
];

const USD_TO_INR = 83.5; // fallback fixed rate

export default function ConvertAssets({ coins = [] }) {
    const [amount, setAmount] = useState(1);
    const [symbol, setSymbol] = useState('BTC');
    const [currency, setCurrency] = useState('USD'); // 'USD' or 'INR'

    const coin = coins.find(c => c.symbol === symbol);
    const priceUsd = symbol === 'USDT' ? 1 : (coin?.priceRaw ?? 0);

    const result = useMemo(() => {
        if (!priceUsd || !amount) return null;
        const usd = amount * priceUsd;
        return currency === 'INR' ? usd * USD_TO_INR : usd;
    }, [amount, priceUsd, currency]);

    const meta = CRYPTO_LIST.find(c => c.symbol === symbol);
    const currSymbol = currency === 'INR' ? '₹' : '$';

    const formatResult = (n) => {
        if (n === null) return '—';
        return n.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <div className={`glass hover-glow ${styles.card}`}>
            <div className={styles.titleRow}>
                <h3 className={styles.title}>Convert to Fiat</h3>
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
                    currency_exchange
                </span>
            </div>

            <div className={styles.fields}>

                {/* Coin selector */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Select Coin</label>
                    <div className={styles.coinPickWrap}>
                        <span className="material-symbols-outlined" style={{ color: meta?.color, fontSize: 20 }}>
                            {meta?.icon}
                        </span>
                        <select
                            className={styles.coinSelect}
                            value={symbol}
                            onChange={e => setSymbol(e.target.value)}
                        >
                            {CRYPTO_LIST.map(c => (
                                <option key={c.symbol} value={c.symbol}>
                                    {c.symbol} — {c.label}
                                </option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined" style={{ color: '#475569', fontSize: 16 }}>
                            expand_more
                        </span>
                    </div>
                </div>

                {/* Amount input */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Amount ({symbol})</label>
                    <div className={styles.inputWrap}>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(parseFloat(e.target.value) || 0)}
                            className={`mono ${styles.input}`}
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                        />
                        <span className={styles.currencyBadge}>{symbol}</span>
                    </div>
                </div>

                {/* Currency toggle */}
                <div className={styles.fiatToggle}>
                    {['USD', 'INR'].map(c => (
                        <button
                            key={c}
                            className={`${styles.fiatBtn} ${currency === c ? styles.fiatActive : ''}`}
                            onClick={() => setCurrency(c)}
                        >
                            {c === 'USD' ? '$ USD' : '₹ INR'}
                        </button>
                    ))}
                </div>

                {/* Result */}
                <div className={styles.resultBox}>
                    <span className={styles.resultLabel}>Estimated Value</span>
                    <span className={`mono ${styles.resultValue}`}>
                        {currSymbol}{formatResult(result)}
                    </span>
                </div>

                {/* Rate hint */}
                {priceUsd > 0 && (
                    <div className={styles.rateInfo}>
                        1 {symbol} = {currency === 'INR'
                            ? `₹${(priceUsd * USD_TO_INR).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
                            : `$${priceUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
                        } • Live
                    </div>
                )}
            </div>
        </div>
    );
}
