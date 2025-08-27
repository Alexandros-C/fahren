export default function PreguntasFrecuentesPage() {
  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-3xl text-white">Preguntas frecuentes</h1>
          <div className="mt-6 space-y-4 text-metal-200">
            <details className="rounded-lg border border-white/10 bg-carbon-800/40 p-4">
              <summary className="cursor-pointer text-white">¿Cómo funciona el envío?</summary>
              <p className="mt-2 text-sm text-metal-300/90">Procesamos en 24-48h y enviamos a todo el país.</p>
            </details>
            <details className="rounded-lg border border-white/10 bg-carbon-800/40 p-4">
              <summary className="cursor-pointer text-white">¿Qué métodos de pago aceptan?</summary>
              <p className="mt-2 text-sm text-metal-300/90">Tarjetas, transferencia y plataformas autorizadas.</p>
            </details>
          </div>
        </div>
      </section>
    </main>
  )
}

