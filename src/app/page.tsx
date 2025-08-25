import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative h-[100svh] w-full overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted playsInline loop poster="/hero-fallback.jpg">
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-carbon-900/80" />
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <div>
            <h1 className="font-display text-4xl md:text-6xl text-white text-glow">El futuro ya está disponible</h1>
            <div className="mt-8">
              <Link href="/drop" className="focus-ring inline-block rounded-full bg-neon-violet/20 px-8 py-3 text-white shadow-glow backdrop-blur transition hover:bg-neon-violet/30">
                Ingresar al Drop
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
