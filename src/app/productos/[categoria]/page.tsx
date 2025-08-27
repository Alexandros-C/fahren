import { Header } from '@/components/Header'
import Link from 'next/link'

const titles: Record<string,string> = {
  remeras: 'Remeras',
  buzos: 'Buzos',
  camperas: 'Camperas',
  gorros: 'Gorros',
  jeans: 'Jeans',
  joggers: 'Joggers',
  accesorios: 'Accesorios',
}

export default function CategoriaPage({ params }: { params: { categoria: string }}) {
  const title = titles[params.categoria] ?? 'Categoría'
  return (
    <main>
      <Header />
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-3xl text-white">{title}</h1>
          <p className="mt-1 text-metal-300/80">Colección ordenada por relevancia.</p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length:9}).map((_,i)=> (
              <Link key={i} href={`/producto/${i+1}`} className="group">
                <div className="aspect-square rounded-xl border border-white/5 bg-carbon-800/40" />
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-white">{title} {i+1}</h3>
                  <span className="text-neon-violet">$ {199 + i}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
