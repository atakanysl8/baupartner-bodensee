'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

const leistungenItems = [
  { label: 'Hochbau', href: '/leistungen/hochbau' },
  { label: 'Tiefbau', href: '/leistungen/tiefbau' },
  { label: 'Bad & Sanitär', href: '/leistungen/bad-sanitaer' },
  { label: 'Innenausbau', href: '/leistungen/innenausbau' },
  { label: 'Renovierung & Sanierung', href: '/leistungen/renovierung-sanierung' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const otherLinks = [
    { href: '/ueber-uns', label: 'Über uns' },
    { href: '/fuer-fachbetriebe', label: 'Für Fachbetriebe' },
    { href: '/#kontakt', label: 'Kontakt' },
  ]

  return (
    <>
      <div className="nav-shell">
        <motion.nav
          className="nav"
          animate={{
            boxShadow: scrolled
              ? '0 4px 40px rgba(15,47,77,0.13), 0 1px 4px rgba(15,47,77,0.06)'
              : '0 2px 20px rgba(15,47,77,0.08), 0 1px 3px rgba(15,47,77,0.04)',
          }}
          transition={{ duration: 0.35 }}
        >
          <a href="/" className="nav-logo" aria-label="Bodensee BauPartner">
            <img src="/logo.png" alt="Bodensee BauPartner" style={{ height: 52, width: 'auto' }} />
          </a>
          <div className="nav-links">
            <div
              className="nav-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <a href="/#leistungen" className={dropdownOpen ? 'active' : ''}>
                Leistungen
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="nav-dropdown-menu"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as const }}
                  >
                    {leistungenItems.map((item, i) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className="nav-dropdown-item"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.15 }}
                      >
                        <span className="nav-dropdown-dot" />
                        {item.label}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {otherLinks.map(l => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>
          <motion.a href="/#kontakt" className="nav-cta" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            Projekt anfragen
            <span className="nav-cta-dot">
              <svg width="9" height="9" viewBox="0 0 9 9"><path d="M1 4.5h7m0 0L5 1.5m3 3L5 7.5" stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round" /></svg>
            </span>
          </motion.a>
          <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">
            <span /><span /><span />
          </button>
        </motion.nav>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Menü schließen">×</button>
            <motion.a href="/#leistungen" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>Leistungen</motion.a>
            <div className="mobile-leistungen-sub">
              {leistungenItems.map((item, i) => (
                <motion.a key={item.label} href={item.href} className="mobile-leistungen-item" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                  <span className="nav-dropdown-dot" />{item.label}
                </motion.a>
              ))}
            </div>
            {otherLinks.map((l, i) => (
              <motion.a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i + 1) * 0.06 + 0.2 }}>{l.label}</motion.a>
            ))}
            <motion.a href="/#kontakt" className="btn btn-primary" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>Projekt anfragen</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const mailBetreff = 'Zusammenarbeit als Fachbetrieb'
const mailText = [
  'Hallo Bodensee BauPartner,',
  '',
  'wir haben Interesse an einer Zusammenarbeit.',
  '',
  'Firma:',
  'Gewerk(e):',
  'Einsatzgebiet:',
  'Ansprechpartner:',
  'Telefon:',
  '',
  'Viele Grüße',
].join('\n')
const mailHref = `mailto:info@bodensee-baupartner.de?subject=${encodeURIComponent(mailBetreff)}&body=${encodeURIComponent(mailText)}`

const punkte = [
  {
    title: 'Anfragen aus der Region',
    desc: 'Bauherren und Eigentümer aus der Bodenseeregion schildern uns ihr Vorhaben – mit Ort, Zeitrahmen und Umfang.',
  },
  {
    title: 'Passend zu Ihrem Gewerk',
    desc: 'Wir geben eine Anfrage an einen Betrieb weiter, der zu Leistung und Einsatzgebiet passt.',
  },
  {
    title: 'Ein Ansprechpartner',
    desc: 'Kurze Wege: Sie erreichen uns direkt, persönlich und ohne Callcenter.',
  },
]

function FachbetriebeContent() {
  return (
    <section className="fb-section">
      <div className="wrap">
        <motion.div className="fb-inner" variants={stagger} initial="hidden" animate="show">
          <motion.div className="eyebrow" variants={fadeUp}>
            <span className="bullet" /> Für Fachbetriebe
          </motion.div>
          <motion.h1 className="fb-h1" variants={fadeUp}>
            Sie sind Fachbetrieb am Bodensee? <em>Lassen Sie uns zusammenarbeiten.</em>
          </motion.h1>
          <motion.p className="fb-lead" variants={fadeUp}>
            Bodensee BauPartner vermittelt Bau- und Handwerksprojekte in der Bodenseeregion. Für Hochbau, Tiefbau, Bad &amp; Sanitär, Innenausbau sowie Renovierung und Sanierung suchen wir laufend zuverlässige Betriebe aus der Region. Wenn Sie offen für neue Aufträge sind, melden Sie sich gerne per E-Mail – wir besprechen alles Weitere persönlich.
          </motion.p>

          <motion.div className="fb-grid" variants={stagger}>
            {punkte.map(p => (
              <motion.div key={p.title} className="fb-card" variants={fadeUp}>
                <h2>{p.title}</h2>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="fb-cta" variants={fadeUp}>
            <motion.a
              href={mailHref}
              className="btn btn-primary"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              E-Mail an uns schreiben
              <span className="btn-dot">
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </span>
            </motion.a>
            <p className="fb-cta-note">
              oder direkt an <a href="mailto:info@bodensee-baupartner.de">info@bodensee-baupartner.de</a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
    >
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-wrap">
              <img src="/logo.png" alt="Bodensee BauPartner" style={{ height: 40, width: 'auto' }} />
            </div>
            <p className="footer-desc">
              Ihr persönlicher Bau-Vermittler in der Bodenseeregion — wir verbinden Sie mit passenden Fachbetrieben aus der Region für Ihr Projekt.
            </p>
          </div>
          <div className="footer-col">
            <h5>Leistungen</h5>
            <a href="/leistungen/hochbau">Hochbau</a>
            <a href="/leistungen/tiefbau">Tiefbau</a>
            <a href="/leistungen/bad-sanitaer">Bad &amp; Sanitär</a>
            <a href="/leistungen/innenausbau">Innenausbau</a>
            <a href="/leistungen/renovierung-sanierung">Renovierung &amp; Sanierung</a>
          </div>
          <div className="footer-col">
            <h5>Unternehmen</h5>
            <a href="/ueber-uns">Über uns</a>
            <a href="/#kontakt">Kontakt</a>
            <a href="/fuer-fachbetriebe">Für Fachbetriebe</a>
          </div>
        </div>
        <div className="footer-hinweis">
          <strong>Wichtiger Hinweis:</strong> Die Bodensee BauPartner GbR erbringt ausschließlich Vermittlungsleistungen. Wir übernehmen keine Tätigkeiten als Bauleiter oder Generalunternehmer und werden nicht Vertragspartner der Ausführungsverträge.
        </div>
        <div className="footer-bottom">
          <div>© 2026 Bodensee BauPartner GbR. Alle Rechte vorbehalten.</div>
          <div className="footer-legal">
            <a href="/impressum">Impressum</a>
            <span>·</span>
            <a href="/datenschutz">Datenschutz</a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default function FuerFachbetriebePage() {
  return (
    <>
      <Nav />
      <FachbetriebeContent />
      <Footer />
    </>
  )
}
