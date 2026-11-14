import { useEffect } from 'react';
import { buildJsonLd, shareImage, DEFAULT_SITE_URL } from './seoData.js';

const SITE_URL = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;

function setMeta(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/** Keeps title, description, social cards and JSON-LD in sync with admin-edited content. */
export function useSeo(content, products, enabled = true) {
  useEffect(() => {
    if (!enabled || !content) return;
    const title = content.seo?.title;
    const description = String(content.seo?.description || '').replace(/\*\*/g, '');
    const img = shareImage(content);

    if (title) document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', content.seo?.keywords);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', img);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');

    let ld = document.getElementById('ld-site');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'ld-site';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(buildJsonLd(content, products || [], SITE_URL));
  }, [content, products, enabled]);
}

/** Admin pages must never be indexed. */
export function useNoIndex() {
  useEffect(() => {
    const el = document.head.querySelector('meta[name="robots"]') || Object.assign(document.createElement('meta'), { name: 'robots' });
    if (!el.parentNode) document.head.appendChild(el);
    const previous = el.getAttribute('content');
    el.setAttribute('content', 'noindex, nofollow');
    return () => { if (previous) el.setAttribute('content', previous); };
  }, []);
}
