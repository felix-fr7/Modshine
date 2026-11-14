import { initialSettings } from './defaultData.js';

/**
 * Single source of truth for every piece of website content.
 *
 * - The public site renders `mergeContent(settingsFromApi)`.
 * - The admin studio loads the same merged object, so it always shows exactly
 *   what is live, and saves the full object back to the API (contentVersion 2).
 * All image URLs are Cloudinary URLs.
 */

const SERVICE_ICONS = { residential: 'Home', modular: 'CookingPot', commercial: 'Briefcase', turnkey: 'Key' };
const STEP_ICONS = ['MessagesSquare', 'Ruler', 'Palette', 'Layers', 'Hammer', 'CheckCheck'];

export const CONTENT_VERSION = 2;

export const defaultContent = {
  ...initialSettings,
  contentVersion: CONTENT_VERSION,

  hero: {
    ...initialSettings.hero,
    secondaryCtaText: 'Browse Modular Designs',
    tertiaryCtaText: 'Estimate Cost',
    heroImageMeta: 'Action TESA HDHMR • Carra Marble • LED Lighting',
    heroImageScore: '100%',
  },

  about: {
    ...initialSettings.about,
    eyebrow: 'Our Heritage & Vision • Est. 2009',
    heading: 'Engineering Precision Meets',
    headingHighlight: 'Timeless South Indian Homes',
    intro: 'Headquartered in **Kovilpatti** and transforming residences across **all 38 districts of Tamil Nadu** with metropolitan-grade factory modular craftsmanship.',
    imageAssurance: 'Certified 100% Waterproof',
    rating: '4.9',
    experienceLabel: 'Of Interior Excellence',
    hqLabel: 'Kovilpatti HQ',
    showroomLine: 'Showroom: 24-A26, Pasuvandhanai Road, Kovilpatti',
    showroomHours: 'Open Mon-Sat 9AM - 8:30PM',
    pillars: [
      { id: 'ap1', icon: 'Compass', title: 'Ergonomic Space Planning', desc: 'Every square inch is engineered for effortless movement, optimized kitchen work triangles, and hidden storage for modern family living.' },
      { id: 'ap2', icon: 'ShieldCheck', title: 'Tropical Climate Proofing', desc: 'Built with certified Action TESA HDHMR Boilo and Greenply Marine BWP 710 to completely resist South Indian humidity and termites.' },
      { id: 'ap3', icon: 'Award', title: 'German Motion Hardware', desc: 'Fitted exclusively with Hettich Sensys soft-close hinges and heavy-duty Ebco channels tested for over 100,000 smooth cycles.' },
      { id: 'ap4', icon: 'CalendarCheck', title: '45-Day Turnkey Handover', desc: 'From 3D photorealistic visualization and laser site measurement to clean factory installation with zero site sawdust mess.' },
    ],
    comparisonTitle: 'Why Modshine Factory Modular Outperforms Manual Carpentry',
    comparisonIntro: 'Traditional on-site carpentry causes months of dust, unsealed edges, and frequent water swelling. See how our factory-engineered process delivers superior longevity:',
    comparison: [
      { id: 'c1', feature: 'Edge Finishing & Sealing', modshine: '2mm German PUR machine hot-melt edge banding (zero peeling or moisture seepage)', traditional: 'Manual hand-applied glue with rough trimming, prone to peeling within 18 months' },
      { id: 'c2', feature: 'Measurement & Cutting', modshine: 'Computerized 5-axis CNC routering with 0.1mm micron tolerance', traditional: 'Manual handheld circular saws with visible wavy cuts and irregular tolerances' },
      { id: 'c3', feature: 'Site Installation & Cleanliness', modshine: 'Pre-fabricated flatpack modules assembled in 3-5 days with minimal noise & zero sawdust', traditional: '3 to 6 months of continuous loud hammering, toxic fumes, and dusty living conditions' },
      { id: 'c4', feature: 'Material Authenticity', modshine: 'Certified Action TESA HDHMR Boilo & Greenply 710 BWP with barcode traceability', traditional: 'Mixed commercial grade ply boards with unverified filler cores and no moisture rating' },
      { id: 'c5', feature: 'Warranty & After-Sales', modshine: '10-Year written structural & moisture warranty + lifetime local service support', traditional: 'Zero formal warranty; dependent on carpenter availability for hinge adjustments' },
    ],
    reachTitle: 'Serving Homeowners Across Full Tamil Nadu',
    reachIntro: 'With our central design hub and factory unit in Kovilpatti, our mobile survey units and dedicated installation teams deliver turnkey modular interiors across all 38 districts of Tamil Nadu:',
    regionalHubs: [
      { id: 'r1', city: 'Kovilpatti (HQ & Experience Centre)', role: 'Flagship Showroom & Manufacturing Unit', detail: 'Pasuvandhanai Road Experience Centre — touch real laminate samples, test soft-close hardware, and review 3D layouts.', highlight: 'HQ & Design Hub' },
      { id: 'r2', city: 'Chennai & Northern Hub', role: 'Luxury Apartments & Coastal Villas', detail: 'Turnkey modular execution across Chennai, Kanchipuram, Chengalpattu & Tiruvallur with architectural-grade finishes.', highlight: 'Statewide Coverage' },
      { id: 'r3', city: 'Coimbatore & Western Districts', role: 'Modern Architectural Interiors', detail: 'Dedicated project teams across Coimbatore, Tirupur, Erode & Salem for modular kitchens, wardrobes & acoustic wall paneling.', highlight: 'Statewide Coverage' },
      { id: 'r4', city: 'Madurai, Trichy & Central TN', role: 'Heritage & Contemporary Renovation', detail: 'Seamless 2BHK/3BHK modular packages across Madurai, Trichy, Dindigul, Karur & Thanjavur with milestone tracking.', highlight: 'Statewide Coverage' },
      { id: 'r5', city: 'Tirunelveli, Tuticorin & South Hub', role: 'Coastal Waterproofing & Turnkey Interiors', detail: 'Boiling waterproof HDHMR Boilo kitchens and marine ply wardrobes built for Tuticorin, Tirunelveli, Tenkasi & Kanyakumari.', highlight: 'Statewide Coverage' },
    ],
    visitLabel: 'Visit Showroom in Person',
    visitTitle: 'Pasuvandhanai Road, Kovilpatti',
    primaryCta: 'Book Design Consultation',
    secondaryCta: 'Explore Board & Hardware Brands',
    metrics: [
      { id: 'mt1', value: '450+', label: 'Homes Transformed', sub: 'Across All Tamil Nadu' },
      { id: 'mt2', value: '15+ Yrs', label: 'Design Mastery', sub: 'Architectural Excellence' },
      { id: 'mt3', value: '10 Yrs', label: 'Material Warranty', sub: 'Action TESA & Greenply BWP' },
      { id: 'mt4', value: '45 Days', label: 'Handover Commitment', sub: 'Zero Delay Guarantee' },
    ],
  },

  // Section headers (eyebrow / title / italic highlight / intro)
  sections: {
    services: { eyebrow: 'Our Core Expertise', title: 'Comprehensive Interior Design & Modular Services', titleHighlight: '', intro: 'From initial site measurement to final keys handover, every solution is engineered to perfection with premium materials and transparent pricing.' },
    philosophy: { eyebrow: 'Guiding Principles', title: 'Our Design', titleHighlight: 'Philosophy', intro: 'Rooted in thoughtful architecture and master joinery, we balance visual poise with enduring functional durability.' },
    catalog: { eyebrow: 'Curated Modular Collection', title: 'Bespoke Furniture & Interior Showcase', titleHighlight: '', intro: 'Explore our real executed designs for modular kitchens, full-height wardrobes, TV consoles, and pooja mandirs. Every unit is engineered with high-density moisture-resistant boards.' },
    materials: { eyebrow: 'Materials, Boards & Brands', title: 'Only Certified, Premium Engineering Inside Every Unit', titleHighlight: '', intro: "We never compromise on substrate quality. As presented in our portfolio, we exclusively partner with India's and Germany's foremost interior engineering brands." },
    process: { eyebrow: 'Proven 6-Stage Roadmap', title: 'Our Transparent Design & Build Process', titleHighlight: '', intro: 'From your very first sketch to the day you step into your completed dream home, our phased approach ensures complete transparency, zero hidden costs, and punctual handover.' },
    testimonials: { eyebrow: 'Client Stories & Satisfaction', title: 'Loved by 450+ Families Across Tamil Nadu', titleHighlight: '', intro: 'Real feedback from discerning homeowners who experienced our factory-direct precision joinery, zero site dust, and punctual 45-day turnkey delivery.' },
    estimator: { eyebrow: 'Interactive Project Estimator', title: 'Custom Interior Specification Planner', titleHighlight: '', intro: 'Customize your modular furniture requirements and plan your layout specifications engineered with genuine Action TESA and German hardware.' },
    contact: { eyebrow: 'Connect With Us', title: "Let's Build Your", titleHighlight: 'Dream Space', intro: "From concept to completion, we create elegant interiors tailored to your lifestyle. Get in touch and let's bring your vision to life." },
  },

  services: initialSettings.services.map((s) => ({ icon: SERVICE_ICONS[s.id] || 'Sparkles', ...s })),
  servicesCta: 'Inquire About This Service',

  philosophy: {
    footerLabel: 'Modshine Standard',
    pillars: [
      { id: 'ph1', num: '01', icon: 'Compass', title: 'Functional Planning', quote: 'We maximize every square foot through smart space planning, ensuring comfort, efficiency, and seamless day-to-day living.', detail: 'Ergonomic kitchen work triangles, concealed wire management, optimized wardrobe heights, and clutter-free storage engineered for daily life.' },
      { id: 'ph2', num: '02', icon: 'Palette', title: 'Aesthetic Excellence', quote: 'Every space is designed with a balance of elegance, modern aesthetics, and timeless appeal, creating interiors that reflect your unique personality.', detail: 'Curated palettes of warm beige, cashmere matte, fluted walnut panels, and Italian Carra marble textures that never feel dated.' },
      { id: 'ph3', num: '03', icon: 'Feather', title: 'Impactful Designs', quote: 'By combining creativity, premium materials, and meticulous attention to detail, we deliver interiors that leave a lasting impression.', detail: 'Seamless joinery, concealed LED profiles, CNC laser-cut jaali motifs, and tactile fabrics that evoke luxury from the first glance.' },
    ],
  },

  catalog: {
    searchPlaceholder: 'Search designs, boards, hardware...',
    allLabel: 'All Collections',
    cardTag: 'Custom Architecture',
    modalNote: 'Expert site visit & precision laser measurement across all Tamil Nadu.',
  },

  materialsPage: {
    boardsTitle: '1. Certified Boards & Substrates',
    moodboardTitle: '2. Concept & Moodboard Finishes',
    moodboardIntro: 'A perfect blend of modern aesthetics, natural textures, and warm neutrals designed to create enduring visual harmony.',
    moodboard: [
      { id: 'f1', title: 'Carra Marble', type: 'Stone Veins', colorFrom: '#f5f5f4', colorTo: '#d6d3d1', image: '' },
      { id: 'f2', title: 'Fluted Panel MN 8616', type: '3D Texture', colorFrom: '#78350f', colorTo: '#422006', image: '' },
      { id: 'f3', title: 'Cashmere Matte', type: 'Super Matte', colorFrom: '#3f3f46', colorTo: '#18181b', image: '' },
      { id: 'f4', title: 'Warm Beige', type: 'Neutral Tone', colorFrom: '#fef3c7', colorTo: '#fde68a', image: '' },
      { id: 'f5', title: 'Walnut Wood', type: 'Natural Grain', colorFrom: '#92400e', colorTo: '#1c1917', image: '' },
      { id: 'f6', title: 'Textured Fabric', type: 'Boucle Upholstery', colorFrom: '#d6d3d1', colorTo: '#a8a29e', image: '' },
      { id: 'f7', title: 'Black Accents', type: 'Profile Frames', colorFrom: '#171717', colorTo: '#000000', image: '' },
      { id: 'f8', title: 'Metal Finish', type: 'Brushed Brass', colorFrom: '#f59e0b', colorTo: '#a16207', image: '' },
    ],
    brandsTitle: '3. Partner Brands & Hardware Fittings',
    brandFooter: 'Authorized Installation Partner',
  },

  processSteps: initialSettings.processSteps.map((s, i) => ({ icon: STEP_ICONS[i] || 'CheckCircle2', ...s })),
  process: {
    quote: '"Design, Production & Execution By Just One Company"',
    ctaEyebrow: 'Step 01 starts today',
    ctaTitle: 'Ready to begin your home transformation?',
    ctaText: 'Book a free consultation at our Kovilpatti design studio or schedule a site measurement anywhere across Tamil Nadu.',
    ctaButton: 'Book Initial Consultation',
  },

  testimonialsNote: '100% Genuine Client Testimonials from Kovilpatti, Madurai, Tirunelveli, Chennai, and Tuticorin site executions.',

  estimator: {
    scopeOptions: [
      { id: 'kitchen', label: 'Modular Kitchen', desc: 'L-Shape / Parallel with overhead lofts & tandem boxes' },
      { id: 'wardrobe', label: 'Master Bedroom Wardrobe', desc: '9ft Floor-to-ceiling with loft & vanity mirror' },
      { id: 'tv-partition', label: 'TV Unit & Living Partition', desc: 'Fluted acoustic wall + wooden slat room divider' },
      { id: '2bhk', label: 'Full 2 BHK Complete Interior', desc: 'Kitchen + 2 Wardrobes + TV Unit + Mandir + Foyer' },
      { id: '3bhk', label: 'Full 3 BHK Luxury Turnkey', desc: 'Turnkey interior across all 3 bedrooms, hall & kitchen' },
    ],
    boardOptions: [
      { id: 'hdhmr', label: 'Action TESA HDHMR Boilo', badge: 'Recommended • Waterproof' },
      { id: 'bwp', label: 'Greenply BWP Marine Plywood 710', badge: 'Marine Grade' },
      { id: 'mr', label: 'CenturyPly MR Plywood', badge: 'Standard Moisture Resistant' },
    ],
    hardwareOptions: [
      { id: 'hettich', label: 'German Hettich Sensys + InnoTech', badge: 'Lifetime Smooth' },
      { id: 'ebco', label: 'Ebco Heavy Duty Soft-Close Channels', badge: 'High Durability' },
    ],
    finishOptions: [
      { id: 'matte', label: 'Cashmere Anti-Fingerprint Acrylic Matte' },
      { id: 'fluted', label: 'Fluted Louvers & Carra Marble Sheet Highlights' },
      { id: 'gloss', label: 'Scratch-Resistant High Gloss Laminate' },
    ],
    stepLabels: ['1. Select Room / Project Scope', '2. Core Board Material', '3. Hardware & Slider Brand', '4. Surface Finish & Texture'],
    specLabel: 'Project Specification',
    specTitle: 'Custom Architecture Plan',
    specNote: '*Tailored specifically to your site floor plan with 10-Year Warranty.',
    inclusionsTitle: 'Included in This Specification:',
    inclusions: [
      'Laser Site Measurement & Customized Layout Planning',
      'Certified {board} Grade Substrates',
      '{hardware} soft-close channels',
      'Factory Joinery, Safe Statewide Transportation & On-Site Installation',
      '10-Year Warranty & Free Periodic Maintenance Visit',
    ],
    ctaText: 'Request Custom Quote & Consultation',
    guarantee: 'Zero obligation. Final custom quote confirmed after site measurement & design sign-off.',
  },

  contact: {
    studioLabel: 'Design Studio & Showroom',
    studioTitle: 'Modshine Interior',
    studioSubtitle: 'Decorate Your Home The Easy Way',
    callTitle: 'Prefer an immediate call?',
    callText: 'Speak with our principal designer right away.',
    formTitle: 'Request an Interior Design Consultation',
    formIntro: 'Fill in your details and our team will get in touch with layout plans within 2 hours.',
    serviceOptions: ['Modular Kitchen', 'Full Height Wardrobe', 'TV Unit & Fluted Wall', 'Partition & Room Divider', 'Traditional Pooja Mandir', 'Complete 2 BHK Interior', 'Complete 3 BHK Turnkey', 'Commercial Office / Store'],
    budgetOptions: ['Essential Modular', 'Standard Package', 'Premium Tier', 'Luxury Turnkey', 'Custom Architecture', 'Flexible / Discuss on Call'],
    submitText: 'Submit Design Inquiry',
    privacyNote: '🔒 We respect your privacy. Your details are strictly used to schedule your interior consultation.',
    successTitle: 'Inquiry Received!',
  },

  consultation: {
    eyebrow: 'Design & Project Consultation',
    title: 'Book Your Design Session',
    intro: 'Visit our Kovilpatti studio or request a laser measurement at your home anywhere in Tamil Nadu.',
    serviceOptions: ['Modular Kitchen', 'Wardrobe', 'TV Unit & Wall', 'Pooja Mandir', 'Partition', 'Full 2 BHK / 3 BHK'],
    submitText: 'Confirm Consultation Booking',
    footnote: 'Direct factory pricing • 10-Year Warranty',
    successTitle: 'Consultation Scheduled!',
  },

  footer: {
    ...initialSettings.footer,
    studioLabel: 'Interior & Modular Studio',
    warrantyLine: '10-Year Water & Structural Warranty',
    ctaText: 'Book Free Site Inspection',
    categoriesTitle: 'Modular Categories',
    categoryLinks: ['Modular Kitchen (HDHMR Boilo)', 'Floor-to-Ceiling Wardrobes', 'Fluted TV Entertainment Walls', 'Wooden Slat & CNC Partitions', 'Traditional Backlit Pooja Mandirs', 'Living & Master Bedroom Suites'],
    brandsTitle: 'Partner Brands',
    brandLinks: ['Action TESA HDHMR', 'Greenply Marine Ply', 'CenturyPly Plywood', 'German Hettich Hardware', 'Ebco Fittings & Rails', 'Sleek by Asian Paints'],
    hqTitle: 'Headquarters & Studio',
    copyright: '© {year} Modshine Interior. All rights reserved. Kovilpatti HQ • Serving All Tamil Nadu.',
    craftedLine: 'Crafted for timeless homes',
  },
};

// ---------------------------------------------------------------------------
const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/**
 * Deep-merge saved settings over the defaults.
 * Legacy documents (before contentVersion 2) treated empty arrays/strings as
 * "use default"; documents saved by the new admin are honoured exactly.
 */
function mergeInto(base, saved, strict) {
  if (saved === undefined || saved === null) return base;
  if (Array.isArray(base) || Array.isArray(saved)) {
    if (!Array.isArray(saved)) return base;
    if (!strict && saved.length === 0) return base;
    return saved;
  }
  if (isPlainObject(base) && isPlainObject(saved)) {
    const out = { ...base };
    for (const key of Object.keys(saved)) out[key] = mergeInto(base[key], saved[key], strict);
    return out;
  }
  if (typeof saved === 'string' && !strict && saved.trim() === '' && typeof base === 'string') return base;
  return saved;
}

export function mergeContent(saved) {
  const strict = Number(saved?.contentVersion) >= CONTENT_VERSION;
  const merged = mergeInto(defaultContent, saved || {}, strict);
  merged.contentVersion = CONTENT_VERSION;
  return merged;
}

/** Replace {tokens} in a template string. */
export const fillTokens = (text, tokens) =>
  String(text ?? '').replace(/\{(\w+)\}/g, (m, k) => (tokens[k] !== undefined ? tokens[k] : m));
