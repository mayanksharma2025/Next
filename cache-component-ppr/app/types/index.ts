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
