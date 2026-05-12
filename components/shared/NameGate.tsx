'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, KeyRound, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { findUserByName } from '@/lib/users';

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  onCancel: () => void;
  onPass: (verifiedName: string) => void;
  /** Nếu set, chỉ chấp nhận tên này (case-insensitive). Dùng cho gate RSVP. */
  expectedName?: string;
}

export default function NameGate({
  open,
  title = 'Nhập tên người dùng',
  description = 'Bạn cần nhập đúng tên đã được cấp để tiếp tục.',
  onCancel,
  onPass,
  expectedName,
}: Props) {
  const [name, setName] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = name.trim();
    if (!v) return;
    setError(null);
    setChecking(true);
    try {
      if (expectedName !== undefined) {
        // RSVP gate — chỉ check khớp với tên chủ thiệp
        if (v.toLowerCase() === expectedName.trim().toLowerCase()) {
          onPass(v);
        } else {
          setError('Tên không khớp với chủ thiệp');
        }
      } else {
        // Create gate — query Firestore users collection
        const user = await findUserByName(v);
        if (user) {
          onPass(user.name);
        } else {
          setError('Tên này chưa được cấp. Liên hệ admin để được hỗ trợ.');
        }
      }
    } catch (e: any) {
      setError(e?.message ?? 'Có lỗi xảy ra');
    } finally {
      setChecking(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={onCancel}
        >
          <motion.form
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            className="w-full max-w-sm rounded-3xl bg-white shadow-2xl p-6 relative"
          >
            <button
              type="button"
              onClick={onCancel}
              className="absolute top-3 right-3 w-8 h-8 rounded-full text-gray-400 hover:bg-gray-100 flex items-center justify-center"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-yearbook-gold/20 text-yearbook-navy mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-yearbook-navy">{title}</h2>
            <p className="text-sm text-gray-600 mt-1">{description}</p>

            <div className="mt-5">
              <label className="label">Tên của bạn</label>
              <input
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Bảo Anh"
                autoFocus
                disabled={checking}
              />
            </div>

            {error && (
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!name.trim() || checking}
              className="btn-primary w-full mt-5 disabled:opacity-60"
            >
              {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {checking ? 'Đang kiểm tra' : 'Xác nhận'}
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
