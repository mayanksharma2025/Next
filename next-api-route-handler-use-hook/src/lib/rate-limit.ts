type Entry = {
    count: number;
    expires: number;
};

const store = new Map<string, Entry>();

export function rateLimit(
    key: string,
    limit: number,
    windowMs: number
) {
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || entry.expires < now) {
        store.set(key, {
            count: 1,
            expires: now + windowMs,
        });
        return true;
    }

    if (entry.count >= limit) return false;

    entry.count++;
    return true;
}
