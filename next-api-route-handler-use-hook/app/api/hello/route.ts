// app/api/hello/route.js
import { NextResponse } from 'next/server';

// export const revalidate = 20 // regenerate page every 10 seconds

export async function GET(request: Request) {
    return NextResponse.json({ message: 'Hello from Next.js 16 API!' });
}
