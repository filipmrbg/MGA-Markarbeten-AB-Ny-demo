import { useParams, Link } from 'react-router-dom';
import { useState, useMemo, useEffect, CSSProperties } from 'react';
import { Check, ArrowLeft, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import services from '../data/services';
import ScrollReveal from '../components/ScrollReveal';
import FAQAccordion from '../components/FAQAccordion';
import CTABanner from '../components/CTABanner';
import { usePageTitle } from '../hooks/usePageTitle';

const container: CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

function QuoteForm({ serviceTitle }: { serviceTitle: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    background: '#fafafa',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-family)',
    color: 'var(--color-text-dark)',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '16px',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  function focusInput(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = 'var(--color-primary)';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(234, 88, 12, 0.15)';
  }
  function blurInput(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = '#e5e7eb';
    e.currentTarget.style.boxShadow = 'none';
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{
      background: 'var(--color-white)',
      borderRadius: 'var(--border-radius-lg)',
      border: '2px solid var(--color-primary)',
      padding: '36px 28px',
      boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--color-primary)',
          background: 'rgba(234, 88, 12, 0.08)',
          padding: '4px 12px',
          borderRadius: '20px',
          display: 'inline-block',
          marginBottom: '10px',
        }}>
          Kostnadsfri rådgivning
        </span>
        <h3 style={{
          textAlign: 'center',
          fontWeight: 800,
          fontSize: '1.35rem',
          color: 'var(--color-text-dark)',
          margin: 0,
          fontFamily: 'var(--font-family)',
        }}>
          Begär offert – {serviceTitle.split('&')[0].trim()}
        </h3>
      </div>

      {submitted ? (
        <div style={{
          textAlign: 'center',
          padding: '30px 10px',
          background: '#f0fdf4',
          borderRadius: '12px',
          border: '1px solid #bbf7d0',
        }}>
          <CheckCircle size={44} color="#16a34a" style={{ margin: '0 auto 12px' }} />
          <h4 style={{ color: '#14532d', fontSize: '1.1rem', margin: '0 0 8px', fontWeight: 700 }}>
            Tack för din förfrågan!
          </h4>
          <p style={{ color: '#166534', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
            Vi återkommer till dig med kalkyl &amp; svar inom 24 timmar.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Fullständigt namn *"
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
            onFocus={focusInput}
            onBlur={blurInput}
            required
          />
          <input
            type="email"
            placeholder="Din e-postadress *"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={focusInput}
            onBlur={blurInput}
            required
          />
          <input
            type="tel"
            placeholder="Ditt telefonnummer *"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{ ...inputStyle, marginBottom: '20px' }}
            onFocus={focusInput}
            onBlur={blurInput}
            required
          />

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              background: 'var(--color-primary)',
              color: '#ffffff',
              fontWeight: 700,
              fontFamily: 'var(--font-family)',
              fontSize: '0.98rem',
              border: 'none',
              borderRadius: 'var(--border-radius-pill)',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(234, 88, 12, 0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(234, 88, 12, 0.4)';
              (e.currentTarget as HTMLElement).style.background = 'var(--color-primary-hover)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(234, 88, 12, 0.3)';
              (e.currentTarget as HTMLElement).style.background = 'var(--color-primary)';
            }}
          >
            Skicka offertförfrågan
          </button>

          {/* Trust points inside form */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #f1f5f9',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#64748b' }}>
              <Clock size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span>Snabb återkoppling – inom 24h</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#64748b' }}>
              <ShieldCheck size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span>Kostnadsfritt hembesök utan förpliktelser</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();

  const normalizedSlug = useMemo(() => {
    if (!slug) return '';
    const clean = slug.toLowerCase().trim().replace(/-/g, '').replace(/_/g, '');
    if (clean.includes('mark') || clean.includes('schakt')) return 'markarbete';
    if (clean.includes('dran') || clean.includes('drän') || clean.includes('fukt')) return 'dranering';
    if (clean.includes('betong') || clean.includes('grund')) return 'betong';
    return clean;
  }, [slug]);

  const service = services.find(s => s.slug === normalizedSlug) || services.find(s => s.slug === slug) || services[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [slug, normalizedSlug]);

  usePageTitle(
    `${service.title} | MGA Markarbeten AB`,
    service.heroText
  );

  const otherServices = services.filter(s => s.slug !== service.slug);

  return (
    <main style={{ fontFamily: 'var(--font-family)' }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="service-hero-section" style={{
        background: 'var(--color-dark)',
        paddingTop: '140px',
        paddingBottom: '70px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }} />

        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>

            {/* Back link */}
            <ScrollReveal animation="fade-down" delay={0}>
              <Link to="/tjanster" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: 600,
                marginBottom: '24px',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 10,
              }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              >
                <ArrowLeft size={16} /> Alla tjänster
              </Link>
            </ScrollReveal>

            {/* Badges */}
            <ScrollReveal animation="blur-in" delay={100}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {service.tag && (
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'rgba(255,255,255,0.9)',
                    background: 'rgba(255,255,255,0.08)',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}>
                    {service.tag}
                  </span>
                )}
                {service.badge && (
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    background: 'var(--color-primary)',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    boxShadow: '0 2px 10px rgba(234, 88, 12, 0.4)',
                  }}>
                    {service.badge}
                  </span>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal animation="blur-in" delay={150} duration={0.8}>
              <h1 style={{
                color: 'var(--color-white)',
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                lineHeight: 1.15,
                margin: '0 0 20px 0',
              }}>
                {service.title}
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250} duration={0.8}>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.1rem',
                lineHeight: 1.75,
                maxWidth: '720px',
                margin: '0 auto 36px',
              }}>
                {service.heroText}
              </p>
            </ScrollReveal>

            {/* Highlights pills */}
            {service.highlights && (
              <ScrollReveal animation="fade-up" delay={320}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px 24px',
                  flexWrap: 'wrap',
                  marginBottom: '40px',
                }}>
                  {service.highlights.map((h, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.9)',
                      background: 'rgba(30, 41, 59, 0.6)',
                      padding: '8px 16px',
                      borderRadius: '30px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      <Check size={16} style={{ color: 'var(--color-primary)' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Hero image card */}
            <ScrollReveal animation="reveal-mask" delay={400} duration={1.0}>
              <div style={{
                borderRadius: 'var(--border-radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <img
                  src={service.heroImage}
                  alt={service.title}
                  style={{
                    width: '100%',
                    maxHeight: '440px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      <section style={{ background: 'var(--color-light)', padding: '90px 0' }}>
        <div style={container}>
          <div className="service-layout" style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '50px',
            alignItems: 'start',
          }}>

            {/* Sticky Sidebar */}
            <div className="service-sidebar" style={{ position: 'sticky', top: '120px' }}>
              <ScrollReveal animation="fade-right">
                <QuoteForm serviceTitle={service.title} />
              </ScrollReveal>
            </div>

            {/* Article Content */}
            <div className="service-content-col">
              {service.sections.map((section, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                  <div style={{
                    background: '#ffffff',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: ' clamp(24px, 4vw, 40px)',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    marginBottom: '36px',
                  }}>
                    <h2 style={{
                      fontWeight: 800,
                      fontSize: '1.75rem',
                      color: 'var(--color-text-dark)',
                      marginTop: 0,
                      marginBottom: '18px',
                      lineHeight: 1.25,
                    }}>
                      {section.heading}
                    </h2>

                    {section.text && (
                      <p style={{
                        color: 'var(--color-gray-600)',
                        lineHeight: 1.8,
                        fontSize: '1.02rem',
                        margin: '0 0 24px 0',
                      }}>
                        {section.text}
                      </p>
                    )}

                    {section.bullets && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '16px 24px',
                        margin: '24px 0 28px 0',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #edf2f7',
                      }}>
                        {section.bullets.map((bullet, j) => {
                          const dashIdx = bullet.indexOf(' – ');
                          const hasDash = dashIdx !== -1;
                          return (
                            <div key={j} style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              lineHeight: 1.6,
                              fontSize: '0.96rem',
                            }}>
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: 'rgba(234, 88, 12, 0.12)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '2px',
                                flexShrink: 0,
                              }}>
                                <Check
                                  size={14}
                                  style={{ color: 'var(--color-primary)' }}
                                />
                              </div>
                              <div style={{ color: '#334155' }}>
                                {hasDash ? (
                                  <>
                                    <strong style={{ color: 'var(--color-text-dark)', fontWeight: 700 }}>
                                      {bullet.slice(0, dashIdx)}
                                    </strong>
                                    {' – '}
                                    {bullet.slice(dashIdx + 3)}
                                  </>
                                ) : bullet}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {section.image && (
                      <div style={{
                        margin: '32px 0',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
                      }}>
                        <img
                          src={section.image}
                          alt={section.heading}
                          loading="lazy"
                          style={{
                            width: '100%',
                            maxHeight: '380px',
                            display: 'block',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    )}

                    {section.subsections && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '20px',
                        marginTop: '28px',
                      }}>
                        {section.subsections.map((sub, k) => (
                          <div key={k} style={{
                            background: '#f8fafc',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid #e2e8f0',
                            position: 'relative',
                          }}>
                            <h3 style={{
                              fontWeight: 700,
                              fontSize: '1.08rem',
                              color: 'var(--color-text-dark)',
                              margin: '0 0 8px 0',
                            }}>
                              {sub.subheading}
                            </h3>
                            <p style={{
                              color: 'var(--color-gray-600)',
                              lineHeight: 1.7,
                              margin: 0,
                              fontSize: '0.93rem',
                            }}>
                              {sub.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER SERVICES NAVIGATION ────────────────────────── */}
      <section style={{ background: '#090d16', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2 style={{
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.8rem',
              margin: '0 0 10px 0',
            }}>
              Se våra övriga tjänster
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.98rem', margin: 0 }}>
              Vi erbjuder kompletta entreprenadlösningar för hela ditt projekt.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {otherServices.map((other, idx) => (
              <Link
                key={idx}
                to={`/tjanster/${other.slug}`}
                style={{
                  textDecoration: 'none',
                  background: 'rgba(30, 41, 59, 0.5)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img
                  src={other.heroImage}
                  alt={other.title}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#ffffff', fontSize: '1.08rem', fontWeight: 700, margin: '0 0 4px 0' }}>
                    {other.title}
                  </h3>
                  <span style={{
                    color: 'var(--color-primary)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    Läs mer <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-dark)', padding: '100px 0' }}>
        <div style={container}>
          <FAQAccordion
            dark={true}
            items={service.faq}
            title="Vanliga frågor"
            subtitle={`Svar på de vanligaste frågorna vi får om ${service.title.toLowerCase()}. Hör av dig om du inte hittar svaret du söker!`}
            buttonText="Kontakta oss"
            buttonLink="/kontakt"
          />
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <CTABanner />

      <style>{`
        @media (max-width: 900px) {
          .service-hero-section {
            padding-top: 100px !important;
            padding-bottom: 40px !important;
          }
          .service-layout {
            display: flex !important;
            flex-direction: column !important;
            gap: 32px !important;
          }
          .service-content-col {
            order: 1 !important;
            width: 100% !important;
          }
          .service-sidebar {
            order: 2 !important;
            position: static !important;
            top: auto !important;
            width: 100% !important;
          }
        }
      `}</style>
    </main>
  );
}
