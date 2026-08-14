import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { ExternalLink, Mic, FileText } from 'lucide-react';

interface KeynoteSpotlightProps {
  onOpenModal: () => void;
}

export const KeynoteSpotlight: React.FC<KeynoteSpotlightProps> = ({ onOpenModal }) => {
  const lottieRef = useRef<HTMLDivElement>(null);

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
          className="bento-card"
          style={{
            background: 'radial-gradient(ellipse at 85% 20%, rgba(100, 220, 60, 0.12) 0%, rgba(10, 42, 18, 0.6) 65%)',
            padding: 'clamp(2.25rem, 4.5vw, 3.5rem)',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left Content */}
            <div>
              <span className="bento-pill bento-pill-cyan mb-3">
                <Mic size={13} />
                <span>Global Keynote Speaker</span>
              </span>

              <h2 style={{ fontSize: 'clamp(1.65rem, 3vw, 2.4rem)', lineHeight: 1.15, fontWeight: 400, marginBottom: '0.55rem' }}>
                ANTHA PRERNA 2025: <br />
                <span className="lime-text">Awakening Inner Drive &amp; Shaping Leaders</span>
              </h2>

              <span style={{ fontSize: '0.85rem', color: 'rgba(200,245,66,0.8)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>
                Kochi Business School, Cochin, Kerala, India
              </span>

              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.68, marginBottom: '1.75rem' }}>
                Hannah served as an invited international Resource Person at this flagship workshop focused on Entrepreneurship Development, Leadership Training, and Outbound Learning. Collaborating with an international panel of thought leaders, she facilitated masterclasses designed to empower future founders with strategic resilience and executable business frameworks.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <a
                  href="https://kbs.edu.in/event/antha-prerna-2025-igniting-inner-drive-shaping-future-leaders.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ borderRadius: '9999px' }}
                >
                  <span>Verify KBS Official Event</span>
                  <ExternalLink size={14} />
                </a>

                <button onClick={onOpenModal} className="btn-secondary" style={{ borderRadius: '9999px' }}>
                  <FileText size={14} />
                  <span>Keynote Dossier</span>
                </button>
              </div>
            </div>

            {/* Right Lottie Animation */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div
                ref={lottieRef}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  height: '240px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
