'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Sparkles, CheckSquare, Square } from 'lucide-react';
import { validatePhone } from '@/lib/queue-utils';
import WarningBox from './WarningBox';

interface Props {
  onSubmit: (name: string, phone: string) => Promise<void>;
  loading: boolean;
}

export default function RegistrationForm({ onSubmit, loading }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0 && agreed && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = 'Vui lòng nhập tên và lớp';
    if (!validatePhone(phone)) newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    await onSubmit(name.trim(), phone.trim());
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div>
        <label className="text-sm font-semibold text-white/90 mb-1.5 block">
          Tên đầy đủ - Lớp
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
          <input
            type="text"
            placeholder="Nguyễn Văn A - 12A1"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-2xl bg-white/15 backdrop-blur border border-white/25 pl-11 pr-4 py-3.5 text-white placeholder-white/40 outline-none transition-all focus:bg-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/20"
          />
        </div>
        {errors.name && (
          <p className="text-red-300 text-xs mt-1.5">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-white/90 mb-1.5 block">
          Số điện thoại
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
          <input
            type="tel"
            placeholder="0912 345 678"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full rounded-2xl bg-white/15 backdrop-blur border border-white/25 pl-11 pr-4 py-3.5 text-white placeholder-white/40 outline-none transition-all focus:bg-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/20"
          />
        </div>
        {errors.phone && (
          <p className="text-red-300 text-xs mt-1.5">{errors.phone}</p>
        )}
      </div>

      <WarningBox />

      <button
        type="button"
        onClick={() => setAgreed(!agreed)}
        className="flex items-start gap-3 w-full text-left group"
      >
        {agreed ? (
          <CheckSquare className="w-5 h-5 text-teal-300 shrink-0 mt-0.5" />
        ) : (
          <Square className="w-5 h-5 text-white/50 shrink-0 mt-0.5 group-hover:text-white/70 transition" />
        )}
        <span className="text-sm text-white/80">
          Tôi đã hiểu và sẽ đến đúng giờ để không mất lượt
        </span>
      </button>

      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full rounded-2xl py-4 text-lg font-bold transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-teal-400 to-emerald-400 text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Lấy Số <Sparkles className="w-5 h-5" />
          </>
        )}
      </button>
    </motion.form>
  );
}
