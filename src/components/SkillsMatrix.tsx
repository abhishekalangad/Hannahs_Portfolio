import React from 'react';
import { Scale, TrendingUp, Languages } from 'lucide-react';
import { skillCategories, languagesData, softSkills } from '../data/portfolioData';
import { useTilt } from '../utils/animations';

export const SkillsMatrix: React.FC = () => {
  // Apply 3D Tilt rotation to each of the 3 key skill cards
  const legalCardRef = useTilt<HTMLDivElement>();
  const execCardRef = useTilt<HTMLDivElement>();
  const lingCardRef = useTilt<HTMLDivElement>();

  return (
    <section className="section-wrapper" id="skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="bento-pill bento-pill-cyan">Capabilities</span>
          <h2 style={{ fontWeight: 500, marginTop: '0.65rem', color: 'var(--text-primary)' }}>
            Domain Mastery &amp; <span className="lime-text">Toolkits</span>
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            A high-precision synthesis of corporate legal methodology, performance marketing, and leadership rhetoric.
          </p>
        </div>

        {/* Skills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.25rem' }}>

          {/* Legal Jurisprudence */}
          <div
            ref={legalCardRef}
            className="bento-card reveal reveal-delay-1"
            style={{
              padding: '2rem 1.85rem',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="icon-lime-bg" style={{ width: '38px', height: '38px' }}>
                <Scale size={17} color="var(--lime)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-white)' }}>Legal Jurisprudence</h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-card-muted)' }}>Corporate, IP &amp; Contracts</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {skillCategories[0].skills.map((skill, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-card-secondary)', marginBottom: '0.35rem' }}>
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--lime)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{skill.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${skill.level}%`,
                        backgroundColor: 'var(--lime)',
                        borderRadius: '2px',
                        transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Execution */}
          <div
            ref={execCardRef}
            className="bento-card reveal reveal-delay-2"
            style={{
              padding: '2rem 1.85rem',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="icon-lime-bg" style={{ width: '38px', height: '38px' }}>
                <TrendingUp size={17} color="var(--lime)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-white)' }}>Enterprise Execution</h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-card-muted)' }}>E-Commerce, Growth &amp; AI</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {skillCategories[1].skills.map((skill, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-card-secondary)', marginBottom: '0.35rem' }}>
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--lime)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{skill.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${skill.level}%`,
                        backgroundColor: 'var(--lime)',
                        borderRadius: '2px',
                        transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linguistics & Oratory */}
          <div
            ref={lingCardRef}
            className="bento-card reveal reveal-delay-3"
            style={{
              padding: '2rem 1.85rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, filter 0.8s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div className="icon-lime-bg" style={{ width: '38px', height: '38px' }}>
                  <Languages size={17} color="var(--lime)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-white)' }}>Linguistics &amp; Oratory</h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-card-muted)' }}>Multilingual &amp; Rhetoric</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.1rem' }}>
                {languagesData.map((lang, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.84rem', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-card-primary)', display: 'block' }}>
                        {lang.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-card-muted)' }}>{lang.fluency}</span>
                    </div>
                    <span className="bento-pill bento-pill-cyan" style={{ fontSize: '0.62rem', padding: '0.18rem 0.5rem' }}>
                      {lang.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: '0.85rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-card-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.55rem', display: 'block' }}>
                Executive Competencies
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {softSkills.map((s, idx) => (
                  <span key={idx} className="tag-chip">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
