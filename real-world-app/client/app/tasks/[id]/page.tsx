import { graphqlFetch } from "@/lib/graphql-client";
import { TASKS_QUERY } from "@/lib/queries";
import { DELETE_TASK } from "@/lib/mutations";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetail({ params }: Props) {
  const { id } = await params;

  const data = await graphqlFetch<any>(TASKS_QUERY, {
    limit: 100,
    offset: 0,
  });

  const task = data.tasks.tasks.find((t: any) => t.id === id);

  if (!task) {
    return <div className="p-6">Task not found</div>;
  }

  async function remove() {
    "use server";
    await graphqlFetch(DELETE_TASK, { id });
    redirect("/tasks");
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{task.title}</h1>
      <p>{task.description}</p>

      <div className="text-sm text-gray-600">
        Status: {task.status} | Priority: {task.priority}
      </div>

      <form action={remove}>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </form>
    </div>
  );
}
