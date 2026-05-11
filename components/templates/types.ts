import type { CardContent } from '@/lib/firestore';

export interface TemplateProps {
  content: CardContent;
  imageUrl?: string;
  gallery?: string[];
  cardId?: string;
  /** in landing/preview mode, hide RSVP & interactive features */
  preview?: boolean;
}

export interface TemplateMeta {
  id: string;
  name: string;
  description: string;
  accent: string;
  preview: {
    bg: string;
    fg: string;
  };
}

export const YEARBOOK_TEMPLATES: TemplateMeta[] = [
  {
    id: 'yb-classic',
    name: 'Cổ điển hoàng kim',
    description: 'Navy & gold trang trọng, phong cách kỷ yếu truyền thống',
    accent: '#E5B73B',
    preview: { bg: 'linear-gradient(135deg,#0F2C59,#1E3A6E)', fg: '#FFF8E7' },
  },
  {
    id: 'yb-modern',
    name: 'Tươi trẻ hiện đại',
    description: 'Pastel xanh-vàng năng động, ảnh polaroid',
    accent: '#FBBF24',
    preview: { bg: 'linear-gradient(135deg,#7DD3FC,#FBBF24)', fg: '#0F2C59' },
  },
  {
    id: 'yb-memory',
    name: 'Sổ kỷ niệm',
    description: 'Phong cách scrapbook giấy nâu, dán ảnh & ghi chú',
    accent: '#B45309',
    preview: { bg: 'linear-gradient(135deg,#FED7AA,#FCD34D)', fg: '#7C2D12' },
  },
];

export const WEDDING_TEMPLATES: TemplateMeta[] = [
  {
    id: 'wd-rose',
    name: 'Hồng pastel',
    description: 'Lãng mạn hoa hồng, ivory dịu nhẹ',
    accent: '#E8A0BF',
    preview: { bg: 'linear-gradient(135deg,#F8C8D8,#FFF5EE)', fg: '#7C2D4A' },
  },
  {
    id: 'wd-modern',
    name: 'Tối giản',
    description: 'Trắng tinh khôi, typography hiện đại',
    accent: '#D4A5A5',
    preview: { bg: '#FFF5EE', fg: '#2D2D2D' },
  },
  {
    id: 'wd-floral',
    name: 'Vườn hoa',
    description: 'Hoa lá tươi, watercolor mềm mại',
    accent: '#F0B7D4',
    preview: { bg: 'linear-gradient(135deg,#FAD0C9,#F8C8D8)', fg: '#5B2A47' },
  },
];

export const BIRTHDAY_TEMPLATES: TemplateMeta[] = [
  {
    id: 'bd-fun',
    name: 'Confetti vui nhộn',
    description: 'Tím cam rực rỡ, đầy bóng bay và confetti',
    accent: '#FB7185',
    preview: { bg: 'linear-gradient(135deg,#7C3AED,#FB7185)', fg: '#FFFFFF' },
  },
  {
    id: 'bd-elegant',
    name: 'Tuổi mới sang chảnh',
    description: 'Đen vàng sang trọng, bóng champagne',
    accent: '#FBBF24',
    preview: { bg: 'linear-gradient(135deg,#1F2937,#FBBF24)', fg: '#FFF8E7' },
  },
  {
    id: 'bd-kid',
    name: 'Tiệc trẻ em',
    description: 'Pastel cầu vồng, dễ thương cho bé',
    accent: '#60A5FA',
    preview: { bg: 'linear-gradient(135deg,#FCE7F3,#DBEAFE)', fg: '#3730A3' },
  },
];
