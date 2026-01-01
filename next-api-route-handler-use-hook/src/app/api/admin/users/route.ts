import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { User } from "../../../../models/User";
import { cookies } from "next/headers";
import { verifyJwt } from "../../../../lib/jwt";

export async function GET(req: NextRequest) {
    const token = (cookies() as any).get("token")?.value!;
    const { role } = verifyJwt(token);

    if (role !== "admin") {
        return NextResponse.json(
            { error: "Forbidden" },
            { status: 403 }
        );
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = 10;

    await connectDB();

    const query = q
        ? { email: { $regex: q, $options: "i" } }
        : {};

    const users = await User.find(query)
        .select("email role createdAt")
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    const total = await User.countDocuments(query);

    return NextResponse.json({
        users,
        total,
        page,
    });
}
