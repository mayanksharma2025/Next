import jwt from 'jsonwebtoken'
import type { AuthPayload } from '../types/auth'

const SECRET = process.env.JWT_SECRET!

export function signJwt(payload: AuthPayload) {
    return jwt.sign(payload, SECRET, { expiresIn: '1d' })
}

export function verifyJwt(token: string): AuthPayload {
    return jwt.verify(token, SECRET) as AuthPayload
}



// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET!;

// export interface JwtPayload {
//     userId: string;
// }

// export function signJwt(payload: JwtPayload) {
//     return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
// }

// export function verifyJwt(token: string) {
//     return jwt.verify(token, JWT_SECRET) as JwtPayload;
// }
