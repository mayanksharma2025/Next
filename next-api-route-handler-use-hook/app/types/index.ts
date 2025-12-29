// types/index.ts
export interface User {
    readonly id: number;
    name: string;
    email: string;
}


export interface Post {
    id: number;
    title: string;
    body: string;
}
