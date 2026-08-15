import React, { useEffect, useState, useRef } from 'react';
import { Scale, TrendingUp, Languages, CheckCircle2, Volume2, Award } from 'lucide-react';
import { skillCategories, languagesData, softSkills } from '../data/portfolioData';
import { useTilt } from '../utils/animations';

const AnimatedProgressBar: React.FC<{ level: number; delay: number }> = ({ level, delay }) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (barRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const timer = setTimeout(() => {
                setWidth(level);
              }, delay);
              return () => clearTimeout(timer);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(barRef.current);
    }
    return () => observer && observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={barRef} style={{ width: '100%', height: '5px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '9999px', overflow: 'visible', position: 'relative' }}>
      <div
        style={{
          height: '100%',
          width: width + '%',
          backgroundImage: 'linear-gradient(to right, rgba(78, 164, 204, 0.50), var(--lime))',
          borderRadius: '9999px',
          transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          boxShadow: '0 0 8px rgba(78, 164, 204, 0.30)'
        }}
      >
        {width > 0 && (
          <div style={{
            position: 'absolute',
            right: '-4px',
            top: '-2.5px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '2px solid var(--lime)',
            boxShadow: '0 0 10px #ffffff, 0 0 18px var(--lime)',
            animation: 'pulse 1.2s infinite alternate',
            zIndex: 2
          }} />
        )}
      </div>
    </div>
  );
};

export const SkillsMatrix: React.FC = () => {
  // Apply 3D Tilt rotation to each of the 4 key skill cards in the 2x2 grid
  const legalCardRef = useTilt<HTMLDivElement>(true);
  const execCardRef = useTilt<HTMLDivElement>(true);
  const lingCardRef = useTilt<HTMLDivElement>(true);
  const compCardRef = useTilt<HTMLDivElement>(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="section-wrapper" id="skills" style={{ padding: 'clamp(3rem, 6vw, 6rem) 0' }}>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.85); box-shadow: 0 0 8px var(--lime), 0 0 15px var(--lime); }
          100% { transform: scale(1.15); box-shadow: 0 0 12px #ffffff, 0 0 22px var(--lime); }
        }
        @keyframes wave-flow {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1); }
        }
        .oratory-eq-bar {
          width: 2px;
          height: 100%;
          backgroundColor: var(--lime);
          border-radius: 1px;
          transform-origin: bottom;
        }
        .language-hover-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .language-hover-card:hover {
          transform: translateY(-2px);
          background-color: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(78, 164, 204, 0.35) !important;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .skills-tag-pill {
          transition: all 0.25s ease;
        }
        .skills-tag-pill:hover {
          background-color: rgba(200, 245, 66, 0.15) !important;
          border-color: var(--lime) !important;
          color: var(--lime) !important;
          transform: scale(1.05);
        }
      `}</style>

      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2.75rem' }}>
          <span className="bento-pill bento-pill-cyan">Capabilities</span>
          <h2 style={{ fontWeight: 500, marginTop: '0.65rem', color: 'var(--text-primary)' }}>
            Domain Mastery &amp; <span className="lime-text">Toolkits</span>
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px' }}>
            A high-precision synthesis of corporate legal methodology, performance marketing, and leadership rhetoric.
          </p>
        </div>

        {/* 2x2 Layout Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1.25rem',
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'stretch'
        }}>

          {/* Card 1: Legal Jurisprudence (Top Left) */}
          <div
            ref={legalCardRef}
            className="bento-card"
            style={{
              padding: '2.25rem 1.85rem',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), var(--card-shadow)',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <div className="icon-lime-bg" style={{ width: '38px', height: '38px', backgroundColor: 'rgba(78, 164, 204, 0.15)' }}>
                <Scale size={17} color="var(--lime)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-white)' }}>Legal Jurisprudence</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-card-muted)' }}>Corporate, IP &amp; Contracts</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {skillCategories[0].skills.map((skill, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-card-secondary)', marginBottom: '0.45rem' }}>
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--lime)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{skill.level}%</span>
                  </div>
                  <AnimatedProgressBar level={skill.level} delay={100 + i * 80} />
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Enterprise Execution (Top Right) */}
          <div
            ref={execCardRef}
            className="bento-card"
            style={{
              padding: '2.25rem 1.85rem',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), var(--card-shadow)',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <div className="icon-lime-bg" style={{ width: '38px', height: '38px', backgroundColor: 'rgba(78, 164, 204, 0.15)' }}>
                <TrendingUp size={17} color="var(--lime)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-white)' }}>Enterprise Execution</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-card-muted)' }}>E-Commerce, Growth &amp; AI</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              {skillCategories[1].skills.map((skill, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-card-secondary)', marginBottom: '0.45rem' }}>
                    <span>{skill.name}</span>
                    <span style={{ color: 'var(--lime)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{skill.level}%</span>
                  </div>
                  <AnimatedProgressBar level={skill.level} delay={150 + i * 80} />
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Linguistics & Oratory (Bottom Left) */}
          <div
            ref={lingCardRef}
            className="bento-card"
            style={{
              padding: '2.25rem 1.85rem',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), var(--card-shadow)',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Header with Oratory equalizer waves */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="icon-lime-bg" style={{ width: '38px', height: '38px', backgroundColor: 'rgba(78, 164, 204, 0.15)' }}>
                  <Languages size={17} color="var(--lime)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-white)' }}>Linguistics &amp; Oratory</h3>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-card-muted)' }}>Multilingual &amp; Rhetoric</span>
                </div>
              </div>

              {/* Animated Oratory Equalizer waves */}
              <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '14px', marginTop: '4px' }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="oratory-eq-bar"
                    style={{
                      animation: 'wave-flow ' + (0.5 + (i % 3) * 0.15) + 's ease-in-out infinite alternate',
                      animationDelay: (i * 0.1) + 's'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Languages List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {languagesData.map((lang, i) => (
                <div
                  key={i}
                  className="language-hover-card"
                  style={{
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'default'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.84rem', fontWeight: 650, color: 'var(--text-white)', display: 'block' }}>
                      {lang.name}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-card-muted)' }}>{lang.fluency}</span>
                  </div>
                  <span className="bento-pill bento-pill-cyan" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem' }}>
                    {lang.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Executive Competencies (Bottom Right) */}
          <div
            ref={compCardRef}
            className="bento-card"
            style={{
              padding: '2.25rem 1.85rem',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), var(--card-shadow)',
              transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div className="icon-lime-bg" style={{ width: '38px', height: '38px', backgroundColor: 'rgba(78, 164, 204, 0.15)' }}>
                <Award size={17} color="var(--lime)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-white)' }}>Executive Competencies</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-card-muted)' }}>Soft Leadership &amp; Strategy</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {softSkills.map((s, idx) => (
                <span
                  key={idx}
                  className="tag-chip skills-tag-pill"
                  style={{
                    fontSize: '0.68rem',
                    padding: '0.22rem 0.55rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    color: 'rgba(255, 255, 255, 0.72)',
                    cursor: 'default'
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
