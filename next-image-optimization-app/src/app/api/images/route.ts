import { NextResponse } from "next/server";

export async function GET() {
    const cloudName = "my-media-mayank";
    const folder = "products"; // <- your Cloudinary folder name

    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`;

    try {

        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(
                        process.env.CLOUDINARY_API_KEY +
                        ":" +
                        process.env.CLOUDINARY_API_SECRET
                    ).toString("base64"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                expression: "tags=products",
            }),
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("Failed to fetch Cloudinary list");

        const data = await res.json();
        const images = data.resources.map((img: any) => ({
            id: img.public_id,
            url: `https://res.cloudinary.com/${cloudName}/image/upload/f_avif,q_auto/${img.public_id}.avif`,
            fallback: `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${img.public_id}`,
            width: img.width,
            height: img.height,
            format: img.format,
        }));

        return NextResponse.json(images);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}


{/* 
  ✔ Auto AVIF generation
  ✔ Auto WebP fallback
  ✔ Remote image sizes included
  ✔ ISR via revalidate: 60
*/}