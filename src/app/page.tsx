import Link from 'next/link'
import Carousel from '@/components/Carousel'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
const Rotator = dynamic(() => import('@/components/Rotator3D'), { ssr: false })

export default function HomePage() {
  return (
    <main className="min-h-screen pt-14">
      {/* Portada principal */}
      <section className="relative h-[70svh] w-full overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted playsInline loop poster="/hero-fallback.jpg">
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-carbon-900/70" />
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <div>
            <h1 className="font-display text-4xl md:text-6xl text-white text-glow">El futuro ya está disponible</h1>
            <div className="mt-6">
              <Link href="/drop" className="focus-ring inline-block rounded-full bg-neon-violet px-8 py-3 font-semibold text-black shadow-glow hover:bg-neon-violet/90">
                Comprar ya
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carrusel de recientes */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl text-white">Recientes</h2>
            <Link href="/drop" className="text-sm text-neon-violet hover:underline">Ver último drop</Link>
          </div>
          <Carousel>
            {Array.from({length:10}).map((_,i)=> (
              <Link key={i} href={`/producto/${i+1}`} className="group w-64 shrink-0 snap-start">
                <div className="relative aspect-[1/1] overflow-hidden rounded-xl border border-white/5 bg-carbon-800/40">
                  <Suspense fallback={<div className="h-full w-full bg-carbon-700" />}> 
                    <Rotator colorIndex={i % 3} />
                  </Suspense>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-white">Modelo {i+1}</h3>
                  <span className="text-neon-violet">$ {249 + i}</span>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Portada secundaria */}
      <section className="relative mx-4 mb-16 overflow-hidden rounded-2xl border border-white/5">
        <img src="/hero-fallback.jpg" alt="Explorar catálogo" className="h-64 w-full object-cover opacity-70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Link href="/catalogo" className="focus-ring rounded-full bg-neon-violet px-8 py-3 font-semibold text-black shadow-glow hover:bg-neon-violet/90">
            Explorar
          </Link>
        </div>
      </section>
    </main>
  )
}
