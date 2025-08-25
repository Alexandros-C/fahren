"use client"
import { useState } from 'react'
import { Sparkles } from 'lucide-react'

type MessageRole = 'user' | 'assistant'
type Message = { role: MessageRole; content: string }

export default function AiStylistPanel() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Soy tu estilista. Decime qué buscás y te sugiero el set ideal.' } as const,
  ])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    const next: Message[] = [...messages, { role: 'user' as const, content: input }]
    // Placeholder suggestions logic; integrate real API later
    const suggestion = 'Combiná la chaqueta Serie V con botas espectro y acento neon.'
    setMessages([...next, { role: 'assistant' as const, content: suggestion }])
    setInput('')
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
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Pedí una sugerencia" className="focus-ring flex-1 rounded-full bg-carbon-700 px-3 py-2 text-sm text-metal-200 placeholder-metal-400" />
            <button onClick={send} className="rounded-full bg-neon-violet px-3 py-2 text-sm font-semibold text-black">Enviar</button>
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
