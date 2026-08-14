import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Send, CheckCircle, Copy, ArrowUpRight } from 'lucide-react';
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
          colors: ['#c8f542', '#a3e635', '#86efac', '#ffffff', '#4ade80']
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
    background: 'rgba(255,255,255,0.03)',
    border: '0.8px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    padding: '0.65rem 0.85rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.86rem',
    color: '#ffffff',
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
      actionColor: isCopied ? 'var(--lime)' : 'rgba(255,255,255,0.3)'
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
        <div style={{ maxWidth: '600px', marginBottom: '3rem' }}>
          <span className="bento-pill bento-pill-cyan" style={{ marginBottom: '0.85rem', display: 'inline-flex' }}>Get in Touch</span>
          <h2 style={{ fontWeight: 400 }}>
            Let's Build <span className="lime-text">Something Together</span>
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            Open for corporate governance advisory, legal tech initiatives, keynote speaking engagements, and e-commerce collaborations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>

          {/* Contact Channels Card */}
          <div className="bento-card" style={{ padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: '1.1rem' }}>
                Direct Channels
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {contactRows.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '0.8px solid rgba(255,255,255,0.09)',
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
                        <span style={{ fontSize: '0.64rem', color: 'rgba(255,255,255,0.35)', display: 'block', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>
                          {row.label}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500, fontSize: '0.82rem' }}>
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
                      <ArrowUpRight size={14} color="rgba(255,255,255,0.25)" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: '1.1rem', borderTop: '0.8px solid rgba(255,255,255,0.08)', marginTop: '1.5rem' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--lime)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>
                Location
              </span>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.55 }}>
                Colombo, Sri Lanka. Open to remote consultations worldwide.
              </p>
            </div>
          </div>

          {/* Formspree-powered Inquiry Form */}
          <div className="bento-card" style={{ padding: '2.25rem 2rem' }}>
            <h3 style={{ fontWeight: 400, letterSpacing: '-0.03em', marginBottom: '0.35rem' }}>Send a Message</h3>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.42)', marginBottom: '1.65rem' }}>
              Specify your collaboration intent, advisory request, or speaking invitation.
            </p>

            {submitStatus === 'success' ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                borderRadius: '12px',
                backgroundColor: 'rgba(200,245,66,0.06)',
                border: '0.8px solid rgba(200,245,66,0.25)'
              }}>
                <CheckCircle size={36} color="var(--lime)" style={{ margin: '0 auto 0.85rem' }} />
                <p style={{ color: 'var(--lime)', fontWeight: 500, fontSize: '0.92rem' }}>
                  Message sent successfully!
                </p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                  Hannah will be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.9rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: '0.32rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Full Name *
                    </label>
                    <input
                      type="text" name="name" required
                      value={name} onChange={e => setName(e.target.value)}
                      placeholder="Your name" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'rgba(200,245,66,0.45)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: '0.32rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Email *
                    </label>
                    <input
                      type="email" name="email" required
                      value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'rgba(200,245,66,0.45)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: '0.32rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Subject
                  </label>
                  <input
                    type="text" name="subject"
                    value={subject} onChange={e => setSubject(e.target.value)}
                    placeholder="Advisory / Speaking / Collaboration..." style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(200,245,66,0.45)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)', marginBottom: '0.32rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Message *
                  </label>
                  <textarea
                    name="message" required rows={4}
                    value={message} onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, initiative, or collaboration idea..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(200,245,66,0.45)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                  />
                </div>

                {submitStatus === 'error' && (
                  <p style={{ fontSize: '0.8rem', color: '#f87171', textAlign: 'center' }}>
                    Something went wrong. Please try again or email directly.
                  </p>
                )}

                <button
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
