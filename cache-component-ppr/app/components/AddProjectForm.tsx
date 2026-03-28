// app/components/AddProjectForm.tsx
import { addProject } from "../actions";

export function AddProjectForm({ userId }: { userId: string }) {
  return (
    <form action={addProject}>
      <input type="hidden" name="userId" value={userId} />

      <input
        name="title"
        placeholder="New project"
        required
        style={{ padding: 8, marginRight: 10 }}
      />

      <button type="submit">Add Project</button>
    </form>
  );
}
