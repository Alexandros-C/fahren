import { NextResponse } from 'next/server'

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }
type Context = { cart?: Array<{title:string;price:number;category?:string}>, category?: string | null }
type Product = { id: string; title: string; price: number; image: string; category: string; isBestSeller?: boolean; createdAt: string }

function normalizeEs(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
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
    const { messages, context } = (await req.json()) as { messages: ChatMessage[]; context?: Context }
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

    const systemPrompt: ChatMessage = {
      role: 'system',
      content:
        'Sos el asistente de ventas de la tienda Fahren. Tu enfoque siempre es ayudar a elegir y completar la compra, con un trato natural y cercano. Respondé en español rioplatense, claro y breve, sin tecnicismos innecesarios y sin desviarte de la temática de tienda/venta. Hacé esto en cada respuesta: (1) entendé y reconocé lo que la persona pide, (2) sugerí 1–2 opciones del catálogo con motivos simples (color/fit/ocasión), (3) ofrecé 1 complemento opcional, (4) preguntá un dato para afinar (talle, fit, clima, presupuesto). No inventes productos ni stock: sugerí solo entre las opciones que te paso en el contexto. Evitá repetir frases entre respuestas.'
    }

    // Preparar sugerencias concretas del catálogo
    const userLast = [...messages].reverse().find(m => m.role === 'user')?.content || ''
    const normText = normalizeEs(userLast)
    const tokens = normText.match(/[a-z0-9]{3,}/g) || []
    const candidates = await getCandidateProducts(context?.category ?? null)
    const synonyms: Record<string, string[]> = {
      remeras: ['remera','camiseta','playera','tshirt','remeras','camisetas'],
      buzos: ['buzo','hoodie','sudadera','buzos','hoodies'],
      camperas: ['campera','chaqueta','abrigo','camperas','chaquetas'],
      jeans: ['jean','jeans','denim','pantalon jean'],
      joggers: ['jogger','joggers','pantalon jogger'],
      gorros: ['gorro','beanie','gorros'],
      accesorios: ['accesorio','cinturon','riñonera','mochila','bolso','accesorios'],
      negro: ['negro','black','oscuro'],
      blanco: ['blanco','white'],
      gris: ['gris','gray'],
      azul: ['azul','blue'],
      violeta: ['violeta','purpura','morado','purple'],
      verde: ['verde','green'],
      rojo: ['rojo','red'],
      oversize: ['oversize','holgado','suelto','relajado','relaxed'],
      entallado: ['entallado','slim','ajustado','fitted']
    }
    const expandedTokens = new Set<string>(tokens)
    for (const base in synonyms) {
      if (synonyms[base].some(alt => normText.includes(alt))) {
        expandedTokens.add(base)
        for (const alt of synonyms[base]) expandedTokens.add(alt)
      }
    }

    const scored = candidates.map(p => {
      const haystack = normalizeEs(`${p.title} ${p.category}`)
      const hasCategory = Array.from(expandedTokens).some(t => ['remeras','buzos','camperas','jeans','joggers','gorros','accesorios'].includes(t) && (p.category === t))
      const keywordHits = Array.from(expandedTokens).reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0)
      const score = (hasCategory ? 2 : 0) + keywordHits + (p.isBestSeller ? 0.2 : 0)
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
      // Fallback sin clave: respuesta dinámica basada en categoría, última consulta y sugerencias
      const sample = suggestions.slice(0, 3).map(s => `${s.title} ($${s.price})`).join(', ')
      const catHint = context?.category ? ` Categoría: ${context.category}.` : ''
      const queryHint = userLast ? ` Pedido: "${userLast}".` : ''
      const content = suggestions.length
        ? `Anotado.${catHint}${queryHint} Te propongo ${sample}. Sumá un accesorio para contraste. ¿Preferís fit relajado o entallado?`
        : `Para afinarte bien${catHint}${queryHint} decime: ¿buscás remera, buzo, campera o pantalón? ¿Qué color te gusta (negro, gris, blanco, azul)?`
      return NextResponse.json({ content, suggestions }, { headers: { 'x-ai-used': 'fallback' } })
    }

    // Construir snapshot del catálogo y payload anclado
    const catalogSnapshot = suggestions.map(s => ({ id: s.id, title: s.title, category: s.category, price: s.price }))
    const assistantLast = [...messages].reverse().find(m => m.role === 'assistant')?.content || ''
    const payload = {
      model,
      messages: [
        systemPrompt,
        { role: 'system', content: `Opciones del catálogo (elegí de aquí, no inventes): ${JSON.stringify(catalogSnapshot)}` },
        ...(context?.category ? [{ role: 'system', content: `Categoría actual: ${context.category}` } as ChatMessage] : []),
        ...(context?.cart && context.cart.length
          ? [{ role: 'system', content: `Carrito: ${context.cart.map(c=>`${c.title} ($${c.price})`).join(', ')}` } as ChatMessage]
          : []),
        ...(assistantLast ? [{ role: 'system', content: `Evitá repetir literalmente: ${assistantLast.slice(0, 160)}` } as ChatMessage] : []),
        ...messages,
      ].slice(-12),
      temperature: 0.7,
      presence_penalty: 0.6,
      frequency_penalty: 0.8,
      max_tokens: 220,
      top_p: 0.9
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
    return NextResponse.json({ content, suggestions }, { headers: { 'x-ai-used': 'openai' } })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

