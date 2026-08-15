import React from 'react';
import { ArrowRight, MapPin, Linkedin, Mail } from 'lucide-react';
import { personalData } from '../data/portfolioData';
import { useTilt, useMagnetic } from '../utils/animations';

export const Hero3D: React.FC = () => {
  const heroCardRef = useTilt<HTMLDivElement>();
  const ctaPrimaryRef = useMagnetic<HTMLAnchorElement>();
  const ctaSecondaryRef = useMagnetic<HTMLAnchorElement>();
  const ctaLinkedinRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section id="hero" style={{ paddingTop: 'clamp(5rem, 9vw, 7.5rem)', paddingBottom: 'clamp(1.5rem, 3.5vw, 3rem)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <div
          ref={heroCardRef}
          className="bento-card reveal"
          style={{
            padding: 'clamp(1.25rem, 4vw, 3.5rem)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background 0.3s ease, border-color 0.3s ease, opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease'
          }}
        >
          {/* Radial glow — top right */}
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: 'clamp(180px, 35vw, 360px)', height: 'clamp(180px, 35vw, 360px)',
            background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          {/* ── Two-column layout: text left | photo right (responsive) ── */}
          <div className="hero-grid-layout">

            {/* ── LEFT: Text content ── */}
            <div>
              {/* Status pills */}
              <div className="reveal reveal-delay-1" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 'clamp(1rem, 2.5vw, 1.75rem)' }}>
                <span className="bento-pill bento-pill-cyan">
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--lime)', flexShrink: 0 }} />
                  <span>Available for Strategic Opportunities</span>
                </span>
                <span className="bento-pill" style={{ color: 'var(--text-card-secondary)' }}>
                  <MapPin size={11} color="var(--lime)" />
                  <span>Colombo, Sri Lanka</span>
                </span>
              </div>

              {/* Headline */}
              <h1 className="reveal reveal-delay-2" style={{ maxWidth: '820px', fontWeight: 500, marginBottom: 'clamp(0.85rem, 2vw, 1.35rem)', color: 'var(--text-white)' }}>
                Pioneering High-Growth{' '}
                <span className="lime-text">Commerce</span>
                {' '}&amp; Deciphering{' '}
                <span className="lime-text">Legal Frameworks.</span>
              </h1>

              {/* Bio */}
              <p className="reveal reveal-delay-3" style={{
                maxWidth: '600px',
                color: 'var(--text-card-secondary)',
                lineHeight: 1.7,
                marginBottom: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                fontSize: 'clamp(0.88rem, 1.3vw, 1.02rem)'
              }}>
                {personalData.bio}
              </p>

              {/* CTAs */}
              <div className="reveal reveal-delay-4" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: 'clamp(1.75rem, 3.5vw, 3rem)' }}>
                <a ref={ctaPrimaryRef} href="#ventures" className="btn-primary">
                  <span>Explore My Work</span>
                  <ArrowRight size={14} />
                </a>
                <a ref={ctaSecondaryRef} href="#contact" className="btn-secondary">
                  <span>Get in Touch</span>
                </a>
                <a ref={ctaLinkedinRef} href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <Linkedin size={13} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* ── RIGHT: Hannah's photo ── */}
            <div className="hero-photo-wrapper reveal reveal-delay-2">
              {/* Photo frame */}
              <div className="hero-photo-frame">
                {/* Glowing ring behind photo */}
                <div style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, var(--lime), rgba(56,189,248,0.6), var(--lime))',
                  animation: 'heroRingRotate 6s linear infinite',
                  opacity: 0.85,
                }} />
                {/* Inner separator */}
                <div style={{
                  position: 'absolute',
                  inset: '2px',
                  borderRadius: '50%',
                  background: 'var(--card-bg)',
                  zIndex: 1,
                }} />
                {/* Photo */}
                <img
                  src="/hannah.jpg"
                  alt="Hannah Elangovan — Founder & Legal Scholar"
                  style={{
                    position: 'absolute',
                    inset: '6px',
                    width: 'calc(100% - 12px)',
                    height: 'calc(100% - 12px)',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    zIndex: 2,
                  }}
                />
              </div>

              {/* Name + title tag under photo */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-card-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  Hannah Elangovan
                </p>
                <p style={{ fontSize: '0.68rem', color: 'var(--lime)', fontWeight: 600, marginTop: '0.2rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Founder &amp; Legal Scholar
                </p>
              </div>
            </div>

          </div>{/* end grid */}

          {/* Divider */}
          <div className="reveal reveal-delay-4" style={{ height: '1px', background: 'rgba(78,106,156,0.25)', marginBottom: 'clamp(1.25rem, 2.5vw, 1.75rem)', marginTop: 'clamp(1.25rem, 2.5vw, 1.75rem)' }} />

          {/* Quick-facts */}
          <div className="reveal reveal-delay-5" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
            gap: 'clamp(0.85rem, 2.5vw, 1.5rem)'
          }}>
            {[
              { label: 'Current Role',         value: 'Founder & CEO',      sub: 'Web Mall (Pvt) Ltd' },
              { label: 'Legal Studies',         value: 'LL.B Candidate',     sub: 'University of London' },
              { label: 'Teaching Credential',   value: 'Dip.LCM (TD)',       sub: 'Univ. of West London (LCME)' },
              { label: 'Email',                 value: personalData.email,   sub: personalData.phone, isEmail: true }
            ].map((fact, i) => (
              <div key={i}>
                <span style={{ display: 'block', fontSize: '0.64rem', color: 'var(--text-card-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.28rem' }}>
                  {fact.label}
                </span>
                {fact.isEmail ? (
                  <a href={`mailto:${fact.value}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
                    <Mail size={12} color="var(--lime)" />
                    <span style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.82rem)', color: 'var(--text-card-primary)', fontWeight: 600, wordBreak: 'break-all' }}>{fact.value}</span>
                  </a>
                ) : (
                  <span style={{ display: 'block', fontSize: 'clamp(0.82rem, 1.3vw, 0.92rem)', color: 'var(--text-card-primary)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                     {fact.value}
                  </span>
                )}
                <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-card-muted)', marginTop: '0.1rem' }}>
                  {fact.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Keyframe & media query CSS */}
          <style>{`
            @keyframes heroRingRotate {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            .hero-grid-layout {
              display: grid;
              grid-template-columns: minmax(0, 1fr) auto;
              gap: clamp(1.5rem, 4vw, 3.5rem);
              align-items: center;
            }
            .hero-photo-wrapper {
              flex-shrink: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 0.85rem;
            }
            .hero-photo-frame {
              position: relative;
              width: clamp(160px, 20vw, 250px);
              height: clamp(160px, 20vw, 250px);
            }
            @media (max-width: 768px) {
              .hero-grid-layout {
                grid-template-columns: 1fr;
                gap: 2rem;
              }
              .hero-photo-wrapper {
                order: -1;
                margin-bottom: 0.5rem;
              }
              .hero-photo-frame {
                width: clamp(130px, 35vw, 180px);
                height: clamp(130px, 35vw, 180px);
              }
            }
          `}</style>

        </div>
      </div>
    </section>
  );
};
