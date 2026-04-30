import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | Bodensee BauPartner GbR',
  description: 'Impressum der Bodensee BauPartner GbR – Angaben gemäß § 5 TMG, Kontaktdaten und rechtliche Hinweise.',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
