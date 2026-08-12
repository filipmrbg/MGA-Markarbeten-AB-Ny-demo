import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  dark?: boolean;
}

function AccordionItem({
  item,
  open,
  onToggle,
  dark,
}: {
  item: FAQItem;
  open: boolean;
  onToggle: () => void;
  dark: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        background: dark ? 'rgba(255,255,255,0.05)' : 'var(--color-white)',
        borderRadius: 'var(--border-radius-md)',
        padding: '22px 28px',
        marginBottom: '10px',
        cursor: 'pointer',
        borderLeft: open ? '3px solid var(--color-primary)' : '3px solid transparent',
        transform: open ? 'scale(1.01)' : 'scale(1)',
        transition: 'border-color 0.25s ease, background 0.25s ease, transform 0.25s ease',
        boxShadow: dark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
      onClick={onToggle}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>
        <span style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 600,
          fontSize: '1rem',
          color: dark ? 'var(--color-white)' : 'var(--color-text-dark)',
          lineHeight: 1.4,
        }}>
          {item.question}
        </span>
        <ArrowRight
          size={18}
          style={{
            color: 'var(--color-primary)',
            flexShrink: 0,
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </div>

      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? (contentRef.current?.scrollHeight ?? 500) + 'px' : '0px',
          transition: 'max-height 0.4s ease',
        }}
      >
        <div ref={contentRef} style={{ paddingTop: '14px' }}>
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-family)',
            fontSize: '0.93rem',
            lineHeight: 1.75,
            color: dark ? 'var(--color-text-light)' : 'var(--color-gray-600)',
          }}>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion({ items, title, subtitle, buttonText, buttonLink, dark = false }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const hasLeftSidebar = Boolean(title || subtitle || buttonText);

  if (!hasLeftSidebar) {
    return (
      <div style={{ width: '100%', fontFamily: 'var(--font-family)' }}>
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            dark={dark}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '40% 60%',
        gap: '60px',
        alignItems: 'start',
        fontFamily: 'var(--font-family)',
      }}
      className="faq-grid"
    >
      {/* Left */}
      <div>
        {title && (
          <h2 style={{
            color: dark ? 'var(--color-white)' : 'var(--color-text-dark)',
            fontWeight: 800,
            fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
            lineHeight: 1.2,
            margin: '0 0 16px 0',
          }}>
            {title}
          </h2>
        )}
        {subtitle && (
          <p style={{
            color: dark ? 'var(--color-text-light)' : 'var(--color-gray-600)',
            lineHeight: 1.75,
            margin: '0 0 32px 0',
            fontSize: '0.95rem',
          }}>
            {subtitle}
          </p>
        )}
        {buttonText && (
          <Button variant={dark ? 'primary' : 'dark'} href={buttonLink}>
            {buttonText}
          </Button>
        )}
      </div>

      {/* Right */}
      <div>
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            dark={dark}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
