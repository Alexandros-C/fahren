"use client"
import { useSession, signOut } from 'next-auth/react'

export default function PerfilPage() {
  const { data } = useSession()
  const user: any = data?.user
  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl text-white">Perfil</h1>
          {!user ? (
            <p className="mt-4 text-metal-200">Necesitás <a className="text-neon-violet hover:underline" href="/login">ingresar</a>.</p>
          ) : (
            <div className="mt-6 rounded-xl border border-white/10 bg-carbon-800/40 p-4 text-metal-200">
              <p><span className="text-white">Email:</span> {user.email}</p>
              <p className="mt-2"><span className="text-white">Energía (puntos):</span> {user.points ?? 0}</p>
              <button onClick={()=>signOut({ callbackUrl: '/' })} className="mt-4 rounded-full bg-carbon-700 px-4 py-2 text-sm">Cerrar sesión</button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

