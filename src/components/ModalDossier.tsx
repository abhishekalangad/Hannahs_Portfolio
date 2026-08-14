import React, { useEffect, useState } from 'react';
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
  const [iframeHtml, setIframeHtml] = useState<string>('');
  const [isLoadingIframe, setIsLoadingIframe] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!data.iframeUrl) {
      setIframeHtml('');
      setIsLoadingIframe(false);
      setIframeError(false);
      return;
    }

    const iframeUrl = data.iframeUrl;
    setIsLoadingIframe(true);
    setIframeError(false);
    setIframeHtml('');

    const proxies = [
      `https://corsproxy.io/?url=${encodeURIComponent(iframeUrl)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(iframeUrl)}`
    ];

    const tryFetch = (index: number) => {
      if (index >= proxies.length) {
        setIframeError(true);
        setIsLoadingIframe(false);
        return;
      }

      fetch(proxies[index])
        .then((res) => {
          if (!res.ok) throw new Error('Proxy failed');
          return res.text();
        })
        .then((html) => {
          if (!html || html.trim().length === 0) throw new Error('Empty HTML');
          
          const baseTag = `<base href="${iframeUrl}/" />`;
          const compatibilityScript = `
            <script>
              (function() {
                // 1. Mock URL constructor to handle about:srcdoc Next.js routing failures
                const OriginalURL = window.URL;
                window.URL = function(url, base) {
                  if (base === 'about:srcdoc' || base === 'about:blank' || !base) {
                    base = '${iframeUrl}/';
                  }
                  if (url === 'about:srcdoc' || url === 'about:blank') {
                    url = '${iframeUrl}/';
                  }
                  try {
                    return new OriginalURL(url, base);
                  } catch (e) {
                    return new OriginalURL(url, '${iframeUrl}/');
                  }
                };
                Object.setPrototypeOf(window.URL, OriginalURL);
                window.URL.prototype = OriginalURL.prototype;

                // 2. Mock History pushState/replaceState to bypass cross-origin SecurityError
                const safeHistoryMethod = (method) => {
                  const orig = window.history[method];
                  window.history[method] = function(state, unused, url) {
                    try {
                      return orig.call(window.history, state, unused, '/');
                    } catch (e) {
                      console.warn('History.' + method + ' blocked and bypassed:', e.message);
                    }
                  };
                };
                safeHistoryMethod('pushState');
                safeHistoryMethod('replaceState');

                // 3. Mock Fetch to redirect API data fetches via proxy
                const originalFetch = window.fetch;
                window.fetch = async function(input, init) {
                  let url = typeof input === 'string' ? input : input.url;
                  
                  if (url.startsWith('/')) {
                    url = '${iframeUrl}' + url;
                  }
                  
                  if (url.includes('${iframeUrl.replace('https://', '')}')) {
                    const proxiedUrl = 'https://corsproxy.io/?url=' + encodeURIComponent(url);
                    return originalFetch(proxiedUrl, init);
                  }
                  
                  return originalFetch(input, init);
                };
              })();
            </script>
          `;

          let modifiedHtml = html;
          if (html.includes('<head>')) {
            modifiedHtml = html.replace('<head>', `<head>${baseTag}${compatibilityScript}`);
          } else {
            modifiedHtml = `${baseTag}${compatibilityScript}${html}`;
          }
          setIframeHtml(modifiedHtml);
          setIsLoadingIframe(false);
        })
        .catch((err) => {
          console.warn(`Proxy ${index} failed, trying next...`, err);
          tryFetch(index + 1);
        });
    };

    tryFetch(0);
  }, [data.iframeUrl]);

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
          backgroundColor: 'rgba(4, 10, 6, 0.85)',
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
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: 'clamp(2rem, 4vw, 2.75rem)',
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.5)',
          zIndex: 10
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.55rem' }}>
              <span className="bento-pill bento-pill-cyan">{data.subtitle}</span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-card-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={13} />
                <span>{data.period}</span>
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.65rem, 3vw, 2.15rem)', color: 'var(--text-white)', fontWeight: 700 }}>
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
              border: '1px solid var(--card-border)',
              color: 'var(--text-white)',
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
            <p key={i} style={{ color: 'var(--text-card-primary)', fontSize: '0.92rem', lineHeight: 1.65 }}>
              {p}
            </p>
          ))}
        </div>

        {/* Highlights List */}
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-card-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', display: 'block' }}>
            Key Milestones &amp; Credentials
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {data.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                  padding: '0.7rem 0.9rem', borderRadius: '10px',
                  backgroundColor: 'rgba(200, 245, 66, 0.04)',
                  border: '0.8px solid rgba(200, 245, 66, 0.12)'
                }}
              >
                <CheckCircle2 size={14} color="var(--lime)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.86rem', color: 'var(--text-card-primary)', lineHeight: 1.5 }}>
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Site IFrame Preview */}
        {data.iframeUrl && (
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-card-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', display: 'block' }}>
              Live Website Preview
            </span>
            <div style={{
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#111827',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
            }}>
              {/* Browser-like Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f56', display: 'inline-block' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27c93f', display: 'inline-block' }} />
                </div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-card-secondary)', fontFamily: 'monospace' }}>
                  {data.iframeUrl.replace('https://', '')}
                </span>
                <span style={{ width: '32px' }} /> {/* spacer */}
              </div>
              
              {isLoadingIframe && (
                <div style={{
                  height: '420px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: '#111827', color: 'var(--text-card-secondary)', fontSize: '0.82rem',
                  gap: '0.5rem'
                }}>
                  <div className="animate-pulse" style={{ color: 'var(--lime)', fontWeight: 600 }}>Connecting to live site...</div>
                </div>
              )}

              {iframeError && (
                <div style={{
                  height: '420px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '2rem', textAlign: 'center',
                  backgroundColor: '#111827', color: 'var(--text-card-secondary)', fontSize: '0.82rem',
                  gap: '0.5rem'
                }}>
                  <span>Could not load live preview directly.</span>
                  <a
                    href={data.iframeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--lime)',
                      textDecoration: 'none',
                      fontWeight: 700,
                      borderBottom: '1px solid var(--lime)'
                    }}
                  >
                    Open website in a new window
                  </a>
                </div>
              )}

              {!isLoadingIframe && !iframeError && iframeHtml && (
                <iframe
                  srcDoc={iframeHtml}
                  title={data.title}
                  style={{
                    width: '100%',
                    height: '420px',
                    border: 'none',
                    backgroundColor: '#ffffff'
                  }}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              )}
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {data.link && data.link !== '/Hannah_Elangovan_Resume.pdf' && (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ borderRadius: '9999px', fontSize: '0.8rem' }}
              >
                <span>{data.linkText || 'Verify Credentials'}</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>

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
