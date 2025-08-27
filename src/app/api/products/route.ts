import { NextResponse } from 'next/server'

type Product = {
  id: string
  title: string
  price: number
  image: string
  category: string
  isBestSeller?: boolean
  createdAt: string
}

function mockProducts(): Product[] {
  const categories = ['remeras','buzos','camperas','jeans','joggers','gorros','accesorios']
  const list: Product[] = []
  for (let i = 1; i <= 24; i++) {
    list.push({
      id: String(i),
      title: `Producto ${i}`,
      price: 199 + i,
      image: '/hero-fallback.jpg',
      category: categories[i % categories.length],
      isBestSeller: i % 5 === 0,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    })
  }
  return list
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') ?? '10')
  const sort = searchParams.get('sort') // 'recent' | 'bestsellers'
  const category = searchParams.get('category') ?? undefined
  const externalUrl = process.env.PRODUCTS_API_URL

  try {
    let products: Product[]
    if (externalUrl) {
      const res = await fetch(`${externalUrl}?${searchParams.toString()}`, { next: { revalidate: 60 } })
      if (!res.ok) throw new Error('External products API error')
      products = await res.json()
    } else {
      products = mockProducts()
    }

    if (category) {
      products = products.filter(p => p.category === category)
    }

    if (sort === 'bestsellers') {
      products = products.filter(p => p.isBestSeller)
    } else if (sort === 'recent') {
      products = products.sort((a,b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    }

    return NextResponse.json(products.slice(0, limit))
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

