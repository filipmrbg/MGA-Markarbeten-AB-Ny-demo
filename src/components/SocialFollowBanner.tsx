import { Instagram, ArrowUpRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function SocialFollowBanner() {
  return (
    <section style={{
      background: '#ffffff',
      padding: '36px 0',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0',
      position: 'relative',
      fontFamily: 'var(--font-family)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 40px)',
      }}>
        <ScrollReveal animation="fade-up" duration={0.5}>
          <div className="social-strip">
            {/* Left: Text */}
            <div className="social-strip-text">
              <span style={{
                color: 'var(--color-primary)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '4px',
              }}>
                Instagram
              </span>
              <h2 style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.45rem)',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 4px 0',
                lineHeight: 1.25,
              }}>
                Följ våra olika projekt & jobb
              </h2>
              <p style={{
                color: '#64748b',
                fontSize: '0.92rem',
                margin: 0,
                lineHeight: 1.5,
              }}>
                Se bilder, filmer och uppdateringar från våra olika uppdrag direkt på Instagram.
              </p>
            </div>

            {/* Right: Instagram Button */}
            <a
              href="https://www.instagram.com/mgamarkarbeten/"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-strip-btn"
            >
              <div className="insta-icon-box">
                <Instagram size={18} />
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>@mgamarkarbeten</span>
              <ArrowUpRight size={16} style={{ opacity: 0.7 }} />
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .social-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .social-strip-text {
          flex: 1;
          min-width: 260px;
        }

        .insta-strip-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          color: #0f172a;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          flex-shrink: 0;
        }

        .insta-icon-box {
          color: #e1306c;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .insta-strip-btn:hover {
          background: #ffffff;
          border-color: #e1306c;
          color: #e1306c;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(225, 48, 108, 0.15);
        }

        @media (max-width: 640px) {
          .social-strip {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .insta-strip-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
