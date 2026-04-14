import { getTodos } from "lib/todos";
import TodosClient from "components/todos/TodosClient";
import { Todo } from "types/todo";
import Link from "next/link";
import { use } from "react";

export default async function TodosPage() {
  const todos = (await getTodos()) as Todo[];
  // const todos = use(getTodos()) as Todo[];

  return (
    <section className="p-6 space-y-4 text-white">
      <div className="flex gap-3">
        <h1 className="text-xl font-semibold">My Todos</h1>

        <h2 className="text-xl font-semibold text-blue-400">
          <Link href={"/dashboard/todoswr"} rel="noopener noreferrer">
            Todos SWR
          </Link>
        </h2>
      </div>
      <TodosClient initialTodos={todos} />
    </section>
  );
}
