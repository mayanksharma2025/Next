'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export function SkillsEditor({
  skills = [],
  formsubmit,
}: {
  skills?: string[]
  formsubmit: () => void
}) {
  const [value, setValue] = useState('')

  async function addSkill() {
    if (!value.trim()) return

    const res = await fetch('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify({
        skills: [...skills, value.trim()],
      }),
    })

    res.ok ? toast.success('Skill added') : toast.error('Failed')

    setValue('')
    formsubmit()
  }

  async function removeSkill(skill: string) {
    const res = await fetch('/api/users/me', {
      method: 'PUT',
      body: JSON.stringify({
        skills: skills.filter((s) => s !== skill),
      }),
    })

    res.ok ? toast.success('Skill removed') : toast.error('Failed')
  }

  return (
    <section className="rounded bg-white p-6 shadow">
      <h3 className="mb-3 font-semibold">Skills</h3>

      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 text-sm"
          >
            {skill}
            <button onClick={() => removeSkill(skill)} className="text-red-500">
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add skill"
          className="flex-1 border px-3 py-2"
        />
        <button
          onClick={addSkill}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add
        </button>
      </div>
    </section>
  )
}
