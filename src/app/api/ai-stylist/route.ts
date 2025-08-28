import { NextResponse } from 'next/server'

type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string }

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] }
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
      messages: [systemPrompt, ...messages].slice(-12),
      temperature: 0.7,
      max_tokens: 220
    }

    if (!apiKey) {
      // Fallback sin clave: respuesta simulada
      return NextResponse.json({
        content:
          'Probá una chaqueta técnica negra con remera básica violeta neón y joggers carbón. Sumá gorro minimal y mochila metálica. Para contraste: zapatillas blancas con detalle verde neón.'
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
    return NextResponse.json({ content })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

