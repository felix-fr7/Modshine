import {
  Building2, Sparkles, Compass, Layers, Feather, Package, Gem, Workflow, Quote, Calculator, MessageCircle, Footprints, Search,
} from 'lucide-react';

/**
 * Admin content schema. Every key is a dot-path inside the site settings document.
 * group types:
 *   { type: 'fields', title, fields: [...] }
 *   { type: 'list', title, key, config: { itemLabel, titleKey, subtitleKey, imageKey, iconKey, fields, template } }
 */

const headerGroup = (section, title = 'Section heading') => ({
  type: 'fields',
  title,
  fields: [
    { key: `sections.${section}.eyebrow`, label: 'Small label above title' },
    { key: `sections.${section}.title`, label: 'Title' },
    { key: `sections.${section}.titleHighlight`, label: 'Italic highlight (after title)', hint: 'Optional — shown in italic accent colour.' },
    { key: `sections.${section}.intro`, label: 'Intro paragraph', type: 'textarea' },
  ],
});

const optionList = (key, title, withDesc, withBadge) => ({
  type: 'list',
  title,
  key,
  config: {
    label: title,
    itemLabel: 'option',
    idPrefix: 'opt',
    titleKey: 'label',
    subtitleKey: withDesc ? 'desc' : withBadge ? 'badge' : undefined,
    fields: [
      { key: 'label', label: 'Label', wide: true },
      ...(withDesc ? [{ key: 'desc', label: 'Description', wide: true }] : []),
      ...(withBadge ? [{ key: 'badge', label: 'Badge text', wide: true }] : []),
    ],
    template: { label: 'New option', desc: '', badge: '' },
  },
});

export const CONTENT_SECTIONS = [
  {
    id: 'seo',
    label: 'SEO & Google',
    icon: Search,
    description: 'How the website appears in Google search results and in WhatsApp / Facebook link previews. The live page updates on save; the Google-readable HTML copy and sitemap refresh on the next deploy.',
    groups: [
      {
        type: 'fields',
        title: 'Google search result',
        fields: [
          { key: 'seo.title', label: 'Page title', wide: true, hint: 'Best under 60–65 characters. Put your main keyword + city first, e.g. “Interior Designers in Kovilpatti”.' },
          { key: 'seo.description', label: 'Description', type: 'textarea', rows: 3, hint: 'Best 140–160 characters. Shown under the title in Google.' },
          { key: 'seo.keywords', label: 'Keywords (comma separated)', type: 'textarea', rows: 2, hint: 'Used by Bing and other engines. Google mostly reads the page content itself.' },
        ],
      },
      {
        type: 'fields',
        title: 'Link preview image',
        fields: [
          { key: 'seo.shareImage', label: 'Share image (WhatsApp / Facebook)', type: 'image', folder: 'seo', aspect: 'aspect-[1200/630]', hint: 'Leave empty to use the hero photo. Cropped to 1200×630.' },
        ],
      },
    ],
  },
  {
    id: 'company',
    label: 'Company & Contact',
    icon: Building2,
    description: 'Business details used in the top bar, footer, contact section and call buttons.',
    groups: [
      {
        type: 'fields',
        title: 'Business details',
        fields: [
          { key: 'companyName', label: 'Company name' },
          { key: 'tagline', label: 'Tagline' },
          { key: 'phone', label: 'Primary phone / WhatsApp' },
          { key: 'secondaryPhone', label: 'Secondary phone' },
          { key: 'email', label: 'Email' },
          { key: 'instagram', label: 'Instagram handle' },
          { key: 'address', label: 'Showroom address', type: 'textarea', rows: 2 },
          { key: 'workingHours', label: 'Working hours' },
          { key: 'serviceCoverage', label: 'Service coverage', type: 'textarea', rows: 2 },
          { key: 'announcement', label: 'Top announcement bar', type: 'textarea', rows: 2 },
        ],
      },
      {
        type: 'fields',
        title: 'Numbers',
        fields: [
          { key: 'stats.yearsExperience', label: 'Years of experience', type: 'number' },
          { key: 'stats.projectsCompleted', label: 'Homes completed', type: 'number' },
        ],
      },
    ],
  },

  {
    id: 'hero',
    label: 'Hero',
    icon: Sparkles,
    description: 'The first full-screen section of the website.',
    groups: [
      {
        type: 'fields',
        title: 'Headline & buttons',
        fields: [
          { key: 'hero.motto', label: 'Small label above headline' },
          { key: 'hero.headline', label: 'Headline (first line)' },
          { key: 'hero.highlightText', label: 'Headline (gold italic line)' },
          { key: 'hero.description', label: 'Description', type: 'textarea' },
          { key: 'hero.ctaText', label: 'Main button text' },
          { key: 'hero.secondaryCtaText', label: 'Second button text' },
          { key: 'hero.tertiaryCtaText', label: 'Estimate link text' },
        ],
      },
      {
        type: 'fields',
        title: 'Background photo & showcase card',
        fields: [
          { key: 'hero.heroImage', label: 'Full-screen background photo', type: 'image', folder: 'hero', aspect: 'aspect-[16/9]' },
          { key: 'hero.heroImageBadge', label: 'Card label' },
          { key: 'hero.heroImageTitle', label: 'Card title' },
          { key: 'hero.heroImageMeta', label: 'Card materials line' },
          { key: 'hero.heroImageScore', label: 'Card badge (circle)' },
        ],
      },
      {
        type: 'list',
        title: 'Highlights strip',
        key: 'hero.highlights',
        config: {
          label: 'Highlights', itemLabel: 'highlight', idPrefix: 'h', titleKey: 'title', subtitleKey: 'subtitle', iconKey: 'icon',
          fields: [
            { key: 'icon', label: 'Icon', type: 'icon' },
            { key: 'title', label: 'Title' },
            { key: 'subtitle', label: 'Subtitle' },
          ],
          template: { icon: 'Sparkles', title: 'New highlight', subtitle: '' },
        },
      },
    ],
  },

  {
    id: 'about',
    label: 'About',
    icon: Compass,
    description: 'Section 01 — studio story, gallery, values, comparison, regional reach and numbers.',
    groups: [
      {
        type: 'fields',
        title: 'Section heading',
        fields: [
          { key: 'about.eyebrow', label: 'Small label above title' },
          { key: 'about.heading', label: 'Title' },
          { key: 'about.headingHighlight', label: 'Italic highlight' },
          { key: 'about.intro', label: 'Intro paragraph', type: 'textarea', hint: 'Wrap words in **double stars** to make them bold.' },
        ],
      },
      {
        type: 'list',
        title: 'Arch photo gallery',
        key: 'about.showcaseGallery',
        config: {
          label: 'Photos', itemLabel: 'photo', idPrefix: 'g', titleKey: 'title', subtitleKey: 'badge', imageKey: 'url',
          fields: [
            { key: 'url', label: 'Photo', type: 'image', folder: 'about', aspect: 'aspect-[4/5]' },
            { key: 'badge', label: 'Badge / thumbnail label' },
            { key: 'category', label: 'Small caption label' },
            { key: 'title', label: 'Caption title', wide: true },
            { key: 'desc', label: 'Caption description', type: 'textarea', rows: 2 },
          ],
          template: { url: '', badge: 'New Space', category: '', title: 'New photo', desc: '' },
        },
      },
      {
        type: 'fields',
        title: 'Photo labels',
        fields: [
          { key: 'about.imageAssurance', label: 'Badge on photo' },
          { key: 'about.rating', label: 'Rating (out of 5)' },
          { key: 'about.experienceLabel', label: 'Experience plaque label' },
          { key: 'about.hqLabel', label: 'HQ label (mobile)' },
          { key: 'about.showroomLine', label: 'Showroom line' },
          { key: 'about.showroomHours', label: 'Showroom hours' },
        ],
      },
      {
        type: 'fields',
        title: '“Our Story” tab',
        fields: [
          { key: 'about.title', label: 'Story title', wide: true },
          { key: 'about.storyParagraphs', label: 'Story paragraphs', type: 'stringList', multiline: true, addLabel: 'Add paragraph' },
        ],
      },
      {
        type: 'list',
        title: 'Value pillars',
        key: 'about.pillars',
        config: {
          label: 'Pillars', itemLabel: 'pillar', idPrefix: 'ap', titleKey: 'title', subtitleKey: 'desc', iconKey: 'icon',
          fields: [
            { key: 'icon', label: 'Icon', type: 'icon' },
            { key: 'title', label: 'Title' },
            { key: 'desc', label: 'Description', type: 'textarea', rows: 2 },
          ],
          template: { icon: 'Sparkles', title: 'New pillar', desc: '' },
        },
      },
      {
        type: 'fields',
        title: '“Factory vs Carpentry” tab',
        fields: [
          { key: 'about.comparisonTitle', label: 'Title', wide: true },
          { key: 'about.comparisonIntro', label: 'Intro', type: 'textarea', rows: 2 },
        ],
      },
      {
        type: 'list',
        title: 'Comparison rows',
        key: 'about.comparison',
        config: {
          label: 'Rows', itemLabel: 'row', idPrefix: 'c', titleKey: 'feature', subtitleKey: 'modshine',
          fields: [
            { key: 'feature', label: 'Feature', wide: true },
            { key: 'modshine', label: 'Modshine standard', type: 'textarea', rows: 2 },
            { key: 'traditional', label: 'Manual carpenter', type: 'textarea', rows: 2 },
          ],
          template: { feature: 'New feature', modshine: '', traditional: '' },
        },
      },
      {
        type: 'fields',
        title: '“Tamil Nadu Reach” tab',
        fields: [
          { key: 'about.reachTitle', label: 'Title', wide: true },
          { key: 'about.reachIntro', label: 'Intro', type: 'textarea', rows: 2 },
          { key: 'about.visitLabel', label: 'Visit box label' },
          { key: 'about.visitTitle', label: 'Visit box title' },
        ],
      },
      {
        type: 'list',
        title: 'Regional hubs',
        key: 'about.regionalHubs',
        config: {
          label: 'Hubs', itemLabel: 'hub', idPrefix: 'r', titleKey: 'city', subtitleKey: 'role',
          fields: [
            { key: 'city', label: 'City / region' },
            { key: 'highlight', label: 'Tag' },
            { key: 'role', label: 'Role', wide: true },
            { key: 'detail', label: 'Details', type: 'textarea', rows: 2 },
          ],
          template: { city: 'New region', highlight: 'Statewide Coverage', role: '', detail: '' },
        },
      },
      {
        type: 'fields',
        title: 'Buttons',
        fields: [
          { key: 'about.primaryCta', label: 'Main button' },
          { key: 'about.secondaryCta', label: 'Second button' },
        ],
      },
      {
        type: 'list',
        title: 'Big numbers',
        key: 'about.metrics',
        config: {
          label: 'Numbers', itemLabel: 'number', idPrefix: 'mt', titleKey: 'value', subtitleKey: 'label',
          fields: [
            { key: 'value', label: 'Value', hint: 'Starts with a number to animate, e.g. 450+ or 45 Days' },
            { key: 'label', label: 'Label' },
            { key: 'sub', label: 'Small text', wide: true },
          ],
          template: { value: '0+', label: 'New number', sub: '' },
        },
      },
    ],
  },

  {
    id: 'services',
    label: 'Services',
    icon: Layers,
    description: 'Section 02 — large alternating service rows.',
    groups: [
      headerGroup('services'),
      {
        type: 'list',
        title: 'Services',
        key: 'services',
        config: {
          label: 'Services', itemLabel: 'service', idPrefix: 'svc', titleKey: 'title', subtitleKey: 'subtitle', imageKey: 'image',
          fields: [
            { key: 'image', label: 'Photo', type: 'image', folder: 'services' },
            { key: 'icon', label: 'Icon', type: 'icon' },
            { key: 'subtitle', label: 'Small label' },
            { key: 'title', label: 'Title', wide: true },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'deliverables', label: 'Included items', type: 'stringList', addLabel: 'Add item' },
          ],
          template: { icon: 'Sparkles', image: '', subtitle: '', title: 'New service', description: '', deliverables: [] },
        },
      },
      { type: 'fields', title: 'Link text', fields: [{ key: 'servicesCta', label: 'Link under each service' }] },
    ],
  },

  {
    id: 'philosophy',
    label: 'Design Philosophy',
    icon: Feather,
    description: 'Section 03 — dark cinematic principles scene.',
    groups: [
      headerGroup('philosophy'),
      {
        type: 'list',
        title: 'Principles',
        key: 'philosophy.pillars',
        config: {
          label: 'Principles', itemLabel: 'principle', idPrefix: 'ph', titleKey: 'title', subtitleKey: 'quote', iconKey: 'icon',
          fields: [
            { key: 'num', label: 'Number', placeholder: '01' },
            { key: 'icon', label: 'Icon', type: 'icon' },
            { key: 'title', label: 'Title', wide: true },
            { key: 'quote', label: 'Quote', type: 'textarea', rows: 2 },
            { key: 'detail', label: 'Details', type: 'textarea', rows: 2 },
          ],
          template: (items) => ({ num: String(items.length + 1).padStart(2, '0'), icon: 'Sparkles', title: 'New principle', quote: '', detail: '' }),
        },
      },
      { type: 'fields', title: 'Card footer', fields: [{ key: 'philosophy.footerLabel', label: 'Footer label on each card' }] },
    ],
  },

  {
    id: 'catalogText',
    label: 'Catalog texts',
    icon: Package,
    description: 'Section 04 heading and labels. Products and categories have their own pages.',
    groups: [
      headerGroup('catalog'),
      {
        type: 'fields',
        title: 'Labels',
        fields: [
          { key: 'catalog.searchPlaceholder', label: 'Search placeholder' },
          { key: 'catalog.allLabel', label: '“All” filter label' },
          { key: 'catalog.cardTag', label: 'Card footer label' },
          { key: 'catalog.modalNote', label: 'Product popup note' },
        ],
      },
    ],
  },

  {
    id: 'materials',
    label: 'Materials & Brands',
    icon: Gem,
    description: 'Section 05 — boards, moodboard swatches and partner brands.',
    groups: [
      headerGroup('materials'),
      { type: 'fields', title: 'Boards title', fields: [{ key: 'materialsPage.boardsTitle', label: 'Title', wide: true }] },
      {
        type: 'list',
        title: 'Boards & substrates',
        key: 'materials',
        config: {
          label: 'Boards', itemLabel: 'board', idPrefix: 'm', titleKey: 'name', subtitleKey: 'tag',
          fields: [
            { key: 'name', label: 'Name' },
            { key: 'tag', label: 'Brand tag' },
            { key: 'desc', label: 'Description', type: 'textarea', rows: 2 },
          ],
          template: { name: 'New board', tag: '', desc: '' },
        },
      },
      {
        type: 'fields',
        title: 'Moodboard',
        fields: [
          { key: 'materialsPage.moodboardTitle', label: 'Title' },
          { key: 'materialsPage.moodboardIntro', label: 'Intro', type: 'textarea', rows: 2 },
        ],
      },
      {
        type: 'list',
        title: 'Moodboard swatches',
        key: 'materialsPage.moodboard',
        config: {
          label: 'Swatches', itemLabel: 'swatch', idPrefix: 'f', titleKey: 'title', subtitleKey: 'type',
          swatch: (f) => (f.image ? `url("${f.image}")` : `linear-gradient(to bottom, ${f.colorFrom || '#ddd'}, ${f.colorTo || '#777'})`),
          fields: [
            { key: 'title', label: 'Name' },
            { key: 'type', label: 'Finish type' },
            { key: 'colorFrom', label: 'Colour (top)', type: 'color' },
            { key: 'colorTo', label: 'Colour (bottom)', type: 'color' },
            { key: 'image', label: 'Texture photo (optional — replaces colours)', type: 'image', folder: 'materials', aspect: 'aspect-[3/4]' },
          ],
          template: { title: 'New finish', type: '', colorFrom: '#e7e5e4', colorTo: '#a8a29e', image: '' },
        },
      },
      {
        type: 'fields',
        title: 'Brands',
        fields: [
          { key: 'materialsPage.brandsTitle', label: 'Title' },
          { key: 'materialsPage.brandFooter', label: 'Card footer label' },
        ],
      },
      {
        type: 'list',
        title: 'Partner brands',
        key: 'brands',
        config: {
          label: 'Brands', itemLabel: 'brand', idPrefix: 'b', titleKey: 'name', subtitleKey: 'category',
          fields: [
            { key: 'name', label: 'Brand name' },
            { key: 'badge', label: 'Badge' },
            { key: 'category', label: 'Category', wide: true },
            { key: 'desc', label: 'Description', type: 'textarea', rows: 2 },
          ],
          template: { name: 'New brand', badge: '', category: '', desc: '' },
        },
      },
    ],
  },

  {
    id: 'process',
    label: 'Process',
    icon: Workflow,
    description: 'Section 06 — design & build steps and the call-to-action banner.',
    groups: [
      headerGroup('process'),
      { type: 'fields', title: 'Quote', fields: [{ key: 'process.quote', label: 'Italic quote under title', wide: true }] },
      {
        type: 'list',
        title: 'Steps',
        key: 'processSteps',
        config: {
          label: 'Steps', itemLabel: 'step', idPrefix: 'p', titleKey: 'title', subtitleKey: 'timeline', iconKey: 'icon',
          fields: [
            { key: 'step', label: 'Step number', placeholder: '01' },
            { key: 'icon', label: 'Icon', type: 'icon' },
            { key: 'title', label: 'Title' },
            { key: 'timeline', label: 'Timeline', placeholder: 'Day 1 - 3' },
            { key: 'subtitle', label: 'Subtitle', wide: true },
            { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
            { key: 'deliverable', label: 'Deliverable' },
            { key: 'highlight', label: 'Highlight tag' },
          ],
          template: (items) => ({ step: String(items.length + 1).padStart(2, '0'), icon: 'CheckCircle2', title: 'New step', timeline: '', subtitle: '', description: '', deliverable: '', highlight: '' }),
        },
      },
      {
        type: 'fields',
        title: 'Call-to-action banner',
        fields: [
          { key: 'process.ctaEyebrow', label: 'Small label' },
          { key: 'process.ctaButton', label: 'Button text' },
          { key: 'process.ctaTitle', label: 'Title', wide: true },
          { key: 'process.ctaText', label: 'Text', type: 'textarea', rows: 2 },
        ],
      },
    ],
  },

  {
    id: 'testimonials',
    label: 'Testimonials',
    icon: Quote,
    description: 'Section 07 — client reviews.',
    groups: [
      headerGroup('testimonials'),
      {
        type: 'list',
        title: 'Reviews',
        key: 'testimonials',
        config: {
          label: 'Reviews', itemLabel: 'review', idPrefix: 't', titleKey: 'name', subtitleKey: 'project', imageKey: 'avatar',
          fields: [
            { key: 'avatar', label: 'Photo', type: 'image', folder: 'testimonials', aspect: 'aspect-square' },
            { key: 'name', label: 'Client name' },
            { key: 'location', label: 'City' },
            { key: 'project', label: 'Project' },
            { key: 'rating', label: 'Stars (1-5)', type: 'number' },
            { key: 'date', label: 'Date', placeholder: 'October 2026' },
            { key: 'text', label: 'Review', type: 'textarea', rows: 4 },
          ],
          template: { avatar: '', name: 'New client', location: '', project: '', rating: 5, date: '', text: '' },
        },
      },
      { type: 'fields', title: 'Note under reviews', fields: [{ key: 'testimonialsNote', label: 'Note', type: 'textarea', rows: 2 }] },
    ],
  },

  {
    id: 'estimator',
    label: 'Estimator',
    icon: Calculator,
    description: 'Section 08 — interactive specification planner.',
    groups: [
      headerGroup('estimator'),
      { type: 'fields', title: 'Step titles', fields: [{ key: 'estimator.stepLabels', label: 'Titles for the 4 steps', type: 'stringList', addLabel: 'Add title' }] },
      optionList('estimator.scopeOptions', 'Room / project scope options', true, false),
      optionList('estimator.boardOptions', 'Board material options', false, true),
      optionList('estimator.hardwareOptions', 'Hardware options', false, true),
      optionList('estimator.finishOptions', 'Surface finish options', false, false),
      {
        type: 'fields',
        title: 'Summary panel',
        fields: [
          { key: 'estimator.specLabel', label: 'Small label' },
          { key: 'estimator.specTitle', label: 'Title' },
          { key: 'estimator.specNote', label: 'Note', wide: true },
          { key: 'estimator.inclusionsTitle', label: 'List title', wide: true },
          { key: 'estimator.inclusions', label: 'Included items', type: 'stringList', addLabel: 'Add item', hint: 'Use {board}, {hardware}, {scope} or {finish} to insert the visitor’s current choice.' },
          { key: 'estimator.ctaText', label: 'Button text' },
          { key: 'estimator.guarantee', label: 'Guarantee note', type: 'textarea', rows: 2 },
        ],
      },
    ],
  },

  {
    id: 'contact',
    label: 'Contact & Forms',
    icon: MessageCircle,
    description: 'Section 09 contact block, enquiry form options and the booking popup.',
    groups: [
      headerGroup('contact'),
      {
        type: 'fields',
        title: 'Studio card',
        fields: [
          { key: 'contact.studioLabel', label: 'Small label' },
          { key: 'contact.studioTitle', label: 'Title' },
          { key: 'contact.studioSubtitle', label: 'Subtitle' },
          { key: 'contact.callTitle', label: 'Call box title' },
          { key: 'contact.callText', label: 'Call box text', wide: true },
        ],
      },
      {
        type: 'fields',
        title: 'Enquiry form',
        fields: [
          { key: 'contact.formTitle', label: 'Form title', wide: true },
          { key: 'contact.formIntro', label: 'Form intro', wide: true },
          { key: 'contact.serviceOptions', label: '“Required service” options', type: 'stringList', addLabel: 'Add service' },
          { key: 'contact.budgetOptions', label: '“Budget tier” options', type: 'stringList', addLabel: 'Add tier' },
          { key: 'contact.submitText', label: 'Submit button' },
          { key: 'contact.successTitle', label: 'Success title' },
          { key: 'contact.privacyNote', label: 'Privacy note', wide: true },
        ],
      },
      {
        type: 'fields',
        title: 'Booking popup',
        fields: [
          { key: 'consultation.eyebrow', label: 'Small label' },
          { key: 'consultation.title', label: 'Title' },
          { key: 'consultation.intro', label: 'Intro', type: 'textarea', rows: 2 },
          { key: 'consultation.serviceOptions', label: 'Service options', type: 'stringList', addLabel: 'Add service' },
          { key: 'consultation.submitText', label: 'Submit button' },
          { key: 'consultation.successTitle', label: 'Success title' },
          { key: 'consultation.footnote', label: 'Footnote', wide: true },
        ],
      },
    ],
  },

  {
    id: 'footer',
    label: 'Footer',
    icon: Footprints,
    description: 'Bottom of every page.',
    groups: [
      {
        type: 'fields',
        title: 'Brand block',
        fields: [
          { key: 'footer.studioLabel', label: 'Label under logo' },
          { key: 'footer.warrantyLine', label: 'Warranty line' },
          { key: 'footer.aboutSnippet', label: 'About text', type: 'textarea' },
          { key: 'footer.ctaText', label: 'Button text' },
        ],
      },
      {
        type: 'fields',
        title: 'Link columns',
        fields: [
          { key: 'footer.categoriesTitle', label: 'Column 1 title' },
          { key: 'footer.brandsTitle', label: 'Column 2 title' },
          { key: 'footer.categoryLinks', label: 'Column 1 links', type: 'stringList', addLabel: 'Add link' },
          { key: 'footer.brandLinks', label: 'Column 2 links', type: 'stringList', addLabel: 'Add link' },
          { key: 'footer.hqTitle', label: 'Column 3 title' },
        ],
      },
      {
        type: 'fields',
        title: 'Bottom bar',
        fields: [
          { key: 'footer.copyright', label: 'Copyright', hint: '{year} becomes the current year.', wide: true },
          { key: 'footer.craftedLine', label: 'Small line' },
        ],
      },
    ],
  },
];
