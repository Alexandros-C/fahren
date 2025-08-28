"use client"
import { useParams } from 'next/navigation'
import { Header } from '@/components/Header'
import { useState } from 'react'
import { useShop } from '@/store/shop'

const COLORS = [
  { name: 'Carbon', value: '#0f1115' },
  { name: 'Violet', value: '#7c5cff' },
  { name: 'Azure', value: '#1fb6ff' },
  { name: 'Neon', value: '#20f0a8' },
]

export default function ProductPage() {
  const params = useParams()
  const [color, setColor] = useState(COLORS[0].value)
  const { addToCart } = useShop()

  return (
    <main>
      <Header />
      <section className="pt-28 px-4">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="aspect-square rounded-xl border border-white/5 bg-carbon-800/40 p-4">
            <div className="flex h-full items-center justify-center rounded-lg" style={{ background: `radial-gradient(ellipse at center, ${color}33, transparent 60%)`}}>
              <div className="size-56 rounded-full" style={{ background: color }} />
            </div>
          </div>
          <div>
            <h1 className="font-display text-3xl text-white">Producto {params?.id}</h1>
            <p className="mt-2 text-metal-300/80">Editor en tiempo real: color y textura.</p>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm text-metal-300/80">Color</h3>
                <div className="mt-2 flex gap-3">
                  {COLORS.map(c => (
                    <button key={c.name} aria-label={c.name} onClick={()=>setColor(c.value)} className={`size-8 rounded-full ring-2 ${color===c.value ? 'ring-neon-violet' : 'ring-transparent'}`} style={{ background: c.value }} />
                  ))}
                </div>
              </div>
              <button
                onClick={() => addToCart({ id: String(params?.id ?? '0'), title: `Producto ${params?.id}`, price: 199 })}
                className="focus-ring mt-6 w-full rounded-full bg-neon-violet px-6 py-3 font-semibold text-black"
              >
                Añadir al inventario
              </button>
              <p className="text-xs text-metal-300/70">Confirmá tu envío — el resto, nosotros lo hacemos eterno.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
