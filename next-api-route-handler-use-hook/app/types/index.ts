import { ObjectId } from 'mongoose';
// types/index.ts
export interface User {
    _id?: string
    readonly id: number;
    name: string;
    email: string;
}


export interface Post {
    id: number;
    title: string;
    body: string;
}
