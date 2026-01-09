import { connectDB } from 'lib/db'
import { AuditLog } from 'models/AuditLog'

export default async function AuditPage() {
  await connectDB()

  // const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(50).lean()
  const logs = await AuditLog.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .populate('userId', 'email profile') // 👈 fields you want
    .lean()

  return (
    <section className="py-6">
      <h1 className="text-xl font-semibold mb-4">Audit Logs</h1>
      {/* {JSON.stringify(logs)} */}
      <table className="w-full text-sm border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th>Action</th>
            <th>User</th>
            <th>IP</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-t">
              <td>{log.action}</td>
              <td>{log.userId.profile.name}</td>
              <td>{log.ip}</td>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
