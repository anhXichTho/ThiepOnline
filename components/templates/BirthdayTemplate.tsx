'use client';

import { motion } from 'framer-motion';
import { Cake, PartyPopper } from 'lucide-react';
import type { TemplateProps } from './types';
import Countdown from '@/components/shared/Countdown';
import EventCalendar from '@/components/shared/EventCalendar';
import LocationMap from '@/components/shared/LocationMap';
import RsvpForm from '@/components/shared/RsvpForm';

export default function BirthdayTemplate({ content, imageUrl, gallery, cardId, preview }: TemplateProps) {
  const v: string = (content as any).__templateId || 'bd-fun';
  const themes: Record<string, { bg: string; accent: string; fg: string; sub: string; onDark: boolean }> = {
    'bd-fun': {
      bg: 'linear-gradient(180deg,#7C3AED 0%,#EC4899 60%,#FB7185 100%)',
      accent: '#FBBF24',
      fg: '#FFFFFF',
      sub: 'rgba(255,255,255,0.85)',
      onDark: true,
    },
    'bd-elegant': {
      bg: 'linear-gradient(180deg,#1F2937 0%,#111827 60%,#0F172A 100%)',
      accent: '#FBBF24',
      fg: '#FFF8E7',
      sub: 'rgba(255,248,231,0.75)',
      onDark: true,
    },
    'bd-kid': {
      bg: 'linear-gradient(180deg,#FCE7F3 0%,#DBEAFE 50%,#FEF3C7 100%)',
      accent: '#7C3AED',
      fg: '#3730A3',
      sub: '#6366F1',
      onDark: false,
    },
  };
  const theme = themes[v] ?? themes['bd-fun'];

  return (
    <div className="min-h-screen w-full" style={{ background: theme.bg }}>
      <div className="relative max-w-md mx-auto px-5 pt-10 pb-16">
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: theme.accent, color: '#000' }}
          >
            <PartyPopper className="w-3.5 h-3.5" />
            TIỆC SINH NHẬT
          </div>

          <motion.div
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="mt-6"
          >
            <Cake className="w-24 h-24 mx-auto drop-shadow-2xl" style={{ color: theme.accent }} />
          </motion.div>

          <h1 className="mt-4 font-serif text-5xl font-bold" style={{ color: theme.fg }}>
            {content.title || 'Happy Birthday'}
          </h1>
          <p className="mt-3 text-2xl font-bold" style={{ color: theme.accent }}>
            {content.hostName}
          </p>
        </motion.section>

        {imageUrl && (
          <div className="mt-6 flex justify-center">
            <img
              src={imageUrl}
              alt={content.hostName}
              className="w-48 h-48 object-cover rounded-full border-4 shadow-2xl"
              style={{ borderColor: theme.accent }}
            />
          </div>
        )}

        {content.eventDate && (
          <section className="mt-8">
            <Countdown targetDate={content.eventDate} accentColor={theme.accent} labelColor={theme.fg} />
          </section>
        )}

        {content.eventDate && (
          <section className="mt-6">
            <EventCalendar date={content.eventDate} time={content.eventTime} accent={theme.accent} textOnDark={theme.onDark} />
          </section>
        )}

        {content.location && (
          <section className="mt-6">
            <LocationMap location={content.location} lat={content.locationLat} lng={content.locationLng} accent={theme.accent} textOnDark={theme.onDark} />
          </section>
        )}

        {content.message && (
          <section className="mt-8 text-center">
            <p className="font-serif italic text-lg" style={{ color: theme.sub }}>
              "{content.message}"
            </p>
          </section>
        )}

        {gallery && gallery.length > 0 && (
          <section className="mt-8 grid grid-cols-2 gap-3">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt="" className="aspect-square w-full object-cover rounded-2xl border-2"
                style={{ borderColor: theme.accent }}
              />
            ))}
          </section>
        )}

        {!preview && cardId && (
          <section className="mt-8">
            <RsvpForm cardId={cardId} accent={theme.accent} textOnDark={theme.onDark} />
          </section>
        )}
      </div>
    </div>
  );
}
