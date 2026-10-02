'use client'

import { motion } from 'motion/react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

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

export default function FuerFachbetriebePage() {
  return (
    <>
      <Nav />
      <FachbetriebeContent />
      <Footer />
    </>
  )
}
