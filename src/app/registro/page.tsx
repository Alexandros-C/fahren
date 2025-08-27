"use client"
import { useState } from 'react'

export default function RegistroPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, name }) })
    if (!res.ok) setError('No se pudo registrar')
    else setDone(true)
  }

  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-sm">
          <h1 className="font-display text-3xl text-white">Registro</h1>
          {done ? (
            <p className="mt-4 text-metal-200">Registro exitoso. Ya podés <a className="text-neon-violet hover:underline" href="/login">ingresar</a>.</p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
              <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Contraseña" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button className="w-full rounded-full bg-neon-violet px-6 py-3 font-semibold text-black">Crear cuenta</button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

