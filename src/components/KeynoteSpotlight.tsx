import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { ExternalLink, Mic, FileText } from 'lucide-react';
import { useTilt, useMagnetic } from '../utils/animations';

interface KeynoteSpotlightProps {
  onOpenModal: () => void;
}

export const KeynoteSpotlight: React.FC<KeynoteSpotlightProps> = ({ onOpenModal }) => {
  const lottieRef = useRef<HTMLDivElement>(null);
  
  // Wrap keynote card in 3D tilt
  const cardRef = useTilt<HTMLDivElement>();

  // Wrap buttons in Magnetic pulls
  const verifyBtnRef = useMagnetic<HTMLAnchorElement>();
  const dossierBtnRef = useMagnetic<HTMLButtonElement>();

  useEffect(() => {
    let anim: any = null;
    if (lottieRef.current) {
      anim = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'lottie/business-presentation.json'
      });
    }
    return () => anim?.destroy();
  }, []);

  return (
    <section className="section-wrapper" id="keynote">
      <div className="container">
        <div
          ref={cardRef}
          className="bento-card reveal"
          style={{
            background: 'radial-gradient(ellipse at 85% 20%, rgba(78, 164, 204, 0.15) 0%, var(--card-bg) 70%)',
            padding: 'clamp(2.25rem, 4.5vw, 3.5rem)',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: 'var(--card-shadow)',
            transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left Content */}
            <div>
              <span className="bento-pill bento-pill-cyan mb-3">
                <Mic size={13} color="var(--lime)" />
                <span>Global Keynote Speaker</span>
              </span>

              <h2 style={{ fontSize: 'clamp(1.65rem, 3vw, 2.4rem)', lineHeight: 1.15, fontWeight: 500, marginBottom: '0.55rem', color: 'var(--text-white)' }}>
                ANTHA PRERNA 2025: <br />
                <span className="lime-text">Awakening Inner Drive &amp; Shaping Leaders</span>
              </h2>

              <span style={{ fontSize: '0.85rem', color: 'var(--lime)', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
                Kochi Business School, Cochin, Kerala, India
              </span>

              <p style={{ color: 'var(--text-card-secondary)', fontSize: '0.9rem', lineHeight: 1.68, marginBottom: '1.75rem' }}>
                Hannah served as an invited international Resource Person at this flagship workshop focused on Entrepreneurship Development, Leadership Training, and Outbound Learning. Collaborating with an international panel of thought leaders, she facilitated masterclasses designed to empower future founders with strategic resilience and executable business frameworks.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <a
                  ref={verifyBtnRef}
                  href="https://kbs.edu.in/event/antha-prerna-2025-igniting-inner-drive-shaping-future-leaders.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ borderRadius: '9999px' }}
                >
                  <span>Verify KBS Official Event</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  ref={dossierBtnRef}
                  onClick={onOpenModal}
                  className="btn-secondary"
                  style={{ borderRadius: '9999px' }}
                >
                  <FileText size={14} color="var(--text-primary)" />
                  <span>Keynote Dossier</span>
                </button>
              </div>
            </div>

            {/* Right Lottie Animation */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div ref={lottieRef} style={{ width: '100%', maxWidth: '340px', height: '280px' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
