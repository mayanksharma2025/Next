// app/api/images/[...path]/route.ts
import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
    req: Request,
    context: { params: Promise<{ path: string[] }> } // params is a Promise
) {
    try {
        // unwrap params
        const { path: segments } = await context.params;

        const filePath = path.join(process.cwd(), "public", "images", ...segments);
        const buf = await readFile(filePath);

        const res = new NextResponse(buf);

        if (filePath.endsWith(".avif")) res.headers.set("Content-Type", "image/avif");
        else if (filePath.endsWith(".webp")) res.headers.set("Content-Type", "image/webp");
        else if (filePath.endsWith(".png")) res.headers.set("Content-Type", "image/png");
        else if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg"))
            res.headers.set("Content-Type", "image/jpeg");

        // Cache 7 days
        res.headers.set("Cache-Control", "public, max-age=604800, immutable");

        return res;
    } catch (err) {
        return new Response("NOT FOUND", { status: 404 });
    }
}
