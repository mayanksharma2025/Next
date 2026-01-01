import { NextResponse } from "next/server";
import { getTodos } from "../../../lib/todos";
import { cookies } from "next/headers";
import { verifyJwt } from "../../../lib/jwt";
import { connectDB } from "../../../lib/db";
import { Todo } from "../../../models/Todo";
import { revalidatePath } from "next/cache";

export async function GET() {
    const todos = await getTodos();

    return NextResponse.json(todos, {
        headers: {
            "Cache-Control": "s-maxage=60, stale-while-revalidate",
        },
    });
}

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    const { userId } = verifyJwt(token);
    const { title } = await req.json();

    await connectDB();
    await Todo.create({ title, userId });

    revalidatePath("/dashboard/todos");

    return new Response(null, { status: 201 });
}


export async function PATCH(req: Request) {
    const { id, completed } = await req.json();

    await connectDB();
    await Todo.findByIdAndUpdate(id, { completed });

    revalidatePath("/dashboard/todos");

    return new Response(null, { status: 200 });
}

export async function DELETE(req: Request) {
    const { id } = await req.json();

    await connectDB();
    await Todo.findByIdAndDelete(id);

    revalidatePath("/dashboard/todos");

    return new Response(null, { status: 200 });
}
