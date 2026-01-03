'use server'

import { cookies } from 'next/headers'
import { verifyJwt } from '../jwt'
import { connectDB } from '../db'
import { Todo } from '../../models/Todo'
import type { Todo as TodoType } from '../../types/todo'

export async function createTodo(title: string): Promise<TodoType> {
    const token = (await cookies()).get('token')?.value
    if (!token) throw new Error('Unauthorized')

    const { userId } = verifyJwt(token)

    await connectDB()
    const todo = await Todo.create({ title, userId })

    return {
        _id: String(todo._id),
        title: todo.title,
        userId: String(todo.userId),
        completed: todo.completed,
        createdAt: todo.createdAt.toISOString()
    }
}

export async function toggleTodo(id: string, completed: boolean) {
    await connectDB()
    await Todo.findByIdAndUpdate(id, { completed })
}

export async function deleteTodo(id: string) {
    await connectDB()
    await Todo.findByIdAndDelete(id)
}
