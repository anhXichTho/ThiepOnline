'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getCard, type CardData } from '@/lib/firestore';
import { renderTemplate } from '@/components/templates';
import CardActions from '@/components/shared/CardActions';

export default function ViewCardPage() {
  const params = useParams();
  const cardId = (params?.cardId as string) ?? '';
  const [data, setData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const card = await getCard(cardId);
        if (cancelled) return;
        if (!card) {
          setError('Không tìm thấy thiệp này');
          setLoading(false);
          return;
        }
        setData(card);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? 'Có lỗi xảy ra');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (cardId) load();
    return () => {
      cancelled = true;
    };
  }, [cardId]);

  useEffect(() => {
    if (data) {
      const t = setTimeout(() => setSplashDone(true), 1500);
      return () => clearTimeout(t);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yearbook-navy text-yearbook-cream">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto animate-spin text-yearbook-gold" />
          <p className="mt-3 text-sm">Đang mở thiệp...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
        <div className="text-center max-w-sm">
          <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-gray-900">Không mở được thiệp</h1>
          <p className="text-sm text-gray-600 mt-2">{error ?? 'Thiệp này có thể đã bị xoá hoặc đường link sai.'}</p>
          <Link href="/" className="btn-primary mt-6 inline-flex">
            <ArrowLeft className="w-4 h-4" />
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative">
      <AnimatePresence>
        {!splashDone && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-yearbook-navy flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center px-5"
            >
              <p className="font-serif text-2xl text-yearbook-gold">Bạn được mời đến</p>
              <p className="font-serif text-4xl font-bold text-yearbook-cream mt-2 line-clamp-2">
                {data.content.title}
              </p>
              <div className="mt-4 inline-block h-px w-24 bg-yearbook-gold" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="card-capture">
        {renderTemplate(data.type, data.templateId, {
          content: data.content,
          imageUrl: data.imageUrl,
          gallery: data.gallery,
          cardId: data.id,
          preview: false,
        })}
      </div>

      {/* Floating action bar */}
      <div className="fixed left-0 right-0 bottom-0 z-40 pointer-events-none">
        <div className="max-w-md mx-auto px-5 pb-5 pointer-events-auto">
          <div className="rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/15 p-3">
            <CardActions
              targetSelector="#card-capture"
              shareTitle={data.content.title}
              shareText={`${data.content.hostName} mời bạn`}
            />
          </div>
        </div>
      </div>

      <div className="h-48" aria-hidden />
    </main>
  );
}
