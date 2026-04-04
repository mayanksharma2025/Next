// app/projects/page.tsx
import { getProjects } from "@/lib/db";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <h1>Projects Page</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Title</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p: any) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
