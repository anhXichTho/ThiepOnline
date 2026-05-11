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
  const mapSrc =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}&hl=vi&z=15&output=embed`
      : `https://www.google.com/maps?q=${query}&hl=vi&z=14&output=embed`;
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

      <div className="relative h-64 sm:h-72 bg-gray-200">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative">
            <span
              className="absolute -inset-3 rounded-full animate-ping opacity-50"
              style={{ backgroundColor: accent }}
            />
            <span
              className="relative block w-7 h-7 rounded-full ring-4 ring-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: accent }}
            >
              <MapPin className="w-4 h-4 text-white" />
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <p className={`text-xs uppercase tracking-widest ${dim}`}>Tới địa điểm</p>
        <p className={`text-base font-semibold ${strong} mt-1 line-clamp-2`}>{location}</p>
        <a
          href={directionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform active:scale-95"
          style={{ backgroundColor: accent }}
        >
          <Navigation className="w-4 h-4" />
          Chỉ đường
        </a>
      </div>
    </div>
  );
}
