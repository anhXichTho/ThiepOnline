'use client';

import { motion } from 'framer-motion';
import { Clock, Video } from 'lucide-react';

export default function WarningBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl bg-amber-50 border border-amber-200 p-4 space-y-2"
    >
      <div className="flex items-start gap-2">
        <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          BTC chỉ giữ lượt chụp trong <strong>5 phút</strong>. Vui lòng đến đúng giờ!
        </p>
      </div>
      <div className="flex items-start gap-2">
        <Video className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          Mỗi lượt chụp diễn ra trong <strong>10 phút</strong>.
        </p>
      </div>
    </motion.div>
  );
}
