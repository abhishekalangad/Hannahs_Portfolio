import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { GraduationCap, ChevronDown, CheckCircle2, Award } from 'lucide-react';
import { educationData } from '../data/portfolioData';
import { EducationItem } from '../types/portfolio';
import { useTilt } from '../utils/animations';

const TimelineLedgerItem: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const lottieRef = useRef<HTMLDivElement>(null);
  
  // Wrap education card inside 3D tilt interaction
  const cardRef = useTilt<HTMLDivElement>();

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
      className="reveal reveal-delay-2"
      style={{
        position: 'relative',
        paddingLeft: 'clamp(2.5rem, 5vw, 4.25rem)',
        marginBottom: '2.5rem',
        transition: 'opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease'
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
          backgroundColor: 'var(--green-deep)',
          border: `1px solid ${isLaw ? 'var(--lime)' : 'rgba(255, 255, 255, 0.12)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'none',
          zIndex: 2
        }}
      >
        {isLaw ? (
          <GraduationCap size={16} color="var(--lime)" />
        ) : (
          <Award size={16} color="var(--lime)" />
        )}
      </div>

      {/* Content Card */}
      <div
        ref={cardRef}
        className="bento-card"
        style={{
          padding: '2rem 1.75rem',
          transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <span className={isLaw ? 'bento-pill bento-pill-cyan' : 'bento-pill'} style={{ marginBottom: '0.65rem' }}>
              {item.badge}
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text-white)', marginTop: '0.2rem' }}>
              {item.degree}
            </h3>
            <span style={{ fontSize: '0.84rem', color: 'var(--lime)', fontWeight: 600, display: 'block', marginTop: '0.15rem' }}>
              {item.institution}
            </span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-card-muted)', fontWeight: 600 }}>
              {item.period}
            </span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--lime)', fontWeight: 600, marginTop: '0.15rem' }}>
              {item.status}
            </span>
          </div>
        </div>

        <p style={{ color: 'var(--text-card-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginTop: '0.85rem' }}>
          {item.desc}
        </p>

        {/* Expandable Coursework Module Breakdown */}
        {item.modules && (
          <div style={{ marginTop: '1.1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--lime)',
                fontSize: '0.76rem',
                fontWeight: 600,
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
                      color: 'var(--text-card-secondary)'
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
        <div className="section-header reveal">
          <span className="bento-pill bento-pill-cyan">Academic Ledger</span>
          <h2 style={{ fontWeight: 500, marginTop: '0.65rem', color: 'var(--text-primary)' }}>
            Scholastic Pedigree &amp; <span className="lime-text">Credentials</span>
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            A verified timeline of British legal studies, communication pedagogy, and inclusive social science certifications.
          </p>
        </div>

        {/* Timeline Ledger Track */}
        <div style={{ position: 'relative', maxWidth: '880px', margin: '0 auto' }}>
          <div
            className="reveal reveal-delay-1"
            style={{
              position: 'absolute',
              top: '18px',
              bottom: '18px',
              left: '17px',
              width: '2px',
              background: 'linear-gradient(to bottom, #1b4332, rgba(27,67,50,0.12))',
              zIndex: 1,
              transition: 'opacity 0.8s ease'
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
