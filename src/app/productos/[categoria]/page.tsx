"use client"
import ProductsGrid from '@/components/ProductsGrid'
import { useEffect } from 'react'
import { useShop } from '@/store/shop'

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
  const { setCategory } = useShop()
  useEffect(()=>{ setCategory(params.categoria) ; return ()=>setCategory(null) }, [params.categoria, setCategory])
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
