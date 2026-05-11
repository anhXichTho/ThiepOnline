'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Link2, X, Plus } from 'lucide-react';
import type { CardContent, CardType } from '@/lib/firestore';

interface Props {
  type: CardType;
  content: CardContent;
  imageUrl: string;
  galleryUrls: string[];
  onChange: (content: CardContent) => void;
  onImageUrl: (url: string) => void;
  onGalleryUrls: (urls: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepEditContent({
  type,
  content,
  imageUrl,
  galleryUrls,
  onChange,
  onImageUrl,
  onGalleryUrls,
  onBack,
  onNext,
}: Props) {
  const [membersInput, setMembersInput] = useState((content.members ?? []).join(', '));
  const [galleryInput, setGalleryInput] = useState('');

  function set<K extends keyof CardContent>(key: K, value: CardContent[K]) {
    onChange({ ...content, [key]: value });
  }

  function addGalleryUrl() {
    const url = galleryInput.trim();
    if (!url) return;
    if (galleryUrls.length >= 12) return;
    onGalleryUrls([...galleryUrls, url]);
    setGalleryInput('');
  }

  function removeGallery(i: number) {
    onGalleryUrls(galleryUrls.filter((_, idx) => idx !== i));
  }

  function commitMembers() {
    const list = membersInput
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
    set('members', list);
  }

  const titleHint =
    type === 'yearbook' ? 'VD: Đêm Kỷ Yếu 12A1' :
    type === 'wedding' ? 'VD: Lễ Thành Hôn' :
    'VD: Sinh Nhật Bảo Anh';

  const hostHint =
    type === 'yearbook' ? 'VD: Lớp 12A1' :
    type === 'wedding' ? 'VD: Minh Anh & Tuấn Hùng' :
    'VD: Bảo Anh tròn 5 tuổi';

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-yearbook-navy/60 font-semibold">Bước 3 / 4</p>
        <h2 className="font-serif text-3xl font-bold text-yearbook-navy mt-1">Điền nội dung</h2>
        <p className="text-sm text-gray-600 mt-1">Tất cả thông tin đều không bắt buộc, điền cái nào tuỳ bạn</p>
      </div>

      <div>
        <label className="label">Tiêu đề thiệp</label>
        <input
          className="input-field"
          value={content.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder={titleHint}
        />
      </div>

      <div>
        <label className="label">{type === 'yearbook' ? 'Tên lớp / khoá' : 'Tên người tổ chức'}</label>
        <input
          className="input-field"
          value={content.hostName}
          onChange={(e) => set('hostName', e.target.value)}
          placeholder={hostHint}
        />
      </div>

      {type === 'yearbook' && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Lớp / Sĩ số</label>
              <input
                className="input-field"
                value={content.className ?? ''}
                onChange={(e) => set('className', e.target.value)}
                placeholder="12A1"
              />
            </div>
            <div>
              <label className="label">Niên khoá</label>
              <input
                className="input-field"
                value={content.schoolYear ?? ''}
                onChange={(e) => set('schoolYear', e.target.value)}
                placeholder="2022-2025"
              />
            </div>
          </div>
          <div>
            <label className="label">Trường</label>
            <input
              className="input-field"
              value={content.schoolName ?? ''}
              onChange={(e) => set('schoolName', e.target.value)}
              placeholder="THPT Chu Văn An"
            />
          </div>
          <div>
            <label className="label">Danh sách thành viên (tách bằng dấu phẩy)</label>
            <textarea
              className="input-field resize-none"
              rows={3}
              value={membersInput}
              onChange={(e) => setMembersInput(e.target.value)}
              onBlur={commitMembers}
              placeholder="Bảo Anh, Minh Đức, Hồng Hà, Tuấn Kiệt..."
            />
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Ngày diễn ra</label>
          <input
            type="date"
            className="input-field"
            value={content.eventDate ? content.eventDate.slice(0, 10) : ''}
            onChange={(e) => {
              const date = e.target.value;
              const time = content.eventTime || '19:00';
              if (date) set('eventDate', `${date}T${time}:00`);
            }}
          />
        </div>
        <div>
          <label className="label">Giờ</label>
          <input
            type="time"
            className="input-field"
            value={content.eventTime ?? '19:00'}
            onChange={(e) => {
              const time = e.target.value;
              set('eventTime', time);
              if (content.eventDate) {
                const datePart = content.eventDate.slice(0, 10);
                set('eventDate', `${datePart}T${time}:00`);
              }
            }}
          />
        </div>
      </div>

      <div>
        <label className="label">Địa điểm</label>
        <input
          className="input-field"
          value={content.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="VD: GEM Center, 8 Nguyễn Bỉnh Khiêm, Q.1, TP.HCM"
        />
        <p className="text-xs text-gray-500 mt-1">
          Map sẽ tự ghim địa chỉ. Có thể nhập tên quán/toà nhà hoặc địa chỉ cụ thể.
        </p>
      </div>

      <div>
        <label className="label">Lời nhắn / Thông điệp</label>
        <textarea
          className="input-field resize-none"
          rows={3}
          value={content.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="VD: Cảm ơn 3 năm đã cùng nhau lớn lên..."
        />
      </div>

      {/* Main image URL */}
      <div>
        <label className="label">Ảnh đại diện (URL)</label>
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="input-field pl-10"
            value={imageUrl}
            onChange={(e) => onImageUrl(e.target.value)}
            placeholder="https://i.imgur.com/abc.jpg"
            type="url"
          />
        </div>
        {imageUrl && (
          <div className="mt-3 relative w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200">
            <img
              src={imageUrl}
              alt="preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <button
              type="button"
              onClick={() => onImageUrl('')}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Dán link ảnh từ Imgur, Postimg, hoặc Google Photos (đã share public)
        </p>
      </div>

      {/* Gallery URLs */}
      <div>
        <label className="label">Album ảnh — danh sách URL (tối đa 12)</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              className="input-field pl-10"
              value={galleryInput}
              onChange={(e) => setGalleryInput(e.target.value)}
              placeholder="Dán link ảnh, bấm +"
              type="url"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addGalleryUrl();
                }
              }}
            />
          </div>
          <button
            type="button"
            onClick={addGalleryUrl}
            disabled={!galleryInput.trim() || galleryUrls.length >= 12}
            className="shrink-0 w-12 rounded-2xl bg-yearbook-navy text-white flex items-center justify-center active:scale-95 transition disabled:opacity-40"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {galleryUrls.length > 0 && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {galleryUrls.map((url, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ccc"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>';
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeGallery(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="btn-outline flex-1">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <button onClick={onNext} className="btn-primary flex-1">
          Tiếp tục <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
