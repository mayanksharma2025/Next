import { LogoutButton } from '../../../components/auth/LogoutButton'
import MyProfile from '../../../components/profile/MyProfile'
import { EditProfileModal } from '../../../components/profile/EditProfileModal'
import { EducationModal } from '../../../components/profile/EducationModal'
import { ExperienceModal } from '../../../components/profile/ExperienceModal'
import { SkillsEditor } from '../../../components/profile/SkillsEditor'
import { AddressModal } from '../../../components/profile/AddressModal'
import { revalidatePath } from 'next/cache'

export default function DashboardPage() {
  async function formsubmit() {
    'use server'
    revalidatePath('/dashboard')
  }
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <LogoutButton />
      <MyProfile />
      <EditProfileModal formsubmit={formsubmit} />
      <SkillsEditor formsubmit={formsubmit} />
      <AddressModal formsubmit={formsubmit} />
      <EducationModal />
      <ExperienceModal />
    </main>
  )
}
