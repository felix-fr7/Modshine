import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutDashboard, Package, FolderTree, Inbox, LogOut, ExternalLink, Save, RotateCcw, Loader2, Menu, X,
  AlertTriangle, CheckCircle2, Database, CloudCheck, ArrowRight, KeyRound,
} from 'lucide-react';
import AccountPanel from './AccountPanel.jsx';
import { CONTENT_SECTIONS } from './schema.js';
import { SchemaField, getPath, setPath } from './fields.jsx';
import ListEditor from './ListEditor.jsx';
import { ProductsEditor, CategoriesEditor, InquiriesEditor } from './CollectionEditors.jsx';
import { adminFetch, publicFetch, AuthError } from './adminApi.js';
import { mergeContent, CONTENT_VERSION } from '../data/siteContent.js';

const LOGO = 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878437/modshine/Logo.jpg';

// ---------------------------------------------------------------------------
// Small UI helpers: confirm dialog + toasts
// ---------------------------------------------------------------------------
function useConfirm() {
  const [state, setState] = useState(null);
  const confirm = useCallback((title, message) => new Promise((resolve) => setState({ title, message, resolve })), []);
  const close = (v) => { state?.resolve(v); setState(null); };
  const dialog = state && (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-brand-darkest/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-warm-canvas rounded-[6px] shadow-2xl p-6 sm:p-8">
        <div className="w-11 h-11 rounded-full bg-[#f6e7e2] text-[#8a3d2b] flex items-center justify-center mb-4"><AlertTriangle className="w-5 h-5" /></div>
        <h3 className="font-serif text-2xl text-ink-charcoal">{state.title}</h3>
        {state.message && <p className="mt-2 text-sm text-ink-muted leading-relaxed">{state.message}</p>}
        <div className="mt-7 flex justify-end gap-3">
          <button onClick={() => close(false)} className="admin-btn-ghost">Cancel</button>
          <button onClick={() => close(true)} className="admin-btn-danger" autoFocus>Delete</button>
        </div>
      </div>
    </div>
  );
  return [confirm, dialog];
}

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const toast = useCallback((message, tone = 'ok') => {
    const id = Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);
  const view = (
    <div className="fixed bottom-24 right-4 z-[95] space-y-2 w-[min(360px,calc(100vw-2rem))]">
      {toasts.map((t) => (
        <div key={t.id} className={`flex items-center gap-2.5 px-4 py-3 rounded-[6px] shadow-luxury-lg text-sm animate-fadeIn ${t.tone === 'error' ? 'bg-[#8a3d2b] text-white' : 'bg-brand-darkest text-warm-canvas'}`}>
          {t.tone === 'error' ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-gold-champagne shrink-0" />}
          {t.message}
        </div>
      ))}
    </div>
  );
  return [toast, view];
}

// ---------------------------------------------------------------------------
// Content section page
// ---------------------------------------------------------------------------
function ContentSection({ section, draft, setDraft, confirm }) {
  return (
    <div className="space-y-10">
      {section.groups.map((group, gi) => (
        <section key={gi}>
          <h3 className="font-serif text-2xl text-ink-charcoal mb-4">{group.title}</h3>
          {group.type === 'list' ? (
            <ListEditor
              config={group.config}
              value={getPath(draft, group.key)}
              onChange={(v) => setDraft((d) => setPath(d, group.key, v))}
              confirm={confirm}
            />
          ) : (
            <div className="admin-card p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {group.fields.map((f) => (
                <SchemaField key={f.key} field={f} value={getPath(draft, f.key)} onChange={(v) => setDraft((d) => setPath(d, f.key, v))} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------
function Dashboard({ overview, products, categories, inquiries, go }) {
  const newLeads = inquiries.filter((i) => i.status === 'New');
  const cards = [
    { label: 'New enquiries', value: newLeads.length, page: 'inquiries' },
    { label: 'Total enquiries', value: inquiries.length, page: 'inquiries' },
    { label: 'Catalog designs', value: products.length, page: 'products' },
    { label: 'Categories', value: categories.length, page: 'categories' },
  ];
  const durable = overview?.databaseMode?.startsWith('MongoDB');
  return (
    <div className="space-y-8">
      {overview && !durable && (
        <div className="p-4 rounded-[6px] bg-[#f6e7e2] border border-[#e8cbc1] text-[#8a3d2b] text-sm flex gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-semibold">Database not connected — changes may be lost.</p>
            <p className="text-xs mt-1">The server is using temporary local storage. Check MONGODB_URI on the server and MongoDB Atlas network access.</p>
            {overview.databaseError && <p className="text-xs mt-2 font-mono break-words opacity-90">Reason: {overview.databaseError}</p>}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <button key={c.label} onClick={() => go(c.page)} className="admin-card p-5 text-left hover:shadow-luxury transition-shadow">
            <p className="font-serif text-5xl text-ink-charcoal leading-none">{c.value}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] font-semibold text-ink-muted">{c.label}</p>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="admin-card p-5 flex items-center gap-4">
          <Database className={`w-6 h-6 ${durable ? 'text-brand-accent' : 'text-[#8a3d2b]'}`} />
          <div>
            <p className="text-sm font-semibold text-ink-charcoal">Database</p>
            <p className="text-xs text-ink-muted">{overview?.databaseMode || '…'}</p>
          </div>
        </div>
        <div className="admin-card p-5 flex items-center gap-4">
          <CloudCheck className={`w-6 h-6 ${overview?.cloudinary ? 'text-brand-accent' : 'text-[#8a3d2b]'}`} />
          <div>
            <p className="text-sm font-semibold text-ink-charcoal">Cloudinary images</p>
            <p className="text-xs text-ink-muted">{overview ? (overview.cloudinary ? 'Connected — uploads enabled' : 'Not configured on server') : '…'}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-2xl text-ink-charcoal">Latest enquiries</h3>
          <button onClick={() => go('inquiries')} className="link-underline text-brand-primary !text-[11px]">View all <ArrowRight className="w-3.5 h-3.5" /></button>
        </div>
        <div className="admin-card divide-y divide-warm-border">
          {inquiries.slice(0, 5).map((i) => (
            <div key={i.id} className="p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink-charcoal truncate">{i.name} <span className="font-normal text-ink-muted">· {i.city}</span></p>
                <p className="text-xs text-ink-muted truncate">{i.service}</p>
              </div>
              <a href={`tel:${i.phone}`} className="text-xs font-semibold text-brand-primary shrink-0">{i.phone}</a>
            </div>
          ))}
          {inquiries.length === 0 && <p className="p-6 text-sm text-ink-muted text-center">No enquiries yet.</p>}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Studio shell
// ---------------------------------------------------------------------------
export default function AdminStudio({ session, onLogout, onBackToSite, onContentSaved, onSessionChange }) {
  const [page, setPage] = useState('dashboard');
  const [navOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [baseline, setBaseline] = useState(null);
  const [draft, setDraft] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [overview, setOverview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirm, confirmDialog] = useConfirm();
  const [toast, toastView] = useToasts();
  const mainRef = useRef(null);

  const onAuthError = useCallback((e) => {
    if (e instanceof AuthError) {
      onLogout('Your session expired. Please sign in again.');
      return true;
    }
    return false;
  }, [onLogout]);

  const loadCollections = useCallback(async () => {
    const [p, c] = await Promise.all([publicFetch('/api/products'), publicFetch('/api/categories')]);
    setProducts(Array.isArray(p) ? p : []);
    setCategories(Array.isArray(c) ? c : []);
  }, []);

  const loadInquiries = useCallback(async () => {
    const [inq, ov] = await Promise.all([adminFetch('/api/admin/inquiries'), adminFetch('/api/admin/overview')]);
    setInquiries(Array.isArray(inq) ? inq : []);
    setOverview(ov);
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const settings = await publicFetch('/api/settings');
      const merged = mergeContent(settings);
      setBaseline(JSON.stringify(merged));
      setDraft(merged);
      await Promise.all([loadCollections(), loadInquiries()]);
    } catch (e) {
      if (!onAuthError(e)) setLoadError(e.message);
    } finally {
      setLoading(false);
    }
  }, [loadCollections, loadInquiries, onAuthError]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const dirty = draft && baseline !== null && JSON.stringify(draft) !== baseline;

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const saveContent = async () => {
    setSaving(true);
    try {
      const payload = { ...draft, contentVersion: CONTENT_VERSION };
      const res = await adminFetch('/api/admin/settings', { method: 'PUT', body: payload });
      const merged = mergeContent(res.settings || payload);
      setBaseline(JSON.stringify(merged));
      setDraft(merged);
      onContentSaved?.(res.settings || payload);
      toast('Saved — the website is updated');
    } catch (e) {
      if (!onAuthError(e)) toast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const discard = async () => {
    if (!(await confirm('Discard unsaved changes?', 'Your edits since the last save will be lost.'))) return;
    setDraft(JSON.parse(baseline));
  };

  const go = (id) => {
    setPage(id);
    setNavOpen(false);
    mainRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  };

  const newLeads = inquiries.filter((i) => i.status === 'New').length;
  const nav = [
    { heading: null, items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
    { heading: 'Website content', items: CONTENT_SECTIONS.map((s) => ({ id: s.id, label: s.label, icon: s.icon })) },
    {
      heading: 'Catalog',
      items: [
        { id: 'products', label: 'Designs', icon: Package, count: products.length },
        { id: 'categories', label: 'Categories', icon: FolderTree, count: categories.length },
      ],
    },
    { heading: 'Leads', items: [{ id: 'inquiries', label: 'Enquiries', icon: Inbox, count: newLeads, highlight: newLeads > 0 }] },
    { heading: 'Settings', items: [{ id: 'account', label: 'Account & Password', icon: KeyRound }] },
  ];

  const section = CONTENT_SECTIONS.find((s) => s.id === page);
  const titles = {
    dashboard: ['Dashboard', `Welcome back, ${session.username}.`],
    products: ['Catalog designs', 'Add, edit or delete the designs shown in the portfolio. Changes go live immediately.'],
    categories: ['Categories', 'Filters shown above the portfolio. Changes go live immediately.'],
    inquiries: ['Enquiries', 'Leads from the contact form and booking popup.'],
    account: ['Account & Password', 'Change the admin password. Other signed-in devices are signed out automatically.'],
  };
  const [title, subtitle] = section ? [section.label, section.description] : titles[page] || ['', ''];

  const Sidebar = (
    <nav className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10 shrink-0">
        <img src={LOGO} alt="" className="w-9 h-9 rounded-full bg-white p-0.5" />
        <div className="leading-none">
          <p className="font-serif text-lg tracking-[0.14em] uppercase text-warm-canvas">Modshine</p>
          <p className="text-[9px] tracking-[0.24em] uppercase text-gold-champagne mt-1">Admin Studio</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {nav.map((g, gi) => (
          <div key={gi}>
            {g.heading && <p className="px-3 mb-1.5 text-[9px] uppercase tracking-[0.24em] text-warm-canvas/40 font-semibold">{g.heading}</p>}
            {g.items.map((it) => {
              const Icon = it.icon;
              const active = page === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => go(it.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-[13px] transition-colors ${active ? 'bg-white/10 text-warm-canvas' : 'text-warm-canvas/65 hover:text-warm-canvas hover:bg-white/5'}`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-gold-champagne' : ''}`} strokeWidth={1.6} />
                  <span className="flex-1 text-left truncate">{it.label}</span>
                  {it.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${it.highlight ? 'bg-gold-primary text-brand-darkest font-semibold' : 'text-warm-canvas/40'}`}>{it.count}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-white/10 space-y-1 shrink-0">
        <a href="/" target="_blank" rel="noreferrer" className="w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-[13px] text-warm-canvas/65 hover:text-warm-canvas hover:bg-white/5">
          <ExternalLink className="w-4 h-4" strokeWidth={1.6} /> View live site
        </a>
        <button onClick={() => onLogout()} className="w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-[13px] text-warm-canvas/65 hover:text-warm-canvas hover:bg-white/5">
          <LogOut className="w-4 h-4" strokeWidth={1.6} /> Sign out ({session.username})
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f3efe8] text-ink-body font-sans lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-brand-darkest z-40">{Sidebar}</aside>

      {/* Mobile sidebar */}
      {navOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex">
          <aside className="w-72 max-w-[85vw] bg-brand-darkest h-full">{Sidebar}</aside>
          <button className="flex-1 bg-brand-darkest/50" onClick={() => setNavOpen(false)} aria-label="Close menu" />
        </div>
      )}

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#f3efe8]/90 backdrop-blur-md border-b border-warm-border">
        <div className="flex items-center gap-3 h-16 px-4 sm:px-8">
          <button onClick={() => setNavOpen(true)} className="lg:hidden admin-icon-btn" aria-label="Open menu"><Menu className="w-4 h-4" /></button>
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-2xl sm:text-3xl text-ink-charcoal leading-none truncate">{title}</h1>
          </div>
          <button onClick={onBackToSite} className="hidden sm:inline-flex admin-btn-ghost">Back to website</button>
        </div>
      </header>

      <main ref={mainRef} className="px-4 sm:px-8 py-8 pb-32 max-w-5xl">
        {subtitle && <p className="text-sm text-ink-muted mb-8 max-w-2xl">{subtitle}</p>}

        {loading ? (
          <div className="flex items-center gap-3 text-sm text-ink-muted py-20 justify-center"><Loader2 className="w-5 h-5 animate-spin" /> Loading your content…</div>
        ) : loadError ? (
          <div className="admin-card p-8 text-center space-y-4">
            <p className="text-sm text-[#8a3d2b]">{loadError}</p>
            <button onClick={loadAll} className="admin-btn-primary">Try again</button>
          </div>
        ) : (
          <>
            {page === 'dashboard' && <Dashboard overview={overview} products={products} categories={categories} inquiries={inquiries} go={go} />}
            {section && <ContentSection section={section} draft={draft} setDraft={setDraft} confirm={confirm} />}
            {page === 'products' && <ProductsEditor products={products} categories={categories} reload={loadCollections} confirm={confirm} toast={toast} onAuthError={onAuthError} />}
            {page === 'categories' && <CategoriesEditor categories={categories} products={products} reload={loadCollections} confirm={confirm} toast={toast} onAuthError={onAuthError} />}
            {page === 'account' && <AccountPanel session={session} onSessionChange={onSessionChange} toast={toast} onAuthError={onAuthError} />}
            {page === 'inquiries' && <InquiriesEditor inquiries={inquiries} reload={loadInquiries} confirm={confirm} toast={toast} onAuthError={onAuthError} />}
          </>
        )}
      </main>

      {/* Unsaved changes bar */}
      {dirty && (
        <div className="fixed bottom-0 inset-x-0 lg:left-64 z-50 bg-brand-darkest text-warm-canvas border-t border-gold-champagne/20 animate-fadeIn">
          <div className="max-w-5xl px-4 sm:px-8 py-3.5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse shrink-0" />
            <p className="text-sm flex-1 min-w-0 truncate">You have unsaved website changes</p>
            <button onClick={discard} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-white/20 hover:bg-white/10">
              <RotateCcw className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Discard</span>
            </button>
            <button onClick={saveContent} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-gold-primary text-brand-darkest hover:bg-gold-champagne">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save changes
            </button>
          </div>
        </div>
      )}

      {confirmDialog}
      {toastView}
    </div>
  );
}
