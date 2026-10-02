'use client'

import { motion, AnimatePresence } from 'motion/react'
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
        <Image src="/hero.webp" alt="Renovierung & Sanierung am Bodensee" fill style={{ objectFit: 'cover', objectPosition: 'center right' }} priority />
        <div className="hb-hero-overlay" />
      </div>

      <div className="wrap">
        <motion.div className="hb-hero-inner" variants={stagger} initial="hidden" animate="show">
          <motion.div className="eyebrow hb-eyebrow" variants={fadeUp}>
            <span className="bullet" />
            Vermittlung für Sanierung · Bodenseeregion
          </motion.div>

          <motion.h1 variants={fadeUp}>
            Renovierung & <em>Sanierung</em>
          </motion.h1>

          <motion.p className="hb-hero-sub" variants={fadeUp}>
            Werte erhalten, Zukunft bauen
          </motion.p>

          <motion.p className="hb-hero-lead" variants={fadeUp}>
            Werte erhalten und Energiekosten senken. Wir vermitteln Ihnen Sanierungs-Profis, die Ihre Bestandsimmobilie nach modernsten Standards aufwerten – sicher, transparent und stressfrei.
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
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: 'Komplett- & Kernsanierung',
    desc: 'Erfahrene Profis für Komplett- & Kernsanierungen',
    detail: 'Ob Kernsanierung eines Altbaus oder komplette Modernisierung — wir vermitteln erfahrene Generalunternehmer, die alle Gewerke koordinieren.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M12 6v6l4 2" />
        <path d="M2 12h4M18 12h4M12 2v4M12 18v4" />
      </svg>
    ),
    title: 'Energetische Sanierung',
    desc: 'Erfahrene Fachbetriebe für energetisches Sanieren',
    detail: 'Dämmung, neue Fenster und Heiztechnik — die vermittelten Fachbetriebe senken Ihren Energieverbrauch nachhaltig und helfen bei der Beantragung von Fördermitteln.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
        <path d="M3 9h18" />
      </svg>
    ),
    title: 'Dach & Fassade',
    desc: 'Fachbetriebe für moderne Dächer & Fassaden',
    detail: 'Neues Dach, Fassadendämmung oder Außenputz — unsere Fachbetriebe schützen Ihre Immobilie langfristig vor Witterung und steigern gleichzeitig den Wert.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01M15 9h.01" />
        <path d="M12 6v1M12 17v1M6 12h1M17 12h1" />
      </svg>
    ),
    title: 'Heizungsaustausch',
    desc: 'Regionale Fachbetriebe für den Heizungsaustausch',
    detail: 'Wärmepumpe, Pelletheizung oder Fernwärme-Anschluss — wir vermitteln Heizungsbauer, die die passende Lösung für Ihr Gebäude installieren und in Betrieb nehmen.',
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
            <h2>Erfahrene Fachbetriebe für <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Ihre Sanierung</em>.</h2>
          </motion.div>
          <motion.p className="head-desc" variants={fadeUp}>
            Wir verbinden Sie mit Sanierungs-Spezialisten aus der Region — passend zu Ihrer Immobilie.
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
  { num: '01', title: 'Sanierungsbedarf beschreiben', desc: 'Sie schildern uns Ihr Vorhaben — Komplettsanierung, energetische Modernisierung, Dach, Fassade oder Heizungsaustausch — mit Gebäudeart, Zustand und Ziel.' },
  { num: '02', title: 'Experten auswählen', desc: 'Wir wählen den passenden Sanierungs-Fachbetrieb aus — mit Erfahrung in Ihrer Sanierungsart und idealerweise Fördermittelkenntnissen.' },
  { num: '03', title: 'Kontakt herstellen', desc: 'Wir stellen den Kontakt her und übergeben alle relevanten Informationen, damit der Fachbetrieb gut vorbereitet zu Ihnen kommt.' },
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
              <h2>In vier Schritten zu Ihrem <em style={{ fontStyle: 'italic', color: 'var(--accent-soft)' }}>Sanierungs-Experten</em>.</h2>
            </div>
            <p className="prozess-lead">
              Von der Bedarfsanalyse bis zum Sanierungsstart — wir finden den richtigen Fachbetrieb und begleiten Sie durch den ersten Schritt.
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
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Nachhaltige Wertsteigerung',
    desc: 'Die vermittelten Sanierungsbetriebe setzen auf langlebige Materialien und zukunftssichere Technik — für eine Immobilie, die dauerhaft im Wert steigt.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
      </svg>
    ),
    title: 'Fachbetriebe für Fördermittel-Beratung',
    desc: 'Viele Sanierungen werden staatlich gefördert. Wir vermitteln Betriebe, die Sie bei KfW- und BAFA-Anträgen kompetent begleiten.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
        <path d="M13 13h4M13 17h4" />
      </svg>
    ),
    title: 'Transparente Planung',
    desc: 'Klare Leistungsbeschreibungen, verbindliche Angebote und eine offene Kommunikation während des gesamten Projekts — damit Sie jederzeit den Überblick behalten.',
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
              Bauen im Bestand erfordert ganz besondere Expertise. Anstatt unzählige Firmen anzufragen, bringen wir Sie direkt mit den Experten zusammen, die Ihr Haus nachhaltig und fachgerecht modernisieren.
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
            <h2>Bereit für Ihre <em>Sanierung?</em></h2>
            <p className="cta-desc">
              Schildern Sie uns Ihr Vorhaben — wir vermitteln Ihnen innerhalb eines Werktags den passenden Sanierungs-Experten. Kostenlos und unverbindlich.
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
    q: 'Welche staatlichen Förderungen gibt es für Sanierungen am Bodensee?',
    a: 'Für energetische Sanierungen stehen verschiedene Förderprogramme zur Verfügung: KfW-Bundesförderung für effiziente Gebäude (BEG), BAFA-Zuschüsse für Heizungsaustausch und Dämmmaßnahmen sowie ggf. Landesmittel in Baden-Württemberg. Welche Programme und Bedingungen aktuell gelten, erfahren Sie bei KfW, BAFA und L-Bank sowie bei einer Energieberatung.',
  },
  {
    q: 'Was ist eine Kernsanierung und wann lohnt sie sich?',
    a: 'Bei einer Kernsanierung wird ein Gebäude bis auf die tragende Struktur zurückgebaut und vollständig modernisiert — Elektrik, Sanitär, Heizung, Dämmung, Innenausbau. Das lohnt sich besonders bei stark veralteten Gebäuden, wenn Einzelmaßnahmen wirtschaftlich nicht sinnvoll wären oder wenn ein Altbau auf den Stand eines Neubaus gebracht werden soll.',
  },
  {
    q: 'Wie viel kann ich durch eine energetische Sanierung sparen?',
    a: 'Das hängt vom Ausgangszustand des Gebäudes und den durchgeführten Maßnahmen ab. Wie viel Energie sich in Ihrem Haus einsparen lässt, beziffert ein individueller Sanierungsfahrplan der Energieberatung. Häufig betrachtet werden Dach- und Fassadendämmung, Fenster und die Heizung.',
  },
  {
    q: 'Können die vermittelten Betriebe bei KfW- und BAFA-Anträgen helfen?',
    a: 'Ja. Für viele KfW-Förderungen ist die Einbindung eines Energieeffizienz-Experten Voraussetzung. Wenn Sie eine Förderung planen, nennen Sie das in Ihrer Anfrage – wir berücksichtigen es bei der Auswahl des Betriebs.',
  },
  {
    q: 'In welcher Reihenfolge wird ein Haus sinnvoll saniert?',
    a: 'Häufig zuerst die Gebäudehülle (Dach, Fassade, Fenster), danach die Haustechnik – so lässt sich die Heizung auf den geringeren Wärmebedarf auslegen. Ein Sanierungsfahrplan der Energieberatung legt die Reihenfolge für Ihr Haus fest.',
  },
  {
    q: 'Muss ich im Altbau mit Schadstoffen rechnen?',
    a: 'Je nach Baujahr können Baustoffe wie asbesthaltige Platten oder belastete Kleber verbaut sein. Eine Bestandsaufnahme vor Beginn klärt das; der Umgang damit unterliegt besonderen Vorschriften.',
  },
  {
    q: 'Was kostet die Vermittlung eines Sanierungs-Fachbetriebs?',
    a: 'Unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe — Sie zahlen keinen Aufschlag auf das Handwerkerangebot und gehen keinerlei Verpflichtung ein.',
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
            Ihre Fragen zu <em>Renovierung & Sanierung.</em>
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
            <h2 className="seo-heading">Renovierung & Sanierung am Bodensee – Ihr regionaler Vermittler</h2>
            <p className="seo-body">
              Eine Sanierung ist eine der bedeutendsten Investitionen in Ihre Immobilie — sie schützt den Bestand, senkt Energiekosten und steigert den Wert nachhaltig. Bodensee BauPartner vermittelt Ihnen erfahrene Sanierungs-Fachbetriebe aus der Bodenseeregion: für Kernsanierungen, energetische Modernisierungen, Dach- und Fassadenarbeiten sowie Heizungsaustausch. Kostenlos und unverbindlich.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Energetische Sanierung Bodensee – Förderungen optimal nutzen</h2>
            <p className="seo-body">
              Die Anforderungen an die Energieeffizienz von Gebäuden steigen — und damit auch die staatlichen Förderanreize. Durch KfW-Bundesförderung (BEG), BAFA-Zuschüsse und Landesförderprogramme in Baden-Württemberg können Sanierungsmaßnahmen erheblich bezuschusst werden. Wir vermitteln Fachbetriebe mit nachgewiesener Erfahrung in der energetischen Sanierung und Fördermittelbeantragung — in Überlingen, Friedrichshafen, Konstanz und der gesamten Region.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Kernsanierung & Altbaumodernisierung in der Bodenseeregion</h2>
            <p className="seo-body">
              Altbauten am Bodensee haben oft enormes Potenzial — mit der richtigen Sanierung werden sie zu modernen, energieeffizienten Wohngebäuden. Die von uns vermittelten Fachbetriebe für Kernsanierungen und Altbaumodernisierungen koordinieren alle Gewerke, von der Elektroinstallation über neue Sanitäranlagen bis hin zu Dämmung und Innenausbau.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Heizungsaustausch & Dachsanierung Bodensee – Zukunftssicher investieren</h2>
            <p className="seo-body">
              Wärmepumpe, Pelletheizung oder Fernwärme-Anschluss — der Heizungsaustausch ist eine der rentabelsten Sanierungsmaßnahmen überhaupt, besonders in Kombination mit staatlichen Förderungen. Gleiches gilt für die Dachsanierung: Ein neues Dach schützt die gesamte Bausubstanz und verbessert die Energiebilanz erheblich. Bodensee BauPartner vermittelt die passenden Spezialisten — kostenlos und regional.
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
  serviceType: 'Renovierung & Sanierung',
  provider: { '@type': 'Organization', name: 'Bodensee BauPartner GbR', url: 'https://www.bodensee-baupartner.de/' },
  areaServed: { '@type': 'State', name: 'Baden-Württemberg' },
  description: 'Sanierungs-Fachbetriebe am Bodensee: Kernsanierung, Heizungsaustausch, Dämmung & KfW-Förderung. Kostenlose Vermittlung durch Bodensee BauPartner GbR.',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Start', item: 'https://www.bodensee-baupartner.de/' },
    { '@type': 'ListItem', position: 2, name: 'Renovierung & Sanierung', item: 'https://www.bodensee-baupartner.de/leistungen/renovierung-sanierung/' },
  ],
}

export default function RenovierungSanierungPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav aktuelleLeistung="/leistungen/renovierung-sanierung" />
      <Hero />
      <Services />
      <Prozess />
      <Warum />
      <CTABand />
      <LeistungRatgeber leistung="renovierung-sanierung" />
      <OrteDerLeistung leistung="renovierung-sanierung" />
      <FAQ />
      <SeoText />
      <Footer />
    </>
  )
}
