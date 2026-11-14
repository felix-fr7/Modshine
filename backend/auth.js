import crypto from 'crypto';

/**
 * Minimal, dependency-free admin authentication.
 *
 * Credentials come only from environment variables:
 *   ADMIN_USERNAME, ADMIN_PASSWORD, AUTH_SECRET
 * Tokens are HMAC-SHA256 signed: base64url(payload).base64url(signature)
 */

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const MAX_ATTEMPTS = 8;
const LOCK_WINDOW_MS = 15 * 60 * 1000;

let AUTH_SECRET = process.env.AUTH_SECRET;
if (!AUTH_SECRET || AUTH_SECRET.length < 32) {
  AUTH_SECRET = crypto.randomBytes(48).toString('hex');
  console.warn('⚠️  AUTH_SECRET missing/short — using a random secret. Admin sessions will reset when the server restarts.');
}

export const isAuthConfigured = () => Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD);

const b64url = (buf) => Buffer.from(buf).toString('base64url');
const sign = (data) => crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');

// Constant-time comparison of two strings of any length
function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function createToken(username) {
  const now = Date.now();
  const payload = b64url(JSON.stringify({ sub: username, iat: now, exp: now + TOKEN_TTL_MS }));
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.exp || Date.now() > data.exp) return null;
    if (data.sub !== process.env.ADMIN_USERNAME) return null; // username rotated → old tokens die
    return data;
  } catch {
    return null;
  }
}

// ---------- brute-force protection (per IP, in-memory) ----------
const attempts = new Map();

function attemptState(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > LOCK_WINDOW_MS) {
    const fresh = { count: 0, first: now };
    attempts.set(ip, fresh);
    return fresh;
  }
  return entry;
}

export function loginHandler(req, res) {
  if (!isAuthConfigured()) {
    return res.status(503).json({ error: 'Admin login is not configured on the server. Set ADMIN_USERNAME and ADMIN_PASSWORD.' });
  }
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const state = attemptState(ip);
  if (state.count >= MAX_ATTEMPTS) {
    const waitMin = Math.ceil((LOCK_WINDOW_MS - (Date.now() - state.first)) / 60000);
    return res.status(429).json({ error: `Too many failed attempts. Try again in ${waitMin} minute(s).` });
  }

  const { username, password } = req.body || {};
  const userOk = safeEqual(username || '', process.env.ADMIN_USERNAME);
  const passOk = safeEqual(password || '', process.env.ADMIN_PASSWORD);

  if (!userOk || !passOk) {
    state.count += 1;
    const left = Math.max(0, MAX_ATTEMPTS - state.count);
    return res.status(401).json({ error: `Invalid username or password.${left <= 3 ? ` ${left} attempt(s) left.` : ''}` });
  }

  attempts.delete(ip);
  const token = createToken(process.env.ADMIN_USERNAME);
  res.json({ token, username: process.env.ADMIN_USERNAME, expiresIn: TOKEN_TTL_MS });
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const session = verifyToken(token);
  if (!session) {
    return res.status(401).json({ error: 'Admin login required' });
  }
  req.admin = session;
  next();
}
