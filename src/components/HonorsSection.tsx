import React from 'react';
import { Trophy, Sparkles, Building } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';

export const HonorsSection: React.FC = () => {
  return (
    <section className="section-wrapper" id="achievements">
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '600px', marginBottom: '3rem' }}>
          <span className="bento-pill bento-pill-cyan" style={{ marginBottom: '0.85rem', display: 'inline-flex' }}>Accolades</span>
          <h2 style={{ fontWeight: 400 }}>
            Honors &amp; <span className="lime-text">Recognitions</span>
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
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
              className="bento-card"
              style={{
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div className="icon-lime-bg" style={{ width: '38px', height: '38px', borderRadius: '12px', marginBottom: '1.1rem' }}>
                  {idx === 0 ? <Trophy size={17} /> : idx === 1 ? <Sparkles size={17} /> : <Building size={17} />}
                </div>

                <span className="bento-pill" style={{ marginBottom: '0.65rem' }}>
                  {item.category}
                </span>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 500, letterSpacing: '-0.02em', color: '#ffffff', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>

              <div style={{ marginTop: '1.1rem', paddingTop: '0.65rem', borderTop: '0.8px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--lime)', fontWeight: 500 }}>
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
