import { TaskForm } from "@/app/components/ui/TaskForm";
import { graphqlFetch } from "@/lib/graphql-client";
import { CREATE_TASK } from "@/lib/mutations";
import { redirect } from "next/navigation";

export default function CreateTaskPage() {
  async function create(formData: FormData) {
    "use server";

    await graphqlFetch(CREATE_TASK, {
      input: {
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
        priority: formData.get("priority"),
      },
    });

    redirect("/tasks");
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Create Task</h1>
      <TaskForm onSubmit={create} />
    </div>
  );
}
