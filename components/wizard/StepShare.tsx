'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Copy, Check, Loader2, ExternalLink, Eye, Share2 } from 'lucide-react';
import type { CardContent, CardType } from '@/lib/firestore';
import { createCard } from '@/lib/firestore';
import Link from 'next/link';

interface Props {
  type: CardType;
  templateId: string;
  content: CardContent;
  imageUrl: string;
  galleryUrls: string[];
  onBack: () => void;
}

type Phase = 'idle' | 'saving' | 'done' | 'error';

export default function StepShare({ type, templateId, content, imageUrl, galleryUrls, onBack }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [cardId, setCardId] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function go() {
      try {
        setPhase('saving');
        const id = await createCard({
          type,
          templateId,
          content,
          imageUrl: imageUrl.trim() || undefined,
          gallery: galleryUrls.length > 0 ? galleryUrls : undefined,
        });
        if (cancelled) return;

        setCardId(id);
        setPhase('done');
      } catch (e: any) {
        if (cancelled) return;
        setErrMsg(e?.message ?? 'Có lỗi xảy ra, thử lại nhé');
        setPhase('error');
      }
    }
    go();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareUrl =
    cardId && typeof window !== 'undefined'
      ? `${window.location.origin}/view/${cardId}`
      : '';

  async function copyLink() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  async function nativeShare() {
    if (!shareUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title || 'Thiệp mời',
          text: `${content.hostName} mời bạn`,
          url: shareUrl,
        });
      } catch {}
    } else {
      copyLink();
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-yearbook-navy/60 font-semibold">Bước 4 / 4</p>
        <h2 className="font-serif text-3xl font-bold text-yearbook-navy mt-1">Chia sẻ thiệp</h2>
      </div>

      {phase === 'saving' && (
        <div className="rounded-3xl border border-gray-200 bg-white/70 p-8 text-center">
          <Loader2 className="w-10 h-10 text-yearbook-navy animate-spin mx-auto" />
          <p className="text-sm font-medium text-yearbook-navy mt-4">Đang lưu thiệp...</p>
          <p className="text-xs text-gray-500 mt-1">Chỉ vài giây nữa thôi</p>
        </div>
      )}

      {phase === 'error' && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
          <p className="font-semibold text-red-700">Có lỗi xảy ra</p>
          <p className="text-sm text-red-600 mt-1">{errMsg}</p>
          <p className="text-xs text-red-500 mt-3">
            Kiểm tra cấu hình Firebase trong .env.local hoặc thử lại sau.
          </p>
        </div>
      )}

      {phase === 'done' && cardId && (
        <>
          <div className="rounded-3xl bg-gradient-to-br from-yearbook-navy to-blue-700 p-6 text-white">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <p className="font-semibold">Thiệp đã sẵn sàng!</p>
            </div>
            <p className="text-sm text-white/80 mt-1">Copy link bên dưới và gửi cho khách mời.</p>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/15 backdrop-blur px-3 py-2.5">
              <span className="text-sm truncate flex-1 font-mono text-white/90">{shareUrl}</span>
              <button
                onClick={copyLink}
                className="shrink-0 inline-flex items-center gap-1 rounded-full bg-yearbook-gold text-yearbook-navy px-3 py-1.5 text-xs font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Đã copy' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/view/${cardId}`}
              className="btn-primary"
              target="_blank"
            >
              <Eye className="w-4 h-4" /> Xem thiệp
            </Link>
            <button onClick={nativeShare} className="btn-gold">
              <Share2 className="w-4 h-4" /> Chia sẻ
            </button>
          </div>

          <Link
            href={`/view/${cardId}`}
            target="_blank"
            className="block text-center text-sm font-medium text-yearbook-navy underline underline-offset-4"
          >
            Mở trang xem đầy đủ <ExternalLink className="inline w-3.5 h-3.5" />
          </Link>
        </>
      )}

      <button onClick={onBack} className="btn-outline w-full">
        <ArrowLeft className="w-4 h-4" /> Sửa lại nội dung
      </button>
    </div>
  );
}
