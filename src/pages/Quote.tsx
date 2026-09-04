import React, { useState } from 'react';
import { ShieldCheck, Clock, Award, Send } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import FAQAccordion from '../components/FAQAccordion';
import CTABanner from '../components/CTABanner';
import { usePageTitle } from '../hooks/usePageTitle';

const container: React.CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

const faqItems = [
  {
    question: 'Kostar platsbesöket något?',
    answer: 'Nej, platsbesök och offert är alltid kostnadsfritt. Vi besöker din fastighet, mäter höjder, kollar markförutsättningar och tar fram ett tydligt prisförslag helt utan förbindelser.',
  },
  {
    question: 'Hur snabbt kan ni påbörja grävarbetet?',
    answer: 'Det styrs av projektets storlek samt vår nuvarande kapacitet och planering. Mindre jobb kan vi ofta påbörja inom två veckor, medan större grundläggningar planeras in med god framförhållning.',
  },
  {
    question: 'Hur hanterar ni dolda hinder i marken, som berg?',
    answer: 'Vid upptäckt av berg eller andra oväntade markhinder diskuterar vi alltid detta direkt med dig. Vi erbjuder bergssprängning eller hydraulisk spräckning som tillägg och håller kostnaderna transparenta.',
  },
  {
    question: 'Fungerar ROT-avdrag för markarbeten?',
    answer: 'Ja, för arbeten som utförs i nära anslutning till din befintliga bostad, till exempel källardränering eller anslutning av vatten och avlopp. Helt nya husgrunder ger däremot inte rätt till ROT-avdrag.',
  },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  background: '#fafafa',
  fontSize: '0.95rem',
  fontFamily: 'var(--font-family)',
  color: 'var(--color-text-dark)',
  outline: 'none',
  boxSizing: 'border-box',
  marginBottom: '16px',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  display: 'block',
};

function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = 'var(--color-primary)';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(234, 88, 12, 0.15)';
}
function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = '#e5e7eb';
  e.currentTarget.style.boxShadow = 'none';
}

export default function Quote() {
  usePageTitle(
    'Begär offert | MGA Markarbeten AB',
    'Beskriv ditt projekt och begär en kostnadsfri offert för entreprenad- och markarbeten med Habo som utgångspunkt.'
  );
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [phone, setPhone]     = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');

  return (
    <main style={{ fontFamily: 'var(--font-family)' }}>

      {/* ── SECTION A: HERO ───────────────────────────────────── */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url(/hero-main.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '150px',
        paddingBottom: '70px',
        minHeight: '340px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)' }} />
        <div style={{ ...container, position: 'relative', zIndex: 1, width: '100%' }}>
          <div>
            <ScrollReveal animation="blur-in">
              <h1 style={{
                color: 'var(--color-white)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                margin: '0 0 16px 0',
                lineHeight: 1.15,
              }}>
                Begär kostnadsfri offert
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="scale-x-center" delay={150} duration={0.6}>
              <span style={{ display: 'block', width: '60px', height: '3px', background: 'var(--color-primary)', borderRadius: '2px', margin: '14px auto 0' }} />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <p style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '1.05rem',
                maxWidth: '640px',
                margin: '20px auto 0',
                lineHeight: 1.65,
              }}>
                Beskriv ditt projekt nedan så återkommer vi med en kostnadsfri offert och kalkyl inom 24 timmar.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION B: FORM & TRUST ───────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--color-light)' }}>
        <div style={container}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: '48px',
            alignItems: 'start',
          }} className="quote-grid">

            {/* Form */}
            <ScrollReveal animation="fade-right">
              <div style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: 'clamp(24px, 4vw, 40px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              }}>
                <h2 style={{
                  color: 'var(--color-text-dark)',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  margin: '0 0 24px 0',
                }}>
                  Fyll i dina uppgifter
                </h2>

                <form onSubmit={(e) => e.preventDefault()}>
                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                    Namn *
                  </label>
                  <input
                    type="text"
                    placeholder="Ditt för- och efternamn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />

                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                    E-postadress *
                  </label>
                  <input
                    type="email"
                    placeholder="din.epost@doman.se"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />

                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    placeholder="07X-XXX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />

                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                    Typ av tjänst
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  >
                    <option value="">Välj tjänst...</option>
                    <option value="anlaggning">Anläggning</option>
                    <option value="bygg">Bygg</option>
                    <option value="dranering-va">Dränering & V/A</option>
                    <option value="skog">Skog & Trädfällning</option>
                    <option value="annat">Annat projekt</option>
                  </select>

                  <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                    Projektbeskrivning *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Beskriv ditt projekt så detaljerat du kan (t.ex. yta i kvm, adress, önskad starttid)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ ...inputStyle, resize: 'vertical', marginBottom: '24px' }}
                    onFocus={focusInput}
                    onBlur={blurInput}
                    required
                  />

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'var(--color-primary)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'transform 0.2s ease, opacity 0.2s ease',
                    }}
                  >
                    <Send size={18} /> SKICKA OFFERTFÖRFRÅGAN
                  </button>
                </form>
              </div>
            </ScrollReveal>

            {/* Sidebar Trust Items */}
            <ScrollReveal animation="fade-left" delay={150}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Clock size={24} color="var(--color-primary)" />
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                      Svar inom 24 timmar
                    </h3>
                  </div>
                  <p style={{ margin: 0, color: 'var(--color-gray-600)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Vi går igenom dina uppgifter direkt och skickar en tydlig kalkyl utan dolda avgifter.
                  </p>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <ShieldCheck size={24} color="var(--color-primary)" />
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                      ROT-avdrag på fakturan
                    </h3>
                  </div>
                  <p style={{ margin: 0, color: 'var(--color-gray-600)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Vi drar av ROT-avdraget direkt på din faktura när arbetet är berättigat till detta.
                  </p>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <Award size={24} color="var(--color-primary)" />
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                      Trygga villkor
                    </h3>
                  </div>
                  <p style={{ margin: 0, color: 'var(--color-gray-600)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Innehar F-skattsedel, ansvarsförsäkring och lämnar skriftliga garantier på allt utfört arbete.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── SECTION C: FAQ ────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: '#ffffff' }}>
        <div style={container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <ScrollReveal animation="blur-in">
              <h2 style={{
                color: 'var(--color-text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                margin: '0 0 14px 0',
              }}>
                Vanliga frågor inför din offertförfrågan
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="scale-x-center" delay={150} duration={0.6}>
              <span style={{ display: 'block', width: '50px', height: '3px', background: 'var(--color-primary)', borderRadius: '2px', margin: '0 auto 0 auto' }} />
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={200}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <FAQAccordion items={faqItems} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION D: CTA BANNER ─────────────────────────────── */}
      <CTABanner />

      <style>{`
        @media (max-width: 900px) {
          .quote-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
