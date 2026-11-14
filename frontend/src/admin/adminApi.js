import { apiUrl } from '../config/api.js';

const TOKEN_KEY = 'modshine_admin_session';

export function getSession() {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!s.token || !s.expiresAt || Date.now() > s.expiresAt) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

function saveSession(session) {
  try { localStorage.setItem(TOKEN_KEY, JSON.stringify(session)); } catch {}
}

export function clearSession() {
  try { localStorage.removeItem(TOKEN_KEY); } catch {}
}

export class AuthError extends Error {}

async function parse(res) {
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const msg = data?.error || `Request failed (${res.status})`;
    if (res.status === 401) throw new AuthError(msg);
    throw new Error(msg);
  }
  return data;
}

export async function login(username, password) {
  let res;
  try {
    res = await fetch(apiUrl('/api/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    throw new Error('Cannot reach the server. Check your internet connection and try again.');
  }
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) throw new Error(data?.error || 'Login failed');
  const session = { token: data.token, username: data.username, expiresAt: Date.now() + data.expiresIn };
  saveSession(session);
  return session;
}

/** Authenticated request to /api/admin/* (or any path). Throws AuthError on 401. */
export async function adminFetch(path, { method = 'GET', body } = {}) {
  const session = getSession();
  if (!session) throw new AuthError('Session expired');
  let res;
  try {
    res = await fetch(apiUrl(path), {
      method,
      headers: {
        Authorization: `Bearer ${session.token}`,
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Network error — could not reach the server.');
  }
  return parse(res);
}

export async function publicFetch(path) {
  const res = await fetch(apiUrl(path));
  return parse(res);
}

export const isCloudinaryUrl = (url) => typeof url === 'string' && /^https:\/\/res\.cloudinary\.com\//.test(url);

/** Downscale large photos in the browser before upload (keeps uploads fast on mobile data). */
export function fileToDataUrl(file, maxSide = 2400, quality = 0.88) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('Please choose an image file'));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.onload = () => {
      const dataUrl = reader.result;
      if (file.type === 'image/svg+xml' || file.type === 'image/gif') return resolve(dataUrl);
      const img = new Image();
      img.onerror = () => resolve(dataUrl);
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        if (scale === 1 && file.size < 3 * 1024 * 1024) return resolve(dataUrl);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        resolve(canvas.toDataURL(type, quality));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}

/** Upload a data URI or remote URL to Cloudinary via the backend. Returns the secure URL. */
export async function uploadImage(source, folder = 'content') {
  const data = await adminFetch('/api/admin/upload', { method: 'POST', body: { image: source, folder } });
  return data.url;
}
