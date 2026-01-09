import { getTodos } from 'lib/todos'
import { Todo } from 'types/todo'
import SWRTodo from 'components/todos/SWRTodo'
import Link from 'next/link'

export default async function TodosPage() {
  const todos = (await getTodos()) as Todo[]
  // const todos = use(getTodos()) as Todo[]

  return (
    <section className="p-6 space-y-4">
      <div className="flex gap-3">
        <h1 className="text-xl font-semibold">My Todos</h1>

        <h2 className="text-xl font-semibold text-blue-400">
          <Link href={'/dashboard/todos'} rel="noopener noreferrer">
            Todos
          </Link>
        </h2>
      </div>
      <SWRTodo />
    </section>
  )
}
