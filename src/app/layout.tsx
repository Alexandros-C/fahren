import type { Metadata } from 'next'
import './globals.css'
import AiStylistPanel from '@/components/AiStylistPanel'

export const metadata: Metadata = {
  title: 'Fahren — Cyber-Renaissance Store',
  description: 'El futuro ya está disponible.',
  metadataBase: new URL('https://example.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full font-ui">
        {children}
        <AiStylistPanel />
      </body>
    </html>
  )
}
