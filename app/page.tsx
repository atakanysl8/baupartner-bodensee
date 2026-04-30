'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

/* ── Animation variants ──────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const staggerSlow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
}

/* ── Nav ─────────────────────────────────────────────────────────────────── */
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
    { href: '#kontakt', label: 'Kontakt' },
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
          <a href="#" className="nav-logo" aria-label="Bodensee BauPartner">
            <img src="/logo.png" alt="Bodensee BauPartner" style={{ height: 52, width: 'auto' }} />
          </a>

          <div className="nav-links">
            {/* Leistungen mit Dropdown */}
            <div
              className="nav-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <a href="#leistungen" className={dropdownOpen ? 'active' : ''}>
                Leistungen
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="nav-dropdown-menu"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
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

          <motion.a
            href="#kontakt"
            className="nav-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Projekt anfragen
            <span className="nav-cta-dot">
              <svg width="9" height="9" viewBox="0 0 9 9"><path d="M1 4.5h7m0 0L5 1.5m3 3L5 7.5" stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </span>
          </motion.a>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l12 12M16 4L4 16"/>
              </svg>
            ) : (
              <><span /><span /><span /></>
            )}
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
            <div className="mobile-leistungen-sub">
              {leistungenItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="mobile-leistungen-item"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <span className="nav-dropdown-dot" />
                  {item.label}
                </motion.a>
              ))}
            </div>
            <div className="mobile-leistungen-sub mobile-other-links">
              {otherLinks.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="mobile-leistungen-item"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: leistungenItems.length * 0.04 + i * 0.04 }}
                >
                  <span className="nav-dropdown-dot" />
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <header className="hero" ref={ref}>
      <motion.div className="hero-image" style={{ y: imageY }}>
        <Image
          src="/hero.png"
          alt="Bauprojekt am Bodensee"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center right' }}
          priority
        />
      </motion.div>

      <div className="wrap">
        <div className="hero-inner">
          <motion.div
            className="hero-text"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div className="eyebrow" variants={fadeUp}>
              <span className="bullet" />
              Ihr Bau-Vermittler am Bodensee
            </motion.div>

            <motion.h1 variants={fadeUp}>
              Bauen mit <em>Vertrauen</em> — am Bodensee
            </motion.h1>

            <motion.p className="hero-sub" variants={fadeUp}>
              Bodensee BauPartner vermittelt Privatkunden und Bauherren am Bodensee kostenlos geprüfte Fachbetriebe – für Hochbau, Tiefbau, Sanitär, Innenausbau und Renovierung. Schnell, transparent und persönlich: Wir finden den richtigen Handwerker für Ihr Vorhaben.
            </motion.p>

            <motion.div className="hero-ctas" variants={fadeUp}>
              <motion.a
                href="#kontakt"
                className="btn btn-primary"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Projekt anfragen
                <span className="btn-dot">
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
              </motion.a>
              <motion.a
                href="#leistungen"
                className="btn btn-ghost"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Unsere Leistungen
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

/* ── Stats Bar ───────────────────────────────────────────────────────────── */
const stats = [
  { value: '50+', label: 'Geprüfte Partnerfirmen' },
  { value: '5', label: 'Leistungsbereiche' },
  { value: '0 €', label: 'Vermittlungskosten' },
  { value: '100%', label: 'Kostenlos & unverbindlich' },
]

function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="wrap">
        <motion.div
          className="stats-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} className="stat-item" variants={fadeUp}>
              {i > 0 && <div className="stat-divider" />}
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Intro / Über uns ────────────────────────────────────────────────────── */
const valueCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Geprüfte Partnerbetriebe',
    desc: 'Jedes Unternehmen in unserem Netzwerk wurde auf Zuverlässigkeit, Qualifikation und Meisterhaftigkeit geprüft.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Regional & persönlich',
    desc: 'Unser Sitz ist in Überlingen. Wir kennen die Region und die Handwerker — für kurze Wege und schnelle Reaktion.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Schnelle Vermittlung',
    desc: 'Innerhalb eines Werktags bringen wir Sie mit dem passenden Fachbetrieb zusammen — ohne lange Wartezeiten.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/>
      </svg>
    ),
    title: 'Kostenlos & unverbindlich',
    desc: 'Unsere Vermittlung ist für Sie vollständig kostenlos. Kein Risiko, keine versteckten Kosten.',
  },
]

function Intro() {
  return (
    <section className="intro" id="ueber">
      <div className="wrap">
        <motion.div
          className="intro-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="intro-left" variants={fadeUp}>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span className="bullet" /> Über uns
            </div>
            <h2>Ein verlässlicher Partner für anspruchsvolle <em>Bauprojekte</em> in der Region.</h2>
          </motion.div>

          <motion.div className="intro-right" variants={fadeUp}>
            <p>
              Bodensee BauPartner ist Ihr persönlicher Bau-Vermittler im Bodenseekreis. Wir verbinden Bauherren und Privatkunden mit den besten geprüften Fachbetrieben der Region — für Hoch- und Tiefbau, Sanierung, Innenausbau und mehr.
            </p>
            <p>
              Keine endlose Recherche, kein Angebotsvergleichsstress. Schildern Sie uns Ihr Vorhaben — wir finden den passenden Partner und begleiten Sie von der ersten Anfrage bis zur Auftragserteilung. Kostenlos und unverbindlich.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="value-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {valueCards.map(c => (
            <motion.div key={c.title} className="value-card" variants={fadeUp} whileHover={{ y: -4 }}>
              <div className="value-icon">{c.icon}</div>
              <div className="value-title">{c.title}</div>
              <div className="value-desc">{c.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Leistungen ──────────────────────────────────────────────────────────── */
const leistungen = [
  {
    featured: true,
    href: '/leistungen/hochbau',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 19h16"/><path d="M5 19V9l6-5 6 5v10"/><rect x="8" y="12" width="6" height="7"/>
      </svg>
    ),
    title: 'Hochbau',
    desc: 'Vom Rohbau bis zur Fassade — Ihr Bauprojekt in erfahrenen Händen.',
    items: ['Rohbau & Stahlbetonbau', 'Mauerwerk & Tragwände', 'Deckenkonstruktionen', 'Fassaden & Außenwände', 'Treppen & Balkone'],
  },
  {
    featured: false,
    href: '/leistungen/tiefbau',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="16" height="16" rx="1"/><path d="M3 11h16M11 3v16"/>
      </svg>
    ),
    title: 'Tiefbau',
    desc: 'Fundament für jedes Bauwerk — solide Basis für Ihr Projekt.',
    items: ['Erdarbeiten & Aushub', 'Fundamentierung & Bodenplatte', 'Kanal- & Leitungsbau', 'Straßen- & Wegebau', 'Hangsicherung & Spundwände'],
  },
  {
    featured: false,
    href: '/leistungen/bad-sanitaer',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
      </svg>
    ),
    title: 'Bad & Sanitär',
    desc: 'Moderne Badezimmer und Sanitäranlagen — funktional und stilvoll.',
    items: ['Badplanung & Gestaltung', 'Sanitärinstallation', 'Fliesen & Abdichtung', 'Wanne, Dusche & WC', 'Heizung & Warmwasser'],
  },
  {
    featured: false,
    href: '/leistungen/innenausbau',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 17v2M16 17v2M2 12h20"/>
      </svg>
    ),
    title: 'Innenausbau',
    desc: 'Vom Rohbau zum fertigen Innenraum — qualitativ und termingerecht.',
    items: ['Trockenbau & Wände', 'Bodenbeläge & Parkett', 'Deckengestaltung', 'Türen & Fenster', 'Malerarbeiten'],
  },
  {
    featured: false,
    href: '/leistungen/renovierung-sanierung',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: 'Renovierung & Sanierung',
    desc: 'Bestand modernisieren, Wert steigern — mit Fingerspitzengefühl.',
    items: ['Gebäudesanierungen', 'Energetische Modernisierung', 'Erweiterungsbauten', 'Dach- & Fassadensanierung', 'Umbau & Rückbau'],
  },
]

function Leistungen() {
  return (
    <section className="leistungen" id="leistungen">
      <div className="wrap">
        <motion.div
          className="leistungen-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="bullet" /> Leistungen
            </div>
            <h2>Kompetenz in allen <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Gewerken</em>.</h2>
          </motion.div>
          <motion.p className="head-desc" variants={fadeUp}>
            Von der Erdarbeit bis zur schlüsselfertigen Übergabe — wir decken alle Phasen Ihres Bauprojekts ab.
          </motion.p>
        </motion.div>

        <motion.div
          className="leistungen-grid"
          variants={staggerSlow}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {leistungen.map(l => (
            <motion.a
              key={l.title}
              href={l.href}
              className={`leistung${l.featured ? ' featured' : ''}`}
              variants={fadeUp}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <div className="leistung-icon">{l.icon}</div>
              <h3>{l.title}</h3>
              <p className="ldesc">{l.desc}</p>
              <ul className="llist">
                {l.items.map(item => <li key={item}>{item}</li>)}
              </ul>
              <div className="leistung-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 7h12m0 0L9 3m4 4L9 11" stroke="currentColor" fill="none" strokeWidth="1.5"/></svg>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Prozess ─────────────────────────────────────────────────────────────── */
const prozessSteps = [
  { num: '01', title: 'Beratung & Planung', desc: 'Gemeinsam klären wir Ihre Anforderungen, den Umfang und die technischen Möglichkeiten Ihres Projekts.' },
  { num: '02', title: 'Angebot & Kalkulation', desc: 'Sie erhalten ein detailliertes Leistungsverzeichnis mit transparenter, verbindlicher Kalkulation.' },
  { num: '03', title: 'Ausführung', desc: 'Unser erfahrenes Team setzt Ihr Projekt termingerecht und nach höchsten Qualitätsstandards um.' },
  { num: '04', title: 'Abnahme & Übergabe', desc: 'Nach sorgfältiger Endkontrolle und gemeinsamer Abnahme übergeben wir Ihr fertiggestelltes Objekt.' },
]

function Prozess() {
  return (
    <section className="prozess-section">
      <div className="wrap">
        <motion.div
          className="prozess"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        >
          <div className="prozess-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>
                <span className="bullet" /> Prozess
              </div>
              <h2>In vier Schritten zu Ihrem <em style={{ fontStyle: 'italic', color: 'var(--accent-soft)' }}>Bauprojekt</em>.</h2>
            </div>
            <p className="prozess-lead">
              Wir machen den Bauprozess so klar und reibungslos wie möglich — von der ersten Idee bis zur Schlüsselübergabe.
            </p>
          </div>

          <motion.div
            className="prozess-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            {prozessSteps.map(s => (
              <motion.div key={s.num} className="prozess-step" variants={fadeUp}>
                <div className="prozess-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── CTA Band ────────────────────────────────────────────────────────────── */
function CTABand() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        >
          <div>
            <h2>Bereit, Ihr Projekt <em>zu starten?</em></h2>
            <p className="cta-desc">
              Erzählen Sie uns von Ihrem Vorhaben — wir melden uns innerhalb eines Werktags mit einer ersten Einschätzung. Unverbindlich und kostenlos.
            </p>
            <div className="cta-btns">
              <motion.a
                href="#kontakt"
                className="btn btn-primary"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Projekt anfragen
                <span className="btn-dot">
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
              </motion.a>
              <motion.a
                href="tel:+4915256311690"
                className="btn btn-ghost"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Direkt anrufen
              </motion.a>
            </div>
          </div>

          <div className="cta-visual">
            <div className="cta-panel">
              {[
                { label: 'Reaktionszeit', value: 'Innerhalb 24h' },
                { label: 'Erstgespräch', value: '0 € · unverbindlich' },
                { label: 'Einsatzgebiet', value: 'Bodensee · DACH' },
                { label: 'Verfügbarkeit', value: <><span className="status-dot" />Jetzt anfragen</>, },
              ].map(r => (
                <div key={r.label} className="cta-row">
                  <span className="rlabel">{r.label}</span>
                  <span className="rval">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Kontakt / Formular ──────────────────────────────────────────────────── */
const projektTypen = ['Hochbau / Rohbau', 'Tiefbau', 'Bad & Sanitär', 'Innenausbau', 'Renovierung & Sanierung', 'Dach & Fassade', 'Gewerbe', 'Sonstiges']
const zeitrahmen = ['Schnellstmöglich', 'Innerhalb 3 Monate', '6–12 Monate', 'Noch offen']

function Kontakt() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [zeit, setZeit] = useState('')
  const [beschr, setBeschr] = useState('')
  const [ort, setOrt] = useState('')
  const [budget, setBudget] = useState('')
  const [vorname, setVorname] = useState('')
  const [nachname, setNachname] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [dsg, setDsg] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const toggleTyp = (v: string) =>
    setSelected(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])

  const validate = () => {
    const errs: Record<string, string> = {}
    if (step === 1 && selected.length === 0) errs.typ = 'Bitte mindestens eine Kategorie wählen.'
    if (step === 2 && beschr.trim().length < 5) errs.beschr = 'Bitte beschreiben Sie Ihr Vorhaben kurz.'
    if (step === 3) {
      if (!vorname.trim()) errs.vorname = 'Pflichtfeld'
      if (!nachname.trim()) errs.nachname = 'Pflichtfeld'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Bitte gültige E-Mail eingeben.'
      if (!dsg) errs.dsg = 'Bitte Datenschutz bestätigen.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = () => {
    if (!validate()) return
    if (step < 3) { setStep(s => s + 1); return }
    setDone(true)
  }

  const bars = [1, 2, 3]

  return (
    <section className="kontakt" id="kontakt">
      <div className="wrap">
        <motion.div
          className="contact-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="contact-left" variants={fadeUp}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="bullet" /> Kontakt
            </div>
            <h2>Erzählen Sie uns von Ihrem <em>Projekt</em>.</h2>
            <p className="lead">Schildern Sie uns Ihr Vorhaben — wir melden uns innerhalb eines Werktags. Unverbindlich und kostenlos.</p>

            <div className="contact-info">
              {[
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
                  label: 'Telefon',
                  value: <a href="tel:+4915256311690">+49 (0) 152 5631 1690</a>,
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
                  label: 'E-Mail',
                  value: <a href="mailto:info@bodensee-baupartner.de">info@bodensee-baupartner.de</a>,
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
                  label: 'Reaktionszeit',
                  value: 'Innerhalb eines Werktags',
                },
              ].map(item => (
                <div key={item.label} className="contact-info-item">
                  <div className="contact-ico">{item.icon}</div>
                  <div>
                    <div className="clabel">{item.label}</div>
                    <div className="cval">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="contact-form" variants={fadeUp}>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="success-check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 13l5 5 11-12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </motion.div>
                  <h3>Vielen Dank!</h3>
                  <p>Ihre Anfrage ist eingegangen. Wir melden uns innerhalb eines Werktags per Telefon oder E-Mail.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="form-header">
                    <div className="form-title">Projektanfrage</div>
                    <div className="step-meta">Schritt {step} / 3</div>
                  </div>

                  <div className="form-progress">
                    {bars.map(b => (
                      <span
                        key={b}
                        className={b < step ? 'done' : b === step ? 'current' : ''}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      {step === 1 && (
                        <>
                          <div className="form-group">
                            <label className="form-label">Art des Projekts<span className="req">*</span></label>
                            <div className="chip-group">
                              {projektTypen.map(v => (
                                <button
                                  key={v}
                                  type="button"
                                  className={`chip${selected.includes(v) ? ' selected' : ''}`}
                                  onClick={() => toggleTyp(v)}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                            {errors.typ && <div className="form-error-msg">{errors.typ}</div>}
                          </div>
                          <div className="form-group">
                            <label className="form-label">Geplanter Zeitrahmen</label>
                            <div className="chip-group">
                              {zeitrahmen.map(v => (
                                <button
                                  key={v}
                                  type="button"
                                  className={`chip${zeit === v ? ' selected' : ''}`}
                                  onClick={() => setZeit(v)}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <div className="form-group">
                            <label className="form-label" htmlFor="beschr">Beschreiben Sie Ihr Projekt<span className="req">*</span></label>
                            <textarea
                              className={`form-textarea${errors.beschr ? ' error' : ''}`}
                              id="beschr"
                              placeholder="Größe, Besonderheiten, Anforderungen …"
                              value={beschr}
                              onChange={e => setBeschr(e.target.value)}
                            />
                            {errors.beschr && <div className="form-error-msg">{errors.beschr}</div>}
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label" htmlFor="ort">Ort / PLZ</label>
                              <input type="text" className="form-input" id="ort" placeholder="z. B. Friedrichshafen" value={ort} onChange={e => setOrt(e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label className="form-label" htmlFor="budget">Budget (optional)</label>
                              <select className="form-select" id="budget" value={budget} onChange={e => setBudget(e.target.value)}>
                                <option value="">Bitte wählen</option>
                                <option>Unter 50.000 €</option>
                                <option>50.000 – 200.000 €</option>
                                <option>200.000 – 500.000 €</option>
                                <option>500.000 – 1 Mio. €</option>
                                <option>Über 1 Mio. €</option>
                                <option>Noch unklar</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label" htmlFor="vn">Vorname<span className="req">*</span></label>
                              <input type="text" className={`form-input${errors.vorname ? ' error' : ''}`} id="vn" value={vorname} onChange={e => setVorname(e.target.value)} />
                              {errors.vorname && <div className="form-error-msg">{errors.vorname}</div>}
                            </div>
                            <div className="form-group">
                              <label className="form-label" htmlFor="nn">Nachname<span className="req">*</span></label>
                              <input type="text" className={`form-input${errors.nachname ? ' error' : ''}`} id="nn" value={nachname} onChange={e => setNachname(e.target.value)} />
                              {errors.nachname && <div className="form-error-msg">{errors.nachname}</div>}
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label" htmlFor="mail">E-Mail<span className="req">*</span></label>
                              <input type="email" className={`form-input${errors.email ? ' error' : ''}`} id="mail" value={email} onChange={e => setEmail(e.target.value)} />
                              {errors.email && <div className="form-error-msg">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                              <label className="form-label" htmlFor="tel">Telefon</label>
                              <input type="tel" className="form-input" id="tel" placeholder="+49 …" value={telefon} onChange={e => setTelefon(e.target.value)} />
                            </div>
                          </div>
                          <div className="form-group" style={{ marginTop: 8 }}>
                            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--ink-2)', cursor: 'pointer' }}>
                              <input type="checkbox" checked={dsg} onChange={e => setDsg(e.target.checked)} style={{ marginTop: 3 }} />
                              <span style={errors.dsg ? { color: 'var(--accent)' } : {}}>
                                Ich stimme der <a href="/datenschutz" style={{ textDecoration: 'underline' }}>Datenschutzerklärung</a> zu.
                              </span>
                            </label>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="form-back"
                      disabled={step === 1}
                      onClick={() => setStep(s => s - 1)}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12"><path d="M11 6H1m0 0l4-4M1 6l4 4" stroke="currentColor" fill="none" strokeWidth="1.4"/></svg>
                      Zurück
                    </button>
                    <motion.button
                      type="button"
                      className="btn btn-primary"
                      onClick={next}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {step === 3 ? 'Anfrage senden' : 'Weiter'}
                      <span className="btn-dot">
                        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── FAQ ─────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'Kostet mich die Vermittlung etwas?',
    a: 'Nein – unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Wir finanzieren uns durch unsere Partnerfirmen, nicht durch Sie als Auftraggeber.',
  },
  {
    q: 'Wie läuft die Vermittlung konkret ab?',
    a: 'Sie schildern uns kurz Ihr Vorhaben – per Kontaktformular oder Telefon. Wir wählen aus unserem Netzwerk den passenden Fachbetrieb aus, stellen den Kontakt her und übergeben alle relevanten Informationen. Den Rest regeln Sie direkt mit dem Betrieb.',
  },
  {
    q: 'Welche Region deckt ihr ab?',
    a: 'Wir sind auf die gesamte Bodenseeregion spezialisiert – von Konstanz über Überlingen und Friedrichshafen bis nach Lindau. Bei größeren Projekten sprechen Sie uns gerne auch für angrenzende Gebiete an.',
  },
  {
    q: 'Für welche Projekte kann ich euch anfragen?',
    a: 'Wir vermitteln Fachbetriebe für Hochbau (Neubau, Rohbau, Anbau), Tiefbau (Erdarbeiten, Kanal), Bad & Sanitär, Innenausbau sowie Renovierung und Sanierung – egal ob kleines Badezimmer oder großes Neubauprojekt.',
  },
  {
    q: 'Sind die vermittelten Betriebe wirklich geprüft?',
    a: 'Ja. Wir nehmen nicht jeden Betrieb in unser Netzwerk auf. Jedes Unternehmen wird von uns persönlich auf Qualifikation, Zuverlässigkeit und Qualität geprüft – nur wer unsere Standards erfüllt, wird vermittelt.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="faq-section">
      <div className="wrap">
        <motion.div
          className="faq-head"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="eyebrow" style={{ marginBottom: 20 }} variants={fadeUp}>
            <span className="bullet" /> Häufige Fragen
          </motion.div>
          <motion.h2 variants={fadeUp}>
            Alles, was Sie wissen <em>möchten.</em>
          </motion.h2>
        </motion.div>

        <motion.div
          className="faq-list"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} className={`faq-item${open === i ? ' faq-item--open' : ''}`} variants={fadeUp}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{faq.q}</span>
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                  >
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── SEO Text ────────────────────────────────────────────────────────────── */
function SeoText() {
  return (
    <section className="seo-section">
      <div className="wrap">
        <div className="seo-grid">
          <div className="seo-block">
            <h2 className="seo-heading">Handwerker am Bodensee – Ihr regionaler Vermittler</h2>
            <p className="seo-body">
              Die Suche nach einem zuverlässigen Handwerker am Bodensee ist oft zeitaufwendig und nervenraubend. Bodensee BauPartner übernimmt diese Arbeit für Sie: Wir vermitteln geprüfte Fachbetriebe aus der Region – für Hochbau, Tiefbau, Innenausbau, Bad & Sanitär sowie Renovierung und Sanierung. Unser Netzwerk umfasst ausschließlich qualifizierte Unternehmen, die wir persönlich kennen und deren Arbeit wir vertrauen.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Warum Bodensee BauPartner wählen?</h2>
            <p className="seo-body">
              Als lokaler Vermittler kennen wir die Bodenseeregion und ihre Handwerksbetriebe wie unsere Westentasche. Wir prüfen jeden Partnerbetrieb auf Zuverlässigkeit, Fachkompetenz und Qualität – bevor wir ihn empfehlen. Unser Service ist für Sie vollständig kostenlos und unverbindlich. Sie sparen Zeit, vermeiden Fehlentscheidungen und erhalten innerhalb von 24 Stunden eine persönliche Rückmeldung zu Ihrem Bauprojekt.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Unsere Leistungen im Überblick</h2>
            <p className="seo-body">
              Ob Neubau, Rohbau oder Dachausbau im Hochbaubereich, Erdarbeiten und Kanalbau im Tiefbau, moderne Badezimmer durch Bad & Sanitär-Fachbetriebe, oder hochwertige Innenausbauten und Renovierungen – Bodensee BauPartner vermittelt Ihnen den passenden Spezialisten für jedes Vorhaben. Alle Betriebe sind in der Bodenseeregion ansässig und garantieren kurze Wege sowie schnelle Einsatzbereitschaft.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Regional verwurzelt, professionell vernetzt</h2>
            <p className="seo-body">
              Mit unserem Sitz in Überlingen sind wir mitten in der Bodenseeregion beheimatet – von Konstanz über Friedrichshafen bis Lindau. Dieses regionale Netzwerk ermöglicht es uns, Ihnen schnell den richtigen Handwerker zu vermitteln, der Ihr Projekt versteht und Ihre Erwartungen erfüllt. Bodensee BauPartner ist Ihr direkter Draht zu den besten Fachbetrieben der Region.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
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
              Ihr persönlicher Bau-Vermittler in der Bodenseeregion — wir verbinden Sie mit geprüften Fachbetrieben für Ihr Projekt.
            </p>
          </div>
          <div className="footer-col">
            <h5>Leistungen</h5>
            <a href="/leistungen/hochbau">Hochbau</a>
            <a href="/leistungen/tiefbau">Tiefbau</a>
            <a href="/leistungen/bad-sanitaer">Bad & Sanitär</a>
            <a href="/leistungen/innenausbau">Innenausbau</a>
            <a href="/leistungen/renovierung-sanierung">Renovierung & Sanierung</a>
          </div>
          <div className="footer-col">
            <h5>Unternehmen</h5>
            <a href="/ueber-uns">Über uns</a>
            <a href="#kontakt">Kontakt</a>
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

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <Intro />
      <Leistungen />
      <Prozess />
      <CTABand />
      <Kontakt />
      <FAQ />
      <SeoText />
      <Footer />
    </>
  )
}
