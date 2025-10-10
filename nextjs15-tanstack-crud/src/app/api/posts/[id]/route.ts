import { NextResponse } from 'next/server'

const API_URL = 'http://localhost:3001/posts'

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const res = await fetch(`${API_URL}/${params.id}`, { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json(data)
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const body = await req.json()
    const res = await fetch(`${API_URL}/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data)
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    await fetch(`${API_URL}/${params.id}`, { method: 'DELETE' })
    return NextResponse.json({ message: 'Post deleted' })
}
