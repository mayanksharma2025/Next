// lib/getBlur.ts
import { getPlaiceholder } from "plaiceholder";
import { shimmer } from "./shimmer"; // assumes you already have lib/shimmer.ts
// If shimmer is in a different path, adjust the import.

const BLUR_CACHE = new Map<string, string | null>();

/**
 * Generate a blurDataURL (base64) for a remote image URL.
 * Caches results in-memory for the dev server lifetime.
 * Returns `string` (base64 data URL) or null on failure.
 */
export async function getBlurData(url: string): Promise<string | null> {
    if (!url) return null;

    // Return cached value if present
    if (BLUR_CACHE.has(url)) return BLUR_CACHE.get(url) ?? null;

    try {
        // fetch remote image as arrayBuffer
        const res = await fetch(url);
        if (!res.ok) throw new Error(`fetch failed ${res.status}`);

        const arrayBuffer = await res.arrayBuffer();
        // plaiceholder accepts Buffer (Node) or Uint8Array
        const buffer = Buffer.from(arrayBuffer);

        const { base64 } = await getPlaiceholder(buffer);
        // base64 is something like "data:image/jpeg;base64,/...." OR just "data:..."; plaiceholder returns base64 string prefixed
        const value = typeof base64 === "string" ? base64 : String(base64);

        BLUR_CACHE.set(url, value);
        return value;
    } catch (err) {
        // fallback: generate tiny SVG shimmer as base64 so placeholder is always present
        try {
            const svg = shimmer(10, 10); // tiny generic shimmer
            const b64 = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
            BLUR_CACHE.set(url, b64);
            return b64;
        } catch (e) {
            // final fallback: store null so we don't retry aggressively
            console.error("getBlurData fallback failed for", url, err);
            BLUR_CACHE.set(url, null);
            return null;
        }
    }
}
