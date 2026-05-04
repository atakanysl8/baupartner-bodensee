'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
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
              <a key={l.label} href={l.href} className={l.href === '/ueber-uns' ? 'au-nav-active' : ''}>{l.label}</a>
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
  return (
    <section className="au-hero">
      <div className="au-hero-bg-image">
        <Image src="/hero-alt.png" alt="" fill style={{ objectFit: 'cover', objectPosition: 'center right' }} priority />
        <div className="au-hero-bg-overlay" />
      </div>
      <div className="wrap">
        <motion.div
          className="au-hero-inner"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div className="eyebrow au-hero-eyebrow" variants={fadeUp}>
            <span className="bullet" />
            Aus der Region. Für die Region.
          </motion.div>

          <motion.h1 className="au-hero-h1" variants={fadeUp}>
            Ihr Vertrauen ist unser <em>stärkstes Fundament.</em>
          </motion.h1>

          <motion.p className="au-hero-lead" variants={fadeUp}>
            Hinter der Bodensee BauPartner GbR stehen echte Menschen mit einer klaren Mission: Wir machen Ihr Bauprojekt stressfrei, sicher und transparent – durch die Vermittlung der absolut besten Handwerker der Region.
          </motion.p>

          <motion.div className="au-hero-badges" variants={fadeUp}>
            {[
              { val: 'Überlingen', lbl: 'Unser Standort' },
              { val: '100%', lbl: 'Kostenlose Vermittlung' },
              { val: '24h', lbl: 'Reaktionszeit' },
            ].map(b => (
              <div key={b.lbl} className="au-hero-badge">
                <span className="au-hero-badge-val">{b.val}</span>
                <span className="au-hero-badge-lbl">{b.lbl}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="au-hero-line" />
    </section>
  )
}

/* ── Wer wir sind ─────────────────────────────────────────────────────────── */
function WerWirSind() {
  return (
    <section className="au-intro">
      <div className="wrap">
        <div className="au-intro-grid">
          <motion.div
            className="au-intro-text"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div className="eyebrow" style={{ marginBottom: 20 }} variants={fadeUp}>
              <span className="bullet" /> Wer wir sind
            </motion.div>
            <motion.h2 variants={fadeUp}>
              Zwei Macher.<br /><em>Eine Mission.</em>
            </motion.h2>
            <motion.p className="au-body" variants={fadeUp}>
              Bauen, Sanieren oder Renovieren ist für Privatkunden oft eine riesige Herausforderung. Welche Firma ist seriös? Wer hat Zeit? Wer liefert Qualität?
            </motion.p>
            <motion.p className="au-body" variants={fadeUp}>
              Genau aus diesem Grund haben wir, <strong>Luca-Matei Brezeanu</strong> und <strong>Atakan Yigit</strong>, die Bodensee BauPartner GbR gegründet. Wir übernehmen für Sie das, was am meisten Nerven kostet: Die Suche nach dem perfekten Baupartner.
            </motion.p>

            <motion.div className="au-promise-badge" variants={fadeUp}>
              <div className="au-promise-circle">100%</div>
              <div>
                <div className="au-promise-title">Persönlicher Einsatz</div>
                <div className="au-promise-sub">Wir geben alles für Ihre erfolgreiche Vermittlung.</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="au-team-photo"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <div className="au-founders-card">
              <div className="au-founders-bg" />
              <div className="au-founders-tag">
                <span className="bullet" style={{ background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                Das Gründerteam
              </div>
              <div className="au-founders-profiles">
                <div className="au-founder">
                  <div className="au-founder-avatar" style={{ padding: 0, overflow: 'hidden' }}>
                    <Image src="/matei.jpeg" alt="Luca-Matei Brezeanu" width={48} height={48} style={{ objectFit: 'cover', objectPosition: 'center top', width: '100%', height: '100%' }} />
                  </div>
                  <div>
                    <div className="au-founder-name">Luca-Matei Brezeanu</div>
                    <div className="au-founder-role">Mitgründer & Vermittlung</div>
                  </div>
                </div>
                <div className="au-founders-sep" />
                <div className="au-founder">
                  <div className="au-founder-avatar" style={{ padding: 0, overflow: 'hidden' }}>
                    <Image src="/atakan.jpeg" alt="Atakan Yigit" width={48} height={48} style={{ objectFit: 'cover', objectPosition: 'center top', width: '100%', height: '100%' }} />
                  </div>
                  <div>
                    <div className="au-founder-name">Atakan Yigit</div>
                    <div className="au-founder-role">Mitgründer & Vermittlung</div>
                  </div>
                </div>
              </div>
              <div className="au-founders-stats">
                <div className="au-founders-stat">
                  <div className="au-founders-stat-val">50+</div>
                  <div className="au-founders-stat-lbl">Partner&shy;unternehmen</div>
                </div>
                <div className="au-founders-stat">
                  <div className="au-founders-stat-val">0 €</div>
                  <div className="au-founders-stat-lbl">Vermittlungs&shy;kosten</div>
                </div>
                <div className="au-founders-stat">
                  <div className="au-founders-stat-val">24h</div>
                  <div className="au-founders-stat-lbl">Reaktions&shy;zeit</div>
                </div>
              </div>
              <div className="au-founders-footer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Überlingen · Bodenseeregion
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── So läuft es ab ──────────────────────────────────────────────────────── */
const ablaufSteps = [
  { num: '01', title: 'Anfrage senden', desc: 'Beschreiben Sie Ihr Vorhaben kurz – online oder per Telefon. Kein Aufwand, keine Verpflichtung.' },
  { num: '02', title: 'Persönliches Matching', desc: 'Wir wählen aus unserem geprüften Netzwerk gezielt den Fachbetrieb, der am besten zu Ihrem Projekt passt.' },
  { num: '03', title: 'Kontakt & Übergabe', desc: 'Wir stellen den Kontakt her und übergeben alle wichtigen Infos – damit der Betrieb sofort loslegen kann.' },
  { num: '04', title: 'Ihr Projekt startet', desc: 'Der Fachbetrieb meldet sich direkt bei Ihnen. Regional, zuverlässig und in aller Regel innerhalb von 24 Stunden.' },
]

function Ablauf() {
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
              <h2>In vier Schritten zu Ihrem <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Fachbetrieb</em>.</h2>
            </div>
            <p className="prozess-lead">
              Wir machen die Suche nach dem richtigen Handwerker so einfach und stressfrei wie möglich – von der Anfrage bis zum ersten Spatenstich.
            </p>
          </div>

          <motion.div
            className="prozess-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            {ablaufSteps.map(s => (
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

/* ── 100% Versprechen ─────────────────────────────────────────────────────── */
function Versprechen() {
  return (
    <section className="au-versprechen">
      <div className="wrap">
        <motion.div
          className="au-versprechen-inner"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <div className="au-versprechen-badge">100%</div>
          <div className="au-versprechen-text">
            <h2>Unser <em>100% Versprechen</em></h2>
            <p>
              Wir mauern nicht selbst, aber wir geben 100% für Ihre erfolgreiche Vermittlung. Wir arbeiten ausschließlich mit Fachfirmen zusammen, deren Qualität wir kennen und denen wir unser eigenes Zuhause anvertrauen würden.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Sicherheit / Vertrauen ───────────────────────────────────────────────── */
const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Strenge Partnerwahl',
    desc: 'Wir vermitteln nicht jeden. Jedes Unternehmen in unserem Netzwerk am Bodensee wurde auf Zuverlässigkeit, Qualifikation und Meisterhaftigkeit geprüft.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
        <path d="M13 13h4M13 17h4" />
      </svg>
    ),
    title: 'Transparente Prozesse',
    desc: 'Keine versteckten Kosten, keine bösen Überraschungen. Als Ihr Vermittler sorgen wir für klare Kommunikation von der ersten Anfrage bis zur Unterschrift beim Fachbetrieb.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Heimatverbundenheit',
    desc: 'Unser Sitz ist in Überlingen. Wir kennen die Region, wir kennen die Handwerker. Durch kurze Wege und regionale Nähe können wir blitzschnell für Sie agieren.',
  },
]

function Sicherheit() {
  return (
    <section className="au-trust">
      <div className="wrap">
        <motion.div
          className="au-trust-head"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="eyebrow" style={{ marginBottom: 20 }} variants={fadeUp}>
            <span className="bullet" /> Ihre Sicherheit
          </motion.div>
          <motion.h2 variants={fadeUp}>
            Darum sind Sie <em>bei uns sicher.</em>
          </motion.h2>
          <motion.p className="head-desc au-trust-desc" variants={fadeUp}>
            Ihre Sicherheit und Zufriedenheit stehen bei unserer Vermittlungsarbeit an oberster Stelle.
          </motion.p>
        </motion.div>

        <motion.div
          className="au-trust-grid"
          variants={staggerSlow}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {trustItems.map(t => (
            <motion.div
              key={t.title}
              className="au-trust-card"
              variants={fadeUp}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <div className="au-trust-icon">{t.icon}</div>
              <h3 className="au-trust-title">{t.title}</h3>
              <p className="au-trust-desc-card">{t.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Finaler CTA ──────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="au-cta">
      <div className="wrap">
        <motion.div
          className="au-cta-inner"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
        >
          <div className="au-cta-text">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="bullet" style={{ background: 'var(--accent-soft)' }} /> Unverbindlich kennenlernen
            </div>
            <h2>Lernen Sie uns <em>unverbindlich kennen.</em></h2>
            <p className="au-cta-lead">
              Ein kurzes Telefonat reicht, um herauszufinden, ob wir die richtigen Partner für Ihr Vorhaben in unserem Netzwerk haben. Komplett kostenfrei.
            </p>
            <div className="au-cta-actions">
              <motion.a
                href="/#kontakt"
                className="btn btn-primary"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Projekt kostenlos anfragen
                <span className="btn-dot">
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </span>
              </motion.a>
              <motion.a
                href="tel:+4915256311690"
                className="au-phone-link"
                whileHover={{ x: 4 }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 4c0-1 1-2 2-2h2l1 3-2 1c1 2 3 4 5 5l1-2 3 1v2c0 1-1 2-2 2-6 0-11-5-11-11z"/></svg>
                0152 56311690
              </motion.a>
            </div>
          </div>

          <div className="au-cta-visual">
            <div className="au-cta-panel">
              {[
                { label: 'Standort', value: 'Überlingen, Bodensee' },
                { label: 'Gründer', value: 'Brezeanu & Yigit' },
                { label: 'Vermittlung', value: '0 € · kostenlos' },
                { label: 'Erreichbarkeit', value: <><span className="status-dot" />Jetzt anfragen</> },
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
export default function UeberUnsPage() {
  return (
    <>
      <Nav />
      <Hero />
      <WerWirSind />
      <Ablauf />
      <Versprechen />
      <Sicherheit />
      <FinalCTA />
      <Footer />
    </>
  )
}
