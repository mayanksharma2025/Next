// ======================
// BASE INTERFACES
// ======================
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

// ======================
// GENERIC API RESPONSE
// ======================
export interface ApiResponse<T> {
    data: T;
    status: number;
    error?: string;
}

// ======================
// UTILITY TYPE EXAMPLES
// ======================

// 1. Partial: make all fields optional
export type PartialUser = Partial<User>;

// 2. Pick: select only certain fields
export type UserPreview = Pick<User, "id" | "name" | "email">;

// 3. Omit: remove some fields
export type UserWithoutId = Omit<User, "id">;

// 4. Readonly: make fields immutable
export type ReadonlyPost = Readonly<Post>;

// 5. Required: make all fields mandatory
export type RequiredTodo = Required<Partial<Todo>>;

// 6. Record: create an object type map
export type UserRecord = Record<number, User>;

// 7. Extract / Exclude (union helpers)
type Status = "active" | "inactive" | "pending";
export type ActiveStatus = Extract<Status, "active" | "pending">;
export type InactiveStatus = Exclude<Status, "active">;

// 8. ReturnType: infer from function
export const makeUser = (name: string, email: string) => ({ name, email });
export type NewUser = ReturnType<typeof makeUser>;

/*
🧰 7️⃣ All Utility Types used here

| Utility Type | Description | Example |
| --------------- | --------------------------------- | ---------------- |
| `Partial<T>` | All fields optional | `PartialUser` |
| `Pick<T, K>` | Select fields | `UserPreview` |
| `Omit<T, K>` | Exclude fields | `UserWithoutId` |
| `Readonly<T>` | Immutable type | `ReadonlyPost` |
| `Required<T>` | All fields required | `RequiredTodo` |
| `Record<K, T>` | Map keys to values | `UserRecord` |
| `Extract<T, U>` | Keep matching union types | `ActiveStatus` |
| `Exclude<T, U>` | Remove specific union types | `InactiveStatus` |
| `ReturnType<F>` | Infer return type from a function | `NewUser` |
 */