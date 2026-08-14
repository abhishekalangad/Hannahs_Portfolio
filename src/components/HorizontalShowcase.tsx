import React, { useRef, useState, useEffect } from 'react';
import lottie from 'lottie-web';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { venturesData } from '../data/portfolioData';
import { VentureItem } from '../types/portfolio';

interface HorizontalShowcaseProps {
  onOpenModal: (id: string) => void;
}

const VentureCardItem: React.FC<{ venture: VentureItem; onOpenModal: (id: string) => void }> = ({ venture, onOpenModal }) => {
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
      className="bento-card"
      style={{
        width: 'clamp(280px, 80vw, 340px)',
        minHeight: 'clamp(380px, 55vw, 450px)',
        padding: 'clamp(1.25rem, 3vw, 1.85rem)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        flexShrink: 0,
        cursor: 'pointer',
        scrollSnapAlign: 'start'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span className="bento-pill bento-pill-cyan">{venture.badge}</span>
          <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{venture.period}</span>
        </div>

        <h3 style={{ marginBottom: '0.2rem', fontWeight: 400 }}>{venture.title}</h3>
        <span style={{ fontSize: '0.74rem', color: 'var(--lime)', fontWeight: 500, display: 'block', marginBottom: '0.6rem', opacity: 0.85 }}>
          {venture.role}
        </span>
        <p style={{ fontSize: 'clamp(0.8rem, 1.3vw, 0.86rem)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.58 }}>
          {venture.shortDesc}
        </p>

        <div ref={lottieContainerRef} style={{ height: 'clamp(110px, 18vw, 145px)', width: '100%', margin: '0.75rem 0' }} />
      </div>

      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {venture.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="tag-chip">{tag}</span>
          ))}
        </div>
        <div style={{
          marginTop: '0.85rem', paddingTop: '0.65rem',
          borderTop: '0.8px solid rgba(255,255,255,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '0.74rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)'
        }}>
          <span>View Case Dossier</span>
          <ArrowUpRight size={14} color="var(--lime)" />
        </div>
      </div>
    </div>
  );
};

export const HorizontalShowcase: React.FC<HorizontalShowcaseProps> = ({ onOpenModal }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const categories = ['All', 'E-Commerce', 'Keynotes & Summits', 'Pedagogy & Speech'];

  const filteredVentures = activeCategory === 'All'
    ? venturesData
    : venturesData.filter((v) => v.category === activeCategory);

  const updateProgress = () => {
    if (!scrollRef.current) return;
    const max = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    setScrollProgress(max <= 0 ? 100 : (scrollRef.current.scrollLeft / max) * 100);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => el.removeEventListener('scroll', updateProgress);
  }, [filteredVentures]);

  const scroll = (dir: number) => scrollRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };
  const handleMouseLeave = () => { isDraggingRef.current = false; };
  const handleMouseUp   = () => { isDraggingRef.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeftRef.current - (x - startXRef.current) * 1.5;
  };

  const arrowStyle: React.CSSProperties = {
    width: '38px', height: '38px', borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '0.8px solid rgba(255,255,255,0.14)',
    color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.22s ease', flexShrink: 0
  };

  return (
    <section className="section-wrapper" id="ventures" style={{ overflow: 'hidden', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <span className="bento-pill bento-pill-cyan" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>Selected Works</span>
            <h2 style={{ fontWeight: 400 }}>
              Ventures &amp; <span className="lime-text">Case Studies</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.48)', marginTop: '0.35rem', maxWidth: '520px' }}>
              Drag or swipe to explore Hannah's enterprise, keynote, and pedagogy credentials.
            </p>
          </div>
          {/* Arrow controls — hide on very small screens, shown on ≥480px */}
          <div style={{ display: 'flex', gap: '0.45rem', flexShrink: 0 }}>
            <button onClick={() => scroll(-1)} style={arrowStyle} title="Previous" aria-label="Previous"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll(1)} style={arrowStyle} title="Next" aria-label="Next"><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: 'clamp(1.25rem, 3vw, 2rem)' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.34rem 0.9rem', borderRadius: '9999px',
                fontSize: '0.74rem', fontWeight: activeCategory === cat ? 500 : 400,
                border: `0.8px solid ${activeCategory === cat ? 'rgba(200,245,66,0.5)' : 'rgba(255,255,255,0.12)'}`,
                backgroundColor: activeCategory === cat ? 'var(--lime)' : 'rgba(255,255,255,0.04)',
                color: activeCategory === cat ? 'var(--green-deep)' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer', transition: 'all 0.22s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="h-scroll-track"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className="h-scroll-inner"
          style={{
            paddingLeft: 'max(1rem, calc((100vw - min(1280px, 100vw)) / 2 + 1rem))',
            paddingRight: 'max(1rem, calc((100vw - min(1280px, 100vw)) / 2 + 1rem))'
          }}
        >
          {filteredVentures.map((venture) => (
            <VentureCardItem key={venture.id} venture={venture} onOpenModal={onOpenModal} />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="container" style={{ marginTop: '0.75rem' }}>
        <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${scrollProgress}%`, background: 'var(--lime)', borderRadius: '2px', transition: 'width 0.15s linear' }} />
        </div>
      </div>
    </section>
  );
};
