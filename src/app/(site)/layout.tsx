import { Header } from '@/components/Header'
import AiStylistPanel from '@/components/AiStylistPanel'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <AiStylistPanel />
    </div>
  )
}
