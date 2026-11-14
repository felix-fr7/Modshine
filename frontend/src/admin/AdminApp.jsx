import React, { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import LoginScreen from './LoginScreen.jsx';
import AdminStudio from './AdminStudio.jsx';
import { getSession, clearSession, adminFetch, AuthError } from './adminApi.js';
import { useNoIndex } from '../seo/useSeo.js';

/** /admin entry: verifies the stored session, otherwise shows the login screen. */
export default function AdminApp({ onBackToSite, onContentSaved }) {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [notice, setNotice] = useState('');
  useNoIndex();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Admin Studio · Modshine Interior';
    const existing = getSession();
    if (!existing) {
      setChecking(false);
      return () => { document.title = previousTitle; };
    }
    adminFetch('/api/auth/me')
      .then(() => setSession(existing))
      .catch((e) => {
        if (e instanceof AuthError) clearSession();
        else setSession(existing); // server unreachable — let the studio show the error
      })
      .finally(() => setChecking(false));
    return () => { document.title = previousTitle; };
  }, []);

  const logout = useCallback((message) => {
    clearSession();
    setSession(null);
    setNotice(typeof message === 'string' ? message : '');
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-canvas text-ink-muted text-sm gap-3">
        <Loader2 className="w-5 h-5 animate-spin" /> Checking session…
      </div>
    );
  }

  if (!session) {
    return <LoginScreen notice={notice} onBackToSite={onBackToSite} onLoggedIn={(s) => { setNotice(''); setSession(s); }} />;
  }

  return <AdminStudio session={session} onLogout={logout} onBackToSite={onBackToSite} onContentSaved={onContentSaved} />;
}
