import { graphqlFetch } from "@/lib/graphql-client";
import { revalidatePath } from "next/cache";
import { ProjectSearch } from "./ProjectSearch";

type Task = {
  id: string;
  title: string;
  priority: string;
};

type Project = {
  id: string;
  name: string;
  description?: string;
  tasks: {
    id: string;
    title: string;
    status: string;
    priority: string;
  }[];
  createdBy: {
    name: string;
  };
};

const PAGE_QUERY = `
query PageData($limit: Int!, $offset: Int!, $search: String) {
  tasks(limit: $limit, offset: $offset) {
    tasks {
      id
      title
      priority
    }
  }

  projects(search: $search) {
    id
    name
    description
    tasks {
      id
      title
      status
      priority
    }
    createdBy {
      name
    }
  }
}
`;

const DELETE_PROJECT = `
mutation DeleteProject($deleteProjectId: ID!) {
  deleteProject(id: $deleteProjectId)
}
`;

const UPDATE_PROJECT = `
mutation UpdateProject(
  $name: String
  $description: String
  $updateProjectId: ID!
) {
  updateProject(
    name: $name
    description: $description
    id: $updateProjectId
  ) {
    id
    name
    description
    members {
      id
      name
      email
    }
  }
}
`;

const CREATE_PROJECT = `
mutation CreateProject($name: String!, $description: String) {
  createProject(name: $name, description: $description) {
    id
  }
}
`;

const ADD_TASK = `
mutation AddTaskToProject($projectId: ID!, $taskId: ID!) {
  addTaskToProject(projectId: $projectId, taskId: $taskId) {
    id
  }
}
`;

async function deleteProjectAction(formData: FormData) {
  "use server";

  const deleteProjectId = formData.get("projectId") as string;

  if (!deleteProjectId) return;

  await graphqlFetch(DELETE_PROJECT, { deleteProjectId });

  revalidatePath("/projects");
}

async function updateProjectAction(formData: FormData) {
  "use server";

  const updateProjectId = formData.get("projectId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!updateProjectId) return;

  await graphqlFetch(UPDATE_PROJECT, {
    updateProjectId,
    name: name || undefined,
    description: description || undefined,
  });

  revalidatePath("/projects");
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const params = await searchParams;

  const data = await graphqlFetch<{
    tasks: { tasks: Task[] };
    projects: Project[];
  }>(PAGE_QUERY, {
    limit: 50,
    offset: 0,
    search: params.search || "",
  });

  // ✅ CREATE PROJECT
  async function createProjectAction(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name) return;

    await graphqlFetch(CREATE_PROJECT, { name, description });

    revalidatePath("/projects");
  }

  // ✅ ADD TASK
  async function addTaskToProjectAction(formData: FormData) {
    "use server";

    const projectId = formData.get("projectId") as string;
    const taskId = formData.get("taskId") as string;

    if (!taskId) return;

    await graphqlFetch(ADD_TASK, { projectId, taskId });

    revalidatePath("/projects");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 text-white">
      {/* 🔍 SEARCH */}
      {/* <form method="GET" className="flex gap-2">
        <input
          name="search"
          defaultValue={params.search}
          placeholder="Search projects..."
          className="border p-2 rounded w-full"
        />
        <button className="bg-black text-white px-4 rounded">Search</button>
      </form> */}

      <ProjectSearch />

      {/* ➕ CREATE PROJECT */}
      <form action={createProjectAction} className="flex gap-2">
        <input
          name="name"
          placeholder="Project name"
          className="border p-2 rounded w-1/3"
        />
        <input
          name="description"
          placeholder="Description"
          className="border p-2 rounded w-1/3"
        />
        <button className="bg-green-600 text-white px-4 rounded">
          Add Project
        </button>
      </form>

      {/* 📦 PROJECT LIST */}
      {data.projects.map((project) => (
        <div key={project.id} className="border p-4 rounded space-y-3">
          <div>
            <h2 className="font-bold text-lg">{project.name}</h2>
            <p className="text-sm text-gray-500">{project.description}</p>
            <p className="text-xs text-gray-400">by {project.createdBy.name}</p>
          </div>

          <form action={deleteProjectAction}>
            <input type="hidden" name="projectId" value={project.id} />
            <button className="text-red-600 text-sm">Delete</button>
          </form>

          <form action={updateProjectAction} className="flex gap-2">
            <input type="hidden" name="projectId" value={project.id} />

            <input
              name="name"
              defaultValue={project.name}
              className="border p-1 rounded"
            />

            <input
              name="description"
              defaultValue={project.description}
              className="border p-1 rounded"
            />

            <button className="text-blue-600 text-sm">Update</button>
          </form>

          {/* TASKS */}
          <div className="space-y-1">
            {project.tasks.map((task) => (
              <div key={task.id} className="border p-2 rounded text-sm">
                {task.title} ({task.status})
              </div>
            ))}
          </div>

          {/* ➕ ADD TASK */}
          <form action={addTaskToProjectAction} className="flex gap-2">
            <input type="hidden" name="projectId" value={project.id} />

            <select name="taskId" required className="border p-2 rounded ">
              <option value="" className="bg-gray-600">
                Select task
              </option>

              {data.tasks.tasks.map((task) => (
                <option key={task.id} value={task.id} className="bg-gray-600">
                  {task.title} ({task.priority})
                </option>
              ))}
            </select>

            <button className="bg-gray-600 px-3 rounded">Add Task</button>
          </form>
        </div>
      ))}
    </div>
  );
}
