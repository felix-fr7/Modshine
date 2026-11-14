/**
 * Build-time SEO for the single-page site.
 *  - pulls the LIVE content from the API at deploy time (falls back to defaults)
 *  - injects <head> tags + JSON-LD structured data into index.html
 *  - puts a crawlable HTML copy of the page inside #root (React replaces it on load)
 *  - emits robots.txt, sitemap.xml (with images) and site.webmanifest
 */
import { mergeContent } from './src/data/siteContent.js';
import { initialProducts } from './src/data/defaultData.js';
import {
  DEFAULT_SITE_URL, buildJsonLd, buildHeadTags, buildSnapshotHtml, buildSitemap, buildRobots, buildManifest,
} from './src/seo/seoData.js';

async function fetchJson(url, timeoutMs) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export default function seoPlugin({ siteUrl, apiUrl } = {}) {
  const SITE = (siteUrl || DEFAULT_SITE_URL).replace(/\/$/, '');
  let isBuild = false;
  let content = mergeContent({});
  let products = initialProducts;

  return {
    name: 'modshine-seo',

    configResolved(config) {
      isBuild = config.command === 'build';
    },

    async buildStart() {
      if (!isBuild || !apiUrl) return;
      const base = apiUrl.replace(/\/$/, '');
      try {
        // Render free tier may be asleep — allow time for a cold start.
        const [settings, prods] = await Promise.all([
          fetchJson(`${base}/api/settings`, 45000),
          fetchJson(`${base}/api/products`, 45000),
        ]);
        content = mergeContent(settings);
        if (Array.isArray(prods) && prods.length) products = prods;
        console.log(`\n[seo] using live content from ${base} (${products.length} designs)`);
      } catch (err) {
        console.warn(`\n[seo] live content unavailable (${err.message}) — using built-in defaults`);
      }
    },

    transformIndexHtml(html) {
      const jsonLd = buildJsonLd(content, products, SITE);
      return html
        .replace('<!--seo-head-->', buildHeadTags(content, SITE, jsonLd))
        .replace('<!--seo-snapshot-->', buildSnapshotHtml(content, products));
    },

    generateBundle() {
      if (!isBuild) return;
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots(SITE) });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(content, products, SITE) });
      this.emitFile({ type: 'asset', fileName: 'site.webmanifest', source: buildManifest(content) });
    },
  };
}
