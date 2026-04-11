import { graphqlFetch } from "./graphql-client";
import { TASKS_QUERY } from "./queries";
import type { PaginatedTasks, TaskFilters } from "@/types/task";

type TasksResponse = {
  tasks: PaginatedTasks;
};

export async function getTasks(filters: TaskFilters) {
  const data = await graphqlFetch<TasksResponse>(TASKS_QUERY, filters as any);
  return data.tasks;
}
