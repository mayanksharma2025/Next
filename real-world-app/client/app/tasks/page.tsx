import { getTasks } from "@/lib/tasks";
import { TaskCard } from "@/app/components/ui/TaskCard";
import { Pagination } from "@/app/components/ui/Pagination";
import { requireUser } from "@/lib/require-user";

type Props = {
  searchParams: Promise<{
    offset?: string;
    search?: string;
    status?: string;
    priority?: string;
  }>;
};

export default async function TasksPage({ searchParams }: Props) {
  const params = await searchParams; // ✅ REQUIRED
  const user = await requireUser(); // ✅ get logged-in user

  const limit = 10;
  const offset = Number(params.offset ?? 0);

  const data = await getTasks({
    limit,
    offset,
    search: params.search || undefined,
    status: params.status || undefined,
    createdBy: [user.id], // ✅ pass here
  });

  return (
    <div className="p-6 space-y-4 bg-gray-200">
      <h1 className="text-2xl font-semibold">Tasks</h1>

      {/* ✅ FIXED FORM */}
      <form method="GET" className="flex gap-2 mb-4">
        <input
          name="search"
          placeholder="Search..."
          defaultValue={params.search}
          className="border p-2"
        />

        <select
          name="status"
          defaultValue={params.status || ""}
          className="border p-2"
        >
          <option value="">All</option>
          <option value="in-progress">in-progress</option>
          <option value="pending">pending</option>
          <option value="completed">completed</option>
        </select>

        <select
          name="priority"
          defaultValue={params.priority || ""}
          className="border p-2"
        >
          <option value="">All</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>

        <button className="border px-4">Apply</button>
      </form>

      <div className="grid gap-4">
        {data.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <Pagination
        hasMore={data.hasMore}
        offset={offset}
        limit={limit}
        search={params.search}
        status={params.status}
        priority={params.priority}
      />
    </div>
  );
}
