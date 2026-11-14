import React from 'react';

/** Slow editorial ticker built from the studio's own category names. */
export default function Marquee({ items = [] }) {
  const list = items.filter(Boolean);
  if (!list.length) return null;
  const row = [...list, ...list, ...list];

  return (
    <div className="relative bg-brand-primary text-warm-canvas overflow-hidden border-y border-white/5" aria-hidden="true">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center shrink-0">
            {row.map((label, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="font-serif italic text-2xl sm:text-3xl px-8 sm:px-10 py-5 whitespace-nowrap">{label}</span>
                <span className="text-gold-primary text-sm">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
