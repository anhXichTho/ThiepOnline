'use client';

import { motion } from 'framer-motion';
import { Camera, CheckCircle, Clock } from 'lucide-react';
import type { QueueEntry } from '@/lib/queue-firebase';

interface Props {
  entries: QueueEntry[];
}

const statusConfig = {
  waiting: { label: 'Chờ', bg: 'bg-emerald-100', text: 'text-emerald-700', icon: Clock },
  'in-progress': { label: 'Đang chụp', bg: 'bg-orange-100', text: 'text-orange-700', icon: Camera },
  done: { label: 'Xong', bg: 'bg-sky-100', text: 'text-sky-600', icon: CheckCircle },
};

export default function QueueList({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-white/40">
        <Camera className="w-12 h-12 mx-auto mb-3 opacity-40" />
        <p>Chưa có ai đăng ký</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, i) => {
        const config = statusConfig[entry.status];
        const Icon = config.icon;
        return (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`rounded-xl p-3 flex items-center gap-3 border transition-all ${
              entry.status === 'in-progress'
                ? 'bg-orange-500/10 border-orange-400/30'
                : entry.status === 'done'
                ? 'bg-white/5 border-white/10 opacity-60'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {entry.order}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{entry.name}</p>
              <p className="text-white/40 text-xs">{entry.phone}</p>
            </div>
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${config.bg} ${config.text}`}>
              <Icon className="w-3 h-3" />
              {config.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
