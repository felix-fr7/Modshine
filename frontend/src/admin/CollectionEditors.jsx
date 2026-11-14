import React, { useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X, Loader2, Star, Phone, MessageCircle, Mail, MapPin, Inbox, Download } from 'lucide-react';
import { SchemaField, getPath, setPath } from './fields.jsx';
import ListEditor from './ListEditor.jsx';
import { adminFetch } from './adminApi.js';

// ---------------------------------------------------------------------------
// Slide-over form used by products & categories
// ---------------------------------------------------------------------------
function Drawer({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-brand-darkest/50 backdrop-blur-sm animate-fadeIn" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-2xl h-full bg-warm-canvas shadow-2xl flex flex-col">
        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-5 border-b border-warm-border">
          <h3 className="font-serif text-3xl text-ink-charcoal">{title}</h3>
          <button onClick={onClose} className="admin-icon-btn" aria-label="Close"><X className="w-4 h-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">{children}</div>
        <div className="px-5 sm:px-8 py-4 border-t border-warm-border bg-white/60 flex justify-end gap-3">{footer}</div>
      </div>
    </div>
  );
}

const slugify = (s) => String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
const productFields = (categories) => [
  { key: 'image', label: 'Main photo', type: 'image', folder: 'products', aspect: 'aspect-[4/5]' },
  { key: 'title', label: 'Design title', wide: true },
  { key: 'category', label: 'Category', type: 'select', options: () => [{ value: '', label: '— Select category —' }, ...categories.map((c) => ({ value: c.slug, label: c.name }))] },
  { key: 'rating', label: 'Rating (1-5)', type: 'number' },
  { key: 'featured', label: 'Signature design badge', type: 'toggle', toggleLabel: 'Show “Signature Design”' },
  { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
  { key: 'boardType', label: 'Core board' },
  { key: 'brand', label: 'Board brand' },
  { key: 'hardware', label: 'Hardware & hinges' },
  { key: 'finish', label: 'Surface finish' },
  { key: 'features', label: 'Execution highlights', type: 'stringList', addLabel: 'Add highlight' },
];

const blankProduct = (categories) => ({
  title: '', category: categories[0]?.slug || '', image: '', featured: false, rating: 5,
  description: '', boardType: '', brand: '', hardware: '', finish: '', features: [], specifications: [],
});

export function ProductsEditor({ products, categories, reload, confirm, toast, onAuthError }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [form, setForm] = useState(null); // { id?, ...fields }
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const filtered = useMemo(() => products.filter((p) =>
    (cat === 'all' || p.category === cat) &&
    (!query || [p.title, p.description, p.brand, p.boardType].some((v) => v && v.toLowerCase().includes(query.toLowerCase())))
  ), [products, cat, query]);

  const save = async () => {
    setError('');
    if (!form.title?.trim()) return setError('Title is required.');
    if (!form.category) return setError('Choose a category.');
    if (!form.image) return setError('Upload a photo.');
    setSaving(true);
    try {
      const category = categories.find((c) => c.slug === form.category);
      const payload = { ...form, categoryName: category?.name || form.categoryName || '', features: (form.features || []).filter(Boolean) };
      if (form.id) await adminFetch(`/api/admin/products/${form.id}`, { method: 'PUT', body: payload });
      else await adminFetch('/api/admin/products', { method: 'POST', body: payload });
      await reload();
      toast(form.id ? 'Design updated' : 'Design added');
      setForm(null);
    } catch (e) {
      if (!onAuthError(e)) setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p) => {
    if (!(await confirm(`Delete “${p.title}”?`, 'This removes the design from the website immediately. Its photo is deleted from Cloudinary if nothing else uses it.'))) return;
    try {
      await adminFetch(`/api/admin/products/${p.id}`, { method: 'DELETE' });
      await reload();
      toast('Design deleted');
    } catch (e) {
      if (!onAuthError(e)) toast(e.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search designs…" className="admin-input !pl-9" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="admin-input sm:max-w-[220px] cursor-pointer">
            <option value="all">All categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name} ({products.filter((p) => p.category === c.slug).length})</option>
            ))}
          </select>
        </div>
        <button onClick={() => { setError(''); setForm(blankProduct(categories)); }} className="admin-btn-primary">
          <Plus className="w-4 h-4" /> Add design
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-card p-10 text-center text-sm text-ink-muted">No designs match.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="admin-card overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] bg-warm-cream">
                {p.image && <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover" />}
                <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-[0.12em] bg-white/90 text-ink-charcoal px-2 py-1 rounded-full">{p.categoryName || p.category}</span>
                {p.featured && <span className="absolute top-2 right-2 text-[10px] font-semibold uppercase tracking-[0.12em] bg-gold-primary text-brand-darkest px-2 py-1 rounded-full">Signature</span>}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="font-semibold text-sm text-ink-charcoal line-clamp-1">{p.title}</p>
                <p className="text-xs text-ink-muted line-clamp-2 mt-1">{p.description}</p>
                <div className="mt-auto pt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs text-ink-body"><Star className="w-3 h-3 fill-gold-primary text-gold-primary" />{p.rating ?? 5}</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setError(''); setForm({ ...blankProduct(categories), ...p }); }} className="admin-icon-btn" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => remove(p)} className="admin-icon-btn hover:!text-[#8a3d2b]" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {form && (
        <Drawer
          title={form.id ? 'Edit design' : 'New design'}
          onClose={() => setForm(null)}
          footer={
            <>
              {error && <p className="mr-auto self-center text-xs text-[#8a3d2b]">{error}</p>}
              <button onClick={() => setForm(null)} className="admin-btn-ghost">Cancel</button>
              <button onClick={save} disabled={saving} className="admin-btn-primary">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} {form.id ? 'Save design' : 'Add design'}
              </button>
            </>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {productFields(categories).map((f) => (
              <SchemaField key={f.key} field={f} value={getPath(form, f.key)} onChange={(v) => setForm((cur) => setPath(cur, f.key, v))} />
            ))}
          </div>
          <div className="mt-8">
            <p className="admin-label">Technical specifications</p>
            <ListEditor
              confirm={confirm}
              value={form.specifications}
              onChange={(v) => setForm((cur) => ({ ...cur, specifications: v }))}
              config={{
                label: 'Specifications', itemLabel: 'specification', idPrefix: 'spec', titleKey: 'label', subtitleKey: 'value',
                fields: [{ key: 'label', label: 'Label' }, { key: 'value', label: 'Value' }],
                template: { label: '', value: '' },
              }}
            />
          </div>
        </Drawer>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
const categoryFields = [
  { key: 'image', label: 'Cover photo', type: 'image', folder: 'categories' },
  { key: 'name', label: 'Name' },
  { key: 'slug', label: 'URL key', hint: 'Lowercase, used to link designs to this category.' },
  { key: 'tagline', label: 'Tagline', wide: true },
  { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
];

export function CategoriesEditor({ categories, products, reload, confirm, toast, onAuthError }) {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const save = async () => {
    setError('');
    const payload = { ...form, slug: slugify(form.slug || form.name) };
    if (!payload.name?.trim()) return setError('Name is required.');
    if (!payload.slug) return setError('URL key is required.');
    if (categories.some((c) => c.slug === payload.slug && c.id !== form.id)) return setError('Another category already uses this URL key.');
    setSaving(true);
    try {
      const original = categories.find((c) => c.id === form.id);
      if (form.id) await adminFetch(`/api/admin/categories/${form.id}`, { method: 'PUT', body: payload });
      else await adminFetch('/api/admin/categories', { method: 'POST', body: payload });

      // Keep designs attached when the URL key or name changes
      if (original && (original.slug !== payload.slug || original.name !== payload.name)) {
        const linked = products.filter((p) => p.category === original.slug);
        await Promise.all(linked.map((p) => adminFetch(`/api/admin/products/${p.id}`, {
          method: 'PUT', body: { category: payload.slug, categoryName: payload.name },
        })));
      }
      await reload();
      toast(form.id ? 'Category updated' : 'Category added');
      setForm(null);
    } catch (e) {
      if (!onAuthError(e)) setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c) => {
    const count = products.filter((p) => p.category === c.slug).length;
    const msg = count
      ? `${count} design(s) use this category. They stay saved but will only show under “All”. Move them to another category first if needed.`
      : 'This category will be removed from the website filters.';
    if (!(await confirm(`Delete “${c.name}”?`, msg))) return;
    try {
      await adminFetch(`/api/admin/categories/${c.id}`, { method: 'DELETE' });
      await reload();
      toast('Category deleted');
    } catch (e) {
      if (!onAuthError(e)) toast(e.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setError(''); setForm({ name: '', slug: '', tagline: '', description: '', image: '' }); }} className="admin-btn-primary">
          <Plus className="w-4 h-4" /> Add category
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="admin-card overflow-hidden">
            <div className="relative aspect-[16/9] bg-warm-cream">
              {c.image && <img src={c.image} alt="" className="absolute inset-0 w-full h-full object-cover" />}
            </div>
            <div className="p-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-sm text-ink-charcoal truncate">{c.name}</p>
                <p className="text-xs text-ink-muted truncate">/{c.slug} · {products.filter((p) => p.category === c.slug).length} designs</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => { setError(''); setForm({ ...c }); }} className="admin-icon-btn" aria-label="Edit"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => remove(c)} className="admin-icon-btn hover:!text-[#8a3d2b]" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {form && (
        <Drawer
          title={form.id ? 'Edit category' : 'New category'}
          onClose={() => setForm(null)}
          footer={
            <>
              {error && <p className="mr-auto self-center text-xs text-[#8a3d2b]">{error}</p>}
              <button onClick={() => setForm(null)} className="admin-btn-ghost">Cancel</button>
              <button onClick={save} disabled={saving} className="admin-btn-primary">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} {form.id ? 'Save category' : 'Add category'}
              </button>
            </>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {categoryFields.map((f) => (
              <SchemaField
                key={f.key}
                field={f}
                value={getPath(form, f.key)}
                onChange={(v) => setForm((cur) => {
                  let next = setPath(cur, f.key, v);
                  if (f.key === 'name' && !cur.id && (!cur.slug || cur.slug === slugify(cur.name))) next = { ...next, slug: slugify(v) };
                  return next;
                })}
              />
            ))}
          </div>
        </Drawer>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Enquiries (leads)
// ---------------------------------------------------------------------------
const STATUSES = ['New', 'Contacted', 'In-Progress', 'Completed'];
const statusStyle = {
  New: 'bg-gold-light text-gold-dark border-gold-champagne',
  Contacted: 'bg-brand-light text-brand-primary border-brand-accent/30',
  'In-Progress': 'bg-[#e8eef6] text-[#2f4b6e] border-[#c9d6e6]',
  Completed: 'bg-warm-cream text-ink-muted border-warm-border',
};

export function InquiriesEditor({ inquiries, reload, confirm, toast, onAuthError }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const list = inquiries.filter((i) =>
    (filter === 'all' || i.status === filter) &&
    (!query || [i.name, i.phone, i.city, i.service, i.message].some((v) => v && String(v).toLowerCase().includes(query.toLowerCase())))
  );

  const setStatus = async (inq, status) => {
    try {
      await adminFetch(`/api/admin/inquiries/${inq.id}`, { method: 'PUT', body: { status } });
      await reload();
      toast(`Marked as ${status}`);
    } catch (e) {
      if (!onAuthError(e)) toast(e.message, 'error');
    }
  };

  const remove = async (inq) => {
    if (!(await confirm(`Delete enquiry from ${inq.name}?`, 'This cannot be undone.'))) return;
    try {
      await adminFetch(`/api/admin/inquiries/${inq.id}`, { method: 'DELETE' });
      await reload();
      toast('Enquiry deleted');
    } catch (e) {
      if (!onAuthError(e)) toast(e.message, 'error');
    }
  };

  const exportCsv = () => {
    const cols = ['createdAt', 'status', 'name', 'phone', 'email', 'city', 'service', 'budget', 'message'];
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [cols.join(','), ...list.map((i) => cols.map((c) => esc(i[c])).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: `modshine-enquiries-${new Date().toISOString().slice(0, 10)}.csv` });
    a.click();
    URL.revokeObjectURL(url);
  };

  const digits = (p) => String(p || '').replace(/[^0-9]/g, '').slice(-10);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {['all', ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3.5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] border transition-colors ${filter === s ? 'bg-ink-charcoal text-warm-canvas border-ink-charcoal' : 'border-warm-border text-ink-body hover:border-ink-charcoal'}`}
            >
              {s === 'all' ? 'All' : s} ({s === 'all' ? inquiries.length : inquiries.filter((i) => i.status === s).length})
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 lg:w-64">
            <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, phone, city…" className="admin-input !pl-9" />
          </div>
          <button onClick={exportCsv} disabled={!list.length} className="admin-btn shrink-0"><Download className="w-3.5 h-3.5" /> CSV</button>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="admin-card p-12 text-center text-sm text-ink-muted">
          <Inbox className="w-8 h-8 mx-auto mb-3 text-ink-muted" strokeWidth={1.25} />
          No enquiries here yet.
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((inq) => (
            <div key={inq.id} className="admin-card p-4 sm:p-5">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-ink-charcoal">{inq.name}</p>
                    <span className={`text-[10px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full border ${statusStyle[inq.status] || statusStyle.New}`}>{inq.status || 'New'}</span>
                    {inq.createdAt && <span className="text-[11px] text-ink-muted">{new Date(inq.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>}
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-body">
                    <a href={`tel:${inq.phone}`} className="inline-flex items-center gap-1.5 hover:text-brand-primary"><Phone className="w-3.5 h-3.5 text-gold-rich" />{inq.phone}</a>
                    {inq.email && <a href={`mailto:${inq.email}`} className="inline-flex items-center gap-1.5 hover:text-brand-primary"><Mail className="w-3.5 h-3.5 text-gold-rich" />{inq.email}</a>}
                    {inq.city && <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gold-rich" />{inq.city}</span>}
                  </div>
                  <p className="text-xs text-ink-muted"><span className="font-semibold text-ink-body">{inq.service}</span>{inq.budget ? ` · ${inq.budget}` : ''}{inq.propertyType ? ` · ${inq.propertyType}` : ''}</p>
                  {inq.message && <p className="text-sm text-ink-body bg-warm-canvas rounded-[4px] p-3 border border-warm-border whitespace-pre-line">{inq.message}</p>}
                </div>
                <div className="flex md:flex-col gap-2 shrink-0 flex-wrap">
                  <select value={inq.status || 'New'} onChange={(e) => setStatus(inq, e.target.value)} className="admin-input !py-2 text-xs cursor-pointer md:w-40">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <a href={`https://wa.me/91${digits(inq.phone)}`} target="_blank" rel="noreferrer" className="admin-btn !py-2"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</a>
                  <button onClick={() => remove(inq)} className="admin-btn-ghost !py-2 text-[#8a3d2b]"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
