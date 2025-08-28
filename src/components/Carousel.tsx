"use client"
import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type CarouselProps = {
  children: React.ReactNode
}

export default function Carousel({ children }: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  // No loop ni reubicación, navegación libre

  const update = () => {
    const el = viewportRef.current
    if (!el) return
    setCanPrev(true)
    setCanNext(true)
  }

  useLayoutEffect(() => {
    const el = viewportRef.current
    if (el) el.scrollTo({ left: 0, behavior: 'auto' })
    update()
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const id = setTimeout(() => {
      el.scrollTo({ left: 0, behavior: 'auto' })
      update()
    }, 0)
    const onScroll = () => update()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(id)
      el.removeEventListener('scroll', onScroll)
    }
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
