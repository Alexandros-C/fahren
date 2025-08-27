"use client"
import { useSession, signOut, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Coins } from 'lucide-react'

export default function PerfilPage() {
  const { data } = useSession()
  const user: any = data?.user

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('fahr_login_email')
      if (savedEmail) {
        setEmail(savedEmail)
        setRemember(true)
      }
    } catch {}
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) setError('Credenciales inválidas')
    else window.location.href = '/perfil'
  }

  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl text-white">Perfil</h1>
          {!user ? (
            <div className="mt-6 max-w-sm">
              <form onSubmit={(e)=>{
                if (remember) {
                  try { localStorage.setItem('fahr_login_email', email) } catch {}
                } else {
                  try { localStorage.removeItem('fahr_login_email') } catch {}
                }
                return onSubmit(e)
              }} className="space-y-3">
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Correo" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
                <div className="relative">
                  <input value={password} onChange={e=>setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Contraseña" className="w-full rounded-lg bg-carbon-800 px-4 py-2 pr-10 text-metal-200 placeholder-metal-400" />
                  <button type="button" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'} className="absolute right-2 top-1/2 -translate-y-1/2 text-metal-300 hover:text-white">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <label className="flex items-center gap-2 text-sm text-metal-300/90">
                  <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-carbon-800" />
                  Mantener sesión iniciada
                </label>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Link href="/registro" className="rounded-full border border-white/15 bg-carbon-800 px-6 py-3 text-center text-metal-200 hover:bg-carbon-700">Registrar</Link>
                  <button type="submit" className="rounded-full bg-neon-violet px-6 py-3 font-semibold text-black">Iniciar sesión</button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <Link href="/recuperar" className="text-sm text-neon-violet hover:underline">Olvidé mi contraseña</Link>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-white/10 bg-carbon-800/40 p-4 text-metal-200">
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <span className="text-white">{user.name || user.email}</span>
                  {user.name && (
                    <p className="text-xs text-metal-300/80 truncate">{user.email}</p>
                  )}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-neon-violet/30 bg-carbon-900 px-3 py-1 text-white shadow-glow">
                  <Coins className="h-4 w-4 text-neon-violet" />
                  <span className="text-sm font-semibold">{user.points ?? 0}</span>
                </div>
              </div>
              <button onClick={()=>signOut({ callbackUrl: '/' })} className="mt-4 rounded-full bg-carbon-700 px-4 py-2 text-sm">Cerrar sesión</button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

