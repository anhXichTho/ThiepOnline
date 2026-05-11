'use client';

import { useState } from 'react';
import { Download, Copy, Check, Share2, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Props {
  targetSelector: string;
  shareTitle?: string;
  shareText?: string;
}

export default function CardActions({ targetSelector, shareTitle, shareText }: Props) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  async function saveImage() {
    if (typeof window === 'undefined') return;
    const target = document.querySelector(targetSelector) as HTMLElement | null;
    if (!target) return;
    setSaving(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(target, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `thiep-vui-${Date.now()}.png`;
      link.href = url;
      link.click();
    } catch (e) {
      alert('Không lưu được ảnh, thử lại nhé');
    } finally {
      setSaving(false);
    }
  }

  async function copyLink() {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  async function nativeShare() {
    if (typeof window === 'undefined') return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle ?? 'Thiệp mời',
          text: shareText ?? '',
          url: window.location.href,
        });
      } catch {}
    } else {
      copyLink();
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={saveImage}
          disabled={saving}
          className="rounded-2xl py-3 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-semibold flex flex-col items-center gap-1 active:scale-95 transition disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Lưu ảnh
        </button>
        <button
          onClick={copyLink}
          className="rounded-2xl py-3 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-semibold flex flex-col items-center gap-1 active:scale-95 transition"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Đã copy' : 'Copy link'}
        </button>
        <button
          onClick={nativeShare}
          className="rounded-2xl py-3 bg-white/15 backdrop-blur border border-white/20 text-white text-xs font-semibold flex flex-col items-center gap-1 active:scale-95 transition"
        >
          <Share2 className="w-4 h-4" />
          Chia sẻ
        </button>
      </div>

      <Link
        href="/"
        className="block text-center rounded-2xl py-3.5 font-semibold text-yearbook-navy bg-yearbook-gold active:scale-95 transition"
      >
        <Sparkles className="inline w-4 h-4 mr-1.5" />
        Tạo thiệp cho tôi
      </Link>
    </div>
  );
}
