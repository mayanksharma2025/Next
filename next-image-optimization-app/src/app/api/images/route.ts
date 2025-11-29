import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor") ?? "";
    const limit = Number(searchParams.get("limit") ?? "12");

    const cloudName = process.env.CLOUD_NAME!;
    const apiKey = process.env.CLOUD_API_KEY!;
    const apiSecret = process.env.CLOUD_API_SECRET!;
    const folder = "products";

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;

    const body = {
        expression: "tags=products",
        // expression: `folder:${folder} AND resource_type:image`,
        max_results: limit,
        next_cursor: cursor || undefined,
    };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                Authorization:
                    "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        const images = await Promise.all(
            data.resources.map(async (img: any) => {
                const id = img.public_id;

                const src = `https://res.cloudinary.com/${cloudName}/image/upload/f_avif,q_auto/${id}.avif`;

                // blur image
                const blurUrl = `https://res.cloudinary.com/${cloudName}/image/upload/e_blur:1000,q_1,w_20/${id}.jpg`;

                const blurRes = await fetch(blurUrl);
                const blurBase64 = Buffer.from(await blurRes.arrayBuffer()).toString(
                    "base64"
                );

                return {
                    id,
                    src,
                    blur: `data:image/jpeg;base64,${blurBase64}`,
                    width: img.width,
                    height: img.height,
                };
            })
        );

        return NextResponse.json({
            images,
            nextCursor: data.next_cursor ?? null,
        });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
