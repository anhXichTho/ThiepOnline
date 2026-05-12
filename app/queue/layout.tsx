import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Chụp Ảnh Lễ Trưởng Thành — Lấy Số Thứ Tự',
  description: 'Đăng ký lượt chụp ảnh tại lễ trưởng thành. Lấy số, xem lịch đợi, chụp ảnh kỷ niệm!',
};

export const viewport: Viewport = {
  themeColor: '#A78BFA',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function QueueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
