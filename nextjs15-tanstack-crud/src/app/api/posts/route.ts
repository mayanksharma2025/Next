import { NextResponse } from 'next/server'

const API_URL = 'http://localhost:3001/posts'

// export async function GET() {
//     const res = await fetch(API_URL, { cache: 'no-store' })
//     const data = await res.json()
//     return NextResponse.json(data)
// }


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const _page = Number(searchParams.get('_page') || '1')
    const _limit = Number(searchParams.get('_limit') || '5')
    const _sort = searchParams.get('_sort') || 'createdAt'
    const _order = searchParams.get('_order') || 'desc'

    // Fetch all posts to calculate total
    const allRes = await fetch(API_URL)
    const allData = await allRes.json()
    const total = allData.length

    // Sort manually if needed
    const sortedData = allData.sort((a: any, b: any) => {
        if (_order === 'asc') return a[_sort] > b[_sort] ? 1 : -1
        return a[_sort] < b[_sort] ? 1 : -1
    })

    // Paginate manually
    const start = (_page - 1) * _limit
    const paginatedData = sortedData.slice(start, start + _limit)

    return NextResponse.json({ data: paginatedData, total })
}


export async function POST(req: Request) {
    const body = await req.json()
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data)
}
