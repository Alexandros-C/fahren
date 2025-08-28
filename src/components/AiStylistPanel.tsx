"use client"
import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useShop } from '@/store/shop'

type MessageRole = 'user' | 'assistant'
type Message = { role: MessageRole; content: string }

export default function AiStylistPanel() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Soy tu estilista. Decime qué buscás y te sugiero el set ideal.' } as const,
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const { cart, category } = useShop()
  const [suggestions, setSuggestions] = useState<Array<{id:string;title:string;price:number;image?:string;category?:string}>>([])

  const send = async () => {
    const value = String(input ?? '')
    const trimmed = value.trim()
    if (!trimmed || loading) return
    const next: Message[] = [...messages, { role: 'user' as const, content: trimmed }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/ai-stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, context: { cart, category } })
      })
      const data = await res.json()
      const content: string = data?.content || 'No tengo una sugerencia en este momento.'
      setSuggestions(Array.isArray(data?.suggestions) ? data.suggestions : [])
      setMessages([...next, { role: 'assistant' as const, content }])
    } catch {
      setMessages([...next, { role: 'assistant' as const, content: 'Hubo un problema al generar la sugerencia. Intentá de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 overflow-hidden rounded-2xl border border-white/10 bg-carbon-800/95 backdrop-blur shadow-glow">
          <div className="max-h-80 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role==='assistant' ? 'text-metal-200' : 'text-white'}>
                <span className="mr-2 text-neon-violet">{m.role==='assistant' ? 'Fahren IA' : 'Vos'}</span>
                <span>{m.content}</span>
              </div>
            ))}
            {suggestions.length > 0 && (
              <div className="mt-2 space-y-2">
                <div className="text-xs uppercase tracking-wider text-metal-400">Sugerencias</div>
                <div className="grid grid-cols-2 gap-3">
                  {suggestions.map((s, i) => (
                    <div key={s.id ?? i} className="rounded-lg border border-white/10 bg-carbon-800/60 p-2">
                      <div className="aspect-square overflow-hidden rounded-md bg-carbon-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.image || '/hero-fallback.jpg'} alt={s.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="mt-2 text-xs text-white line-clamp-2">{s.title}</div>
                      <div className="flex items-center justify-between mt-1">
                        {s.price != null && <span className="text-[11px] text-neon-violet">$ {s.price}</span>}
                        <div className="flex gap-1">
                          <a href={`/producto/${s.id}`} className="rounded-full bg-carbon-700 px-2 py-1 text-[10px] text-white border border-white/10">Ver</a>
                          <button onClick={()=>useShop.getState().addToCart({ id: String(s.id), title: s.title, price: s.price, image: s.image })} className="rounded-full bg-neon-violet px-2 py-1 text-[10px] font-semibold text-black">Añadir</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Pedí una sugerencia" className="focus-ring flex-1 rounded-full bg-carbon-700 px-3 py-2 text-sm text-metal-200 placeholder-metal-400" />
            <button onClick={send} disabled={loading} className="rounded-full bg-neon-violet px-3 py-2 text-sm font-semibold text-black disabled:opacity-50">{loading ? 'Pensando…' : 'Enviar'}</button>
          </div>
        </div>
      )}
      
      <button onClick={()=>setOpen(o=>!o)} className="focus-ring inline-flex items-center gap-2 rounded-full bg-neon-violet px-4 py-3 font-semibold text-black shadow-glow">
        <Sparkles className="h-4 w-4" />
        Estilista IA
      </button>
    </div>
  )
}
