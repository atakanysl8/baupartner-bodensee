'use client'

import { motion } from 'motion/react'

export default function Footer() {
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
              <img src="/logo.webp" width={182} height={156} alt="Bodensee BauPartner" style={{ height: 40, width: 'auto' }} />
            </div>
            <p className="footer-desc">
              Ihr persönlicher Bau-Vermittler in der Bodenseeregion — wir verbinden Sie mit passenden Fachbetrieben aus der Region für Ihr Projekt.
            </p>
          </div>
          <div className="footer-col">
            <h5>Leistungen</h5>
            <a href="/leistungen/hochbau">Hochbau</a>
            <a href="/leistungen/tiefbau">Tiefbau</a>
            <a href="/leistungen/bad-sanitaer">Bad &amp; Sanitär</a>
            <a href="/leistungen/innenausbau">Innenausbau</a>
            <a href="/leistungen/renovierung-sanierung">Renovierung &amp; Sanierung</a>
          </div>
          <div className="footer-col">
            <h5>Unternehmen</h5>
            <a href="/ueber-uns">Über uns</a>
            <a href="/#kontakt">Kontakt</a>
            <a href="/fuer-fachbetriebe">Für Fachbetriebe</a>
            <a href="/regionen/">Leistungen nach Ort</a>
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
