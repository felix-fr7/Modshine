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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-darkest text-white border-t border-brand-medium/30 relative overflow-hidden">
      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/3 w-96 h-32 bg-gold-rich/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-brand-medium/30">

          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/Logo.jpg"
                alt="Modshine Interior Logo"
                className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-white/30 shrink-0 shadow-sm"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white uppercase block leading-none">
                  Modshine
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gold-champagne font-semibold">
                  Interior & Modular Studio
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-100/70 leading-relaxed font-normal">
              {settings?.tagline || 'DECORATE YOUR HOME THE EASY WAY'} — Kovilpatti's trusted design-driven interior studio specializing in customized modular kitchens, architectural wardrobes, TV consoles, and traditional temple pooja mandirs.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-gold-champagne">
              <ShieldCheck className="w-4 h-4 text-gold-primary" />
              <span>10-Year Water & Structural Warranty</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-gold-champagne font-bold">
              Modular Categories
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li><a href="#catalog" className="hover:text-gold-champagne transition-colors">Modular Kitchen (HDHMR Boilo)</a></li>
              <li><a href="#catalog" className="hover:text-gold-champagne transition-colors">Floor-to-Ceiling Wardrobes</a></li>
              <li><a href="#catalog" className="hover:text-gold-champagne transition-colors">Fluted TV Entertainment Walls</a></li>
              <li><a href="#catalog" className="hover:text-gold-champagne transition-colors">Wooden Slat & CNC Partitions</a></li>
              <li><a href="#catalog" className="hover:text-gold-champagne transition-colors">Traditional Backlit Pooja Mandirs</a></li>
              <li><a href="#catalog" className="hover:text-gold-champagne transition-colors">Living & Master Bedroom Suites</a></li>
            </ul>
          </div>

          {/* Materials & Brands */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-gold-champagne font-bold">
              Partner Brands
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li><a href="#materials" className="hover:text-gold-champagne transition-colors">Action TESA HDHMR</a></li>
              <li><a href="#materials" className="hover:text-gold-champagne transition-colors">Greenply Marine Ply</a></li>
              <li><a href="#materials" className="hover:text-gold-champagne transition-colors">CenturyPly Plywood</a></li>
              <li><a href="#materials" className="hover:text-gold-champagne transition-colors">German Hettich Hardware</a></li>
              <li><a href="#materials" className="hover:text-gold-champagne transition-colors">Ebco Fittings & Rails</a></li>
              <li><a href="#materials" className="hover:text-gold-champagne transition-colors">Sleek by Asian Paints</a></li>
            </ul>
          </div>

          {/* Direct Showroom Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-gold-champagne font-bold">
              Kovilpatti Showroom
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-primary shrink-0 mt-0.5" />
                <span>{settings?.address || '24-A26, Pasuvandhanai Road, Kovilpatti, Tamil Nadu 628501'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-primary shrink-0" />
                <a href={`tel:${settings?.phone || '+919994412345'}`} className="hover:text-white font-bold text-gold-champagne">
                  {settings?.phone || '+91 99944 12345'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-gold-primary shrink-0" />
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
                  {settings?.instagram || '@modshine.interior'}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full py-2.5 rounded-xl bg-brand-primary hover:bg-brand-medium text-white text-xs font-semibold tracking-wide border border-gold-champagne/30 transition-all text-center"
              >
                Book Free Site Inspection
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Modshine Interior. All rights reserved. 24-A26 Pasuvandhanai Road, Kovilpatti, TN.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-emerald-200/60 flex items-center gap-1">
              <span>Crafted for timeless homes</span>
              <Heart className="w-3 h-3 text-red-400 fill-red-400 inline" />
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-brand-dark hover:bg-brand-primary text-gold-champagne transition-colors"
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
