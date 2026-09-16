import { useEffect, useRef } from 'react';
import { CheckCircle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from './Button';
import ScrollReveal from './ScrollReveal';

interface Props {
  heading?: string;
  checkItems?: string[];
}

const defaultHeading = 'Begär en kostnadsfri offert';
const defaultCheckItems = [
  'Kostnadsfritt hembesök & offert',
  'Snabb & personlig återkoppling',
  'ROT-avdrag hanteras direkt av oss',
];

export default function CTABanner({ heading = defaultHeading, checkItems = defaultCheckItems }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => { });
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
  }, []);

  return (
    <section style={{
      position: 'relative',
      background: 'var(--color-dark)',
      overflow: 'hidden',
      padding: 'clamp(60px, 7vw, 85px) 0',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 40px)',
        position: 'relative',
        zIndex: 2,
      }}>
        <div className="cta-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 'clamp(32px, 5vw, 60px)',
          alignItems: 'center',
        }}>
          {/* Left: Text Content */}
          <ScrollReveal animation="fade-left" duration={0.7}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{
                color: 'var(--color-primary)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
                display: 'block',
                fontFamily: 'var(--font-family)',
              }}>
                Vi hjälper er!
              </span>

              <h2 style={{
                color: '#ffffff',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                lineHeight: 1.2,
                margin: '0 0 24px 0',
                fontFamily: 'var(--font-family)',
                letterSpacing: '-0.02em',
              }}>
                {heading}
              </h2>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 32px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}>
                {checkItems.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <span style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: 'var(--font-family)',
                      fontSize: '1rem',
                      fontWeight: 500,
                      lineHeight: 1.5,
                    }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Button variant="primary" size="lg" href="/offert">
                Kom igång
              </Button>
            </div>
          </ScrollReveal>

          {/* Right: Clean Uncropped Video */}
          <ScrollReveal animation="fade-right" duration={0.7}>
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#0f172a',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
              aspectRatio: '16 / 9',
            }}>
              <video
                ref={(el) => {
                  videoRef.current = el;
                  if (el) {
                    el.muted = true;
                    el.defaultMuted = true;
                    el.playsInline = true;
                  }
                }}
                src="https://i.imgur.com/cQv8gpJ.mp4"
                preload="metadata"
                autoPlay
                loop
                muted
                playsInline
                // @ts-expect-error webkit-playsinline is required for older iOS devices
                webkit-playsinline="true"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              >
                <source src="https://i.imgur.com/cQv8gpJ.mp4" type="video/mp4" />
                <source src="/mga-about-video.mp4" type="video/mp4" />
              </video>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}

