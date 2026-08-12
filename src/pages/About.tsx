import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import CTABanner from '../components/CTABanner';
import { usePageTitle } from '../hooks/usePageTitle';
import images from '../data/images';

const container: React.CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

const accentLine: React.CSSProperties = {
  display: 'block',
  width: '60px',
  height: '3px',
  background: 'var(--color-primary)',
  borderRadius: '2px',
  margin: '14px auto 0',
};

const teamMembers = [
  {
    role: 'Ägare & Grundare',
    name: 'Oliver',
    photo: '',
  },
  {
    role: 'Grund- & Anläggningsteamet',
    name: 'P.N Byggentreprenad Team',
    photo: '',
  },
];

export default function About() {
  usePageTitle(
    'Om P.N Byggentreprenad AB | Entreprenad & Markarbete',
    'Läs mer om P.N Byggentreprenad AB, din pålitliga partner för alla typer av entreprenad- och markarbeten med Skåne som utgångspunkt. Vi sätter alltid kunden och kvaliteten i fokus.'
  );
  return (
    <main style={{ fontFamily: 'var(--font-family)' }}>

      {/* ── SECTION A: HERO HEADER ────────────────────────────── */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url(/hero-main.webp)',
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
                Om oss
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', margin: '0 auto', maxWidth: '600px' }}>
                Kvalitetsarbete med Skåne som utgångspunkt – Entreprenad du kan lita på i alla väder.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION B: ABOUT TEXT ─────────────────────────────── */}
      <section style={{ background: 'var(--color-light)', padding: '100px 0' }}>
        <div style={{ ...container, maxWidth: '960px' }}>
          <div className="about-content-grid" style={{
            display: 'grid',
            gridTemplateColumns: '160px 1fr',
            gap: '48px',
            alignItems: 'start',
          }}>

            {/* Left: Logo */}
            <ScrollReveal animation="scale-in" easing="spring">
              <div style={{
                position: 'sticky',
                top: '120px',
              }}>
                <img
                  src={images.about.hero.url}
                  alt={images.about.hero.alt}
                  style={{
                    width: '140px',
                    height: '140px',
                    objectFit: 'contain',
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '16px',
                    border: '2px solid rgba(217, 119, 6, 0.15)',
                    boxShadow: '0 8px 28px rgba(28, 21, 16, 0.08)',
                    display: 'block',
                  }}
                />
              </div>
            </ScrollReveal>

            {/* Right: Text content */}
            <div>
              <ScrollReveal animation="blur-in">
                <h2 style={{
                  color: 'var(--color-text-dark)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  lineHeight: 1.2,
                  margin: '0 0 14px 0',
                }}>
                  Om P.N Byggentreprenad AB
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="scale-x-left" delay={200} duration={0.6}>
                <span style={{ ...accentLine, margin: '14px 0 0 0' }} />
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={150}>
                <div style={{ marginTop: '28px' }}>
                  <p style={{
                    color: 'var(--color-gray-600)',
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    margin: '0 0 16px 0',
                  }}>
                    Föremålet för P.N Byggentreprenad AB:s verksamhet är bygg- och anläggningsverksamhet och därmed förenlig verksamhet.
                  </p>
                  <p style={{
                    color: 'var(--color-gray-600)',
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    margin: '0 0 36px 0',
                  }}>
                    Vi erbjuder er engagemang, trygghet och kostnadseffektiva helhetslösningar till ert byggprojekt — inklusive markarbeten, grundläggning, dränering, betong och kompletta takbyten för alla typer av fastigheter med Skåne som utgångspunkt.
                  </p>
                  <Button variant="primary" size="lg" href="/kontakt">
                    Kontakta oss
                  </Button>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION D: TEAM ───────────────────────────────────── */}
      <section style={{ background: 'var(--color-light)', padding: '100px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <ScrollReveal animation="blur-in">
              <h2 style={{
                color: 'var(--color-text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                margin: '0 0 14px 0',
              }}>
                Möt teamet
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="scale-x-center" delay={200} duration={0.6}>
              <span style={{ ...accentLine, margin: '14px auto 16px' }} />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <p style={{
                color: 'var(--color-gray-600)',
                fontSize: '1rem',
                lineHeight: 1.7,
                maxWidth: '560px',
                margin: '0 auto',
              }}>
                Hantverkare som brinner för sitt jobb och värnar om kunden lika mycket som resultatet.
              </p>
            </ScrollReveal>
          </div>

          <div className="team-grid" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap',
          }}>
            {teamMembers.map((member, i) => (
              <ScrollReveal key={i} animation="slide-up-fade" delay={i * 150}>
                <div style={{ textAlign: 'center', minWidth: '200px' }}>
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      style={{
                        width: '160px',
                        height: '160px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        display: 'block',
                        margin: '0 auto 20px',
                        border: '3px solid var(--color-primary)',
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '160px',
                      height: '160px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-gray-100)',
                      border: '3px dashed var(--color-gray-400)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: 'var(--color-primary)',
                    }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-family)' }}>
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <p style={{
                    color: 'var(--color-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: '0 0 8px 0',
                  }}>
                    {member.role}
                  </p>
                  <h3 style={{
                    color: 'var(--color-text-dark)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    margin: '0 0 8px 0',
                  }}>
                    {member.name}
                  </h3>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION E: CTA BANNER ─────────────────────────────── */}
      <CTABanner />

      <style>{`
        .about-hero-img-wrap:hover .about-hero-img {
          transform: scale(1.03);
        }
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .team-grid { grid-template-columns: 1fr !important; }
          .about-content-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .about-content-grid > *:first-child {
            display: flex;
            justify-content: center;
          }
        }
        @media (max-width: 1024px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  );
}
