"use client"
import Link from 'next/link'
import { ShoppingCart, Search, Menu, X, ChevronDown, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function Header() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [openProductos, setOpenProductos] = useState(true)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-carbon-900 border-b border-white/10 shadow-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          <button aria-label="Abrir menú" onClick={() => setOpen(true)} className="focus-ring inline-flex items-center justify-center rounded-full p-2 text-metal-200 hover:text-white">
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="select-none">
            <span className="font-display text-xl md:text-2xl text-white animate-glitch">Fahren</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/perfil" className="relative inline-flex items-center rounded-full bg-carbon-800/80 px-3 py-1.5 text-metal-200 backdrop-blur transition hover:bg-carbon-800">
              <User className="h-4 w-4" />
            </Link>
            <Link href="/carrito" className="relative inline-flex items-center rounded-full bg-carbon-800/80 px-3 py-1.5 text-metal-200 backdrop-blur transition hover:bg-carbon-800">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span className="text-sm">Inventario</span>
              <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-neon-violet px-1 text-xs font-semibold text-black">0</span>
            </Link>
          </div>
        </div>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60" onClick={() => setOpen(false)} />
          <div ref={panelRef} className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85%] border-r border-white/10 bg-carbon-900 p-4 shadow-glow">
            <div className="flex items-center justify-between">
              <span className="font-display text-white">Navegación</span>
              <button aria-label="Cerrar" onClick={() => setOpen(false)} className="focus-ring rounded-full p-2 text-metal-200 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-full bg-carbon-800 px-3 py-2">
              <Search className="h-4 w-4 text-metal-400" />
              <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar" className="w-full bg-transparent text-sm text-metal-200 placeholder-metal-400 focus:outline-none" />
            </div>
            <nav className="mt-6 space-y-1 text-metal-300/90">
              <Link href="/" className="block rounded px-2 py-2 hover:bg-carbon-800 hover:text-white" onClick={()=>setOpen(false)}>Inicio</Link>

              <button aria-expanded={openProductos} onClick={() => setOpenProductos(v=>!v)} className="flex w-full items-center justify-between rounded px-2 py-2 text-left hover:bg-carbon-800 hover:text-white">
                <span>Productos</span>
                <ChevronDown className={`h-4 w-4 transition ${openProductos ? 'rotate-180' : ''}`} />
              </button>
              {openProductos && (
                <div className="ml-2 space-y-1 rounded-lg bg-carbon-800 p-2">
                  <Link href={`/todos-los-productos`} className="block rounded px-2 py-1 text-sm hover:bg-carbon-700 hover:text-white" onClick={()=>setOpen(false)}>
                    Todos los productos
                  </Link>
                  {[
                    ['remeras','Remeras'],
                    ['buzos','Buzos'],
                    ['camperas','Camperas'],
                    ['gorros','Gorros'],
                    ['jeans','Jeans'],
                    ['joggers','Joggers'],
                    ['accesorios','Accesorios'],
                  ].map(([slug,label]) => (
                    <Link key={slug} href={`/productos/${slug}`} className="block rounded px-2 py-1 text-sm hover:bg-carbon-700 hover:text-white" onClick={()=>setOpen(false)}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/guia-de-talles" className="mt-1 block rounded px-2 py-2 hover:bg-carbon-800 hover:text-white" onClick={()=>setOpen(false)}>Guía de talles</Link>
              <Link href="/contacto" className="block rounded px-2 py-2 hover:bg-carbon-800 hover:text-white" onClick={()=>setOpen(false)}>Contacto</Link>
              <Link href="/preguntas-frecuentes" className="block rounded px-2 py-2 hover:bg-carbon-800 hover:text-white" onClick={()=>setOpen(false)}>Preguntas frecuentes</Link>
              <Link href="/politica-de-cambios" className="block rounded px-2 py-2 hover:bg-carbon-800 hover:text-white" onClick={()=>setOpen(false)}>Política de cambios</Link>
              <Link href="/sobre-nosotros" className="block rounded px-2 py-2 hover:bg-carbon-800 hover:text-white" onClick={()=>setOpen(false)}>Sobre nosotros</Link>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
