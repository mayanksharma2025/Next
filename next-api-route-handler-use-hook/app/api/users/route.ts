// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../types';

let users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@test.com' },
    { id: 2, name: 'Bob', email: 'bob@test.com' },
];

export async function GET() {
    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    const data: Omit<User, 'id'> = await req.json();
    const newUser: User = { id: Date.now(), ...data };
    users.push(newUser);
    return NextResponse.json(newUser);
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));
    users = users.filter(u => u.id !== id);
    return NextResponse.json({ success: true });
}
