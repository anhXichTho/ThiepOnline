const IMGBB_ENDPOINT = 'https://api.imgbb.com/1/upload';

function getApiKey(): string {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw new Error('Thiếu NEXT_PUBLIC_IMGBB_API_KEY trong .env.local');
  return key;
}

export async function uploadImage(file: File): Promise<string> {
  const key = getApiKey();
  const form = new FormData();
  form.append('image', file);
  form.append('name', file.name.replace(/\.[^.]+$/, '').slice(0, 40));

  const res = await fetch(`${IMGBB_ENDPOINT}?key=${encodeURIComponent(key)}`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) {
    throw new Error(`Upload thất bại (${res.status})`);
  }
  const json = await res.json();
  if (!json?.data?.url) {
    throw new Error('ImgBB không trả về URL ảnh');
  }
  return json.data.url as string;
}

export async function uploadImages(files: File[]): Promise<string[]> {
  return Promise.all(files.map((f) => uploadImage(f)));
}
