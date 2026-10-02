'use client'

// Vorlage für Leistungsseiten — gleiches Markup und gleiche Klassen wie die bestehenden
// Leistungsseiten (z. B. app/leistungen/hochbau/page.tsx), Inhalte aus app/inhalte/leistungsseiten/.
import { motion } from 'motion/react'
import { useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import LeistungRatgeber from './LeistungRatgeber'
import { LEISTUNGEN, type LeistungSlug } from '../inhalte/leistungen'
import HeroBild from './HeroBild'

export type LeistungsInhalt = {
  hero: { eyebrow: string; h1: string; h1Betont: string; unterzeile: string; lead: string; bildAlt: string }
  karten: { h2: string; h2Betont: string; intro: string; liste: { icon: string[]; titel: string; kurz: string; text: string }[] }
  ablauf: { h2Betont: string; schritte: { titel: string; text: string }[] }
  warum: { text: string; usps: { titel: string; text: string }[] }
  cta: { h2: string; h2Betont: string; text: string }
  faqTitel: string
  faqs: { q: string; a: string }[]
  seo: { h2: string; text: string }[]
  beschreibung: string
}

const BASIS = 'https://www.bodensee-baupartner.de'
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as const } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const staggerSlow = { hidden: {}, show: { transition: { staggerChildren: 0.13 } } }
const pfeil = <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" /></svg>
const USP_ICONS = [
  ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
  ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', 'M12 13a3 3 0 100-6 3 3 0 000 6z'],
  ['M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6'],
]
const Icon = ({ d }: { d: string[] }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {d.map((p) => <path key={p} d={p} />)}
  </svg>
)

export default function LeistungSeite({ slug, inhalt }: { slug: LeistungSlug; inhalt: LeistungsInhalt }) {
  const l = LEISTUNGEN[slug]
  const [offen, setOffen] = useState<number | null>(null)
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: inhalt.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@context': 'https://schema.org', '@type': 'Service', serviceType: l.name, provider: { '@type': 'Organization', name: 'Bodensee BauPartner GbR', url: `${BASIS}/` }, areaServed: { '@type': 'State', name: 'Baden-Württemberg' }, description: inhalt.beschreibung },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: `${BASIS}/` },
      { '@type': 'ListItem', position: 2, name: l.name, item: `${BASIS}/leistungen/${slug}/` },
    ] },
  ]

  return (
    <>
      {jsonLd.map((j) => <script key={j['@type']} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(j) }} />)}
      <Nav aktuelleLeistung={`/leistungen/${slug}/`} />

      <header className="hb-hero">
        <div className="hb-hero-image">
          <HeroBild alt={inhalt.hero.bildAlt} />
          <div className="hb-hero-overlay" />
        </div>
        <div className="wrap">
          <motion.div className="hb-hero-inner" variants={stagger} initial="hidden" animate="show">
            <motion.div className="eyebrow hb-eyebrow" variants={fadeUp}><span className="bullet" />{inhalt.hero.eyebrow}</motion.div>
            <motion.h1 variants={fadeUp}>{inhalt.hero.h1} <em>{inhalt.hero.h1Betont}</em></motion.h1>
            <motion.p className="hb-hero-sub" variants={fadeUp}>{inhalt.hero.unterzeile}</motion.p>
            <motion.p className="hb-hero-lead" variants={fadeUp}>{inhalt.hero.lead}</motion.p>
            <motion.div className="hero-ctas" variants={fadeUp}>
              <motion.a href={`/?leistung=${slug}#kontakt`} className="btn btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                Kostenlos anfragen<span className="btn-dot">{pfeil}</span>
              </motion.a>
              <motion.a href="/" className="btn btn-ghost hb-btn-ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>Zur Übersicht</motion.a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <section className="hb-services">
        <div className="wrap">
          <motion.div className="hb-services-head" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <motion.div variants={fadeUp}>
              <div className="eyebrow" style={{ marginBottom: 20 }}><span className="bullet" /> Unsere Vermittlung</div>
              <h2>{inhalt.karten.h2} <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>{inhalt.karten.h2Betont}</em>.</h2>
            </motion.div>
            <motion.p className="head-desc" variants={fadeUp}>{inhalt.karten.intro}</motion.p>
          </motion.div>
          <motion.div className="hb-services-grid" variants={staggerSlow} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {inhalt.karten.liste.map((s, i) => (
              <motion.div key={s.titel} className="hb-card" variants={fadeUp} whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 20 } }}>
                <div className="hb-card-icon"><Icon d={s.icon} /></div>
                <div className="hb-card-num">0{i + 1}</div>
                <h3 className="hb-card-title">{s.titel}</h3>
                <p className="hb-card-desc">{s.kurz}</p>
                <p className="hb-card-detail">{s.text}</p>
                <div className="hb-card-cta">
                  <a href={`/?leistung=${slug}#kontakt`} className="hb-card-link">
                    Jetzt anfragen
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10m0 0L7 2m4 4L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="prozess-section">
        <div className="wrap">
          <motion.div className="prozess" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}>
            <div className="prozess-head">
              <div>
                <div className="eyebrow" style={{ marginBottom: 20 }}><span className="bullet" /> So läuft es ab</div>
                <h2>In vier Schritten zu Ihrem <em style={{ fontStyle: 'italic', color: 'var(--accent-soft)' }}>{inhalt.ablauf.h2Betont}</em>.</h2>
              </div>
              <p className="prozess-lead">Sie schildern Ihr Vorhaben, wir wählen einen passenden Fachbetrieb aus — für Sie kostenlos und unverbindlich.</p>
            </div>
            <motion.div className="prozess-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
              {inhalt.ablauf.schritte.map((s, i) => (
                <motion.div key={s.titel} className="prozess-step" variants={fadeUp}>
                  <div className="prozess-num">0{i + 1}</div>
                  <h3>{s.titel}</h3>
                  <p>{s.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="hb-why">
        <div className="wrap">
          <div className="hb-why-inner">
            <motion.div className="hb-why-left" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <div className="eyebrow" style={{ marginBottom: 20 }}><span className="bullet" /> Warum wir</div>
                <h2>Warum Bodensee <em>BauPartner?</em></h2>
              </motion.div>
              <motion.p className="hb-why-text" variants={fadeUp}>{inhalt.warum.text}</motion.p>
              <motion.a href={`/?leistung=${slug}#kontakt`} className="btn btn-primary" variants={fadeUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                Jetzt kostenlos anfragen<span className="btn-dot">{pfeil}</span>
              </motion.a>
            </motion.div>
            <motion.div className="hb-usp-list" variants={staggerSlow} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
              {inhalt.warum.usps.map((u, i) => (
                <motion.div key={u.titel} className="hb-usp" variants={fadeUp}>
                  <div className="hb-usp-icon"><Icon d={USP_ICONS[i % USP_ICONS.length]} /></div>
                  <div>
                    <div className="hb-usp-title">{u.titel}</div>
                    <div className="hb-usp-desc">{u.text}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <motion.div className="cta-card" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}>
            <div>
              <h2>{inhalt.cta.h2} <em>{inhalt.cta.h2Betont}</em></h2>
              <p className="cta-desc">{inhalt.cta.text}</p>
              <div className="cta-btns">
                <motion.a href={`/?leistung=${slug}#kontakt`} className="btn btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  Jetzt anfragen<span className="btn-dot">{pfeil}</span>
                </motion.a>
                <motion.a href="tel:+4915752600306" className="btn btn-ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>Direkt anrufen</motion.a>
              </div>
            </div>
            <div className="cta-visual">
              <div className="cta-panel">
                {[
                  { label: 'Erstgespräch', value: '0 € · unverbindlich' },
                  { label: 'Einsatzgebiet', value: 'Baden-Württemberg' },
                  { label: 'Fachbetrieb', value: 'Ein Betrieb je Anfrage' },
                  { label: 'Vermittlung', value: <><span className="status-dot" />Kostenlos</> },
                ].map((r) => (
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

      <LeistungRatgeber leistung={slug} />

      <section className="faq-section">
        <div className="wrap">
          <motion.div className="faq-head" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <motion.div className="eyebrow" style={{ marginBottom: 20 }} variants={fadeUp}><span className="bullet" /> Häufige Fragen</motion.div>
            <motion.h2 variants={fadeUp}>Ihre Fragen zu <em>{inhalt.faqTitel}.</em></motion.h2>
          </motion.div>
          <motion.div className="faq-list" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {inhalt.faqs.map((faq, i) => (
              <motion.div key={faq.q} className={`faq-item${offen === i ? ' faq-item--open' : ''}`} variants={fadeUp}>
                <button className="faq-q" onClick={() => setOffen(offen === i ? null : i)}>
                  <span>{faq.q}</span>
                  <svg className="faq-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {/* Antwort immer im HTML (für Suchmaschinen), nur ausgeblendet, solange zugeklappt */}
                <div className="faq-a" hidden={offen !== i}>
                  <p>{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="seo-section">
        <div className="wrap">
          <div className="seo-grid">
            {inhalt.seo.map((b) => (
              <div key={b.h2} className="seo-block">
                <h2 className="seo-heading">{b.h2}</h2>
                <p className="seo-body">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
