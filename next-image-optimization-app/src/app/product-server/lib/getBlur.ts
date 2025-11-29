import { getPlaiceholder } from "plaiceholder";

export async function getBlurData(url: string) {
    try {
        // fetch remote image as arrayBuffer
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();

        // getPlaiceholder accepts Buffer or ArrayBuffer
        const { base64 } = await getPlaiceholder(Buffer.from(arrayBuffer));
        return base64;
    } catch (err) {
        console.error("Failed to generate blurDataURL for", url, err);
        return null; // fallback
    }
}
