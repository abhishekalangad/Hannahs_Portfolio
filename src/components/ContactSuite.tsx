import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Send, CheckCircle, Copy, ArrowUpRight } from 'lucide-react';
import { useTilt, useMagnetic } from '../utils/animations';
import confetti from 'canvas-confetti';

interface ContactSuiteProps {
  onToast: (msg: string) => void;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maewbeqg';

export const ContactSuite: React.FC<ContactSuiteProps> = ({ onToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Wrap cards in 3D tilt interaction
  const channelsCardRef = useTilt<HTMLDivElement>();
  const formCardRef = useTilt<HTMLDivElement>();

  // Wrap submit button in Magnetic pull
  const submitBtnRef = useMagnetic<HTMLButtonElement>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (response.ok) {
        confetti({
          particleCount: 55,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#1b4332', '#2d6a4f', '#74c69d', '#e5eae1', '#ffffff']
        });
        setSubmitStatus('success');
        onToast('Message sent successfully!');
        setName(''); setEmail(''); setSubject(''); setMessage('');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        onToast('Something went wrong. Please try again.');
        setTimeout(() => setSubmitStatus('idle'), 4000);
      }
    } catch {
      setSubmitStatus('error');
      onToast('Network error. Please try again.');
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hannahpanthea@gmail.com');
    setIsCopied(true);
    onToast('Email copied to clipboard!');
    setTimeout(() => setIsCopied(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    padding: '0.65rem 0.85rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.86rem',
    color: 'var(--text-card-primary)',
    outline: 'none',
    transition: 'border-color 0.22s ease',
  };

  const contactRows = [
    {
      icon: <Mail size={15} />,
      label: 'Email Address',
      value: 'hannahpanthea@gmail.com',
      href: 'mailto:hannahpanthea@gmail.com',
      action: handleCopyEmail,
      actionIcon: isCopied ? <CheckCircle size={14} /> : <Copy size={14} />,
      actionColor: isCopied ? 'var(--lime)' : 'var(--text-card-muted)'
    },
    {
      icon: <Phone size={15} />,
      label: 'Direct Mobile',
      value: '+94 778973708',
      href: 'tel:+94778973708'
    },
    {
      icon: <Linkedin size={15} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/hannah-elangovan',
      href: 'https://linkedin.com/in/hannah-elangovan-186a54355'
    }
  ];

  return (
    <section className="section-wrapper" id="contact">
      <div className="container">
        {/* Header */}
        <div className="section-header reveal">
          <span className="bento-pill bento-pill-cyan">Get in Touch</span>
          <h2 style={{ fontWeight: 500, marginTop: '0.65rem', color: 'var(--text-primary)' }}>
            Let's Build <span className="lime-text">Something Together</span>
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Open for corporate governance advisory, legal tech initiatives, keynote speaking engagements, and e-commerce collaborations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.25rem' }}>

          {/* Contact Channels Card */}
          <div
            ref={channelsCardRef}
            className="bento-card reveal reveal-delay-1"
            style={{
              padding: '2.25rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease'
            }}
          >
            <div>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-card-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: '1.1rem' }}>
                Direct Channels
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {contactRows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                    }}
                  >
                    <a
                      href={row.href}
                      target={row.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', flex: 1 }}
                    >
                      <div className="icon-lime-bg" style={{ width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0 }}>
                        {row.icon}
                      </div>
                      <div>
                        <span style={{ fontSize: '0.64rem', color: 'var(--text-card-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                          {row.label}
                        </span>
                        <span style={{ color: 'var(--text-card-primary)', fontWeight: 600, fontSize: '0.82rem' }}>
                          {row.value}
                        </span>
                      </div>
                    </a>
                    {row.action ? (
                      <button
                        onClick={row.action}
                        style={{ background: 'transparent', border: 'none', color: row.actionColor, cursor: 'pointer', padding: '0.3rem' }}
                      >
                        {row.actionIcon}
                      </button>
                    ) : (
                      <ArrowUpRight size={14} color="rgba(255, 255, 255, 0.25)" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: '1.1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '1.5rem' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--lime)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>
                Location
              </span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-card-secondary)', lineHeight: 1.55 }}>
                Colombo, Sri Lanka. Open to remote consultations worldwide.
              </p>
            </div>
          </div>

          {/* Formspree-powered Inquiry Form */}
          <div
            ref={formCardRef}
            className="bento-card reveal reveal-delay-2"
            style={{
              padding: '2.25rem 2rem',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease'
            }}
          >
            <h3 style={{ fontWeight: 600, letterSpacing: '-0.03em', marginBottom: '0.35rem', color: 'var(--text-card-primary)' }}>Send a Message</h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-card-secondary)', marginBottom: '1.65rem' }}>
              Specify your collaboration intent, advisory request, or speaking invitation.
            </p>

            {submitStatus === 'success' ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                borderRadius: '12px',
                backgroundColor: 'rgba(200, 245, 66, 0.05)',
                border: '1px solid rgba(200, 245, 66, 0.2)'
              }}>
                <CheckCircle size={36} color="var(--lime)" style={{ margin: '0 auto 0.85rem' }} />
                <p style={{ color: 'var(--lime)', fontWeight: 600, fontSize: '0.92rem' }}>
                  Message sent successfully!
                </p>
                <p style={{ color: 'var(--text-card-secondary)', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                  Hannah will be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '0.9rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-card-muted)', marginBottom: '0.32rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Full Name *
                    </label>
                    <input
                      type="text" name="name" required
                      value={name} onChange={e => setName(e.target.value)}
                      placeholder="Your name" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--lime)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-card-muted)', marginBottom: '0.32rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Email *
                    </label>
                    <input
                      type="email" name="email" required
                      value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--lime)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-card-muted)', marginBottom: '0.32rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Subject
                  </label>
                  <input
                    type="text" name="subject"
                    value={subject} onChange={e => setSubject(e.target.value)}
                    placeholder="Advisory / Speaking / Collaboration..." style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--lime)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-card-muted)', marginBottom: '0.32rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Message *
                  </label>
                  <textarea
                    name="message" required rows={4}
                    value={message} onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, initiative, or collaboration idea..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--lime)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
                  />
                </div>

                {submitStatus === 'error' && (
                  <p style={{ fontSize: '0.8rem', color: '#f87171', textAlign: 'center' }}>
                    Something went wrong. Please try again or email directly.
                  </p>
                )}

                <button
                  ref={submitBtnRef}
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                  style={{ width: '100%', marginTop: '0.2rem', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
