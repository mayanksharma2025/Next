import { graphqlFetch } from "@/lib/graphql-client";
import { CREATE_TASK, UPDATE_TASK } from "@/lib/mutations";
import { TASKS_QUERY } from "@/lib/queries";
import { redirect } from "next/navigation";
import { TaskForm } from "@/app/components/ui/TaskForm";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function TaskFormPage({ searchParams }: Props) {
  const params = await searchParams;
  const isEdit = Boolean(params.id);

  let defaultValues = undefined;

  // ✅ Fetch existing task (for edit)
  if (isEdit) {
    const data = await graphqlFetch<any>(TASKS_QUERY, {
      limit: 100,
      offset: 0,
    });

    const task = data.tasks.tasks.find((t: any) => t.id === params.id);

    if (task) {
      defaultValues = {
        title: task.title,
        description: task.description,
      };
    }
  }

  // ✅ SERVER ACTION (create/update)
  async function handleSubmit(formData: FormData) {
    "use server";

    const input = {
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
      priority: formData.get("priority"),
    };

    if (isEdit) {
      await graphqlFetch(UPDATE_TASK, {
        id: params.id,
        input,
      });
    } else {
      await graphqlFetch(CREATE_TASK, { input });
    }

    redirect("/tasks");
  }

  return (
    <div className="p-6 max-w-xl space-y-4">
      <h1 className="text-xl font-semibold text-white hover:shadow-lg hover:border-slate-300 transition-all duration-200">
        {isEdit ? "Edit Task" : "Create Task"}
      </h1>

      <TaskForm onSubmit={handleSubmit} defaultValues={defaultValues} />
    </div>
  );
}
