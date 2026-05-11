'use client';

import { CalendarDays, Clock } from 'lucide-react';

interface Props {
  date: string; // ISO
  time?: string;
  accent?: string;
  textOnDark?: boolean;
}

const VN_DAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const VN_MONTHS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

export default function EventCalendar({ date, time, accent = '#E5B73B', textOnDark = true }: Props) {
  const d = new Date(date);
  const dayOfWeek = VN_DAYS[d.getDay()];
  const day = d.getDate();
  const month = VN_MONTHS[d.getMonth()];
  const year = d.getFullYear();

  const dim = textOnDark ? 'text-white/70' : 'text-gray-600';
  const strong = textOnDark ? 'text-white' : 'text-gray-900';

  return (
    <div className="rounded-3xl overflow-hidden border backdrop-blur-md"
      style={{
        backgroundColor: textOnDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
        borderColor: textOnDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
      }}
    >
      <div className="px-5 py-3 flex items-center justify-between"
        style={{ background: `linear-gradient(to right, ${accent}cc, ${accent}88)` }}
      >
        <div className="flex items-center gap-2 text-white">
          <CalendarDays className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">Lịch sự kiện</span>
        </div>
        <span className="text-xs text-white/90">{year}</span>
      </div>

      <div className="px-5 py-6 text-center">
        <p className={`text-xs uppercase tracking-widest mb-2 ${dim}`}>{dayOfWeek}</p>
        <p className={`text-6xl sm:text-7xl font-bold leading-none ${strong}`} style={{ color: accent }}>
          {String(day).padStart(2, '0')}
        </p>
        <p className={`text-base font-medium mt-2 ${strong}`}>{month}</p>
        {time && (
          <div className={`mt-4 inline-flex items-center gap-2 text-sm ${dim}`}>
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
        )}
      </div>

      <div className="px-5 pb-4">
        <div className="grid grid-cols-7 gap-1 text-center">
          {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((d) => (
            <div key={d} className={`text-[10px] font-semibold ${dim}`}>{d}</div>
          ))}
          {miniMonth(d).map((cell, i) => (
            <div
              key={i}
              className={`text-xs h-7 flex items-center justify-center rounded-full ${
                cell.isTarget
                  ? 'font-bold text-white'
                  : cell.isCurrentMonth
                    ? strong
                    : dim
              }`}
              style={cell.isTarget ? { backgroundColor: accent } : undefined}
            >
              {cell.day || ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function miniMonth(targetDate: Date) {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const day = targetDate.getDate();
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: { day: number | null; isCurrentMonth: boolean; isTarget: boolean }[] = [];
  for (let i = 0; i < startDay; i++) cells.push({ day: null, isCurrentMonth: false, isTarget: false });
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ day: i, isCurrentMonth: true, isTarget: i === day });
  }
  while (cells.length < 42) cells.push({ day: null, isCurrentMonth: false, isTarget: false });
  return cells.slice(0, 35);
}
