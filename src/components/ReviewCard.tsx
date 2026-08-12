import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  name: string;
  location: string;
  text: string;
  stars: number;
  date: string;
  authorSub?: string;
}

interface ReviewCardProps {
  review: Review;
}

// Google default avatar colors
const getAvatarColor = (name: string) => {
  const colors = [
    '#4285F4', // Google Blue
    '#EA4335', // Google Red
    '#FBBC05', // Google Yellow
    '#34A853', // Google Green
    '#ab47bc', // Purple
    '#00acc1', // Teal
    '#e06055', // Coral
    '#7986cb', // Indigo
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { name, location, text, stars, date, authorSub } = review;
  const initial = name.charAt(0).toUpperCase();
  const avatarBgColor = getAvatarColor(name);

  return (
    <div 
      className="google-review-card" 
      style={{
        background: '#ffffff',
        border: '1px solid #eaeaea',
        borderRadius: '10px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        textAlign: 'left',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
      }}
    >
      {/* Header: Initial Circle, Name/Details, Google Logo */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Default Google Initials Avatar */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: avatarBgColor,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1.2rem',
            flexShrink: 0,
            userSelect: 'none',
          }}>
            {initial}
          </div>
          <div>
            <h4 style={{ margin: 0, fontWeight: 650, fontSize: '0.95rem', color: '#111827', lineHeight: '1.2' }}>
              {name}
            </h4>
            <p style={{ margin: '3px 0 0 0', fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>
              {authorSub ?? `${location}, Sverige`}
            </p>
          </div>
        </div>

        {/* Google G Logo */}
        <div style={{ flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.13h4.01c2.34-2.16 3.69-5.32 3.69-8.75z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-4.01-3.13c-1.11.75-2.53 1.19-3.95 1.19-3.04 0-5.61-2.05-6.53-4.82H1.31v3.23A12 12 0 0 0 12 24z"/>
            <path fill="#FBBC05" d="M5.47 14.33A7.16 7.16 0 0 1 5 12c0-.8.14-1.58.39-2.33V6.44H1.31A11.96 11.96 0 0 0 0 12c0 2.05.52 4 1.31 5.67l4.16-3.34z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.22 0 12 0A12 12 0 0 0 1.31 6.44l4.16 3.23a7.18 7.18 0 0 1 6.53-4.92z"/>
          </svg>
        </div>
      </div>

      {/* Stars & Relative Date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '2px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < stars ? '#FBBC05' : 'none'}
              color={i < stars ? '#FBBC05' : '#d1d5db'}
              strokeWidth={i < stars ? 1 : 2}
            />
          ))}
        </div>
        <span style={{ fontSize: '0.75rem', color: '#888888' }}>
          {date}
        </span>
      </div>

      {/* Review Text */}
      <p style={{
        margin: 0,
        fontSize: '0.875rem',
        lineHeight: '1.6',
        color: '#4b5563',
        fontWeight: 400,
      }}>
        {text}
      </p>
    </div>
  );
};

export default ReviewCard;
