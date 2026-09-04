import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import images from '../data/images';
import services from '../data/services';

const navLinks = [
  { label: 'Hem', href: '/' },
  { label: 'Tjänster', href: '/tjanster', hasDropdown: true },
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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  // Close mobile menu & dropdown on route change
  useEffect(() => {
    setMobileOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  function handleLogoClick(e: React.MouseEvent) {
    setMobileOpen(false);
    setIsServicesOpen(false);
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
    setIsServicesOpen(false);
    document.body.style.overflow = '';

    if (href.includes('#')) {
      const [path, hashId] = href.split('#');
      if (location.pathname === path) {
        const el = document.getElementById(hashId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
          window.history.pushState(null, '', `#${hashId}`);
        }
      } else {
        navigate(href);
      }
    } else if (href.startsWith('/#')) {
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
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
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

            if (link.hasDropdown) {
              return (
                <div
                  key={link.href}
                  className="nav-dropdown-wrapper"
                  style={{ position: 'relative' }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      background: active || isServicesOpen ? 'rgba(255,255,255,0.1)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: active || isServicesOpen ? 'var(--color-primary)' : 'var(--color-white)',
                      fontFamily: 'var(--font-family)',
                      fontSize: '0.9rem',
                      fontWeight: active || isServicesOpen ? 600 : 400,
                      padding: '10px 18px',
                      borderRadius: 'var(--border-radius-pill)',
                      transition: 'background 0.2s ease, color 0.2s ease',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={13}
                      style={{
                        transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        opacity: 0.8,
                      }}
                    />
                  </button>

                  {/* Clean Dropdown */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      left: '50%',
                      transform: isServicesOpen
                        ? 'translateX(-50%) translateY(0)'
                        : 'translateX(-50%) translateY(-6px)',
                      opacity: isServicesOpen ? 1 : 0,
                      pointerEvents: isServicesOpen ? 'auto' : 'none',
                      transition: 'opacity 0.18s ease, transform 0.18s ease',
                      zIndex: 1100,
                      minWidth: '180px',
                      background: 'rgba(24, 29, 42, 0.96)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '14px',
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
                      padding: '6px',
                    }}
                  >
                    {services.map(svc => (
                      <button
                        key={svc.slug}
                        onClick={() => handleNavClick(svc.href)}
                        style={{
                          width: '100%',
                          display: 'block',
                          textAlign: 'left',
                          padding: '9px 14px',
                          borderRadius: '8px',
                          background: 'none',
                          border: 'none',
                          color: '#ffffff',
                          fontFamily: 'var(--font-family)',
                          fontSize: '0.88rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'background 0.15s ease, color 0.15s ease',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'rgba(255, 255, 255, 0.08)';
                          el.style.color = 'var(--color-primary)';
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = 'none';
                          el.style.color = '#ffffff';
                        }}
                      >
                        {svc.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

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
              href="tel:0761778570"
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
              <span>076-177 85 70</span>
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
              boxShadow: '0 4px 16px rgba(234, 88, 12, 0.35)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'var(--color-primary-hover)';
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 8px 24px rgba(234, 88, 12, 0.5)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'var(--color-primary)';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 4px 16px rgba(234, 88, 12, 0.35)';
            }}
          >
            <span className="offert-full">Begär offert</span>
            <span className="offert-short">Offert</span>
          </Link>

          {/* Phone icon — shown on mobile only */}
          <div className="mobile-phone-btn" style={{ position: 'relative', display: 'none' }}>
            <a
              href="tel:0761778570"
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
          gap: '20px',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
          overflowY: 'auto',
          padding: '40px 20px',
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
            marginTop: '12px',
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
          marginTop: '12px',
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
            <a href="tel:0761778570" style={{ color: 'var(--color-white)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} color="var(--color-primary)" /> 076-177 85 70
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .nav-dropdown-wrapper::after {
          content: '';
          position: absolute;
          top: 100%;
          left: -15px;
          right: -15px;
          height: 15px;
        }
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
          .offert-btn { display: none !important; }
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

