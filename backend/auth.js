import crypto from 'crypto';

/**
 * Admin authentication backed by the database.
 *
 * - Admin users live in the database (MongoDB `adminusers`, or data/admins.json locally).
 * - Passwords are stored as salted scrypt hashes, never in plain text.
 * - On first start, a default admin is created (ADMIN_USERNAME / ADMIN_PASSWORD env
 *   vars if set, otherwise admin / admin@123). Change it from Admin → Account.
 * - Session tokens are HMAC-signed with a per-user secret that is rotated on every
 *   password change, so changing the password signs out all other sessions.
 */

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const MAX_ATTEMPTS = 8;
const LOCK_WINDOW_MS = 15 * 60 * 1000;
const MIN_PASSWORD_LENGTH = 8;

const DEFAULT_ADMIN = {
  username: (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase(),
  password: process.env.ADMIN_PASSWORD || 'admin@123',
};

// ---------- crypto helpers ----------
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password, stored) {
  const [alg, salt, hash] = String(stored || '').split('$');
  if (alg !== 'scrypt' || !salt || !hash) return false;
  const test = crypto.scryptSync(String(password ?? ''), salt, 64);
  const ref = Buffer.from(hash, 'hex');
  return ref.length === test.length && crypto.timingSafeEqual(ref, test);
}

const newSecret = () => crypto.randomBytes(32).toString('hex');
const DUMMY_HASH = hashPassword(crypto.randomBytes(8).toString('hex')); // equalise timing for unknown users

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

const sign = (data, secret) =>
  crypto.createHmac('sha256', `${secret}${process.env.AUTH_SECRET || ''}`).update(data).digest('base64url');

/**
 * @param {{ getAdmin(username): Promise<object|null>, countAdmins(): Promise<number>, saveAdmin(user): Promise<void> }} users
 */
export function createAuth(users) {
  async function ensureDefaultAdmin() {
    if ((await users.countAdmins()) > 0) return;
    await users.saveAdmin({
      username: DEFAULT_ADMIN.username,
      passwordHash: hashPassword(DEFAULT_ADMIN.password),
      tokenSecret: newSecret(),
      passwordChangedAt: Date.now(),
    });
    console.log(`🔐 Created default admin user "${DEFAULT_ADMIN.username}" — change the password from Admin → Account.`);
  }

  /**
   * Password recovery: if ADMIN_RESET_PASSWORD is set on the server, the admin's
   * password is set to it on start-up (and every other session is signed out).
   * Remove the variable again after logging in.
   */
  async function applyPasswordReset() {
    const newPassword = process.env.ADMIN_RESET_PASSWORD;
    if (!newPassword) return;
    const username = DEFAULT_ADMIN.username;
    const existing = await users.getAdmin(username);
    await users.saveAdmin({
      ...(existing || { username }),
      passwordHash: hashPassword(newPassword),
      tokenSecret: newSecret(),
      passwordChangedAt: Date.now(),
    });
    console.warn(`🔑 Admin "${username}" password was reset from ADMIN_RESET_PASSWORD. Remove that variable now.`);
  }

  async function prepareAdmins() {
    await ensureDefaultAdmin();
    await applyPasswordReset();
  }

  function createToken(user) {
    const now = Date.now();
    const payload = Buffer.from(JSON.stringify({ sub: user.username, iat: now, exp: now + TOKEN_TTL_MS })).toString('base64url');
    return `${payload}.${sign(payload, user.tokenSecret)}`;
  }

  async function verifyToken(token) {
    if (!token || typeof token !== 'string' || !token.includes('.')) return null;
    const [payload, signature] = token.split('.');
    let data;
    try {
      data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    } catch {
      return null;
    }
    if (!data?.sub || !data.exp || Date.now() > data.exp) return null;
    const user = await users.getAdmin(String(data.sub).toLowerCase());
    if (!user || !safeEqual(signature || '', sign(payload, user.tokenSecret))) return null;
    return { ...data, user };
  }

  // ---------- brute-force protection (per IP, in-memory) ----------
  const attempts = new Map();
  const attemptState = (ip) => {
    const now = Date.now();
    const entry = attempts.get(ip);
    if (!entry || now - entry.first > LOCK_WINDOW_MS) {
      const fresh = { count: 0, first: now };
      attempts.set(ip, fresh);
      return fresh;
    }
    return entry;
  };

  async function loginHandler(req, res) {
    try {
      const ip = req.ip || req.socket?.remoteAddress || 'unknown';
      const state = attemptState(ip);
      if (state.count >= MAX_ATTEMPTS) {
        const waitMin = Math.ceil((LOCK_WINDOW_MS - (Date.now() - state.first)) / 60000);
        return res.status(429).json({ error: `Too many failed attempts. Try again in ${waitMin} minute(s).` });
      }

      await ensureDefaultAdmin();
      const { username, password } = req.body || {};
      const user = await users.getAdmin(String(username || '').trim().toLowerCase());
      const ok = verifyPassword(password, user ? user.passwordHash : DUMMY_HASH) && Boolean(user);

      if (!ok) {
        state.count += 1;
        const left = Math.max(0, MAX_ATTEMPTS - state.count);
        return res.status(401).json({ error: `Invalid username or password.${left <= 3 ? ` ${left} attempt(s) left.` : ''}` });
      }

      attempts.delete(ip);
      res.json({ token: createToken(user), username: user.username, expiresIn: TOKEN_TTL_MS });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Login failed — please try again.' });
    }
  }

  async function requireAdmin(req, res, next) {
    try {
      const header = req.headers.authorization || '';
      const session = await verifyToken(header.startsWith('Bearer ') ? header.slice(7) : null);
      if (!session) return res.status(401).json({ error: 'Admin login required' });
      req.admin = session;
      next();
    } catch (err) {
      console.error('Auth check error:', err);
      res.status(500).json({ error: 'Could not verify your session' });
    }
  }

  async function changePasswordHandler(req, res) {
    try {
      const { currentPassword, newPassword } = req.body || {};
      const user = req.admin.user;
      if (!verifyPassword(currentPassword, user.passwordHash)) {
        return res.status(400).json({ error: 'Current password is incorrect.' });
      }
      if (typeof newPassword !== 'string' || newPassword.length < MIN_PASSWORD_LENGTH) {
        return res.status(400).json({ error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
      }
      if (newPassword === currentPassword) {
        return res.status(400).json({ error: 'New password must be different from the current one.' });
      }
      const updated = {
        ...user,
        passwordHash: hashPassword(newPassword),
        tokenSecret: newSecret(), // signs out every other session
        passwordChangedAt: Date.now(),
      };
      await users.saveAdmin(updated);
      res.json({ success: true, token: createToken(updated), username: updated.username, expiresIn: TOKEN_TTL_MS });
    } catch (err) {
      console.error('Change password error:', err);
      res.status(500).json({ error: 'Could not change the password.' });
    }
  }

  return { ensureDefaultAdmin, prepareAdmins, loginHandler, requireAdmin, changePasswordHandler };
}
