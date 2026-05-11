'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Heart, Cake, ArrowRight, Sparkles } from 'lucide-react';
import type { CardType } from '@/lib/firestore';

interface Props {
  selected?: CardType;
  onSelect: (type: CardType) => void;
}

const TYPES: { id: CardType; title: string; desc: string; icon: any; gradient: string; recommended?: boolean }[] = [
  {
    id: 'yearbook',
    title: 'Kỷ yếu lớp',
    desc: 'Đêm gala, họp lớp, ra trường, gặp mặt khoá',
    icon: GraduationCap,
    gradient: 'from-yearbook-navy to-blue-700',
    recommended: true,
  },
  {
    id: 'wedding',
    title: 'Đám cưới',
    desc: 'Lễ thành hôn, đính hôn, kỷ niệm ngày cưới',
    icon: Heart,
    gradient: 'from-pink-400 to-rose-300',
  },
  {
    id: 'birthday',
    title: 'Sinh nhật',
    desc: 'Tiệc sinh nhật cho bé, người lớn, công ty',
    icon: Cake,
    gradient: 'from-purple-500 via-pink-500 to-orange-400',
  },
];

export default function StepChooseType({ selected, onSelect }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-yearbook-navy/60 font-semibold">Bước 1 / 4</p>
        <h2 className="font-serif text-3xl font-bold text-yearbook-navy mt-1">Chọn loại thiệp</h2>
        <p className="text-sm text-gray-600 mt-1">Bạn đang chuẩn bị cho dịp gì?</p>
      </div>

      <div className="grid gap-3">
        {TYPES.map((t, i) => {
          const Icon = t.icon;
          const isSelected = selected === t.id;
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(t.id)}
              className={`relative w-full text-left rounded-3xl p-1 transition-all active:scale-[0.98] ${
                isSelected ? 'ring-4 ring-yearbook-gold shadow-2xl' : 'shadow-md hover:shadow-xl'
              }`}
            >
              <div className={`rounded-[1.4rem] p-5 bg-gradient-to-br ${t.gradient} relative overflow-hidden`}>
                {t.recommended && (
                  <span className="absolute top-3 right-3 chip bg-yearbook-gold text-yearbook-navy">
                    <Sparkles className="w-3 h-3" /> Ưu tiên
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center text-white">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-white">{t.title}</h3>
                    <p className="text-sm text-white/85 line-clamp-2">{t.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/80 shrink-0" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-center text-gray-500 mt-2">
        Chỉ mất 2 phút · Miễn phí · Không cần đăng ký
      </p>
    </div>
  );
}
