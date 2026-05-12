'use client';

import React from 'react';

export const GradCap = ({ className = 'w-20 h-20' }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cap1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0F2C59" />
        <stop offset="100%" stopColor="#1E3A6E" />
      </linearGradient>
    </defs>
    <path d="M60 25 L15 45 L60 65 L105 45 Z" fill="url(#cap1)" />
    <path d="M30 52 V70 Q60 85 90 70 V52" fill="url(#cap1)" opacity="0.85" />
    <rect x="58" y="45" width="4" height="28" fill="#E5B73B" />
    <circle cx="60" cy="73" r="5" fill="#E5B73B" />
    <path d="M60 73 Q70 80 75 90" stroke="#E5B73B" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="75" cy="92" r="3" fill="#E5B73B" />
  </svg>
);

export const Diploma = ({ className = 'w-20 h-20' }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="35" width="80" height="55" rx="3" fill="#FFF8E7" stroke="#E5B73B" strokeWidth="2" />
    <line x1="32" y1="50" x2="88" y2="50" stroke="#0F2C59" strokeWidth="1.5" />
    <line x1="32" y1="60" x2="78" y2="60" stroke="#0F2C59" strokeWidth="1.5" />
    <line x1="32" y1="70" x2="82" y2="70" stroke="#0F2C59" strokeWidth="1.5" />
    <circle cx="85" cy="80" r="8" fill="#E5B73B" />
    <path d="M82 78 L85 81 L89 76" stroke="#0F2C59" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M30 88 Q35 100 25 105" stroke="#E5B73B" strokeWidth="3" fill="none" />
    <path d="M90 88 Q85 100 95 105" stroke="#E5B73B" strokeWidth="3" fill="none" />
  </svg>
);

export const BookStack = ({ className = 'w-20 h-20' }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="75" width="80" height="15" rx="2" fill="#E5B73B" />
    <rect x="22" y="78" width="76" height="3" fill="#FFF8E7" opacity="0.7" />
    <rect x="25" y="58" width="70" height="17" rx="2" fill="#0F2C59" />
    <rect x="27" y="62" width="66" height="3" fill="#E5B73B" opacity="0.6" />
    <rect x="30" y="40" width="60" height="18" rx="2" fill="#3B5998" />
    <text x="60" y="53" textAnchor="middle" fontSize="10" fill="#FFF8E7" fontWeight="bold">2026</text>
    <circle cx="60" cy="30" r="6" fill="#E5B73B" />
    <path d="M55 30 L60 25 L65 30 L60 35 Z" fill="#FFF8E7" />
  </svg>
);

export const Pencil = ({ className = 'w-20 h-20' }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-30 60 60)">
      <rect x="35" y="55" width="55" height="12" fill="#E5B73B" />
      <rect x="35" y="55" width="55" height="3" fill="#FFF8E7" opacity="0.5" />
      <polygon points="90,55 105,61 90,67" fill="#FFF8E7" stroke="#0F2C59" strokeWidth="1.5" />
      <polygon points="100,58 105,61 100,64" fill="#1a1a1a" />
      <rect x="25" y="55" width="12" height="12" fill="#FB7185" />
      <rect x="22" y="55" width="3" height="12" fill="#0F2C59" />
    </g>
  </svg>
);

export const Backpack = ({ className = 'w-20 h-20' }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 35 Q40 25 60 25 Q80 25 80 35" stroke="#0F2C59" strokeWidth="3" fill="none" />
    <rect x="30" y="35" width="60" height="65" rx="12" fill="#0F2C59" />
    <rect x="35" y="55" width="50" height="25" rx="4" fill="#E5B73B" />
    <rect x="38" y="58" width="44" height="3" fill="#FFF8E7" opacity="0.4" />
    <circle cx="60" cy="68" r="3" fill="#0F2C59" />
    <path d="M48 88 L48 100 M72 88 L72 100" stroke="#E5B73B" strokeWidth="2" />
  </svg>
);

export const Star = ({
  className = 'w-8 h-8',
  color = '#E5B73B',
  style,
}: {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg viewBox="0 0 24 24" className={className} fill={color} style={style}>
    <path d="M12 2 L14.5 9 L22 9.5 L16 14.5 L18 22 L12 17.5 L6 22 L8 14.5 L2 9.5 L9.5 9 Z" />
  </svg>
);

export const Confetti = ({ className = 'w-full h-full' }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="40" width="8" height="3" fill="#E5B73B" transform="rotate(30 54 41)" />
    <rect x="120" y="80" width="6" height="3" fill="#FB7185" transform="rotate(-20 123 81)" />
    <rect x="200" y="30" width="8" height="3" fill="#0F2C59" transform="rotate(45 204 31)" />
    <rect x="320" y="60" width="6" height="3" fill="#E5B73B" transform="rotate(-30 323 61)" />
    <rect x="80" y="160" width="6" height="3" fill="#FB7185" transform="rotate(60 83 161)" />
    <rect x="280" y="180" width="8" height="3" fill="#0F2C59" transform="rotate(-45 284 181)" />
    <rect x="350" y="220" width="6" height="3" fill="#E5B73B" transform="rotate(20 353 221)" />
    <rect x="40" y="280" width="8" height="3" fill="#0F2C59" transform="rotate(-30 44 281)" />
    <rect x="180" y="340" width="6" height="3" fill="#FB7185" transform="rotate(45 183 341)" />
    <rect x="300" y="320" width="8" height="3" fill="#E5B73B" transform="rotate(-60 304 321)" />
    <circle cx="60" cy="120" r="3" fill="#FB7185" />
    <circle cx="220" cy="100" r="2.5" fill="#E5B73B" />
    <circle cx="340" cy="140" r="3" fill="#0F2C59" />
    <circle cx="100" cy="240" r="2.5" fill="#E5B73B" />
    <circle cx="260" cy="260" r="3" fill="#FB7185" />
    <circle cx="150" cy="300" r="2.5" fill="#0F2C59" />
  </svg>
);

export const ScrollRibbon = ({ className = 'w-full' }: { className?: string }) => (
  <svg viewBox="0 0 300 60" className={className} fill="none">
    <path d="M10 20 Q150 0 290 20 L290 40 Q150 60 10 40 Z" fill="#E5B73B" />
    <path d="M10 20 Q150 5 290 20" stroke="#FFF8E7" strokeWidth="1" opacity="0.6" />
  </svg>
);

/**
 * Hero cluster - a styled arrangement of yearbook icons
 */
export const YearbookHeroCluster = () => (
  <div className="relative w-full h-72 sm:h-96 pointer-events-none select-none" aria-hidden>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-72 h-72">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-float">
          <GradCap className="w-32 h-32 drop-shadow-2xl" />
        </div>
        <div className="absolute bottom-2 left-0 animate-float-slow">
          <BookStack className="w-24 h-24 drop-shadow-xl" />
        </div>
        <div className="absolute bottom-4 right-0 animate-float" style={{ animationDelay: '1s' }}>
          <Diploma className="w-24 h-24 drop-shadow-xl" />
        </div>
        <div className="absolute top-16 -left-4 animate-float-slow" style={{ animationDelay: '2s' }}>
          <Pencil className="w-20 h-20 drop-shadow-lg" />
        </div>
        <div className="absolute top-12 -right-4 animate-float" style={{ animationDelay: '0.5s' }}>
          <Backpack className="w-20 h-20 drop-shadow-lg" />
        </div>
        <Star className="absolute top-4 left-8 w-4 h-4 animate-sparkle" />
        <Star className="absolute top-24 right-12 w-5 h-5 animate-sparkle" color="#FB7185" />
        <Star className="absolute bottom-12 left-12 w-3 h-3 animate-sparkle" style={{ animationDelay: '1s' }} />
        <Star className="absolute top-40 left-32 w-4 h-4 animate-sparkle" color="#FB7185" />
      </div>
    </div>
  </div>
);
