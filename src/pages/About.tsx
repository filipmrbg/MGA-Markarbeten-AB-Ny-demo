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
    role: 'Ägare och Företagsledare',
    name: 'Mattias Lieberg',
    photo: 'https://i.imgur.com/TZOwaqs.png',
    objectPosition: 'center 30%',
  },
  {
    role: 'Anläggare',
    name: 'Joel Forsman',
    photo: 'https://i.imgur.com/DSxbqCV.png',
  },
  {
    role: 'Maskin & Anläggning',
    name: 'William Wymark',
    photo: 'https://i.imgur.com/JVsQMgW.png',
  },
  {
    role: 'Bygg & Anläggning',
    name: 'Rasmus Ahlrichs',
    photo: 'https://i.imgur.com/i1KNHpq.png',
  },
  {
    role: 'Skog, Trädgård & Anläggning',
    name: 'Reine Lieberg',
    photo: 'https://i.imgur.com/VUIOJiY.png',
  },
  {
    role: 'Bygg & Anläggning',
    name: 'Emil Antonijev',
    photo: 'https://i.imgur.com/WlpQoJX.jpeg',
  },
];

const pillars = [
  {
    title: 'Mångårig Erfarenhet',
    desc: 'Med samlad expertis inom allt från stenyta och murar till omfattande dränerings- och markanläggningar.',
  },
  {
    title: '6 Anställda Specialistteam',
    desc: 'Ett dedikerat gäng där alla brinner för trädgårdsdrömmar, skapande och noggrannt hantverk.',
  },
  {
    title: 'Skräddarsydda Lösningar',
    desc: 'Vi tar fram en välbalanserad plan för utseende, ändamål och genomförande anpassat efter dina önskemål.',
  },
  {
    title: 'Kompletta Helhetslösningar',
    desc: 'Från underjordisk dränering och V/A till lummiga utemiljöer, stenläggning, trappor och trall.',
  },
];

export default function About() {
  usePageTitle(
    'Om MGA Markarbeten AB | Vår Historia & Vision',
    'Läs om MGA Markarbeten AB grundat 2011 av Mattias Lieberg. Vi är ditt lokala entreprenadföretag i Habo och Jönköping för anläggning, bygg och dränering.'
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
                Om MGA Markarbeten AB
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', margin: '0 auto', maxWidth: '600px' }}>
                Med passion för skapande och trädgårdsdrömmar sedan 2011 med Habo och Jönköping som hemmaplan.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION B: ABOUT STORY & HISTORY ─────────────────────────── */}
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
                  Vår Historia & Filosofi
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="scale-x-left" delay={200} duration={0.6}>
                <span style={{ ...accentLine, margin: '14px 0 0 0' }} />
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={150}>
                <div style={{ marginTop: '28px' }}>
                  <p style={{
                    color: 'var(--color-gray-600)',
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    margin: '0 0 18px 0',
                    fontWeight: 500,
                  }}>
                    Hos oss på MGA Markarbeten AB finns det utrymme för alla visioner och behov! Vi hjälper dig att förverkliga dina drömmar för utemiljön, oavsett om det gäller ståtliga murar, dränering, stensättning eller kompletta tomtanläggningar.
                  </p>
                  
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-dark)', margin: '28px 0 12px 0' }}>
                    Från enskild firma till etablerat aktiebolag
                  </h3>
                  <p style={{
                    color: 'var(--color-gray-600)',
                    fontSize: '0.98rem',
                    lineHeight: 1.8,
                    margin: '0 0 16px 0',
                  }}>
                    Resan började år 2011 då grundaren Mattias Lieberg startade enskild firma under namnet <em>Mattias Grönytor och Anläggningstjänst</em>. Företagarlivet passade som handen i handsken, där känslan för skapande fick leva ut till fullo i mötet med fantastiska människor och roliga idéer.
                  </p>
                  <p style={{
                    color: 'var(--color-gray-600)',
                    fontSize: '0.98rem',
                    lineHeight: 1.8,
                    margin: '0 0 16px 0',
                  }}>
                    I takt med att uppdragen blev fler utökades verksamheten med fler skickliga kollegor. År 2020 ombildades bolaget till Aktiebolag under namnet <strong>MGA Markarbeten AB</strong>, där MGA stolt står kvar vid rötterna från Mattias Grönytor och Anläggningstjänst.
                  </p>

                  <p style={{
                    color: 'var(--color-gray-600)',
                    fontSize: '0.98rem',
                    lineHeight: 1.8,
                    margin: '0 0 24px 0',
                  }}>
                    Idag är vi 6 anställda som alla brinner för utemiljöer och trädgårdsdrömmar. Under ett och samma tak levererar vi helhetslösningar inom stensytor, murar, gräsmattor, dränering och trall. För oss är inget projekt för litet eller för stort!
                  </p>

                  {/* Founder Quote Card */}
                  <div style={{
                    background: 'rgba(234, 88, 12, 0.05)',
                    borderLeft: '4px solid var(--color-primary)',
                    padding: '24px 28px',
                    borderRadius: '0 16px 16px 0',
                    margin: '32px 0 36px 0',
                  }}>
                    <p style={{
                      color: 'var(--color-text-dark)',
                      fontSize: '1.05rem',
                      fontStyle: 'italic',
                      fontWeight: 500,
                      lineHeight: 1.7,
                      margin: '0 0 10px 0',
                    }}>
                      "Att jobba nära människor med förtroendet att förverkliga drömmar och idéer är vårt privilegie och expertis!"
                    </p>
                    <span style={{
                      color: 'var(--color-primary)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'block',
                    }}>
                      Mattias Lieberg, VD och Entreprenadansvarig
                    </span>
                  </div>

                  <Button variant="primary" size="lg" href="/kontakt">
                    Kontakta oss för rådgivning
                  </Button>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>




      {/* ── SECTION D: TEAM ───────────────────────────────────── */}
      <section style={{ background: 'var(--color-light)', padding: '100px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
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
                Ett dedikerat team på 6 medarbetare som alla brinner för utemiljöer, trädgårdsdrömmar och kvalitet i varje detalj.
              </p>
            </ScrollReveal>
          </div>

          <div className="team-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {teamMembers.map((member, i) => (
              <ScrollReveal key={i} animation="slide-up-fade" delay={i * 100}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}>
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '280px',
                        objectFit: 'cover',
                        objectPosition: member.objectPosition || 'top center',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '280px',
                      backgroundColor: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-primary)',
                    }}>
                      <span style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-family)' }}>
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div style={{ padding: '20px 22px' }}>
                    <h3 style={{
                      color: 'var(--color-text-dark)',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      margin: '0 0 6px 0',
                    }}>
                      {member.name}
                    </h3>
                    <p style={{
                      color: 'var(--color-gray-600)',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      margin: 0,
                      lineHeight: 1.4,
                    }}>
                      {member.role}
                    </p>
                  </div>
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
