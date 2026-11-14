import React, { useRef, useState } from 'react';
import { Upload, Loader2, Trash2, Plus, ArrowUp, ArrowDown, X, CloudCheck, AlertTriangle, ImageOff } from 'lucide-react';
import { ICON_NAMES, getIcon } from '../data/icons.js';
import { fileToDataUrl, uploadImage, isCloudinaryUrl } from './adminApi.js';

// ---------------------------------------------------------------------------
// path helpers (immutable)
// ---------------------------------------------------------------------------
export const getPath = (obj, path) =>
  String(path).split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);

export function setPath(obj, path, value) {
  const keys = String(path).split('.');
  const clone = Array.isArray(obj) ? [...obj] : { ...(obj || {}) };
  let cur = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    const next = cur[k];
    cur[k] = Array.isArray(next) ? [...next] : { ...(next || {}) };
    cur = cur[k];
  }
  cur[keys[keys.length - 1]] = value;
  return clone;
}

export const newId = (prefix = 'item') => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// ---------------------------------------------------------------------------
// Basic inputs
// ---------------------------------------------------------------------------
export function FieldShell({ label, hint, children, wide }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      {label && <label className="admin-label">{label}</label>}
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-ink-muted leading-snug">{hint}</p>}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange(type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
      className="admin-input"
    />
  );
}

export function TextArea({ value, onChange, rows = 3, placeholder }) {
  return (
    <textarea
      rows={rows}
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="admin-input resize-y leading-relaxed"
    />
  );
}

export function Toggle({ value, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center gap-3 text-sm text-ink-body"
      aria-pressed={!!value}
    >
      <span className={`relative w-10 h-6 rounded-full transition-colors ${value ? 'bg-brand-primary' : 'bg-warm-border'}`}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? 'left-5' : 'left-1'}`} />
      </span>
      {label}
    </button>
  );
}

export function SelectInput({ value, onChange, options }) {
  return (
    <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="admin-input cursor-pointer">
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function ColorInput({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={/^#[0-9a-f]{6}$/i.test(value || '') ? value : '#cccccc'}
        onChange={(e) => onChange(e.target.value)}
        className="w-11 h-11 rounded-[4px] border border-warm-border bg-white cursor-pointer p-1"
      />
      <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="admin-input font-mono text-xs" placeholder="#000000" />
    </div>
  );
}

export function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const Current = getIcon(value);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} className="admin-input flex items-center gap-2.5 text-left">
        <Current className="w-4 h-4 text-brand-primary" />
        <span>{value || 'Choose icon'}</span>
      </button>
      {open && (
        <div className="absolute z-30 mt-2 w-72 p-2 grid grid-cols-6 gap-1 bg-white border border-warm-border rounded-[6px] shadow-luxury-lg">
          {ICON_NAMES.map((name) => {
            const Icon = getIcon(name);
            return (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => { onChange(name); setOpen(false); }}
                className={`h-10 rounded-[4px] flex items-center justify-center hover:bg-warm-cream ${value === name ? 'bg-brand-primary text-warm-canvas hover:bg-brand-primary' : 'text-ink-body'}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cloudinary image field
// ---------------------------------------------------------------------------
export function ImageInput({ value, onChange, folder = 'content', aspect = 'aspect-[4/3]' }) {
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [urlDraft, setUrlDraft] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const dataUrl = await fileToDataUrl(file);
      const url = await uploadImage(dataUrl, folder);
      onChange(url);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const importUrl = async () => {
    const src = urlDraft.trim();
    if (!src) return;
    setBusy(true);
    setError('');
    try {
      const url = isCloudinaryUrl(src) ? src : await uploadImage(src, folder);
      onChange(url);
      setUrlDraft('');
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const onCloudinary = isCloudinaryUrl(value);

  return (
    <div className="space-y-2.5">
      <div
        className={`relative ${aspect} w-full max-w-sm rounded-[6px] overflow-hidden border border-dashed ${value ? 'border-warm-border' : 'border-ink-charcoal/25'} bg-warm-cream/60 group`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
      >
        {value ? (
          <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-ink-muted text-xs gap-2">
            <ImageOff className="w-6 h-6" strokeWidth={1.25} />
            <span>Drop an image or click Upload</span>
          </div>
        )}
        {busy && (
          <div className="absolute inset-0 bg-brand-darkest/60 flex items-center justify-center text-warm-canvas text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Uploading to Cloudinary…
          </div>
        )}
        {value && !busy && (
          <span className={`absolute left-2 bottom-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${onCloudinary ? 'bg-white/90 text-brand-primary' : 'bg-[#f6e7e2] text-[#8a3d2b]'}`}>
            {onCloudinary ? <CloudCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
            {onCloudinary ? 'Cloudinary' : 'Not on Cloudinary'}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className="admin-btn">
          <Upload className="w-3.5 h-3.5" /> {value ? 'Replace' : 'Upload'}
        </button>
        {value && (
          <button type="button" disabled={busy} onClick={() => onChange('')} className="admin-btn-ghost text-[#8a3d2b]">
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        )}
      </div>

      <div className="flex gap-2 max-w-sm">
        <input
          value={urlDraft}
          onChange={(e) => setUrlDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); importUrl(); } }}
          placeholder="…or paste an image link"
          className="admin-input !py-2 text-xs"
        />
        <button type="button" disabled={busy || !urlDraft.trim()} onClick={importUrl} className="admin-btn shrink-0">Import</button>
      </div>
      {!onCloudinary && value && (
        <button type="button" onClick={() => { setUrlDraft(value); }} className="text-[11px] text-[#8a3d2b] underline">
          Move this image to Cloudinary
        </button>
      )}
      {error && <p className="text-[11px] text-[#8a3d2b]">{error}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// List of plain strings
// ---------------------------------------------------------------------------
export function StringList({ value, onChange, multiline = false, addLabel = 'Add line', placeholder }) {
  const items = Array.isArray(value) ? value : [];
  const update = (i, v) => onChange(items.map((x, idx) => (idx === i ? v : x)));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-3 w-5 text-[11px] text-ink-muted font-serif italic shrink-0">{i + 1}.</span>
          {multiline ? (
            <textarea rows={3} value={item} onChange={(e) => update(i, e.target.value)} className="admin-input resize-y" placeholder={placeholder} />
          ) : (
            <input value={item} onChange={(e) => update(i, e.target.value)} className="admin-input" placeholder={placeholder} />
          )}
          <div className="flex flex-col sm:flex-row gap-1 shrink-0 pt-1">
            <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="admin-icon-btn" aria-label="Move up"><ArrowUp className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="admin-icon-btn" aria-label="Move down"><ArrowDown className="w-3.5 h-3.5" /></button>
            <button type="button" onClick={() => remove(i)} className="admin-icon-btn hover:!text-[#8a3d2b]" aria-label="Delete"><X className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ''])} className="admin-btn-ghost">
        <Plus className="w-3.5 h-3.5" /> {addLabel}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Schema-driven field renderer
// ---------------------------------------------------------------------------
export function SchemaField({ field, value, onChange }) {
  const { type = 'text', label, hint, options, folder, rows, aspect, placeholder } = field;
  let control;
  switch (type) {
    case 'textarea':
      control = <TextArea value={value} onChange={onChange} rows={rows || 3} placeholder={placeholder} />;
      break;
    case 'number':
      control = <TextInput type="number" value={value} onChange={onChange} placeholder={placeholder} />;
      break;
    case 'image':
      control = <ImageInput value={value} onChange={onChange} folder={folder} aspect={aspect} />;
      break;
    case 'icon':
      control = <IconPicker value={value} onChange={onChange} />;
      break;
    case 'color':
      control = <ColorInput value={value} onChange={onChange} />;
      break;
    case 'toggle':
      control = <Toggle value={value} onChange={onChange} label={field.toggleLabel} />;
      break;
    case 'select':
      control = <SelectInput value={value} onChange={onChange} options={typeof options === 'function' ? options() : options} />;
      break;
    case 'stringList':
      control = <StringList value={value} onChange={onChange} multiline={field.multiline} addLabel={field.addLabel} placeholder={placeholder} />;
      break;
    default:
      control = <TextInput value={value} onChange={onChange} placeholder={placeholder} />;
  }
  const wide = field.wide ?? ['textarea', 'image', 'stringList'].includes(type);
  return <FieldShell label={label} hint={hint} wide={wide}>{control}</FieldShell>;
}
