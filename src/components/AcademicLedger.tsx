import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { BookOpen, GraduationCap, ChevronDown, CheckCircle2, Award } from 'lucide-react';
import { educationData } from '../data/portfolioData';
import { EducationItem } from '../types/portfolio';

const TimelineLedgerItem: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: any = null;
    if (lottieRef.current) {
      anim = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: item.lottiePath
      });
    }
    return () => anim?.destroy();
  }, [item.lottiePath]);

  const isLaw = item.id.includes('llb');

  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: 'clamp(2.5rem, 5vw, 4.25rem)',
        marginBottom: '2.5rem'
      }}
    >
      {/* Timeline Node Icon */}
      <div
        style={{
          position: 'absolute',
          left: '0',
          top: '0',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'rgba(200, 245, 66, 0.08)',
          border: `0.8px solid ${isLaw ? 'rgba(200,245,66,0.45)' : 'rgba(255,255,255,0.18)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isLaw ? '0 0 14px rgba(200,245,66,0.2)' : 'none',
          zIndex: 2
        }}
      >
        {isLaw ? (
          <GraduationCap size={16} color="var(--lime)" />
        ) : (
          <Award size={16} color="rgba(255,255,255,0.7)" />
        )}
      </div>

      {/* Content Card */}
      <div
        className="bento-card"
        style={{
          padding: '2rem 1.75rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <span className={isLaw ? 'bento-pill bento-pill-cyan' : 'bento-pill'} style={{ marginBottom: '0.65rem' }}>
              {item.badge}
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 400, letterSpacing: '-0.03em', color: '#ffffff', marginTop: '0.2rem' }}>
              {item.degree}
            </h3>
            <span style={{ fontSize: '0.84rem', color: isLaw ? 'var(--lime)' : 'rgba(255,255,255,0.5)', fontWeight: 500, display: 'block', marginTop: '0.15rem' }}>
              {item.institution}
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
              {item.period}
            </span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--lime)', marginTop: '0.15rem' }}>
              {item.status}
            </span>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginTop: '0.85rem' }}>
          {item.desc}
        </p>

        {/* Expandable Coursework Module Breakdown */}
        {item.modules && (
          <div style={{ marginTop: '1.1rem', paddingTop: '0.75rem', borderTop: '0.8px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--lime)',
                fontSize: '0.74rem',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <span>{isExpanded ? 'Hide Coursework Modules' : 'Inspect Curriculum Modules'}</span>
              <ChevronDown
                size={13}
                style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
              />
            </button>

            {isExpanded && (
              <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {item.modules.map((mod, i) => (
                  <span
                    key={i}
                    className="tag-chip"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: 'rgba(255,255,255,0.7)'
                    }}
                  >
                    <CheckCircle2 size={11} color="var(--lime)" />
                    <span>{mod}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const AcademicLedger: React.FC = () => {
  return (
    <section className="section-wrapper" id="education">
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '600px', marginBottom: '3rem' }}>
          <span className="bento-pill bento-pill-cyan" style={{ marginBottom: '0.85rem', display: 'inline-flex' }}>Academic Ledger</span>
          <h2 style={{ fontWeight: 400 }}>
            Scholastic Pedigree &amp; <span className="lime-text">Credentials</span>
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            A verified timeline of British legal studies, communication pedagogy, and inclusive social science certifications.
          </p>
        </div>

        {/* Timeline Ledger Track */}
        <div style={{ position: 'relative', maxWidth: '880px', margin: '0 auto' }}>
          <div
            style={{
              position: 'absolute',
              top: '18px',
              bottom: '18px',
              left: '17px',
              width: '1.5px',
              background: 'linear-gradient(to bottom, var(--lime), rgba(255,255,255,0.07))',
              zIndex: 1
            }}
          />

          {educationData.map((item, index) => (
            <TimelineLedgerItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
