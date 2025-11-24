import { NextResponse } from "next/server";

export async function GET() {
    const url = `https://dummyjson.com/products?limit=10`;

    try {
        const res = await fetch(url, {
            next: { revalidate: 60 }, // ISR from Cloudinary CDN
        });

        if (!res.ok) throw new Error("Failed to fetch Cloudinary list");

        const data = await res.json();

        const images = data.products.map((img: any, _i: any) => ({
            id: _i,
            url: img.images[0],
            fallback: img.thumbnail,
            width: img.dimensions.width,
            height: img.dimensions.height,
            format: img.category,
        }));

        return NextResponse.json(images);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
