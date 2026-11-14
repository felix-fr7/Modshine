import React from 'react';
import { Phone, MapPin, Mail, ArrowUp, ShieldCheck, Heart } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer({ settings, onOpenConsultation }) {
  const scrollToTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const f = settings?.footer || {};
  const list = (v) => (Array.isArray(v) ? v : []);
  const linkCls = 'text-[13px] text-warm-canvas/65 hover:text-gold-champagne transition-colors';

  return (
    <footer className="relative bg-brand-darkest text-warm-canvas overflow-hidden">
      <div className="absolute -top-40 left-1/3 w-[600px] h-[300px] bg-gold-primary/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10 pt-20 lg:pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-16 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878437/modshine/Logo.jpg"
                alt="Modshine Interior Logo"
                className="w-12 h-12 rounded-full object-contain bg-white p-1 shrink-0"
              />
              <div>
                <span className="font-serif text-3xl font-semibold tracking-[0.14em] text-warm-canvas uppercase block leading-none">
                  Modshine
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold-champagne font-semibold">
                  {f.studioLabel}
                </span>
              </div>
            </div>

            <p className="text-[13px] text-warm-canvas/55 leading-relaxed max-w-sm">
              {settings?.tagline || 'DECORATE YOUR HOME THE EASY WAY'} — {f.aboutSnippet}
            </p>

            <div className="flex items-center gap-2 text-xs text-gold-champagne">
              <ShieldCheck className="w-4 h-4 text-gold-primary" strokeWidth={1.5} />
              <span>{f.warrantyLine}</span>
            </div>

            <button onClick={onOpenConsultation} className="btn-brass">
              {f.ctaText}
            </button>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-gold-champagne font-semibold">
              {f.categoriesTitle}
            </h4>
            <ul className="space-y-3">
              {list(f.categoryLinks).map((t, i) => <li key={i}><a href="#catalog" className={linkCls}>{t}</a></li>)}
            </ul>
          </div>

          {/* Brands */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-gold-champagne font-semibold">
              {f.brandsTitle}
            </h4>
            <ul className="space-y-3">
              {list(f.brandLinks).map((t, i) => <li key={i}><a href="#materials" className={linkCls}>{t}</a></li>)}
            </ul>
          </div>

          {/* Studio */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] uppercase tracking-[0.24em] text-gold-champagne font-semibold">
              {f.hqTitle}
            </h4>
            <div className="space-y-4 text-[13px] text-warm-canvas/65">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="leading-relaxed">{settings?.address || '24-A26, Pasuvandhanai Road, Kovilpatti, Tamil Nadu 628501'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-primary shrink-0" strokeWidth={1.5} />
                <a href={`tel:${settings?.phone || '+919994412345'}`} className="font-serif text-xl text-warm-canvas hover:text-gold-champagne transition-colors">
                  {settings?.phone || '+91 99944 12345'}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <InstagramIcon className="w-4 h-4 text-gold-primary shrink-0" />
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold-champagne transition-colors">
                  {settings?.instagram || '@modshine.interior'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Monumental wordmark */}
        <div className="relative select-none pointer-events-none overflow-hidden" aria-hidden="true">
          <p data-footer-mark className="font-serif font-medium uppercase text-center leading-[0.8] tracking-[0.06em] text-[19vw] lg:text-[16.5vw] 2xl:text-[15rem] pt-10 bg-gradient-to-b from-warm-canvas/[0.14] to-warm-canvas/0 bg-clip-text text-transparent">
            Modshine
          </p>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-warm-canvas/45">
          <p className="text-center sm:text-left">{String(f.copyright || '').replace('{year}', new Date().getFullYear())}</p>
          <div className="flex items-center gap-5">
            <a href="/admin" className="hover:text-gold-champagne transition-colors">
              Admin Studio
            </a>
            <span className="flex items-center gap-1.5 text-warm-canvas/45">
              <span>{f.craftedLine}</span>
              <Heart className="w-3 h-3 text-gold-primary fill-gold-primary inline" />
            </span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-gold-champagne hover:text-gold-champagne text-warm-canvas/70 flex items-center justify-center transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
