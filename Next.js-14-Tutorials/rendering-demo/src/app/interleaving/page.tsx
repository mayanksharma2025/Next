import { ClientComponentOne } from '@/components/client-component-one'
import { NavSearch } from '@/components/nav-search'
import { ServerComponentOne } from '@/components/server-component-one'

export default function InterleavingPage() {
  async function cb(value: String) {
    'use server'
    console.log({ value })
  }

  return (
    <>
      <h1>Interleaving Page</h1>
      <NavSearch />
      <ClientComponentOne message={process.env.SecretData as any} cb={cb}>
        <ServerComponentOne cb={cb} />
      </ClientComponentOne>
    </>
  )
}
