import React, { useState, useEffect } from 'react';
import { Download, Menu, X, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenResumeModal: () => void;
  onToast: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal, onToast }) => {
  const [isScrolled, setIsScrolled] = useState(false);
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
        {/* Floating Off-White Pill */}
        <div
          style={{
            width: '100%',
            maxWidth: '1060px',
            backgroundColor: isScrolled
              ? 'rgba(255, 255, 255, 0.96)'
              : 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(27, 67, 50, 0.14)',
            borderRadius: '9999px',
            padding: '0.55rem 0.85rem 0.55rem 1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'auto',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Brand Monogram */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div
              style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                backgroundColor: '#1b4332',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700, fontSize: '0.8rem',
                color: '#ffffff',
                flexShrink: 0
              }}
            >
              HE
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)', fontSize: '0.9rem',
                fontWeight: 600, letterSpacing: '-0.02em',
                color: '#111827', display: 'block', lineHeight: 1.1
              }}>
                Hannah Elangovan
              </span>
              <span style={{ fontSize: '0.64rem', color: '#1b4332', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#1b4332', display: 'inline-block' }} />
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
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#ffffff' : '#374151',
                        padding: '0.38rem 0.85rem',
                        borderRadius: '9999px',
                        backgroundColor: isActive ? '#1b4332' : 'transparent',
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
            {/* Download Resume Button */}
            <a
              href="/resume.pdf"
              download="Hannah_Elangovan_Resume.pdf"
              onClick={() => onToast('Downloading Hannah Elangovan Resume PDF...')}
              style={{
                background: 'rgba(27, 67, 50, 0.08)',
                border: '1px solid rgba(27, 67, 50, 0.2)',
                color: '#1b4332',
                padding: '0.38rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                textDecoration: 'none',
                cursor: 'pointer', transition: 'all 0.22s ease'
              }}
              title="Download Official Resume PDF"
            >
              <Download size={13} />
              <span>Download Resume</span>
            </a>



            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                background: 'rgba(27, 67, 50, 0.08)',
                border: '1px solid rgba(27, 67, 50, 0.16)',
                borderRadius: '9999px',
                color: '#111827', cursor: 'pointer',
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
            backgroundColor: 'rgba(247, 249, 245, 0.98)',
            backdropFilter: 'blur(16px)',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            padding: '2rem'
          }}
        >
          <ul style={{ listStyle: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: '1.25rem', fontFamily: 'var(--font-heading)',
                    fontWeight: 600, color: '#111827',
                    textDecoration: 'none'
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', maxWidth: '280px' }}>
            <a
              href="/resume.pdf"
              download="Hannah_Elangovan_Resume.pdf"
              onClick={() => {
                setMobileMenuOpen(false);
                onToast('Downloading Hannah Elangovan Resume PDF...');
              }}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '9999px',
                backgroundColor: 'rgba(27, 67, 50, 0.08)',
                border: '1px solid rgba(27, 67, 50, 0.2)',
                color: '#1b4332', fontSize: '0.86rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                textDecoration: 'none'
              }}
            >
              <Download size={15} />
              <span>Download Resume PDF</span>
            </a>

          </div>
        </div>
      )}
    </>
  );
};
