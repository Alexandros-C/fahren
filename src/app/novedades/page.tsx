import Link from 'next/link'
import Carousel from '@/components/Carousel'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Rotator = dynamic(() => import('@/components/Rotator3D'), { ssr: false })

export default function NovedadesPage() {
  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Carrusel Último drop */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-3xl text-white">Último drop</h2>
            <Link href="/productos" className="text-sm text-neon-violet hover:underline">Ver todo</Link>
          </div>
          <Carousel>
            {Array.from({length:6}).map((_,i)=> (
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

          {/* CTA único para explorar productos */}
          <div className="mt-12 text-center">
            <Link href="/productos" className="focus-ring inline-block rounded-full bg-neon-violet px-8 py-3 font-semibold text-black shadow-glow hover:bg-neon-violet/90">
              Explorar productos
            </Link>
          </div>

          {/* Mini carrusel de categorías */}
          <div className="mt-8">
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
        </div>
      </section>
    </main>
  )
}
