import ProductsGrid from '@/components/ProductsGrid'

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
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-3xl text-white">{title}</h1>
          <p className="mt-1 text-metal-300/80">Colección ordenada por relevancia.</p>
          <ProductsGrid category={params.categoria} sort="recent" />
        </div>
      </section>
    </main>
  )
}
