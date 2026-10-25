import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function CostEstimator({ onOpenConsultationWithEstimate }) {
  const [projectScope, setProjectScope] = useState('kitchen');
  const [boardType, setBoardType] = useState('hdhmr');
  const [hardwareTier, setHardwareTier] = useState('hettich');
  const [finishType, setFinishType] = useState('matte');

  const scopeOptions = [
    { id: 'kitchen', label: 'Modular Kitchen', basePrice: 165000, desc: 'L-Shape / Parallel with overhead lofts & tandem boxes' },
    { id: 'wardrobe', label: 'Master Bedroom Wardrobe', basePrice: 135000, desc: '9ft Floor-to-ceiling with loft & vanity mirror' },
    { id: 'tv-partition', label: 'TV Unit & Living Partition', basePrice: 95000, desc: 'Fluted acoustic wall + wooden slat room divider' },
    { id: '2bhk', label: 'Full 2 BHK Complete Interior', basePrice: 420000, desc: 'Kitchen + 2 Wardrobes + TV Unit + Mandir + Foyer' },
    { id: '3bhk', label: 'Full 3 BHK Luxury Turnkey', basePrice: 650000, desc: 'Turnkey interior across all 3 bedrooms, hall & kitchen' },
  ];

  const boardOptions = [
    { id: 'hdhmr', label: 'Action TESA HDHMR Boilo', multiplier: 1.15, badge: 'Recommended • Waterproof' },
    { id: 'bwp', label: 'Greenply BWP Marine Plywood 710', multiplier: 1.12, badge: 'Marine Grade' },
    { id: 'mr', label: 'CenturyPly MR Plywood', multiplier: 1.0, badge: 'Standard Moisture Resistant' },
  ];

  const hardwareOptions = [
    { id: 'hettich', label: 'German Hettich Sensys + InnoTech', multiplier: 1.10, badge: 'Lifetime Smooth' },
    { id: 'ebco', label: 'Ebco Heavy Duty Soft-Close Channels', multiplier: 1.05, badge: 'High Durability' },
  ];

  const finishOptions = [
    { id: 'matte', label: 'Cashmere Anti-Fingerprint Acrylic Matte', multiplier: 1.08 },
    { id: 'fluted', label: 'Fluted Louvers & Carra Marble Sheet Highlights', multiplier: 1.12 },
    { id: 'gloss', label: 'Scratch-Resistant High Gloss Laminate', multiplier: 1.0 },
  ];

  // Calculate live estimate
  const currentScope = scopeOptions.find(s => s.id === projectScope) || scopeOptions[0];
  const currentBoard = boardOptions.find(b => b.id === boardType) || boardOptions[0];
  const currentHardware = hardwareOptions.find(h => h.id === hardwareTier) || hardwareOptions[0];
  const currentFinish = finishOptions.find(f => f.id === finishType) || finishOptions[0];

  const baseCalculated = Math.round(
    currentScope.basePrice * currentBoard.multiplier * currentHardware.multiplier * currentFinish.multiplier
  );
  const minEstimate = Math.round(baseCalculated * 0.95);
  const maxEstimate = Math.round(baseCalculated * 1.10);

  const formatINR = (val) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  return (
    <section id="estimator" className="py-20 lg:py-28 bg-warm-canvas relative border-t border-warm-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-semibold tracking-wider uppercase border border-brand-primary/20">
            <Calculator className="w-3.5 h-3.5 text-gold-rich" />
            <span>Instant Price Estimator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkest tracking-tight">
            Transparent Interior Budget Calculator
          </h2>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            Customize your modular furniture requirements and receive an instant preliminary quote calculated with genuine Action TESA and German hardware rates.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-warm-border shadow-sm space-y-5 sm:space-y-6">
            
            {/* 1. Project Scope */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-darkest block">
                1. Select Room / Project Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {scopeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setProjectScope(opt.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      projectScope === opt.id
                        ? 'border-brand-primary bg-brand-light/70 text-brand-darkest shadow-sm ring-1 ring-brand-primary'
                        : 'border-warm-border bg-white text-ink-body hover:bg-warm-cream'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs">{opt.label}</span>
                      {projectScope === opt.id && <Check className="w-4 h-4 text-brand-primary" />}
                    </div>
                    <p className="text-[11px] text-ink-muted line-clamp-1">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Board Substrate Quality */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-darkest block">
                2. Core Board Material
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {boardOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setBoardType(opt.id)}
                    className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      boardType === opt.id
                        ? 'border-brand-primary bg-brand-light/70 text-brand-darkest shadow-sm ring-1 ring-brand-primary'
                        : 'border-warm-border bg-white text-ink-body hover:bg-warm-cream'
                    }`}
                  >
                    <span className="font-bold text-xs mb-1">{opt.label}</span>
                    <span className="text-[10px] text-emerald-800 font-semibold">{opt.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Hardware Grade */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-darkest block">
                3. Hardware & Slider Brand
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {hardwareOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setHardwareTier(opt.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      hardwareTier === opt.id
                        ? 'border-brand-primary bg-brand-light/70 text-brand-darkest shadow-sm ring-1 ring-brand-primary'
                        : 'border-warm-border bg-white text-ink-body hover:bg-warm-cream'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs">{opt.label}</span>
                      {hardwareTier === opt.id && <Check className="w-4 h-4 text-brand-primary" />}
                    </div>
                    <span className="text-[10px] text-ink-muted">{opt.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Surface Finish */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-darkest block">
                4. Surface Finish & Texture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {finishOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFinishType(opt.id)}
                    className={`p-3 rounded-xl text-left border text-xs font-medium transition-all ${
                      finishType === opt.id
                        ? 'border-brand-primary bg-brand-light/70 text-brand-darkest shadow-sm ring-1 ring-brand-primary'
                        : 'border-warm-border bg-white text-ink-body hover:bg-warm-cream'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-brand-darkest text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gold-champagne/30 shadow-2xl space-y-5 sm:space-y-6">
            
            <div className="border-b border-brand-medium/40 pb-4 sm:pb-5">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-gold-champagne font-semibold block mb-1">Estimated Investment</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-4xl font-bold gold-gradient-text break-words">
                  {formatINR(minEstimate)} - {formatINR(maxEstimate)}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-200/70 mt-1">
                *Approximate estimate for standard layout with 10-Year Warranty.
              </p>
            </div>

            {/* Included in estimate */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gold-champagne">
                Included in This Estimate:
              </h4>
              <ul className="space-y-2 text-xs text-emerald-100/90">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-primary" />
                  <span>Free Laser Site Measurement & 3D Visualization Plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-primary" />
                  <span>Certified {currentBoard.label.split(' ')[0]} {currentBoard.label.split(' ')[1]} Grade Substrates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-primary" />
                  <span>{currentHardware.label} soft-close channels</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-primary" />
                  <span>Factory Joinery, Safe Kovilpatti Transportation & Installation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-primary" />
                  <span>10-Year Warranty & Free Periodic Maintenance Visit</span>
                </li>
              </ul>
            </div>

            {/* CTA to lock in quote */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onOpenConsultationWithEstimate({
                    scope: currentScope.label,
                    board: currentBoard.label,
                    hardware: currentHardware.label,
                    finish: currentFinish.label,
                    estimateText: `${formatINR(minEstimate)} - ${formatINR(maxEstimate)}`
                  });
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-primary via-gold-champagne to-gold-rich text-brand-darkest font-bold text-sm tracking-wide shadow-gold-glow hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Claim This Estimate & Free 3D Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Guarantee note */}
            <div className="p-3 rounded-xl bg-brand-dark/80 border border-brand-medium/30 flex items-center gap-2 text-xs text-emerald-200/80">
              <ShieldCheck className="w-5 h-5 text-gold-champagne shrink-0" />
              <span>Zero obligation. Final price locked only after client 3D design sign-off.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
