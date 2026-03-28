// types/index.ts
export interface User {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
}

export type UserWithProjects = {
  id: string;
  name: string;
  projects: Project[];
};

// types/index.ts
export type Role = "admin" | "member";

export interface User {
  id: string;
  email: string;
  role: Role;
  orgId: string;
}

export interface Org {
  id: string;
  name: string;
  plan: "free" | "pro";
}

export interface Project {
  id: string;
  orgId: string;
  title: string;
}
