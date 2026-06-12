const CACHE_PREFIX = 'ifa_cache_';
const CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

// ─── FIRESTORE CACHE ───────────────────────────────────────────────────────────
export const firestoreCache = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(CACHE_PREFIX + key);
      if (!raw) return null;
      const entry: CacheEntry<T> = JSON.parse(raw);
      if (Date.now() > entry.expiry) {
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }
      return entry.data;
    } catch {
      return null;
    }
  },

  set<T>(key: string, data: T, ttlMs = CACHE_TTL_MS): void {
    try {
      const entry: CacheEntry<T> = { data, expiry: Date.now() + ttlMs };
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
    } catch {
      /* quota exceeded */
    }
  },

  invalidate(key: string): void {
    try {
      localStorage.removeItem(CACHE_PREFIX + key);
    } catch { /* noop */ }
  },
};

// ─── DEBOUNCED WRITER ──────────────────────────────────────────────────────────
type FlushFn = () => Promise<void>;

interface PendingWrite {
  flush: FlushFn;
  timer: ReturnType<typeof setTimeout> | null;
}

const pendingWrites = new Map<string, PendingWrite>();
const FLUSH_DELAY_MS = 30_000;

const flushPending = async (key: string): Promise<void> => {
  const pending = pendingWrites.get(key);
  if (!pending) return;
  if (pending.timer) clearTimeout(pending.timer);
  pendingWrites.delete(key);
  try {
    await pending.flush();
  } catch (err) {
    console.warn(`DebouncedFlush error [${key}]:`, err);
  }
};

export const scheduleWrite = (key: string, flush: FlushFn): void => {
  const existing = pendingWrites.get(key);
  if (existing) {
    existing.flush = flush;
    if (existing.timer) clearTimeout(existing.timer);
    existing.timer = setTimeout(() => flushPending(key), FLUSH_DELAY_MS);
    return;
  }
  const timer = setTimeout(() => flushPending(key), FLUSH_DELAY_MS);
  pendingWrites.set(key, { flush, timer });
};

export const flushAllWrites = (): Promise<void[]> => {
  const keys = Array.from(pendingWrites.keys());
  return Promise.all(keys.map(flushPending));
};

// ─── WRITE THROTTLE ────────────────────────────────────────────────────────────
let lastWriteTime = 0;
const MIN_WRITE_INTERVAL = 800;

export const acquireWriteSlot = async (): Promise<void> => {
  const now = Date.now();
  const elapsed = now - lastWriteTime;
  if (elapsed < MIN_WRITE_INTERVAL) {
    await new Promise(r => setTimeout(r, MIN_WRITE_INTERVAL - elapsed));
  }
  lastWriteTime = Date.now();
};

// ─── AUTO-FLUSH ON PAGE CLOSE ─────────────────────────────────────────────────
if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushAllWrites();
    }
  });
}
