import { useState } from 'react';
import { Phone, MapPin, Mail, Send } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import FAQAccordion from '../components/FAQAccordion';
import SocialFollowBanner from '../components/SocialFollowBanner';
import CTABanner from '../components/CTABanner';
import { usePageTitle } from '../hooks/usePageTitle';

const container: React.CSSProperties = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 clamp(20px, 5vw, 40px)',
};

const faqItems = [
  {
    question: 'Arbetar ni med ROT-avdrag?',
    answer: 'Ja, vi hanterar ROT-avdrag och ser till att faktureringen sker korrekt. Arbeten som dränering och inkoppling av VA till befintliga hus berättigar till avdraget.',
  },
  {
    question: 'Hur lång tid tar det att få ett prisförslag?',
    answer: 'Vi brukar återkomma med en offert inom 1 till 3 arbetsdagar efter platsbesöket, beroende på projektets omfattning.',
  },
  {
    question: 'Tar ni på er jobb utanför Habo?',
    answer: 'Habo är vår utgångspunkt, men vi kan ta uppdrag i närliggande områden vid större projekt. Hör av dig så berättar vi mer.',
  },
  {
    question: 'Kan jag boka ett platsbesök direkt?',
    answer: 'Absolut! Skicka ett meddelande via formuläret eller ring oss, så bokar vi in ett kostnadsfritt platsbesök som passar dig.',
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

export default function Contact() {
  usePageTitle(
    'Kontakta MGA Markarbeten AB | Offert & Rådgivning',
    'Hör av dig till MGA Markarbeten AB för frågor, kostnadsfria platsbesök eller offert gällande ditt nästa entreprenad- och markprojekt med Habo som utgångspunkt.'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ name, email, phone, service, message, source: 'kontakt' }),
      });
      if (!response.ok) {
        setStatus('error');
        return;
      }
      const data = await response.json();
      if (data.error) {
        setStatus('error');
        return;
      }
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <main style={{ fontFamily: 'var(--font-family)' }}>

      {/* ── SECTION A: HERO ───────────────────────────────────── */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url(/hero-contact-mj.webp)',
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
                Kontakta oss
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', margin: 0 }}>
                Vi återkopplar så snart vi har möjlighet. Kostnadsfritt platsbesök ingår alltid.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION B: CONTACT CONTENT ────────────────────────── */}
      <section style={{ background: 'var(--color-light)', padding: '80px 0' }}>
        <div style={container}>
          <div className="contact-grid" style={{
            display: 'grid',
            gridTemplateColumns: '45% 55%',
            gap: '60px',
            alignItems: 'start',
          }}>

            {/* Left: info */}
            <ScrollReveal animation="fade-right" duration={0.8}>
              <h2 style={{
                color: 'var(--color-text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                margin: '0 0 20px 0',
                lineHeight: 1.2,
              }}>
                Så når du oss
              </h2>
              <p style={{ color: 'var(--color-gray-600)', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                Du kan nå oss via formuläret, telefon eller e-post. Oavsett om det gäller ett stort eller litet entreprenad- eller markarbete hjälper vi dig gärna.
              </p>

              <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    background: 'rgba(234, 88, 12, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Phone size={22} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>
                      Telefon
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <a
                        href="tel:0761778570"
                        style={{ color: 'var(--color-gray-600)', fontSize: '0.95rem', textDecoration: 'none', lineHeight: 1.5, transition: 'color 0.2s ease' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-gray-600)')}
                      >
                        076-177 85 70
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    background: 'rgba(234, 88, 12, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <MapPin size={22} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>
                      Plats / Utgångspunkt
                    </p>
                    <p style={{ margin: 0, color: 'var(--color-gray-600)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                      Habo som utgångspunkt
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    background: 'rgba(234, 88, 12, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Mail size={22} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>
                      E-post
                    </p>
                    <a
                      href="mailto:mattias@mgamark.se"
                      style={{ color: 'var(--color-gray-600)', fontSize: '0.95rem', textDecoration: 'none', lineHeight: 1.5, transition: 'color 0.2s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-gray-600)')}
                    >
                      mattias@mgamark.se
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: form */}
            <ScrollReveal animation="fade-left" duration={0.8} delay={100}>
              <h2 style={{
                color: 'var(--color-text-dark)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                margin: '0 0 24px 0',
                lineHeight: 1.2,
              }}>
                Begär offert
              </h2>
              <div style={{
                background: 'var(--color-white)',
                padding: '40px',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}>
                <form onSubmit={handleSubmit}>
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
                    <option value="skog">Skog</option>
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
                  {status === 'sending' && (
                    <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--color-gray-600)', textAlign: 'center' }}>
                      Skickar...
                    </p>
                  )}
                  {status === 'success' && (
                    <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#16a34a', fontWeight: 600, textAlign: 'center' }}>
                      Tack! Din offertförfrågan har skickats. Vi återkommer så snart vi kan.
                    </p>
                  )}
                  {status === 'error' && (
                    <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#dc2626', fontWeight: 600, textAlign: 'center' }}>
                      Något gick fel. Försök igen eller ring oss direkt på 076-177 85 70.
                    </p>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION C: FAQ ────────────────────────────────────── */}
      <section style={{ background: 'var(--color-dark)', padding: '100px 0' }}>
        <div style={container}>
          <FAQAccordion
            dark={true}
            items={faqItems}
            title="Vanliga frågor"
            subtitle="Svar på det vi ofta får höra. Hittar du inte svaret, ring oss gärna direkt!"
            buttonText="Skicka meddelande"
            buttonLink="/kontakt"
          />
        </div>
      </section>

      {/* ── SECTION D: SOCIAL FOLLOW DIVIDER ──────────────────── */}
      <SocialFollowBanner />

      <CTABanner />

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
}
