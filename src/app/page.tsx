import Link from 'next/link'
import HomeFeed from '@/components/HomeFeed'

export default function HomePage() {
  return (
    <main className="min-h-screen pt-14">
      {/* Portada principal */}
      <section className="relative h-[70svh] w-full overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted playsInline loop poster="/hero-fallback.jpg">
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-carbon-900/70" />
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <div>
            <h1 className="font-display text-4xl md:text-6xl text-white text-glow">El futuro ya está disponible</h1>
            <div className="mt-6">
              <Link href="/novedades" className="focus-ring inline-block rounded-full bg-neon-violet px-8 py-3 font-semibold text-black shadow-glow hover:bg-neon-violet/90">
                Comprar ya
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeFeed />
    </main>
  )
}
