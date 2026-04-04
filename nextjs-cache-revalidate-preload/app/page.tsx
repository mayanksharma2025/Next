// app/page.tsx
import { getUsers, getOrgs, getProjects } from "@/lib/api";
import { addProject, updateOrgPlan } from "./actions";

export default async function Page() {
  const users = await getUsers();
  const orgs = await getOrgs();
  const projects = await getProjects();

  return (
    <div className="p-6 space-y-8 bg-gray-50 text-black min-h-screen">
      <h1 className="text-3xl font-bold">SaaS Dashboard</h1>

      {/* Users */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Organization */}
      <div className="bg-white shadow rounded-xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Organization</h2>

          <form action={updateOrgPlan}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Upgrade Plan
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Plan</th>
              </tr>
            </thead>
            <tbody>
              {orgs.map((o: any) => (
                <tr key={o.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{o.name}</td>
                  <td className="p-3">{o.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Projects */}
      <div className="bg-white shadow rounded-xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>

          <form action={addProject}>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Add Project
            </button>
          </form>
        </div>

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
    </div>
  );
}

{
  /*
    cached fetch (force-cache)
    tag-based invalidation (revalidateTag)
    multi-entity invalidation (users/orgs/projects separate)
    mutation → UI refresh
    cross-route cache consistency (/ vs /projects)
*/
}
