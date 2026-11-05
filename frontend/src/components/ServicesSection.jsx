import React from 'react';
import { Home, CookingPot, Briefcase, Key, ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ServicesSection({ settings, onOpenConsultation }) {
  const defaultServices = [
    {
      id: "residential",
      icon: "Home",
      title: "Residential Interior Design",
      subtitle: "Comfort • Aesthetics • Practicality",
      description: "We create elegant and functional living spaces tailored to your lifestyle, combining aesthetics, comfort, and practicality.",
      image: "https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878427/modshine/hero_living_room.jpg",
      deliverables: ["Complete Hall & Living Room Decor", "Master & Kids Bedroom Concepts", "Lighting & Ceiling Architecture", "Curated Soft Furnishings"]
    },
    {
      id: "modular",
      icon: "CookingPot",
      title: "Modular Kitchen & Furniture",
      subtitle: "Style • Durability • Efficiency",
      description: "Custom-designed modular kitchens, wardrobes, TV units, and storage solutions crafted for style, durability, and efficient space utilization.",
      image: "https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878434/modshine/kitchen_island.jpg",
      deliverables: ["Action TESA HDHMR Boilo Kitchens", "Floor-to-Ceiling Sliding Wardrobes", "Acoustic Fluted TV Units", "Sacred Backlit Pooja Mandirs"]
    },
    {
      id: "commercial",
      icon: "Briefcase",
      title: "Commercial Interior Design",
      subtitle: "Productivity • Brand Identity",
      description: "From offices to retail spaces, we design professional environments that enhance productivity and strengthen your brand identity.",
      image: "https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878461/modshine/partition_wooden_slat.jpg",
      deliverables: ["Corporate Offices & Executive Cabins", "Retail Showrooms & Boutiques", "Hospitality & Clinic Lounges", "Soundproof Partition Walls"]
    },
    {
      id: "turnkey",
      icon: "Key",
      title: "Turnkey Interior Solutions",
      subtitle: "Concept to Handover",
      description: "We manage the complete project from concept, design, material selection, execution, and final handover with assured quality and timely delivery.",
      image: "https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878425/modshine/bedroom_twin_luxury.jpg",
      deliverables: ["3D Realistic Walkthrough Visuals", "Single Point Accountability", "Factory-Direct Precision Joinery", "Fixed Timeline & Budget Assurance"]
    }
  ];

  const services = (settings?.services && settings.services.length > 0)
    ? settings.services
    : defaultServices;

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Home': return <Home className="w-6 h-6" />;
      case 'CookingPot': return <CookingPot className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Key': return <Key className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-semibold tracking-wider uppercase border border-brand-primary/20">
            <Layers className="w-3.5 h-3.5 text-gold-rich" />
            <span>Our Core Expertise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkest tracking-tight">
            Comprehensive Interior Design & Modular Services
          </h2>
          <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
            From initial site measurement to final keys handover, every solution is engineered to perfection with premium materials and transparent pricing.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {services.map((s, idx) => {
            const rawDeliverables = Array.isArray(s.deliverables)
              ? s.deliverables
              : (typeof s.deliverables === 'string' ? s.deliverables.split(',').map(d => d.trim()).filter(Boolean) : []);

            return (
              <div
                key={s.id || idx}
                className="group rounded-2xl overflow-hidden border border-warm-border/80 bg-warm-canvas hover:border-brand-primary/40 transition-all duration-300 shadow-sm hover:shadow-luxury flex flex-col justify-between h-full"
              >
                {/* Image Banner */}
                <div className="relative h-60 overflow-hidden bg-brand-dark">
                  <img
                    src={s.image || 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878427/modshine/hero_living_room.jpg'}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/80 via-brand-darkest/20 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 p-3 rounded-xl bg-brand-primary/90 text-gold-champagne backdrop-blur-md border border-gold-champagne/30 shadow-md">
                    {renderIcon(s.icon)}
                  </div>

                  {/* Subtitle tag */}
                  {s.subtitle && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-champagne bg-brand-darkest/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-gold-champagne/20">
                        {s.subtitle}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-brand-darkest group-hover:text-brand-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-ink-body text-sm leading-relaxed">
                      {s.description}
                    </p>

                    {/* Deliverables tags */}
                    {rawDeliverables.length > 0 && (
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {rawDeliverables.map((item, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-ink-muted">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0"></span>
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-warm-border/60">
                    <button
                      onClick={onOpenConsultation}
                      className="text-xs font-bold uppercase tracking-wider text-brand-primary group-hover:text-gold-rich flex items-center gap-1.5 transition-colors"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

      </div>
    </section>
  );
}
