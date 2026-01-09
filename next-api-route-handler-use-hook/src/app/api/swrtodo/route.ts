import { getTodos } from 'lib/todos'
import { NextResponse } from 'next/server'

export async function GET() {
    const todos = await getTodos()

    return NextResponse.json(todos, {
        headers: {
            'Cache-Control': 'no-store',
        },
    })
}
