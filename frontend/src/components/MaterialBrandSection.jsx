import React from 'react';
import { Layers, Award, CheckCircle2, Shield, Wrench } from 'lucide-react';

export default function MaterialBrandSection() {
  const boards = [
    { name: "HDHMR Boilo", desc: "High Density High Moisture Resistance Boilo grade for 100% waterproof kitchens & vanities.", tag: "Action TESA" },
    { name: "BWP Plywood", desc: "Boiling Water Proof 710 marine grade plywood engineered to resist borer, termite & warping.", tag: "Greenply Marine" },
    { name: "UV High Gloss Board", desc: "Flawless mirror-sheen surface with anti-fingerprint and scratch-resistant coating.", tag: "Luxury Shutters" },
    { name: "MDF Precision Board", desc: "Ultra-fine density board ideal for intricate CNC jaali cutting and PU spray paint.", tag: "CNC & Mouldings" },
    { name: "MR Plywood", desc: "Moisture-resistant plywood for bedroom wardrobes, living credenzas & study tables.", tag: "CenturyPly" },
    { name: "Fluted Louver Panels", desc: "Architectural 3D fluted panels (MN 8616) creating warm acoustic living backdrops.", tag: "Trending Wall Decor" },
  ];

  const moodboardFinishes = [
    { title: "Carra Marble", color: "from-stone-100 to-stone-300", type: "Stone Veins" },
    { title: "Fluted Panel MN 8616", color: "from-amber-900 to-yellow-950", type: "3D Texture" },
    { title: "Cashmere Matte", color: "from-zinc-700 to-zinc-900", type: "Super Matte" },
    { title: "Warm Beige", color: "from-amber-100 to-amber-200", type: "Neutral Tone" },
    { title: "Walnut Wood", color: "from-amber-800 to-stone-900", type: "Natural Grain" },
    { title: "Textured Fabric", color: "from-stone-300 to-stone-400", type: "Boucle Upholstery" },
    { title: "Black Accents", color: "from-neutral-900 to-black", type: "Profile Frames" },
    { title: "Metal Finish", color: "from-amber-500 to-yellow-700", type: "Brushed Brass" },
  ];

  const brands = [
    { name: "Action TESA", category: "Engineered HDHMR Board", badge: "India's #1", desc: "Highest density, maximum screw holding capacity and 100% water defense." },
    { name: "Greenply", category: "BWP Marine Plywood", badge: "710 Certified", desc: "Zero-emission formaldehyde free marine grade plywood for lifelong peace of mind." },
    { name: "CenturyPly", category: "Architect Plywood", badge: "ViroKill & Fire", desc: "Nanotechnology surface protection with viral defense and borer proof warranty." },
    { name: "Hettich", category: "German Hardware & Hinges", badge: "Germany", desc: "Sensys soft-close integrated dampers and InnoTech precision drawer systems." },
    { name: "Ebco", category: "Fittings & Accessories", badge: "Simplifying Lives", desc: "Ultra-smooth telescopic runners, aluminium profile glass doors, and magic corners." },
    { name: "Sleek", category: "Kitchen Accessories", badge: "Asian Paints", desc: "Stainless steel 304 wire baskets, cutlery trays, and tall pantry pull-out organizers." }
  ];

  return (
    <section id="materials" className="py-20 lg:py-28 bg-warm-cream/60 relative border-y border-warm-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-semibold tracking-wider uppercase border border-brand-primary/20">
            <Layers className="w-3.5 h-3.5 text-gold-rich" />
            <span>Materials, Boards & Brands</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkest tracking-tight">
            Only Certified, Premium Engineering Inside Every Unit
          </h2>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            We never compromise on substrate quality. As presented in our portfolio, we exclusively partner with India's and Germany's foremost interior engineering brands.
          </p>
        </div>

        {/* 1. Core Substrates & Boards Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary"></span>
            <h3 className="font-serif text-2xl font-bold text-brand-darkest">1. Certified Boards & Substrates</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((b, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-warm-border hover:border-brand-primary/40 shadow-sm hover:shadow-luxury transition-all space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-light px-2.5 py-1 rounded">
                    {b.tag}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-serif text-xl font-bold text-brand-darkest">{b.name}</h4>
                <p className="text-xs text-ink-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Moodboard & Finishes Palette (Page 7 of PDF) */}
        <div className="mb-16 bg-white rounded-3xl p-8 sm:p-10 border border-warm-border shadow-sm">
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-primary"></span>
              <h3 className="font-serif text-2xl font-bold text-brand-darkest">2. Concept & Moodboard Finishes</h3>
            </div>
            <p className="text-xs text-ink-muted">
              A perfect blend of modern aesthetics, natural textures, and warm neutrals designed to create enduring visual harmony.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {moodboardFinishes.map((f, idx) => (
              <div key={idx} className="group text-center space-y-2">
                <div className={`h-20 rounded-xl bg-gradient-to-br ${f.color} shadow-inner border border-black/10 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden flex items-end justify-center p-1.5`}>
                  <span className="text-[10px] font-bold text-white bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    {f.type}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-darkest group-hover:text-brand-primary transition-colors">{f.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Partner Brands Showcase */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <h3 className="font-serif text-2xl font-bold text-brand-darkest">3. Partner Brands & Hardware Fittings</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((br, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-warm-border hover:border-gold-primary/50 shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-2xl font-bold text-brand-darkest">{br.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-light text-brand-darkest px-2.5 py-1 rounded-full border border-gold-champagne/40">
                    {br.badge}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-primary mb-1">{br.category}</p>
                  <p className="text-xs text-ink-muted leading-relaxed">{br.desc}</p>
                </div>
                <div className="pt-3 border-t border-warm-border/60 flex items-center gap-1.5 text-[11px] text-ink-muted">
                  <Shield className="w-3.5 h-3.5 text-gold-rich" />
                  <span>Authorized Installation Partner</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
