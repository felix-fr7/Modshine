import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  Compass, 
  Building2, 
  Clock, 
  Sparkles, 
  Award, 
  Star, 
  MapPin, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Eye, 
  Wrench, 
  ShieldAlert,
  CalendarCheck
} from 'lucide-react';

export default function AboutSection({ settings, onOpenConsultation }) {
  const [activeTab, setActiveTab] = useState('story');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Authentic showcase gallery images directly from the ModShine portfolio
  const showcaseImages = [
    {
      url: "/assets/about_montage_1.jpg",
      title: "Warm Architectural Living & Media Lounges",
      category: "Portfolio Highlight • Page 2",
      badge: "Living Spaces",
      desc: "Balancing fluted acoustic louvers, natural marble veining, and warm cove backlighting."
    },
    {
      url: "/assets/kitchen_island.jpg",
      title: "Linear Luxe Modular Island Kitchen",
      category: "Portfolio Highlight • Page 6",
      badge: "Modular Kitchen",
      desc: "Boilo HDHMR waterproof substrate with German Hettich InnoTech tandem runners."
    },
    {
      url: "/assets/bedroom_twin_luxury.jpg",
      title: "Signature Master Bedroom Architectural Suite",
      category: "Portfolio Highlight • Page 12",
      badge: "Master Bedroom",
      desc: "Dual illuminated arches with sound-dampening panels and floating cantilever nightstands."
    },
    {
      url: "/assets/wardrobe_sage_green.jpg",
      title: "Bespoke Sage Green Wardrobe with Vitrine",
      category: "Portfolio Highlight • Page 8",
      badge: "Custom Wardrobes",
      desc: "Fluted bronze glass showcase with automatic magnetic door-sensor task lighting."
    }
  ];

  // Core Value Pillars
  const pillars = [
    {
      icon: Compass,
      title: "Ergonomic Space Planning",
      desc: "Every square inch is engineered for effortless movement, optimized kitchen work triangles, and hidden storage for modern family living."
    },
    {
      icon: ShieldCheck,
      title: "Tropical Climate Proofing",
      desc: "Built with certified Action TESA HDHMR Boilo and Greenply Marine BWP 710 to completely resist South Indian humidity and termites."
    },
    {
      icon: Award,
      title: "German Motion Hardware",
      desc: "Fitted exclusively with Hettich Sensys soft-close hinges and heavy-duty Ebco channels tested for over 100,000 smooth cycles."
    },
    {
      icon: CalendarCheck,
      title: "45-Day Turnkey Handover",
      desc: "From 3D photorealistic visualization and laser site measurement to clean factory installation with zero site sawdust mess."
    }
  ];

  // Comparison: Factory Precision vs Traditional Carpentry
  const comparison = [
    {
      feature: "Edge Finishing & Sealing",
      modshine: "2mm German PUR machine hot-melt edge banding (zero peeling or moisture seepage)",
      traditional: "Manual hand-applied glue with rough trimming, prone to peeling within 18 months"
    },
    {
      feature: "Measurement & Cutting",
      modshine: "Computerized 5-axis CNC routering with 0.1mm micron tolerance",
      traditional: "Manual handheld circular saws with visible wavy cuts and irregular tolerances"
    },
    {
      feature: "Site Installation & Cleanliness",
      modshine: "Pre-fabricated flatpack modules assembled in 3-5 days with minimal noise & zero sawdust",
      traditional: "3 to 6 months of continuous loud hammering, toxic fumes, and dusty living conditions"
    },
    {
      feature: "Material Authenticity",
      modshine: "Certified Action TESA HDHMR Boilo & Greenply 710 BWP with barcode traceability",
      traditional: "Mixed commercial grade ply boards with unverified filler cores and no moisture rating"
    },
    {
      feature: "Warranty & After-Sales",
      modshine: "10-Year written structural & moisture warranty + lifetime local service support",
      traditional: "Zero formal warranty; dependent on carpenter availability for hinge adjustments"
    }
  ];

  // South TN Regional Coverage Hubs
  const regionalHubs = [
    {
      city: "Kovilpatti",
      role: "Flagship Showroom & Design Studio",
      detail: "Pasuvandhanai Road Experience Centre — touch real laminate samples, test soft-close hardware, and review 3D layouts.",
      highlight: "HQ & Design Hub"
    },
    {
      city: "Tuticorin & Tiruchendur",
      role: "Coastal Climate Specialized Interiors",
      detail: "Specialized boiling waterproof kitchen modules and marine-grade wardrobes built to withstand coastal air.",
      highlight: "120+ Completed Homes"
    },
    {
      city: "Tirunelveli & Tenkasi",
      role: "Luxury Villas & Modern Apartments",
      detail: "Complete home interior transformations featuring Carra marble TV media centers and backlit traditional pooja mandirs.",
      highlight: "180+ Completed Homes"
    },
    {
      city: "Madurai & Virudhunagar",
      role: "Turnkey Modular Handover",
      detail: "End-to-end 2BHK/3BHK modular interior packages with dedicated on-site project managers and scheduled milestones.",
      highlight: "95+ Completed Homes"
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#fdfcf9] relative overflow-hidden border-b border-warm-border/70">
      
      {/* Decorative Architectural Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#14453a_0.8px,transparent_0.8px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-gold-champagne/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Eyebrow & Main Title */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-wider uppercase border border-brand-primary/20 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-gold-rich" />
            <span>Our Heritage & Vision • Est. 2009</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkest leading-tight tracking-tight">
            Engineering Precision Meets{' '}
            <span className="text-brand-primary italic relative">
              Timeless South Indian Homes
              <span className="absolute left-0 bottom-1 w-full h-[2px] bg-gold-champagne/60 rounded-full"></span>
            </span>
          </h2>

          <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Rooted in <span className="font-semibold text-brand-darkest">Kovilpatti</span> and transforming residences across <span className="font-semibold text-brand-darkest">Tuticorin, Tirunelveli, and Madurai</span> with metropolitan-grade factory modular craftsmanship.
          </p>
        </div>

        {/* 2-Column Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: Multi-image Architectural Collage with Interactive Thumbnail Switcher */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Primary Frame */}
            <div className="relative rounded-3xl overflow-hidden bg-white p-2.5 sm:p-3.5 border border-warm-border shadow-luxury group transition-all duration-300">
              
              <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-brand-darkest">
                <img
                  key={activeImageIdx}
                  src={showcaseImages[activeImageIdx].url}
                  alt={showcaseImages[activeImageIdx].title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 animate-fadeIn"
                />

                {/* Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/80 via-transparent to-brand-darkest/20 pointer-events-none" />

                {/* Top Floating Badge: Category */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-brand-darkest text-xs font-bold shadow-md border border-white/50">
                  <Sparkles className="w-3.5 h-3.5 text-gold-rich" />
                  <span>{showcaseImages[activeImageIdx].badge}</span>
                </div>

                {/* Top Right Floating Badge: Material Assurance */}
                <div className="absolute top-4 right-4 hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-primary/90 backdrop-blur-md text-gold-champagne text-[11px] font-semibold border border-gold-champagne/30 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-primary" />
                  <span>Certified 100% Waterproof</span>
                </div>

                {/* Bottom Image Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-gold-champagne">
                    {showcaseImages[activeImageIdx].category}
                  </p>
                  <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug drop-shadow-sm">
                    {showcaseImages[activeImageIdx].title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
                    {showcaseImages[activeImageIdx].desc}
                  </p>
                </div>
              </div>

              {/* Desktop Floating Luxury Trust Overlay Badge */}
              <div className="hidden sm:flex absolute -bottom-5 right-6 bg-brand-darkest text-white p-4 sm:p-5 rounded-2xl shadow-luxury border border-gold-champagne/30 items-center gap-4 z-20">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/80 border border-gold-champagne/40 flex items-center justify-center text-gold-champagne shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gold-primary mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-primary text-gold-primary" />
                    ))}
                    <span className="text-xs font-bold text-white ml-1">4.9 / 5</span>
                  </div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                    15+ Years <span className="text-xs font-normal text-emerald-200 block">Of Interior Excellence</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Mobile-only trust card (non-overlapping) */}
            <div className="sm:hidden p-3 rounded-xl bg-brand-darkest text-white flex items-center justify-between border border-gold-champagne/30 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-gold-champagne shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gold-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold-primary" />
                    ))}
                    <span className="text-[10px] font-bold text-white ml-1">4.9/5 Rating</span>
                  </div>
                  <p className="text-xs font-bold text-white">15+ Years Mastery • 450+ Homes</p>
                </div>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-gold-champagne bg-brand-primary/60 px-2 py-0.5 rounded border border-gold-champagne/20">
                Kovilpatti HQ
              </span>
            </div>

            {/* Thumbnail Selectors (Click to switch primary showcase photo) */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {showcaseImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all duration-300 text-left group ${
                    activeImageIdx === idx 
                      ? 'border-brand-primary shadow-md ring-2 ring-gold-champagne/50 scale-[1.02]' 
                      : 'border-warm-border opacity-70 hover:opacity-100 hover:border-brand-primary/50'
                  }`}
                  title={img.title}
                >
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-brand-darkest/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-1 left-1 right-1 bg-black/60 backdrop-blur-xs text-[10px] text-white font-medium px-1 rounded truncate text-center">
                    {img.badge}
                  </div>
                </button>
              ))}
            </div>

            {/* Showroom Direct Tagline */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-warm-cream/80 border border-warm-border text-xs text-ink-muted">
              <span className="flex items-center gap-1.5 font-medium text-brand-darkest">
                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                Showroom: 24-A26, Pasuvandhanai Road, Kovilpatti
              </span>
              <span className="hidden sm:inline-block font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                Open Mon-Sat 9AM - 8:30PM
              </span>
            </div>

          </div>

          {/* RIGHT: Tabbed Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-warm-cream/90 rounded-2xl border border-warm-border">
              <button
                onClick={() => setActiveTab('story')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'story'
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-ink-body hover:text-brand-darkest hover:bg-white/50'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Our Story</span>
              </button>

              <button
                onClick={() => setActiveTab('factory')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'factory'
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-ink-body hover:text-brand-darkest hover:bg-white/50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Factory vs Carpentry</span>
              </button>

              <button
                onClick={() => setActiveTab('reach')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'reach'
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-ink-body hover:text-brand-darkest hover:bg-white/50'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>South TN Reach</span>
              </button>
            </div>

            {/* TAB CONTENT 1: Story & Core Values */}
            {activeTab === 'story' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-darkest leading-snug">
                    Bespoke Interiors Tailored to Your Lifestyle, Without Metropolitan Markups
                  </h3>
                  <p className="text-ink-body text-sm sm:text-base leading-relaxed">
                    <strong>Modshine Interior</strong> was established to bridge the gap between premium architectural luxury and everyday South Indian homeowners. We eliminate middleman commissions by operating our own dedicated modular joinery production unit and design studio right here in Kovilpatti.
                  </p>
                  <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                    Every layout begins with a detailed 3D photorealistic visualization, allowing you to walk through your future kitchen, master wardrobe, and living room before manufacturing starts. We ensure zero surprises in cost, materials, or delivery timelines.
                  </p>
                </div>

                {/* 4 Core Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {pillars.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white border border-warm-border/80 hover:border-gold-champagne/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-brand-light text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-gold-champagne transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-brand-darkest tracking-tight">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-ink-muted leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: Factory Precision vs Traditional Carpentry */}
            {activeTab === 'factory' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-darkest">
                    Why Modshine Factory Modular Outperforms Manual Carpentry
                  </h3>
                  <p className="text-ink-muted text-xs sm:text-sm mt-1">
                    Traditional on-site carpentry causes months of dust, unsealed edges, and frequent water swelling. See how our factory-engineered process delivers superior longevity:
                  </p>
                </div>

                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {comparison.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-warm-border text-xs space-y-2">
                      <p className="font-bold text-brand-darkest uppercase tracking-wider text-[11px] text-brand-primary">
                        {item.feature}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-start gap-2 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200/60">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-emerald-900 block text-[11px]">Modshine Standard:</span>
                            <span className="text-emerald-800 text-[11px] leading-tight block mt-0.5">{item.modshine}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 bg-rose-50/60 p-2.5 rounded-lg border border-rose-200/50">
                          <span className="text-rose-500 font-bold text-xs shrink-0 mt-0.5">✕</span>
                          <div>
                            <span className="font-semibold text-rose-900 block text-[11px]">Manual Carpenter:</span>
                            <span className="text-rose-700 text-[11px] leading-tight block mt-0.5">{item.traditional}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: South TN Coverage & Kovilpatti Showroom */}
            {activeTab === 'reach' && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-darkest">
                    Deep Local Roots Across South Tamil Nadu
                  </h3>
                  <p className="text-ink-muted text-xs sm:text-sm mt-1">
                    With our central design hub and warehouse in Kovilpatti, our dedicated execution crews manage seamless installations throughout the southern districts:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {regionalHubs.map((hub, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-warm-border hover:border-brand-primary/40 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-bold text-sm text-brand-darkest flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gold-rich" />
                            {hub.city}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-light text-brand-primary">
                            {hub.highlight}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-brand-medium">{hub.role}</p>
                        <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">{hub.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Showroom Direct Contact Bar */}
                <div className="p-4 rounded-2xl bg-brand-darkest text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-gold-champagne/30">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-gold-champagne uppercase tracking-wider">Visit Showroom in Person</p>
                    <p className="text-xs text-emerald-100">Pasuvandhanai Road, Kovilpatti</p>
                    <p className="text-[11px] text-white/60">Call: {settings?.phone || '+91 99944 12345'} / {settings?.secondaryPhone || '082208 05159'}</p>
                  </div>
                  <a
                    href={`tel:${settings?.phone || '+919994412345'}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-medium text-white text-xs font-bold transition-all border border-gold-champagne/40 shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-primary" />
                    <span>Call Showroom</span>
                  </a>
                </div>
              </div>
            )}

            {/* Bottom Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenConsultation && onOpenConsultation()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-medium text-white text-sm font-bold shadow-luxury hover:shadow-gold-glow transition-all group border border-gold-champagne/30"
              >
                <Sparkles className="w-4 h-4 text-gold-champagne group-hover:rotate-12 transition-transform" />
                <span>Book Free 3D Site Consultation</span>
                <ArrowRight className="w-4 h-4 text-gold-champagne group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#materials"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-warm-cream text-brand-darkest text-sm font-semibold border border-warm-border hover:border-brand-primary/40 transition-all"
              >
                <Layers className="w-4 h-4 text-gold-rich" />
                <span>Explore Board & Hardware Brands</span>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Metrics Credibility Ribbon */}
        <div className="mt-16 pt-10 border-t border-warm-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-white/70 border border-warm-border/60 shadow-xs hover:border-gold-champagne/60 transition-all">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-brand-primary">450+</p>
              <p className="text-xs sm:text-sm font-semibold text-brand-darkest mt-1">Homes Transformed</p>
              <p className="text-[11px] text-ink-muted">In Kovilpatti & South TN</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-warm-border/60 shadow-xs hover:border-gold-champagne/60 transition-all">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-brand-primary">15+ Yrs</p>
              <p className="text-xs sm:text-sm font-semibold text-brand-darkest mt-1">Design Mastery</p>
              <p className="text-[11px] text-ink-muted">Architectural Excellence</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-warm-border/60 shadow-xs hover:border-gold-champagne/60 transition-all">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-brand-primary">10 Yrs</p>
              <p className="text-xs sm:text-sm font-semibold text-brand-darkest mt-1">Material Warranty</p>
              <p className="text-[11px] text-ink-muted">Action TESA & Greenply BWP</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-warm-border/60 shadow-xs hover:border-gold-champagne/60 transition-all">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-brand-primary">45 Days</p>
              <p className="text-xs sm:text-sm font-semibold text-brand-darkest mt-1">Handover Commitment</p>
              <p className="text-[11px] text-ink-muted">Zero Delay Guarantee</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
