import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit") || 12);
    const cursor = Number(searchParams.get("cursor") || 0);

    const search = searchParams.get("search")?.toLowerCase() || "";
    const sort = searchParams.get("sort") || "";
    const category = searchParams.get("category") || "";

    const res = await fetch("https://dummyjson.com/products?limit=100", {
        cache: "no-store",
    });

    const data = await res.json();
    let products = data.products;

    // FILTER BY CATEGORY
    if (category && category !== "all") {
        products = products.filter((p: any) =>
            p.category.toLowerCase().includes(category.toLowerCase())
        );
    }

    // SEARCH
    if (search) {
        products = products.filter((p: any) =>
            p.title.toLowerCase().includes(search)
        );
    }

    // SORT
    if (sort === "price-asc") products.sort((a: any, b: any) => a.price - b.price);
    if (sort === "price-desc")
        products.sort((a: any, b: any) => b.price - a.price);
    if (sort === "rating-asc")
        products.sort((a: any, b: any) => a.rating - b.rating);
    if (sort === "rating-desc")
        products.sort((a: any, b: any) => b.rating - a.rating);

    // PAGINATION SLICE
    const paginated = products.slice(cursor, cursor + limit);

    return NextResponse.json({
        images: paginated.map((p: any) => ({
            id: p.id,
            src: p.thumbnail,
            width: 600,
            height: 600,
            blur: p.thumbnail,
            title: p.title,
            price: p.price,
            category: p.category,
            description: p.description,
            discountPercentage: p.discountPercentage
        })),
        nextCursor: cursor + limit < products.length ? cursor + limit : null,
    });
}
