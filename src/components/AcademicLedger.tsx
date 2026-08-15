import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, CheckCircle2, Award, Pin, PinOff } from 'lucide-react';
import { educationData } from '../data/portfolioData';
import { EducationItem } from '../types/portfolio';

const TimelineLedgerItem: React.FC<{
  item: EducationItem;
  index: number;
  isActive: boolean;
  isLocked: boolean;
  isMobile: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}> = ({ item, index, isActive, isLocked, isMobile, onHover, onLeave, onClick }) => {
  const isLaw = item.id.includes('llb');

  if (isMobile) {
    return (
      <div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
        className="bento-card"
        style={{
          width: '100%',
          height: isActive ? '360px' : '64px',
          border: isActive ? '1px solid rgba(200, 245, 66, 0.35)' : '1px solid var(--card-border)',
          backgroundColor: isActive ? 'rgba(18, 64, 30, 0.8)' : 'var(--card-bg)',
          boxShadow: isActive ? '0 10px 25px rgba(0, 0, 0, 0.15), 0 0 15px rgba(200, 245, 66, 0.05)' : 'var(--card-shadow)',
          borderRadius: '16px',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer'
        }}
      >
        {/* Collapsed Horizontal Mobile View */}
        {!isActive && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            width: '100%',
            padding: '0 1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--lime)', fontWeight: 600 }}>
                0{index + 1}
              </span>
              <span style={{ color: 'var(--text-white)', fontSize: '0.9rem', fontWeight: 600 }}>
                {item.degree}
              </span>
            </div>
            <div style={{ color: 'var(--lime)' }}>
              {isLaw ? <GraduationCap size={15} /> : <Award size={15} />}
            </div>
          </div>
        )}

        {/* Expanded Content Mobile View */}
        {isActive && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '1.75rem 1.5rem',
            animation: 'fade-slide-in 0.4s ease',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Lock/Pin Status Indicator */}
            {isLocked && (
              <div style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--lime)', opacity: 0.8 }} title="Pinned open">
                <Pin size={12} style={{ transform: 'rotate(45deg)' }} />
              </div>
            )}
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span className={isLaw ? 'bento-pill bento-pill-cyan' : 'bento-pill'} style={{ fontSize: '0.68rem', padding: '0.18rem 0.55rem' }}>
                  {item.badge}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-card-muted)', fontWeight: 600, marginRight: isLocked ? '1.5rem' : '0' }}>
                  {item.period}
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: '0.2rem' }}>
                {item.degree}
              </h3>
              <span style={{ fontSize: '0.82rem', color: 'var(--lime)', fontWeight: 600, display: 'block', marginBottom: '0.65rem' }}>
                {item.institution}
              </span>
              <p style={{ color: 'var(--text-card-secondary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>

            {item.modules && item.modules.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.65rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {item.modules.map((mod, i) => (
                    <span
                      key={i}
                      className="tag-chip"
                      style={{
                        fontSize: '0.68rem',
                        padding: '0.18rem 0.45rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        color: 'rgba(255, 255, 255, 0.72)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        boxShadow: 'none'
                      }}
                    >
                      <CheckCircle2 size={9} color="var(--lime)" />
                      <span>{mod}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop Horizontal Accordion Layout
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="bento-card"
      style={{
        flex: isActive ? 3.5 : 1,
        height: '460px',
        border: isActive ? '1px solid rgba(200, 245, 66, 0.35)' : '1px solid var(--card-border)',
        backgroundColor: isActive ? 'rgba(18, 64, 30, 0.8)' : 'var(--card-bg)',
        boxShadow: isActive ? '0 15px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(200, 245, 66, 0.05)' : 'var(--card-shadow)',
        borderRadius: '24px',
        padding: 0,
        overflow: 'hidden',
        transition: 'flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {/* Pin/Lock Status Indicator */}
      {isActive && isLocked && (
        <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--lime)', zIndex: 10, opacity: 0.8 }} title="Pinned open (Click again to unlock scroll)">
          <Pin size={14} style={{ transform: 'rotate(45deg)' }} />
        </div>
      )}

      {/* Collapsed Spine View */}
      {!isActive && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          padding: '2rem 0.5rem',
          animation: 'fade-slide-in 0.4s ease'
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--lime)', fontWeight: 600 }}>
            0{index + 1}
          </span>
          <div style={{
            writingMode: 'vertical-lr',
            transform: 'rotate(180deg)',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '0.98rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            margin: 'auto 0',
            whiteSpace: 'nowrap'
          }}>
            {item.degree}
          </div>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--lime)'
          }}>
            {isLaw ? <GraduationCap size={15} /> : <Award size={15} />}
          </div>
        </div>
      )}

      {/* Expanded Content View */}
      {isActive && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          padding: '2.5rem 2rem',
          animation: 'fade-slide-in 0.5s ease',
          overflow: 'hidden'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span className={isLaw ? 'bento-pill bento-pill-cyan' : 'bento-pill'} style={{ fontSize: '0.68rem', padding: '0.2rem 0.65rem' }}>
                {item.badge}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-card-muted)', fontWeight: 600, marginRight: isLocked ? '1.5rem' : '0' }}>
                {item.period}
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 600, color: 'var(--text-white)', lineHeight: 1.25, letterSpacing: '-0.025em', marginBottom: '0.35rem' }}>
              {item.degree}
            </h3>
            <span style={{ fontSize: '0.88rem', color: 'var(--lime)', fontWeight: 600, display: 'block', marginBottom: '0.85rem' }}>
              {item.institution}
            </span>

            <p style={{ color: 'var(--text-card-secondary)', fontSize: '0.88rem', lineHeight: 1.58, marginBottom: '1.25rem' }}>
              {item.desc}
            </p>

            {item.details && item.details.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {item.details.map((detail, idx) => (
                  <li key={idx} style={{ fontSize: '0.82rem', color: 'var(--text-card-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                    <span style={{ color: 'var(--lime)', fontWeight: 700 }}>•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {item.modules && item.modules.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.1rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {item.modules.map((mod, i) => (
                  <span
                    key={i}
                    className="tag-chip"
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.22rem 0.55rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      color: 'rgba(255, 255, 255, 0.72)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      boxShadow: 'none'
                    }}
                  >
                    <CheckCircle2 size={10} color="var(--lime)" />
                    <span>{mod}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const AcademicLedger: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isMobile || lockedIndex !== null) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const elementCenter = rect.top + rect.height / 2;
      const startY = vh * 0.85;
      const endY = vh * 0.15;
      
      const progress = Math.min(Math.max((startY - elementCenter) / (startY - endY), 0), 1);

      const count = educationData.length;
      const calculatedIndex = Math.min(Math.floor(progress * count), count - 1);
      setActiveIndex(calculatedIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, lockedIndex]);

  const activePanelIndex = hoveredIndex !== null ? hoveredIndex : (lockedIndex !== null ? lockedIndex : activeIndex);

  return (
    <section ref={sectionRef} className="section-wrapper" id="education" style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
      <style>{`
        @keyframes fade-slide-in {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal" style={{ marginBottom: '2.5rem' }}>
          <span className="bento-pill bento-pill-cyan">Academic Ledger</span>
          <h2 style={{ fontWeight: 500, marginTop: '0.65rem', color: 'var(--text-primary)' }}>
            Scholastic Pedigree &amp; <span className="lime-text">Credentials</span>
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px' }}>
            An interactive timeline of British legal studies, communication pedagogy, and inclusive social science certifications.
          </p>
        </div>

        {/* Accordion Panels Stack */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.85rem' : '1rem',
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'stretch'
        }}>
          {educationData.map((item, index) => (
            <TimelineLedgerItem
              key={item.id}
              item={item}
              index={index}
              isActive={activePanelIndex === index}
              isLocked={lockedIndex === index}
              isMobile={isMobile}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              onClick={() => {
                setLockedIndex(lockedIndex === index ? null : index);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
