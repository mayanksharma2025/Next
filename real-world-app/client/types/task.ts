import type { User } from "./auth";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | string;
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | string;

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  banner?: string | null;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedTasks {
  tasks: Task[];
  totalCount: number;
  hasMore: boolean;
}

export interface TaskFilters {
  search?: string;
  status?: string;
  priority?: string;
  createdBy?: string[];
  limit: number;
  offset: number;
}
