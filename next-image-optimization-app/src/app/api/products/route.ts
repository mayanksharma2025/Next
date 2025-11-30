// app/api/products/route.ts
import { NextResponse } from "next/server";
import { getBlurData } from "../../product-server/lib/getBlur";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit") ?? 12);
    const cursor = Number(searchParams.get("cursor") ?? 0);
    const search = (searchParams.get("search") ?? "").toLowerCase().trim();
    const sort = searchParams.get("sort") ?? "";
    const category = (searchParams.get("category") ?? "all").toLowerCase();

    // fetch source list
    const res = await fetch("https://dummyjson.com/products?limit=100");
    if (!res.ok) {
        return NextResponse.json({ images: [], nextCursor: null, error: `source fetch failed ${res.status}` }, { status: 502 });
    }
    const data = await res.json();
    let products = Array.isArray(data.products) ? data.products : [];

    // FILTER: category
    if (category && category !== "all") {
        products = products.filter((p: any) => (p.category ?? "").toLowerCase().includes(category));
    }

    // SEARCH: title (simple)
    if (search) {
        products = products.filter((p: any) => (p.title ?? "").toLowerCase().includes(search));
    }

    // SORT
    switch (sort) {
        case "price-asc":
            products.sort((a: any, b: any) => a.price - b.price);
            break;
        case "price-desc":
            products.sort((a: any, b: any) => b.price - a.price);
            break;
        case "rating-asc":
            products.sort((a: any, b: any) => a.rating - b.rating);
            break;
        case "rating-desc":
            products.sort((a: any, b: any) => b.rating - a.rating);
            break;
    }

    // PAGINATION (slice after filter & sort)
    const paginated = products.slice(cursor, cursor + limit);

    // Generate blur data for each item (safe, with fallback)
    const images = await Promise.all(
        paginated.map(async (p: any) => {
            const blur = await getBlurData(p.thumbnail).catch((e) => {
                console.error("getBlurData error for", p.thumbnail, e);
                return null;
            });

            return {
                id: p.id,
                src: p.thumbnail,
                width: 600,
                height: 600,
                blur: blur ?? undefined,
                title: p.title,
                price: p.price,
                description: p.description,
                category: p.category,
            };
        })
    );

    return NextResponse.json({
        images,
        nextCursor: cursor + limit < products.length ? cursor + limit : null,
    });
}
