import Link from 'next/link'

export default function CartPage() {
  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl text-white">Inventario</h1>
          <p className="mt-2 text-metal-300/80">Carrito de compras simulado.</p>
          <div className="mt-6 rounded-xl border border-white/5 bg-carbon-800/40 p-4">
            <p className="text-metal-300/80">Tu inventario está vacío.</p>
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <Link href="/todos-los-productos" className="rounded-full bg-carbon-700 px-6 py-3 text-metal-200">Explorar productos</Link>
            <button className="rounded-full bg-neon-violet px-6 py-3 font-semibold text-black">Confirmar envío</button>
          </div>
          <p className="mt-2 text-xs text-metal-300/70">Confirmá tu envío — el resto, nosotros lo hacemos eterno.</p>
        </div>
      </section>
    </main>
  )
}
