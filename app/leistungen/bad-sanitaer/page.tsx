'use client'

import { motion } from 'motion/react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import LeistungRatgeber from '../../components/LeistungRatgeber'
import OrteDerLeistung from '../../components/OrteDerLeistung'

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
        <Image src="/hero.webp" alt="Bad & Sanitär am Bodensee" fill style={{ objectFit: 'cover', objectPosition: 'center right' }} priority />
        <div className="hb-hero-overlay" />
      </div>

      <div className="wrap">
        <motion.div className="hb-hero-inner" variants={stagger} initial="hidden" animate="show">
          <motion.div className="eyebrow hb-eyebrow" variants={fadeUp}>
            <span className="bullet" />
            Vermittlung für Sanitär · Bodenseeregion
          </motion.div>

          <motion.h1 variants={fadeUp}>
            Badsanierung & <em>Sanitär</em>
          </motion.h1>

          <motion.p className="hb-hero-sub" variants={fadeUp}>
            Ihre persönliche Wohlfühloase
          </motion.p>

          <motion.p className="hb-hero-lead" variants={fadeUp}>
            Vom funktionalen Umbau bis zur edlen Wellness-Oase: Wir vermitteln Ihnen regionale Installateure und Fliesenleger für Ihr neues Bad.
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
    detail: 'Ob Dusche, Badewanne, Heizung oder Lüftung — die vermittelten Installationsbetriebe setzen modernste Sanitärtechnik fachgerecht und normkonform um.',
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
    desc: 'Erfahrene Handwerker für Ihr neues Gäste-WC',
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
            <h2>Erfahrene Fachbetriebe für <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Ihr Traumbad</em>.</h2>
          </motion.div>
          <motion.p className="head-desc" variants={fadeUp}>
            Wir verbinden Sie mit Installateuren und Fliesenlegern aus der Region.
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
  { num: '02', title: 'Sanitärbetrieb auswählen', desc: 'Wir wählen den passenden Sanitärbetrieb für Ihr Projekt in der Bodenseeregion aus.' },
  { num: '03', title: 'Kontakt herstellen', desc: 'Wir stellen den Kontakt zwischen Ihnen und dem Fachbetrieb her und übergeben alle relevanten Informationen zu Ihrem Badprojekt.' },
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
    title: 'Regionale Sanitärbetriebe',
    desc: 'Wir vermitteln Ihnen passende Sanitärbetriebe aus der Bodenseeregion.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Saubere Umsetzung',
    desc: 'Die vermittelten Handwerksbetriebe arbeiten akkurat und hinterlassen Ihre Räume nach getaner Arbeit besenrein — ohne Stress für Sie.',
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
              Beschreiben Sie uns Ihr Badprojekt — wir vermitteln Ihnen innerhalb eines Werktags den passenden Sanitärbetrieb. Kostenlos und unverbindlich.
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
    a: 'Eine typische Badsanierung dauert je nach Größe und Umfang zwischen zwei und vier Wochen. Bei aufwendigeren Projekten mit Installationsarbeiten, neuen Leitungen oder barrierefreiem Umbau kann es etwas länger dauern. Der vermittelte Fachbetrieb gibt Ihnen nach der Besichtigung eine verbindliche Zeitplanung.',
  },
  {
    q: 'Was kostet ein neues Badezimmer am Bodensee?',
    a: 'Die Kosten hängen stark von Größe, Materialwahl und Umfang der Arbeiten ab. Ein einfaches Standardbad startet ab ca. 8.000–12.000 €, ein hochwertiges Designbad kann deutlich mehr kosten. Der vermittelte Fachbetrieb erstellt Ihnen ein transparentes Angebot — auf Wunsch als Festpreis.',
  },
  {
    q: 'Welche Sanitärbetriebe vermitteln Sie?',
    a: 'Wir vermitteln Sanitärbetriebe aus der Bodenseeregion. Für Installationsarbeiten an wasser- und gasführenden Leitungen gelten die gesetzlichen Vorgaben der Handwerksordnung, die der jeweils ausführende Betrieb einzuhalten hat.',
  },
  {
    q: 'Kann ich auch ein barrierefreies Bad umbauen lassen?',
    a: 'Absolut. Barrierefreier Umbau — bodengleiche Dusche, Haltegriffe, breitere Türen — ist eines unserer häufigsten Vermittlungsthemen. Wir vermitteln spezialisierte Fachbetriebe, die solche Umbauten routiniert und förderfähig umsetzen.',
  },
  {
    q: 'Kann ich während der Badsanierung im Haus wohnen bleiben?',
    a: 'In der Regel ja. Gibt es kein zweites WC oder keine zweite Dusche, lassen sich Übergangslösungen oft mit dem Betrieb abstimmen; die Bauphase mit gesperrtem Bad hängt vom Umfang ab.',
  },
  {
    q: 'Welche Angaben helfen für ein passendes Angebot?',
    a: 'Raummaße, einige Fotos, das ungefähre Baujahr des Hauses und Ihre Wünsche – etwa Dusche statt Wanne oder ein barrierearmes Bad. Damit kann der Betrieb den Besichtigungstermin gezielt vorbereiten.',
  },
  {
    q: 'Was kostet die Vermittlung eines Bad-Fachbetriebs?',
    a: 'Unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe — Sie zahlen keinen Aufschlag und gehen keinerlei Verpflichtung ein.',
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
              {/* Antwort immer im HTML (für Suchmaschinen), nur ausgeblendet, solange zugeklappt */}
              <div className="faq-a" hidden={open !== i}>
                <p>{faq.a}</p>
              </div>
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
              Ein neues Badezimmer ist eines der wirkungsvollsten Wohnprojekte überhaupt — es steigert den Wohnkomfort, den Immobilienwert und die Lebensqualität spürbar. Bodensee BauPartner vermittelt Ihnen Sanitärbetriebe aus der Bodenseeregion: für Badsanierungen, Neuinstallationen, barrierefreie Umbauten und Gäste-WCs. Kostenlos, unverbindlich und mit lokalem Know-how.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Sanitärbetriebe in Überlingen, Friedrichshafen & Konstanz</h2>
            <p className="seo-body">
              Sanitärarbeiten sind handwerklich und rechtlich anspruchsvoll — Wasserschäden, fehlerhafte Installationen und mangelhafte Abdichtungen können teuer werden. Für Installations- und Sanierungsarbeiten an wasserführenden Leitungen gelten die gesetzlichen Vorgaben der Handwerksordnung. Wir vermitteln Betriebe in der gesamten Bodenseeregion.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Barrierefreies Bad & Badsanierung Bodensee</h2>
            <p className="seo-body">
              Ob klassische Badsanierung, modernes Designbad oder barrierefreier Umbau mit bodengleicher Dusche und Haltegriffen — wir vermitteln Ihnen passende Sanitärbetriebe aus der Region. Viele Umbauten sind zudem staatlich förderbar. Die Betriebe beraten Sie zu Umsetzung und Ablauf Ihres Projekts.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Bad & Sanitär Vermittlung Bodensee – So einfach geht's</h2>
            <p className="seo-body">
              Kein stundenlanger Vergleich von Handwerkern, keine unseriösen Angebote: Bodensee BauPartner übernimmt die Suche nach dem richtigen Sanitärbetrieb für Sie. Beschreiben Sie uns Ihr Badprojekt — wir vermitteln Ihnen schnell einen Sanitärbetrieb aus der Region. Die Vermittlung ist für Sie vollständig kostenlos und unverbindlich.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
// aus den sichtbaren FAQ erzeugt — JSON-LD und Seite können nicht auseinanderlaufen
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Badsanierung & Sanitär',
  provider: { '@type': 'Organization', name: 'Bodensee BauPartner GbR', url: 'https://www.bodensee-baupartner.de/' },
  areaServed: { '@type': 'State', name: 'Baden-Württemberg' },
  description: 'Sanitärbetriebe für Badsanierung, barrierefreies Bad & Badezimmer-Renovierung am Bodensee. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.bodensee-baupartner.de/' },
    { '@type': 'ListItem', position: 2, name: 'Badsanierung & Sanitär', item: 'https://www.bodensee-baupartner.de/leistungen/bad-sanitaer/' },
  ],
}

export default function BadSanitaerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav aktuelleLeistung="/leistungen/bad-sanitaer/" />
      <Hero />
      <Services />
      <Prozess />
      <Warum />
      <CTABand />
      <LeistungRatgeber leistung="bad-sanitaer" />
      <OrteDerLeistung leistung="bad-sanitaer" />
      <FAQ />
      <SeoText />
      <Footer />
    </>
  )
}
