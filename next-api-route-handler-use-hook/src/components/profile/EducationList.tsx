import type { Education } from '../../types/user'

export function EducationList({ education }: { education?: Education[] }) {
  if (!education?.length) {
    return <p className="text-sm text-gray-500">No education added</p>
  }

  return (
    <ul className="space-y-2">
      {education.map((e) => (
        <li key={e.id} className="rounded border p-3 text-sm">
          <strong>{e.school}</strong> — {e.degree} ({e.year})
        </li>
      ))}
    </ul>
  )
}
