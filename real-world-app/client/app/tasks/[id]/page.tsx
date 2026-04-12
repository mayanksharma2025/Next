import { graphqlFetch } from "@/lib/graphql-client";
import { TASKS_QUERY, COMMENTS_QUERY } from "@/lib/queries";
import { ADD_COMMENT, DELETE_TASK } from "@/lib/mutations";
import { redirect } from "next/navigation";
import { CommentForm } from "@/app/components/ui/CommentForm";
import { CommentItem } from "@/app/components/ui/CommentItem";
import { UPDATE_COMMENT, DELETE_COMMENT } from "@/lib/mutations";
import { revalidatePath } from "next/cache";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetail({ params }: Props) {
  const { id } = await params;

  // ✅ get task
  const taskData = await graphqlFetch<any>(TASKS_QUERY, {
    limit: 100,
    offset: 0,
  });

  const task = taskData.tasks.tasks.find((t: any) => t.id === id);

  if (!task) return <div>Not found</div>;

  // ✅ get comments
  const commentsData = await graphqlFetch<any>(COMMENTS_QUERY, {
    taskId: id,
  });

  const comments = commentsData.comments;

  // ✅ add comment
  async function addComment(content: string) {
    "use server";
    await graphqlFetch(ADD_COMMENT, { taskId: id, content });
    revalidatePath(`/tasks/${id}`);
  }

  // ✅ delete task
  async function remove() {
    "use server";
    await graphqlFetch(DELETE_TASK, { id });
    redirect("/tasks");
  }

  async function updateComment(id: string, content: string) {
    "use server";

    await graphqlFetch(UPDATE_COMMENT, { id, content });
    revalidatePath(`/tasks/${id}`);
  }

  async function deleteComment(id: string) {
    "use server";

    await graphqlFetch(DELETE_COMMENT, { id });
    revalidatePath(`/tasks/${id}`);
  }

  return (
    <div className="p-6 space-y-6 text-white hover:shadow-lg hover:border-slate-300 transition-all duration-200">
      {/* Task */}
      <div>
        <h1 className="text-2xl font-semibold">{task.title}</h1>
        <p>{task.description}</p>
      </div>

      {/* Comments */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Comments</h2>

        {/* Add Comment */}
        <CommentForm taskId={id} onAdd={addComment} />

        {/* List */}
        {/* <div className="space-y-2">
          {comments.map((c: any) => (
            <div key={c.id} className="border p-3 rounded">
              <p className="text-sm">{c.content}</p>
              <p className="text-xs text-gray-500">— {c.author.name}</p>
            </div>
          ))}
        </div> */}
        <div className="space-y-2">
          {comments.map((c: any) => (
            <CommentItem
              key={c.id}
              comment={c}
              onUpdate={updateComment}
              onDelete={deleteComment}
            />
          ))}
        </div>
      </div>

      {/* Delete */}
      <form action={remove}>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete Task
        </button>
      </form>
    </div>
  );
}
