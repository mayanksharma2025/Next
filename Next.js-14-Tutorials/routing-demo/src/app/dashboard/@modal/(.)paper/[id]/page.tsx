'use client'
import { useRouter } from 'next/navigation'

export default function PaperModal({ params }: any) {
  const router = useRouter()
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => router.back()}
    >
      <div style={{ background: '#fff', padding: 20 }}>
        <h2>Intercepted Paper {params.id}</h2>
      </div>
    </div>
  )
}
