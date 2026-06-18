'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/app/Context/theme';

export default function AdminLoginPage() {
  const { accent } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedUser, setFocusedUser] = useState(false);
  const [focusedPass, setFocusedPass] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) { const data = await res.json(); setError(data.error || 'Login failed'); return; }
      router.push('/LAN/admin/dashboard');
    } catch { setError('Network error'); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="w-full max-w-md relative z-10">
        <div className="border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8">
          <div className="text-center mb-8">
            <div className="text-[9px] font-mono tracking-[0.35em] text-zinc-600 uppercase mb-2">Authorization Required</div>
            <h1 className="text-2xl font-black text-white tracking-[-0.02em] uppercase">Admin Access</h1>
            <div className="h-[1px] w-12 mx-auto mt-4" style={{ backgroundColor: accent }} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{ borderColor: focusedUser ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                onFocus={() => setFocusedUser(true)}
                onBlur={() => setFocusedUser(false)}
                placeholder="Enter username" required />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-zinc-900/50 border px-4 py-3 text-white text-sm focus:outline-none transition-colors"
                style={{ borderColor: focusedPass ? `${accent}4d` : 'rgba(255,255,255,0.06)' }}
                onFocus={() => setFocusedPass(true)}
                onBlur={() => setFocusedPass(false)}
                placeholder="Enter password" required />
            </div>
            {error && <div className="border px-4 py-3" style={{ backgroundColor: accent + '4d', borderColor: accent + '33' }}><p className="text-xs font-mono" style={{ color: accent }}>{error}</p></div>}
            <button type="submit" disabled={loading}
              className="w-full text-black py-3 text-sm font-semibold transition-all disabled:opacity-50 uppercase tracking-wider"
              style={{ backgroundColor: hoveredBtn ? `${accent}cc` : accent }}
              onMouseEnter={() => setHoveredBtn(true)}
              onMouseLeave={() => setHoveredBtn(false)}>
              {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
