import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import CTABanner from '../components/CTABanner';
import { usePageTitle } from '../hooks/usePageTitle';
import services, { ServiceItem } from '../data/services';

const container: React.CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

export default function ServicesOverview() {
  usePageTitle(
    'Våra Tjänster | MGA Markarbeten AB Habo och Jönköping',
    'Utforska våra 4 kärntjänster: Anläggning, Bygg, Dränering & V/A samt Skog i Habo och Jönköping.'
  );

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [hash]);

  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      window.history.pushState(null, '', `#${slug}`);
    }
  };

  return (
    <main style={{ fontFamily: 'var(--font-family)', background: '#ffffff' }}>

      {/* ── HERO HEADER ──────────── */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url(https://i.imgur.com/u5CQA2Z.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '140px',
        paddingBottom: '60px',
        textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)' }} />
        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <div>
            <ScrollReveal animation="blur-in">
              <h1 style={{
                color: 'var(--color-white)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                margin: '0 0 16px 0',
                lineHeight: 1.15,
              }}>
                Våra Tjänster
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', margin: '0 auto', maxWidth: '600px' }}>
                Vi på MGA Markarbeten AB erbjuder kompletta lösningar för din fastighet i Habo och Jönköping.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── STICKY ANCHOR TAB BAR ──────────────────────────── */}
      <div style={{
        position: 'sticky',
        top: '72px',
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 0',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
      }}>
        <div style={container}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            {services.map((svc) => (
              <button
                key={svc.slug}
                onClick={() => scrollToSection(svc.slug)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '8px 20px',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-family)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-primary)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#334155';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {svc.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── DETAILED SERVICE SECTIONS (ALTERNATING LAYOUT) ──────────── */}
      <div style={{ padding: '60px 0 100px 0' }}>
        {services.map((svc: ServiceItem, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <section
              key={svc.slug}
              id={svc.slug}
              style={{
                padding: '80px 0',
                background: isEven ? '#ffffff' : '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <div style={container}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '50px',
                  alignItems: 'center',
                }}>

                  {/* Image Column */}
                  <div style={{ order: isEven ? 1 : 2 }}>
                    <ScrollReveal animation={isEven ? 'fade-right' : 'fade-left'}>
                      <div style={{
                        position: 'relative',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)',
                        border: '3px solid #ffffff',
                        aspectRatio: '4/3',
                        background: '#0f172a',
                      }}>
                        <img
                          src={svc.image}
                          alt={svc.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Content Column */}
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <ScrollReveal animation={isEven ? 'fade-left' : 'fade-right'}>
                      <h2 style={{
                        color: 'var(--color-text-dark)',
                        fontWeight: 800,
                        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                        margin: '0 0 16px 0',
                        lineHeight: 1.2,
                      }}>
                        {svc.title}
                      </h2>
                      <span style={{
                        display: 'block',
                        width: '50px',
                        height: '3px',
                        background: 'var(--color-primary)',
                        borderRadius: '2px',
                        marginBottom: '20px',
                      }} />
                      <p style={{
                        color: 'var(--color-gray-600)',
                        fontSize: '1.02rem',
                        lineHeight: 1.75,
                        margin: '0 0 32px 0',
                        whiteSpace: 'pre-line',
                      }}>
                        {svc.detailedDescription}
                      </p>

                      {/* Action Button */}
                      <Link
                        to="/offert"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          background: 'var(--color-primary)',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          padding: '14px 28px',
                          borderRadius: 'var(--border-radius-pill)',
                          textDecoration: 'none',
                          boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--color-primary-hover)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--color-primary)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Begär offert för {svc.title} <ArrowRight size={16} />
                      </Link>
                    </ScrollReveal>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <CTABanner />

    </main>
  );
}
