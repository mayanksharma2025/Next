// app/page.tsx
import { getUser, getActivities } from "@/lib/db";
import { updateTheme, addActivity, resetEverything } from "./actions";

export default async function Page() {
  const user = await getUser();
  const activities = await getActivities();

  return (
    <div className="min-h-screen bg-gray-600 p-6 text-slate-800 space-y-8">
      {/* USER CARD */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold">User Profile</h1>

        <div className="space-y-1 text-lg">
          <p>
            Name: <span className="font-medium">{user.name}</span>
          </p>
          <p>
            Theme:{" "}
            <span className="px-2 py-1 rounded bg-gray-100 text-sm">
              {user.theme}
            </span>
          </p>
        </div>

        <form action={updateTheme}>
          <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Switch to Dark Theme
          </button>
        </form>
      </div>

      {/* ACTIVITY FEED */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Activity Feed</h2>

          <form action={addActivity}>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Add Activity
            </button>
          </form>
        </div>

        <div className="space-y-3">
          {activities.length > 0 ? (
            activities.map((a: any) => (
              <div
                key={a.id}
                className="p-3 rounded-lg bg-gray-100 text-gray-800"
              >
                {a.text}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No activities yet</p>
          )}
        </div>
      </div>

      {/* RESET */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-3">Danger Zone</h3>

        <form action={resetEverything}>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Reset Everything (revalidatePath)
          </button>
        </form>
      </div>
    </div>
  );
}
