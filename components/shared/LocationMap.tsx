'use client';

import { MapPin, Navigation } from 'lucide-react';

interface Props {
  location: string;
  lat?: number;
  lng?: number;
  accent?: string;
  textOnDark?: boolean;
}

export default function LocationMap({ location, lat, lng, accent = '#E5B73B', textOnDark = true }: Props) {
  const query = encodeURIComponent(location);
  const directionUrl =
    lat && lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${query}`;

  const dim = textOnDark ? 'text-white/70' : 'text-gray-600';
  const strong = textOnDark ? 'text-white' : 'text-gray-900';

  return (
    <div
      className="rounded-3xl overflow-hidden border backdrop-blur-md"
      style={{
        backgroundColor: textOnDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
        borderColor: textOnDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
      }}
    >
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ background: `linear-gradient(to right, ${accent}cc, ${accent}88)` }}
      >
        <div className="flex items-center gap-2 text-white">
          <MapPin className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">Địa điểm</span>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-start gap-3">
          <span
            className="shrink-0 mt-0.5 w-9 h-9 rounded-full ring-4 flex items-center justify-center"
            style={{ backgroundColor: accent, boxShadow: `0 0 0 4px ${textOnDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)'}` }}
          >
            <MapPin className="w-5 h-5 text-white" />
          </span>
          <div className="flex-1 min-w-0">
            <p className={`text-[11px] uppercase tracking-widest ${dim}`}>Tới địa điểm</p>
            <p className={`text-base font-semibold leading-snug mt-0.5 ${strong}`}>{location}</p>
          </div>
        </div>

        <a
          href={directionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-transform active:scale-95"
          style={{ backgroundColor: accent }}
        >
          <Navigation className="w-4 h-4" />
          Chỉ đường qua Google Maps
        </a>
      </div>
    </div>
  );
}
