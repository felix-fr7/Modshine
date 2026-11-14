import React from 'react';

/**
 * Editorial split section header used across the site.
 *   01 ——— EYEBROW
 *   Big Display Title                      Intro paragraph (right column)
 */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  highlight = '',
  intro,
  dark = false,
  center = false,
  aside = null,
  className = '',
}) {
  const titleColor = dark ? 'text-warm-canvas' : 'text-ink-charcoal';
  const introColor = dark ? 'text-warm-canvas/65' : 'text-ink-muted';
  const fullTitle = highlight ? (
    <>
      {title}{' '}
      <span className={`italic ${dark ? 'gold-gradient-text' : 'text-brand-primary'}`}>{highlight}</span>
    </>
  ) : title;

  if (center) {
    return (
      <div className={`max-w-3xl mx-auto text-center mb-12 lg:mb-16 ${className}`}>
        <div className="flex flex-col items-center gap-6">
          <div className={`eyebrow ${dark ? 'text-gold-champagne' : ''}`}>
            {index && <span className="eyebrow-index">{index}</span>}
            <span className="eyebrow-rule" />
            <span>{eyebrow}</span>
          </div>
          <h2 className={`display text-[2.6rem] sm:text-6xl lg:text-7xl ${titleColor}`}>{fullTitle}</h2>
        </div>
        {intro && (
          <p data-fade className={`mt-6 text-base sm:text-lg leading-relaxed ${introColor}`}>{intro}</p>
        )}
        {aside && <div data-fade className="mt-8">{aside}</div>}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 lg:mb-16 ${className}`}>
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className={`eyebrow ${dark ? 'text-gold-champagne' : ''}`}>
          {index && <span className="eyebrow-index">{index}</span>}
          <span className="eyebrow-rule" />
          <span>{eyebrow}</span>
        </div>
        <h2 className={`display text-[2.6rem] sm:text-6xl lg:text-[4.4rem] ${titleColor}`}>{fullTitle}</h2>
      </div>
      <div className="lg:col-span-5 lg:pb-2 space-y-6">
        {intro && (
          <p data-fade className={`text-base sm:text-lg leading-relaxed ${introColor}`}>{intro}</p>
        )}
        {aside && <div data-fade>{aside}</div>}
      </div>
    </div>
  );
}
