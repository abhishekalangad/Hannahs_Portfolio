import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { StatsRow } from './components/StatsRow';
import { DualPerspective } from './components/DualPerspective';
import { HorizontalShowcase } from './components/HorizontalShowcase';
import { AcademicLedger } from './components/AcademicLedger';
import { SkillsMatrix } from './components/SkillsMatrix';
import { KeynoteSpotlight } from './components/KeynoteSpotlight';
import { HonorsSection } from './components/HonorsSection';
import { ContactSuite } from './components/ContactSuite';
import { ModalDossier } from './components/ModalDossier';
import { BgShader } from './components/BgShader';
import { useScrollReveal } from './utils/animations';
import { Leaf, ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Scroll Reveal Animations
  useScrollReveal();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    /* Outer sage frame is body padding via CSS; inner is this div */
    <div className="bento-mesh-bg">
      <BgShader />

      <Navbar onOpenResumeModal={() => setActiveModalId('resume')} onToast={showToast} />

      <main>
        <Hero3D />
        <StatsRow />
        <DualPerspective currentMode='founder' onOpenModal={setActiveModalId} />
        <HorizontalShowcase onOpenModal={setActiveModalId} />
        <AcademicLedger />
        <SkillsMatrix />
        <KeynoteSpotlight onOpenModal={() => setActiveModalId('keynote-antha')} />
        <HonorsSection />
        <ContactSuite onToast={showToast} />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(26, 63, 117, 0.15)',
          padding: '2.5rem 0',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  backgroundColor: '#00002A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.72rem', fontWeight: 700, color: '#00002A'
                }}>
                  HE
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                  Hannah Elangovan
                </span>
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Founder &amp; CEO, Web Mall (Pvt) Ltd • LL.B Candidate, University of London
              </p>
            </div>

            <button onClick={scrollToTop} className="btn-secondary" style={{ padding: '0.42rem 1rem', fontSize: '0.76rem' }}>
              <ArrowUp size={13} />
              <span>Back to Top</span>
            </button>
          </div>

          <div style={{
            marginTop: '1.75rem', paddingTop: '1rem',
            borderTop: '1px solid rgba(26, 63, 117, 0.10)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '0.6rem',
            fontSize: '0.72rem', color: 'var(--text-muted)'
          }}>
            <span>&copy; {new Date().getFullYear()} Hannah Elangovan. All Rights Reserved.</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Leaf size={12} color="var(--lime)" />
              Built with React • TypeScript • Vite • Three.js
            </span>
          </div>
        </div>
      </footer>

      {/* Modal Dossier */}
      <ModalDossier modalId={activeModalId} onClose={() => setActiveModalId(null)} onToast={showToast} />

      {/* Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 300,
          padding: '0.6rem 1.15rem',
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          border: '0.8px solid rgba(26, 63, 117, 0.22)',
          borderRadius: '9999px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: '#ffffff',
          fontSize: '0.78rem', fontWeight: 500
        }}>
          <Leaf size={13} color="var(--lime)" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
