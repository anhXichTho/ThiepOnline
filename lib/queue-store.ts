import { create } from 'zustand';
import type { QueueEntry } from './queue-firebase';

interface QueueStore {
  entries: QueueEntry[];
  currentIndex: number;
  startTime: number | null;
  setEntries: (entries: QueueEntry[]) => void;
  setCurrentIndex: (index: number) => void;
  setStartTime: (time: number | null) => void;
  getCurrentEntry: () => QueueEntry | null;
  getNextEntry: () => QueueEntry | null;
  getWaitingEntries: () => QueueEntry[];
}

export const useQueueStore = create<QueueStore>((set, get) => ({
  entries: [],
  currentIndex: -1,
  startTime: null,

  setEntries: (entries) => set({ entries }),
  setCurrentIndex: (currentIndex) => set({ currentIndex }),
  setStartTime: (startTime) => set({ startTime }),

  getCurrentEntry: () => {
    const { entries } = get();
    return entries.find(e => e.status === 'in-progress') || null;
  },

  getNextEntry: () => {
    const { entries } = get();
    const currentIdx = entries.findIndex(e => e.status === 'in-progress');
    if (currentIdx === -1) {
      return entries.find(e => e.status === 'waiting') || null;
    }
    const remaining = entries.slice(currentIdx + 1);
    return remaining.find(e => e.status === 'waiting') || null;
  },

  getWaitingEntries: () => {
    const { entries } = get();
    return entries.filter(e => e.status === 'waiting');
  },
}));
