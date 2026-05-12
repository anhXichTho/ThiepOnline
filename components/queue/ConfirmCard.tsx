'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, FastForward, Clock, ArrowLeft, Share2, Copy, Check } from 'lucide-react';
import type { QueueEntry } from '@/lib/queue-firebase';
import { estimateTime } from '@/lib/queue-utils';
import { useQueueStore } from '@/lib/queue-store';

interface Props {
  entry: QueueEntry;
  onBack: () => void;
}

export default function ConfirmCard({ entry, onBack }: Props) {
  const { entries, startTime } = useQueueStore();
  const [copied, setCopied] = useState(false);

  const currentEntry = entries.find(e => e.status === 'in-progress');
  const nextEntry = (() => {
    if (!currentEntry) return entries.find(e => e.status === 'waiting') || null;
    const idx = entries.findIndex(e => e.id === currentEntry.id);
    return entries.slice(idx + 1).find(e => e.status === 'waiting') || null;
  })();

  const estimated = estimateTime(entry, entries, startTime);

  async function handleShare() {
    const text = `Tôi vừa lấy số chụp ảnh lễ trưởng thành! Số thứ tự: ${entry.order}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Lượt chụp ảnh', text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', bounce: 0.4 }}
      className="text-center space-y-6"
    >
      <div>
        <p className="text-white/70 text-sm">Xin chào</p>
        <p className="text-white font-bold text-lg mt-1">{entry.name}</p>
      </div>

      <div>
        <p className="text-white/60 text-sm mb-2">Số thứ tự của bạn</p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 shadow-2xl shadow-orange-500/40"
        >
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl font-black text-white drop-shadow-lg"
          >
            {entry.order}
          </motion.span>
        </motion.div>
      </div>

      <div className="space-y-3 bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-white/70 text-sm">
            <Camera className="w-4 h-4" /> Đang chụp
          </span>
          <span className="text-white font-semibold">
            {currentEntry ? `Số ${currentEntry.order}` : 'Chưa bắt đầu'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-white/70 text-sm">
            <FastForward className="w-4 h-4" /> Sắp đến
          </span>
          <span className="text-white font-semibold">
            {nextEntry ? `Số ${nextEntry.order}` : '—'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-white/70 text-sm">
            <Clock className="w-4 h-4" /> Dự kiến
          </span>
          <span className="text-white font-semibold">{estimated}</span>
        </div>

        {entry.status === 'in-progress' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 py-2 px-4 rounded-xl bg-green-400/20 border border-green-400/40"
          >
            <p className="text-green-300 font-bold text-sm animate-pulse">
              Đến lượt bạn! Vui lòng đến khu vực chụp ảnh
            </p>
          </motion.div>
        )}

        {entry.status === 'done' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 py-2 px-4 rounded-xl bg-blue-400/20 border border-blue-400/40"
          >
            <p className="text-blue-300 font-semibold text-sm">
              Bạn đã chụp xong! Cảm ơn bạn
            </p>
          </motion.div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 rounded-2xl py-3 font-semibold bg-white/10 backdrop-blur border border-white/20 text-white active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <button
          onClick={handleShare}
          className="flex-1 rounded-2xl py-3 font-semibold bg-white/20 backdrop-blur border border-white/30 text-white active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          {copied ? 'Đã copy!' : 'Chia sẻ'}
        </button>
      </div>
    </motion.div>
  );
}
