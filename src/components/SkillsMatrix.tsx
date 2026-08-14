import React from 'react';
import { Scale, TrendingUp, Languages } from 'lucide-react';
import { skillCategories, languagesData, softSkills } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  return (
    <section className="section-wrapper" id="skills">
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '600px', marginBottom: '3rem' }}>
          <span className="bento-pill bento-pill-cyan" style={{ marginBottom: '0.85rem', display: 'inline-flex' }}>Capabilities</span>
          <h2 style={{ fontWeight: 400 }}>
            Domain Mastery &amp; <span className="lime-text">Toolkits</span>
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            A high-precision synthesis of corporate legal methodology, performance marketing, and leadership rhetoric.
          </p>
        </div>

        {/* Skills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>

          {/* Legal Jurisprudence */}
          <div className="bento-card" style={{ padding: '2rem 1.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="icon-lime-bg" style={{ width: '38px', height: '38px' }}>
                <Scale size={17} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Legal Jurisprudence</h3>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)' }}>Corporate, IP &amp; Contracts</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {skillCategories[0].skills.map((skill, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.72)', marginBottom: '0.35rem' }}>
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--lime)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)' }}>{skill.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, background: 'var(--lime)', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Execution */}
          <div className="bento-card" style={{ padding: '2rem 1.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="icon-lime-bg" style={{ width: '38px', height: '38px' }}>
                <TrendingUp size={17} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Enterprise Execution</h3>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)' }}>E-Commerce, Growth &amp; AI</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {skillCategories[1].skills.map((skill, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.72)', marginBottom: '0.35rem' }}>
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--lime)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)' }}>{skill.level}%</span>
                  </div>
                  <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${skill.level}%`, background: 'var(--lime)', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linguistics & Oratory */}
          <div className="bento-card" style={{ padding: '2rem 1.85rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div className="icon-lime-bg" style={{ width: '38px', height: '38px' }}>
                  <Languages size={17} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>Linguistics &amp; Oratory</h3>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)' }}>Multilingual &amp; Rhetoric</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.1rem' }}>
                {languagesData.map((lang, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '0.8px solid rgba(255,255,255,0.09)',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.84rem', fontWeight: 500, letterSpacing: '-0.01em', color: '#ffffff', display: 'block' }}>
                        {lang.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.38)' }}>{lang.fluency}</span>
                    </div>
                    <span className="bento-pill bento-pill-cyan" style={{ fontSize: '0.62rem', padding: '0.18rem 0.5rem' }}>
                      {lang.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: '0.85rem', borderTop: '0.8px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.55rem', display: 'block' }}>
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
