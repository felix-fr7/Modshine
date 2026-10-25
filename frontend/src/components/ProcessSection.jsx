import React from 'react';
import { 
  MessagesSquare, 
  Ruler, 
  Palette, 
  Layers, 
  Hammer, 
  CheckCheck,
  ArrowRight,
  Compass
} from 'lucide-react';

export default function ProcessSection({ onOpenConsultation }) {
  const steps = [
    {
      step: "01",
      icon: MessagesSquare,
      title: "Discovery & Consultation",
      description: "Understand the client's requirements, lifestyle, budget, and design preferences through in-depth discussion."
    },
    {
      step: "02",
      icon: Ruler,
      title: "Site Measurement",
      description: "Detailed on-site laser inspection and accurate millimeter measurements to ensure precise factory planning."
    },
    {
      step: "03",
      icon: Palette,
      title: "Concept & Moodboard",
      description: "Develop 2D floor layouts, curated mood boards, and realistic 3D visualizations for client sign-off."
    },
    {
      step: "04",
      icon: Layers,
      title: "Material Selection",
      description: "Choose laminates, finishes, hardware (Hettich/Ebco), lighting, and color palettes that suit your lifestyle."
    },
    {
      step: "05",
      icon: Hammer,
      title: "Execution & Quality Control",
      description: "Precision CNC manufacturing, swift on-site installation, and multi-tier quality checks to ensure zero flaws."
    },
    {
      step: "06",
      icon: CheckCheck,
      title: "Project Handover",
      description: "Final deep clean, client walkthrough inspection, warranty certificates, and timely handover with total satisfaction."
    }
  ];

  return (
    <section id="process" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-semibold tracking-wider uppercase border border-brand-primary/20">
            <Compass className="w-3.5 h-3.5 text-gold-rich" />
            <span>Proven 6-Stage Roadmap</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkest tracking-tight">
            Our Transparent Design & Build Process
          </h2>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            From your very first sketch to the day you step into your completed dream home, our phased approach ensures complete transparency, zero hidden costs, and punctual handover.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="group relative rounded-2xl p-7 bg-warm-canvas border border-warm-border hover:border-brand-primary/40 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-warm-border flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-gold-champagne group-hover:scale-105 transition-all shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-neutral-300 group-hover:text-gold-primary transition-colors">
                    {st.step}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-brand-darkest group-hover:text-brand-primary transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {st.description}
                  </p>
                </div>

                {/* Bottom Progress Bar */}
                <div className="mt-6 pt-4 border-t border-warm-border/60 flex items-center justify-between text-[11px] text-ink-muted">
                  <span className="uppercase tracking-wider font-semibold">Phase {st.step}</span>
                  <span className="text-gold-rich font-medium">Quality Guaranteed</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consultation Callout Banner */}
        <div className="mt-16 rounded-3xl bg-brand-darkest text-white p-8 sm:p-12 border border-gold-champagne/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="text-xs uppercase tracking-widest text-gold-champagne font-semibold">Step 01 starts today</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Ready to begin your home transformation?
            </h3>
            <p className="text-sm text-emerald-100/70 max-w-xl">
              Book a free consultation at our Kovilpatti design studio or schedule a site measurement at your premises.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="shrink-0 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-primary via-gold-champagne to-gold-rich text-brand-darkest font-bold text-sm tracking-wide shadow-gold-glow hover:brightness-105 transition-all flex items-center gap-2 z-10"
          >
            <span>Book Initial Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
