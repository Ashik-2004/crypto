import styles from './ConvertAssets.module.css';

export default function ConvertAssets() {
    return (
        <div className={`glass hover-glow ${styles.card}`}>
            <div className={styles.titleRow}>
                <h3 className={styles.title}>Convert Assets</h3>
                <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>account_balance_wallet</span>
            </div>

            <div className={styles.fields}>
                {/* Buy amount */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Amount to Buy (BTC)</label>
                    <div className={styles.inputWrap}>
                        <input
                            type="number"
                            defaultValue="0.5"
                            className={`mono ${styles.input}`}
                        />
                        <span className={styles.currency}>BTC</span>
                    </div>
                </div>

                {/* Swap icon */}
                <div className={styles.swapRow}>
                    <span className="material-symbols-outlined" style={{ color: '#334155' }}>swap_vert</span>
                </div>

                {/* Estimated cost */}
                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Estimated Cost (USD)</label>
                    <div className={`mono text-primary ${styles.output}`}>$34,216.06</div>
                </div>
            </div>
        </div>
    );
}
