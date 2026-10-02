'use client'

import { motion } from 'motion/react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

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
            Stand: Oktober 2026
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
            <h2>5. Anfrageformular</h2>
            <p>
              Wenn Sie uns über das Anfrageformular auf unserer Website eine Anfrage senden, werden die von
              Ihnen eingegebenen Daten — Angaben zu Ihrem Vorhaben (Leistung, Objektart, Zeitrahmen, Budget,
              Beschreibung), Postleitzahl und Ort des Objekts, Ihre Rolle (z. B. Eigentümer oder Mieter),
              Name, Telefonnummer und/oder E-Mail-Adresse — sowie der Zeitpunkt der Übermittlung, Ihre
              IP-Adresse und Ihre Einwilligungen bei uns gespeichert.
            </p>
            <p>
              <strong>Weitergabe an einen Fachbetrieb:</strong> Mit Ihrer Einwilligung geben wir Ihre
              Angaben an genau einen Fachbetrieb aus der Region weiter, den wir für Ihre Anfrage auswählen.
              Der Fachbetrieb nimmt mit Ihnen Kontakt auf, um Ihr Vorhaben zu besprechen und Ihnen ggf. ein
              Angebot zu machen. Er verarbeitet Ihre Daten anschließend in eigener Verantwortung. Eine
              Weitergabe an weitere Dritte findet nicht statt. Rechtsgrundlage ist Ihre Einwilligung
              (Art. 6 Abs. 1 lit. a DSGVO).
            </p>
            <p>
              <strong>Telefonische Kontaktaufnahme:</strong> Wir und der ausgewählte Fachbetrieb rufen Sie
              zu Ihrer Anfrage nur an, wenn Sie dem gesondert zugestimmt haben (Art. 6 Abs. 1 lit. a DSGVO).
              Andernfalls erfolgt die Kontaktaufnahme schriftlich.
            </p>
            <p>
              <strong>Widerruf:</strong> Sie können jede Einwilligung jederzeit mit Wirkung für die Zukunft
              widerrufen, z. B. per E-Mail an info@bodensee-baupartner.de. Die Rechtmäßigkeit der bis zum
              Widerruf erfolgten Verarbeitung bleibt unberührt.
            </p>
            <p>
              Im Übrigen verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage und für eventuelle
              Rückfragen (Art. 6 Abs. 1 lit. b DSGVO, Vertragsanbahnung) sowie zum Nachweis Ihrer
              Einwilligungen (Art. 6 Abs. 1 lit. c und f DSGVO). Die Daten werden gelöscht, sobald Ihre
              Anfrage abschließend bearbeitet wurde und keine Aufbewahrungspflichten entgegenstehen.
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
              Diese Datenschutzerklärung hat den Stand Oktober 2026. Durch die Weiterentwicklung unserer Website
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

export default function DatenschutzPage() {
  return (
    <>
      <Nav />
      <DatenschutzContent />
      <Footer />
    </>
  )
}
