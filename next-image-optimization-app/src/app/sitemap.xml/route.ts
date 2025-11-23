// app/sitemap.xml/route.ts
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    const baseUrl = process.env.SITE_URL || 'https://example.com'; // set SITE_URL in env
    const pages = [
        '',
        'gallery',
    ];

    // include images (optional) — pull base names from public/images
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    let imageUrls: string[] = [];
    try {
        const files = fs.readdirSync(imagesDir);
        const baseNames = new Set<string>();
        for (const f of files) {
            const m = f.match(/^(.+?)\.(jpg|jpeg|png|webp|avif)$/i);
            if (m) baseNames.add(m[1]);
        }
        imageUrls = Array.from(baseNames).map((b) => `${baseUrl}images/${b}.avif`);
    } catch (e) {
        imageUrls = [];
    }

    const urlEntries = pages
        .map((p) => {
            const url = `${baseUrl}/${p}`.replace(/\/$/, '');
            return `<url><loc>${url}</loc></url>`;
        })
        .join('');

    const imageEntries = imageUrls
        .map((u) => `<url><loc>${u}</loc></url>`)
        .join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlEntries}
    ${imageEntries}
  </urlset>`;

    return new NextResponse(sitemap, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
        },
    });
}
