import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { CheckCircle2, ArrowUpRight, ShoppingBag, Scale } from 'lucide-react';
import { useTilt, useMagnetic } from '../utils/animations';

interface DualPerspectiveProps {
  currentMode: string;
  onOpenModal: (id: string) => void;
}

export const DualPerspective: React.FC<DualPerspectiveProps> = ({ onOpenModal }) => {
  const founderLottieRef = useRef<HTMLDivElement>(null);
  const scholarLottieRef = useRef<HTMLDivElement>(null);

  // Apply 3D Tilt Card effect to both perspective cards
  const founderCardRef = useTilt<HTMLDivElement>();
  const scholarCardRef = useTilt<HTMLDivElement>();

  // Apply Magnetic Pull effect to key link buttons
  const founderBtnRef = useMagnetic<HTMLButtonElement>();
  const scholarBtnRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    let anim1: any = null, anim2: any = null;
    if (founderLottieRef.current) {
      anim1 = lottie.loadAnimation({
        container: founderLottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'lottie/online-shopping.json'
      });
    }
    if (scholarLottieRef.current) {
      anim2 = lottie.loadAnimation({
        container: scholarLottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'lottie/justice.json'
      });
    }
    return () => { anim1?.destroy(); anim2?.destroy(); };
  }, []);

  return (
    <section className="section-wrapper" id="dual-identity">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="bento-pill bento-pill-cyan">Dual Perspective</span>
          <h2 style={{ fontWeight: 500, marginTop: '0.65rem', color: 'var(--text-primary)' }}>
            Where <span className="lime-text">Enterprise Execution</span> Meets Legal Strategy
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Two complementary disciplines forming a complete executive profile: structural legal risk-engineering paired with practical digital commerce scaling.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.25rem' }}>

          {/* Founder Card */}
          <div
            ref={founderCardRef}
            className="bento-card reveal reveal-delay-1"
            style={{
              padding: '2.25rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '500px',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span className="bento-pill bento-pill-cyan">
                  <ShoppingBag size={11} color="var(--lime)" />
                  <span>Enterprise Leadership</span>
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-card-muted)', fontWeight: 600 }}>2021 — Present</span>
              </div>

              <h3 style={{ marginBottom: '0.45rem', fontWeight: 600, color: 'var(--text-white)' }}>The Founder &amp; CEO</h3>
              <p style={{ color: 'var(--text-card-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                Founded Web Mall (Pvt) Ltd at age 18, scaling multi-category digital retail lines including fashion accessories, bags, apparel, and lifestyle ornaments through performance marketing and direct supplier relationships.
              </p>

              <div ref={founderLottieRef} style={{ width: '100%', height: '165px', margin: '1.1rem 0' }} />
            </div>

            <div>
              <div style={{ paddingTop: '1.1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-card-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem', display: 'block' }}>
                  Core Capabilities
                </span>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {[
                    'Omnichannel Retail Scaling & Supply Chain Sourcing',
                    'High-Conversion Social Commerce Campaigns',
                    'Prompt Engineering & Operational AI Automation'
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-card-secondary)' }}>
                      <CheckCircle2 size={14} color="var(--lime)" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                ref={founderBtnRef}
                onClick={() => onOpenModal('web-mall')}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'space-between', marginTop: '1.1rem' }}
              >
                <span>Examine Web Mall Dossier</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Scholar Card */}
          <div
            ref={scholarCardRef}
            className="bento-card reveal reveal-delay-2"
            style={{
              padding: '2.25rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '500px',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span className="bento-pill bento-pill-mint">
                  <Scale size={11} color="var(--lime)" />
                  <span>Academic Rigor</span>
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-card-muted)', fontWeight: 600 }}>University of London</span>
              </div>

              <h3 style={{ marginBottom: '0.45rem', fontWeight: 600, color: 'var(--text-white)' }}>The Legal Scholar</h3>
              <p style={{ color: 'var(--text-card-secondary)', fontSize: '0.88rem', lineHeight: 1.65 }}>
                Pursuing a Bachelor of Laws (LL.B) at the University of London. Harnessing corporate jurisprudence, contract law, and intellectual property frameworks as strategic tools for corporate governance and dispute resolution.
              </p>

              <div ref={scholarLottieRef} style={{ width: '100%', height: '165px', margin: '1.1rem 0' }} />
            </div>

            <div>
              <div style={{ paddingTop: '1.1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-card-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem', display: 'block' }}>
                  Jurisprudential Focus
                </span>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {[
                    'Corporate Governance & Director Fiduciary Duties',
                    'Commercial Contracts, IP Trademarks & Digital Rights',
                    'International Trade Frameworks & Dispute Mitigation'
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-card-secondary)' }}>
                      <CheckCircle2 size={14} color="var(--lime)" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                ref={scholarBtnRef}
                href="#education"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'space-between', marginTop: '1.1rem' }}
              >
                <span>Explore Academic Ledger</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
