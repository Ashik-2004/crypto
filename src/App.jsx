import { useState, useEffect, useCallback } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import PriceChart from './components/PriceChart';
import MarketSentiment from './components/MarketSentiment';
import ConvertAssets from './components/ConvertAssets';
import MarketRankings from './components/MarketRankings';
import LiveTicker from './components/LiveTicker';
import useCryptoData from './hooks/useCryptoData';

export default function App() {
  const { coins, globalMetrics, loading, error } = useCryptoData();

  // Get the top coin (BTC) for the price chart
  const btc = coins.find(c => c.symbol === 'BTC');

  return (
    <>
      <Navbar />

      <main className="main-layout">
        {/* Loading/Error state */}
        {loading && (
          <div className="loading-bar">
            <span className="material-symbols-outlined spin">progress_activity</span>
            <span>Fetching live market data...</span>
          </div>
        )}
        {error && (
          <div className="error-bar">
            <span className="material-symbols-outlined">error</span>
            <span>API Error: {error}. Showing cached data.</span>
          </div>
        )}

        {/* Hero section: chart on the left, widgets on the right */}
        <section className="hero-section">
          <div className="chart-col">
            <PriceChart coin={btc} />
          </div>
          <div className="side-col">
            <MarketSentiment globalMetrics={globalMetrics} />
            <ConvertAssets coins={coins} />
          </div>
        </section>

        {/* Market rankings */}
        <MarketRankings coins={coins} loading={loading} />
      </main>

      <LiveTicker coins={coins} globalMetrics={globalMetrics} />

      <style>{`
        .main-layout {
          padding-top: 90px;
          padding-bottom: 56px;
          padding-left: 24px;
          padding-right: 24px;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .hero-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .side-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .loading-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(13, 127, 242, 0.1);
          border: 1px solid rgba(13, 127, 242, 0.25);
          border-radius: 10px;
          font-size: 14px;
          color: #93c5fd;
        }

        .error-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(255, 49, 49, 0.1);
          border: 1px solid rgba(255, 49, 49, 0.25);
          border-radius: 10px;
          font-size: 14px;
          color: #fca5a5;
        }

        @keyframes spin-anim {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin {
          animation: spin-anim 1s linear infinite;
        }

        @media (min-width: 1024px) {
          .hero-section {
            grid-template-columns: 3fr 1fr;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-section {
            grid-template-columns: 2fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .main-layout {
            padding-left: 16px;
            padding-right: 16px;
            padding-top: 72px;
            gap: 20px;
          }
          .hero-section {
            gap: 16px;
          }
          .side-col {
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .main-layout {
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 64px;
            padding-bottom: 48px;
            gap: 16px;
          }
          .hero-section {
            gap: 12px;
          }
        }
      `}</style>
    </>
  );
}
