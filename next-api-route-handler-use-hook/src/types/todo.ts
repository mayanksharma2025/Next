export type TodoStatus = "pending" | "done";

export interface Todo {
    _id: string;
    userId: string;
    title: string;
    completed: boolean;
    createdAt: string;
}
