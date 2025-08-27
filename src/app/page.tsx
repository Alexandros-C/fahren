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
              <Link href="/novedades" className="focus-ring inline-block rounded-full bg-neon-violet px-8 py-3 font-semibold text-black shadow-glow hover:bg-neon-violet/90">
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
            <Link href="/novedades" className="text-sm text-neon-violet hover:underline">Ver novedades</Link>
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

      {/* Carrusel de categorías (mini) */}
      <section className="px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-display text-xl text-white">Categorías</h2>
          <Carousel>
            {[
              ['remeras','/productos/remeras'],
              ['camperas','/productos/camperas'],
              ['jeans','/productos/jeans'],
              ['buzos','/productos/buzos'],
              ['joggers','/productos/joggers'],
              ['gorros','/productos/gorros'],
              ['accesorios','/productos/accesorios'],
            ].map(([label,href]) => (
              <Link key={label} href={href} className="group w-28 shrink-0 snap-start">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
                  <img src="/hero-fallback.jpg" alt={String(label)} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-[1px]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-white capitalize drop-shadow">{String(label)}</span>
                  </div>
                </div>
                <div className="mt-1 text-center text-xs text-metal-300/90 capitalize">{String(label)}</div>
              </Link>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Carrusel de más vendidos */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl text-white">Más vendidos</h2>
            <Link href="/catalogo" className="text-sm text-neon-violet hover:underline">Ver catálogo</Link>
          </div>
          <Carousel>
            {Array.from({length:8}).map((_,i)=> (
              <Link key={i} href={`/producto/${i+11}`} className="group w-56 shrink-0 snap-start">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-carbon-800/40">
                  <Suspense fallback={<div className="h-full w-full bg-carbon-700" />}> 
                    <Rotator colorIndex={(i+1) % 3} />
                  </Suspense>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-white">Best {i+1}</h3>
                  <span className="text-neon-violet">$ {299 + i}</span>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Tienda de Instagram */}
      <section className="px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-display text-2xl text-white">Tienda en Instagram</h2>
          <a href="https://www.instagram.com/fahren.brand?igsh=MXduMjFldXFwZGR1dQ==" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-white/10">
            <img src="/hero-fallback.jpg" alt="Fahren Instagram" className="h-48 w-full object-cover opacity-80" />
          </a>
          <div className="mt-3">
            <Carousel>
              {Array.from({length:10}).map((_,i)=> (
                <a key={i} href="https://www.instagram.com/fahren.brand?igsh=MXduMjFldXFwZGR1dQ==" target="_blank" rel="noopener noreferrer" className="w-28 shrink-0 snap-start">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
                    <img src="/hero-fallback.jpg" alt={`Post ${i+1}`} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </a>
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </main>
  )
}
