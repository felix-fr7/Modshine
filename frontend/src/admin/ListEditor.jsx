import React, { useState } from 'react';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Copy, ChevronDown, ImageOff } from 'lucide-react';
import { SchemaField, getPath, setPath, newId } from './fields.jsx';
import { getIcon } from '../data/icons.js';

/**
 * Editable list of objects: add, edit (inline), duplicate, reorder, delete.
 * `config` = { label, itemLabel, idPrefix, titleKey, subtitleKey, imageKey, iconKey, fields, template }
 */
export default function ListEditor({ config, value, onChange, confirm }) {
  const items = Array.isArray(value) ? value : [];
  const [openIdx, setOpenIdx] = useState(null);

  const update = (i, next) => onChange(items.map((it, idx) => (idx === i ? next : it)));

  const add = () => {
    const base = typeof config.template === 'function' ? config.template(items) : { ...(config.template || {}) };
    const item = { id: newId(config.idPrefix || 'item'), ...base };
    onChange([...items, item]);
    setOpenIdx(items.length);
  };

  const duplicate = (i) => {
    const copy = { ...JSON.parse(JSON.stringify(items[i])), id: newId(config.idPrefix || 'item') };
    const next = [...items];
    next.splice(i + 1, 0, copy);
    onChange(next);
    setOpenIdx(i + 1);
  };

  const remove = async (i) => {
    const name = getPath(items[i], config.titleKey) || `this ${config.itemLabel || 'item'}`;
    const ok = await confirm(`Delete "${name}"?`, 'It will be removed from the website when you save.');
    if (!ok) return;
    onChange(items.filter((_, idx) => idx !== i));
    setOpenIdx(null);
  };

  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    if (openIdx === i) setOpenIdx(j);
    else if (openIdx === j) setOpenIdx(i);
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <div className="admin-card p-8 text-center text-sm text-ink-muted">
          No {config.label?.toLowerCase() || 'items'} yet. Add the first one below.
        </div>
      )}

      {items.map((item, i) => {
        const open = openIdx === i;
        const title = getPath(item, config.titleKey) || `Untitled ${config.itemLabel || 'item'}`;
        const subtitle = config.subtitleKey ? getPath(item, config.subtitleKey) : '';
        const image = config.imageKey ? getPath(item, config.imageKey) : '';
        const Icon = config.iconKey ? getIcon(getPath(item, config.iconKey)) : null;
        return (
          <div key={item.id || i} className={`admin-card overflow-hidden transition-shadow ${open ? 'shadow-luxury ring-1 ring-brand-primary/20' : ''}`}>
            <div className="flex items-center gap-3 p-3 sm:p-4">
              <span className="w-6 text-center font-serif italic text-gold-rich text-sm shrink-0">{i + 1}</span>

              {config.imageKey && (
                <span className="w-12 h-12 rounded-[4px] overflow-hidden bg-warm-cream shrink-0 flex items-center justify-center">
                  {image ? <img src={image} alt="" className="w-full h-full object-cover" /> : <ImageOff className="w-4 h-4 text-ink-muted" />}
                </span>
              )}
              {!config.imageKey && config.swatch && (
                <span className="w-10 h-12 arch shrink-0 ring-1 ring-warm-border bg-cover bg-center" style={{ backgroundImage: config.swatch(item) }} />
              )}
              {Icon && !config.imageKey && (
                <span className="w-10 h-10 rounded-full border border-warm-border flex items-center justify-center text-brand-primary shrink-0">
                  <Icon className="w-4 h-4" />
                </span>
              )}

              <button type="button" onClick={() => setOpenIdx(open ? null : i)} className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-ink-charcoal truncate">{title}</p>
                {subtitle && <p className="text-xs text-ink-muted truncate">{subtitle}</p>}
              </button>

              <div className="flex items-center gap-1 shrink-0">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="admin-icon-btn hidden sm:flex" aria-label="Move up"><ArrowUp className="w-3.5 h-3.5" /></button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="admin-icon-btn hidden sm:flex" aria-label="Move down"><ArrowDown className="w-3.5 h-3.5" /></button>
                <button type="button" onClick={() => duplicate(i)} className="admin-icon-btn hidden sm:flex" aria-label="Duplicate"><Copy className="w-3.5 h-3.5" /></button>
                <button type="button" onClick={() => setOpenIdx(open ? null : i)} className={`admin-icon-btn ${open ? '!bg-brand-primary !text-warm-canvas !border-brand-primary' : ''}`} aria-label="Edit">
                  {open ? <ChevronDown className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
                </button>
                <button type="button" onClick={() => remove(i)} className="admin-icon-btn hover:!text-[#8a3d2b] hover:!border-[#e8cbc1]" aria-label="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            {open && (
              <div className="border-t border-warm-border bg-warm-canvas/50 p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {config.fields.map((f) => (
                    <SchemaField
                      key={f.key}
                      field={f}
                      value={getPath(item, f.key)}
                      onChange={(v) => update(i, setPath(item, f.key, v))}
                    />
                  ))}
                </div>
                <div className="mt-5 flex sm:hidden gap-2">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="admin-btn-ghost"><ArrowUp className="w-3.5 h-3.5" /> Up</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="admin-btn-ghost"><ArrowDown className="w-3.5 h-3.5" /> Down</button>
                  <button type="button" onClick={() => duplicate(i)} className="admin-btn-ghost"><Copy className="w-3.5 h-3.5" /> Copy</button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button type="button" onClick={add} className="admin-btn w-full sm:w-auto justify-center">
        <Plus className="w-4 h-4" /> Add {config.itemLabel || 'item'}
      </button>
    </div>
  );
}
