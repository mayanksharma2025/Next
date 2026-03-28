// app/page.tsx
import { getUsers } from "./lib/api";

export default async function Page() {
  const users = await getUsers();

  return (
    <ul>
      {users.map((u: any) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
