'use client'

import { motion } from 'motion/react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

function ImpressumContent() {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 100, background: '#f8f9fb', minHeight: '70vh' }}>
      <div className="wrap">
        <motion.article
          className="legal-article"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={fadeUp} style={{ fontSize: 38, fontWeight: 700, color: '#0f2f4d', marginBottom: 8 }}>Impressum</motion.h1>
          <motion.p variants={fadeUp} style={{ color: '#6b7a8d', marginBottom: 48, fontSize: 15 }}>Angaben gemäß § 5 TMG</motion.p>

          <motion.div variants={fadeUp} className="legal-block">
            <h2>Unternehmensangaben</h2>
            <p>
              <strong>Bodensee BauPartner GbR</strong><br />
              Luca-Matei Brezeanu &amp; Atakan Yigit<br />
              Tulpenweg 1<br />
              88662 Überlingen<br />
              Deutschland
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="legal-block">
            <h2>Kontakt</h2>
            <p>
              Telefon: <a href="tel:+4915752600306">0157 52600306</a><br />
              E-Mail: <a href="mailto:info@bodensee-baupartner.de">info@bodensee-baupartner.de</a>
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="legal-block">
            <h2>Umsatzsteuer</h2>
            <p>
              Gemäß § 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).
              Eine Umsatzsteuer-Identifikationsnummer liegt nicht vor.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="legal-block">
            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Luca-Matei Brezeanu &amp; Atakan Yigit<br />
              Tulpenweg 1<br />
              88662 Überlingen
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="legal-block">
            <h2>EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr/
              </a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="legal-block">
            <h2>Verbraucherstreitbeilegung</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="legal-block">
            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
              der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="legal-block">
            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
              verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="legal-block">
            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
          </motion.div>
        </motion.article>
      </div>
    </section>
  )
}

export default function ImpressumPage() {
  return (
    <>
      <Nav />
      <ImpressumContent />
      <Footer />
    </>
  )
}
