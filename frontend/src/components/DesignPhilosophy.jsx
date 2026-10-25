import React from 'react';
import { Compass, Palette, Feather, Layers } from 'lucide-react';

export default function DesignPhilosophy() {
  const pillars = [
    {
      num: "01",
      icon: Compass,
      title: "Functional Planning",
      quote: "We maximize every square foot through smart space planning, ensuring comfort, efficiency, and seamless day-to-day living.",
      detail: "Ergonomic kitchen work triangles, concealed wire management, optimized wardrobe heights, and clutter-free storage engineered for daily life."
    },
    {
      num: "02",
      icon: Palette,
      title: "Aesthetic Excellence",
      quote: "Every space is designed with a balance of elegance, modern aesthetics, and timeless appeal, creating interiors that reflect your unique personality.",
      detail: "Curated palettes of warm beige, cashmere matte, fluted walnut panels, and Italian Carra marble textures that never feel dated."
    },
    {
      num: "03",
      icon: Feather,
      title: "Impactful Designs",
      quote: "By combining creativity, premium materials, and meticulous attention to detail, we deliver interiors that leave a lasting impression.",
      detail: "Seamless joinery, concealed LED profiles, CNC laser-cut jaali motifs, and tactile fabrics that evoke luxury from the first glance."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-brand-darkest text-white relative overflow-hidden">
      {/* Decorative background grid & glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c5c4f_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/20 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-dark border border-gold-champagne/30 text-gold-champagne text-xs font-semibold tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5 text-gold-primary" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Our Design Philosophy
          </h2>
          <p className="text-emerald-100/70 text-sm sm:text-base leading-relaxed">
            Rooted in thoughtful architecture and master joinery, we balance visual poise with enduring functional durability.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="group relative rounded-2xl p-8 bg-brand-dark/70 backdrop-blur-md border border-brand-medium/30 hover:border-gold-champagne/50 transition-all duration-300 shadow-luxury flex flex-col justify-between"
              >
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl font-bold text-gold-champagne/60 group-hover:text-gold-primary transition-colors">
                    {p.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/60 border border-gold-champagne/20 flex items-center justify-center text-gold-champagne group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-champagne transition-colors">
                    {p.title}
                  </h3>
                  <blockquote className="text-emerald-100/90 text-sm italic leading-relaxed border-l-2 border-gold-primary/60 pl-3">
                    "{p.quote}"
                  </blockquote>
                  <p className="text-emerald-200/60 text-xs leading-relaxed pt-2">
                    {p.detail}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="mt-6 pt-4 border-t border-brand-medium/30">
                  <span className="text-[11px] uppercase tracking-wider text-gold-champagne/70 font-semibold">
                    Modshine Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
