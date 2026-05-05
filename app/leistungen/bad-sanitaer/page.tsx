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
                        className={`nav-dropdown-item${item.href === '/leistungen/bad-sanitaer' ? ' nav-dropdown-item--current' : ''}`}
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
        <Image src="/hero.png" alt="Bad & Sanitär am Bodensee" fill style={{ objectFit: 'cover', objectPosition: 'center right' }} priority />
        <div className="hb-hero-overlay" />
      </div>

      <div className="wrap">
        <motion.div className="hb-hero-inner" variants={stagger} initial="hidden" animate="show">
          <motion.div className="eyebrow hb-eyebrow" variants={fadeUp}>
            <span className="bullet" />
            Vermittlung für Sanitär · Bodenseeregion
          </motion.div>

          <motion.h1 variants={fadeUp}>
            Bad & <em>Sanitär</em>
          </motion.h1>

          <motion.p className="hb-hero-sub" variants={fadeUp}>
            Ihre persönliche Wohlfühloase
          </motion.p>

          <motion.p className="hb-hero-lead" variants={fadeUp}>
            Vom funktionalen Umbau bis zur edlen Wellness-Oase: Wir vermitteln Ihnen die besten regionalen Installateure und Fliesenleger, die Ihr neues Bad termingerecht und absolut sauber realisieren.
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
        <path d="M4 12h16M4 12a8 8 0 008 8M4 12a8 8 0 018-8M20 12a8 8 0 01-8 8M20 12a8 8 0 00-8-8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Badsanierung',
    desc: 'Kreative Fachbetriebe für Ihre Badsanierung',
    detail: 'Wir vermitteln erfahrene Fachbetriebe, die Ihr altes Bad komplett neu gestalten — von der Planung über Fliesen und Armaturen bis zur sauberen Schlussabnahme.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      </svg>
    ),
    title: 'Sanitärtechnik',
    desc: 'Regionale Installateure für modernste Sanitärtechnik',
    detail: 'Ob Dusche, Badewanne, Heizung oder Lüftung — unsere Installateur-Partner setzen modernste Sanitärtechnik fachgerecht und normkonform um.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Barrierefreier Umbau',
    desc: 'Experten für den barrierefreien Badumbau',
    detail: 'Bodengleiche Duschen, Haltegriffe und breitere Türen — wir finden Fachbetriebe, die Ihr Bad sicher und komfortabel für jeden Lebensabschnitt gestalten.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M17 14v7M14 17h7" />
      </svg>
    ),
    title: 'Gäste-WC',
    desc: 'Geprüfte Handwerker für Ihr neues Gäste-WC',
    detail: 'Auch auf kleinem Raum entstehen mit den richtigen Handwerkern funktionale und stilvolle Gäste-WCs — schnell realisiert und auf Wunsch mit stilvollem Design.',
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
            <h2>Geprüfte Experten für <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Ihr Traumbad</em>.</h2>
          </motion.div>
          <motion.p className="head-desc" variants={fadeUp}>
            Wir verbinden Sie mit den besten Installateuren und Fliesenlegern der Region — für ein Bad, das begeistert.
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
  { num: '01', title: 'Badprojekt beschreiben', desc: 'Sie schildern uns Ihr Vorhaben — Badsanierung, Neubad, barrierefreier Umbau oder Gäste-WC — mit Größe, Wunschstil und Budget.' },
  { num: '02', title: 'Meisterbetrieb auswählen', desc: 'Wir wählen aus unserem geprüften Netzwerk den passenden Sanitär-Meisterbetrieb für Ihr Projekt in der Bodenseeregion aus.' },
  { num: '03', title: 'Kontakt herstellen', desc: 'Wir stellen den Kontakt zwischen Ihnen und dem Fachbetrieb her und übergeben alle relevanten Informationen zu Ihrem Badprojekt.' },
  { num: '04', title: 'Besichtigung & Angebot', desc: 'Der Sanitärbetrieb kommt zur Besichtigung, bespricht alle Details vor Ort und unterbreitet Ihnen ein verbindliches Angebot — auf Wunsch als Festpreis.' },
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
              <h2>In vier Schritten zu Ihrem <em style={{ fontStyle: 'italic', color: 'var(--accent-soft)' }}>Bad-Spezialisten</em>.</h2>
            </div>
            <p className="prozess-lead">
              Von der ersten Idee bis zum fertigen Traumbad — wir machen die Handwerkersuche so einfach wie möglich.
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
    title: 'Geprüfte Meisterbetriebe',
    desc: 'Alle Partnerbetriebe sind Meisterbetriebe mit Nachweis — Qualität und Gewährleistung sind damit garantiert.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Saubere Umsetzung',
    desc: 'Unsere Handwerker-Partner arbeiten akkurat und hinterlassen Ihre Räume nach getaner Arbeit besenrein — ohne Stress für Sie.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
      </svg>
    ),
    title: 'Festpreisangebote möglich',
    desc: 'Auf Wunsch vermitteln wir Betriebe, die Ihr Projekt zu einem verbindlichen Festpreis anbieten — volle Kostentransparenz von Anfang an.',
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
              Ein neues Bad ist eine Investition in echte Lebensqualität. Sparen Sie sich die lange Suche nach verfügbaren Handwerkern – wir vermitteln Ihnen die passenden Fachbetriebe für ein stressfreies Projekt.
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
            <h2>Bereit für Ihr <em>Traumbad?</em></h2>
            <p className="cta-desc">
              Beschreiben Sie uns Ihr Badprojekt — wir vermitteln Ihnen innerhalb eines Werktags den passenden Meisterbetrieb. Kostenlos und unverbindlich.
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
    q: 'Wie lange dauert eine komplette Badsanierung?',
    a: 'Eine typische Badsanierung dauert je nach Größe und Umfang zwischen zwei und vier Wochen. Bei aufwendigeren Projekten mit Installationsarbeiten, neuen Leitungen oder barrierefreiem Umbau kann es etwas länger dauern. Unsere Partnerbetriebe geben Ihnen nach der Besichtigung eine verbindliche Zeitplanung.',
  },
  {
    q: 'Was kostet ein neues Badezimmer am Bodensee?',
    a: 'Die Kosten hängen stark von Größe, Materialwahl und Umfang der Arbeiten ab. Ein einfaches Standardbad startet ab ca. 8.000–12.000 €, ein hochwertiges Designbad kann deutlich mehr kosten. Unsere Partnerbetriebe erstellen Ihnen ein transparentes Angebot — auf Wunsch als Festpreis.',
  },
  {
    q: 'Sind die vermittelten Sanitärbetriebe Meisterbetriebe?',
    a: 'Ja. Wir arbeiten ausschließlich mit eingetragenen Sanitär-Meisterbetrieben zusammen. Das ist für uns Pflicht — denn nur Meisterbetriebe dürfen Installationsarbeiten an wasserführenden und gasführenden Leitungen rechtssicher und mit Gewährleistung ausführen.',
  },
  {
    q: 'Kann ich auch ein barrierefreies Bad umbauen lassen?',
    a: 'Absolut. Barrierefreier Umbau — bodengleiche Dusche, Haltegriffe, breitere Türen — ist eines unserer häufigsten Vermittlungsthemen. Wir haben spezialisierte Fachbetriebe im Netzwerk, die solche Umbauten routiniert und förderfähig umsetzen.',
  },
  {
    q: 'Was kostet die Vermittlung eines Bad-Fachbetriebs?',
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
            Ihre Fragen zu <em>Bad & Sanitär.</em>
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
            <h2 className="seo-heading">Badezimmer renovieren am Bodensee – Ihr Vermittler für Bad & Sanitär</h2>
            <p className="seo-body">
              Ein neues Badezimmer ist eines der wirkungsvollsten Wohnprojekte überhaupt — es steigert den Wohnkomfort, den Immobilienwert und die Lebensqualität spürbar. Bodensee BauPartner vermittelt Ihnen geprüfte Sanitär-Meisterbetriebe in der Bodenseeregion: für Badsanierungen, Neuinstallationen, barrierefreie Umbauten und Gäste-WCs. Kostenlos, unverbindlich und mit lokalem Know-how.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Sanitär-Meisterbetriebe in Überlingen, Friedrichshafen & Konstanz</h2>
            <p className="seo-body">
              Sanitärarbeiten sind handwerklich und rechtlich anspruchsvoll — Wasserschäden, fehlerhafte Installationen und mangelhafte Abdichtungen können teuer werden. Deshalb arbeiten wir ausschließlich mit eingetragenen Meisterbetrieben zusammen, die Installations- und Sanierungsarbeiten mit voller Gewährleistung ausführen. Unser Netzwerk umfasst zuverlässige Betriebe in der gesamten Bodenseeregion.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Barrierefreies Bad & Badsanierung Bodensee – Qualität die bleibt</h2>
            <p className="seo-body">
              Ob klassische Badsanierung, modernes Designbad oder barrierefreier Umbau mit bodengleicher Dusche und Haltegriffen — unsere Partnerbetriebe liefern Qualität, die langfristig Freude macht. Viele Umbauten sind zudem staatlich förderbar. Wir vermitteln Betriebe, die Sie dabei kompetent beraten und die Umsetzung sauber und termingerecht abwickeln.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Bad & Sanitär Vermittlung Bodensee – So einfach geht's</h2>
            <p className="seo-body">
              Kein stundenlanger Vergleich von Handwerkern, keine unseriösen Angebote, keine Terminstress: Bodensee BauPartner übernimmt die Suche nach dem richtigen Sanitärbetrieb für Sie. Beschreiben Sie uns Ihr Badprojekt — wir vermitteln Ihnen schnell einen geprüften Meisterbetrieb aus der Region. Die Vermittlung ist für Sie vollständig kostenlos und unverbindlich.
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
export default function BadSanitaerPage() {
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
