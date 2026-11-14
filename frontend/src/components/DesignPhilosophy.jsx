import React from 'react';
import { getIcon } from '../data/icons.js';
import SectionHeader from './ui/SectionHeader.jsx';

export default function DesignPhilosophy({ settings }) {
  const head = settings?.sections?.philosophy || {};
  const philosophy = settings?.philosophy || {};
  const pillars = Array.isArray(philosophy.pillars) ? philosophy.pillars : [];

  return (
    <section data-scene="philosophy" className="relative py-16 sm:py-20 bg-brand-darkest text-warm-canvas overflow-clip">
      <div data-scene-inner className="relative w-full">
        {/* Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-brand-primary/40 blur-[160px] rounded-full" />
          <div className="absolute -top-20 right-0 w-[420px] h-[420px] bg-gold-primary/10 blur-[140px] rounded-full" />
          <div className="absolute inset-y-0 left-10 w-px bg-white/[0.05] hidden lg:block" />
          <div className="absolute inset-y-0 right-10 w-px bg-white/[0.05] hidden lg:block" />
        </div>

        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10 relative z-10 w-full">

          <div data-scene-header>
          <SectionHeader
            dark
            center
            index="03"
            eyebrow={head.eyebrow}
            title={head.title}
            highlight={head.titleHighlight}
            intro={head.intro}
            className="!mb-12 lg:!mb-16"
          />
          </div>

          <div data-scene-grid className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 stage-3d">
            {pillars.map((p) => {
              const Icon = getIcon(p.icon);
              return (
                <div
                  key={p.id || p.num}
                  data-card
                  className="group relative rounded-[4px] p-7 lg:p-9 bg-white/[0.03] border border-white/10 hover:border-gold-champagne/40 hover:bg-white/[0.05] transition-colors duration-500 flex flex-col"
                >
                  <div className="absolute top-0 left-7 right-7 lg:left-9 lg:right-9 h-px bg-gradient-to-r from-transparent via-gold-primary/70 to-transparent" />

                  <div data-scene-card-head className="flex items-start justify-between mb-10">
                    <span data-scene-num className="font-serif italic text-6xl lg:text-7xl leading-none text-gold-primary/80">
                      {p.num}
                    </span>
                    <span className="w-12 h-12 rounded-full border border-gold-champagne/30 flex items-center justify-center text-gold-champagne group-hover:bg-gold-primary group-hover:text-brand-darkest transition-all duration-500">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-medium text-warm-canvas">
                    {p.title}
                  </h3>
                  <blockquote className="mt-4 font-serif text-lg lg:text-xl italic leading-snug text-warm-canvas/80">
                    "{p.quote}"
                  </blockquote>
                  <p className="mt-5 text-warm-canvas/50 text-[13px] leading-relaxed">
                    {p.detail}
                  </p>

                  <div className="mt-auto pt-8">
                    <span className="eyebrow text-gold-champagne/70 !tracking-[0.24em] !text-[10px]">
                      <span className="eyebrow-rule" />
                      {philosophy.footerLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll progress rail for the pinned scene */}
          <div data-scene-rail-track className="hidden mt-12 h-px w-full bg-white/10 overflow-hidden">
            <div data-scene-rail className="h-full w-full origin-left bg-gradient-to-r from-gold-rich via-gold-champagne to-gold-primary" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
