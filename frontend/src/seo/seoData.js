/**
 * SEO builders shared by the build (vite-plugin-seo.js → static HTML, sitemap)
 * and the running site (useSeo → live title/description/structured data).
 * Pure JS — no React, no browser APIs.
 */
import { cld } from '../utils/cloudinary.js';

export const DEFAULT_SITE_URL = 'https://modshineinterior.in';

const LOGO = 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878437/modshine/Logo.jpg';

export const logoUrl = (size = 512) => LOGO.replace('/image/upload/', `/image/upload/b_white,c_pad,w_${size},h_${size},f_png/`);

export const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const plainText = (s) => String(s ?? '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();

export const shareImage = (content) =>
  cld(content?.seo?.shareImage || content?.hero?.heroImage || LOGO, { w: 1200, h: 630, crop: 'fill', gravity: 'auto', format: 'f_jpg' });

export const toE164 = (phone) => {
  const digits = String(phone || '').replace(/[^0-9]/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  if (digits.length === 11 && digits.startsWith('0')) return `+91${digits.slice(1)}`;
  return digits ? `+${digits}` : undefined;
};

export const instagramUrl = (handle) => {
  const h = String(handle || '').trim().replace(/^@/, '');
  if (!h) return undefined;
  return /^https?:\/\//.test(h) ? h : `https://www.instagram.com/${h}/`;
};

/** "24-A26, Pasuvandhanai Road, Kovilpatti, Tamil Nadu 628501" → PostalAddress */
export function parseAddress(address) {
  const raw = String(address || '').trim();
  if (!raw) return undefined;
  const postalCode = (raw.match(/\b(\d{6})\b/) || [])[1];
  const withoutPin = raw.replace(/\b\d{6}\b/, '').replace(/[,\s]+$/, '');
  const parts = withoutPin.split(',').map((p) => p.trim()).filter(Boolean);
  const regionIdx = parts.findIndex((p) => /tamil\s*nadu/i.test(p));
  const region = regionIdx >= 0 ? 'Tamil Nadu' : undefined;
  const locality = regionIdx > 0 ? parts[regionIdx - 1] : parts[parts.length - 1];
  const street = parts.slice(0, regionIdx > 0 ? regionIdx - 1 : parts.length - 1).join(', ');
  return {
    '@type': 'PostalAddress',
    streetAddress: street || undefined,
    addressLocality: locality || undefined,
    addressRegion: region,
    postalCode,
    addressCountry: 'IN',
  };
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const to24 = (t) => {
  const m = String(t).trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const min = m[2] || '00';
  const ap = (m[3] || '').toUpperCase();
  if (ap === 'PM' && h < 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${min}`;
};

/** "Monday - Sunday: 9:00 AM - 9:00 PM" → OpeningHoursSpecification */
export function parseHours(text) {
  const m = String(text || '').match(/([A-Za-z]+)\s*[-–to]+\s*([A-Za-z]+)\s*:?\s*([\d:]+\s*(?:AM|PM)?)\s*[-–to]+\s*([\d:]+\s*(?:AM|PM)?)/i);
  if (!m) return undefined;
  const find = (d) => DAYS.findIndex((x) => x.toLowerCase().startsWith(d.toLowerCase().slice(0, 3)));
  const a = find(m[1]);
  const b = find(m[2]);
  const opens = to24(m[3]);
  const closes = to24(m[4]);
  if (a < 0 || b < 0 || !opens || !closes) return undefined;
  const days = [];
  for (let i = a; ; i = (i + 1) % 7) {
    days.push(DAYS[i]);
    if (i === b || days.length > 7) break;
  }
  return [{ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens, closes }];
}

const SERVED_CITIES = ['Kovilpatti', 'Tirunelveli', 'Thoothukudi', 'Madurai', 'Virudhunagar', 'Sivakasi', 'Tenkasi', 'Nagercoil', 'Chennai', 'Coimbatore', 'Trichy', 'Salem'];

/** schema.org structured data for Google (local business + website). */
export function buildJsonLd(content, products = [], siteUrl = DEFAULT_SITE_URL) {
  const c = content || {};
  const url = siteUrl.replace(/\/$/, '');
  const businessId = `${url}/#business`;
  const services = (c.services || []).filter((s) => s?.title);
  const images = [c.hero?.heroImage, ...(c.about?.showcaseGallery || []).map((g) => g.url), ...services.map((s) => s.image)]
    .filter(Boolean)
    .slice(0, 8)
    .map((u) => cld(u, { w: 1600 }));

  const business = {
    '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': businessId,
    name: c.companyName || 'Modshine Interior',
    alternateName: ['Modshine Interiors', 'Modshine Interior Kovilpatti'],
    description: plainText(c.seo?.description || c.hero?.description),
    slogan: c.tagline,
    url: `${url}/`,
    logo: logoUrl(512),
    image: images,
    telephone: toE164(c.phone),
    email: c.email || undefined,
    address: parseAddress(c.address),
    openingHoursSpecification: parseHours(c.workingHours),
    areaServed: [
      { '@type': 'State', name: 'Tamil Nadu' },
      ...SERVED_CITIES.map((name) => ({ '@type': 'City', name })),
    ],
    sameAs: [instagramUrl(c.instagram)].filter(Boolean),
    knowsAbout: ['Interior design', 'Modular kitchen', 'Wardrobes', 'TV units', 'Pooja units', 'Turnkey home interiors'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Interior Design & Modular Furniture Services',
      itemListElement: [
        ...services.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: plainText(s.description), areaServed: 'Tamil Nadu' },
        })),
        ...products.slice(0, 20).filter((p) => p?.title).map((p) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: p.title,
            description: plainText(p.description),
            image: cld(p.image, { w: 1200 }),
            category: p.categoryName || p.category,
          },
        })),
      ],
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    url: `${url}/`,
    name: c.companyName || 'Modshine Interior',
    inLanguage: 'en-IN',
    publisher: { '@id': businessId },
  };

  const webpage = {
    '@type': 'WebPage',
    '@id': `${url}/#webpage`,
    url: `${url}/`,
    name: c.seo?.title,
    description: plainText(c.seo?.description),
    isPartOf: { '@id': `${url}/#website` },
    about: { '@id': businessId },
    primaryImageOfPage: shareImage(c),
    inLanguage: 'en-IN',
  };

  const strip = (o) => JSON.parse(JSON.stringify(o)); // drop undefined
  return strip({ '@context': 'https://schema.org', '@graph': [business, website, webpage] });
}

/** <head> tags (title, description, canonical, social cards, icons). */
export function buildHeadTags(content, siteUrl = DEFAULT_SITE_URL, jsonLd) {
  const c = content || {};
  const url = `${siteUrl.replace(/\/$/, '')}/`;
  const title = c.seo?.title || c.companyName;
  const description = plainText(c.seo?.description);
  const img = shareImage(c);
  const e = escapeHtml;
  return [
    `<title>${e(title)}</title>`,
    `<meta name="description" content="${e(description)}" />`,
    c.seo?.keywords ? `<meta name="keywords" content="${e(c.seo.keywords)}" />` : '',
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<link rel="canonical" href="${e(url)}" />`,
    `<meta name="author" content="${e(c.companyName || 'Modshine Interior')}" />`,
    `<meta name="geo.region" content="IN-TN" />`,
    `<meta name="geo.placename" content="Kovilpatti, Tamil Nadu" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${e(c.companyName || 'Modshine Interior')}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:url" content="${e(url)}" />`,
    `<meta property="og:title" content="${e(title)}" />`,
    `<meta property="og:description" content="${e(description)}" />`,
    `<meta property="og:image" content="${e(img)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${e(c.hero?.heroImageTitle || title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${e(title)}" />`,
    `<meta name="twitter:description" content="${e(description)}" />`,
    `<meta name="twitter:image" content="${e(img)}" />`,
    `<link rel="icon" type="image/png" sizes="32x32" href="${e(logoUrl(32))}" />`,
    `<link rel="icon" type="image/png" sizes="192x192" href="${e(logoUrl(192))}" />`,
    `<link rel="apple-touch-icon" sizes="180x180" href="${e(logoUrl(180))}" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,
    jsonLd ? `<script type="application/ld+json" id="ld-site">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : '',
  ].filter(Boolean).join('\n  ');
}

/**
 * Crawlable HTML version of the page, placed inside #root at build time.
 * React replaces it on load; search engines and link previews read it instantly.
 */
export function buildSnapshotHtml(content, products = []) {
  const c = content || {};
  const e = escapeHtml;
  const s = c.sections || {};
  const head = (key, fallback) => `${e(s[key]?.title || fallback)}${s[key]?.titleHighlight ? ` <em>${e(s[key].titleHighlight)}</em>` : ''}`;
  const phone = c.phone || '';
  const tel = toE164(phone) || phone;

  const services = (c.services || []).map((sv) => `
      <article>
        <h3>${e(sv.title)}</h3>
        <p>${e(sv.description)}</p>
        ${(sv.deliverables || []).length ? `<ul>${sv.deliverables.map((d) => `<li>${e(d)}</li>`).join('')}</ul>` : ''}
      </article>`).join('');

  const designs = products.slice(0, 24).map((p) => `
      <li><h3>${e(p.title)}</h3><p>${e(p.categoryName || p.category)} — ${e(p.description)}</p></li>`).join('');

  const steps = (c.processSteps || []).map((st) => `<li><strong>${e(st.title)}</strong> — ${e(st.description)}</li>`).join('');
  const reviews = (c.testimonials || []).map((t) => `
      <blockquote><p>“${e(t.text)}”</p><footer>${e(t.name)}, ${e(t.location)} — ${e(t.project)}</footer></blockquote>`).join('');
  const brands = (c.brands || []).map((b) => `<li>${e(b.name)} — ${e(b.category)}</li>`).join('');

  return `
<div class="seo-snap">
  <header class="seo-hero">
    <p class="seo-eyebrow">${e(c.hero?.motto)}</p>
    <h1>${e(c.hero?.headline)} <em>${e(c.hero?.highlightText)}</em></h1>
    <p>${e(c.hero?.description)}</p>
    <p><a href="tel:${e(tel)}">Call ${e(phone)}</a> · ${e(c.address)}</p>
  </header>
  <main class="seo-body">
    <section>
      <h2>${e(c.about?.heading)} <em>${e(c.about?.headingHighlight)}</em></h2>
      <p>${e(plainText(c.about?.intro))}</p>
      <h3>${e(c.about?.title)}</h3>
      ${(c.about?.storyParagraphs || []).map((p) => `<p>${e(p)}</p>`).join('')}
    </section>
    <section>
      <h2>${head('services', 'Services')}</h2>
      <p>${e(s.services?.intro)}</p>
      ${services}
    </section>
    <section>
      <h2>${head('catalog', 'Our Work')}</h2>
      <p>${e(s.catalog?.intro)}</p>
      <ul>${designs}</ul>
    </section>
    <section>
      <h2>${head('materials', 'Materials & Brands')}</h2>
      <ul>${brands}</ul>
    </section>
    <section>
      <h2>${head('process', 'Our Process')}</h2>
      <ol>${steps}</ol>
    </section>
    <section>
      <h2>${head('testimonials', 'Client Reviews')}</h2>
      ${reviews}
    </section>
    <section>
      <h2>${head('contact', 'Contact')}</h2>
      <address>
        <strong>${e(c.companyName)}</strong><br />
        ${e(c.address)}<br />
        Phone: <a href="tel:${e(tel)}">${e(phone)}</a>${c.secondaryPhone ? ` / ${e(c.secondaryPhone)}` : ''}<br />
        ${c.email ? `Email: <a href="mailto:${e(c.email)}">${e(c.email)}</a><br />` : ''}
        Hours: ${e(c.workingHours)}
      </address>
      <p>${e(c.serviceCoverage)}</p>
    </section>
  </main>
</div>`;
}

/** sitemap.xml with image entries (helps Google Images for interior photos). */
export function buildSitemap(content, products = [], siteUrl = DEFAULT_SITE_URL) {
  const url = `${siteUrl.replace(/\/$/, '')}/`;
  const e = escapeHtml;
  const images = [
    { loc: content?.hero?.heroImage, title: content?.hero?.heroImageTitle },
    ...(content?.about?.showcaseGallery || []).map((g) => ({ loc: g.url, title: g.title })),
    ...(content?.services || []).map((s) => ({ loc: s.image, title: s.title })),
    ...products.map((p) => ({ loc: p.image, title: p.title })),
  ].filter((i) => i.loc);
  const seen = new Set();
  const imageXml = images
    .filter((i) => (seen.has(i.loc) ? false : seen.add(i.loc)))
    .slice(0, 1000)
    .map((i) => `
    <image:image>
      <image:loc>${e(cld(i.loc, { w: 1600 }))}</image:loc>
      ${i.title ? `<image:title>${e(i.title)}</image:title>` : ''}
    </image:image>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${e(url)}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>${imageXml}
  </url>
</urlset>
`;
}

export const buildRobots = (siteUrl = DEFAULT_SITE_URL) => `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml
`;

export const buildManifest = (content) => JSON.stringify({
  name: content?.companyName || 'Modshine Interior',
  short_name: 'Modshine',
  description: plainText(content?.seo?.description),
  start_url: '/',
  display: 'standalone',
  background_color: '#0e1a16',
  theme_color: '#0e1a16',
  icons: [
    { src: logoUrl(192), sizes: '192x192', type: 'image/png' },
    { src: logoUrl(512), sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
  ],
}, null, 2);
