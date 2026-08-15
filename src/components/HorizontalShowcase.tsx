import React, { useRef, useState, useEffect } from 'react';
import lottie from 'lottie-web';
import { ArrowUpRight, Lock } from 'lucide-react';
import { venturesData } from '../data/portfolioData';
import { VentureItem } from '../types/portfolio';

interface HorizontalShowcaseProps {
  onOpenModal: (id: string) => void;
}

const MacWindowHeader: React.FC<{ domain?: string; category: string }> = ({ domain = 'hannah-elangovan.com' }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0.45rem 0.75rem',
    backgroundColor: '#f0f4ee',
    borderBottom: '1px solid rgba(27, 67, 50, 0.12)',
    borderTopLeftRadius: '14px', borderTopRightRadius: '14px'
  }}>
    {/* Window dots */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
      <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ff5f56', display: 'inline-block' }} />
      <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }} />
      <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#27c93f', display: 'inline-block' }} />
    </div>

    {/* Address Pill */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.35rem',
      backgroundColor: '#ffffff',
      border: '1px solid rgba(27, 67, 50, 0.14)',
      borderRadius: '9999px',
      padding: '0.15rem 0.6rem',
      fontSize: 'clamp(0.55rem, 0.7vw, 0.65rem)',
      color: '#1b4332',
      fontFamily: 'monospace',
      fontWeight: 600
    }}>
      <Lock size={9} color="#1b4332" />
      <span>{domain}</span>
    </div>

    {/* Live Tag */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6rem', color: '#1b4332', fontWeight: 700 }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#1b4332' }} />
      <span>LIVE</span>
    </div>
  </div>
);

const VentureCardContent: React.FC<{ venture: VentureItem; onOpenModal: (id: string) => void }> = ({ venture, onOpenModal }) => {
  const lottieContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: any = null;
    if (lottieContainerRef.current) {
      anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg', loop: true, autoplay: true,
        path: venture.lottiePath
      });
    }
    return () => anim?.destroy();
  }, [venture.lottiePath]);

  return (
    <div
      onClick={() => onOpenModal(venture.id)}
      style={{
        padding: 'clamp(0.6rem, 1vw, 1rem) clamp(0.7rem, 1.1vw, 1.15rem) clamp(0.7rem, 1.1vw, 1.15rem)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        height: 'calc(100% - 32px)',
        cursor: 'pointer'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
          <span className="bento-pill bento-pill-cyan" style={{ fontSize: '0.65rem', padding: '0.18rem 0.55rem' }}>{venture.badge}</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-card-muted)', fontWeight: 600 }}>{venture.period}</span>
        </div>

        <h3 style={{ marginBottom: '0.15rem', fontWeight: 600, fontSize: 'clamp(0.85rem, 1.1vw, 1.08rem)', color: 'var(--text-white)' }}>{venture.title}</h3>
        <span style={{ fontSize: 'clamp(0.68rem, 0.78vw, 0.74rem)', color: 'var(--lime)', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
          {venture.role}
        </span>
        <p style={{ fontSize: 'clamp(0.72rem, 0.85vw, 0.81rem)', color: 'var(--text-card-secondary)', lineHeight: 1.55 }}>
          {venture.shortDesc}
        </p>

        <div ref={lottieContainerRef} style={{ height: 'clamp(60px, 8vh, 95px)', width: '100%', margin: '0.25rem 0' }} />
      </div>

      <div>
        <div style={{
          marginTop: '0.25rem', paddingTop: '0.45rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: '0.72rem', color: 'var(--lime)', fontWeight: 600
        }}>
          <span>View Case Dossier</span>
          <ArrowUpRight size={13} />
        </div>
      </div>
    </div>
  );
};

export const HorizontalShowcase: React.FC<HorizontalShowcaseProps> = ({ onOpenModal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [targetRatio, setTargetRatio] = useState<number>(0);
  const [smoothRatio, setSmoothRatio] = useState<number>(0);
  const [, setIsHovered] = useState<boolean>(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ['All', 'E-Commerce', 'Keynotes & Summits', 'Pedagogy & Speech'];

  const filteredVentures = activeCategory === 'All'
    ? venturesData
    : venturesData.filter((v) => v.category === activeCategory);

  // Track viewport scroll progress: cards reach 100% full expansion as soon as section appears on screen
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Starts expanding as section enters from bottom (85% viewport height)
      // Reaches 100% FULL expansion by 55% viewport height (centered on screen)
      const startY = vh * 0.85;
      const endY = vh * 0.55;

      const progress = Math.min(Math.max((startY - rect.top) / (startY - endY), 0), 1);
      setTargetRatio(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth lerp loop for fluid, elegant spring motion
  useEffect(() => {
    let animId: number;
    const loop = () => {
      setSmoothRatio((prev) => {
        const diff = targetRatio - prev;
        if (Math.abs(diff) < 0.0005) return targetRatio;
        return prev + diff * 0.12;
      });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [targetRatio]);

  // Effective progress is strictly driven by vertical scrolling
  const effectiveProgress = smoothRatio;

  const colsCount = Math.min(filteredVentures.length, 4);
  const rowsCount = Math.ceil(filteredVentures.length / colsCount);
  const midCol = (colsCount - 1) / 2;
  const midRow = (rowsCount - 1) / 2;

  return (
    <section
      ref={sectionRef}
      className="section-wrapper"
      id="ventures"
      style={{
        position: 'relative',
        padding: 'clamp(2.5rem, 5vw, 4rem) 0'
      }}
    >
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        <div className="container" style={{ paddingTop: '0.25rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.85rem' }}>
            <div>
              <span className="bento-pill bento-pill-cyan" style={{ marginBottom: '0.4rem', display: 'inline-flex' }}>Selected Works</span>
              <h2 style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                Ventures &amp; <span className="lime-text">Case Studies</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', maxWidth: '540px', fontSize: '0.86rem' }}>
                Explore Hannah's flagship enterprise, keynote engagements, and pedagogy credentials.
              </p>
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.28rem 0.8rem', borderRadius: '9999px',
                    fontSize: '0.72rem', fontWeight: activeCategory === cat ? 600 : 500,
                    border: `1px solid ${activeCategory === cat ? '#1b4332' : 'rgba(27,67,50,0.16)'}`,
                    backgroundColor: activeCategory === cat ? '#1b4332' : '#ffffff',
                    color: activeCategory === cat ? '#ffffff' : '#1b4332',
                    cursor: 'pointer', transition: 'all 0.22s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Horizontal Scroll Track or 3D Interactive Fan-to-Grid Stage */}
        {isMobile ? (
          <div
            className="h-scroll-track"
            style={{
              width: '100%',
              padding: '0 clamp(1rem, 4vw, 2.75rem)',
              cursor: 'grab',
              overflowX: 'auto',
              scrollbarWidth: 'none'
            }}
          >
            <div className="h-scroll-inner" style={{ paddingLeft: 'clamp(0.2rem, 1vw, 1rem)' }}>
              {filteredVentures.map((venture) => (
                <div
                  key={venture.id}
                  style={{
                    width: 'clamp(290px, 75vw, 340px)',
                    flexShrink: 0
                  }}
                >
                  <div
                    className="bento-card"
                    style={{
                      width: '100%',
                      height: '420px',
                      borderRadius: '16px',
                      padding: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      boxShadow: 'var(--card-shadow)'
                    }}
                  >
                    <MacWindowHeader domain={venture.domain} category={venture.category} />
                    <VentureCardContent venture={venture} onOpenModal={onOpenModal} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setHoveredCardId(null); }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '0 clamp(1rem, 4vw, 3rem)',
              perspective: '1400px',
              perspectiveOrigin: '50% 45%'
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '1280px',
                display: 'grid',
                gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))`,
                gap: 'clamp(0.75rem, 1.8vw, 1.35rem)',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              {filteredVentures.map((venture, index) => {
                const col = index % colsCount;
                const row = Math.floor(index / colsCount);
                const colOffset = midCol - col;
                const rowOffset = midRow - row;
                const isCardHovered = hoveredCardId === venture.id;

                // Compute target offsets when in gathered stacked deck state (progress = 0)
                const targetX = colOffset * 105;
                const targetY = rowOffset * 105;
                const jitter = (index % 2 === 0 ? -12 : 12);
                const initialRotate = colOffset * 7 + (index % 2 === 0 ? -3 : 3);

                // Interpolated values based on effectiveProgress (0.0 stacked -> 1.0 grid)
                const currentX = targetX * (1 - effectiveProgress);
                const currentY = targetY * (1 - effectiveProgress);
                const currentJitter = jitter * (1 - effectiveProgress);
                const currentRotate = initialRotate * (1 - effectiveProgress);
                const currentScale = 0.75 + (1 - 0.75) * effectiveProgress;
                const currentOpacity = 0.3 + (1 - 0.3) * effectiveProgress;

                // Z-Index hierarchy
                const baseZ = Math.max(10, 50 - Math.abs(colOffset) * 10 - Math.abs(rowOffset) * 5);
                const zIndex = isCardHovered ? 150 : Math.round(baseZ);

                let transform = `translate3d(${currentX}%, calc(${currentY}% + ${currentJitter}px), 0px) rotate(${currentRotate}deg) scale(${currentScale})`;
                if (isCardHovered && effectiveProgress > 0.5) {
                  transform = `translate3d(${currentX}%, calc(${currentY}% + ${currentJitter - 10}px), 40px) rotate(0deg) scale(${currentScale * 1.03})`;
                }

                return (
                  <div
                    key={venture.id}
                    onMouseEnter={() => setHoveredCardId(venture.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={{
                      transform,
                      opacity: currentOpacity,
                      zIndex: zIndex,
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                      willChange: 'transform, opacity'
                    }}
                  >
                    <div
                      className="bento-card"
                      style={{
                        width: '100%',
                        height: 'clamp(380px, 46vh, 420px)',
                        borderRadius: '16px',
                        padding: 0,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'var(--card-bg)',
                        border: isCardHovered
                          ? '1px solid var(--card-border-h)'
                          : '1px solid var(--card-border)',
                        boxShadow: isCardHovered
                          ? 'rgba(0, 0, 0, 0.45) 0px 22px 48px -14px'
                          : 'var(--card-shadow)'
                      }}
                    >
                      <MacWindowHeader domain={venture.domain} category={venture.category} />
                      <VentureCardContent venture={venture} onOpenModal={onOpenModal} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
