import { Header } from '@/components/Header'
import Link from 'next/link'

export default function DropPage() {
  return (
    <main>
      <Header />
      <section className="pt-28 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-white">Drop actual</h2>
          <p className="mt-2 text-metal-300/80">Selección curada con estética Cyber-Renaissance.</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length:6}).map((_,i)=> (
              <Link key={i} href={`/producto/${i+1}`} className="group relative overflow-hidden rounded-xl border border-white/5 bg-carbon-800/40 p-4 transition hover:border-neon-violet/30">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-carbon-700 to-carbon-900" />
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-white">Producto {i+1}</h3>
                    <p className="text-sm text-metal-300/80">Serie limitada</p>
                  </div>
                  <span className="text-neon-violet">$ {199 + i}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
