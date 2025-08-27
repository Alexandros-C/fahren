"use client"
import Link from 'next/link'
import Carousel from '@/components/Carousel'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { useBestSellers, useInstagram3, useRecentProducts, useCategoryList } from '@/components/HomeData'

const Rotator = dynamic(() => import('@/components/Rotator3D'), { ssr: false })

export default function HomeFeed() {
  const { products: recent } = useRecentProducts(5)
  const { products: best } = useBestSellers(5)
  const { categories } = useCategoryList(5)
  const { items: ig } = useInstagram3()

  return (
    <>
      {/* Carrusel de recientes */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl text-white">Recientes</h2>
            <Link href="/novedades" className="text-sm text-neon-violet hover:underline">Ver novedades</Link>
          </div>
          <Carousel>
            {recent.map((p: any, i: number)=> (
              <Link key={p.id ?? i} href={`/producto/${p.id ?? i+1}`} className="group w-64 shrink-0 snap-start">
                <div className="relative aspect-[1/1] overflow-hidden rounded-xl border border-white/5 bg-carbon-800/40">
                  <Suspense fallback={<div className="h-full w-full bg-carbon-700" />}> 
                    <Rotator colorIndex={i % 3} />
                  </Suspense>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-white">{p.title ?? `Modelo ${i+1}`}</h3>
                  <span className="text-neon-violet">$ {p.price ?? (249 + i)}</span>
                </div>
              </Link>
            ))}
            <Link href="/novedades" className="group w-64 shrink-0 snap-start">
              <div className="relative aspect-[1/1] overflow-hidden rounded-xl border border-dashed border-white/20 bg-carbon-800/30 flex items-center justify-center">
                <span className="text-white">Ver todo</span>
              </div>
            </Link>
          </Carousel>
        </div>
      </section>

      {/* Carrusel de categorías (mini) */}
      <section className="px-4 py-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-display text-xl text-white">Categorías</h2>
          <Carousel>
            {categories.map((label: string) => (
              <Link key={label} href={`/productos/${label}`} className="group w-28 shrink-0 snap-start">
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
            <Link href="/productos" className="group w-28 shrink-0 snap-start">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-dashed border-white/20 bg-carbon-800/30 flex items-center justify-center">
                <span className="text-white text-sm">Ver todo</span>
              </div>
              <div className="mt-1 text-center text-xs text-metal-300/90">&nbsp;</div>
            </Link>
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
            {best.map((p: any, i: number)=> (
              <Link key={p.id ?? i} href={`/producto/${p.id ?? i+11}`} className="group w-56 shrink-0 snap-start">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-carbon-800/40">
                  <Suspense fallback={<div className="h-full w-full bg-carbon-700" />}> 
                    <Rotator colorIndex={(i+1) % 3} />
                  </Suspense>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-white">{p.title ?? `Best ${i+1}`}</h3>
                  <span className="text-neon-violet">$ {p.price ?? (299 + i)}</span>
                </div>
              </Link>
            ))}
            <Link href="/catalogo" className="group w-56 shrink-0 snap-start">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-dashed border-white/20 bg-carbon-800/30 flex items-center justify-center">
                <span className="text-white">Ver todo</span>
              </div>
            </Link>
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
              {ig.map((item: any, i: number)=> (
                <a key={item.id ?? i} href={item.permalink ?? 'https://www.instagram.com/fahren.brand?igsh=MXduMjFldXFwZGR1dQ=='} target="_blank" rel="noopener noreferrer" className="w-28 shrink-0 snap-start">
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10">
                    <img src={(item.media_url || '/hero-fallback.jpg')} alt={`Post ${i+1}`} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                </a>
              ))}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  )
}

