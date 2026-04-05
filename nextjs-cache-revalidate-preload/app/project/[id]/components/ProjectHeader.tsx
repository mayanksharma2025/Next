import { getCachedProject } from "@/lib/db";

export default async function ProjectHeader({ id }: { id: string }) {
  const project = await getCachedProject(id);
  return (
    <div className="p-4 border rounded bg-gray-100">
      <h1 className="text-xl font-bold text-gray-800">{project.name}</h1>
    </div>
  );
}
