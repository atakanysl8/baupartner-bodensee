import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CookieBanner from './components/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  metadataBase: new URL('https://www.bodensee-baupartner.de'),
  title: 'Handwerker & Bauunternehmen am Bodensee – BauPartner',
  description:
    'Bodensee BauPartner vermittelt Handwerker & Baubetriebe in der Bodenseeregion – für Hochbau, Tiefbau, Renovierung, Innenausbau & Bad. Kostenlos & unverbindlich.',
  keywords: [
    'Bauunternehmen Bodensee',
    'Handwerker Bodensee',
    'Baufirma Überlingen',
    'Hochbau Bodenseeregion',
    'Tiefbau Bodensee',
    'Renovierung Bodenseekreis',
    'Innenausbau Bodensee',
    'Bad Sanitär Bodensee',
    'Bauvermittlung Bodensee',
    'Handwerker vermitteln Überlingen',
    'Baubetrieb Friedrichshafen',
    'Sanierung Bodensee',
  ],
  authors: [{ name: 'Bodensee BauPartner GbR' }],
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Bodensee BauPartner – Handwerker & Baubetriebe am Bodensee',
    description:
      'Wir vermitteln Handwerker & Baubetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
