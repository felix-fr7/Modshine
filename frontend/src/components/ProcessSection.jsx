import React, { useState, useEffect } from 'react';
import { 
  MessagesSquare, 
  Ruler, 
  Palette, 
  Layers, 
  Hammer, 
  CheckCheck,
  ArrowRight,
  ArrowDown,
  Compass,
  Play,
  Pause,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export default function ProcessSection({ onOpenConsultation }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  // Theme options: 'plum' matches the user's reference image; 'emerald' matches ModShine brand
  const [colorTheme, setColorTheme] = useState('plum'); 

  const steps = [
    {
      step: "01",
      icon: MessagesSquare,
      title: "Discovery & Consultation",
      subtitle: "Talk to our Interior Designer & Get an Estimate",
      description: "Understand the client's requirements, lifestyle, budget, and design preferences through in-depth discussion.",
      timeline: "Day 1 - 3",
      deliverable: "Lifestyle Analysis & Transparent Estimate",
      highlight: "No Obligation Consultation"
    },
    {
      step: "02",
      icon: Ruler,
      title: "Site Measurement",
      subtitle: "Detailed Laser Measurement & Site Survey",
      description: "Detailed on-site laser inspection and accurate millimeter measurements to ensure precise factory planning.",
      timeline: "Day 4 - 6",
      deliverable: "Millimeter-Accurate Site Blueprint",
      highlight: "Zero Gap Laser Survey"
    },
    {
      step: "03",
      icon: Palette,
      title: "Concept & Moodboard",
      subtitle: "Detailed 2D/3D Drawing & Approval",
      description: "Develop 2D floor layouts, curated mood boards, and realistic 3D visualizations for client sign-off.",
      timeline: "Day 7 - 14",
      deliverable: "Photoreal 3D Visualizations & Color Boards",
      highlight: "100% Client Sign-Off"
    },
    {
      step: "04",
      icon: Layers,
      title: "Material Selection",
      subtitle: "Curated Finishes, Hardware & Laminates",
      description: "Choose laminates, finishes, hardware (Hettich/Ebco), lighting, and color palettes that suit your lifestyle.",
      timeline: "Day 15 - 20",
      deliverable: "Hardware Specs & Finish Samples Swatch",
      highlight: "Branded Hettich / Ebco"
    },
    {
      step: "05",
      icon: Hammer,
      title: "Execution & Quality Control",
      subtitle: "Production at Own Factories & Execution",
      description: "Precision CNC manufacturing, swift on-site installation, and multi-tier quality checks to ensure zero flaws.",
      timeline: "Day 21 - 40",
      deliverable: "German CNC Machined Modular Units",
      highlight: "In-House Factory Precision"
    },
    {
      step: "06",
      icon: CheckCheck,
      title: "Project Handover",
      subtitle: "On-Time Handover & 10-Year Warranty",
      description: "Final deep clean, client walkthrough inspection, warranty certificates, and timely handover with total satisfaction.",
      timeline: "Day 45 Punctual",
      deliverable: "10-Year Warranty & Handover Keys",
      highlight: "Punctual Delivery Handover"
    }
  ];

  // Auto-progress through the process animation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const currentStepData = steps[activeStep];

  // Theme styling helpers
  const isPlum = colorTheme === 'plum';
  
  // Theme gradients & colors
  const nodeBgClass = isPlum
    ? 'bg-gradient-to-br from-[#592650] via-[#753a6e] to-[#8d4984]'
    : 'bg-gradient-to-br from-brand-darkest via-brand-primary to-brand-medium';

  const nodeBorderActive = isPlum
    ? 'border-[#ddc59f] ring-4 ring-[#8d4984]/30 shadow-[0_0_35px_rgba(141,73,132,0.45)]'
    : 'border-gold-champagne ring-4 ring-gold-champagne/35 shadow-[0_0_35px_rgba(196,159,100,0.4)]';

  const nodePillBg = isPlum
    ? 'bg-[#592650] text-[#f5edd8] border border-[#ddc59f]/40'
    : 'bg-brand-dark text-gold-champagne border border-gold-champagne/40';

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#fdfcf9] relative overflow-hidden">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-brand-light/60 via-gold-light/40 to-brand-light/60 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-12 right-12 w-64 h-64 bg-gold-champagne/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-brand-primary text-xs font-semibold tracking-wider uppercase border border-warm-border shadow-sm">
            <Compass className="w-3.5 h-3.5 text-gold-rich animate-spin-slow" />
            <span>Proven 6-Stage Roadmap</span>
          </div>
          
          {/* Main Title */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkest tracking-tight">
            Our Transparent Design & Build Process
          </h2>

          {/* Reference Banner: Design, Production & Execution Under One Roof */}
          <div className="inline-block">
            <span className="font-serif text-base sm:text-xl font-medium text-brand-primary/90 italic tracking-wide">
              "Design, Production & Execution By Just One Company"
            </span>
          </div>
          
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            From your very first sketch to the day you step into your completed dream home, our phased approach ensures complete transparency, zero hidden costs, and punctual handover.
          </p>

          {/* Interactive Player Controls & Theme Switcher */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            
            {/* Auto-Play Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-warm-canvas border border-warm-border text-xs font-medium text-ink-body shadow-sm hover:border-gold-champagne transition-all"
              title={isPlaying ? "Pause automated progression" : "Play automated progression"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-gold-rich fill-current" />
                  <span>Auto-Advancing</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-gold-rich fill-current" />
                  <span>Resume Flow</span>
                </>
              )}
            </button>

            {/* Quick Step Indicators */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-warm-border shadow-sm">
              {steps.map((st, idx) => (
                <button
                  key={st.step}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeStep === idx 
                      ? 'w-6 bg-gold-primary ring-2 ring-gold-champagne/40' 
                      : 'bg-warm-border hover:bg-neutral-400'
                  }`}
                  aria-label={`Jump to stage ${st.step}`}
                />
              ))}
            </div>

            {/* Color Palette Toggle: Reference Plum vs ModShine Emerald */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white border border-warm-border shadow-sm text-[11px] font-medium">
              <button
                onClick={() => setColorTheme('plum')}
                className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                  isPlum 
                    ? 'bg-[#753a6e] text-white shadow-sm font-semibold' 
                    : 'text-ink-muted hover:text-ink-body'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#a3569c]" />
                <span>Reference Theme</span>
              </button>
              <button
                onClick={() => setColorTheme('emerald')}
                className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                  !isPlum 
                    ? 'bg-brand-primary text-white shadow-sm font-semibold' 
                    : 'text-ink-muted hover:text-ink-body'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Emerald Theme</span>
              </button>
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* DESKTOP & LARGE SCREENS: CONNECTED CIRCULAR ARROW FLOW   */}
        {/* ======================================================== */}
        <div className="hidden lg:block mb-16">
          <div className="grid grid-cols-6 gap-2 xl:gap-4 relative items-start">
            
            {steps.map((st, idx) => {
              const Icon = st.icon;
              const isActive = activeStep === idx;
              const isPassed = activeStep >= idx;

              return (
                <div 
                  key={st.step} 
                  className="flex flex-col items-center relative group"
                  onMouseEnter={() => setIsPlaying(false)}
                >
                  
                  {/* Top Connector Arrow to Next Node (Rendered between idx and idx+1) */}
                  {idx < steps.length - 1 && (
                    <div 
                      className="absolute top-[48px] xl:top-[54px] z-0 flex items-center pointer-events-none"
                      style={{
                        left: 'calc(50% + 50px)',
                        width: 'calc(100% - 16px)'
                      }}
                    >
                      {/* Flowing Connector Line */}
                      <div className="relative w-full h-[2.5px] bg-warm-border rounded-full overflow-hidden">
                        {/* Shimmering Animated Beam */}
                        <div className="animate-flow-arrow" />
                        {/* Completed fill */}
                        <div 
                          className={`h-full transition-all duration-700 ${
                            isPassed ? 'bg-gradient-to-r from-gold-primary to-gold-champagne' : 'bg-transparent'
                          }`} 
                        />
                      </div>
                      
                      {/* Directional Arrow Head */}
                      <div className={`-ml-2 shrink-0 transition-all duration-500 ${
                        isPassed ? 'text-gold-rich scale-110' : 'text-warm-muted'
                      }`}>
                        <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5 animate-arrow-nudge" strokeWidth={2.5} />
                      </div>
                    </div>
                  )}

                  {/* Circular Node Button */}
                  <button
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlaying(false);
                    }}
                    className="relative focus:outline-none z-10 group/btn"
                    aria-label={`Select stage ${st.step}: ${st.title}`}
                  >
                    {/* Step Number Tag Floating on Top */}
                    <div className="flex justify-center mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all shadow-sm ${
                        isActive 
                          ? `${nodePillBg} scale-110 ring-2 ring-gold-champagne/60` 
                          : 'bg-white text-ink-muted border border-warm-border group-hover/btn:border-gold-champagne'
                      }`}>
                        Step {st.step}
                      </span>
                    </div>

                    {/* Circular Interactive Bubble */}
                    <div className="relative">
                      {/* Animated Radar Wave on Active */}
                      {isActive && (
                        <div className="absolute -inset-2.5 rounded-full border-2 border-gold-champagne/60 animate-radar-wave pointer-events-none" />
                      )}

                      {/* Main Circle */}
                      <div
                        className={`w-24 h-24 xl:w-28 xl:h-28 rounded-full flex flex-col items-center justify-center text-white transition-all duration-500 cursor-pointer border-2 shadow-md ${
                          nodeBgClass
                        } ${
                          isActive 
                            ? `${nodeBorderActive} scale-110` 
                            : 'border-white/40 group-hover/btn:scale-105 group-hover/btn:border-gold-champagne/60 group-hover/btn:shadow-lg'
                        }`}
                      >
                        {/* Centered Stage Icon */}
                        <Icon className={`w-9 h-9 xl:w-10 xl:h-10 transition-transform duration-300 ${
                          isActive ? 'scale-110 text-gold-champagne' : 'text-white group-hover/btn:scale-110'
                        }`} strokeWidth={1.75} />
                      </div>
                    </div>
                  </button>

                  {/* Step Title Below Circle */}
                  <h3 
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlaying(false);
                    }}
                    className={`font-serif text-sm xl:text-base font-bold text-center mt-4 transition-colors cursor-pointer px-1 line-clamp-2 ${
                      isActive ? 'text-brand-primary' : 'text-brand-darkest hover:text-brand-primary'
                    }`}
                  >
                    {st.title}
                  </h3>

                  {/* Secondary Subtitle directly echoing the reference style */}
                  <p className="text-[11px] font-medium text-gold-dark text-center mt-1 px-1 line-clamp-2">
                    {st.subtitle}
                  </p>

                  {/* Step Description */}
                  <p className="text-xs text-ink-muted text-center mt-2 leading-relaxed px-1 line-clamp-3">
                    {st.description}
                  </p>

                  {/* Phase Status Pill */}
                  <div className="mt-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-colors ${
                      isActive 
                        ? 'bg-gold-light text-brand-darkest border border-gold-champagne/60' 
                        : 'bg-warm-cream text-ink-muted border border-warm-border'
                    }`}>
                      {st.highlight}
                    </span>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

        {/* ======================================================== */}
        {/* TABLET & MOBILE VIEW: RESPONSIVE CONNECTED STEPPER       */}
        {/* ======================================================== */}
        <div className="block lg:hidden mb-12">
          
          {/* Mobile Horizontal Preview Scroller */}
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 snap-x no-scrollbar">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={st.step}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  className={`snap-center shrink-0 w-[240px] rounded-2xl p-5 border transition-all text-left flex flex-col justify-between ${
                    isActive 
                      ? 'bg-white border-gold-champagne shadow-luxury ring-1 ring-gold-champagne/50' 
                      : 'bg-warm-canvas border-warm-border hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    {/* Circle Node */}
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md border ${
                      nodeBgClass
                    } ${
                      isActive ? 'border-gold-champagne ring-2 ring-gold-champagne/40' : 'border-white/40'
                    }`}>
                      <Icon className="w-6 h-6 text-gold-champagne" strokeWidth={1.8} />
                    </div>
                    <span className={`font-serif text-2xl font-bold ${
                      isActive ? 'text-gold-rich' : 'text-neutral-300'
                    }`}>
                      {st.step}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-rich block">
                      {st.subtitle}
                    </span>
                    <h4 className="font-serif font-bold text-base text-brand-darkest">
                      {st.title}
                    </h4>
                    <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                      {st.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-warm-border/60 flex items-center justify-between text-[11px] text-ink-muted">
                    <span className="font-semibold text-brand-primary">Phase {st.step}</span>
                    <span className="text-gold-dark font-medium">{st.timeline}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Swipe indicator hint */}
          <div className="flex items-center justify-between mt-3 text-xs text-ink-muted px-2">
            <span>Tap any stage or swipe horizontally</span>
            <span className="flex items-center gap-1 font-semibold text-brand-primary">
              Step {currentStepData.step} of 06
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>

        {/* ======================================================== */}
        {/* ACTIVE STAGE SPOTLIGHT CARD (EXPANDED REASSURANCE)       */}
        {/* ======================================================== */}
        <div className="rounded-3xl bg-white border border-warm-border shadow-luxury p-6 sm:p-8 lg:p-10 relative overflow-hidden mb-16">
          
          {/* Subtle Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-primary via-gold-champagne to-brand-primary" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left: Active Icon & Title Details */}
            <div className="flex items-start sm:items-center gap-5">
              
              {/* Highlight Circle */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shrink-0 flex items-center justify-center text-white shadow-lg border border-gold-champagne/40 ${
                nodeBgClass
              }`}>
                {React.createElement(currentStepData.icon, {
                  className: "w-8 h-8 sm:w-10 sm:h-10 text-gold-champagne",
                  strokeWidth: 1.8
                })}
              </div>

              {/* Title & Phase Meta */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-gold-light text-brand-darkest text-xs font-bold tracking-wider uppercase border border-gold-champagne/50">
                    Active Phase {currentStepData.step}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary">
                    <Clock className="w-3.5 h-3.5 text-gold-rich" />
                    {currentStepData.timeline}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-darkest">
                  {currentStepData.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-gold-dark">
                  {currentStepData.subtitle}
                </p>
              </div>

            </div>

            {/* Right: Key Deliverable & Actions */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-warm-border">
              
              {/* Deliverable Badge Box */}
              <div className="px-4 py-3 rounded-xl bg-warm-cream border border-warm-border space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold block">
                  Stage Deliverable:
                </span>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-darkest">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{currentStepData.deliverable}</span>
                </div>
              </div>

              {/* Step Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
                    setIsPlaying(false);
                  }}
                  className="p-3 rounded-xl bg-white hover:bg-warm-canvas border border-warm-border text-ink-body hover:border-gold-champagne transition-all shadow-sm"
                  aria-label="Previous stage"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setActiveStep((prev) => (prev + 1) % steps.length);
                    setIsPlaying(false);
                  }}
                  className="px-4 py-3 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-semibold text-xs tracking-wide transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Full Detailed Description */}
          <div className="mt-6 pt-5 border-t border-warm-border/70 text-ink-body text-sm sm:text-base leading-relaxed bg-warm-canvas/60 p-4 rounded-xl">
            <span className="font-semibold text-brand-darkest">Scope Overview: </span>
            {currentStepData.description}
          </div>

        </div>

        {/* ======================================================== */}
        {/* CONSULTATION CALLOUT BANNER (PRESERVED IN FULL)          */}
        {/* ======================================================== */}
        <div className="rounded-3xl bg-brand-darkest text-white p-8 sm:p-12 border border-gold-champagne/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Subtle Ambient Background Flare */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold-rich/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-primary/30 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-gold-champagne text-xs font-semibold tracking-wider uppercase border border-gold-champagne/20">
              <Sparkles className="w-3.5 h-3.5 text-gold-primary" />
              <span>Step 01 starts today</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Ready to begin your home transformation?
            </h3>
            <p className="text-sm text-emerald-100/70 max-w-xl">
              Book a free consultation at our Kovilpatti design studio or schedule a site measurement at your premises.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="shrink-0 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-primary via-gold-champagne to-gold-rich text-brand-darkest font-bold text-sm tracking-wide shadow-gold-glow hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 z-10"
          >
            <span>Book Initial Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
