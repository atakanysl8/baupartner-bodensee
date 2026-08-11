'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

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
                        className="nav-dropdown-item"
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
          <motion.a href="/#kontakt" className="nav-cta" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
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
            <motion.a href="/#leistungen" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>Leistungen</motion.a>
            <div className="mobile-leistungen-sub">
              {leistungenItems.map((item, i) => (
                <motion.a key={item.label} href={item.href} className="mobile-leistungen-item" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                  <span className="nav-dropdown-dot" />{item.label}
                </motion.a>
              ))}
            </div>
            {otherLinks.map((l, i) => (
              <motion.a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i + 1) * 0.06 + 0.2 }}>{l.label}</motion.a>
            ))}
            <motion.a href="/#kontakt" className="btn btn-primary" onClick={() => setMenuOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>Projekt anfragen</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function DatenschutzContent() {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 100, background: '#f8f9fb', minHeight: '70vh' }}>
      <div className="wrap">
        <motion.article
          className="legal-article"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={fadeUp} style={{ fontSize: 38, fontWeight: 700, color: '#0f2f4d', marginBottom: 8 }}>Datenschutzerklärung</motion.h1>
          <motion.p variants={fadeUp} style={{ color: '#6b7a8d', marginBottom: 48, fontSize: 15 }}>
            Stand: April 2026
          </motion.p>

          {/* 1 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>1. Verantwortlicher</h2>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br /><br />
              <strong>Bodensee BauPartner GbR</strong><br />
              Luca-Matei Brezeanu &amp; Atakan Yigit<br />
              Tulpenweg 1, 88662 Überlingen<br />
              Telefon: 0157 52600306<br />
              E-Mail: <a href="mailto:info@bodensee-baupartner.de">info@bodensee-baupartner.de</a>
            </p>
          </motion.div>

          {/* 2 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>2. Allgemeine Hinweise zur Datenverarbeitung</h2>
            <p>
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen
              Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
              Datenschutzerklärung. Die Nutzung unserer Website ist grundsätzlich ohne Angabe personenbezogener
              Daten möglich. Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt dies stets
              auf freiwilliger Basis.
            </p>
          </motion.div>

          {/* 3 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>3. Hosting</h2>
            <p>
              Diese Website wird bei <strong>Hostinger International Ltd.</strong>, 61 Lordou Vironos Street,
              6023 Larnaca, Zypern, gehostet. Die Server befinden sich in der Europäischen Union.
            </p>
            <p>
              Beim Aufruf unserer Website werden durch den Hosting-Anbieter automatisch sogenannte
              Server-Log-Dateien erfasst. Dazu gehören: IP-Adresse, Datum und Uhrzeit der Anfrage, aufgerufene
              URL, übertragene Datenmenge, Browsertyp und -version sowie das verwendete Betriebssystem.
              Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit anderen Datenquellen
              zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem
              sicheren Betrieb der Website). Mit Hostinger besteht ein Auftragsverarbeitungsvertrag gemäß
              Art. 28 DSGVO.
            </p>
          </motion.div>

          {/* 4 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>4. SSL/TLS-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte
              eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
              Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer
              Browserzeile.
            </p>
          </motion.div>

          {/* 5 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>5. Kontaktformular</h2>
            <p>
              Wenn Sie uns über das Kontaktformular auf unserer Website kontaktieren, werden die von Ihnen
              eingegebenen Daten — Vorname, Nachname, Postleitzahl, E-Mail-Adresse und Telefonnummer — sowie
              der Zeitpunkt der Übermittlung bei uns gespeichert. Diese Daten werden ausschließlich zur
              Bearbeitung Ihrer Anfrage und für eventuelle Anschlussfragen verwendet.
            </p>
            <p>
              Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
              Die Daten werden gelöscht, sobald Ihre Anfrage abschließend bearbeitet wurde und keine
              Aufbewahrungspflichten entgegenstehen.
            </p>
          </motion.div>

          {/* 6 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>6. Cookies</h2>
            <p>
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die Ihr Browser auf Ihrem
              Endgerät speichert. Wir unterscheiden zwischen technisch notwendigen Cookies, die für den Betrieb
              der Website erforderlich sind, und optionalen Cookies (z. B. für Analyse-Zwecke). Optionale
              Cookies werden nur nach Ihrer ausdrücklichen Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO).
              Sie können Ihre Einwilligung jederzeit widerrufen.
            </p>
          </motion.div>

          {/* 7 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>7. Google Analytics 4</h2>
            <p>
              Diese Website nutzt Google Analytics 4 (GA4), einen Webanalysedienst der Google Ireland Limited,
              Gordon House, Barrow Street, Dublin 4, Irland. GA4 verwendet Cookies und ähnliche Technologien,
              um das Nutzerverhalten auf unserer Website zu analysieren (z. B. Seitenaufrufe, Verweildauer,
              genutzte Endgeräte).
            </p>
            <p>
              Die durch GA4 erfassten Daten werden in der Regel auf Server von Google in den USA übertragen und
              dort gespeichert. Wir haben die IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google
              innerhalb der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den
              Europäischen Wirtschaftsraum zuvor gekürzt wird. Nur in Ausnahmefällen wird die volle IP-Adresse
              an einen Server von Google in den USA übertragen und dort gekürzt. Die Übertragung in die USA
              erfolgt auf Basis der EU-Standardvertragsklauseln (Art. 46 DSGVO).
            </p>
            <p>
              Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre
              Einwilligung jederzeit widerrufen. Weitere Informationen finden Sie in der Datenschutzerklärung
              von Google:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                https://policies.google.com/privacy
              </a>.
            </p>
          </motion.div>

          {/* 8 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>8. Webschriften</h2>
            <p>
              Diese Website verwendet die Schriftart <em>Inter</em>. Die Schriftdateien werden beim Build
              unserer Website automatisch heruntergeladen und von unserem eigenen Server ausgeliefert. Es
              findet kein Datenaustausch mit Drittanbietern (z. B. Google Fonts CDN) statt. Ihre IP-Adresse
              wird bei der Darstellung der Schriftart nicht an externe Server übermittelt.
            </p>
          </motion.div>

          {/* 9 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>9. Einsatz von KI-gestützten Tools</h2>
            <p>
              Wir setzen in unserem Unternehmen vereinzelt KI-gestützte Tools ein, um interne Prozesse zu
              unterstützen (z. B. Textbearbeitung, Anfragenanalyse). Personenbezogene Daten, die Sie uns
              über das Kontaktformular oder per E-Mail übermitteln, werden nicht automatisiert in KI-Systeme
              eingespeist. Sollte dies in Einzelfällen zur Bearbeitung Ihrer Anfrage erforderlich sein,
              informieren wir Sie gesondert und holen Ihre Einwilligung ein (Art. 6 Abs. 1 lit. a DSGVO).
            </p>
          </motion.div>

          {/* 10 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>10. Ihre Rechte</h2>
            <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
            <ul>
              <li><strong>Recht auf Auskunft</strong> – Art. 15 DSGVO</li>
              <li><strong>Recht auf Berichtigung</strong> – Art. 16 DSGVO</li>
              <li><strong>Recht auf Löschung</strong> – Art. 17 DSGVO</li>
              <li><strong>Recht auf Einschränkung der Verarbeitung</strong> – Art. 18 DSGVO</li>
              <li><strong>Recht auf Datenübertragbarkeit</strong> – Art. 20 DSGVO</li>
              <li><strong>Widerspruchsrecht</strong> – Art. 21 DSGVO</li>
              <li><strong>Recht auf Widerruf einer Einwilligung</strong> – Art. 7 Abs. 3 DSGVO</li>
            </ul>
            <p>
              Zur Ausübung dieser Rechte wenden Sie sich bitte an:{' '}
              <a href="mailto:info@bodensee-baupartner.de">info@bodensee-baupartner.de</a>
            </p>
            <p>
              Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
              Ihrer personenbezogenen Daten durch uns zu beschweren. Die zuständige Aufsichtsbehörde für
              Baden-Württemberg ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
              Baden-Württemberg (LfDI BW), <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer">www.baden-wuerttemberg.datenschutz.de</a>.
            </p>
          </motion.div>

          {/* 11 */}
          <motion.div variants={fadeUp} className="legal-block">
            <h2>11. Aktualität dieser Datenschutzerklärung</h2>
            <p>
              Diese Datenschutzerklärung hat den Stand April 2026. Durch die Weiterentwicklung unserer Website
              oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese
              Datenschutzerklärung zu ändern. Die jeweils aktuelle Fassung ist stets unter
              bodensee-baupartner.de/datenschutz abrufbar.
            </p>
          </motion.div>
        </motion.article>
      </div>
    </section>
  )
}

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

export default function DatenschutzPage() {
  return (
    <>
      <Nav />
      <DatenschutzContent />
      <Footer />
    </>
  )
}
