import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { login } from './adminApi.js';

const LOGO = 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878437/modshine/Logo.jpg';
const BG = 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878427/modshine/hero_living_room.jpg';

export default function LoginScreen({ onLoggedIn, onBackToSite, notice }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Enter your username and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const session = await login(username.trim(), password);
      onLoggedIn(session);
    } catch (err) {
      setError(err.message);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-warm-canvas">
      {/* Visual side */}
      <div className="relative hidden lg:block overflow-hidden bg-brand-darkest">
        <img src={BG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest via-brand-darkest/40 to-brand-darkest/30" />
        <div className="relative h-full flex flex-col justify-between p-12 text-warm-canvas">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Modshine Interior" className="w-11 h-11 rounded-full bg-white p-1" />
            <span className="font-serif text-2xl tracking-[0.14em] uppercase">Modshine</span>
          </div>
          <div className="max-w-md">
            <p className="eyebrow text-gold-champagne"><span className="eyebrow-rule" />Admin Studio</p>
            <h1 className="display text-6xl mt-5">Manage your website <span className="italic gold-gradient-text">content</span></h1>
            <p className="mt-5 text-warm-canvas/70 leading-relaxed">
              Edit every section, upload project photos to Cloudinary, and follow up on customer enquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm mx-auto">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <img src={LOGO} alt="Modshine Interior" className="w-10 h-10 rounded-full bg-white p-1 ring-1 ring-warm-border" />
            <span className="font-serif text-xl tracking-[0.14em] uppercase text-ink-charcoal">Modshine</span>
          </div>

          <h2 className="display text-5xl text-ink-charcoal">Sign in</h2>
          <p className="mt-2 text-sm text-ink-muted">Admin access for Modshine Interior.</p>

          {notice && !error && (
            <div className="mt-6 p-3.5 rounded-[4px] bg-gold-light text-gold-dark text-xs border border-gold-champagne/50">{notice}</div>
          )}
          {error && (
            <div role="alert" className="mt-6 p-3.5 rounded-[4px] bg-[#f6e7e2] text-[#8a3d2b] text-xs border border-[#e8cbc1]">{error}</div>
          )}

          <form onSubmit={submit} className="mt-8 space-y-7" noValidate>
            <div>
              <label htmlFor="admin-user" className="field-label">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-ink-muted absolute left-0 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-user"
                  type="text"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="field !pl-7"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-pass" className="field-label">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ink-muted absolute left-0 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-pass"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field !pl-7 !pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-ink-muted hover:text-ink-charcoal"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-dark w-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4 text-gold-champagne" />}
              <span>{loading ? 'Signing in…' : 'Sign in to Studio'}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <button onClick={onBackToSite} className="mt-10 link-underline text-ink-muted hover:text-ink-charcoal">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to website</span>
          </button>
        </div>
      </div>
    </div>
  );
}
