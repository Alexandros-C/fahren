"use client"
import { useRef, useState, useEffect, useLayoutEffect, Children } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselProps = {
  children: React.ReactNode
}

export default function Carousel({ children }: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [segmentWidth, setSegmentWidth] = useState(0)
  const isAdjustingRef = useRef(false)

  const update = () => {
    const el = viewportRef.current
    if (!el) return
    setCanPrev(true)
    setCanNext(true)
  }

  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return
    // Medir y centrar en el segundo bloque (B) para poder ir hacia adelante/atrás en loop
    requestAnimationFrame(() => {
      const totalWidth = el.scrollWidth
      const seg = totalWidth / 3
      setSegmentWidth(seg)
      el.scrollTo({ left: seg, behavior: 'auto' })
      update()
    })
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el || !segmentWidth) return

    const onScroll = () => {
      if (isAdjustingRef.current) return
      const left = el.scrollLeft
      // Umbrales amplios para evitar rebotes cuando el usuario navega
      if (left < segmentWidth * 0.05) {
        // Pasó al bloque inicial (A) -> reubicar a bloque central (B)
        isAdjustingRef.current = true
        el.scrollTo({ left: left + segmentWidth, behavior: 'auto' })
        isAdjustingRef.current = false
      } else if (left > segmentWidth * 2.95) {
        // Pasó al bloque final (C) -> reubicar a bloque central (B)
        isAdjustingRef.current = true
        el.scrollTo({ left: left - segmentWidth, behavior: 'auto' })
        isAdjustingRef.current = false
      }
      update()
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [segmentWidth])

  const scrollBy = (dir: number) => {
    const el = viewportRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.9) * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const base = Children.toArray(children)
  const looped = [...base, ...base, ...base]

  return (
    <div className="relative">
      <div ref={viewportRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {looped.map((child, idx) => (
          <div key={idx} className="contents">{child as any}</div>
        ))}
      </div>
      <button aria-label="Anterior" onClick={() => scrollBy(-1)} disabled={!canPrev} className="focus-ring absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-carbon-800/80 p-2 text-white shadow-md backdrop-blur disabled:opacity-40">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button aria-label="Siguiente" onClick={() => scrollBy(1)} disabled={!canNext} className="focus-ring absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-carbon-800/80 p-2 text-white shadow-md backdrop-blur disabled:opacity-40">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
