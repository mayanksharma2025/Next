// app/page.tsx
import { getOrg, getProjects } from "@/lib/db";
import { upgradePlan, addProjectServer } from "./actions";
import AddProjectButton from "./AddProjectButton";

export default async function Page() {
  const org = await getOrg();
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gray-200 text-slate-800 p-6 space-y-8">
      {/* Header */}
      <div className="bg-white shadow rounded-xl p-6">
        <h1 className="text-3xl font-bold">{org.name}</h1>

        <div className="flex items-center justify-between mt-4">
          <p className="text-lg">
            Plan:{" "}
            <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">
              {org.plan}
            </span>
          </p>

          {/* Server Action Form */}
          {/* ✅ server form (SEO safe) */}

          <form action={upgradePlan}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
              Upgrade Plan
            </button>
          </form>
        </div>
      </div>

      {/* Projects */}
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>

          {/* Client button */}
          {/* ✅ minimal client only for UX */}

          <AddProjectButton action={addProjectServer} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Project Title</th>
              </tr>
            </thead>

            <tbody>
              {/* ✅ fully server rendered list */}

              {projects.map((p: any) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{p.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <p className="text-gray-500 mt-4">No projects found</p>
        )}
      </div>
    </div>
  );
}
