"use client"
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Rotator = dynamic(() => import('@/components/Rotator3D'), { ssr: false })

export default function CatalogPage() {
  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl text-white">Catálogo</h2>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {Array.from({length:6}).map((_,i)=> (
              <Link key={i} href={`/producto/${i+1}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-carbon-800/40">
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
          </div>
        </div>
      </section>
    </main>
  )
}
