"use client"
import Link from 'next/link'
import { ShoppingCart, Search } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [q, setQ] = useState('')
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-center py-4">
          <Link href="/" className="pointer-events-auto select-none">
            <span className="font-display text-2xl md:text-3xl text-white animate-glitch">Fahren</span>
          </Link>
        </div>
        <div className="pointer-events-auto">
          <nav className="fixed left-4 top-20 hidden md:block">
            <div className="space-y-3 text-sm text-metal-300/80">
              <Link href="/drop" className="block hover:text-white">Drop</Link>
              <Link href="/catalogo" className="block hover:text-white">Catálogo</Link>
              <Link href="/accesorios" className="block hover:text-white">Accesorios</Link>
              <Link href="/archivo" className="block hover:text-white">Archivo</Link>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-full bg-carbon-800 px-3 py-2">
              <Search className="h-4 w-4 text-metal-400" />
              <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar" className="w-40 bg-transparent text-sm text-metal-200 placeholder-metal-400 focus:outline-none" />
            </div>
          </nav>
          <div className="fixed right-4 top-16">
            <Link href="/carrito" className="relative inline-flex items-center rounded-full bg-carbon-800/80 px-4 py-2 text-metal-200 backdrop-blur transition hover:bg-carbon-800 animate-float">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span className="text-sm">Inventario</span>
              <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-neon-violet px-1 text-xs font-semibold text-black">0</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
