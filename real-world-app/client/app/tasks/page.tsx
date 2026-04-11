import { getTasks } from "@/lib/tasks";
import { TaskCard } from "../components/ui/TaskCard";
import { Pagination } from "../components/ui/Pagination";

type Props = {
  searchParams: {
    offset?: string;
  };
};

export default async function TasksPage({ searchParams }: Props) {
  const limit = 5;
  const offset = Number(searchParams.offset ?? 0);

  const data = await getTasks({
    limit,
    offset,
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Tasks</h1>

      <div className="grid gap-4">
        {data.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <Pagination hasMore={data.hasMore} offset={offset} limit={limit} />
    </div>
  );
}
