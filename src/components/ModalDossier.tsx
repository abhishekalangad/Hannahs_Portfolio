import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Calendar, Mail } from 'lucide-react';
import { modalDetailsData } from '../data/portfolioData';

interface ModalDossierProps {
  modalId: string | null;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const ModalDossier: React.FC<ModalDossierProps> = ({ modalId, onClose, onToast }) => {
  if (!modalId) return null;

  const data = modalDetailsData[modalId] || modalDetailsData['resume'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(12, 13, 18, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          cursor: 'pointer'
        }}
      />

      {/* Modal Dialog Window */}
      <div
        className="bento-card"
        style={{
          position: 'relative',
          width: '100%', maxWidth: '740px', maxHeight: '88vh', overflowY: 'auto',
          backgroundColor: '#0d3617',
          border: '0.8px solid rgba(255,255,255,0.14)',
          borderRadius: '20px',
          padding: 'clamp(2rem, 4vw, 2.75rem)',
          boxShadow: '0 30px 70px -15px rgba(0,0,0,0.9)',
          zIndex: 10
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.55rem' }}>
              <span className="bento-pill bento-pill-cyan">{data.subtitle}</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={13} />
                <span>{data.period}</span>
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.65rem, 3vw, 2.15rem)', color: '#ffffff', fontWeight: 700 }}>
              {data.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-card)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Narrative Paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
          {data.narrative.map((p, i) => (
            <p key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65 }}>
              {p}
            </p>
          ))}
        </div>

        {/* Highlights List */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', display: 'block' }}>
            Key Milestones &amp; Credentials
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {data.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                  padding: '0.7rem 0.9rem', borderRadius: '10px',
                  backgroundColor: 'rgba(200,245,66,0.04)',
                  border: '0.8px solid rgba(200,245,66,0.12)'
                }}
              >
                <CheckCircle2 size={14} color="var(--lime)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-card)'
          }}
        >
          {data.link ? (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ borderRadius: '9999px', fontSize: '0.8rem' }}
            >
              <span>{data.linkText || 'Verify Credentials'}</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <a
              href="mailto:hannahpanthea@gmail.com"
              className="btn-primary"
              style={{ borderRadius: '9999px', fontSize: '0.8rem' }}
            >
              <Mail size={13} />
              <span>Contact Directly</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ borderRadius: '9999px', fontSize: '0.8rem' }}
          >
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
