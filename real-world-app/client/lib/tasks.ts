import { graphqlFetch } from "./graphql-client";
import { TASKS_QUERY } from "./queries";
import type { PaginatedTasks, TaskFilters } from "@/types/task";

type TasksResponse = {
  tasks: PaginatedTasks;
};

export async function getTasks(filters: TaskFilters) {
  const variables = {
    limit: filters.limit,
    offset: filters.offset,
    search: filters.search || undefined,
    status: filters.status || undefined,
    priority: filters.priority || undefined,
    createdBy: filters.createdBy || undefined,
  };
  // console.log("GRAPHQL VARIABLES:", variables);
  const data = await graphqlFetch<TasksResponse>(TASKS_QUERY, variables);
  return data.tasks;
}
