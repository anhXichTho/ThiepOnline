'use client';

import { useState } from 'react';
import { Check, X, Send, Heart } from 'lucide-react';
import { addRsvp } from '@/lib/firestore';

interface Props {
  cardId: string;
  accent?: string;
  textOnDark?: boolean;
}

export default function RsvpForm({ cardId, accent = '#E5B73B', textOnDark = true }: Props) {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || attending === null) {
      setErr('Vui lòng nhập tên và chọn trạng thái tham dự');
      return;
    }
    setErr(null);
    setSubmitting(true);
    try {
      await addRsvp(cardId, { name: name.trim(), attending, message: message.trim() || undefined });
      setDone(true);
    } catch (e: any) {
      setErr(e?.message ?? 'Gửi không thành công, thử lại nhé');
    } finally {
      setSubmitting(false);
    }
  }

  const labelCls = textOnDark ? 'text-white/80' : 'text-gray-600';
  const inputBg = textOnDark
    ? 'bg-white/10 border-white/20 placeholder-white/40 text-white focus:bg-white/15'
    : 'bg-white/70 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white';

  if (done) {
    return (
      <div className="rounded-3xl border backdrop-blur-md px-6 py-8 text-center"
        style={{
          backgroundColor: textOnDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
          borderColor: textOnDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
        }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
          style={{ backgroundColor: accent }}>
          <Heart className="w-8 h-8 text-white fill-white" />
        </div>
        <p className={`text-lg font-semibold ${textOnDark ? 'text-white' : 'text-gray-900'}`}>
          Cảm ơn bạn đã xác nhận!
        </p>
        <p className={`text-sm mt-1 ${labelCls}`}>Chúng tôi rất mong được gặp bạn ❤️</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border backdrop-blur-md px-5 py-5 space-y-4"
      style={{
        backgroundColor: textOnDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
        borderColor: textOnDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
      }}
    >
      <div>
        <p className={`text-xs uppercase tracking-widest ${labelCls}`}>Xác nhận tham dự</p>
        <p className={`text-lg font-semibold ${textOnDark ? 'text-white' : 'text-gray-900'} mt-0.5`}>
          Bạn có đến không?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setAttending(true)}
          className={`rounded-2xl py-3 text-sm font-semibold transition-all border-2 flex items-center justify-center gap-2 ${
            attending === true ? 'text-white' : textOnDark ? 'text-white/80 border-white/20' : 'text-gray-700 border-gray-200'
          }`}
          style={attending === true ? { backgroundColor: accent, borderColor: accent } : undefined}
        >
          <Check className="w-4 h-4" /> Có, tôi sẽ đến
        </button>
        <button
          type="button"
          onClick={() => setAttending(false)}
          className={`rounded-2xl py-3 text-sm font-semibold transition-all border-2 flex items-center justify-center gap-2 ${
            attending === false ? 'bg-gray-700 text-white border-gray-700' : textOnDark ? 'text-white/80 border-white/20' : 'text-gray-700 border-gray-200'
          }`}
        >
          <X className="w-4 h-4" /> Tiếc, tôi bận
        </button>
      </div>

      <div>
        <label className={`block text-xs uppercase tracking-widest mb-1.5 ${labelCls}`}>Họ tên</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên của bạn"
          className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-all ${inputBg}`}
        />
      </div>

      <div>
        <label className={`block text-xs uppercase tracking-widest mb-1.5 ${labelCls}`}>Lời nhắn (tùy chọn)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Lời chúc dành cho lớp / cô dâu chú rể / chủ nhân buổi tiệc..."
          className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-all resize-none ${inputBg}`}
        />
      </div>

      {err && <p className="text-sm text-red-300">{err}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-2xl py-3.5 font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
        style={{ backgroundColor: accent }}
      >
        <Send className="w-4 h-4" /> {submitting ? 'Đang gửi...' : 'Gửi xác nhận'}
      </button>
    </form>
  );
}
