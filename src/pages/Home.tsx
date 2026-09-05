import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Phone,
  MapPin,
  Hammer,
  CheckCircle2,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import CTABanner from '../components/CTABanner';
import ReviewCard from '../components/ReviewCard';
import SocialBanner from '../components/SocialBanner';
import CallModal from '../components/CallModal';
import { usePageTitle } from '../hooks/usePageTitle';
import images from '../data/images';
import services, { ServiceItem } from '../data/services';

const container: React.CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

export default function Home() {
  usePageTitle(
    'MGA Markarbeten AB | Anläggning, Bygg & Dränering i Habo',
    'Vi på MGA Markarbeten AB utför alla typer av anläggning, bygg, dränering och skog i Habo med omnejd. Kontakta oss för en kostnadsfri offert!'
  );

  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const foundationVideoRef = useRef<HTMLVideoElement>(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const desktopHeroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_3G5LlmMYORSdAk8SxzXrK2S0Is5/hf_20260904_195041_73807493-4fb3-4109-b8e9-7674b6947a13.mp4';
  const mobileHeroVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_3G5LlmMYORSdAk8SxzXrK2S0Is5/hf_20260905_103846_3ea9bdec-786a-4126-a9e5-18a07419dd39.mp4';
  const currentHeroVideo = isMobile ? mobileHeroVideo : desktopHeroVideo;
  const currentHeroLocal = isMobile ? '/hero-video-mobile.mp4' : '/hero-video.mp4';

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroBgRef.current) {
            heroBgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.5}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay blocked (e.g. iOS Low Power Mode) — will unlock on user interaction
        });
      }
    };

    attemptPlay();

    const events = ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'playing'];
    events.forEach((event) => video.addEventListener(event, attemptPlay));

    const unlockPlay = () => {
      if (video && video.paused) {
        attemptPlay();
      }
    };

    window.addEventListener('touchstart', unlockPlay, { passive: true });
    window.addEventListener('touchend', unlockPlay, { passive: true });
    window.addEventListener('scroll', unlockPlay, { passive: true });
    window.addEventListener('click', unlockPlay, { passive: true });

    return () => {
      events.forEach((event) => video.removeEventListener(event, attemptPlay));
      window.removeEventListener('touchstart', unlockPlay);
      window.removeEventListener('touchend', unlockPlay);
      window.removeEventListener('scroll', unlockPlay);
      window.removeEventListener('click', unlockPlay);
    };
  }, [isMobile]);

  useEffect(() => {
    const video = foundationVideoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.play().catch(() => undefined);
    };

    const events = ['loadedmetadata', 'loadeddata', 'canplay', 'playing'];
    events.forEach((event) => video.addEventListener(event, attemptPlay));
    window.addEventListener('touchstart', attemptPlay, { passive: true });
    window.addEventListener('click', attemptPlay, { passive: true });
    window.addEventListener('scroll', attemptPlay, { passive: true });
    attemptPlay();

    return () => {
      events.forEach((event) => video.removeEventListener(event, attemptPlay));
      window.removeEventListener('touchstart', attemptPlay);
      window.removeEventListener('click', attemptPlay);
      window.removeEventListener('scroll', attemptPlay);
    };
  }, []);

  return (
    <main style={{ fontFamily: 'var(--font-family)' }}>

      {/* ── SECTION 1: HERO ─────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '120px',
        paddingBottom: '80px',
        boxSizing: 'border-box',
      }}>
        {/* Parallax Background Video */}
        <div
          ref={heroBgRef}
          style={{
            position: 'absolute',
            inset: '-20% 0',
            zIndex: 0,
            willChange: 'transform',
          }}
        >
          <video
            key={isMobile ? 'hero-mobile' : 'hero-desktop'}
            ref={(el) => {
              heroVideoRef.current = el;
              if (el) {
                el.muted = true;
                el.defaultMuted = true;
                el.playsInline = true;
                el.play().catch(() => {});
              }
            }}
            src={currentHeroVideo}
            preload="auto"
            autoPlay
            loop
            muted
            playsInline
            // @ts-expect-error webkit-playsinline for iOS
            webkit-playsinline="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          >
            <source src={currentHeroLocal} type="video/mp4" />
          </video>
        </div>
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 12, 8, 0.65)',
          zIndex: 1,
        }} />

        <div style={{ ...container, position: 'relative', zIndex: 2, width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            maxWidth: '1080px',
            margin: '0',
            paddingTop: '60px',
            paddingBottom: '40px',
          }}>
            {/* Top Location Line */}
            <ScrollReveal animation="fade-down" delay={0} duration={0.6}>
              <span style={{
                fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontSize: 'clamp(0.75rem, 1.4vw, 0.85rem)',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.85)',
                display: 'block',
                marginBottom: '16px',
              }}>
                HABO • JÖNKÖPING • MULLSJÖ • BANKERYD
              </span>
            </ScrollReveal>

            {/* Huge Responsive Condensed Headline (H1) */}
            <ScrollReveal animation="fade-up" delay={100} duration={0.8}>
              <h1 className="hero-main-title">
                MGA MARKARBETEN AB
              </h1>
            </ScrollReveal>

            {/* Subtitle / Description */}
            <ScrollReveal animation="fade-up" delay={200} duration={0.8}>
              <p style={{
                fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                color: 'rgba(255, 255, 255, 0.88)',
                fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
                lineHeight: 1.65,
                maxWidth: '620px',
                margin: '0 0 36px 0',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.85)',
                fontWeight: 400,
              }}>
                Utför grundarbeten, trädgårdsanläggning och byggtjänster. Vi tar hand om hela projektet från planering till färdigställt resultat.
              </p>
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal animation="fade-up" delay={300} duration={0.8}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}>
                <Button variant="primary" size="lg" href="/offert">
                  Begär kostnadsfri offert
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  href="tel:0761778570"
                  onClick={(e) => {
                    if (window.innerWidth > 768) {
                      e.preventDefault();
                      setIsCallModalOpen(true);
                    }
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={18} />
                    Ring 076-177 85 70
                  </span>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CALL MODAL POPUP ────────────────────────────────────── */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />

      {/* ── SECTION 2: THREE STEP PROCESS ───────────────────────── */}
      <section style={{
        background: 'linear-gradient(180deg, #f0f7f7 0%, #ffffff 100%)',
        padding: 'clamp(60px, 8vw, 100px) 0',
      }}>
        <div style={container}>
          <div className="steps-grid-wrapper" style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '0',
            textAlign: 'center',
          }}>
            {[
              { icon: Phone, title: 'Ring oss', desc: 'Berätta om ditt projekt, så hjälper vi dig avgöra vad som krävs och vad det kostar.' },
              { icon: MapPin, title: 'Kostnadsfritt platsbesök', desc: 'Vi besöker er tomt för att mäta höjdskillnader, bedöma marken och ta fram en offert.' },
              { icon: Hammer, title: 'Vi utför', desc: 'Vi utför arbetet på ett tryggt och professionellt sätt med fokus på kvalitet.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} style={{ display: 'contents' }}>
                <ScrollReveal animation="blur-in" delay={i * 150} duration={0.8}>
                  <div className="step-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '1', maxWidth: '280px' }}>
                    <div style={{
                      width: '70px',
                      height: '70px',
                      background: 'var(--color-primary)',
                      borderRadius: 'var(--border-radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}>
                      <Icon size={28} color="#1a1f2e" />
                    </div>
                    <h3 style={{
                      color: 'var(--color-text-dark)',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      margin: '0 0 12px 0',
                    }}>
                      {title}
                    </h3>
                    <p style={{
                      color: 'var(--color-gray-600)',
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      margin: 0,
                      maxWidth: '260px',
                    }}>
                      {desc}
                    </p>
                  </div>
                </ScrollReveal>
                {i < 2 && (
                  <div className="step-arrow">
                    <svg width="65" height="24" viewBox="0 0 65 24" fill="none" stroke="#C4C4C4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.75 }}>
                      <path d="M 5 12 C 20 10, 40 10, 58 11" />
                      <path d="M 49 5 C 52 8, 56 10, 58 11" />
                      <path d="M 48 18 C 51 15, 56 12, 58 11" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OM OSS-BLURB ────────────────────────────── */}
      <section style={{ background: '#f8fafc', padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <div style={container}>
          <div className="two-col" style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(280px, 35%, 400px) 1fr',
            gap: '60px',
            alignItems: 'center',
          }}>
            {/* Left: Video Showcase (Replacing Logo) */}
            <ScrollReveal animation="fade-left" duration={0.8}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                margin: '0 auto',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.22)',
                border: '3px solid rgba(234, 88, 12, 0.2)',
                background: '#0f172a',
                height: '380px',
              }}>
                <video
                  ref={foundationVideoRef}
                  src="https://i.imgur.com/fTDcor7.mp4"
                  preload="metadata"
                  autoPlay
                  muted
                  onError={(event) => {
                    const video = event.currentTarget;
                    if (video.dataset.fallbackApplied) return;
                    video.dataset.fallbackApplied = 'true';
                    video.src = '/mga-about-video.mp4';
                    video.load();
                    video.play().catch(() => undefined);
                  }}
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.25) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }} />
              </div>
            </ScrollReveal>

            {/* Right: text */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ScrollReveal animation="fade-right" duration={0.8}>
                <h2 style={{
                  color: 'var(--color-text-dark)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  lineHeight: 1.2,
                  margin: '0 0 14px 0',
                }}>
                  Stabila grunder för säkra byggprojekt
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="scale-x-left" delay={200} duration={0.6}>
                <span style={{ display: 'block', width: '60px', height: '3px', background: 'var(--color-primary)', borderRadius: '2px', margin: '0 0 24px' }} />
              </ScrollReveal>
              <ScrollReveal animation="fade-right" duration={0.8} delay={100}>
                <p style={{
                  color: 'var(--color-gray-600)',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  margin: '0 0 32px 0',
                }}>
                  Med rötter sedan 2011 erbjuder MGA Markarbeten AB engagemang, trygghet och helhetslösningar för din utemiljö. Vårt team på 6 anställda utför allt från stensättning, murar, dränering och tomtplanering till betong och grundläggning med Habo som utgångspunkt.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-right" duration={0.8} delay={200}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    'Bred kompetens från schakt till färdigt hantverk',
                    'Tydliga fasta priser och möjlighet till ROT avdrag',
                    'Erfarna och certifierade yrkesarbetare',
                    'Modern maskinpark anpassad för alla tomter',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CheckCircle2 size={24} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                      <span style={{ color: 'var(--color-text-dark)', fontWeight: 600, fontSize: '0.95rem' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fade-right" duration={0.8} delay={250}>
                <div style={{ marginTop: '32px' }}>
                  <Button variant="dark" href="/om-oss">
                    Läs mer om oss
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CLEAN SPACED TILE GRID ────────────────────── */}
      <section
        id="tjanster"
        style={{
          background: '#f4f3ef',
          padding: 'clamp(80px, 10vw, 120px) 0',
        }}
      >
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <ScrollReveal animation="blur-in">
              <h2 style={{
                color: 'var(--color-text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                letterSpacing: '-0.02em',
                margin: '0 0 14px 0',
              }}>
                Vad vi kan hjälpa dig med
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="scale-x-center" delay={150} duration={0.6}>
              <span style={{ display: 'block', width: '50px', height: '3px', background: 'var(--color-primary)', borderRadius: '2px', margin: '0 auto 16px auto' }} />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <p style={{
                color: 'var(--color-gray-600)',
                fontSize: '1.05rem',
                maxWidth: '620px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}>
                Helhetslösningar inom entreprenad, grundläggning och markarbeten för villor och fastigheter.
              </p>
            </ScrollReveal>
          </div>

          {/* Spaced Tile Grid (Sentence case titles, warm off-white background) */}
          <div className="spaced-screenshot-grid">
            {services.map((svc: ServiceItem, index: number) => (
              <ScrollReveal key={svc.slug} animation="fade-up" delay={(index % 3) * 80}>
                <Link to={svc.href} className="spaced-tile">
                  {/* Image */}
                  <img
                    src={svc.image}
                    alt={svc.title}
                    loading="lazy"
                    className="spaced-tile-img"
                  />
                  {/* Overlay */}
                  <div className="spaced-tile-overlay" />

                  {/* Content Container */}
                  <div className="spaced-tile-content">
                    <div className="spaced-tile-left">
                      <h3 className="spaced-tile-title">
                        {svc.title}
                      </h3>
                      <p className="spaced-tile-desc">
                        {svc.shortDescription}
                      </p>
                    </div>
                    <div className="spaced-tile-right">
                      <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, letterSpacing: '0.02em' }}>Läs mer</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: MID CTA ──────────────────────────────────── */}
      <section style={{
        position: 'relative',
        padding: 'clamp(50px, 7vw, 80px) 0',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(/cta-mid-section.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,31,46,0.88)' }} />
        <div style={{ ...container, position: 'relative', zIndex: 1 }}>
          <ScrollReveal animation="scale-in">
            <h2 style={{
              color: 'var(--color-white)',
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              margin: '0 0 12px 0',
            }}>
              Nyfiken på vad ditt projekt kostar?
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1rem',
              margin: '0 0 32px 0',
              lineHeight: 1.7,
            }}>
              Vi skickar en kostnadsfri offert inom 24 timmar.
            </p>
            <Button variant="primary" size="lg" href="/offert">
              Begär offert
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 8: KUNDRECENSIONER ──────────────────────────── */}
      <section style={{ background: 'var(--color-light)', padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <ScrollReveal animation="fade-up">
              <p style={{
                color: 'var(--color-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                margin: '0 0 12px 0',
              }}>
                Kundrecensioner
              </p>
            </ScrollReveal>
            <ScrollReveal animation="blur-in" delay={50}>
              <h2 style={{
                color: 'var(--color-text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                margin: '0 0 12px 0',
                lineHeight: 1.2,
              }}>
                Vad säger våra kunder?
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="scale-x-center" delay={200} duration={0.6}>
              <span style={{ display: 'block', width: '60px', height: '3px', background: 'var(--color-primary)', borderRadius: '2px', margin: '0 auto 24px auto' }} />
            </ScrollReveal>

            {/* Simple Google Rating Summary */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                margin: '0 auto 32px auto',
                fontSize: '0.9rem',
                color: '#4b5563',
                fontWeight: 500,
                flexWrap: 'wrap',
              }}>
                <svg viewBox="0 0 24 24" width="16" height="16" style={{ marginRight: '4px', flexShrink: 0 }}>
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.13h4.01c2.34-2.16 3.69-5.32 3.69-8.75z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.01-3.13c-1.11.75-2.53 1.19-3.95 1.19-3.04 0-5.61-2.05-6.53-4.82H1.31v3.23A12 12 0 0 0 12 24z" />
                  <path fill="#FBBC05" d="M5.47 14.33A7.16 7.16 0 0 1 5 12c0-.8.14-1.58.39-2.33V6.44H1.31A11.96 11.96 0 0 0 0 12c0 2.05.52 4 1.31 5.67l4.16-3.34z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.22 0 12 0A12 12 0 0 0 1.31 6.44l4.16 3.23a7.18 7.18 0 0 1 6.53-4.92z" />
                </svg>
                <span style={{ fontWeight: 700, color: '#111827' }}>5 / 5</span>
                <div style={{ display: 'flex', gap: '1px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="#FBBC05" color="#FBBC05" />
                  ))}
                </div>
                <span>Google-omdömen</span>
              </div>
            </ScrollReveal>
          </div>

          <div className="reviews-grid">
            {[
              {
                name: 'Lisa Berglund',
                location: 'Jönköping',
                text: 'Vi anlitade MGA för att dränera och göra om både på fram- och baksida av huset samt göra om mur och trappa. Vi är helnöjda och skulle absolut rekommendera dessa härliga och serviceinriktade killar till vänner och familj. Bra kommunikation och flexibla under resans gång när vi ändrade oss om hur vi ville ha det.',
                stars: 5,
                authorSub: 'Dränering, mur & trappa',
              },
              {
                name: 'Christopher Lindberg',
                location: 'Jönköping',
                text: 'Superbra! Gör exakt det dom ska. Ärliga och pålitliga. Rekommenderas starkt.',
                stars: 5,
                authorSub: 'Markarbete',
              },
              {
                name: 'Benjamin Birol',
                location: 'Jönköping',
                text: 'Vi anlitade MGA för anläggning av baksida, trappa och stödmur mot grännen. Vi kände redan i offerstadiet att vi hittat rätt entreprenör och nu när allt är färdigställt så kan vi inte bli mer nöjda med de kvalitativa resultaten! Vi rekommenderar med varm hand MGA Markarbete - och har redan vid flertalet tillfällen haft vänner och bekanta till att ta kontakt med MGA. Stort tack för samarbetet och dem överträffade förväntningarna!',
                stars: 5,
                authorSub: 'Baksida, trappa & stödmur',
              },
              {
                name: 'Anna Bunninger',
                location: 'Jönköping',
                text: 'Vi är väldigt nöjda med MGA som har färdigställt hela vår trädgård med fin noggrannhet, bra kommunikation och ett väldigt fint slutresultat.',
                stars: 5,
                authorSub: 'Trädgårdsanläggning',
              },
            ].map((review, i) => {
              const delay = i * 150;
              return (
                <ScrollReveal key={i} animation="fade-up" delay={delay}>
                  <ReviewCard review={review} />
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SOCIAL MEDIA BANNER ─────────────────────────────────── */}
      <SocialBanner />

      {/* ── SECTION 11: CTA BANNER ───────────────────────────────── */}
      <CTABanner />

      {/* ── TWEAKED SPACED STYLES ───────────────────────────────── */}
      <style>{`
        .spaced-screenshot-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(20px, 3vw, 32px);
        }
        .spaced-tile {
          position: relative;
          display: block;
          text-decoration: none;
          aspect-ratio: 16/10;
          border-radius: 16px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .spaced-tile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .spaced-tile-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 0.88) 100%);
          transition: background 0.4s ease;
        }
        .spaced-tile:hover {
          transform: translateY(-6px);
          border-color: rgba(217, 119, 6, 0.45);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.16);
        }
        .spaced-tile:hover .spaced-tile-img {
          transform: scale(1.06);
        }
        .spaced-tile:hover .spaced-tile-overlay {
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 20%, rgba(0, 0, 0, 0.92) 100%);
        }
        .spaced-tile-content {
          position: absolute;
          inset: auto 0 0 0;
          padding: 24px 24px 22px 24px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          z-index: 2;
        }
        .spaced-tile-left {
          display: flex;
          flex-direction: column;
        }
        .spaced-tile-title {
          color: #ffffff;
          font-weight: 700;
          font-size: clamp(1.1rem, 1.8vw, 1.4rem);
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.8);
        }
        .spaced-tile-desc {
          color: rgba(255, 255, 255, 0.84);
          font-size: 0.82rem;
          line-height: 1.4;
          margin: 6px 0 0 0;
          max-width: 320px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
        }
        .spaced-tile-right {
          flex-shrink: 0;
          margin-left: 12px;
        }

        .steps-grid-wrapper {
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .review-card-el {
          background: var(--color-white);
          border: 1px solid #EDE8E0;
          border-radius: var(--border-radius-lg);
          padding: 28px 30px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .review-card-el:hover {
          transform: translateY(-5px) rotate(-0.5deg);
          box-shadow: 0 16px 40px rgba(28,21,16,0.10);
        }
        .step-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 70px;
        }
        @media (max-width: 1024px) {
          .spaced-screenshot-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
                .hero-main-title {
          font-family: 'Bebas Neue', 'Oswald', sans-serif;
          color: #ffffff;
          font-size: clamp(2.8rem, 7.8vw, 6.6rem);
          font-weight: 400;
          line-height: 1.0;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin: 0 0 24px 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.85);
          white-space: nowrap;
        }
        @media (max-width: 640px) {
          .hero-main-title {
            white-space: normal !important;
            font-size: clamp(2.5rem, 11vw, 3.6rem) !important;
            line-height: 0.94 !important;
          }
        }
        @media (max-width: 768px) {
          .spaced-screenshot-grid { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .reviews-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .steps-grid-wrapper { flex-direction: column !important; align-items: center !important; gap: 24px !important; }
          .step-arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </main>
  );
}
