"use client"
import ProductsGrid from '@/components/ProductsGrid'

export default function TodosLosProductosPage() {
  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl text-white">Todos los productos</h2>
          <ProductsGrid sort="recent" />
        </div>
      </section>
    </main>
  )
}

