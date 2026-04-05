import { cache } from "react";
import "server-only";
import { getProject, getTasks } from "./api";

// deduplicate calls
export const getCachedProject = cache(async (id: string) => getProject(id));
export const getCachedTasks = cache(async (projectId: string) =>
  getTasks(projectId),
);

// preload for waterfall removal
export const preloadProjectPage = (id: string) => {
  void getCachedProject(id);
  void getCachedTasks(id);
};
