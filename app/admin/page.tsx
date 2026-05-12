'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  UserPlus,
  Users as UsersIcon,
  Loader2,
  AlertCircle,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { addUser, deleteUser, listUsers, type UserRecord } from '@/lib/users';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123';
const SESSION_KEY = 'thiepvui_admin_auth';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === 'yes');
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!authed) {
    return <LoginForm onSuccess={() => setAuthed(true)} />;
  }
  return <Dashboard onLogout={() => setAuthed(false)} />;
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'yes');
      onSuccess();
    } else {
      setErr('Sai tài khoản hoặc mật khẩu');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yearbook-navy to-blue-800 px-4">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-3xl bg-white/95 backdrop-blur p-6 shadow-2xl"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-yearbook-navy text-yearbook-gold mb-3">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-yearbook-navy">Đăng nhập Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Quản lý người dùng Thiệp Vui</p>

        <div className="mt-5 space-y-3">
          <div>
            <label className="label">Tài khoản</label>
            <input
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoFocus
              autoComplete="username"
            />
          </div>
          <div>
            <label className="label">Mật khẩu</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="current-password"
            />
          </div>
          {err && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              <AlertCircle className="w-4 h-4" /> {err}
            </div>
          )}
          <button type="submit" className="btn-primary w-full mt-2">
            Đăng nhập
          </button>
        </div>

        <Link href="/" className="block text-center text-xs text-gray-500 hover:text-yearbook-navy mt-4">
          ← Quay về trang chủ
        </Link>
      </motion.form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      setUsers(await listUsers());
    } catch (e: any) {
      setError(e?.message ?? 'Không tải được danh sách');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    onLogout();
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setError(null);
    setSuccess(null);
    setAdding(true);
    try {
      await addUser(name);
      setSuccess(`Đã tạo "${name}"`);
      setNewName('');
      await refresh();
      setTimeout(() => setSuccess(null), 2500);
    } catch (e: any) {
      setError(e?.message ?? 'Lỗi tạo người dùng');
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xoá "${name}"? Thiệp đã tạo của họ không bị ảnh hưởng nhưng họ không thể tạo thêm.`)) return;
    try {
      await deleteUser(id);
      await refresh();
    } catch (e: any) {
      setError(e?.message ?? 'Lỗi xoá');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yearbook-cream via-white to-blue-50">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-yearbook-navy text-yearbook-gold flex items-center justify-center">
              <UsersIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-yearbook-navy">Quản lý người dùng</p>
              <p className="text-xs text-gray-500">Thiệp Vui · Admin</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-6">
        {/* Add form */}
        <section className="rounded-3xl bg-white shadow-md border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <UserPlus className="w-5 h-5 text-yearbook-navy" />
            <h2 className="font-semibold text-yearbook-navy">Cấp tên người dùng mới</h2>
          </div>
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              className="input-field flex-1"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="VD: Bảo Anh, hoặc minh.duc.k20..."
              disabled={adding}
            />
            <button
              type="submit"
              disabled={!newName.trim() || adding}
              className="btn-primary shrink-0 disabled:opacity-60"
            >
              {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {adding ? 'Đang lưu' : 'Thêm'}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            Tên này là "mã" để người dùng nhập khi tạo thiệp và xem RSVP. Có thể là tên thật, biệt danh, mã lớp...
          </p>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-700"
              >
                <Check className="w-4 h-4" /> {success}
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700"
              >
                <AlertCircle className="w-4 h-4" /> {error}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* User list */}
        <section className="mt-6 rounded-3xl bg-white shadow-md border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5 text-yearbook-navy" />
              <h2 className="font-semibold text-yearbook-navy">Danh sách người dùng</h2>
            </div>
            <span className="text-sm text-gray-500">{users.length} người</span>
          </div>

          {loading ? (
            <div className="px-5 py-10 text-center text-sm text-gray-500">
              <Loader2 className="w-6 h-6 mx-auto animate-spin text-yearbook-navy" />
              <p className="mt-2">Đang tải...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-gray-500">
              Chưa có người dùng. Cấp tên đầu tiên ở trên!
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {users.map((u) => (
                <li key={u.id} className="px-5 py-3 flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-yearbook-gold/20 text-yearbook-navy flex items-center justify-center font-semibold">
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{u.name}</p>
                    <p className="text-xs text-gray-500 font-mono truncate">{u.id}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(u.id, u.name)}
                    className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition"
                    title="Xoá"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="text-xs text-gray-500 text-center mt-6">
          💡 Người dùng vào trang chủ, bấm "Tạo thiệp" → nhập tên (khớp với danh sách trên) → mới tạo được thiệp.
        </p>
      </main>
    </div>
  );
}
