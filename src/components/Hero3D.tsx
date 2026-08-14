import React from 'react';
import { ArrowRight, MapPin, Linkedin, Mail } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export const Hero3D: React.FC = () => {
  return (
    <section id="hero" style={{ paddingTop: 'clamp(5.5rem, 10vw, 7.5rem)', paddingBottom: 'clamp(2rem, 4vw, 3.5rem)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <div
          className="bento-card"
          style={{
            padding: 'clamp(1.5rem, 5vw, 4rem)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Lime radial glow — top right */}
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: 'clamp(200px, 40vw, 360px)', height: 'clamp(200px, 40vw, 360px)',
            background: 'radial-gradient(circle, rgba(200,245,66,0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          {/* Status pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap', marginBottom: 'clamp(1.25rem, 3vw, 2rem)' }}>
            <span className="bento-pill bento-pill-cyan">
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--lime)', flexShrink: 0 }} />
              <span>Available for Strategic Opportunities</span>
            </span>
            <span className="bento-pill" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <MapPin size={11} />
              <span>Colombo, Sri Lanka</span>
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ maxWidth: '820px', fontWeight: 400, marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
            Building Scalable{' '}
            <span className="lime-text">Commerce</span>
            {' '}&amp; Mastering{' '}
            <span className="lime-text">Corporate Law.</span>
          </h1>

          {/* Bio */}
          <p style={{
            maxWidth: '640px',
            color: 'rgba(255,255,255,0.58)',
            lineHeight: 1.72,
            marginBottom: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)'
          }}>
            {personalData.bio}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: 'clamp(2rem, 4vw, 3.25rem)' }}>
            <a href="#ventures" className="btn-primary">
              <span>Explore My Work</span>
              <ArrowRight size={14} />
            </a>
            <a href="#contact" className="btn-secondary">
              <span>Get in Touch</span>
            </a>
            <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Linkedin size={13} />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Divider */}
          <div style={{ height: '0.8px', background: 'rgba(255,255,255,0.07)', marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }} />

          {/* Quick-facts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: 'clamp(1rem, 3vw, 1.75rem)'
          }}>
            {[
              { label: 'Current Role',         value: 'Founder & CEO',      sub: 'Web Mall (Pvt) Ltd' },
              { label: 'Legal Studies',         value: 'LL.B Candidate',     sub: 'University of London' },
              { label: 'Teaching Credential',   value: 'Dip.LCM (TD)',       sub: 'Univ. of West London (LCME)' },
              { label: 'Email',                 value: personalData.email,   sub: personalData.phone, isEmail: true }
            ].map((fact, i) => (
              <div key={i}>
                <span style={{ display: 'block', fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.28rem' }}>
                  {fact.label}
                </span>
                {fact.isEmail ? (
                  <a href={`mailto:${fact.value}`} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
                    <Mail size={12} color="var(--lime)" />
                    <span style={{ fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)', color: 'rgba(255,255,255,0.75)', fontWeight: 500, wordBreak: 'break-all' }}>{fact.value}</span>
                  </a>
                ) : (
                  <span style={{ display: 'block', fontSize: 'clamp(0.82rem, 1.5vw, 0.92rem)', color: '#ffffff', fontWeight: 500, letterSpacing: '-0.02em' }}>
                    {fact.value}
                  </span>
                )}
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.1rem' }}>
                  {fact.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
