// app/page.tsx
import { getUsers, getOrgs, getProjects } from "@/lib/db";
import { addProject, updateOrgPlan } from "./actions";

export default async function Page() {
  const users = await getUsers();
  const orgs = await getOrgs();
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gray-500 text-slate-800 p-6 space-y-8">
      <h1 className="text-3xl font-bold">SaaS Dashboard</h1>

      {/* USERS */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4">Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
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
                  <td className="p-3">
                    <span className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-700">
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORGS */}
      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Organization</h2>

          <form action={updateOrgPlan}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Upgrade Plan
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
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
                  <td className="p-3">
                    <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
                      {o.plan}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>

          <form action={addProject}>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Add Project
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
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
