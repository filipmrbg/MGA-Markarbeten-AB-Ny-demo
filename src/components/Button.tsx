import { ReactNode, MouseEventHandler, CSSProperties } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'dark';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
}

const sizeStyles: Record<Size, CSSProperties> = {
  sm: { padding: '10px 24px', fontSize: '0.85rem' },
  md: { padding: '14px 32px', fontSize: '0.95rem' },
  lg: { padding: '16px 40px', fontSize: '1.05rem' },
};

const variantStyles: Record<Variant, CSSProperties> = {
  primary: {
    background: 'var(--color-primary)',
    color: '#ffffff',
    fontWeight: 700,
    border: '2px solid transparent',
  },
  outline: {
    background: 'transparent',
    color: 'var(--color-white)',
    border: '2px solid var(--color-white)',
  },
  dark: {
    background: 'var(--color-dark)',
    color: 'var(--color-white)',
    border: '2px solid transparent',
  },
};

const base: CSSProperties = {
  borderRadius: 'var(--border-radius-pill)',
  cursor: 'pointer',
  fontFamily: 'var(--font-family)',
  fontWeight: 600,
  display: 'inline-block',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  lineHeight: 1,
};

function handleMouseEnter(e: React.MouseEvent<HTMLElement>, variant: Variant) {
  const el = e.currentTarget as HTMLElement;
  el.style.transform = 'translateY(-2px)';
  if (variant === 'primary') {
    el.style.background = 'var(--color-primary-hover)';
    el.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.45)';
  } else {
    el.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.2)';
  }
}

function handleMouseLeave(e: React.MouseEvent<HTMLElement>, variant: Variant) {
  const el = e.currentTarget as HTMLElement;
  el.style.transform = 'translateY(0)';
  el.style.boxShadow = 'none';
  if (variant === 'primary') {
    el.style.background = 'var(--color-primary)';
  }
}

export default function Button({ variant = 'primary', size = 'md', children, href, onClick }: Props) {
  const style: CSSProperties = {
    ...base,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  // Internal route
  if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
    return (
      <Link
        to={href}
        style={style}
        onClick={onClick}
        onMouseEnter={e => handleMouseEnter(e, variant)}
        onMouseLeave={e => handleMouseLeave(e, variant)}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        style={style}
        onClick={onClick}
        onMouseEnter={e => handleMouseEnter(e, variant)}
        onMouseLeave={e => handleMouseLeave(e, variant)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      style={{ ...style, outline: 'none', border: variantStyles[variant].border }}
      onClick={onClick}
      onMouseEnter={e => handleMouseEnter(e, variant)}
      onMouseLeave={e => handleMouseLeave(e, variant)}
    >
      {children}
    </button>
  );
}
