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
  const [decided, setDecided] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (consent === 'accepted') {
      loadGA()
      setDecided(true)
    } else if (consent === 'rejected') {
      setDecided(true)
    } else {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    loadGA()
    setVisible(false)
    setDecided(true)
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
    setDecided(true)
  }

  return (
    <>
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

      <AnimatePresence>
        {decided && !visible && (
          <motion.button
            className="cookie-revoke"
            aria-label="Cookie-Einstellungen"
            onClick={() => setVisible(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9"  cy="10" r="1.5" fill="currentColor" />
              <circle cx="14" cy="9"  r="1"   fill="currentColor" />
              <circle cx="13" cy="14" r="1.5" fill="currentColor" />
              <circle cx="8.5" cy="14.5" r="1" fill="currentColor" />
            </svg>
            <span className="cookie-revoke-tooltip">Cookie-Einstellungen</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
