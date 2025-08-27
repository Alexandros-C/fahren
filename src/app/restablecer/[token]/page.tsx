"use client"
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ResetPage() {
  const { token } = useParams<{ token: string }>() as any
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password.length < 6 || password !== confirm) {
      setError('Las contraseñas deben coincidir y tener al menos 6 caracteres')
      return
    }
    const res = await fetch('/api/password/reset', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ token, password }) })
    if (!res.ok) setError('No se pudo restablecer')
    else setDone(true)
  }

  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-sm">
          <h1 className="font-display text-3xl text-white">Restablecer contraseña</h1>
          {done ? (
            <div className="mt-6 text-metal-200">
              <p>Contraseña actualizada.</p>
              <button onClick={()=>router.push('/login')} className="mt-3 rounded-full bg-neon-violet px-6 py-3 font-semibold text-black">Ir a iniciar sesión</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Nueva contraseña" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
              <input value={confirm} onChange={e=>setConfirm(e.target.value)} type="password" placeholder="Confirmar contraseña" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button className="w-full rounded-full bg-neon-violet px-6 py-3 font-semibold text-black">Restablecer</button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

