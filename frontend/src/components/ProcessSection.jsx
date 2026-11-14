import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Play,
  Pause,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import SectionHeader from './ui/SectionHeader.jsx';
import { getIcon } from '../data/icons.js';

const STEP_ICON_FALLBACK = ['MessagesSquare', 'Ruler', 'Palette', 'Layers', 'Hammer', 'CheckCheck'];

export default function ProcessSection({ settings, onOpenConsultation }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const head = settings?.sections?.process || {};
  const process = settings?.process || {};
  const steps = Array.isArray(settings?.processSteps) ? settings.processSteps : [];

  const getStepIcon = (icon, idx) => getIcon(icon || STEP_ICON_FALLBACK[idx], CheckCircle2);

  // Auto-progress through the process animation
  useEffect(() => {
    if (!isPlaying || steps.length < 2) return undefined;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  if (steps.length === 0) return null;
  const safeStep = Math.min(activeStep, steps.length - 1);
  const currentStepData = steps[safeStep];

  const progressPct = steps.length > 1 ? (safeStep / (steps.length - 1)) * 100 : 100;

  return (
    <section id="process" className="relative py-16 sm:py-20 bg-paper overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10 relative">

        <SectionHeader
          index="06"
          eyebrow={head.eyebrow}
          title={head.title}
          highlight={head.titleHighlight}
          intro={
            <>
              {process.quote && (
                <span className="block font-serif italic text-2xl sm:text-[1.7rem] leading-snug text-brand-primary mb-4">
                  {process.quote}
                </span>
              )}
              {head.intro}
            </>
          }
        />

        {/* Player controls */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink-charcoal/15 hover:border-ink-charcoal text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-body transition-colors"
            title={isPlaying ? "Pause automated progression" : "Play automated progression"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-gold-rich fill-current" />
                <span>Auto-Advancing</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-gold-rich fill-current" />
                <span>Resume Flow</span>
              </>
            )}
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full border border-ink-charcoal/15">
            {steps.map((st, idx) => (
              <button
                key={st.id || st.step}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${safeStep === idx ? 'w-6 bg-gold-primary' : 'w-1.5 bg-ink-charcoal/20 hover:bg-ink-charcoal/50'}`}
                aria-label={`Jump to stage ${st.step}`}
              />
            ))}
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-primary">
            Phase {currentStepData.step} in Focus
          </span>
        </div>

        {/* DESKTOP: timeline */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            {/* rail */}
            <div className="absolute top-[34px] left-[calc(100%/12)] right-[calc(100%/12)] h-px bg-ink-charcoal/15">
              <div className="h-full bg-gold-primary transition-all duration-700 ease-out" style={{ width: `${progressPct}%` }} />
              <div className="animate-flow-arrow opacity-60" />
            </div>

            <div className="grid grid-cols-6 gap-4 xl:gap-6 relative">
              {steps.map((st, idx) => {
                const Icon = getStepIcon(st.icon, idx);
                const isActive = safeStep === idx;
                const isPassed = safeStep >= idx;
                return (
                  <div
                    key={st.id || st.step}
                    className="flex flex-col items-center text-center group"
                    onMouseEnter={() => setIsPlaying(false)}
                  >
                    <button
                      onClick={() => {
                        setActiveStep(idx);
                        setIsPlaying(false);
                      }}
                      className="relative focus:outline-none"
                      aria-label={`Select stage ${st.step}: ${st.title}`}
                    >
                      {isActive && (
                        <span className="absolute -inset-2 rounded-full border border-gold-primary/60 animate-radar-wave pointer-events-none" />
                      )}
                      <span className={`relative w-[68px] h-[68px] rounded-full flex items-center justify-center transition-all duration-500 border ${
                        isActive
                          ? 'bg-brand-darkest border-brand-darkest text-gold-champagne scale-110 shadow-luxury'
                          : isPassed
                            ? 'bg-warm-canvas border-gold-primary text-brand-primary'
                            : 'bg-warm-canvas border-ink-charcoal/15 text-ink-muted group-hover:border-ink-charcoal group-hover:text-ink-charcoal'
                      }`}>
                        <Icon className="w-6 h-6" strokeWidth={1.4} />
                      </span>
                    </button>

                    <span className={`mt-5 font-serif italic text-sm ${isActive ? 'text-gold-rich' : 'text-ink-muted'}`}>
                      Step {st.step}
                    </span>
                    <h3
                      onClick={() => {
                        setActiveStep(idx);
                        setIsPlaying(false);
                      }}
                      className={`font-serif text-xl xl:text-[1.4rem] font-medium leading-tight mt-1 cursor-pointer transition-colors line-clamp-2 ${isActive ? 'text-ink-charcoal' : 'text-ink-body hover:text-ink-charcoal'}`}
                    >
                      {st.title}
                    </h3>
                    <p className="text-[11px] font-medium text-gold-dark mt-2 line-clamp-2">
                      {st.subtitle}
                    </p>
                    <p className="text-xs text-ink-muted mt-2 leading-relaxed line-clamp-3">
                      {st.description}
                    </p>
                    <span className={`mt-4 inline-flex px-3 py-1 rounded-full text-[9px] font-semibold uppercase tracking-[0.14em] border transition-colors ${
                      isActive ? 'border-gold-primary text-gold-rich bg-gold-light/60' : 'border-ink-charcoal/10 text-ink-muted'
                    }`}>
                      {st.highlight}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE / TABLET: swipe cards */}
        <div className="block lg:hidden mb-12">
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-5 px-5 snap-x no-scrollbar">
            {steps.map((st, idx) => {
              const Icon = getStepIcon(st.icon, idx);
              const isActive = safeStep === idx;
              return (
                <button
                  key={st.id || st.step}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  className={`snap-center shrink-0 w-[260px] rounded-[4px] p-6 border transition-all duration-500 text-left flex flex-col justify-between ${
                    isActive ? 'bg-brand-darkest border-brand-darkest text-warm-canvas' : 'bg-warm-canvas border-warm-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className={`w-12 h-12 rounded-full border flex items-center justify-center ${isActive ? 'border-gold-champagne/40 text-gold-champagne' : 'border-warm-border text-brand-primary'}`}>
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                    <span className={`font-serif italic text-4xl ${isActive ? 'text-gold-primary' : 'text-ink-charcoal/20'}`}>
                      {st.step}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <span className={`text-[9px] uppercase tracking-[0.18em] font-semibold block ${isActive ? 'text-gold-champagne' : 'text-gold-rich'}`}>
                      {st.subtitle}
                    </span>
                    <h4 className={`font-serif text-2xl font-medium leading-tight ${isActive ? 'text-warm-canvas' : 'text-ink-charcoal'}`}>
                      {st.title}
                    </h4>
                    <p className={`text-xs leading-relaxed line-clamp-3 ${isActive ? 'text-warm-canvas/60' : 'text-ink-muted'}`}>
                      {st.description}
                    </p>
                  </div>
                  <div className={`mt-5 pt-3 border-t flex items-center justify-between text-[11px] ${isActive ? 'border-white/10' : 'border-warm-border'}`}>
                    <span className={`font-semibold ${isActive ? 'text-gold-champagne' : 'text-brand-primary'}`}>Phase {st.step}</span>
                    <span className={isActive ? 'text-warm-canvas/60' : 'text-gold-dark'}>{st.timeline}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-[11px] text-ink-muted">
            <span>Tap any stage or swipe horizontally</span>
            <span className="flex items-center gap-1 font-semibold text-brand-primary">
              Step {currentStepData.step} of {String(steps.length).padStart(2, '0')}
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Spotlight */}
        <div data-card className="relative rounded-[4px] bg-warm-canvas border border-warm-border overflow-hidden mb-16 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex items-start gap-6">
              <span className="hidden sm:flex w-20 h-20 rounded-full bg-brand-darkest text-gold-champagne items-center justify-center shrink-0">
                {React.createElement(getStepIcon(currentStepData.icon, safeStep), {
                  className: "w-8 h-8",
                  strokeWidth: 1.4
                })}
              </span>
              <div key={safeStep} className="space-y-3 animate-fadeIn">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-rich">
                    Active Phase {currentStepData.step}
                  </span>
                  <span className="h-3 w-px bg-warm-border" />
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-primary">
                    <Clock className="w-3.5 h-3.5 text-gold-rich" />
                    {currentStepData.timeline}
                  </span>
                </div>
                <h3 className="display text-4xl sm:text-5xl text-ink-charcoal">
                  {currentStepData.title}
                </h3>
                <p className="text-sm font-medium text-gold-dark">
                  {currentStepData.subtitle}
                </p>
                <p className="pt-3 text-ink-body text-[15px] leading-relaxed">
                  <span className="font-semibold text-ink-charcoal">Scope Overview: </span>
                  {currentStepData.description}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 bg-brand-darkest text-warm-canvas flex flex-col justify-between gap-8">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-warm-canvas/50 font-semibold block">
                  Stage Deliverable:
                </span>
                <div key={safeStep} className="flex items-start gap-3 font-serif text-2xl sm:text-3xl leading-snug animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-gold-primary shrink-0 mt-1.5" strokeWidth={1.5} />
                  <span>{currentStepData.deliverable}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
                    setIsPlaying(false);
                  }}
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-gold-champagne hover:text-gold-champagne flex items-center justify-center transition-colors"
                  aria-label="Previous stage"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setActiveStep((prev) => (prev + 1) % steps.length);
                    setIsPlaying(false);
                  }}
                  className="btn-brass !py-3.5"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          {/* progress hairline */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-gold-primary transition-all duration-700" style={{ width: `${((safeStep + 1) / steps.length) * 100}%` }} />
        </div>

        {/* CTA banner */}
        <div data-card className="relative rounded-[4px] overflow-hidden bg-brand-primary text-warm-canvas px-7 py-12 sm:p-14 lg:p-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(180,142,87,0.28),transparent_45%)] pointer-events-none" />
          <div className="absolute -bottom-40 -left-24 w-[420px] h-[420px] arch border border-white/10 pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-5">
              <span className="eyebrow text-gold-champagne">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{process.ctaEyebrow}</span>
              </span>
              <h3 className="display text-4xl sm:text-6xl">
                {process.ctaTitle}
              </h3>
              <p className="text-[15px] text-warm-canvas/70 max-w-xl leading-relaxed">
                {process.ctaText}
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <button onClick={onOpenConsultation} className="btn-brass group w-full sm:w-auto">
                <span>{process.ctaButton}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
