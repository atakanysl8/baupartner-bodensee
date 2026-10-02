import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: { canonical: '/datenschutz/' },
  title: 'Datenschutzerklärung | Bodensee BauPartner GbR',
  description: 'Datenschutzerklärung der Bodensee BauPartner GbR – Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
