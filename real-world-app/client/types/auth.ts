export type Role = "ADMIN" | "USER" | string;

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
}
