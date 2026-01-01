import { cookies } from "next/headers";
import { verifyJwt } from "./jwt";
import { connectDB } from "./db";
import { Todo } from "../models/Todo";
import type { Todo as TodoType } from "../types/todo";

export async function getTodos(): Promise<TodoType[] | null> {
    "use server"
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return null

    const { userId } = verifyJwt(token);
    // const payload = verifyJwt(token)

    await connectDB();

    const todos = await Todo.find({ userId })
        .sort({ createdAt: -1 })
        .lean();

    return todos.map(t => ({
        _id: String(t._id),
        userId: String(t.userId),
        title: t.title,
        completed: t.completed,
        createdAt: t.createdAt.toISOString(),
    }));
}
