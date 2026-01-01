import { cookies } from 'next/headers'
import { verifyJwt } from './jwt'
import { connectDB } from './db'
import { User } from '../models/User'

export async function getCurrentUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) return null

    const payload = verifyJwt(token)

    await connectDB()
    return User.findById(payload.userId).select('-password')
}
