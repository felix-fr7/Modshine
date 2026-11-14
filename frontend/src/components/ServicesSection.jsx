import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '../data/icons.js';
import SectionHeader from './ui/SectionHeader.jsx';

export default function ServicesSection({ settings, onOpenConsultation }) {
  const head = settings?.sections?.services || {};
  const services = Array.isArray(settings?.services) ? settings.services : [];

  const renderIcon = (iconName) => {
    const Icon = getIcon(iconName);
    return <Icon className="w-5 h-5" strokeWidth={1.5} />;
  };

  return (
    <section id="services" className="relative py-24 lg:py-36 bg-warm-canvas">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10">

        <SectionHeader
          index="02"
          eyebrow={head.eyebrow}
          title={head.title}
          highlight={head.titleHighlight}
          intro={head.intro}
        />

        <div className="space-y-24 lg:space-y-36">
          {services.map((s, idx) => {
            const rawDeliverables = Array.isArray(s.deliverables)
              ? s.deliverables
              : (typeof s.deliverables === 'string' ? s.deliverables.split(',').map(d => d.trim()).filter(Boolean) : []);
            const flip = idx % 2 === 1;

            return (
              <article
                key={s.id || idx}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Image */}
                <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                  <div className="relative">
                    <div data-reveal-img="up" className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden rounded-[4px] bg-brand-dark">
                      <img
                        data-parallax="12"
                        src={s.image || 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878427/modshine/hero_living_room.jpg'}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.4s] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                    {/* Oversized index numeral */}
                    <span className={`pointer-events-none select-none absolute -top-[4.1rem] sm:-top-[6.3rem] ${flip ? 'right-0' : 'left-0'} font-serif italic text-[4.5rem] sm:text-[7rem] leading-none text-gold-primary/40`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Copy */}
                <div data-card className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="w-12 h-12 rounded-full border border-warm-border flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-gold-champagne group-hover:border-brand-primary transition-all duration-500">
                      {renderIcon(s.icon)}
                    </span>
                    {s.subtitle && (
                      <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-rich">
                        {s.subtitle}
                      </span>
                    )}
                  </div>

                  <h3 className="display text-4xl sm:text-5xl text-ink-charcoal">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-ink-body text-[15px] sm:text-base leading-[1.8]">
                    {s.description}
                  </p>

                  {rawDeliverables.length > 0 && (
                    <ul className="mt-8 border-t border-warm-border">
                      {rawDeliverables.map((item, i) => (
                        <li key={i} className="flex items-center justify-between gap-4 py-3.5 border-b border-warm-border text-sm text-ink-body">
                          <span className="flex items-center gap-3 min-w-0">
                            <span className="font-serif italic text-gold-primary text-sm w-5 shrink-0">{i + 1}.</span>
                            <span className="truncate">{item}</span>
                          </span>
                          <span className="h-px w-6 bg-warm-border shrink-0" />
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    onClick={onOpenConsultation}
                    className="mt-8 link-underline text-brand-primary hover:text-gold-rich transition-colors"
                  >
                    <span>{settings?.servicesCta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
