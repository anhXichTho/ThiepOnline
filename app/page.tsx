'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Heart,
  Cake,
  Sparkles,
  ArrowRight,
  Zap,
  ImageDown,
  Share2,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
} from 'lucide-react';
import Wizard from '@/components/wizard/Wizard';
import {
  YearbookHeroCluster,
  GradCap,
  Diploma,
  BookStack,
  Pencil,
  Backpack,
  Star,
  Confetti,
} from '@/components/decorations/YearbookDecorations';
import type { CardType } from '@/lib/firestore';

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [initialType, setInitialType] = useState<CardType | undefined>();
  const wizardRef = useRef<HTMLDivElement>(null);

  function start(type?: CardType) {
    setInitialType(type);
    setOpen(true);
    setTimeout(() => {
      wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  return (
    <main className="min-h-screen">
      {/* HERO — yearbook centric */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #0F2C59 0%, #1E3A6E 50%, #2A4A8B 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <Confetti />
        </div>

        <div className="relative max-w-md mx-auto px-5 pt-8 pb-16">
          {/* Top brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-yearbook-gold flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-yearbook-navy" />
              </div>
              <span className="font-bold text-lg text-yearbook-cream">Thiệp Vui</span>
            </div>
            <span className="chip bg-white/15 text-yearbook-cream backdrop-blur">
              <Sparkles className="w-3 h-3" /> Miễn phí
            </span>
          </div>

          {/* Hero title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-yearbook-gold/20 border border-yearbook-gold/50 text-yearbook-gold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              ƯU TIÊN KỶ YẾU 2026
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-yearbook-cream leading-[1.05]">
              Thiệp <span className="text-yearbook-gold text-shadow-gold whitespace-nowrap">Kỷ Yếu</span>
              <br />
              cho lớp mình
            </h1>
            <p className="mt-4 text-base text-yearbook-cream/85 max-w-sm mx-auto">
              Tạo thiệp mời đêm gala, họp lớp, ra trường siêu đẹp trong 2 phút.
              Chia sẻ link, ai cũng mở được trên điện thoại.
            </p>
          </motion.div>

          {/* Hero illustration */}
          <YearbookHeroCluster />

          {/* CTAs */}
          <div className="space-y-3 mt-2">
            <button onClick={() => start('yearbook')} className="btn-gold w-full text-base py-4">
              <GraduationCap className="w-5 h-5" />
              Tạo thiệp kỷ yếu ngay
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => start('wedding')}
                className="rounded-full py-3 px-4 text-sm font-semibold bg-white/10 backdrop-blur border border-white/20 text-yearbook-cream active:scale-95 transition"
              >
                <Heart className="w-4 h-4 inline mr-1.5" />
                Đám cưới
              </button>
              <button
                onClick={() => start('birthday')}
                className="rounded-full py-3 px-4 text-sm font-semibold bg-white/10 backdrop-blur border border-white/20 text-yearbook-cream active:scale-95 transition"
              >
                <Cake className="w-4 h-4 inline mr-1.5" />
                Sinh nhật
              </button>
            </div>
          </div>

          {/* trust badges */}
          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-yearbook-cream/70">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-yearbook-gold" />
              Không cần tài khoản
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-yearbook-gold" />
              Mobile-first
            </span>
          </div>
        </div>

        {/* Wave decoration */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          fill="#FFF8E7"
        >
          <path d="M0 30 Q100 0 200 30 T400 30 V60 H0 Z" />
        </svg>
      </section>

      {/* WHY YEARBOOK */}
      <section className="paper-texture" style={{ backgroundColor: '#FFF8E7' }}>
        <div className="max-w-md mx-auto px-5 py-10">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-yearbook-navy/60 font-semibold">
              Vì sao chọn Thiệp Vui
            </p>
            <h2 className="font-serif text-3xl font-bold text-yearbook-navy mt-2">
              Đẹp, nhanh & miễn phí
            </h2>
          </div>

          <div className="mt-6 grid gap-3">
            {[
              {
                icon: Zap,
                title: '2 phút là xong',
                desc: 'Wizard 4 bước, không cần thiết kế Canva, không cần Photoshop',
                color: 'bg-yearbook-gold',
              },
              {
                icon: Calendar,
                title: 'Lịch & đếm ngược',
                desc: 'Hiển thị ngày sự kiện và đồng hồ đếm ngược cho cả lớp',
                color: 'bg-blue-500',
              },
              {
                icon: MapPin,
                title: 'Map ghim địa điểm',
                desc: 'Khách mời tap để chỉ đường qua Google Maps ngay lập tức',
                color: 'bg-emerald-500',
              },
              {
                icon: Users,
                title: 'RSVP nhẹ nhàng',
                desc: 'Bạn bè xác nhận tham dự, lớp trưởng dễ thống kê sĩ số',
                color: 'bg-rose-500',
              },
              {
                icon: ImageDown,
                title: 'Lưu ảnh thiệp',
                desc: 'Save thành ảnh PNG để post Facebook, in poster',
                color: 'bg-purple-500',
              },
              {
                icon: Share2,
                title: 'Link cá nhân',
                desc: 'Mỗi thiệp 1 link riêng, copy gửi Zalo, Messenger, TikTok bio',
                color: 'bg-orange-500',
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-4 flex items-start gap-3"
                >
                  <div className={`shrink-0 w-10 h-10 rounded-xl ${f.color} text-white flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-yearbook-navy">{f.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* YEARBOOK GALLERY ICONS */}
      <section className="bg-gradient-to-b from-yearbook-cream to-amber-50">
        <div className="max-w-md mx-auto px-5 py-10">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-yearbook-navy/60 font-semibold">
              Thiết kế dành cho kỷ yếu
            </p>
            <h2 className="font-serif text-3xl font-bold text-yearbook-navy mt-2">
              Hoạ tiết trẻ trung
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Sẵn các illustration mũ tốt nghiệp, bằng tốt nghiệp, sách vở, balo...
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { Comp: GradCap, label: 'Mũ TN' },
              { Comp: Diploma, label: 'Bằng TN' },
              { Comp: BookStack, label: 'Sách vở' },
              { Comp: Pencil, label: 'Bút chì' },
              { Comp: Backpack, label: 'Balo' },
              { Comp: () => <Star className="w-16 h-16 mx-auto" />, label: 'Ngôi sao' },
            ].map(({ Comp, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-md"
              >
                <Comp className="w-16 h-16" />
                <span className="text-xs text-gray-600 mt-1">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES PREVIEW */}
      <section className="bg-white">
        <div className="max-w-md mx-auto px-5 py-10">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-yearbook-navy/60 font-semibold">
              3 mẫu kỷ yếu sẵn sàng
            </p>
            <h2 className="font-serif text-3xl font-bold text-yearbook-navy mt-2">
              Chọn phong cách của lớp
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {[
              {
                name: 'Cổ điển hoàng kim',
                desc: 'Navy & gold trang trọng',
                bg: 'linear-gradient(135deg,#0F2C59,#1E3A6E)',
                fg: '#FFF8E7',
              },
              {
                name: 'Tươi trẻ hiện đại',
                desc: 'Pastel xanh-vàng năng động',
                bg: 'linear-gradient(135deg,#7DD3FC,#FBBF24)',
                fg: '#0F2C59',
              },
              {
                name: 'Sổ kỷ niệm',
                desc: 'Scrapbook giấy nâu, dán ảnh',
                bg: 'linear-gradient(135deg,#FED7AA,#FCD34D)',
                fg: '#7C2D12',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                onClick={() => start('yearbook')}
                className="cursor-pointer rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow active:scale-[0.98]"
              >
                <div className="h-32 flex items-center justify-center" style={{ background: t.bg }}>
                  <p className="font-serif text-2xl font-bold" style={{ color: t.fg }}>
                    Đêm Kỷ Yếu 12A1
                  </p>
                </div>
                <div className="px-4 py-3 bg-white flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WIZARD */}
      <section
        ref={wizardRef}
        id="create"
        className="bg-gradient-to-b from-amber-50 via-white to-blue-50"
      >
        <div className="max-w-md mx-auto px-5 py-10">
          {open ? (
            <div className="rounded-3xl bg-white shadow-xl border border-gray-200 p-5 sm:p-6">
              <Wizard initialType={initialType} onClose={() => setOpen(false)} />
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yearbook-navy text-yearbook-gold mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-yearbook-navy">Sẵn sàng tạo thiệp?</h2>
              <p className="text-sm text-gray-600 mt-2 mb-6">
                Bắt đầu wizard 4 bước, không cần đăng ký
              </p>
              <button onClick={() => start()} className="btn-primary w-full text-base py-4">
                Bắt đầu ngay <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-yearbook-navy text-yearbook-cream/80">
        <div className="max-w-md mx-auto px-5 py-8 text-center text-xs">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-xl bg-yearbook-gold flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-yearbook-navy" />
            </div>
            <span className="font-bold text-base text-yearbook-cream">Thiệp Vui</span>
          </div>
          <p>Thiệp mời online · Kỷ yếu · Đám cưới · Sinh nhật</p>
          <p className="mt-2 text-yearbook-cream/50">Made with ♥ in Vietnam · 2026</p>
        </div>
      </footer>
    </main>
  );
}
