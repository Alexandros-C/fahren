
export default function ContactoPage() {
  return (
    <main>
      <section className="pt-20 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl text-white">Contacto</h1>
          <p className="mt-2 text-metal-300/80">Escribinos y te respondemos a la brevedad.</p>
          <form className="mt-6 space-y-4">
            <input type="text" placeholder="Nombre" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
            <input type="email" placeholder="Email" className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
            <textarea placeholder="Mensaje" rows={5} className="w-full rounded-lg bg-carbon-800 px-4 py-2 text-metal-200 placeholder-metal-400" />
            <button className="rounded-full bg-neon-violet px-6 py-3 font-semibold text-black">Enviar</button>
          </form>
        </div>
      </section>
    </main>
  )
}
