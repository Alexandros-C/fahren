import Link from 'next/link'
import { Header } from '@/components/Header'

const categorias = [
  ['remeras','Remeras'],
  ['buzos','Buzos'],
  ['camperas','Camperas'],
  ['gorros','Gorros'],
  ['jeans','Jeans'],
  ['joggers','Joggers'],
  ['accesorios','Accesorios'],
]

export default function ProductosIndex() {
  return (
    <main>
      <Header />
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-3xl text-white">Productos</h1>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categorias.map(([slug,label]) => (
              <Link key={slug} href={`/productos/${slug}`} className="rounded-xl border border-white/5 bg-carbon-800/40 p-4 hover:border-neon-violet/30">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-carbon-700 to-carbon-900" />
                <div className="mt-2 text-center text-metal-200">{label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
