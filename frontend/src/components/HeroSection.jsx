import React from 'react';
import { ArrowUpRight, ShieldCheck, Award, CheckCircle2, ChevronRight, Calculator, Sparkles } from 'lucide-react';

export default function HeroSection({ settings, onOpenConsultation }) {
  const motto = settings?.motto || 'DESIGN • INNOVATE • CREATE';
  const tagline = settings?.tagline || 'DECORATE YOUR HOME THE EASY WAY';

  return (
    <section className="relative overflow-hidden bg-brand-darkest text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      
      {/* ======================================================== */}
      {/* LUXURY ANIMATED BACKGROUND LAYERS                       */}
      {/* ======================================================== */}
      
      {/* 1. Architectural Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c5c4f_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none"></div>

      {/* 2. Floating Animated Aurora Orbs (Smooth Breathing Mesh) */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-brand-primary/30 rounded-full blur-[100px] pointer-events-none animate-aurora-slow"></div>
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-gold-rich/20 rounded-full blur-[120px] pointer-events-none animate-aurora-reverse"></div>
      <div className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-[90px] pointer-events-none animate-warm-slow"></div>

      {/* 3. Architectural Geometric Chevron Accent (Inspired by Modshine Design) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 overflow-hidden pointer-events-none opacity-25">
        <svg 
          viewBox="0 0 600 800" 
          fill="none" 
          preserveAspectRatio="none" 
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="bgGoldLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c49f64" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#f5edd8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#aa8243" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="bgEmeraldBand" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14453a" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#1c5c4f" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0e2d24" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Angled Geometric Bands */}
          <polygon points="120,0 280,400 120,800 190,800 350,400 190,0" fill="url(#bgEmeraldBand)" />
          <polyline points="190,0 350,400 190,800" stroke="url(#bgGoldLine)" strokeWidth="2.5" />
          <polyline points="230,0 390,400 230,800" stroke="url(#bgGoldLine)" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* 4. Animated Light Beam Sweep */}
      <div className="absolute -top-40 -left-40 w-96 h-[800px] bg-gradient-to-r from-transparent via-gold-champagne/10 to-transparent blur-2xl pointer-events-none animate-light-beam"></div>

      {/* 5. Floating Golden & Emerald Micro-Dust Particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-gold-champagne/60 blur-[1px] animate-particle-1 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 rounded-full bg-emerald-300/70 blur-[1px] animate-particle-2 pointer-events-none"></div>
      <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-amber-200/80 blur-[1px] animate-particle-3 pointer-events-none"></div>
      <div className="absolute bottom-20 left-1/2 w-1.5 h-1.5 rounded-full bg-gold-primary/60 blur-[1px] animate-particle-1 pointer-events-none"></div>

      {/* ======================================================== */}
      {/* FOREGROUND HERO CONTENT                                 */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Motto, Trust & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline / Motto Badge with Live Pulsing Dot */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-dark/90 border border-gold-champagne/30 text-gold-champagne text-xs font-semibold tracking-widest uppercase shadow-md backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-primary"></span>
              </span>
              <span>{motto}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18]">
              Decorate Your Home <br />
              <span className="gold-gradient-text italic font-normal">The Easy Way</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-lg text-emerald-100/85 max-w-xl font-normal leading-relaxed">
              Modshine Interior brings architectural sophistication to Kovilpatti. Specializing in customized modular kitchens, bespoke wardrobes, acoustic TV units, and traditional backlit pooja mandirs.
            </p>

            {/* Quick Guarantees & Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
              <div className="flex items-center gap-2 sm:gap-2.5 bg-brand-dark/60 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-brand-medium/50 hover:border-gold-champagne/40 transition-colors group">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gold-champagne shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-xs">
                  <p className="font-bold text-white text-[11px] sm:text-xs">10-Year Warranty</p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-200/70">HDHMR & Marine</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 bg-brand-dark/60 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-brand-medium/50 hover:border-gold-champagne/40 transition-colors group">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gold-champagne shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-xs">
                  <p className="font-bold text-white text-[11px] sm:text-xs">Hettich & Ebco</p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-200/70">German hardware</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 bg-brand-dark/60 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-brand-medium/50 hover:border-gold-champagne/40 transition-colors group col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold-champagne shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-xs">
                  <p className="font-bold text-white text-[11px] sm:text-xs">450+ Homes</p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-200/70">Handed over with joy</p>
                </div>
              </div>
            </div>

            {/* High-Conversion CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-3">
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-gold-primary via-gold-champagne to-gold-rich text-brand-darkest font-bold text-xs sm:text-sm tracking-wide shadow-gold-glow hover:brightness-110 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                <span>Book Free Site Visit & 3D Plan</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <a
                href="#catalog"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl glass-dark hover:bg-brand-dark text-white font-semibold text-xs sm:text-sm tracking-wide transition-all border border-gold-champagne/30 flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <span>Browse Modular Designs</span>
                <ChevronRight className="w-4 h-4 text-gold-champagne" />
              </a>

              <a
                href="#estimator"
                className="w-full sm:w-auto px-4 py-3 sm:py-4 rounded-xl text-emerald-200/90 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <Calculator className="w-4 h-4 text-gold-primary" />
                <span>Estimate Cost</span>
              </a>
            </div>

            {/* Showroom Address Pill */}
            <div className="pt-2 flex items-center gap-2 text-[11px] sm:text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span>Visit our Design Studio at 24-A26 Pasuvandhanai Road, Kovilpatti</span>
            </div>

          </div>

          {/* Right Column: Premium Showcase Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Animated Glowing Frame */}
              <div className="absolute -inset-2 sm:-inset-3 rounded-3xl bg-gradient-to-tr from-gold-primary/30 via-emerald-600/20 to-brand-accent/40 blur-md animate-warm-pulse"></div>

              {/* Main Image Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-champagne/40 bg-brand-dark group">
                <img
                  src="/assets/hero_living_clean.jpg"
                  alt="Modshine Interior Luxury Modern Living Room"
                  className="w-full h-[280px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/90 via-brand-darkest/20 to-transparent pointer-events-none"></div>

                {/* Floating Badge on Image */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 p-3 sm:p-4 rounded-xl glass-dark border border-gold-champagne/30 flex items-center justify-between backdrop-blur-md">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] uppercase tracking-wider text-gold-champagne font-bold">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-primary" />
                      <span>Featured Execution</span>
                    </div>
                    <p className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5 line-clamp-1">Minimalist Fluted TV & Ambient Lounge</p>
                    <p className="text-[10px] sm:text-[11px] text-emerald-200/70 line-clamp-1">Action TESA HDHMR • Carra Marble • LED Lighting</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold-primary/20 border border-gold-champagne/40 flex items-center justify-center text-gold-champagne font-bold text-xs shrink-0 ml-2">
                    100%
                  </div>
                </div>
              </div>

              {/* Floating Tag Top Right */}
              <div className="absolute top-2 right-2 sm:-top-3 sm:-right-3 bg-brand-primary/95 text-white text-[11px] sm:text-xs px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-gold-champagne/50 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-gold-primary animate-ping"></span>
                <span className="font-semibold">Kovilpatti • Tirunelveli • Madurai</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
