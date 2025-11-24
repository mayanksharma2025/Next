import { NextResponse } from 'next/server';

export const revalidate = 60; // ISR every 60 sec

export async function GET() {
    const CLOUDINARY_FOLDER = 'products'; // put your folder
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
    const API_KEY = process.env.CLOUDINARY_API_KEY;
    const API_SECRET = process.env.CLOUDINARY_API_SECRET;

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload?prefix=${CLOUDINARY_FOLDER}`,
        {
            headers: {
                Authorization:
                    "Basic " + Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64"),
            },
        }
    );

    const data = await res.json();

    const mapped = data.resources.map((img: any) => ({
        id: img.asset_id,
        public_id: img.public_id,
        url: img.secure_url,
        width: img.width,
        height: img.height,
        format: img.format,
    }));

    return NextResponse.json(mapped, {
        headers: {
            "Cache-Control": "s-maxage=60, stale-while-revalidate",
        },
    });
}
