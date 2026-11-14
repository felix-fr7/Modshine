import React from 'react';
import { ArrowUpRight, ChevronRight, Calculator, Sparkles, Clock, MapPin } from 'lucide-react';
import { getIcon } from '../data/icons.js';
import { cld, cldSrcSet } from '../utils/cloudinary.js';

export default function HeroSection({ settings, onOpenConsultation }) {
  const motto = settings?.hero?.motto || settings?.motto || 'DESIGN • INNOVATE • CREATE';
  const headline = settings?.hero?.headline || 'Decorate Your Home';
  const highlightText = settings?.hero?.highlightText || 'The Easy Way';
  const description = settings?.hero?.description || 'Modshine Interior brings architectural sophistication to homes across Tamil Nadu. Specializing in customized modular kitchens, bespoke wardrobes, acoustic TV units, and traditional backlit pooja mandirs.';
  const ctaText = settings?.hero?.ctaText || 'Book Site Visit & Consultation';
  const heroImage = settings?.hero?.heroImage || 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878426/modshine/hero_living_clean.jpg';
  const heroImageTitle = settings?.hero?.heroImageTitle || 'Minimalist Fluted TV & Ambient Lounge';
  const heroImageBadge = settings?.hero?.heroImageBadge || 'Featured Execution';
  const address = settings?.address || '24-A26, Pasuvandhanai Road, Kovilpatti, Tamil Nadu 628501';
  const workingHours = settings?.workingHours || 'Monday - Sunday: 9:00 AM - 9:00 PM';
  const serviceCoverage = settings?.serviceCoverage || 'Serving All Districts of Tamil Nadu';

  const hero = settings?.hero || {};
  const highlights = Array.isArray(hero.highlights) ? hero.highlights : [];

  const renderIcon = (iconName) => {
    const Icon = getIcon(iconName);
    return <Icon className="w-4 h-4 text-gold-champagne shrink-0" strokeWidth={1.5} />;
  };

  return (
    <section
      data-hero
      className="relative isolate overflow-hidden bg-brand-darkest text-warm-canvas min-h-[calc(100svh-96px)] flex flex-col"
    >
      {/* ===== Full-bleed cinematic photograph ===== */}
      <div data-hero-bg className="absolute inset-0 -z-10">
        <div data-hero-media className="absolute inset-0">
          <img
            src={cld(heroImage, { w: 1920 })}
            srcSet={cldSrcSet(heroImage, [768, 1280, 1920, 2560])}
            sizes="100vw"
            alt={heroImageTitle}
            decoding="async"
            className="w-full h-full object-cover object-center select-none"
            fetchpriority="high"
          />
        </div>
        {/* Grading: deep forest from the left & floor, soft vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-darkest via-brand-darkest/75 to-brand-darkest/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest via-brand-darkest/20 to-brand-darkest/40" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.45)]" />
        {/* Warm light leak */}
        <div data-depth="40" className="absolute -top-40 right-[-10%] w-[620px] h-[620px] rounded-full bg-gold-primary/20 blur-[140px] animate-warm-slow" />
      </div>

      {/* Architectural frame lines */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        <div className="absolute left-10 top-0 bottom-0 w-px bg-white/[0.06]" />
        <div className="absolute right-10 top-0 bottom-0 w-px bg-white/[0.06]" />
      </div>

      {/* ===== Foreground ===== */}
      <div className="relative flex-1 w-full max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10 pt-14 sm:pt-20 lg:pt-14 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">

        {/* Left: Headline */}
        <div data-hero-text className="lg:col-span-8 space-y-6 lg:space-y-7 self-center lg:self-end">
          <div data-hero-intro className="eyebrow text-gold-champagne">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold-primary"></span>
            </span>
            <span>{motto}</span>
          </div>

          <h1 className="display text-[3.1rem] leading-[0.98] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem] text-warm-canvas">
            <span className="hero-line-mask"><span data-hero-line className="hero-line">{headline}</span></span>
            <span className="hero-line-mask"><span data-hero-line className="hero-line italic font-normal gold-gradient-text">{highlightText}</span></span>
          </h1>

          <p data-hero-intro className="text-[15px] sm:text-lg text-warm-canvas/75 max-w-xl leading-relaxed font-light">
            {description}
          </p>

          <div data-hero-intro className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
            <button onClick={onOpenConsultation} className="btn-brass group shadow-gold-glow">
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <a href="#catalog" className="btn-line-light group">
              <span>{hero.secondaryCtaText}</span>
              <ChevronRight className="w-4 h-4 text-gold-champagne group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a href="#estimator" className="link-underline justify-center text-warm-canvas/80 hover:text-warm-canvas py-3 sm:ml-2">
              <Calculator className="w-4 h-4 text-gold-primary" />
              <span>{hero.tertiaryCtaText}</span>
            </a>
          </div>
        </div>

        {/* Right: Floating 3D showcase plate */}
        <div data-hero-visual className="lg:col-span-4 stage-3d flex lg:justify-end">
          <div data-hero-visual-inner className="relative w-full max-w-sm preserve-3d">
            <div data-hero-float className="absolute -top-4 left-5 right-5 z-10 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/90 backdrop-blur-md border border-gold-champagne/40 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.06em] text-warm-canvas shadow-xl max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-ping shrink-0"></span>
                <span className="truncate">{serviceCoverage}</span>
              </span>
            </div>

            <div data-hero-plate className="glass-dark rounded-[4px] p-5 sm:p-6 pt-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-gold-champagne font-semibold">
                    <Sparkles className="w-3 h-3 text-gold-primary" />
                    <span>{heroImageBadge}</span>
                  </div>
                  <p className="font-serif text-2xl sm:text-[1.7rem] leading-tight font-medium text-warm-canvas mt-2">{heroImageTitle}</p>
                </div>
                <div className="w-14 h-14 rounded-full border border-gold-champagne/40 flex items-center justify-center font-serif text-lg text-gold-champagne shrink-0">
                  {hero.heroImageScore}
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 text-[11px] tracking-[0.08em] text-warm-canvas/60">
                {hero.heroImageMeta}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Bottom ledger: highlights + showroom ===== */}
      <div data-hero-intro className="relative w-full border-t border-white/10 bg-brand-darkest/40 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-12">
          {highlights.map((h, idx) => (
            <div
              key={h.id || idx}
              className={`flex items-center gap-3 py-4 sm:py-5 lg:col-span-2 ${idx > 0 ? 'lg:border-l lg:pl-6' : ''} border-white/10 ${idx === 2 ? 'col-span-2 border-t lg:border-t-0' : ''} ${idx === 1 ? 'border-l pl-4' : ''}`}
            >
              <span className="w-9 h-9 rounded-full border border-gold-champagne/30 flex items-center justify-center shrink-0">
                {renderIcon(h.icon)}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-[12px] sm:text-[13px] text-warm-canvas truncate">{h.title}</p>
                <p className="text-[11px] text-warm-canvas/55 truncate">{h.subtitle}</p>
              </div>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-6 flex flex-col sm:flex-row lg:justify-end gap-x-8 gap-y-1.5 py-4 sm:py-5 border-t lg:border-t-0 lg:border-l lg:pl-8 border-white/10 text-[11px] sm:text-xs">
            <span className="flex items-center gap-2 text-warm-canvas/60 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-gold-primary shrink-0" />
              <span className="truncate">Showroom at {address}</span>
            </span>
            <span className="flex items-center gap-2 text-warm-canvas/80 font-medium">
              <Clock className="w-3.5 h-3.5 text-gold-primary shrink-0" />
              <span>Shop Hours: {workingHours}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div data-hero-cue className="hidden lg:flex absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
        <span className="scroll-cue" />
      </div>
    </section>
  );
}
