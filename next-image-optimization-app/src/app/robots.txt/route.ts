// app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const siteUrl = process.env.SITE_URL || 'https://example.com';
    const content = `User-agent: *
Allow: /
Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml
`;
    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
        },
    });
}
