// lib/projects.ts

import { graphqlFetch } from "./graphql-client";

export type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  description?: string;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
  createdBy: {
    name: string;
    email: string;
    role: string;
  };
};

const PROJECTS_QUERY = `
  query Projects($limit: Int, $offset: Int, $search: String) {
    projects(limit: $limit, offset: $offset, search: $search) {
      id
      name
      description
      tasks {
        id
        title
        status
        priority
        description
      }
      createdBy {
        name
        email
        role
      }
    }
  }
`;

const CREATE_PROJECT = `
  mutation CreateProject($name: String!, $description: String) {
    createProject(name: $name, description: $description) {
      id
      name
      description
      tasks { id title status priority description }
      members { name }
    }
  }
`;

const ADD_TASK = `
  mutation AddTaskToProject($projectId: ID!, $taskId: ID!) {
    addTaskToProject(projectId: $projectId, taskId: $taskId) {
      id
      tasks { id title status priority description }
    }
  }
`;

export async function getProjects() {
  const data = await graphqlFetch<any>(PROJECTS_QUERY, {});
  return data.projects as Project[];
}

export async function createProject(name: string, description?: string) {
  const data = await graphqlFetch<any>(CREATE_PROJECT, { name, description });
  return data.createProject as Project;
}

export async function addTaskToProject(projectId: string, taskId: string) {
  const data = await graphqlFetch<any>(ADD_TASK, { projectId, taskId });
  return data.addTaskToProject;
}
