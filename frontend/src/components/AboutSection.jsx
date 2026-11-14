import React, { useState } from 'react';
import {
  ShieldCheck,
  Compass,
  Building2,
  Sparkles,
  Award,
  Star,
  MapPin,
  ArrowRight,
  Phone,
  CheckCircle2,
  Layers,
  Wrench,
} from 'lucide-react';
import SectionHeader from './ui/SectionHeader.jsx';
import RichText from './ui/RichText.jsx';
import { getIcon } from '../data/icons.js';
import { cld, cldSrcSet } from '../utils/cloudinary.js';

export default function AboutSection({ settings, onOpenConsultation }) {
  const [activeTab, setActiveTab] = useState('story');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const about = settings?.about || {};
  const list = (v) => (Array.isArray(v) ? v : []);

  const showcaseImages = list(about.showcaseGallery);
  const currentImage = showcaseImages[activeImageIdx] || showcaseImages[0] || { url: '', title: '', category: '', badge: '', desc: '' };

  const stats = about.stats || settings?.stats || {};
  const storyTitle = about.title;
  const storyParagraphs = list(about.storyParagraphs);
  const pillars = list(about.pillars);
  const comparison = list(about.comparison);
  const regionalHubs = list(about.regionalHubs);
  const metrics = list(about.metrics);

  const tabs = [
    { id: 'story', icon: Compass, label: 'Our Story' },
    { id: 'factory', icon: Wrench, label: 'Factory vs Carpentry' },
    { id: 'reach', icon: Building2, label: 'Tamil Nadu Reach' },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-20 bg-paper overflow-clip">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10 relative">

        <SectionHeader
          index="01"
          eyebrow={about.eyebrow}
          title={
            <>
              {about.heading}{' '}
              {about.headingHighlight && <span className="italic text-brand-primary">{about.headingHighlight}</span>}
            </>
          }
          intro={<RichText text={about.intro} />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          {/* LEFT — Arch gallery */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-[460px]">
              <div data-tilt="4" className="arch relative overflow-hidden bg-brand-darkest">
                <div data-reveal-img="up" className="relative aspect-[4/5] overflow-hidden">
                  <img
                    key={activeImageIdx}
                    src={cld(currentImage.url, { w: 1000 })}
                    srcSet={cldSrcSet(currentImage.url, [480, 800, 1000, 1400])}
                    sizes="(min-width: 1024px) 460px, 90vw"
                    loading="lazy"
                    decoding="async"
                    alt={currentImage.title}
                    className="w-full h-full object-cover animate-fadeIn"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/70 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-[22%] left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-canvas/95 text-ink-charcoal text-[10px] font-semibold uppercase tracking-[0.16em] whitespace-nowrap">
                    <Sparkles className="w-3 h-3 text-gold-rich" />
                    <span>{currentImage.badge}</span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 hidden sm:flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-dark text-gold-champagne text-[10px] font-semibold tracking-[0.1em]">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-primary" />
                      {about.imageAssurance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating trust plaque */}
              <div className="hidden sm:flex absolute -right-6 lg:-right-12 bottom-24 bg-brand-darkest text-warm-canvas px-5 py-4 rounded-[4px] shadow-luxury-lg border border-gold-champagne/25 items-center gap-4 z-20">
                <div className="w-11 h-11 rounded-full border border-gold-champagne/40 flex items-center justify-center text-gold-champagne shrink-0">
                  <Award className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold-primary text-gold-primary" />
                    ))}
                    <span className="text-[11px] font-semibold text-warm-canvas ml-1.5">{about.rating} / 5</span>
                  </div>
                  <p className="font-serif text-2xl font-medium leading-none">
                    {stats.yearsExperience || 15}+ Years
                  </p>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-warm-canvas/55">{about.experienceLabel}</span>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-6 max-w-[460px] mx-auto text-center">
              <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-gold-rich">{currentImage.category}</p>
              <h3 className="font-serif text-2xl font-medium text-ink-charcoal mt-1.5 leading-snug">{currentImage.title}</h3>
              <p className="text-sm text-ink-muted mt-1 leading-relaxed">{currentImage.desc}</p>
            </div>

            {/* Mobile trust strip */}
            <div className="sm:hidden mt-6 flex items-center justify-between gap-3 border-y border-warm-border py-3">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-gold-rich" strokeWidth={1.5} />
                <div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold-primary text-gold-primary" />
                    ))}
                    <span className="text-[10px] font-semibold text-ink-charcoal ml-1">{about.rating}/5 Rating</span>
                  </div>
                  <p className="text-xs font-semibold text-ink-charcoal">{stats.yearsExperience || 15}+ Years Mastery • {stats.projectsCompleted || 450}+ Homes</p>
                </div>
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-rich">{about.hqLabel}</span>
            </div>

            {/* Mini-arch thumbnails */}
            <div className="mt-7 grid grid-cols-4 gap-3 max-w-[460px] mx-auto">
              {showcaseImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className="group text-center"
                  title={img.title}
                >
                  <span className={`block arch overflow-hidden aspect-[3/4] transition-all duration-500 ${activeImageIdx === idx ? 'ring-1 ring-offset-4 ring-offset-warm-canvas ring-gold-primary' : 'opacity-60 hover:opacity-100'}`}>
                    <img src={cld(img.url, { w: 240 })} alt={img.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </span>
                  <span className={`block mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.12em] font-semibold truncate ${activeImageIdx === idx ? 'text-ink-charcoal' : 'text-ink-muted'}`}>
                    {img.badge}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-7 max-w-[460px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-warm-border pt-4 text-xs">
              <span className="flex items-center gap-1.5 text-ink-body">
                <MapPin className="w-3.5 h-3.5 text-gold-rich shrink-0" />
                {about.showroomLine}
              </span>
              <span className="text-[11px] font-semibold text-brand-primary">
                {about.showroomHours}
              </span>
            </div>
          </div>

          {/* RIGHT — Narrative */}
          <div className="lg:col-span-7">

            {/* Editorial tabs */}
            <div className="flex items-center gap-6 sm:gap-10 border-b border-warm-border overflow-x-auto no-scrollbar">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`relative shrink-0 pb-4 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] flex items-center gap-2 transition-colors ${active ? 'text-ink-charcoal' : 'text-ink-muted hover:text-ink-charcoal'}`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-gold-rich' : ''}`} />
                    <span>{t.label}</span>
                    <span className={`absolute left-0 -bottom-px h-px w-full bg-ink-charcoal origin-left transition-transform duration-500 ${active ? 'scale-x-100' : 'scale-x-0'}`} />
                  </button>
                );
              })}
            </div>

            {/* TAB: Story */}
            {activeTab === 'story' && (
              <div className="pt-10 animate-fadeIn">
                <h3 className="font-serif text-3xl sm:text-[2.6rem] font-medium text-ink-charcoal leading-[1.1]">
                  {storyTitle}
                </h3>
                <div className="mt-6 grid sm:grid-cols-2 gap-6">
                  {storyParagraphs.map((para, pIdx) => (
                    <p key={pIdx} className={`text-ink-body text-[15px] leading-[1.8] ${pIdx === 0 ? 'first-letter:font-serif first-letter:text-[4.4rem] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.72] first-letter:text-brand-primary' : ''}`}>
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 border-t border-warm-border">
                  {pillars.map((item, idx) => {
                    const Icon = getIcon(item.icon);
                    return (
                      <div
                        key={idx}
                        data-card
                        className={`group py-7 sm:px-6 border-b border-warm-border ${idx % 2 === 1 ? 'sm:border-l' : 'sm:pl-0'}`}
                      >
                        <div className="flex items-center gap-3.5 mb-3">
                          <span className="w-10 h-10 rounded-full border border-warm-border flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-gold-champagne group-hover:border-brand-primary transition-all duration-500 shrink-0">
                            <Icon className="w-4 h-4" strokeWidth={1.5} />
                          </span>
                          <h4 className="font-serif text-xl font-semibold text-ink-charcoal leading-tight">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-sm text-ink-muted leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: Factory vs Carpentry */}
            {activeTab === 'factory' && (
              <div className="pt-10 animate-fadeIn">
                <h3 className="font-serif text-3xl sm:text-[2.4rem] font-medium text-ink-charcoal leading-[1.1]">
                  {about.comparisonTitle}
                </h3>
                <p className="text-ink-muted text-sm sm:text-[15px] mt-3 leading-relaxed max-w-2xl">
                  {about.comparisonIntro}
                </p>

                <div className="mt-8 border-t border-ink-charcoal/80">
                  <div className="hidden sm:grid grid-cols-12 gap-4 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold text-ink-muted border-b border-warm-border">
                    <span className="col-span-3"></span>
                    <span className="col-span-5 text-brand-primary">Modshine Standard:</span>
                    <span className="col-span-4">Manual Carpenter:</span>
                  </div>
                  {comparison.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 py-5 border-b border-warm-border">
                      <p className="sm:col-span-3 font-serif text-lg font-semibold text-ink-charcoal leading-tight">
                        {item.feature}
                      </p>
                      <div className="sm:col-span-5 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <div>
                          <span className="sm:hidden block text-[10px] uppercase tracking-[0.16em] font-semibold text-brand-primary mb-0.5">Modshine Standard:</span>
                          <span className="text-[13px] text-ink-body leading-relaxed">{item.modshine}</span>
                        </div>
                      </div>
                      <div className="sm:col-span-4 flex items-start gap-2.5">
                        <span className="text-[#a0533f] text-xs shrink-0 mt-0.5">✕</span>
                        <div>
                          <span className="sm:hidden block text-[10px] uppercase tracking-[0.16em] font-semibold text-ink-muted mb-0.5">Manual Carpenter:</span>
                          <span className="text-[13px] text-ink-muted leading-relaxed">{item.traditional}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Tamil Nadu reach */}
            {activeTab === 'reach' && (
              <div className="pt-10 animate-fadeIn">
                <h3 className="font-serif text-3xl sm:text-[2.4rem] font-medium text-ink-charcoal leading-[1.1]">
                  {about.reachTitle}
                </h3>
                <p className="text-ink-muted text-sm sm:text-[15px] mt-3 leading-relaxed max-w-2xl">
                  {about.reachIntro}
                </p>

                <div className="mt-8 border-t border-warm-border">
                  {regionalHubs.map((hub, idx) => (
                    <div key={hub.id || idx} className="group grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-5 border-b border-warm-border">
                      <span className="sm:col-span-1 font-serif italic text-gold-primary text-lg">0{idx + 1}</span>
                      <div className="sm:col-span-5">
                        <h4 className="font-serif text-xl font-semibold text-ink-charcoal leading-tight flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gold-rich shrink-0" />
                          {hub.city}
                        </h4>
                        <p className="text-xs font-semibold text-brand-primary mt-1">{hub.role}</p>
                      </div>
                      <div className="sm:col-span-6">
                        <span className="inline-block text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-rich mb-1">
                          {hub.highlight}
                        </span>
                        <p className="text-[13px] text-ink-muted leading-relaxed">{hub.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-[4px] bg-brand-darkest text-warm-canvas flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold text-gold-champagne uppercase tracking-[0.22em]">{about.visitLabel}</p>
                    <p className="font-serif text-xl">{about.visitTitle}</p>
                    <p className="text-[11px] text-warm-canvas/55">Call: {settings?.phone || '+91 99944 12345'} / {settings?.secondaryPhone || '082208 05159'}</p>
                  </div>
                  <a href={`tel:${settings?.phone || '+919994412345'}`} className="btn-brass !py-3 shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Showroom</span>
                  </a>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenConsultation && onOpenConsultation()}
                className="btn-dark group"
              >
                <Sparkles className="w-4 h-4 text-gold-champagne" />
                <span>{about.primaryCta}</span>
                <ArrowRight className="w-4 h-4 text-gold-champagne group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#materials" className="btn-line">
                <Layers className="w-4 h-4 text-gold-rich" />
                <span>{about.secondaryCta}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Metrics ledger */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 border-y border-ink-charcoal/15">
          {metrics.map((m, i) => (
            <div
              key={m.id || m.label}
              data-card
              className={`py-10 px-2 sm:px-8 text-center lg:text-left ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''} border-ink-charcoal/15`}
            >
              <p data-count className="font-serif text-5xl sm:text-6xl lg:text-7xl font-medium text-ink-charcoal leading-none">{m.value}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-charcoal mt-4">{m.label}</p>
              <p className="text-xs text-ink-muted mt-1">{m.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
