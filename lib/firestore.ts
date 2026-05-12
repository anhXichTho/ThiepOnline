import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { getDb } from './firebase';

export interface RsvpRecord {
  id: string;
  name: string;
  attending: boolean;
  message?: string;
  createdAt?: Timestamp;
}

export async function listRsvps(cardId: string): Promise<RsvpRecord[]> {
  const db = getDb();
  const q = query(
    collection(db, 'cards', cardId, 'rsvp'),
    orderBy('createdAt', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<RsvpRecord, 'id'>) }));
}

export type CardType = 'yearbook' | 'wedding' | 'birthday';

export interface CardContent {
  title: string;
  hostName: string;
  guestName?: string;
  eventDate: string; // ISO string
  eventTime?: string;
  location: string;
  locationLat?: number;
  locationLng?: number;
  message: string;
  // Yearbook specific
  className?: string;
  schoolName?: string;
  schoolYear?: string;
  members?: string[];
}

export interface CardData {
  id?: string;
  type: CardType;
  templateId: string;
  content: CardContent;
  imageUrl?: string;
  gallery?: string[];
  /** Tên chủ thiệp — dùng để gate xem RSVP. Khớp với users collection. */
  ownerName?: string;
  createdAt?: Timestamp;
}

export interface RsvpEntry {
  name: string;
  attending: boolean;
  message?: string;
  createdAt?: Timestamp;
}

function stripUndefined<T extends Record<string, any>>(obj: T): T {
  const out: any = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (v !== null && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date)) {
      out[k] = stripUndefined(v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export async function createCard(card: Omit<CardData, 'id' | 'createdAt'>) {
  const db = getDb();
  const ref = await addDoc(collection(db, 'cards'), {
    ...stripUndefined(card),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getCard(cardId: string): Promise<CardData | null> {
  const db = getDb();
  const snap = await getDoc(doc(db, 'cards', cardId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<CardData, 'id'>) };
}

export async function addRsvp(cardId: string, entry: Omit<RsvpEntry, 'createdAt'>) {
  const db = getDb();
  const ref = await addDoc(collection(db, 'cards', cardId, 'rsvp'), {
    ...entry,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

