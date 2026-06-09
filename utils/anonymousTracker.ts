const VISITOR_KEY = 'ifa_visitor_id';
const USAGE_KEY = 'ifa_anon_usage';

interface AnonUsage {
    consultationCount: number;
    studyCount: number;
}

const LIMITS: Record<string, number> = {
    consultation: 1,
    study: 3,
};

function generateId(): string {
    return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getVisitorId(): string {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
        id = generateId();
        localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
}

function getUsage(): AnonUsage {
    try {
        const raw = localStorage.getItem(USAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { }
    return { consultationCount: 0, studyCount: 0 };
}

function setUsage(usage: AnonUsage) {
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
}

export function canUseFeature(type: 'consultation' | 'study'): boolean {
    const usage = getUsage();
    const limit = LIMITS[type];
    const current = type === 'consultation' ? usage.consultationCount : usage.studyCount;
    return current < limit;
}

export function incrementAnonUsage(type: 'consultation' | 'study') {
    const usage = getUsage();
    if (type === 'consultation') usage.consultationCount++;
    else usage.studyCount++;
    setUsage(usage);
}

export function getAnonUsage(): AnonUsage {
    return getUsage();
}

export function getAnonRemaining(type: 'consultation' | 'study'): number {
    const usage = getUsage();
    const limit = LIMITS[type];
    const current = type === 'consultation' ? usage.consultationCount : usage.studyCount;
    return Math.max(0, limit - current);
}
