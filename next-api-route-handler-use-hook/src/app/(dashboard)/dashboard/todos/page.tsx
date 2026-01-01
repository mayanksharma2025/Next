import { getTodos } from 'lib/todos'
import TodosClient from 'components/todos/TodosClient'

export default async function TodosPage() {
  const todos = await getTodos()

  return (
    <section className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">My Todos</h1>
      <TodosClient initialTodos={todos} />
    </section>
  )
}
