import { NextResponse } from 'next/server'

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }
type Context = { cart?: Array<{title:string;price:number;category?:string}>, category?: string | null }
type Product = { id: string; title: string; price: number; image: string; category: string; isBestSeller?: boolean; createdAt: string }

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

async function getCandidateProducts(category?: string | null): Promise<Product[]> {
  const externalUrl = process.env.PRODUCTS_API_URL
  if (externalUrl) {
    try {
      const url = new URL(externalUrl)
      if (category) url.searchParams.set('category', category)
      url.searchParams.set('limit', '50')
      const res = await fetch(url.toString(), { next: { revalidate: 60 } })
      if (res.ok) {
        const data = await res.json()
        return Array.isArray(data) ? data as Product[] : []
      }
    } catch {
      // ignore and fall back
    }
  }
  let products = mockProducts()
  if (category) {
    products = products.filter(p => p.category === category)
  }
  return products
}

export async function POST(req: Request) {
  try {
    const { messages, context, style } = (await req.json()) as { messages: ChatMessage[]; context?: Context; style?: string }
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

    const systemPrompt: ChatMessage = {
      role: 'system',
      content:
        'Sos el estilista de Fahren. Respondé en español, breve y accionable. Sugerí combinaciones y accesorios coherentes con el carrito y la estética Cyber-Renaissance (negros, metálicos, acentos neón). Prioridad a performance y legibilidad. No inventes funcionalidades que no existen.'
    }

    const payload = {
      model,
      messages: [
        systemPrompt,
        ...(style ? [{ role: 'system', content: `Preferencia de estilo: ${style}` } as ChatMessage] : []),
        ...(context?.category ? [{ role: 'system', content: `Categoría actual: ${context.category}` } as ChatMessage] : []),
        ...(context?.cart && context.cart.length
          ? [{ role: 'system', content: `Carrito: ${context.cart.map(c=>`${c.title} ($${c.price})`).join(', ')}` } as ChatMessage]
          : []),
        ...messages,
      ].slice(-12),
      temperature: 0.7,
      max_tokens: 220
    }

    // Preparar sugerencias concretas del catálogo
    const userLast = [...messages].reverse().find(m => m.role === 'user')?.content || ''
    const tokens = userLast.toLowerCase().match(/[a-záéíóúñ]{3,}/g) || []
    const candidates = await getCandidateProducts(context?.category ?? null)
    const scored = candidates.map(p => {
      const haystack = `${p.title} ${p.category}`.toLowerCase()
      const score = tokens.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0) + (p.isBestSeller ? 0.2 : 0)
      return { p, score }
    })
    scored.sort((a,b) => b.score - a.score || (+new Date(b.p.createdAt) - +new Date(a.p.createdAt)))
    let suggestions = scored.slice(0, 3).map(({ p }) => ({ id: p.id, title: p.title, price: p.price, image: p.image, category: p.category }))
    if (suggestions.length === 0) {
      // Priorizar best-sellers si no hay match
      const fallbacks = [...candidates].filter(p => p.isBestSeller)
        .sort((a,b) => (+new Date(b.createdAt) - +new Date(a.createdAt)))
        .slice(0, 3)
        .map(p => ({ id: p.id, title: p.title, price: p.price, image: p.image, category: p.category }))
      suggestions = fallbacks
    }

    if (!apiKey) {
      // Fallback sin clave: respuesta simulada con sugerencias
      return NextResponse.json({
        content:
          'Probá una chaqueta técnica negra con remera básica violeta neón y joggers carbón. Sumá gorro minimal y mochila metálica. Para contraste: zapatillas blancas con detalle verde neón.',
        suggestions
      })
    }

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text || 'AI provider error' }, { status: 500 })
    }
    const data = await res.json()
    const content: string = data.choices?.[0]?.message?.content || ''
    return NextResponse.json({ content, suggestions })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

