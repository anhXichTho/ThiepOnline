'use client';

import { motion } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import type { CardType } from '@/lib/firestore';
import {
  YEARBOOK_TEMPLATES,
  WEDDING_TEMPLATES,
  BIRTHDAY_TEMPLATES,
  type TemplateMeta,
} from '@/components/templates/types';

interface Props {
  type: CardType;
  selected?: string;
  onSelect: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}

function pool(type: CardType): TemplateMeta[] {
  if (type === 'yearbook') return YEARBOOK_TEMPLATES;
  if (type === 'wedding') return WEDDING_TEMPLATES;
  return BIRTHDAY_TEMPLATES;
}

export default function StepChooseTemplate({ type, selected, onSelect, onBack, onNext }: Props) {
  const templates = pool(type);
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-yearbook-navy/60 font-semibold">Bước 2 / 4</p>
        <h2 className="font-serif text-3xl font-bold text-yearbook-navy mt-1">Chọn mẫu thiết kế</h2>
        <p className="text-sm text-gray-600 mt-1">Bạn có thể đổi mẫu bất cứ lúc nào</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {templates.map((t, i) => {
          const isSelected = selected === t.id;
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(t.id)}
              className={`relative rounded-3xl p-1 text-left active:scale-[0.98] transition-all ${
                isSelected ? 'ring-4 ring-yearbook-gold' : 'ring-1 ring-gray-200 hover:ring-yearbook-navy/30'
              }`}
            >
              <div className="rounded-[1.4rem] overflow-hidden bg-white">
                <div className="h-40 relative flex items-center justify-center"
                  style={{ background: t.preview.bg }}
                >
                  <p
                    className="font-serif text-2xl font-bold tracking-wide"
                    style={{ color: t.preview.fg }}
                  >
                    Thiệp Vui
                  </p>
                  <span
                    className="absolute bottom-3 right-3 inline-block w-8 h-1.5 rounded-full"
                    style={{ backgroundColor: t.accent }}
                  />
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-yearbook-gold flex items-center justify-center">
                      <Check className="w-4 h-4 text-yearbook-navy" />
                    </div>
                  )}
                </div>
                <div className="px-4 py-3">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.description}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="btn-outline flex-1">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="btn-primary flex-1 disabled:opacity-50"
        >
          Tiếp tục <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
