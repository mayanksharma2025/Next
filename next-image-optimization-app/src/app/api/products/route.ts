// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit") ?? 12);
    const cursor = Number(searchParams.get("cursor") ?? 0);

    const search = (searchParams.get("search") ?? "").toLowerCase().trim();
    const sort = searchParams.get("sort") ?? "";
    const category = searchParams.get("category") ?? "";

    const res = await fetch("https://dummyjson.com/products?limit=100", {
        cache: "no-store",
    });
    const data = await res.json();
    let products = Array.isArray(data.products) ? data.products : [];

    if (category && category !== "all") {
        products = products.filter((p: any) =>
            (p.category || "").toLowerCase().includes(category.toLowerCase())
        );
    }

    if (search) {
        products = products.filter((p: any) =>
            (p.title || "").toLowerCase().includes(search)
        );
    }

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

    const paginated = products.slice(cursor, cursor + limit);

    return NextResponse.json({
        images: paginated.map((p: any) => ({
            id: p.id,
            src: p.thumbnail,
            width: 600,
            height: 600,
            // we return thumbnail (server page will produce proper blurDataURL)
            blur: p.thumbnail,
            title: p.title,
            price: p.price,
            category: p.category,
            description: p.description,
            discountPercentage: p.discountPercentage,
        })),
        nextCursor: cursor + limit < products.length ? cursor + limit : null,
    });
}
