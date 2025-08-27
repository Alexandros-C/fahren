"use client"
import useSWR from 'swr'
import Link from 'next/link'

type Props = {
  category?: string
  sort?: 'recent' | 'bestsellers'
  limit?: number
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function ProductsGrid({ category, sort = 'recent', limit = 24 }: Props) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (sort) params.set('sort', sort)
  if (limit) params.set('limit', String(limit))
  const { data, error, isLoading } = useSWR(`/api/products?${params.toString()}`, fetcher, { revalidateOnFocus: false })

  if (error) {
    return <div className="mt-6 rounded-lg border border-white/10 bg-red-500/10 p-4 text-sm text-red-300">Error al cargar productos.</div>
  }
  const products = data ?? []

  return (
    <div className="mt-6 grid grid-cols-2 gap-6">
      {(isLoading ? Array.from({ length: 6 }) : products).map((p: any, i: number) => (
        <Link key={p?.id ?? i} href={`/producto/${p?.id ?? i+1}`} className="group">
          <div className="aspect-square overflow-hidden rounded-xl border border-white/5 bg-carbon-800/40">
            {p?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={p.title ?? 'Producto'} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-carbon-700" />
            )}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-white text-sm">{p?.title ?? 'Cargando…'}</h3>
            {p?.price != null && <span className="text-neon-violet text-sm">$ {p.price}</span>}
          </div>
        </Link>
      ))}
    </div>
  )
}

