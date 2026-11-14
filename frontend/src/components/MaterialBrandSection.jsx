import React from 'react';
import { Layers, CheckCircle2, Shield } from 'lucide-react';
import SectionHeader from './ui/SectionHeader.jsx';
import { cld, cldSrcSet } from '../utils/cloudinary.js';

export default function MaterialBrandSection({ settings }) {
  const head = settings?.sections?.materials || {};
  const page = settings?.materialsPage || {};
  const boards = Array.isArray(settings?.materials) ? settings.materials : [];
  const brands = Array.isArray(settings?.brands) ? settings.brands : [];
  const moodboardFinishes = Array.isArray(page.moodboard) ? page.moodboard : [];

  return (
    <section id="materials" className="relative py-16 sm:py-20 bg-warm-canvas">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10">

        <SectionHeader
          index="05"
          eyebrow={head.eyebrow}
          title={head.title}
          highlight={head.titleHighlight}
          intro={head.intro}
        />

        {/* 1. Boards — index list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-24 lg:mb-32">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-3">
              <span className="font-serif italic text-gold-primary text-lg">i.</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-ink-charcoal leading-tight">{page.boardsTitle}</h3>
              <Layers className="w-6 h-6 text-gold-rich" strokeWidth={1.25} />
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 border-t border-ink-charcoal/15">
            {boards.map((b, idx) => (
              <div
                key={b.id || idx}
                data-card
                className={`group py-7 sm:px-7 border-b border-ink-charcoal/15 ${idx % 2 === 1 ? 'sm:border-l' : 'sm:pl-0'}`}
              >
                <div className="flex justify-between items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-rich">
                    {b.tag}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-brand-accent" strokeWidth={1.5} />
                </div>
                <h4 className="mt-3 font-serif text-[1.75rem] font-medium text-ink-charcoal leading-tight group-hover:text-brand-primary transition-colors">{b.name}</h4>
                <p className="mt-2 text-[13px] text-ink-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Moodboard — arch swatches */}
        <div className="mb-24 lg:mb-32 rounded-[4px] bg-brand-darkest text-warm-canvas px-6 py-12 sm:p-14 lg:p-20 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold-primary/10 blur-[120px] pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-6 space-y-3">
              <span className="font-serif italic text-gold-primary text-lg">ii.</span>
              <h3 className="font-serif text-3xl sm:text-5xl font-medium leading-tight">{page.moodboardTitle}</h3>
            </div>
            <p className="lg:col-span-5 lg:col-start-8 text-sm sm:text-base text-warm-canvas/60 leading-relaxed">
              {page.moodboardIntro}
            </p>
          </div>

          <div className="relative grid grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-5">
            {moodboardFinishes.map((f, idx) => (
              <div key={f.id || idx} data-card className="group text-center">
                <div
                  className="arch aspect-[3/5] ring-1 ring-white/10 group-hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: f.image
                      ? `url("${cld(f.image, { w: 320 })}")`
                      : `linear-gradient(to bottom, ${f.colorFrom || '#d6d3d1'}, ${f.colorTo || '#78716c'})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/20" />
                </div>
                <p className="mt-3 font-serif text-[15px] sm:text-lg leading-tight text-warm-canvas">{f.title}</p>
                <p className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-gold-champagne/70">{f.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Partner brands — hairline wall */}
        <div>
          <div className="flex items-end justify-between gap-6 mb-10">
            <div className="space-y-3">
              <span className="font-serif italic text-gold-primary text-lg">iii.</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-ink-charcoal leading-tight">{page.brandsTitle}</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink-charcoal/15">
            {brands.map((br, idx) => (
              <div
                key={br.id || idx}
                data-card
                className="group relative p-7 lg:p-9 border-r border-b border-ink-charcoal/15 flex flex-col gap-6 hover:bg-white/70 transition-colors duration-500"
              >
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <span className="font-serif text-4xl font-medium text-ink-charcoal leading-none">{br.name}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-rich border border-gold-primary/40 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {br.badge}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-primary mb-1.5">{br.category}</p>
                  <p className="text-[13px] text-ink-muted leading-relaxed">{br.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  <Shield className="w-3.5 h-3.5 text-gold-rich" strokeWidth={1.5} />
                  <span>{page.brandFooter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
