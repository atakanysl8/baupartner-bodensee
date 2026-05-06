'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'

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
                        className={`nav-dropdown-item${item.href === '/leistungen/hochbau' ? ' nav-dropdown-item--current' : ''}`}
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
        <Image src="/hero.png" alt="Hochbau am Bodensee" fill style={{ objectFit: 'cover', objectPosition: 'center right' }} priority />
        <div className="hb-hero-overlay" />
      </div>

      <div className="wrap">
        <motion.div
          className="hb-hero-inner"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div className="eyebrow hb-eyebrow" variants={fadeUp}>
            <span className="bullet" />
            Vermittlung für Hochbau · Bodenseeregion
          </motion.div>

          <motion.h1 variants={fadeUp}>
            Hochbau am <em>Bodensee</em>
          </motion.h1>

          <motion.p className="hb-hero-sub" variants={fadeUp}>
            Ihr Fundament für die Zukunft
          </motion.p>

          <motion.p className="hb-hero-lead" variants={fadeUp}>
            Wir nehmen Ihnen die aufwendige Handwerkersuche ab. Von der ersten Steinlegung bis zum geschlossenen Rohbau verbinden wir Sie mit zertifizierten Partnerbetrieben – für höchste Qualität und garantierte Termintreue.
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
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Neubauprojekte',
    desc: 'Renommierte Bauunternehmen für Ihr Neubauprojekt',
    detail: 'Wir vermitteln erfahrene Generalunternehmer und Rohbaufirmen, die Ihr Neubauvorhaben vom ersten Spatenstich bis zur schlüsselfertigen Übergabe begleiten.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M2 10h20" />
      </svg>
    ),
    title: 'Rohbau',
    desc: 'Geprüfte Fachbetriebe für präzisen Rohbau',
    detail: 'Mauerwerk, Stahlbetonbau und Deckenkonstruktionen von spezialisierten Fachbetrieben, die höchste Qualitätsstandards und Termintreue garantieren.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
      </svg>
    ),
    title: 'Anbau & Aufstockung',
    desc: 'Erfahrene Experten für Anbau & Aufstockung',
    detail: 'Ob Seitenanbau, Dachausbau oder Aufstockung — wir finden den richtigen Fachbetrieb für Ihre Erweiterung, der den Bestand schonend integriert.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
        <path d="M3 14h4M17 14h4" />
      </svg>
    ),
    title: 'Mehrfamilienhäuser',
    desc: 'Zuverlässige Partner für Mehrfamilienhäuser',
    detail: 'Für größere Wohnbauprojekte vermitteln wir leistungsstarke Unternehmen mit Erfahrung in der Planung und Ausführung von Mehrfamilien- und Wohnkomplexen.',
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
            <h2>Geprüfte Experten für <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>jeden Hochbau</em>.</h2>
          </motion.div>
          <motion.p className="head-desc" variants={fadeUp}>
            Wir verbinden Sie mit zertifizierten Partnerbetrieben — regional, zuverlässig und passend zu Ihrem Projekt.
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
  { num: '01', title: 'Projekt beschreiben', desc: 'Sie schildern uns kurz Ihr Hochbauvorhaben — Neubau, Anbau oder Aufstockung, Lage, Größe und Zeitplan. Per Formular oder Telefon.' },
  { num: '02', title: 'Partner auswählen', desc: 'Wir wählen aus unserem geprüften Netzwerk den passenden Hochbau-Fachbetrieb für Ihr konkretes Projekt und Ihre Region aus.' },
  { num: '03', title: 'Kontakt herstellen', desc: 'Wir stellen den Kontakt zwischen Ihnen und dem Fachbetrieb her und übergeben alle relevanten Projektinformationen.' },
  { num: '04', title: 'Betreuung & Abschluss', desc: 'Auch nach der Vermittlung bleiben wir Ihr Ansprechpartner und begleiten den sauberen Abschluss Ihres Projekts.' },
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
              <h2>In vier Schritten zu Ihrem <em style={{ fontStyle: 'italic', color: 'var(--accent-soft)' }}>Hochbau-Partner</em>.</h2>
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Geprüfte Fachbetriebe',
    desc: 'Alle Partnerbetriebe durchlaufen unsere Qualitätsprüfung — Zertifikate, Referenzen und Kundenbewertungen inklusive.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Regionale Partner am Bodensee',
    desc: 'Unser Netzwerk besteht aus lokalen Unternehmen der Region — kurze Wege, schnelle Reaktionszeiten, ortskundige Expertise.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
      </svg>
    ),
    title: 'Transparente Preise',
    desc: 'Keine versteckten Kosten: Unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich.',
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
              Der Hochbau ist die Basis Ihres Zuhauses. Als Ihr Vermittler ersparen wir Ihnen den Vergleichsstress und bringen Sie direkt mit den passenden, regionalen Bauunternehmen zusammen. Kostenlos und völlig unverbindlich.
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
            <h2>Bereit für Ihr <em>Hochbauprojekt?</em></h2>
            <p className="cta-desc">
              Schildern Sie uns Ihr Vorhaben — wir vermitteln Ihnen innerhalb eines Werktags den passenden Fachbetrieb. Kostenlos und unverbindlich.
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
    q: 'Was genau vermittelt Bodensee BauPartner im Hochbau?',
    a: 'Wir vermitteln geprüfte Fachbetriebe für alle Hochbauleistungen: Neubauprojekte, Rohbau, Mauerwerk, Stahlbetonbau, Deckenkonstruktionen, Fassaden sowie Anbau und Aufstockung. Sie schildern uns Ihr Vorhaben – wir finden den passenden Betrieb in der Bodenseeregion.',
  },
  {
    q: 'Wie lange dauert ein typischer Rohbau am Bodensee?',
    a: 'Die Dauer eines Rohbaus hängt stark von der Größe und Komplexität des Projekts ab. Ein Einfamilienhaus-Rohbau dauert in der Regel 8–16 Wochen. Unsere Partnerbetriebe geben Ihnen nach einer ersten Projektbeschreibung eine verlässliche Zeitschätzung.',
  },
  {
    q: 'Kann ich für einen Anbau oder eine Aufstockung anfragen?',
    a: 'Ja, absolut. Anbau, Aufstockung und Dachausbau gehören ebenfalls zu unserem Vermittlungsangebot. Wir finden spezialisierte Betriebe, die den Bestand schonend berücksichtigen und die neue Bausubstanz nahtlos integrieren.',
  },
  {
    q: 'Brauche ich für einen Neubau eine Baugenehmigung?',
    a: 'In der Regel ja. Für Neubauten, Anbauten und Aufstockungen ist in Baden-Württemberg eine Baugenehmigung erforderlich. Unsere Partnerbetriebe kennen die regionalen Vorschriften und unterstützen Sie bei der Vorbereitung der erforderlichen Unterlagen.',
  },
  {
    q: 'Was kostet mich die Vermittlung eines Hochbau-Betriebs?',
    a: 'Unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Wir finanzieren uns über unsere Partnerfirmen – Sie zahlen keinen Aufschlag und haben keinerlei Verpflichtung.',
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
            Ihre Fragen zum <em>Hochbau.</em>
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
            <h2 className="seo-heading">Hochbau am Bodensee – Ihr Vermittler für Neubau & Rohbau</h2>
            <p className="seo-body">
              Ein Hochbauprojekt am Bodensee ist eine der größten Investitionen im Leben. Ob Neubau, Rohbau oder Aufstockung – die Wahl des richtigen Fachbetriebs entscheidet über Qualität, Termine und Budget. Bodensee BauPartner übernimmt die aufwendige Suche für Sie: Wir vermitteln ausschließlich geprüfte Hochbaufirmen aus der Bodenseeregion, die wir persönlich kennen und deren Arbeit wir vertrauen.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Geprüfte Rohbaufirmen in der Bodenseeregion</h2>
            <p className="seo-body">
              Der Rohbau bildet das Fundament jedes Hochbauprojekts – hier darf keine Kompromisse eingegangen werden. Unsere Partnerbetriebe für Rohbau am Bodensee verfügen über langjährige Erfahrung in Mauerwerk, Stahlbetonbau und Deckenkonstruktionen. Alle Unternehmen sind regional ansässig, kennen die lokalen Bauvorschriften und garantieren kurze Reaktionszeiten.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Neubau planen in Überlingen, Friedrichshafen & Konstanz</h2>
            <p className="seo-body">
              Von Konstanz über Überlingen und Friedrichshafen bis Lindau – unser Netzwerk deckt die gesamte Bodenseeregion ab. Egal ob Einfamilienhaus, Doppelhaus oder Mehrfamilienhaus: Wir finden den passenden Hochbaubetrieb für Ihr Projekt. Beschreiben Sie uns Ihr Vorhaben, wir vermitteln den richtigen Partner – kostenlos und unverbindlich.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Hochbau-Vermittlung – so einfach geht's</h2>
            <p className="seo-body">
              Projekt beschreiben, Partner erhalten, loslegen: Bodensee BauPartner macht die Handwerkersuche für Hochbauprojekte einfach und effizient. Statt stundenlanger Recherche erhalten Sie schnell einen geprüften Fachbetrieb aus Ihrer Region vermittelt. Unsere Vermittlung ist für Sie vollständig kostenlos – wir arbeiten ausschließlich mit Partnerbetrieben zusammen, die unsere Qualitätsstandards erfüllen.
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
export default function HochbauPage() {
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
