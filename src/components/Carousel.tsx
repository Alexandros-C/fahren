"use client"
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselProps = {
  children: React.ReactNode
}

export default function Carousel({ children }: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const update = () => {
    const el = viewportRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 0)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    // Reset al inicio del carrusel
    const el = viewportRef.current
    if (el) el.scrollLeft = 0
    update()
    if (!el) return
    const onScroll = () => update()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollBy = (dir: number) => {
    const el = viewportRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.9) * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div ref={viewportRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
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
