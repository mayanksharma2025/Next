import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "../../../../lib/db";
import { verifyJwt } from "../../../../lib/jwt";
import { User } from "../../../../models/User";
import type { UserProfile } from "../../../../types/user";
import { revalidatePath } from "next/cache";

export async function GET() {
    await connectDB();

    // ✅ cookies() IS ASYNC in your Next.js version
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const payload = verifyJwt(token);

    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
        );
    }
    revalidatePath('/dashboard')
    return NextResponse.json(user);
}

export async function PUT(req: Request) {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const { userId } = verifyJwt(token);

    const updates = (await req.json()) as Partial<UserProfile>;

    await User.findByIdAndUpdate(userId, {
        $set: Object.fromEntries(
            Object.entries(updates).map(([k, v]) => [
                `profile.${k}`,
                v,
            ])
        ),
    });


    revalidatePath('/dashboard')

    return NextResponse.json({ success: true });
}




// export async function PUT(req: Request) {
//     const token = (cookies() as any).get("token")?.value!;
//     const { userId } = verifyJwt(token);

//     const profile = (await req.json()) as UserProfile;

//     await connectDB();
//     await User.findByIdAndUpdate(userId, {
//         profile,
//     });

//     return NextResponse.json({ success: true });
// }