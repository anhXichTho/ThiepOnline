import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getStorageRef } from './firebase';

export async function uploadImage(file: File, folder = 'cards'): Promise<string> {
  const storage = getStorageRef();
  const filename = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}_${file.name}`;
  const path = `${folder}/${filename}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function uploadImages(files: File[], folder = 'cards'): Promise<string[]> {
  const results = await Promise.all(files.map((f) => uploadImage(f, folder)));
  return results;
}
