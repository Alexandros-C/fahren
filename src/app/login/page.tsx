"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) setError('Credenciales inválidas')
    else window.location.href = '/perfil'
  }

  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-sm">
          <h1 className="font-display text-3xl text-white">Ingresar</h1>
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Contraseña" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button className="w-full rounded-full bg-neon-violet px-6 py-3 font-semibold text-black">Entrar</button>
          </form>
          <p className="mt-3 text-sm text-metal-300/90">¿No tenés cuenta? <Link href="/registro" className="text-neon-violet hover:underline">Registrate</Link></p>
        </div>
      </section>
    </main>
  )
}

