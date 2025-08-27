"use client"
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function VerifyPage() {
  const { token } = useParams<{ token: string }>() as any
  const router = useRouter()
  const [state, setState] = useState<'idle'|'ok'|'error'>('idle')

  const verify = async () => {
    const res = await fetch('/api/verify', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ token }) })
    setState(res.ok ? 'ok' : 'error')
  }

  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-sm text-center">
          <h1 className="font-display text-3xl text-white">Verificar email</h1>
          {state === 'idle' && (
            <div className="mt-6">
              <button onClick={verify} className="rounded-full bg-neon-violet px-6 py-3 font-semibold text-black">Verificar</button>
            </div>
          )}
          {state === 'ok' && (
            <div className="mt-6 text-metal-200">
              <p>Email verificado correctamente.</p>
              <button onClick={()=>router.push('/perfil')} className="mt-3 rounded-full bg-carbon-700 px-6 py-3">Ir al perfil</button>
            </div>
          )}
          {state === 'error' && (
            <p className="mt-6 text-red-400">Token inválido o vencido.</p>
          )}
        </div>
      </section>
    </main>
  )
}

