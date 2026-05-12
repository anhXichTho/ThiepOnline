import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { getDb } from './firebase';

export interface UserRecord {
  id: string;
  name: string;
  createdAt?: Timestamp;
}

/** Chuẩn hoá tên thành document ID (lowercase + bỏ khoảng trắng đầu/cuối) */
export function normalizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function addUser(name: string): Promise<void> {
  const id = normalizeName(name);
  if (!id) throw new Error('Tên không hợp lệ');
  const db = getDb();
  await setDoc(doc(db, 'users', id), {
    name: name.trim(),
    createdAt: serverTimestamp(),
  });
}

export async function deleteUser(id: string): Promise<void> {
  const db = getDb();
  await deleteDoc(doc(db, 'users', id));
}

export async function listUsers(): Promise<UserRecord[]> {
  const db = getDb();
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<UserRecord, 'id'>) }));
}

/** Trả về tên hiển thị nếu hợp lệ, null nếu không tồn tại */
export async function findUserByName(name: string): Promise<UserRecord | null> {
  const id = normalizeName(name);
  if (!id) return null;
  const db = getDb();
  const snap = await getDoc(doc(db, 'users', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<UserRecord, 'id'>) };
}

export async function isValidUser(name: string): Promise<boolean> {
  return (await findUserByName(name)) !== null;
}
