import type { Metadata } from 'next'
import './globals.css'
import AiStylistPanel from '@/components/AiStylistPanel'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Fahren — Cyber-Renaissance Store',
  description: 'El futuro ya está disponible.',
  metadataBase: new URL('https://example.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full font-ui">
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
        <AiStylistPanel />
      </body>
    </html>
  )
}
