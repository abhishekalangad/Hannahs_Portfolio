import React from 'react';
import { Trophy, Sparkles, Building } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';

export const HonorsSection: React.FC = () => {
  return (
    <section className="section-wrapper" id="achievements">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="bento-pill bento-pill-cyan">Accolades</span>
          <h2 style={{ fontWeight: 500, marginTop: '0.65rem', color: 'var(--text-primary)' }}>
            Honors &amp; <span className="lime-text">Recognitions</span>
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Distinguished recognitions celebrating rhetorical articulation, dramatic performance, and youth enterprise founding.
          </p>
        </div>

        {/* 3 Honors Bento Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {achievementsData.map((item, idx) => (
            <div
              key={idx}
              className={`bento-card reveal reveal-delay-${idx + 1}`}
              style={{
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease'
              }}
            >
              <div>
                <div className="icon-lime-bg" style={{ width: '38px', height: '38px', borderRadius: '12px', marginBottom: '1.1rem' }}>
                  {idx === 0 ? <Trophy size={17} color="var(--lime)" /> : idx === 1 ? <Sparkles size={17} color="var(--lime)" /> : <Building size={17} color="var(--lime)" />}
                </div>

                <span className="bento-pill" style={{ marginBottom: '0.65rem' }}>
                  {item.category}
                </span>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-white)', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>

                <p style={{ color: 'var(--text-card-secondary)', fontSize: '0.86rem', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>

              <div style={{ marginTop: '1.1rem', paddingTop: '0.65rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--lime)', fontWeight: 600 }}>
                  {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
