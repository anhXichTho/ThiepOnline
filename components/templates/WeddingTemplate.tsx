'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { TemplateProps } from './types';
import Countdown from '@/components/shared/Countdown';
import EventCalendar from '@/components/shared/EventCalendar';
import LocationMap from '@/components/shared/LocationMap';
import RsvpForm from '@/components/shared/RsvpForm';

export default function WeddingTemplate({ content, imageUrl, gallery, cardId, preview }: TemplateProps) {
  const v: string = (content as any).__templateId || 'wd-rose';
  const themes: Record<string, { bg: string; accent: string; fg: string; sub: string; onDark: boolean }> = {
    'wd-rose': {
      bg: 'linear-gradient(180deg,#FFF5EE 0%,#F8C8D8 60%,#FAD0C9 100%)',
      accent: '#E8A0BF',
      fg: '#5B2A47',
      sub: '#7C2D4A',
      onDark: false,
    },
    'wd-modern': {
      bg: 'linear-gradient(180deg,#FFFFFF 0%,#FFF5EE 100%)',
      accent: '#D4A5A5',
      fg: '#2D2D2D',
      sub: '#6B7280',
      onDark: false,
    },
    'wd-floral': {
      bg: 'linear-gradient(180deg,#FAD0C9 0%,#F8C8D8 50%,#F0B7D4 100%)',
      accent: '#B45D7E',
      fg: '#5B2A47',
      sub: '#7C2D4A',
      onDark: false,
    },
  };
  const theme = themes[v] ?? themes['wd-rose'];

  return (
    <div className="min-h-screen w-full" style={{ background: theme.bg }}>
      <div className="relative max-w-md mx-auto px-5 pt-10 pb-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
            style={{ borderColor: theme.accent, color: theme.accent }}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            TRÂN TRỌNG KÍNH MỜI
          </div>

          {imageUrl && (
            <div className="mt-6 flex justify-center">
              <img
                src={imageUrl}
                alt={content.hostName}
                className="w-56 h-72 object-cover rounded-t-full border-4"
                style={{ borderColor: theme.accent }}
              />
            </div>
          )}

          <h1 className="mt-6 font-serif text-5xl font-bold leading-tight" style={{ color: theme.fg }}>
            {content.title || 'Lễ Thành Hôn'}
          </h1>

          <p className="mt-3 text-2xl font-semibold" style={{ color: theme.accent }}>
            {content.hostName}
          </p>
          {content.guestName && (
            <p className="mt-1 text-sm" style={{ color: theme.sub }}>
              Trân trọng kính mời: {content.guestName}
            </p>
          )}
        </motion.section>

        {content.eventDate && (
          <section className="mt-8">
            <p className="text-center text-xs uppercase tracking-widest mb-3" style={{ color: theme.sub }}>
              Đếm ngược ngày trọng đại
            </p>
            <div className="rounded-3xl p-4" style={{ backgroundColor: `${theme.accent}20` }}>
              <Countdown targetDate={content.eventDate} accentColor={theme.accent} labelColor={theme.fg} />
            </div>
          </section>
        )}

        {content.eventDate && (
          <section className="mt-6">
            <EventCalendar date={content.eventDate} time={content.eventTime} accent={theme.accent} textOnDark={false} />
          </section>
        )}

        {content.location && (
          <section className="mt-6">
            <LocationMap location={content.location} lat={content.locationLat} lng={content.locationLng} accent={theme.accent} textOnDark={false} />
          </section>
        )}

        {content.message && (
          <section className="mt-8 text-center">
            <Heart className="w-6 h-6 mx-auto mb-3 fill-current" style={{ color: theme.accent }} />
            <p className="font-serif italic text-lg leading-relaxed" style={{ color: theme.sub }}>
              "{content.message}"
            </p>
          </section>
        )}

        {gallery && gallery.length > 0 && (
          <section className="mt-8 grid grid-cols-2 gap-3">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt="" className="aspect-square w-full object-cover rounded-2xl" />
            ))}
          </section>
        )}

        {!preview && cardId && (
          <section className="mt-8">
            <RsvpForm cardId={cardId} accent={theme.accent} textOnDark={false} />
          </section>
        )}
      </div>
    </div>
  );
}
