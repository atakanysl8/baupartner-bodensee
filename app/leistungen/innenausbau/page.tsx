'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const } } }
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const staggerSlow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null)

  return (
    <header className="hb-hero" ref={ref}>
      <div className="hb-hero-image">
        <Image src="/hero.png" alt="Innenausbau am Bodensee" fill style={{ objectFit: 'cover', objectPosition: 'center right' }} priority />
        <div className="hb-hero-overlay" />
      </div>

      <div className="wrap">
        <motion.div className="hb-hero-inner" variants={stagger} initial="hidden" animate="show">
          <motion.div className="eyebrow hb-eyebrow" variants={fadeUp}>
            <span className="bullet" />
            Vermittlung für Innenausbau · Bodenseeregion
          </motion.div>

          <motion.h1 variants={fadeUp}>
            Innen&shy;<em>ausbau</em>
          </motion.h1>

          <motion.p className="hb-hero-sub" variants={fadeUp}>
            Räume neu erleben am Bodensee
          </motion.p>

          <motion.p className="hb-hero-lead" variants={fadeUp}>
            Der perfekte Feinschliff für Ihr Zuhause. Wir koordinieren die Suche und vermitteln Ihnen passende Gewerke – damit Ihre Wohnwelten nach Ihren Wünschen entstehen.
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
        <path d="M3 9h18M3 15h18" />
        <path d="M9 3v18M15 3v18" />
      </svg>
    ),
    title: 'Trockenbau',
    desc: 'Präzise Trockenbauer für clevere Raumaufteilung',
    detail: 'Neue Wände, abgehängte Decken oder Nischen — die vermittelten Trockenbau-Fachbetriebe setzen Ihre Raumideen präzise und sauber um, auch bei anspruchsvollen Grundrissen.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="19" width="20" height="3" rx="1" />
        <path d="M4 19V8l4-4 4 4 4-4 4 4v11" />
      </svg>
    ),
    title: 'Böden',
    desc: 'Fachbetriebe für Parkett, Fliesen & edle Böden',
    detail: 'Von Echtholzparkett über großformatige Fliesen bis zum Designboden — wir finden den Verlege-Spezialisten, der Ihren Boden perfekt in Szene setzt.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M12 6v6l4 2" />
        <path d="M4 4l16 16" />
      </svg>
    ),
    title: 'Maler & Wände',
    desc: 'Maler & Profis für makellose Wände und Decken',
    detail: 'Ob klassischer Anstrich, Putzstruktur oder edle Tapete — die vermittelten Maler-Fachbetriebe liefern ein sauberes, gleichmäßiges Ergebnis, das Ihr Interieur zum Strahlen bringt.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
        <path d="M12 2v7" />
      </svg>
    ),
    title: 'Dachgeschossausbau',
    desc: 'Spezialisten für Ihren Dachgeschossausbau',
    detail: 'Ungenutzte Dachfläche in echten Wohnraum verwandeln — mit Fachleuten für Dämmung, Dachfenster und den kompletten Ausbau unter dem Dach.',
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
            <h2>Erfahrene Fachbetriebe für <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>jeden Raum</em>.</h2>
          </motion.div>
          <motion.p className="head-desc" variants={fadeUp}>
            Wir verbinden Sie mit Innenausbau-Handwerkern aus der Region.
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
  { num: '01', title: 'Projekt beschreiben', desc: 'Sie schildern uns Ihr Innenausbauvorhaben — Trockenbau, Böden, Malerarbeiten oder Dachgeschossausbau — mit Raumgröße, Stil und Zeitplan.' },
  { num: '02', title: 'Spezialisten auswählen', desc: 'Je nach Gewerk wählen wir den passenden Innenausbau-Fachbetrieb aus der Bodenseeregion aus.' },
  { num: '03', title: 'Kontakt herstellen', desc: 'Wir stellen den Kontakt zwischen Ihnen und dem Fachbetrieb her und übergeben alle relevanten Projektinformationen — damit nichts zweimal erklärt werden muss.' },
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
              <h2>In vier Schritten zu Ihrem <em style={{ fontStyle: 'italic', color: 'var(--accent-soft)' }}>Innenausbau-Profi</em>.</h2>
            </div>
            <p className="prozess-lead">
              Vom ersten Gespräch bis zum fertigen Raum — wir übernehmen die Handwerkersuche, damit Sie sich auf das Wesentliche konzentrieren können.
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
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Vermittlung aller Innengewerke',
    desc: 'Trockenbau, Malerarbeiten, Bodenbeläge, Elektro — wir finden für jedes Innengewerk den passenden Fachbetrieb.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Regionale Fachbetriebe',
    desc: 'Alle Handwerksbetriebe kommen aus der Bodenseeregion — kurze Anfahrtswege und schnelle Verfügbarkeit inklusive.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Fokus auf Materialqualität',
    desc: 'Wir vermitteln Betriebe, die bei Materialien keine Kompromisse eingehen — für ein Ergebnis, das langfristig Freude macht.',
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
              Der Innenausbau macht aus vier Wänden ein echtes Zuhause. Wir nehmen Ihnen die aufwendige Organisation ab und verbinden Sie direkt mit erstklassigen Trockenbauern, Elektrikern und Bodenlegern.
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
            <h2>Bereit für Ihren <em>Innenausbau?</em></h2>
            <p className="cta-desc">
              Beschreiben Sie uns Ihr Vorhaben — wir vermitteln Ihnen innerhalb eines Werktags den passenden Fachbetrieb. Kostenlos und unverbindlich.
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
    q: 'Welche Innengewerke vermittelt Bodensee BauPartner?',
    a: 'Wir vermitteln Fachbetriebe für alle Innenausbaugewerke: Trockenbau, Bodenbeläge (Parkett, Fliesen, Designboden), Malerarbeiten, Tapezieren, Dachgeschossausbau sowie Türen und Innenverkleidungen. Sie nennen uns Ihr Projekt — wir finden den passenden Spezialisten.',
  },
  {
    q: 'Wie lange dauert ein Dachgeschossausbau?',
    a: 'Die Dauer hängt vom Zustand des Dachstuhls, der gewünschten Ausbaustufe und dem Umfang der Dämmarbeiten ab. Ein durchschnittlicher Dachgeschossausbau dauert zwischen 6 und 14 Wochen. Der vermittelte Fachbetrieb gibt Ihnen nach einer ersten Besichtigung eine verbindliche Zeitplanung.',
  },
  {
    q: 'Kann ich für mehrere Gewerke gleichzeitig anfragen — z. B. Boden und Maler?',
    a: 'Ja, absolut. Wir können für ein Projekt mehrere passende Fachbetriebe vermitteln oder einen Betrieb, der mehrere Gewerke abdeckt. Beschreiben Sie uns einfach alle gewünschten Leistungen — wir koordinieren die Vermittlung.',
  },
  {
    q: 'Was ist der Unterschied zwischen Parkett und Designboden?',
    a: 'Parkett besteht aus echtem Holz und ist besonders langlebig, kann mehrfach abgeschliffen werden und wertet optisch stark auf. Designboden (LVT) ist günstiger, feuchtigkeitsbeständiger und einfacher zu verlegen — ideal für Küche, Bad oder Mietobjekte. Der vermittelte Fachbetrieb berät Sie vor Ort zu den passenden Optionen für Ihre Anforderungen.',
  },
  {
    q: 'Was kostet die Innenausbau-Vermittlung?',
    a: 'Unsere Vermittlung ist vollständig kostenlos und unverbindlich. Sie zahlen keinen Aufschlag auf das Handwerkerangebot. Die Kosten tragen die Fachbetriebe.',
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
            Ihre Fragen zum <em>Innenausbau.</em>
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
            <h2 className="seo-heading">Innenausbau Bodensee – Handwerker für Ihren Wohnraum</h2>
            <p className="seo-body">
              Hochwertiger Innenausbau verwandelt Räume und steigert nachhaltig den Wert Ihrer Immobilie. Ob Trockenbau für neue Raumaufteilungen, edle Bodenbeläge, professionelle Malerarbeiten oder der Ausbau des Dachgeschosses — Bodensee BauPartner vermittelt Ihnen Innenausbau-Fachbetriebe aus der Bodenseeregion. Kostenlos, schnell und unverbindlich.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Trockenbau Bodensee – Neue Räume, neue Möglichkeiten</h2>
            <p className="seo-body">
              Trockenbau ist die wirtschaftlichste Methode, um Grundrisse flexibel anzupassen: neue Wände ziehen, Dachschrägen verkleiden, Nischen gestalten oder Installationskanäle verbergen. Die von uns vermittelten Trockenbau-Fachbetriebe am Bodensee arbeiten präzise, sauber und mit hochwertigen Materialien — von Konstantz bis Lindau. Wir finden den richtigen Betrieb für Ihre Raumidee.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Parkett, Fliesen & Designböden in der Bodenseeregion verlegen lassen</h2>
            <p className="seo-body">
              Der Boden gibt jedem Raum seinen Charakter. Von klassischem Echtholzparkett über großformatige Feinsteinzeug-Fliesen bis hin zu modernen Designböden (LVT) — unsere Verlege-Spezialisten in Überlingen, Friedrichshafen und Konstanz setzen Ihren Boden perfekt in Szene. Wir vermitteln den Betrieb, der zu Ihrem Stil, Budget und Untergrund passt.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Dachgeschossausbau Bodensee – Ungenutzten Raum zu echtem Wohnraum machen</h2>
            <p className="seo-body">
              Ein ausgebautes Dachgeschoss kann den Wohnraum erheblich vergrößern und den Immobilienwert deutlich steigern. Die von uns vermittelten Fachbetriebe am Bodensee planen und realisieren den kompletten Dachausbau — von Dämmung und Dachfenstern über Trockenbau bis hin zu Boden und Anstrich, koordiniert aus einer Hand. Fragen Sie jetzt kostenlos an.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function InnenausbauPage() {
  return (
    <>
      <Nav aktuelleLeistung="/leistungen/innenausbau" />
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
