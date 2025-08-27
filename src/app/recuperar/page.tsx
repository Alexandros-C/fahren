"use client"
import { useState } from 'react'

export default function RecuperarPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/password/request', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email }) })
    const data = await res.json()
    if (!res.ok) setError('No se pudo enviar el correo')
    else setSent(data.resetUrl || 'Enlace enviado')
  }
  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-sm">
          <h1 className="font-display text-3xl text-white">Recuperar contraseña</h1>
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Correo" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button className="w-full rounded-full bg-neon-violet px-6 py-3 font-semibold text-black">Enviar enlace</button>
          </form>
          {sent && (
            <p className="mt-3 break-all text-sm text-metal-300/90">Enlace de restablecimiento: {sent}</p>
          )}
        </div>
      </section>
    </main>
  )
}

