'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const staggerSlow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
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
                        className={`nav-dropdown-item${item.href === '/leistungen/tiefbau' ? ' nav-dropdown-item--current' : ''}`}
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
            href="/#kontakt"
            className="nav-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
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
            <motion.a href="/#leistungen" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
              Leistungen
            </motion.a>
            <div className="mobile-leistungen-sub">
              {leistungenItems.map((item, i) => (
                <motion.a key={item.label} href={item.href} className="mobile-leistungen-item" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                  <span className="nav-dropdown-dot" />
                  {item.label}
                </motion.a>
              ))}
            </div>
            {otherLinks.map((l, i) => (
              <motion.a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i + 1) * 0.06 + 0.2 }}>
                {l.label}
              </motion.a>
            ))}
            <motion.a href="/#kontakt" className="btn btn-primary" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              Projekt anfragen
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null)

  return (
    <header className="hb-hero" ref={ref}>
      <div className="hb-hero-image">
        <Image src="/hero.png" alt="Tiefbau am Bodensee" fill style={{ objectFit: 'cover', objectPosition: 'center right' }} priority />
        <div className="hb-hero-overlay" />
      </div>

      <div className="wrap">
        <motion.div className="hb-hero-inner" variants={stagger} initial="hidden" animate="show">
          <motion.div className="eyebrow hb-eyebrow" variants={fadeUp}>
            <span className="bullet" />
            Vermittlung für Tiefbau · Bodenseeregion
          </motion.div>

          <motion.h1 variants={fadeUp}>
            Tiefbau & <em>Erdarbeiten</em>
          </motion.h1>

          <motion.p className="hb-hero-sub" variants={fadeUp}>
            Die sichere Basis für Ihr Bauprojekt
          </motion.p>

          <motion.p className="hb-hero-lead" variants={fadeUp}>
            Jedes solide Haus braucht einen starken Grund. Wir bringen Sie mit leistungsstarken Tiefbau-Spezialisten zusammen, die Ihr Grundstück mit modernstem Gerät optimal für den Baustart vorbereiten.
          </motion.p>

          <motion.div className="hero-ctas" variants={fadeUp}>
            <motion.a href="/#kontakt" className="btn btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Kostenlos anfragen
              <span className="btn-dot">
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>
            </motion.a>
            <motion.a href="/" className="btn btn-ghost hb-btn-ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Zur Übersicht
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}

/* ── Services ─────────────────────────────────────────────────────────────── */
const serviceItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M3 12h18M3 18h18" />
        <path d="M6 3v18M18 3v18" />
      </svg>
    ),
    title: 'Erdarbeiten',
    desc: 'Leistungsstarke Tiefbauer für schnelle Erdarbeiten',
    detail: 'Wir vermitteln Spezialisten mit modernem Maschinenpark für Aushub, Planierarbeiten und Geländemodellierung — termingerecht und sauber ausgeführt.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="1" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
        <path d="M12 15v2" />
      </svg>
    ),
    title: 'Baugrubenaushub & Sicherung',
    desc: 'Spezialisten für Baugrubenaushub & Sicherung',
    detail: 'Präziser Aushub und fachgerechte Sicherung von Baugruben — mit modernen Verbau- und Spundwandtechniken für maximale Standsicherheit.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V2M2 12h20" />
        <circle cx="12" cy="12" r="4" />
        <path d="M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
      </svg>
    ),
    title: 'Leitungen & Kanalisation',
    desc: 'Zertifizierte Firmen für Leitungen & Kanalisation',
    detail: 'Kanal-, Wasser- und Leitungsbau von zertifizierten Fachbetrieben — normgerecht, dauerhaft und koordiniert mit Behörden und Netzbetreibern.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="18" width="20" height="3" rx="1" />
        <path d="M6 18V8l6-4 6 4v10" />
        <rect x="9" y="13" width="6" height="5" />
      </svg>
    ),
    title: 'Fundamente',
    desc: 'Erfahrene Meisterbetriebe für stabile Fundamente',
    detail: 'Streifenfundamente, Bodenplatten und Pfahlgründungen von erfahrenen Meisterbetrieben — die solide Basis für jede Bauweise.',
  },
]

function Services() {
  return (
    <section className="hb-services">
      <div className="wrap">
        <motion.div
          className="hb-services-head"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={fadeUp}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="bullet" /> Unsere Vermittlung
            </div>
            <h2>Geprüfte Experten für <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>jeden Tiefbau</em>.</h2>
          </motion.div>
          <motion.p className="head-desc" variants={fadeUp}>
            Wir verbinden Sie mit zertifizierten Tiefbau-Spezialisten — regional verwurzelt, professionell ausgerüstet und zuverlässig im Einsatz.
          </motion.p>
        </motion.div>

        <motion.div
          className="hb-services-grid"
          variants={staggerSlow}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {serviceItems.map((s, i) => (
            <motion.div
              key={s.title}
              className="hb-card"
              variants={fadeUp}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <div className="hb-card-icon">{s.icon}</div>
              <div className="hb-card-num">0{i + 1}</div>
              <h3 className="hb-card-title">{s.title}</h3>
              <p className="hb-card-desc">{s.desc}</p>
              <p className="hb-card-detail">{s.detail}</p>
              <div className="hb-card-cta">
                <a href="/#kontakt" className="hb-card-link">
                  Jetzt anfragen
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10m0 0L7 2m4 4L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Prozess ─────────────────────────────────────────────────────────────── */
const prozessSteps = [
  { num: '01', title: 'Projekt beschreiben', desc: 'Sie schildern uns Ihr Tiefbauvorhaben — Erdarbeiten, Kanalbau, Fundamentierung oder Straßenbau — mit Lage, Umfang und gewünschtem Zeitplan.' },
  { num: '02', title: 'Partner auswählen', desc: 'Wir wählen aus unserem geprüften Netzwerk den passenden Tiefbau-Fachbetrieb für Ihr Projekt in der Bodenseeregion aus.' },
  { num: '03', title: 'Kontakt herstellen', desc: 'Wir stellen den Kontakt zwischen Ihnen und dem Fachbetrieb her und übergeben alle relevanten Projektinformationen.' },
  { num: '04', title: 'Angebot & Start', desc: 'Der Tiefbau-Spezialist meldet sich direkt bei Ihnen, besichtigt bei Bedarf das Gelände und unterbreitet Ihnen ein verbindliches Angebot.' },
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
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <div className="prozess-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>
                <span className="bullet" /> So läuft es ab
              </div>
              <h2>In vier Schritten zu Ihrem <em style={{ fontStyle: 'italic', color: 'var(--accent-soft)' }}>Tiefbau-Partner</em>.</h2>
            </div>
            <p className="prozess-lead">
              Von der ersten Anfrage bis zum passenden Fachbetrieb — wir machen die Vermittlung so einfach und schnell wie möglich.
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

/* ── Warum ────────────────────────────────────────────────────────────────── */
const usps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Partner mit modernem Fuhrpark',
    desc: 'Unsere Tiefbau-Partner arbeiten mit modernstem Gerät — für schnelle Ausführung und saubere Ergebnisse, auch bei anspruchsvollen Böden.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Schnelle Vermittlung',
    desc: 'Innerhalb eines Werktags bringen wir Sie mit dem passenden Tiefbauunternehmen zusammen — kostenlos und vollständig unverbindlich.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Zuverlässige Bauausführung',
    desc: 'Alle Partnerbetriebe sind geprüft, versichert und regional etabliert — für Tiefbauleistungen, auf die Sie sich verlassen können.',
  },
]

function Warum() {
  return (
    <section className="hb-why">
      <div className="wrap">
        <div className="hb-why-inner">
          <motion.div
            className="hb-why-left"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <div className="eyebrow" style={{ marginBottom: 20 }}>
                <span className="bullet" /> Warum wir
              </div>
              <h2>Warum Bodensee <em>BauPartner?</em></h2>
            </motion.div>
            <motion.p className="hb-why-text" variants={fadeUp}>
              Tiefbau verlangt Präzision und Verlässlichkeit. Ohne perfekte Erdarbeiten bleibt kein Haus stabil. Wir vernetzen Sie blitzschnell mit erfahrenen und geprüften Tiefbauern aus der Bodenseeregion.
            </motion.p>
            <motion.a
              href="/#kontakt"
              className="btn btn-primary"
              variants={fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Jetzt kostenlos anfragen
              <span className="btn-dot">
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            className="hb-usp-list"
            variants={staggerSlow}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {usps.map(u => (
              <motion.div key={u.title} className="hb-usp" variants={fadeUp}>
                <div className="hb-usp-icon">{u.icon}</div>
                <div>
                  <div className="hb-usp-title">{u.title}</div>
                  <div className="hb-usp-desc">{u.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── CTA Band ─────────────────────────────────────────────────────────────── */
function CTABand() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <div>
            <h2>Bereit für Ihr <em>Tiefbauprojekt?</em></h2>
            <p className="cta-desc">
              Schildern Sie uns Ihr Vorhaben — wir vermitteln Ihnen innerhalb eines Werktags den passenden Tiefbau-Spezialisten. Kostenlos und unverbindlich.
            </p>
            <div className="cta-btns">
              <motion.a href="/#kontakt" className="btn btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                Jetzt anfragen
                <span className="btn-dot">
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </span>
              </motion.a>
              <motion.a href="tel:+4915752600306" className="btn btn-ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
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
                { label: 'Vermittlung', value: <><span className="status-dot" />Kostenlos</> },
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

/* ── FAQ ─────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'Was zählt alles zum Tiefbau?',
    a: 'Zum Tiefbau gehören alle Arbeiten unterhalb der Erdoberfläche: Erdaushub, Fundamentierung, Bodenplatte, Kanal- und Leitungsbau, Straßen- und Wegebau sowie Hangsicherung und Spundwände. Wir vermitteln Fachbetriebe für alle diese Bereiche.',
  },
  {
    q: 'Brauche ich für Tiefbauarbeiten eine Genehmigung?',
    a: 'Das hängt von Art und Umfang der Arbeiten ab. Für Kanalbauarbeiten, Leitungsverlegungen und größere Erdarbeiten sind in der Regel Genehmigungen und Leitungsauskünfte erforderlich. Unsere Partnerbetriebe kennen die regionalen Vorschriften und begleiten Sie durch den Prozess.',
  },
  {
    q: 'Kann ich für dringende Tiefbauarbeiten — z. B. Kanalschaden — anfragen?',
    a: 'Ja. Melden Sie sich direkt per Telefon, dann können wir schnellstmöglich einen geeigneten Betrieb aus unserem Netzwerk kontaktieren. Für Notfälle empfehlen wir den telefonischen Weg für eine schnellere Reaktion.',
  },
  {
    q: 'Wie läuft die Vermittlung eines Tiefbau-Betriebs ab?',
    a: 'Sie beschreiben uns Ihr Vorhaben — Lage, Umfang und Zeitplan. Wir wählen den passenden geprüften Fachbetrieb aus, stellen den Kontakt her und übergeben alle Informationen. Den Rest klären Sie direkt mit dem Betrieb — schnell, kostenlos und unverbindlich.',
  },
  {
    q: 'Was kostet mich die Tiefbau-Vermittlung?',
    a: 'Unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Wir finanzieren uns über unsere Partnerfirmen — Sie zahlen keinen Aufschlag und gehen keinerlei Verpflichtung ein.',
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
            Ihre Fragen zum <em>Tiefbau.</em>
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
                    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const }}
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
            <h2 className="seo-heading">Tiefbau am Bodensee – Geprüfte Fachbetriebe vermitteln</h2>
            <p className="seo-body">
              Tiefbauarbeiten am Bodensee erfordern erfahrene Spezialisten, die mit dem regionalen Baugrund, den lokalen Vorschriften und den besonderen Anforderungen der Seenähe vertraut sind. Bodensee BauPartner vermittelt Ihnen geprüfte Tiefbau-Fachbetriebe aus der Region — für Erdarbeiten, Fundamentierung, Kanal- und Leitungsbau sowie Straßen- und Wegebau. Kostenlos und unverbindlich.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Erdarbeiten & Fundamentbau in der Bodenseeregion</h2>
            <p className="seo-body">
              Ein solides Fundament ist die Basis jedes Bauwerks. Unsere Partnerbetriebe für Tiefbau am Bodensee verfügen über jahrelange Erfahrung im Umgang mit den unterschiedlichen Bodenverhältnissen der Region — von Kiesböden im Überlingener Raum bis hin zu anspruchsvolleren Untergründen rund um den Bodensee. Wir finden den richtigen Experten für Ihr Vorhaben.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Kanal- & Leitungsbau Bodensee – Zuverlässige Partner</h2>
            <p className="seo-body">
              Ob Neuverlegung, Sanierung oder Reparatur von Kanal- und Versorgungsleitungen — im Tiefbau zählt Präzision. Bodensee BauPartner vernetzt Sie mit Fachbetrieben, die über moderne Technik und langjährige Erfahrung im Kanal- und Leitungsbau in Konstanz, Überlingen, Friedrichshafen und der gesamten Bodenseeregion verfügen.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Tiefbau-Vermittlung – schnell, kostenlos, regional</h2>
            <p className="seo-body">
              Statt stundenlanger Suche nach dem richtigen Tiefbaubetrieb erhalten Sie durch Bodensee BauPartner schnell einen geprüften Fachpartner aus Ihrer Region vermittelt. Unser Netzwerk umfasst spezialisierte Unternehmen für alle Tiefbauleistungen — von der einfachen Erdarbeit bis zum komplexen Infrastrukturprojekt. Ihre Anfrage ist kostenlos und unverbindlich.
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
            <a href="/#kontakt">Kontakt</a>
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

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function TiefbauPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Prozess />
      <Warum />
      <CTABand />
      <FAQ />
      <SeoText />
      <Footer />
    </>
  )
}
