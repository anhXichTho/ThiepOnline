import type { QueueEntry } from './queue-firebase';

const MINUTES_PER_SLOT = 10;

export function estimateTime(
  entry: QueueEntry,
  allEntries: QueueEntry[],
  startTime: number | null
): string {
  const waitingBefore = allEntries.filter(
    e => e.order < entry.order && e.status !== 'done'
  ).length;

  const currentInProgress = allEntries.find(e => e.status === 'in-progress');
  let baseTime: number;

  if (currentInProgress && startTime) {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MINUTES_PER_SLOT * 60 * 1000 - elapsed);
    baseTime = Date.now() + remaining + (waitingBefore - (currentInProgress ? 1 : 0)) * MINUTES_PER_SLOT * 60 * 1000;
  } else {
    baseTime = Date.now() + waitingBefore * MINUTES_PER_SLOT * 60 * 1000;
  }

  return new Date(baseTime).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatElapsed(ms: number): string {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}
