"use client"
import Link from 'next/link'
import { Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-carbon-900/60">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-display text-white">Fahren</h3>
            <p className="mt-2 text-sm text-metal-300/80">Cyber-Renaissance — El futuro ya está disponible.</p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://instagram.com/fahren"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-carbon-800 px-3 py-2 text-metal-200 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white">Navegación</h4>
            <ul className="mt-3 space-y-2 text-sm text-metal-300/90">
              <li><Link href="/" className="hover:text-white">Inicio</Link></li>
              <li><Link href="/productos" className="hover:text-white">Productos</Link></li>
              <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white">Newsletter</h4>
            <p className="mt-2 text-sm text-metal-300/80">Suscribite para recibir drops y adelantos.</p>
            <form
              className="mt-3 flex max-w-md gap-2"
              onSubmit={(e) => { e.preventDefault(); }}
              aria-label="Suscripción al newsletter"
            >
              <input
                type="email"
                required
                placeholder="tu@email"
                className="focus-ring w-full rounded-full bg-carbon-800 px-4 py-2 text-sm text-metal-200 placeholder-metal-400"
              />
              <button type="submit" className="rounded-full bg-neon-violet px-4 py-2 text-sm font-semibold text-black">Suscribirme</button>
            </form>
            <div className="mt-4 text-xs text-metal-400">
              <p>© {new Date().getFullYear()} Fahren. Todos los derechos reservados.</p>
              <p className="mt-1">
                <a
                  href="https://www.argentina.gob.ar/defensadelconsumidor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Defensa de las y los consumidores
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
