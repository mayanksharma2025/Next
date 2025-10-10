import { apiFetch } from "./apiClient";
import { ApiResponse, Comment } from "../types/api";

export interface User {
    id: number;
    name: string;
    email: string;
}

// ✅ Get all users
export const getUsers = async (): Promise<ApiResponse<User[]>> => {
    return apiFetch<User[]>("https://jsonplaceholder.typicode.com/users");
};

// ✅ Get single user
export const getUserById = async (id: number): Promise<ApiResponse<User>> => {
    return apiFetch<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
};

// Get comments by PostId
export const getCommentByPostId = async (postId: number): Promise<ApiResponse<Comment[]>> => {
    return apiFetch<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
}