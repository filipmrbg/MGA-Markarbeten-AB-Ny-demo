import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import images from '../data/images';

const navLinks = [
  { label: 'Hem', href: '/' },
  { label: 'Tjänster', href: '/tjanster' },
  { label: 'Om oss', href: '/om-oss' },
  { label: 'Kontakt', href: '/kontakt' },
];

function isActive(href: string, pathname: string, activeSection: string | null): boolean {
  if (href.startsWith('/#')) {
    const id = href.slice(2);
    return activeSection === id;
  }
  if (href === '/') return pathname === '/' && activeSection === null;
  return pathname.startsWith(href);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      if (location.pathname !== '/') {
        setActiveSection(null);
        return;
      }

      // Check each hash-linked section
      const sections = navLinks
        .filter(l => l.href.startsWith('/#'))
        .map(l => l.href.slice(2));

      let found: string | null = null;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) {
          found = id;
          break;
        }
      }
      setActiveSection(found);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  function handleLogoClick(e: React.MouseEvent) {
    setMobileOpen(false);
    document.body.style.overflow = '';
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }

  function handleNavClick(href: string) {
    setMobileOpen(false);
    document.body.style.overflow = '';
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname === '/') {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
          }
        }, 100);
      } else {
        navigate('/', { state: { scrollTo: id } });
      }
    } else {
      navigate(href);
    }
  }

  return (
    <>
      <nav
        className={`navbar-el ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled
            ? '12px clamp(20px, 4vw, 40px)'
            : '24px clamp(20px, 4vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(26,31,46,0.97)' : 'rgba(26,31,46,0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.3)' : 'none',
          transition: 'background 0.5s cubic-bezier(0.16, 1, 0.3, 1), padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), -webkit-backdrop-filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Logo */}
        {(() => {
          const isHomePage = location.pathname === '/';
          const isHeroTop = isHomePage && !scrolled;
          return (
            <Link
              to="/"
              onClick={handleLogoClick}
              style={{
                textDecoration: 'none',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                opacity: 1,
                transform: 'scale(1)',
                transformOrigin: 'left center',
                transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <img
                src={images.logo.url}
                alt={images.logo.alt}
                className={`nav-logo ${scrolled ? 'scrolled' : ''}`}
              />
            </Link>
          );
        })()}

        {/* Center nav pill — hidden on mobile */}
        <div className="nav-pill" style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: 'var(--border-radius-pill)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
        }}>
          {navLinks.map(link => {
            const active = isActive(link.href, location.pathname, activeSection);
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: active ? 'rgba(255,255,255,0.1)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: active ? 'var(--color-primary)' : 'var(--color-white)',
                  fontFamily: 'var(--font-family)',
                  fontSize: '0.9rem',
                  fontWeight: active ? 600 : 400,
                  padding: '10px 20px',
                  borderRadius: 'var(--border-radius-pill)',
                  transition: 'background 0.2s ease, color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLElement).style.background = 'none';
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <div className="phone-link-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="tel:0723868375"
              className="phone-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: 'var(--color-white)',
                textDecoration: 'none',
                fontFamily: 'var(--font-family)',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'color 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-white)')}
            >
              <Phone size={14} color="var(--color-primary)" />
              <span>072-386 83 75</span>
            </a>
          </div>

          <Link
            to="/offert"
            className="offert-btn"
            style={{
              background: 'var(--color-primary)',
              color: '#ffffff',
              fontFamily: 'var(--font-family)',
              fontWeight: 700,
              borderRadius: 'var(--border-radius-pill)',
              padding: '12px 26px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.35)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'var(--color-primary-hover)';
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.5)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'var(--color-primary)';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.35)';
            }}
          >
            <span className="offert-full">Begär offert</span>
            <span className="offert-short">Offert</span>
          </Link>

          {/* Phone icon — shown on mobile only */}
          <div className="mobile-phone-btn" style={{ position: 'relative', display: 'none' }}>
            <a
              href="tel:0723868375"
              aria-label="Ring oss"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--color-white)',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              <Phone size={18} />
            </a>
          </div>

          {/* Hamburger — shown on mobile only */}
          <button
            className="hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Öppna meny"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-white)',
              display: 'none',
              padding: '4px',
              lineHeight: 0,
            }}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          background: 'rgba(20,24,33,0.98)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Stäng meny"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-white)',
            padding: '10px',
            borderRadius: '50%',
            lineHeight: 0,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
        >
          <X size={24} />
        </button>

        {navLinks.map((link, idx) => {
          const active = isActive(link.href, location.pathname, activeSection);
          const delay = idx * 60;
          return (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: active ? 'var(--color-primary)' : 'var(--color-white)',
                fontFamily: 'var(--font-family)',
                fontSize: '1.3rem',
                fontWeight: active ? 700 : 500,
                padding: '8px 32px',
                borderRadius: 'var(--border-radius-pill)',
                letterSpacing: '-0.01em',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease',
                transitionDelay: mobileOpen ? `${delay}ms, ${delay}ms, 0ms` : '0ms',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--color-white)'; }}
            >
              {link.label}
            </button>
          );
        })}

        <Link
          to="/offert"
          onClick={() => setMobileOpen(false)}
          style={{
            marginTop: '16px',
            background: 'var(--color-primary)',
            color: 'var(--color-dark)',
            fontFamily: 'var(--font-family)',
            fontWeight: 700,
            borderRadius: 'var(--border-radius-pill)',
            padding: '14px 48px',
            textDecoration: 'none',
            fontSize: '1rem',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, box-shadow 0.3s ease',
            transitionDelay: mobileOpen ? `${navLinks.length * 60 + 100}ms, ${navLinks.length * 60 + 100}ms, 0ms, 0ms` : '0ms',
          }}
        >
          Begär offert
        </Link>

        {/* Mobile Contact Information */}
        <div style={{
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: mobileOpen ? `${navLinks.length * 60 + 150}ms` : '0ms',
        }}>
          <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Ring oss direkt:
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <a href="tel:0723868375" style={{ color: 'var(--color-white)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} color="var(--color-primary)" /> 072-386 83 75
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .nav-logo {
          height: 84px;
          max-height: 14vh;
          width: auto;
          border-radius: 10px;
          display: block;
          object-fit: contain;
          background-color: #ffffff;
          padding: 6px 14px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-logo.scrolled {
          height: 62px;
        }
        @media (max-width: 1024px) {
          .phone-link { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-pill { display: none !important; }
          .hamburger { display: flex !important; }
          .offert-full { display: none; }
          .offert-short { display: inline; }
          nav.navbar-el { padding: 14px 20px !important; }
          nav.navbar-el.scrolled { padding: 10px 20px !important; }
          .mobile-phone-btn { display: flex !important; align-items: center; }
          .nav-logo {
            height: 60px;
          }
          .nav-logo.scrolled {
            height: 48px;
          }
        }
        @media (min-width: 769px) {
          .offert-short { display: none; }
          .offert-full { display: inline; }
        }
      `}</style>
    </>
  );
}
