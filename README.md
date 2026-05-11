# Thiệp Vui — Thiệp mời online

Tạo thiệp mời **kỷ yếu**, đám cưới, sinh nhật. Chia sẻ qua link, không cần tài khoản, không cần backend riêng. Dùng Firebase (Firestore + Storage).

> Ưu tiên loại thiệp **kỷ yếu lớp** — landing page mở ra là cluster hoạt hình mũ tốt nghiệp / bằng / sách vở / balo, kế đến lịch + countdown, map ghim địa điểm, thông tin lớp + ảnh.

## Tech stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, mobile-first (375–430px)
- Framer Motion (animation entrance)
- Lucide React (icons)
- Firebase SDK v10 (Firestore + Storage)
- html2canvas (lưu ảnh thiệp)
- Deploy: Vercel

## Cài đặt

```bash
npm install
cp .env.local.example .env.local
# Điền 6 biến NEXT_PUBLIC_FIREBASE_* từ Firebase Console
npm run dev
```

## Cấu trúc

```
app/
  layout.tsx
  page.tsx                  # landing + wizard 4 bước
  view/[cardId]/page.tsx    # trang xem thiệp
components/
  decorations/              # SVG hoạt hình kỷ yếu (cap, diploma, books...)
  templates/                # 3 mẫu/loại — yearbook ưu tiên
  wizard/                   # 4 bước: type → template → edit → share
  shared/                   # Countdown, Calendar, Map, RSVP, CardActions
lib/
  firebase.ts firestore.ts storage.ts
```

## Firebase setup

1. Tạo project tại https://console.firebase.google.com
2. Bật **Firestore Database** và **Storage**
3. Paste rules từ `firestore.rules` và `storage.rules`
4. Vào Project Settings → General → "Your apps" → Web → copy config vào `.env.local`

## Luồng dữ liệu

- `createCard({type, templateId, content, imageUrl?, gallery?})` → trả về ID
- `getCard(cardId)` → render template
- `addRsvp(cardId, {name, attending, message?})` → subcollection `cards/{id}/rsvp`
- Ảnh upload vào `cards/<timestamp>_<rand>_<filename>` → URL công khai

## Deploy Vercel

```bash
vercel
# Thêm 6 env vars NEXT_PUBLIC_FIREBASE_* vào Vercel project
```

URL share mặc định: `https://thiepvui.vercel.app/view/<cardId>`

## Tính năng

- ✅ 3 mẫu kỷ yếu (Cổ điển hoàng kim / Tươi trẻ hiện đại / Sổ kỷ niệm)
- ✅ 3 mẫu đám cưới + 3 mẫu sinh nhật
- ✅ Đếm ngược real-time
- ✅ Lịch tháng + highlight ngày sự kiện
- ✅ Map ghim địa điểm + "Chỉ đường" qua Google Maps
- ✅ Album ảnh polaroid (Firebase Storage)
- ✅ RSVP form lưu Firestore
- ✅ Nút "Lưu ảnh thiệp" → PNG (html2canvas)
- ✅ Nút "Tạo thiệp cho tôi" ở cuối trang xem
- ✅ Splash entrance animation khi mở thiệp
