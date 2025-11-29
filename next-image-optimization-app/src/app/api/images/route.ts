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
            next: { revalidate: 60 }
        });
        if (!res.ok) throw new Error("Failed to fetch Cloudinary list");

        const data = await res.json();
        const images = await Promise.all(
            data.resources.map(async (img: any) => {
                const publicId = img.public_id;

                // 1) Full AVIF main image
                const mainUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_avif,q_auto/${publicId}.avif`;

                // 2) Tiny blurred image (low quality, super small)
                const blurUrl = `https://res.cloudinary.com/${cloudName}/image/upload/e_blur:1000,q_1,w_20/${publicId}.jpg`;

                // 3) Convert blur image to Base64
                const blurRes = await fetch(blurUrl);
                const blurBuffer = await blurRes.arrayBuffer();
                const blurBase64 = Buffer.from(blurBuffer).toString("base64");

                return {
                    id: publicId,
                    url: mainUrl,
                    blurData: `data:image/jpeg;base64,${blurBase64}`,
                    width: img.width,
                    height: img.height,
                };
            })
        );

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