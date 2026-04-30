'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const GA_ID = 'G-SK065VSPTS'
const CONSENT_KEY = 'cookie-consent'

function loadGA() {
  if (typeof window === 'undefined' || document.getElementById('ga-init')) return

  const s1 = document.createElement('script')
  s1.id = 'ga-init'
  s1.async = true
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s1)

  const s2 = document.createElement('script')
  s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`
  document.head.appendChild(s2)
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (consent === 'accepted') loadGA()
    else if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    loadGA()
    setVisible(false)
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <div className="cookie-wrapper">
          <motion.div
            className="cookie-banner"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <p className="cookie-text">
              Wir nutzen <strong>Google Analytics</strong>, um unsere Website zu verbessern. Deine Daten werden anonym verarbeitet.{' '}
              <Link href="/datenschutz" className="cookie-link">Datenschutzerklärung</Link>
            </p>
            <div className="cookie-actions">
              <button className="cookie-btn cookie-btn-reject" onClick={reject}>Ablehnen</button>
              <button className="cookie-btn cookie-btn-accept" onClick={accept}>Akzeptieren</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
