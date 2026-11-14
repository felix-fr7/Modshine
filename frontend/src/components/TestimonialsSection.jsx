import React from 'react';
import { Star, Quote, ShieldCheck, MapPin } from 'lucide-react';
import SectionHeader from './ui/SectionHeader.jsx';

export default function TestimonialsSection({ settings }) {
  const head = settings?.sections?.testimonials || {};
  const testimonials = Array.isArray(settings?.testimonials) ? settings.testimonials : [];

  return (
    <section id="reviews" className="relative py-24 lg:py-36 bg-warm-cream/60 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10">

        <SectionHeader
          index="07"
          eyebrow={head.eyebrow}
          title={head.title}
          highlight={head.titleHighlight}
          intro={head.intro}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.map((t, idx) => (
            <figure
              key={t.id || idx}
              data-card
              className={`group relative flex flex-col justify-between h-full rounded-[4px] p-8 lg:p-10 transition-colors duration-500 ${
                idx % 3 === 1
                  ? 'bg-brand-darkest text-warm-canvas'
                  : 'bg-warm-canvas border border-warm-border hover:border-gold-primary/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <Quote className={`w-10 h-10 ${idx % 3 === 1 ? 'text-gold-primary' : 'text-gold-primary/60'}`} strokeWidth={1} />
                  <div className="flex items-center gap-0.5">
                    {[...Array(Math.max(0, Math.min(5, Number(t.rating) || 5)))].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-primary text-gold-primary" />
                    ))}
                  </div>
                </div>

                <blockquote className={`mt-7 font-serif text-[1.45rem] sm:text-[1.6rem] leading-[1.35] italic ${idx % 3 === 1 ? 'text-warm-canvas' : 'text-ink-charcoal'}`}>
                  "{t.text}"
                </blockquote>
              </div>

              <figcaption className={`mt-10 pt-6 border-t flex items-center gap-4 ${idx % 3 === 1 ? 'border-white/10' : 'border-warm-border'}`}>
                <img
                  src={t.avatar || 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878454/modshine/page_5.jpg'}
                  alt={t.name}
                  className="w-14 h-14 arch object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-serif text-xl font-semibold truncate ${idx % 3 === 1 ? 'text-warm-canvas' : 'text-ink-charcoal'}`}>
                      {t.name}
                    </h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" aria-label="Verified Client" />
                  </div>
                  <div className={`flex items-center gap-1.5 text-[11px] ${idx % 3 === 1 ? 'text-warm-canvas/55' : 'text-ink-muted'}`}>
                    <MapPin className="w-3 h-3 text-gold-primary shrink-0" />
                    <span className="truncate">{t.location || 'Tamil Nadu'}</span>
                    <span>•</span>
                    <span className="truncate text-gold-rich">{t.project}</span>
                  </div>
                  <span className={`mt-1 inline-block text-[9px] font-semibold uppercase tracking-[0.18em] ${idx % 3 === 1 ? 'text-gold-champagne/70' : 'text-brand-accent'}`}>
                    Verified Client
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-14 text-center text-[11px] uppercase tracking-[0.16em] text-ink-muted">
          {settings?.testimonialsNote}
        </p>

      </div>
    </section>
  );
}
