import React from 'react';
import { statsData } from '../data/portfolioData';

export const StatsRow: React.FC = () => {
  return (
    <section style={{ position: 'relative', zIndex: 20, paddingTop: '0.5rem', paddingBottom: '2.5rem' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(0.65rem, 2vw, 1.1rem)'
          }}
        >
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className={`bento-card reveal reveal-delay-${idx + 1}`}
              style={{
                padding: 'clamp(1.1rem, 3vw, 1.65rem) clamp(0.9rem, 2.5vw, 1.4rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease, filter 0.85s ease'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.2rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.05em',
                  color: 'var(--lime)',
                  lineHeight: 1,
                  marginBottom: '0.6rem'
                }}
              >
                {stat.value}
              </div>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 500, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '0.18rem' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
