import './index.css';
import Navbar from './components/Navbar';
import PriceChart from './components/PriceChart';
import MarketSentiment from './components/MarketSentiment';
import ConvertAssets from './components/ConvertAssets';
import MarketRankings from './components/MarketRankings';
import LiveTicker from './components/LiveTicker';

export default function App() {
  return (
    <>
      <Navbar />

      <main className="main-layout">
        {/* Hero section: chart on the left, widgets on the right */}
        <section className="hero-section">
          <div className="chart-col">
            <PriceChart />
          </div>
          <div className="side-col">
            <MarketSentiment />
            <ConvertAssets />
          </div>
        </section>

        {/* Market rankings */}
        <MarketRankings />
      </main>

      <LiveTicker />

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

        @media (min-width: 1024px) {
          .hero-section {
            grid-template-columns: 3fr 1fr;
          }
        }
      `}</style>
    </>
  );
}
