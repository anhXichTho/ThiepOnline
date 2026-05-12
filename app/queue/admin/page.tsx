'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  CheckCircle,
  RotateCcw,
  LogOut,
  Users,
  Camera,
  Clock,
  BarChart3,
} from 'lucide-react';
import LoginForm from '@/components/queue/LoginForm';
import QueueList from '@/components/queue/QueueList';
import {
  subscribeToQueue,
  subscribeToQueueState,
  updateEntryStatus,
  setQueueState,
} from '@/lib/queue-firebase';
import { useQueueStore } from '@/lib/queue-store';
import { formatElapsed } from '@/lib/queue-utils';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [elapsed, setElapsed] = useState('00:00:00');
  const { entries, startTime, setEntries, setCurrentIndex, setStartTime } = useQueueStore();

  useEffect(() => {
    if (!loggedIn) return;
    const unsub1 = subscribeToQueue(setEntries);
    const unsub2 = subscribeToQueueState(state => {
      setCurrentIndex(state.currentIndex);
      setStartTime(state.startTime);
    });
    return () => { unsub1(); unsub2(); };
  }, [loggedIn, setEntries, setCurrentIndex, setStartTime]);

  useEffect(() => {
    if (!startTime) { setElapsed('00:00:00'); return; }
    const timer = setInterval(() => {
      setElapsed(formatElapsed(Date.now() - startTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  const currentEntry = entries.find(e => e.status === 'in-progress');
  const waitingEntries = entries.filter(e => e.status === 'waiting');
  const doneEntries = entries.filter(e => e.status === 'done');

  async function handleStart() {
    const first = entries.find(e => e.status === 'waiting');
    if (!first) return;
    await updateEntryStatus(first.id, 'in-progress');
    await setQueueState({ currentIndex: 0, startTime: Date.now() });
  }

  async function handleComplete() {
    if (!currentEntry) return;
    await updateEntryStatus(currentEntry.id, 'done');

    const next = entries.find(e => e.status === 'waiting' && e.order > currentEntry.order);
    if (next) {
      await updateEntryStatus(next.id, 'in-progress');
      await setQueueState({ startTime: Date.now() });
    } else {
      await setQueueState({ startTime: null });
    }
  }

  async function handleGoBack() {
    if (!currentEntry) return;
    await updateEntryStatus(currentEntry.id, 'waiting');

    const prevDone = [...entries]
      .filter(e => e.status === 'done')
      .sort((a, b) => b.order - a.order);

    if (prevDone.length > 0) {
      const prev = prevDone[0];
      await updateEntryStatus(prev.id, 'in-progress');
      await setQueueState({ startTime: Date.now() });
    } else {
      await setQueueState({ startTime: null });
    }
  }

  if (!loggedIn) {
    return <LoginForm onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-sm text-white/40">Quản lý lượt chụp ảnh</p>
          </div>
          <button
            onClick={() => setLoggedIn(false)}
            className="rounded-xl px-3 py-2 bg-white/10 border border-white/20 text-white/60 hover:text-white hover:bg-white/20 transition text-sm flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Thoát
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-3 text-center"
          >
            <BarChart3 className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{entries.length}</p>
            <p className="text-xs text-white/40">Đã đăng ký</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-3 text-center"
          >
            <Camera className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <p className="text-sm font-bold text-white truncate mt-1">
              {currentEntry ? currentEntry.name.split(' - ')[0] : '—'}
            </p>
            <p className="text-xs text-white/40">Đang chụp</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-3 text-center"
          >
            <Clock className="w-5 h-5 text-teal-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-white font-mono">{elapsed}</p>
            <p className="text-xs text-white/40">Thời gian</p>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 mb-6">
          {!currentEntry ? (
            <button
              onClick={handleStart}
              disabled={waitingEntries.length === 0}
              className="flex-1 rounded-xl py-3 font-semibold bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" /> Bắt đầu chụp
            </button>
          ) : (
            <>
              <button
                onClick={handleComplete}
                className="flex-1 rounded-xl py-3 font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Hoàn tất lượt
              </button>
              <button
                onClick={handleGoBack}
                className="rounded-xl py-3 px-4 font-semibold bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Quay lại
              </button>
            </>
          )}
        </div>

        {/* Queue list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
              Danh sách ({entries.length})
            </h2>
            <div className="flex gap-2 text-xs text-white/40">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Chờ: {waitingEntries.length}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> Xong: {doneEntries.length}
              </span>
            </div>
          </div>
          <QueueList entries={entries} />
        </div>
      </div>
    </main>
  );
}
