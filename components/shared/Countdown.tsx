'use client';

import { useEffect, useState } from 'react';

interface Props {
  targetDate: string; // ISO
  accentColor?: string;
  labelColor?: string;
}

function getTimeLeft(target: number) {
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isOver: diff === 0 };
}

export default function Countdown({ targetDate, accentColor = '#E5B73B', labelColor = '#FFF8E7' }: Props) {
  const target = new Date(targetDate).getTime();
  const [t, setT] = useState(() => getTimeLeft(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!mounted) {
    return <div className="h-24" />;
  }

  if (t.isOver) {
    return (
      <div className="text-center py-4">
        <p className="text-lg font-semibold" style={{ color: accentColor }}>
          🎉 Sự kiện đang diễn ra hoặc đã kết thúc
        </p>
      </div>
    );
  }

  const items = [
    { label: 'Ngày', value: t.days },
    { label: 'Giờ', value: t.hours },
    { label: 'Phút', value: t.minutes },
    { label: 'Giây', value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-2xl py-3 sm:py-4 text-center border backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderColor: 'rgba(255,255,255,0.25)',
          }}
        >
          <div
            className="text-2xl sm:text-4xl font-bold tabular-nums leading-none"
            style={{ color: accentColor }}
          >
            {String(it.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs mt-1 uppercase tracking-wider" style={{ color: labelColor }}>
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
