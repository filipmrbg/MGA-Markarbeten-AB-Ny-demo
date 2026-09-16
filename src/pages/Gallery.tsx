import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import CTABanner from '../components/CTABanner';
import { usePageTitle } from '../hooks/usePageTitle';

const galleryImages = [
  { src: '/optimized/gallery-item-1.webp', alt: 'Projektbild 1' },
  { src: '/optimized/gallery-item-2.webp', alt: 'Projektbild 2' },
  { src: '/optimized/gallery-item-3.webp', alt: 'Projektbild 3' },
  { src: '/optimized/gallery-item-4.webp', alt: 'Projektbild 4' },
  { src: '/optimized/gallery-item-5.webp', alt: 'Projektbild 5' },
  { src: '/optimized/gallery-item-6.webp', alt: 'Projektbild 6' },
  { src: '/optimized/gallery-item-7.webp', alt: 'Projektbild 7' },
  { src: '/optimized/gallery-item-8.webp', alt: 'Projektbild 8' },
  { src: '/optimized/gallery-item-9.webp', alt: 'Projektbild 9' },
  { src: '/optimized/gallery-item-10.webp', alt: 'Projektbild 10' },
  { src: '/optimized/gallery-item-11.webp', alt: 'Projektbild 11' },
  { src: '/optimized/gallery-item-12.webp', alt: 'Projektbild 12' },
];

const container: React.CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

export default function Gallery() {
  usePageTitle(
    'Galleri | MGA Markarbeten AB',
    'Bilder från våra utförda markarbeten, schaktningar och projekt.'
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Preload next & previous images for instant navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const nextIdx = (activeIndex + 1) % galleryImages.length;
    const prevIdx = (activeIndex - 1 + galleryImages.length) % galleryImages.length;
    const img1 = new Image();
    img1.src = galleryImages[nextIdx].src;
    const img2 = new Image();
    img2.src = galleryImages[prevIdx].src;
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  // Lock scroll
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || activeIndex === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      // Swipe left -> next
      setActiveIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
    } else if (diff < -45) {
      // Swipe right -> prev
      setActiveIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
    }
    touchStartX.current = null;
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
  };

  return (
    <main style={{ fontFamily: 'var(--font-family)', background: '#ffffff' }}>
      {/* ── HERO HEADER ──────────── */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url(/optimized/services-gallery-hero.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '150px',
        paddingBottom: '70px',
        textAlign: 'center',
        color: '#ffffff',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(11, 17, 30, 0.88)',
          zIndex: 1,
        }} />

        <div style={{ ...container, position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            fontWeight: 800,
            margin: '0 0 14px 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}>
            Galleri
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            color: 'rgba(255, 255, 255, 0.82)',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Ett urval av bilder från våra olika projekt och utförda arbeten.
          </p>
        </div>
      </section>

      {/* ── PURE PHOTO GRID ──────────── */}
      <section style={{ padding: 'clamp(50px, 7vw, 90px) 0' }}>
        <div style={container}>
          <div className="pure-photo-grid">
            {galleryImages.map((img, index) => (
              <ScrollReveal key={index} animation="fade-up" duration={0.5} delay={index * 0.04}>
                <div
                  className="photo-card"
                  onClick={() => setActiveIndex(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveIndex(index)}
                  aria-label={`Visa bild ${index + 1}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────── */}
      <CTABanner />

      {/* ── STABLE & SMOOTH LIGHTBOX (PORTAL) ──────────── */}
      {activeIndex !== null && typeof document !== 'undefined' && createPortal(
        <div
          className="lightbox-overlay"
          onClick={() => setActiveIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar: Counter & Close */}
          <div className="lightbox-top-bar" onClick={(e) => e.stopPropagation()}>
            <span className="lightbox-counter">
              {activeIndex + 1} / {galleryImages.length}
            </span>

            <button
              type="button"
              className="lightbox-close"
              onClick={() => setActiveIndex(null)}
              aria-label="Stäng bild"
            >
              <X size={24} />
            </button>
          </div>

          {/* Prev button */}
          <button
            type="button"
            className="lightbox-nav-btn lightbox-prev"
            onClick={goPrev}
            aria-label="Föregående bild"
          >
            <ChevronLeft size={30} />
          </button>

          {/* Next button */}
          <button
            type="button"
            className="lightbox-nav-btn lightbox-next"
            onClick={goNext}
            aria-label="Nästa bild"
          >
            <ChevronRight size={30} />
          </button>

          {/* Centered Image Container */}
          <div
            className="lightbox-img-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={galleryImages[activeIndex].src}
              src={galleryImages[activeIndex].src}
              alt={galleryImages[activeIndex].alt}
              className="lightbox-active-img"
              draggable={false}
            />
          </div>
        </div>,
        document.body
      )}

      {/* ── CSS ──────────── */}
      <style>{`
        .pure-photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .photo-card {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 12px;
          overflow: hidden;
          background: #0f172a;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease;
        }

        .photo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
        }

        .photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .photo-card:hover img {
          transform: scale(1.04);
        }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 7, 14, 0.96);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 9999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px 30px;
          user-select: none;
          touch-action: pan-y;
          box-sizing: border-box;
        }

        .lightbox-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 100002;
          pointer-events: auto;
        }

        .lightbox-counter {
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 1px;
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 14px;
          border-radius: 999px;
        }

        .lightbox-close {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lightbox-close:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.06);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 100001;
        }

        .lightbox-nav-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-50%) scale(1.08);
        }

        .lightbox-prev {
          left: 20px;
        }

        .lightbox-next {
          right: 20px;
        }

        .lightbox-img-wrap {
          max-width: 88vw;
          max-height: 82vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 100000;
        }

        .lightbox-active-img {
          max-width: 100%;
          max-height: 82vh;
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
          animation: imgFade 0.22s ease-out;
        }

        @keyframes imgFade {
          from {
            opacity: 0.7;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 991px) {
          .pure-photo-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
          .lightbox-nav-btn {
            width: 42px;
            height: 42px;
          }
          .lightbox-prev { left: 12px; }
          .lightbox-next { right: 12px; }
        }

        @media (max-width: 580px) {
          .pure-photo-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .lightbox-img-wrap {
            max-width: 95vw;
            max-height: 75vh;
          }
          .lightbox-active-img {
            max-height: 75vh;
          }
          .lightbox-nav-btn {
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
          }
        }
      `}</style>
    </main>
  );
}
