/**
 * Cloudinary delivery helpers — serve every photo in a modern format (WebP/AVIF),
 * auto quality and the right width for the screen. Huge win for page speed / SEO.
 */
const UPLOAD = '/image/upload/';

export function cld(url, { w, h, crop = 'limit', gravity, format = 'f_auto' } = {}) {
  if (typeof url !== 'string' || !url.includes('res.cloudinary.com') || !url.includes(UPLOAD)) return url;
  const [base, rest] = url.split(UPLOAD);
  const first = rest.split('/')[0];
  // already transformed (e.g. "c_fill,w_400") → leave untouched
  if (!/^v\d+$/.test(first) && /^[a-z]{1,3}_/.test(first)) return url;
  const t = [
    format,
    'q_auto',
    w && `w_${w}`,
    h && `h_${h}`,
    (w || h) && `c_${crop}`,
    gravity && `g_${gravity}`,
  ].filter(Boolean).join(',');
  return `${base}${UPLOAD}${t}/${rest}`;
}

export const cldSrcSet = (url, widths) => {
  if (typeof url !== 'string' || !url.includes('res.cloudinary.com')) return undefined;
  return widths.map((w) => `${cld(url, { w })} ${w}w`).join(', ');
};
