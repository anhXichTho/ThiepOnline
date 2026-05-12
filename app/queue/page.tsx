'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import RegistrationForm from '@/components/queue/RegistrationForm';
import ConfirmCard from '@/components/queue/ConfirmCard';
import { addToQueue, subscribeToQueue, subscribeToQueueState } from '@/lib/queue-firebase';
import { useQueueStore } from '@/lib/queue-store';
import type { QueueEntry } from '@/lib/queue-firebase';

export default function QueuePage() {
  const [registered, setRegistered] = useState<QueueEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const { setEntries, setCurrentIndex, setStartTime, entries } = useQueueStore();

  useEffect(() => {
    const unsub1 = subscribeToQueue(setEntries);
    const unsub2 = subscribeToQueueState(state => {
      setCurrentIndex(state.currentIndex);
      setStartTime(state.startTime);
    });
    return () => { unsub1(); unsub2(); };
  }, [setEntries, setCurrentIndex, setStartTime]);

  useEffect(() => {
    if (registered) {
      const updated = entries.find(e => e.id === registered.id);
      if (updated) setRegistered(updated);
    }
  }, [entries, registered]);

  async function handleSubmit(name: string, phone: string) {
    setLoading(true);
    try {
      const entry = await addToQueue(name, phone);
      setRegistered(entry);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #A78BFA 0%, #C084FC 30%, #EC4899 70%, #F472B6 100%)',
    }}>
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-pink-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-purple-600/30 rounded-full blur-3xl" />

      <div className="relative max-w-md mx-auto px-5 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white/20 backdrop-blur border border-white/30 mb-4">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Lấy Lượt Chụp Ảnh
          </h1>
          <p className="text-white/70 text-sm mt-2">Lễ Trưởng Thành 2026</p>
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          {registered ? (
            <ConfirmCard entry={registered} onBack={() => setRegistered(null)} />
          ) : (
            <RegistrationForm onSubmit={handleSubmit} loading={loading} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/40 text-xs">
          <p>Made with Sparkles for Graduation Day</p>
        </div>
      </div>

      {/* Confetti-like dots */}
      {registered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: Math.random() * 400,
                y: -20,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, window?.innerHeight || 800],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                background: ['#FCD34D', '#F97316', '#EC4899', '#A78BFA', '#34D399'][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
