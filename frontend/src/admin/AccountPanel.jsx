import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, ShieldCheck, KeyRound } from 'lucide-react';
import { changePassword } from './adminApi.js';

function PasswordInput({ id, label, value, onChange, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="admin-label">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input !pr-10"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-ink-muted hover:text-ink-charcoal"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

export default function AccountPanel({ session, onSessionChange, toast, onAuthError }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const strength = next.length >= 12 && /[0-9]/.test(next) && /[^A-Za-z0-9]/.test(next) ? 'Strong' : next.length >= 8 ? 'OK' : next ? 'Too short' : '';

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!current) return setError('Enter your current password.');
    if (next.length < 8) return setError('New password must be at least 8 characters.');
    if (next !== confirm) return setError('The new passwords do not match.');
    setSaving(true);
    try {
      const s = await changePassword(current, next);
      onSessionChange(s);
      setCurrent(''); setNext(''); setConfirm('');
      toast('Password changed — other devices have been signed out');
    } catch (err) {
      if (!onAuthError(err)) setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div className="admin-card p-5 flex items-center gap-4">
        <span className="w-11 h-11 rounded-full bg-brand-light text-brand-primary flex items-center justify-center"><ShieldCheck className="w-5 h-5" /></span>
        <div>
          <p className="text-sm font-semibold text-ink-charcoal">Signed in as <span className="font-mono">{session.username}</span></p>
          <p className="text-xs text-ink-muted">Your login is stored securely in the database (password is hashed).</p>
        </div>
      </div>

      <form onSubmit={submit} className="admin-card p-5 sm:p-6 space-y-5" noValidate>
        <h3 className="font-serif text-2xl text-ink-charcoal flex items-center gap-2"><KeyRound className="w-5 h-5 text-gold-rich" /> Change password</h3>
        {error && <div role="alert" className="p-3 rounded-[4px] bg-[#f6e7e2] text-[#8a3d2b] text-xs border border-[#e8cbc1]">{error}</div>}
        <PasswordInput id="cur-pass" label="Current password" value={current} onChange={setCurrent} autoComplete="current-password" />
        <div>
          <PasswordInput id="new-pass" label="New password" value={next} onChange={setNext} autoComplete="new-password" />
          {strength && (
            <p className={`mt-1.5 text-[11px] ${strength === 'Too short' ? 'text-[#8a3d2b]' : strength === 'Strong' ? 'text-brand-accent' : 'text-ink-muted'}`}>
              {strength}{strength !== 'Strong' && ' — use 12+ characters with numbers and symbols for a strong password.'}
            </p>
          )}
        </div>
        <PasswordInput id="new-pass-2" label="Confirm new password" value={confirm} onChange={setConfirm} autoComplete="new-password" />
        <button type="submit" disabled={saving} className="admin-btn-primary">
          {saving && <Loader2 className="w-4 h-4 animate-spin" />} Update password
        </button>
      </form>
    </div>
  );
}
