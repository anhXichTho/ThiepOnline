import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Lora } from 'next/font/google';
import './globals.css';

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Thiệp Vui — Tạo thiệp mời online miễn phí',
  description:
    'Tạo thiệp mời kỷ yếu, đám cưới, sinh nhật đẹp & hiện đại. Chia sẻ link, không cần tài khoản.',
  openGraph: {
    title: 'Thiệp Vui — Thiệp mời online',
    description: 'Thiệp kỷ yếu, đám cưới, sinh nhật. Tạo miễn phí trong 2 phút.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0F2C59',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
