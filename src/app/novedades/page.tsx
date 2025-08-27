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

          {/* Botones diagonales de categorías */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              ['buzos','/productos/buzos'],
              ['remeras','/productos/remeras'],
              ['jeans','/productos/jeans'],
              ['camperas','/productos/camperas'],
              ['gorros','/productos/gorros'],
              ['joggers','/productos/joggers'],
              ['accesorios','/productos/accesorios'],
            ].map(([label,href]) => (
              <div key={label}>
                <Link href={href} className="block">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    <div className="relative h-32 w-full origin-center -skew-x-6">
                      <img src="/hero-fallback.jpg" alt={String(label)} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-[2px]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                    </div>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-xl text-white capitalize drop-shadow">{String(label)}</span>
                    </div>
                  </div>
                </Link>
                {/* Previews de productos por categoría (fila horizontal) */}
                <div className="mt-3 flex gap-3 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {Array.from({length:8}).map((_,i)=> (
                    <Link key={i} href={`/producto/${i+1}`} className="group w-24 shrink-0 snap-start">
                      <div className="aspect-square rounded-md border border-white/5 bg-carbon-800/40" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
