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
  metadataBase: new URL('https://www.bodensee-baupartner.de'),
  title: 'Bodensee BauPartner – Geprüfte Baubetriebe am Bodensee vermitteln',
  description:
    'Bodensee BauPartner vermittelt geprüfte Handwerker & Baubetriebe in der Bodenseeregion – für Hochbau, Tiefbau, Renovierung, Innenausbau & Bad. Kostenlos & unverbindlich.',
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
    title: 'Bodensee BauPartner – Geprüfte Baubetriebe am Bodensee',
    description:
      'Wir vermitteln geprüfte Handwerker & Baubetriebe in der Bodenseeregion – kostenlos & unverbindlich.',
    locale: 'de_DE',
    type: 'website',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Bodensee BauPartner GbR',
  description: 'Bauvermittlung in der Bodenseeregion – geprüfte Handwerker & Baubetriebe für Hochbau, Tiefbau, Renovierung, Innenausbau & Bad.',
  url: 'https://www.bodensee-baupartner.de',
  telephone: '+4915256311690',
  email: 'info@bodensee-baupartner.de',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tulpenweg 1',
    addressLocality: 'Überlingen',
    postalCode: '88662',
    addressCountry: 'DE',
  },
  areaServed: [
    { '@type': 'City', name: 'Überlingen' },
    { '@type': 'City', name: 'Friedrichshafen' },
    { '@type': 'City', name: 'Konstanz' },
    { '@type': 'City', name: 'Ravensburg' },
    { '@type': 'City', name: 'Lindau' },
  ],
  serviceType: ['Hochbau', 'Tiefbau', 'Bad & Sanitär', 'Innenausbau', 'Renovierung & Sanierung'],
  priceRange: 'Kostenlose Vermittlung',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
