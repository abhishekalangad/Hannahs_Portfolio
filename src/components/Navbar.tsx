import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, FileText, Sparkles, MapPin } from 'lucide-react';
import { soundscape } from '../utils/soundscape';

interface NavbarProps {
  onOpenResumeModal: () => void;
  onToast: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal, onToast }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      const sections = ['hero', 'dual-identity', 'ventures', 'education', 'skills', 'keynote', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const active = soundscape.toggle();
    setIsPlayingAudio(active);
    onToast(active ? 'Atmospheric Soundscape: Active' : 'Soundscape Muted');
  };

  const navLinks = [
    { label: 'Home',     href: '#hero' },
    { label: 'Identity', href: '#dual-identity' },
    { label: 'Ventures', href: '#ventures' },
    { label: 'Education',href: '#education' },
    { label: 'Skills',   href: '#skills' },
    { label: 'Keynote',  href: '#keynote' },
    { label: 'Contact',  href: '#contact' }
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 'clamp(0.85rem, 2vw, 1.5rem)',
          left: 0, right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          padding: '0 clamp(0.75rem, 3vw, 2rem)'
        }}
      >
        {/* Floating Forest Green Pill */}
        <div
          style={{
            width: '100%',
            maxWidth: '1060px',
            backgroundColor: isScrolled
              ? 'rgba(9, 37, 15, 0.96)'
              : 'rgba(11, 42, 18, 0.82)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '0.8px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            padding: '0.55rem 0.85rem 0.55rem 1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'auto',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)'
          }}
        >
          {/* Brand Monogram */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div
              style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--lime)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700, fontSize: '0.8rem',
                color: 'var(--green-deep)',
                flexShrink: 0
              }}
            >
              HE
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)', fontSize: '0.9rem',
                fontWeight: 500, letterSpacing: '-0.02em',
                color: '#ffffff', display: 'block', lineHeight: 1.1
              }}>
                Hannah Elangovan
              </span>
              <span style={{ fontSize: '0.64rem', color: 'rgba(200,245,66,0.8)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--lime)', display: 'inline-block' }} />
                Founder & Legal Scholar
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'none' }} className="desktop-nav-links">
            <ul style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', listStyle: 'none' }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      style={{
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? 'var(--green-deep)' : 'rgba(255,255,255,0.6)',
                        padding: '0.38rem 0.85rem',
                        borderRadius: '9999px',
                        backgroundColor: isActive ? '#ffffff' : 'transparent',
                        transition: 'all 0.22s ease',
                        display: 'block',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              style={{
                background: isPlayingAudio ? 'rgba(200, 245, 66, 0.15)' : 'rgba(255,255,255,0.04)',
                border: `0.8px solid ${isPlayingAudio ? 'rgba(200,245,66,0.4)' : 'rgba(255,255,255,0.12)'}`,
                color: isPlayingAudio ? 'var(--lime)' : 'rgba(255,255,255,0.5)',
                padding: '0.38rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                cursor: 'pointer', transition: 'all 0.22s ease'
              }}
              title="Toggle Ambient Soundscape"
            >
              {isPlayingAudio ? <Volume2 size={12} /> : <VolumeX size={12} />}
              <span>{isPlayingAudio ? 'On' : 'Sound'}</span>
            </button>

            {/* Dossier CTA */}
            <button
              onClick={onOpenResumeModal}
              className="btn-primary desktop-only"
              style={{ padding: '0.42rem 1.1rem', fontSize: '0.78rem' }}
            >
              <FileText size={12} />
              <span>Dossier</span>
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '0.8px solid rgba(255,255,255,0.12)',
                borderRadius: '9999px',
                color: '#ffffff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0.4rem',
                width: '32px', height: '32px'
              }}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            backgroundColor: 'rgba(10, 42, 18, 0.97)',
            backdropFilter: 'blur(24px)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '6rem 2rem 3rem'
          }}
        >
          <div>
            <span className="bento-pill bento-pill-cyan" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>Navigation</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '1rem' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.5rem', letterSpacing: '-0.04em',
                      color: 'rgba(255,255,255,0.9)',
                      textDecoration: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.65rem 0',
                      borderBottom: '0.8px solid rgba(255,255,255,0.07)'
                    }}
                  >
                    <span>{link.label}</span>
                    <Sparkles size={13} color="var(--lime)" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ paddingTop: '1.5rem', borderTop: '0.8px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenResumeModal(); }}
              className="btn-primary"
              style={{ width: '100%', marginBottom: '0.85rem' }}
            >
              <FileText size={14} />
              <span>Open Executive Dossier</span>
            </button>
            <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)', display: 'block', textAlign: 'center' }}>
              hannahpanthea@gmail.com
            </span>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-links { display: block !important; }
          .mobile-menu-btn { display: none !important; }
          .desktop-only { display: inline-flex !important; }
        }
        @media (max-width: 899px) {
          .desktop-only { display: none !important; }
        }
      `}</style>
    </>
  );
};
