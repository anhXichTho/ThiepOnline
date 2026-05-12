'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Loader2,
  Check,
  XCircle,
  Users as UsersIcon,
  MessageCircle,
  AlertCircle,
  ClipboardList,
} from 'lucide-react';
import { listRsvps, type RsvpRecord } from '@/lib/firestore';

interface Props {
  open: boolean;
  cardId: string;
  onClose: () => void;
}

export default function RsvpListModal({ open, cardId, onClose }: Props) {
  const [list, setList] = useState<RsvpRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const items = await listRsvps(cardId);
        if (!cancelled) setList(items);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? 'Không tải được');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, cardId]);

  const attending = list.filter((r) => r.attending);
  const notAttending = list.filter((r) => !r.attending);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-yearbook-navy text-yearbook-gold flex items-center justify-center">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-yearbook-navy">Danh sách xác nhận</p>
                  <p className="text-xs text-gray-500">{list.length} người đã phản hồi</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full text-gray-500 hover:bg-gray-100 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {loading ? (
                <div className="py-10 text-center text-gray-500 text-sm">
                  <Loader2 className="w-6 h-6 mx-auto animate-spin text-yearbook-navy" />
                  <p className="mt-2">Đang tải...</p>
                </div>
              ) : err ? (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 mt-0.5" /> {err}
                </div>
              ) : list.length === 0 ? (
                <div className="py-10 text-center text-gray-500 text-sm">
                  <UsersIcon className="w-8 h-8 mx-auto text-gray-300" />
                  <p className="mt-2">Chưa có ai xác nhận</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <Check className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider font-semibold">Sẽ đến</span>
                      </div>
                      <p className="text-3xl font-bold text-emerald-700 mt-1">{attending.length}</p>
                    </div>
                    <div className="rounded-2xl bg-gray-50 border border-gray-100 p-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <XCircle className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider font-semibold">Bận</span>
                      </div>
                      <p className="text-3xl font-bold text-gray-700 mt-1">{notAttending.length}</p>
                    </div>
                  </div>

                  {/* Attending */}
                  {attending.length > 0 && (
                    <section>
                      <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
                        Có mặt
                      </h3>
                      <ul className="space-y-2">
                        {attending.map((r) => (
                          <li key={r.id} className="rounded-2xl bg-emerald-50/60 border border-emerald-100 px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                              <span className="font-semibold text-gray-900">{r.name}</span>
                            </div>
                            {r.message && (
                              <div className="mt-2 flex items-start gap-1.5 text-sm text-gray-600 italic">
                                <MessageCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                <span>"{r.message}"</span>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Not attending */}
                  {notAttending.length > 0 && (
                    <section>
                      <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
                        Không đến được
                      </h3>
                      <ul className="space-y-2">
                        {notAttending.map((r) => (
                          <li key={r.id} className="rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center shrink-0">
                                <X className="w-3.5 h-3.5" />
                              </span>
                              <span className="font-semibold text-gray-900">{r.name}</span>
                            </div>
                            {r.message && (
                              <div className="mt-2 flex items-start gap-1.5 text-sm text-gray-600 italic">
                                <MessageCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                <span>"{r.message}"</span>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
