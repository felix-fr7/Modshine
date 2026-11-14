import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { fillTokens } from '../data/siteContent.js';
import SectionHeader from './ui/SectionHeader.jsx';

export default function CostEstimator({ settings, onOpenConsultationWithEstimate }) {
  const head = settings?.sections?.estimator || {};
  const est = settings?.estimator || {};
  const arr = (v) => (Array.isArray(v) ? v : []);
  const scopeOptions = arr(est.scopeOptions);
  const boardOptions = arr(est.boardOptions);
  const hardwareOptions = arr(est.hardwareOptions);
  const finishOptions = arr(est.finishOptions);
  const stepLabels = arr(est.stepLabels);

  const [projectScope, setProjectScope] = useState(scopeOptions[0]?.id);
  const [boardType, setBoardType] = useState(boardOptions[0]?.id);
  const [hardwareTier, setHardwareTier] = useState(hardwareOptions[0]?.id);
  const [finishType, setFinishType] = useState(finishOptions[0]?.id);

  const blank = { id: '', label: '', desc: '', badge: '' };
  const currentScope = scopeOptions.find(s => s.id === projectScope) || scopeOptions[0] || blank;
  const currentBoard = boardOptions.find(b => b.id === boardType) || boardOptions[0] || blank;
  const currentHardware = hardwareOptions.find(h => h.id === hardwareTier) || hardwareOptions[0] || blank;
  const currentFinish = finishOptions.find(f => f.id === finishType) || finishOptions[0] || blank;
  const tokens = {
    board: currentBoard.label.split(' ').slice(0, 2).join(' '),
    hardware: currentHardware.label,
    scope: currentScope.label,
    finish: currentFinish.label,
  };

  const optionCls = (active) =>
    `relative p-4 rounded-[4px] text-left border transition-all duration-300 ${
      active
        ? 'border-brand-primary bg-brand-light/50 text-ink-charcoal shadow-[inset_0_0_0_1px_#1f3d34]'
        : 'border-warm-border bg-warm-canvas text-ink-body hover:border-ink-charcoal/40'
    }`;

  const StepLabel = ({ children, n }) => (
    <label className="flex items-baseline gap-3 mb-4">
      <span className="font-serif italic text-gold-primary text-lg">{n}</span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-charcoal">{children}</span>
    </label>
  );

  return (
    <section id="estimator" className="relative py-16 sm:py-20 bg-warm-canvas">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10">

        <SectionHeader
          index="08"
          eyebrow={head.eyebrow}
          title={head.title}
          highlight={head.titleHighlight}
          intro={head.intro}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Controls */}
          <div data-card className="lg:col-span-7 space-y-10">

            <div>
              <StepLabel n="i.">{stepLabels[0]}</StepLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scopeOptions.map((opt) => (
                  <button key={opt.id} type="button" onClick={() => setProjectScope(opt.id)} className={optionCls(currentScope.id === opt.id)}>
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <span className="font-serif text-lg font-semibold leading-tight">{opt.label}</span>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${currentScope.id === opt.id ? 'bg-brand-primary border-brand-primary' : 'border-warm-border'}`}>
                        {currentScope.id === opt.id && <Check className="w-3 h-3 text-warm-canvas" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-muted line-clamp-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <StepLabel n="ii.">{stepLabels[1]}</StepLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {boardOptions.map((opt) => (
                  <button key={opt.id} type="button" onClick={() => setBoardType(opt.id)} className={`${optionCls(currentBoard.id === opt.id)} flex flex-col justify-between gap-2`}>
                    <span className="font-semibold text-[13px] leading-snug">{opt.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-brand-accent font-semibold">{opt.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <StepLabel n="iii.">{stepLabels[2]}</StepLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hardwareOptions.map((opt) => (
                  <button key={opt.id} type="button" onClick={() => setHardwareTier(opt.id)} className={optionCls(currentHardware.id === opt.id)}>
                    <div className="flex justify-between items-center gap-2 mb-1">
                      <span className="font-semibold text-[13px] leading-snug">{opt.label}</span>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${currentHardware.id === opt.id ? 'bg-brand-primary border-brand-primary' : 'border-warm-border'}`}>
                        {currentHardware.id === opt.id && <Check className="w-3 h-3 text-warm-canvas" />}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-ink-muted">{opt.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <StepLabel n="iv.">{stepLabels[3]}</StepLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {finishOptions.map((opt) => (
                  <button key={opt.id} type="button" onClick={() => setFinishType(opt.id)} className={`${optionCls(currentFinish.id === opt.id)} text-[13px] font-medium leading-snug`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div data-card className="lg:col-span-5 lg:sticky lg:top-28 rounded-[4px] bg-brand-darkest text-warm-canvas p-7 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold-primary/15 blur-[100px] pointer-events-none" />

            <div className="relative border-b border-white/10 pb-6">
              <span className="text-[10px] uppercase tracking-[0.24em] text-gold-champagne font-semibold block mb-3">{est.specLabel}</span>
              <span className="display text-4xl sm:text-5xl gold-gradient-text block">
                {est.specTitle}
              </span>
              <p className="text-xs text-warm-canvas/55 mt-3">
                {est.specNote}
              </p>
            </div>

            <div className="relative py-6 space-y-4">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-champagne">
                {est.inclusionsTitle}
              </h4>
              <ul className="divide-y divide-white/10 text-[13px] text-warm-canvas/85">
                {arr(est.inclusions).map((line, i) => (
                  <li key={i} className="flex items-start gap-3 py-2.5">
                    <Check className="w-4 h-4 text-gold-primary shrink-0 mt-0.5" />
                    <span>{fillTokens(line, tokens)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                onOpenConsultationWithEstimate({
                  scope: currentScope.label,
                  board: currentBoard.label,
                  hardware: currentHardware.label,
                  finish: currentFinish.label,
                  estimateText: est.specTitle || 'Custom Architecture Specification'
                });
              }}
              className="relative btn-brass w-full group"
            >
              <span>{est.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative mt-5 flex items-start gap-2.5 text-xs text-warm-canvas/55">
              <ShieldCheck className="w-4 h-4 text-gold-champagne shrink-0" strokeWidth={1.5} />
              <span>{est.guarantee}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
