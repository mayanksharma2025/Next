export type Role = "user" | "admin";

export interface AuthPayload {
    userId: string;
    role: Role;
}
