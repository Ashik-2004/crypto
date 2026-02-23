import styles from './Navbar.module.css';

const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9a6I1tTHbwXy016xRBobZnmySyZNZesBumLcMdZxBTy24947hqNngAbuW9MONPJ4uK10Tw6VQ5qbjjYk3q-_6f8zRQvsxCFltH619ZvBJNU_YQA0KVDxtIGZj-Bg_jI8wFNRinyL241hip6qhmRTpx9aErzh9w7OCLyhVbVMQuK_Q7XRev-2xiE4VcgJzUoXJIu_G5G5sztZYrSoVvhhDyV39tu0rBGzQeToLq8m7llR1n0bsWSQD8kWfBBjuiUdmBTc7YcjVEwk';

export default function Navbar() {
  return (
    <nav className={`glass-nav ${styles.nav}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <span className="material-symbols-outlined">monitoring</span>
          </div>
          <h1 className={styles.logoText}>CRYPTO<span className={styles.logoAccent}>X</span></h1>
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search tokens, pairs, or addresses..."
          />
        </div>

        {/* Nav links + actions */}
        <div className={styles.rightSection}>
          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>Market</a>
            <a href="#" className={styles.navLink}>Portfolio</a>
            <a href="#" className={styles.navLink}>Trade</a>
          </div>
          <div className={styles.actions}>
            <button className={styles.iconBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>tune</span>
            </button>
            <button className={`${styles.iconBtn} ${styles.notifBtn}`}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>notifications</span>
              <span className={styles.notifDot} />
            </button>
            <div className={styles.avatar}>
              <img src={USER_AVATAR} alt="User profile" />
            </div>
            <button className={styles.menuBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
