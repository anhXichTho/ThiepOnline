import { getDb } from './firebase';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  getDoc,
  setDoc,
} from 'firebase/firestore';

export interface QueueEntry {
  id: string;
  name: string;
  phone: string;
  registeredAt: number;
  status: 'waiting' | 'in-progress' | 'done';
  order: number;
}

export interface QueueState {
  currentIndex: number;
  startTime: number | null;
}

const QUEUE_COLLECTION = 'photo_queue';
const STATE_DOC = 'photo_queue_state';

export async function addToQueue(name: string, phone: string): Promise<QueueEntry> {
  const db = getDb();
  const q = query(collection(db, QUEUE_COLLECTION), orderBy('order', 'desc'));
  const snapshot = await getDocs(q);
  const nextOrder = snapshot.empty ? 1 : (snapshot.docs[0].data().order || 0) + 1;

  const entry = {
    name,
    phone,
    registeredAt: Date.now(),
    status: 'waiting' as const,
    order: nextOrder,
  };

  const docRef = await addDoc(collection(db, QUEUE_COLLECTION), entry);
  return { ...entry, id: docRef.id };
}

export async function getQueueEntries(): Promise<QueueEntry[]> {
  const db = getDb();
  const q = query(collection(db, QUEUE_COLLECTION), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as QueueEntry));
}

export async function updateEntryStatus(id: string, status: QueueEntry['status']) {
  const db = getDb();
  await updateDoc(doc(db, QUEUE_COLLECTION, id), { status });
}

export async function getQueueState(): Promise<QueueState> {
  const db = getDb();
  const stateDoc = await getDoc(doc(db, 'settings', STATE_DOC));
  if (stateDoc.exists()) {
    return stateDoc.data() as QueueState;
  }
  return { currentIndex: -1, startTime: null };
}

export async function setQueueState(state: Partial<QueueState>) {
  const db = getDb();
  await setDoc(doc(db, 'settings', STATE_DOC), state, { merge: true });
}

export function subscribeToQueue(callback: (entries: QueueEntry[]) => void) {
  const db = getDb();
  const q = query(collection(db, QUEUE_COLLECTION), orderBy('order', 'asc'));
  return onSnapshot(q, snapshot => {
    const entries = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as QueueEntry));
    callback(entries);
  });
}

export function subscribeToQueueState(callback: (state: QueueState) => void) {
  const db = getDb();
  return onSnapshot(doc(db, 'settings', STATE_DOC), snapshot => {
    if (snapshot.exists()) {
      callback(snapshot.data() as QueueState);
    } else {
      callback({ currentIndex: -1, startTime: null });
    }
  });
}
