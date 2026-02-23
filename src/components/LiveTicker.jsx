import styles from './LiveTicker.module.css';

const ITEMS = [
    { label: 'GAS:', value: '18 Gwei', dim: true },
    null,
    { label: 'BTC Dominance:', value: '52.4%' },
    null,
    { label: 'Market Cap:', value: '$2.41T', extra: '+1.2%', extraClass: 'text-success' },
    null,
    { label: 'ETH:', value: '$3,845', dim: true },
    null,
    { label: 'SOL:', value: '$172' },
    null,
    { label: 'Fear/Greed:', value: '74' },
];

function TickerItems() {
    return (
        <>
            {ITEMS.map((item, i) =>
                item === null
                    ? <span key={i} className={styles.dot} />
                    : (
                        <span key={i} className={`mono ${styles.item}`}>
                            <span style={{ color: item.dim ? '#64748b' : '#f1f5f9' }}>
                                {item.label} {item.value}
                            </span>
                            {item.extra && (
                                <span className={item.extraClass} style={{ marginLeft: 4 }}>{item.extra}</span>
                            )}
                        </span>
                    )
            )}
        </>
    );
}

export default function LiveTicker() {
    return (
        <div className={`glass-nav ${styles.bar}`}>
            <div className={`ticker-track ${styles.track}`}>
                <TickerItems />
                <TickerItems />
            </div>
        </div>
    );
}
