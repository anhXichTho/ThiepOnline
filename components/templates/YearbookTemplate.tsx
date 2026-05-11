'use client';

import { motion } from 'framer-motion';
import { Sparkles, Users, GraduationCap } from 'lucide-react';
import type { TemplateProps } from './types';
import { YearbookHeroCluster, Confetti, GradCap, Diploma, BookStack, Star } from '@/components/decorations/YearbookDecorations';
import Countdown from '@/components/shared/Countdown';
import EventCalendar from '@/components/shared/EventCalendar';
import LocationMap from '@/components/shared/LocationMap';
import RsvpForm from '@/components/shared/RsvpForm';

export default function YearbookTemplate({ content, imageUrl, gallery, cardId, preview }: TemplateProps) {
  const id = (content as any).__templateId || 'yb-classic';
  return <YearbookClassic content={content} imageUrl={imageUrl} gallery={gallery} cardId={cardId} preview={preview} variant={id} />;
}

interface VariantProps extends TemplateProps {
  variant: string;
}

function YearbookClassic({ content, imageUrl, gallery, cardId, preview, variant }: VariantProps) {
  const v: string = variant || 'yb-classic';

  const themes: Record<string, { bg: string; accent: string; fg: string; sub: string; onDark: boolean }> = {
    'yb-classic': {
      bg: 'linear-gradient(180deg,#0F2C59 0%,#152A4A 60%,#0F2C59 100%)',
      accent: '#E5B73B',
      fg: '#FFF8E7',
      sub: 'rgba(255,248,231,0.75)',
      onDark: true,
    },
    'yb-modern': {
      bg: 'linear-gradient(180deg,#FFF8E7 0%,#FEF3C7 30%,#FED7AA 100%)',
      accent: '#0F2C59',
      fg: '#0F2C59',
      sub: '#1E3A6E',
      onDark: false,
    },
    'yb-memory': {
      bg: 'linear-gradient(180deg,#FEF3C7 0%,#FDE68A 50%,#FCD34D 100%)',
      accent: '#92400E',
      fg: '#7C2D12',
      sub: '#92400E',
      onDark: false,
    },
  };
  const theme = themes[v] ?? themes['yb-classic'];

  return (
    <div className="min-h-screen w-full relative paper-texture" style={{ background: theme.bg }}>
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <Confetti />
      </div>

      <div className="relative max-w-md mx-auto px-5 pt-8 pb-16">
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border"
            style={{
              backgroundColor: `${theme.accent}25`,
              borderColor: `${theme.accent}60`,
              color: theme.accent,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            THIỆP MỜI KỶ YẾU
          </div>

          <YearbookHeroCluster />

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl font-bold leading-tight mt-2"
            style={{ color: theme.fg }}
          >
            {content.title || 'Đêm Kỷ Yếu'}
          </motion.h1>

          {content.className && (
            <p className="mt-2 text-xl font-semibold" style={{ color: theme.accent }}>
              {content.className}
            </p>
          )}
          {content.schoolName && (
            <p className="mt-1 text-sm" style={{ color: theme.sub }}>
              {content.schoolName}
              {content.schoolYear ? ` · Niên khóa ${content.schoolYear}` : ''}
            </p>
          )}

          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="h-px w-12" style={{ backgroundColor: theme.accent }} />
            <Star className="w-4 h-4" color={theme.accent} />
            <span className="h-px w-12" style={{ backgroundColor: theme.accent }} />
          </div>
        </motion.section>

        {/* COUNTDOWN */}
        {content.eventDate && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            <p className="text-center text-xs uppercase tracking-widest mb-3" style={{ color: theme.sub }}>
              Đếm ngược ngày tụ họp
            </p>
            <Countdown targetDate={content.eventDate} accentColor={theme.accent} labelColor={theme.fg} />
          </motion.section>
        )}

        {/* CALENDAR */}
        {content.eventDate && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-6"
          >
            <EventCalendar
              date={content.eventDate}
              time={content.eventTime}
              accent={theme.accent}
              textOnDark={theme.onDark}
            />
          </motion.section>
        )}

        {/* MAP */}
        {content.location && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-6"
          >
            <LocationMap
              location={content.location}
              lat={content.locationLat}
              lng={content.locationLng}
              accent={theme.accent}
              textOnDark={theme.onDark}
            />
          </motion.section>
        )}

        {/* HOST / USER INFO */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <div
            className="rounded-3xl border backdrop-blur-md px-5 py-6"
            style={{
              backgroundColor: theme.onDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
              borderColor: theme.onDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,44,89,0.1)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5" style={{ color: theme.accent }} />
              <p className="text-xs uppercase tracking-widest" style={{ color: theme.sub }}>
                Người tổ chức
              </p>
            </div>

            {imageUrl && (
              <div className="my-4 flex justify-center">
                <div className="relative">
                  <div
                    className="absolute -inset-2 rounded-3xl rotate-3"
                    style={{ background: `linear-gradient(135deg, ${theme.accent}, transparent)` }}
                  />
                  <img
                    src={imageUrl}
                    alt={content.hostName}
                    className="relative w-40 h-40 object-cover rounded-3xl border-4"
                    style={{ borderColor: theme.fg }}
                  />
                </div>
              </div>
            )}

            <p className="text-center font-serif text-2xl font-bold" style={{ color: theme.fg }}>
              {content.hostName || 'Lớp 12A1'}
            </p>

            {content.message && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: `${theme.accent}40` }}>
                <p className="text-sm leading-relaxed text-center italic" style={{ color: theme.sub }}>
                  "{content.message}"
                </p>
              </div>
            )}

            {content.members && content.members.length > 0 && (
              <div className="mt-5 pt-5 border-t" style={{ borderColor: `${theme.accent}40` }}>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4" style={{ color: theme.accent }} />
                  <p className="text-xs uppercase tracking-widest" style={{ color: theme.sub }}>
                    Thành viên ({content.members.length})
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {content.members.slice(0, 50).map((m, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${theme.accent}20`,
                        color: theme.accent,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* GALLERY */}
        {gallery && gallery.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <p className="text-center text-xs uppercase tracking-widest mb-3" style={{ color: theme.sub }}>
              Album kỷ niệm
            </p>
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative aspect-square overflow-hidden rounded-2xl border-2 shadow-lg"
                  style={{
                    borderColor: theme.fg,
                    transform: i % 2 === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
                  }}
                >
                  <img src={src} alt={`Kỷ niệm ${i + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* RSVP */}
        {!preview && cardId && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <RsvpForm cardId={cardId} accent={theme.accent} textOnDark={theme.onDark} />
          </motion.section>
        )}

        {/* DECORATIVE FOOTER */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <GradCap className="w-12 h-12 opacity-70" />
          <BookStack className="w-12 h-12 opacity-70" />
          <Diploma className="w-12 h-12 opacity-70" />
        </div>
      </div>
    </div>
  );
}
