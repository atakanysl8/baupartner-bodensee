'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import { useState, useRef, useEffect } from 'react'
import Footer from './components/Footer'
import { LEISTUNGEN, LEISTUNG_SLUGS, GRUPPEN, leistungenDerGruppe, type LeistungSlug } from './inhalte/leistungen'
import HeroBild from './components/HeroBild'
import { RATGEBERLINKS } from './inhalte/ratgeber-seiten/links'

/* ── Animation variants ──────────────────────────────────────────────────── */
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
  show: { transition: { staggerChildren: 0.14 } },
}

/* ── Nav ─────────────────────────────────────────────────────────────────── */
// aus der zentralen Leistungsliste (app/inhalte/leistungen.ts), gruppiert für das Dropdown
const LEISTUNGS_GRUPPEN = GRUPPEN.map((g) => ({
  titel: g.titel,
  items: leistungenDerGruppe(g.gruppe).map((l) => ({ label: l.name, href: `/leistungen/${l.slug}/` })),
}))
const leistungenItems = LEISTUNGS_GRUPPEN.flatMap((g) => g.items)

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
    { href: '/ueber-uns/', label: 'Über uns' },
    { href: '/fuer-fachbetriebe/', label: 'Für Fachbetriebe' },
    { href: '#kontakt', label: 'Kontakt' },
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
          <a href="#" className="nav-logo" aria-label="Bodensee BauPartner">
            <img src="/logo.svg" width={177} height={150} alt="Bodensee BauPartner" style={{ height: 52, width: 'auto' }} />
          </a>

          <div className="nav-links">
            {/* Leistungen mit Dropdown */}
            <div
              className="nav-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <a href="#leistungen" className={dropdownOpen ? 'active' : ''}>
                Leistungen
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4 }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="nav-dropdown-menu nav-dropdown-menu--gruppen"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as const }}
                  >
                    {LEISTUNGS_GRUPPEN.map((g, gi) => (
                      <div key={g.titel} className="nav-dropdown-gruppe">
                        <div className="nav-dropdown-gruppe-titel">{g.titel}</div>
                        {g.items.map((item, i) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className="nav-dropdown-item"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (gi * 4 + i) * 0.03, duration: 0.15 }}
                      >
                        <span className="nav-dropdown-dot" />
                        {item.label}
                      </motion.a>
                    ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {otherLinks.map(l => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>

          <motion.a
            href="#kontakt"
            className="nav-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Projekt anfragen
            <span className="nav-cta-dot">
              <svg width="9" height="9" viewBox="0 0 9 9"><path d="M1 4.5h7m0 0L5 1.5m3 3L5 7.5" stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </span>
          </motion.a>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l12 12M16 4L4 16"/>
              </svg>
            ) : (
              <><span /><span /><span /></>
            )}
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
            <div className="mobile-leistungen-sub">
              {leistungenItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="mobile-leistungen-item"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <span className="nav-dropdown-dot" />
                  {item.label}
                </motion.a>
              ))}
            </div>
            <div className="mobile-leistungen-sub mobile-other-links">
              {otherLinks.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="mobile-leistungen-item"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: leistungenItems.length * 0.04 + i * 0.04 }}
                >
                  <span className="nav-dropdown-dot" />
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <header className="hero" ref={ref}>
      <motion.div className="hero-image" style={{ y: imageY }}>
        <HeroBild alt="Bauprojekt am Bodensee" />
      </motion.div>

      <div className="wrap">
        <div className="hero-inner">
          <motion.div
            className="hero-text"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div className="eyebrow" variants={fadeUp}>
              <span className="bullet" />
              Ihr Bau-Vermittler am Bodensee
            </motion.div>

            <motion.h1 variants={fadeUp}>
              Schluss mit der<br /><em>Handwerkersuche</em><br />am Bodensee.
            </motion.h1>

            <motion.p className="hero-sub" variants={fadeUp}>
              Keine unbeantworteten Anfragen, kein Hinterhertelefonieren: Schildern Sie uns Ihr Vorhaben in zwei Minuten – wir wählen einen passenden Fachbetrieb aus, der sich bei Ihnen meldet. Vom Neubau über Dach, Bad und Wärmepumpe bis zum Garten – für Sie kostenlos und unverbindlich.
            </motion.p>

            <motion.div className="hero-ctas" variants={fadeUp}>
              <motion.a
                href="#kontakt"
                className="btn btn-primary"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Projekt anfragen
                <span className="btn-dot">
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
              </motion.a>
              <motion.a
                href="#leistungen"
                className="btn btn-ghost"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Unsere Leistungen
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

/* ── Stats Bar ───────────────────────────────────────────────────────────── */
const stats = [
  { value: 'Regional', label: 'Verwurzelt am Bodensee' },
  { value: String(LEISTUNG_SLUGS.length), label: 'Leistungsbereiche' },
  // Vorübergehend ausgeblendet – zum Wiedereinblenden Kommentar entfernen und
  // .stats-grid in globals.css wieder auf repeat(4, 1fr) stellen.
  // { value: '0 €', label: 'Vermittlungskosten' },
  { value: '100%', label: 'Kostenlos & unverbindlich' },
]

function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="wrap">
        <motion.div
          className="stats-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {stats.map((s, i) => (
            <motion.div key={s.label} className="stat-item" variants={fadeUp}>
              {i > 0 && <div className="stat-divider" />}
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Intro / Über uns ────────────────────────────────────────────────────── */
const valueCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Regionale Fachbetriebe',
    desc: 'Wir suchen gezielt für Ihr Vorhaben und vermitteln Ihnen einen passenden Fachbetrieb aus der Bodenseeregion.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Regional & persönlich',
    desc: 'Unser Sitz ist in Überlingen. Wir kennen die Region und die Handwerker — für kurze Wege und schnelle Reaktion.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Schnelle Vermittlung',
    desc: 'Innerhalb eines Werktags bringen wir Sie mit dem passenden Fachbetrieb zusammen — ohne lange Wartezeiten.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/>
      </svg>
    ),
    title: 'Kostenlos & unverbindlich',
    desc: 'Unsere Vermittlung ist für Sie vollständig kostenlos. Kein Risiko, keine versteckten Kosten.',
  },
]

function Intro() {
  return (
    <section className="intro" id="ueber">
      <div className="wrap">
        <motion.div
          className="intro-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="intro-left" variants={fadeUp}>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span className="bullet" /> Über uns
            </div>
            <h2>Ein verlässlicher Partner für anspruchsvolle <em>Bauprojekte</em> in der Region.</h2>
          </motion.div>

          <motion.div className="intro-right" variants={fadeUp}>
            <p>
              Bodensee BauPartner ist Ihr persönlicher Bau-Vermittler im Bodenseekreis. Wir verbinden Bauherren und Privatkunden mit passenden Fachbetrieben aus der Region — für Hoch- und Tiefbau, Sanierung, Innenausbau und mehr.
            </p>
            <p>
              Keine endlose Recherche, kein Angebotsvergleichsstress. Schildern Sie uns Ihr Vorhaben — wir finden den passenden Partner und begleiten Sie von der ersten Anfrage bis zur Auftragserteilung. Kostenlos und unverbindlich.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="value-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {valueCards.map(c => (
            <motion.div key={c.title} className="value-card" variants={fadeUp} whileHover={{ y: -4 }}>
              <div className="value-icon">{c.icon}</div>
              <div className="value-title">{c.title}</div>
              <div className="value-desc">{c.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Leistungen ──────────────────────────────────────────────────────────── */
const leistungen = [
  {
    featured: true,
    href: '/leistungen/hochbau/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 19h16"/><path d="M5 19V9l6-5 6 5v10"/><rect x="8" y="12" width="6" height="7"/>
      </svg>
    ),
    title: 'Neubau & Rohbau',
    desc: 'Vom Rohbau bis zur Fassade — Ihr Bauprojekt in erfahrenen Händen.',
    items: ['Rohbau & Stahlbetonbau', 'Mauerwerk & Tragwände', 'Deckenkonstruktionen', 'Fassaden & Außenwände', 'Treppen & Balkone'],
  },
  {
    featured: false,
    href: '/leistungen/tiefbau/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="16" height="16" rx="1"/><path d="M3 11h16M11 3v16"/>
      </svg>
    ),
    title: 'Tiefbau & Erdarbeiten',
    desc: 'Fundament für jedes Bauwerk — solide Basis für Ihr Projekt.',
    items: ['Erdarbeiten & Aushub', 'Fundamentierung & Bodenplatte', 'Kanal- & Leitungsbau', 'Straßen- & Wegebau', 'Hangsicherung & Spundwände'],
  },
  {
    featured: false,
    href: '/leistungen/bad-sanitaer/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
      </svg>
    ),
    title: 'Badsanierung & Sanitär',
    desc: 'Moderne Badezimmer und Sanitäranlagen — funktional und stilvoll.',
    items: ['Badplanung & Gestaltung', 'Sanitärinstallation', 'Fliesen & Abdichtung', 'Wanne, Dusche & WC', 'Barrierefreies Bad'],
  },
  {
    featured: false,
    href: '/leistungen/innenausbau/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 17v2M16 17v2M2 12h20"/>
      </svg>
    ),
    title: 'Innenausbau & Trockenbau',
    desc: 'Vom Rohbau zum fertigen Innenraum — passende Fachbetriebe für jedes Gewerk.',
    items: ['Trockenbau & Wände', 'Dachgeschossausbau', 'Deckengestaltung', 'Innentüren', 'Treppen'],
  },
  {
    featured: false,
    href: '/leistungen/renovierung-sanierung/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: 'Sanierung & Renovierung',
    desc: 'Bestand modernisieren, Wert steigern — mit Fingerspitzengefühl.',
    items: ['Kernsanierung', 'Energetische Modernisierung', 'Altbausanierung', 'Schimmel & Feuchte', 'Umbau & Rückbau'],
  },
  {
    featured: false,
    href: '/leistungen/dach-fassade/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 11l9-7 9 7"/><path d="M5 9v10h12V9"/><path d="M9 19v-5h4v5"/>
      </svg>
    ),
    title: 'Dach & Fassade',
    desc: 'Dach decken, sanieren, dämmen — und die Fassade gleich mit.',
    items: ['Dachdecker & Dacheindeckung', 'Dachsanierung & Dämmung', 'Fassadensanierung', 'Zimmerei & Dachstuhl', 'Dachfenster & Gauben'],
  },
  {
    featured: false,
    href: '/leistungen/heizung-waermepumpe/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11 3c2 3-2 4 0 7s-2 4 0 7"/><rect x="3" y="17" width="16" height="3" rx="1"/>
      </svg>
    ),
    title: 'Heizung & Wärmepumpe',
    desc: 'Heizung tauschen, Wärmepumpe planen — effizient heizen.',
    items: ['Wärmepumpe', 'Heizungstausch', 'Heizungswartung & -reparatur', 'Fußbodenheizung', 'Warmwasser'],
  },
  {
    featured: false,
    href: '/leistungen/elektro-photovoltaik/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L4 13h6l-1 7 8-11h-6z"/>
      </svg>
    ),
    title: 'Elektro & Photovoltaik',
    desc: 'Elektroinstallation, Photovoltaik und Wallbox aus einer Anfrage.',
    items: ['Elektroinstallation', 'Photovoltaikanlage', 'Wallbox', 'Zählerschrank & Unterverteilung', 'Smart Home'],
  },
  {
    featured: false,
    href: '/leistungen/fenster-tueren/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="3" width="14" height="16" rx="1"/><path d="M11 3v16M4 11h14"/>
      </svg>
    ),
    title: 'Fenster & Türen',
    desc: 'Neue Fenster, Haustüren und Sonnenschutz — dicht und sicher.',
    items: ['Fenster austauschen', 'Haustüren', 'Rollläden', 'Markisen & Sonnenschutz', 'Einbruchschutz'],
  },
  {
    featured: false,
    href: '/leistungen/maler-fliesen-boeden/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h12v5H4z"/><path d="M10 9v4"/><rect x="8" y="13" width="4" height="6" rx="1"/>
      </svg>
    ),
    title: 'Maler, Fliesen & Böden',
    desc: 'Wände streichen, Fliesen legen, Böden erneuern.',
    items: ['Malerarbeiten', 'Fliesenleger', 'Parkett & Laminat', 'Vinyl- & Designböden', 'Tapezierarbeiten'],
  },
  {
    featured: false,
    href: '/leistungen/garten-aussenanlagen/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 19h16"/><path d="M5 19v-6h12v6"/><path d="M3 13l8-6 8 6"/>
      </svg>
    ),
    title: 'Garten & Außenanlagen',
    desc: 'Terrasse, Zaun, Pflaster und Carport rund ums Haus.',
    items: ['Terrassenüberdachung', 'Pflasterarbeiten', 'Zaunbau', 'Carport', 'Wintergarten'],
  },
]

function Leistungen() {
  return (
    <section className="leistungen" id="leistungen">
      <div className="wrap">
        <motion.div
          className="leistungen-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="bullet" /> Leistungen
            </div>
            <h2>Kompetenz in allen <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Gewerken</em>.</h2>
          </motion.div>
          <motion.p className="head-desc" variants={fadeUp}>
            Von der Erdarbeit bis zur schlüsselfertigen Übergabe — wir decken alle Phasen Ihres Bauprojekts ab.
          </motion.p>
        </motion.div>

        <motion.div
          className="leistungen-grid"
          variants={staggerSlow}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {leistungen.map(l => (
            <motion.a
              key={l.title}
              href={l.href}
              className={`leistung${l.featured ? ' featured' : ''}`}
              variants={fadeUp}
              whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <div className="leistung-icon">{l.icon}</div>
              <h3>{l.title}</h3>
              <p className="ldesc">{l.desc}</p>
              <ul className="llist">
                {l.items.map(item => <li key={item}>{item}</li>)}
              </ul>
              <div className="leistung-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 7h12m0 0L9 3m4 4L9 11" stroke="currentColor" fill="none" strokeWidth="1.5"/></svg>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Prozess ─────────────────────────────────────────────────────────────── */
const prozessSteps = [
  { num: '01', title: 'Beratung & Planung', desc: 'Gemeinsam klären wir Ihre Anforderungen, den Umfang und die technischen Möglichkeiten Ihres Projekts.' },
  { num: '02', title: 'Angebot & Kalkulation', desc: 'Der vermittelte Fachbetrieb erstellt Ihnen ein detailliertes Angebot mit transparenter Kalkulation.' },
  { num: '03', title: 'Ausführung', desc: 'Der vermittelte Fachbetrieb führt Ihr Projekt aus — Terminplanung und Bauausführung erfolgen direkt mit dem Betrieb.' },
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
                <span className="bullet" /> Prozess
              </div>
              <h2>In vier Schritten zu Ihrem <em style={{ fontStyle: 'italic', color: 'var(--accent-soft)' }}>Bauprojekt</em>.</h2>
            </div>
            <p className="prozess-lead">
              Wir machen den Bauprozess so klar und reibungslos wie möglich — von der ersten Idee bis zur Schlüsselübergabe.
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

/* ── CTA Band ────────────────────────────────────────────────────────────── */
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
            <h2>Bereit, Ihr Projekt <em>zu starten?</em></h2>
            <p className="cta-desc">
              Erzählen Sie uns von Ihrem Vorhaben — wir melden uns innerhalb eines Werktags mit einer ersten Einschätzung. Unverbindlich und kostenlos.
            </p>
            <div className="cta-btns">
              <motion.a
                href="#kontakt"
                className="btn btn-primary"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Projekt anfragen
                <span className="btn-dot">
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
              </motion.a>
              <motion.a
                href="tel:+4915752600306"
                className="btn btn-ghost"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
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
                { label: 'Verfügbarkeit', value: <><span className="status-dot" />Jetzt anfragen</>, },
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

/* ── Kontakt / Formular ──────────────────────────────────────────────────── */
// Pflicht ist nur, was eine Anfrage für einen Fachbetrieb verwertbar macht:
// was, an welchem Objekt, wo, wann, wer entscheidet und wie man den Kunden erreicht.
const projektTypen = [...LEISTUNG_SLUGS.map((s) => LEISTUNGEN[s].chip), 'Sonstiges']
const objektarten = ['Einfamilien- / Doppelhaus', 'Wohnung', 'Mehrfamilienhaus', 'Gewerbeobjekt', 'Grundstück / Neubau']
const zeitrahmen = ['Schnellstmöglich', 'In 1–3 Monaten', 'In 3–6 Monaten', 'Später / noch offen']
const rollen = ['Eigentümer/in', 'Mieter/in', 'Hausverwaltung', 'Kauf geplant']
const budgets = ['Unter 10.000 €', '10.000 – 30.000 €', '30.000 – 100.000 €', '100.000 – 300.000 €', 'Über 300.000 €', 'Noch unklar']

function Kontakt() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [objekt, setObjekt] = useState('')
  const [zeit, setZeit] = useState('')
  const [plz, setPlz] = useState('')
  const [ort, setOrt] = useState('')
  const [rolle, setRolle] = useState('')
  const [budget, setBudget] = useState('')
  const [beschr, setBeschr] = useState('')
  const [sonstiges, setSonstiges] = useState('')
  const [name, setName] = useState('')
  const [telefon, setTelefon] = useState('')
  const [email, setEmail] = useState('')
  const [einwWeitergabe, setEinwWeitergabe] = useState(false)
  const [einwTelefon, setEinwTelefon] = useState(false)
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  // Vorbelegung von einer Ortsseite aus: /?leistung=<slug>&ort=<Ort>#kontakt.
  // Die URL ist erst nach der Hydration lesbar (statischer Export), daher einmalig im Effekt.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const l = p.get('leistung'), o = p.get('ort')
    const chip = l && l in LEISTUNGEN ? LEISTUNGEN[l as LeistungSlug].chip : null
    // eslint-disable-next-line react-hooks/set-state-in-effect -- einmaliges Übernehmen externer URL-Daten
    if (chip && projektTypen.includes(chip)) setSelected([chip])
    if (o) setOrt(o.slice(0, 60))
  }, [])

  const toggleTyp = (v: string) =>
    setSelected(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])

  const validate = () => {
    const errs: Record<string, string> = {}
    if (step === 1) {
      if (selected.length === 0) errs.typ = 'Bitte mindestens eine Kategorie wählen.'
      if (selected.includes('Sonstiges') && sonstiges.trim().length < 3) errs.sonstiges = 'Bitte kurz beschreiben, worum es geht.'
      if (!objekt) errs.objekt = 'Bitte die Objektart wählen.'
      if (!zeit) errs.zeit = 'Bitte den Zeitrahmen wählen.'
    }
    if (step === 2) {
      if (!/^\d{5}$/.test(plz.trim())) errs.plz = 'Bitte fünfstellige PLZ angeben.'
      if (ort.trim().length < 2) errs.ort = 'Bitte den Ort angeben.'
      if (!rolle) errs.rolle = 'Bitte auswählen.'
    }
    if (step === 3) {
      if (name.trim().length < 2) errs.name = 'Bitte Ihren Namen angeben.'
      const tel = telefon.trim()
      const mail = email.trim()
      if (!tel && !mail) errs.kontakt = 'Bitte Telefon oder E-Mail angeben – eines genügt.'
      if (tel && !/^[+()/\d][\d\s()/.-]{5,}$/.test(tel)) errs.telefon = 'Diese Telefonnummer sieht nicht vollständig aus.'
      if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) errs.email = 'Diese E-Mail-Adresse sieht nicht vollständig aus.'
      if (!einwWeitergabe) errs.einwWeitergabe = 'Ohne diese Einwilligung können wir Ihre Anfrage nicht weitergeben.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const next = async () => {
    if (!validate()) return
    if (step < 3) { setStep(s => s + 1); return }
    setSending(true)
    setSendError(false)
    try {
      // Lokal führt der Dev-Server kein PHP aus – dort nimmt app/api/contact an.
      const endpoint = process.env.NODE_ENV === 'development' ? '/api/contact/' : '/contact.php'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // „Sonstiges“ mit Freitext übertragen, damit contact.php und die Mail den Inhalt zeigen
          typ: selected.map((t) => (t === 'Sonstiges' && sonstiges.trim() ? `Sonstiges: ${sonstiges.trim().slice(0, 120)}` : t)), objekt, zeit, plz, ort, rolle, budget, beschr,
          name, telefon, email, einwWeitergabe, einwTelefon, website,
        }),
      })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const bars = [1, 2, 3]

  return (
    <section className="kontakt" id="kontakt">
      <div className="wrap">
        <motion.div
          className="contact-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div className="contact-left" variants={fadeUp}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="bullet" /> Kontakt
            </div>
            <h2>Erzählen Sie uns von Ihrem <em>Projekt</em>.</h2>
            <p className="lead">Schildern Sie uns Ihr Vorhaben — wir wählen einen passenden Fachbetrieb aus der Region aus, der sich bei Ihnen meldet. Unverbindlich und kostenlos.</p>

            <div className="contact-info">
              {[
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
                  label: 'Telefon',
                  value: <a href="tel:+4915752600306">+49 (0) 157 5260 0306</a>,
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
                  label: 'E-Mail',
                  value: <a href="mailto:info@bodensee-baupartner.de">info@bodensee-baupartner.de</a>,
                },
                {
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
                  label: 'Reaktionszeit',
                  value: 'Innerhalb eines Werktags',
                },
              ].map(item => (
                <div key={item.label} className="contact-info-item">
                  <div className="contact-ico">{item.icon}</div>
                  <div>
                    <div className="clabel">{item.label}</div>
                    <div className="cval">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="contact-form" variants={fadeUp}>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="success-check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 13l5 5 11-12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </motion.div>
                  <h3>Vielen Dank!</h3>
                  <p>Ihre Anfrage ist eingegangen. Wir wählen einen passenden Fachbetrieb aus der Region aus — er meldet sich auf dem von Ihnen angegebenen Weg bei Ihnen.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="form-header">
                    <div className="form-title">Projektanfrage</div>
                    <div className="step-meta">Schritt {step} / 3</div>
                  </div>

                  <div className="form-progress">
                    {bars.map(b => (
                      <span
                        key={b}
                        className={b < step ? 'done' : b === step ? 'current' : ''}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      {step === 1 && (
                        <>
                          <div className="form-group">
                            <label className="form-label">Was soll gemacht werden?<span className="req">*</span></label>
                            <div className="chip-group">
                              {projektTypen.map(v => (
                                <button
                                  key={v}
                                  type="button"
                                  className={`chip${selected.includes(v) ? ' selected' : ''}`}
                                  onClick={() => toggleTyp(v)}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                            {errors.typ && <div className="form-error-msg">{errors.typ}</div>}
                            {selected.includes('Sonstiges') && (
                              <div className="sonstiges-feld">
                                <label className="form-label" htmlFor="sonstiges">Was genau ist geplant?<span className="req">*</span></label>
                                <input type="text" id="sonstiges" maxLength={120} autoFocus className={`form-input${errors.sonstiges ? ' error' : ''}`} placeholder="z. B. Carport, Kellerabdichtung, Treppenlift …" value={sonstiges} onChange={e => setSonstiges(e.target.value)} />
                                {errors.sonstiges && <div className="form-error-msg">{errors.sonstiges}</div>}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label className="form-label">Um welches Objekt geht es?<span className="req">*</span></label>
                            <div className="chip-group">
                              {objektarten.map(v => (
                                <button
                                  key={v}
                                  type="button"
                                  className={`chip${objekt === v ? ' selected' : ''}`}
                                  onClick={() => setObjekt(v)}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                            {errors.objekt && <div className="form-error-msg">{errors.objekt}</div>}
                          </div>
                          <div className="form-group">
                            <label className="form-label">Wann soll es losgehen?<span className="req">*</span></label>
                            <div className="chip-group">
                              {zeitrahmen.map(v => (
                                <button
                                  key={v}
                                  type="button"
                                  className={`chip${zeit === v ? ' selected' : ''}`}
                                  onClick={() => setZeit(v)}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                            {errors.zeit && <div className="form-error-msg">{errors.zeit}</div>}
                          </div>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <div className="form-row form-row--plz">
                            <div className="form-group">
                              <label className="form-label" htmlFor="plz">PLZ<span className="req">*</span></label>
                              <input type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5} className={`form-input${errors.plz ? ' error' : ''}`} id="plz" placeholder="88662" value={plz} onChange={e => setPlz(e.target.value)} />
                              {errors.plz && <div className="form-error-msg">{errors.plz}</div>}
                            </div>
                            <div className="form-group">
                              <label className="form-label" htmlFor="ort">Ort des Objekts<span className="req">*</span></label>
                              <input type="text" autoComplete="address-level2" className={`form-input${errors.ort ? ' error' : ''}`} id="ort" placeholder="z. B. Überlingen" value={ort} onChange={e => setOrt(e.target.value)} />
                              {errors.ort && <div className="form-error-msg">{errors.ort}</div>}
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Sie sind …<span className="req">*</span></label>
                            <div className="chip-group">
                              {rollen.map(v => (
                                <button
                                  key={v}
                                  type="button"
                                  className={`chip${rolle === v ? ' selected' : ''}`}
                                  onClick={() => setRolle(v)}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                            {errors.rolle && <div className="form-error-msg">{errors.rolle}</div>}
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="budget">Geplantes Budget (optional)</label>
                            <select className="form-select" id="budget" value={budget} onChange={e => setBudget(e.target.value)}>
                              <option value="">Bitte wählen</option>
                              {budgets.map(v => <option key={v}>{v}</option>)}
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="form-label" htmlFor="beschr">Kurze Beschreibung (optional)</label>
                            <textarea
                              className="form-textarea"
                              id="beschr"
                              placeholder="z. B. Bad im Obergeschoss komplett erneuern, ca. 8 m², bodengleiche Dusche"
                              value={beschr}
                              onChange={e => setBeschr(e.target.value)}
                            />
                          </div>
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <div className="form-group">
                            <label className="form-label" htmlFor="name">Name<span className="req">*</span></label>
                            <input type="text" autoComplete="name" className={`form-input${errors.name ? ' error' : ''}`} id="name" value={name} onChange={e => setName(e.target.value)} />
                            {errors.name && <div className="form-error-msg">{errors.name}</div>}
                          </div>
                          <div className="form-label" style={{ marginBottom: 8 }}>Wie soll der Fachbetrieb Sie erreichen?<span className="req">*</span> <span style={{ fontWeight: 400, color: 'var(--ink-3)' }}>Eines von beidem genügt.</span></div>
                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label" htmlFor="tel">Telefon</label>
                              <input type="tel" autoComplete="tel" className={`form-input${errors.telefon || errors.kontakt ? ' error' : ''}`} id="tel" placeholder="+49 …" value={telefon} onChange={e => setTelefon(e.target.value)} />
                              {errors.telefon && <div className="form-error-msg">{errors.telefon}</div>}
                            </div>
                            <div className="form-group">
                              <label className="form-label" htmlFor="mail">E-Mail</label>
                              <input type="email" autoComplete="email" className={`form-input${errors.email || errors.kontakt ? ' error' : ''}`} id="mail" value={email} onChange={e => setEmail(e.target.value)} />
                              {errors.email && <div className="form-error-msg">{errors.email}</div>}
                            </div>
                          </div>
                          {errors.kontakt && <div className="form-error-msg" style={{ marginTop: -12, marginBottom: 16 }}>{errors.kontakt}</div>}

                          <div className="form-hp" aria-hidden="true">
                            <label htmlFor="website">Bitte dieses Feld frei lassen</label>
                            <input id="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
                          </div>

                          <div className="form-consents">
                            <label className="form-consent">
                              <input type="checkbox" checked={einwWeitergabe} onChange={e => setEinwWeitergabe(e.target.checked)} />
                              <span style={errors.einwWeitergabe ? { color: 'var(--accent)' } : {}}>
                                Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage an einen passenden Fachbetrieb aus der Region weitergegeben werden. Diese Einwilligung kann ich jederzeit widerrufen.<span className="req">*</span>
                              </span>
                            </label>
                            {errors.einwWeitergabe && <div className="form-error-msg">{errors.einwWeitergabe}</div>}
                            <label className="form-consent">
                              <input type="checkbox" checked={einwTelefon} onChange={e => setEinwTelefon(e.target.checked)} />
                              <span>
                                Ich bin einverstanden, telefonisch zu meiner Anfrage kontaktiert zu werden. Auch diese Einwilligung kann ich jederzeit widerrufen. <span style={{ color: 'var(--ink-3)' }}>(freiwillig)</span>
                              </span>
                            </label>
                            <p className="form-note">
                              Ihre Angaben gehen an genau einen Fachbetrieb, den wir für Ihre Anfrage auswählen – an niemanden sonst. Mehr in der <a href="/datenschutz/" style={{ textDecoration: 'underline' }}>Datenschutzerklärung</a>.
                            </p>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {sendError && (
                    <div className="form-error-msg" style={{ marginBottom: 12 }}>
                      Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an info@bodensee-baupartner.de.
                    </div>
                  )}
                  <div className="form-actions">
                    <button
                      type="button"
                      className="form-back"
                      disabled={step === 1 || sending}
                      onClick={() => setStep(s => s - 1)}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12"><path d="M11 6H1m0 0l4-4M1 6l4 4" stroke="currentColor" fill="none" strokeWidth="1.4"/></svg>
                      Zurück
                    </button>
                    <motion.button
                      type="button"
                      className="btn btn-primary"
                      onClick={next}
                      disabled={sending}
                      whileHover={sending ? {} : { y: -1 }}
                      whileTap={sending ? {} : { scale: 0.97 }}
                    >
                      {sending ? 'Wird gesendet…' : step === 3 ? 'Anfrage kostenlos absenden' : 'Weiter'}
                      {!sending && (
                        <span className="btn-dot">
                          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8m0 0L6 2m3 3L6 8" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </span>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── FAQ ─────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'Kostet mich die Vermittlung etwas?',
    a: 'Nein – unsere Vermittlung ist für Sie vollständig kostenlos und unverbindlich. Die Kosten tragen die Fachbetriebe, nicht Sie als Auftraggeber.',
  },
  {
    q: 'Wie läuft die Vermittlung konkret ab?',
    a: 'Sie schildern uns kurz Ihr Vorhaben – per Kontaktformular oder Telefon. Wir suchen den passenden Fachbetrieb aus der Region aus, stellen den Kontakt her und übergeben alle relevanten Informationen. Den Rest regeln Sie direkt mit dem Betrieb.',
  },
  {
    q: 'Welche Region deckt ihr ab?',
    a: 'Wir sind auf die gesamte Bodenseeregion spezialisiert – von Konstanz über Überlingen und Friedrichshafen bis nach Lindau. Bei größeren Projekten sprechen Sie uns gerne auch für angrenzende Gebiete an.',
  },
  {
    q: 'Für welche Projekte kann ich euch anfragen?',
    a: 'Wir vermitteln Fachbetriebe für Hochbau (Neubau, Rohbau, Anbau), Tiefbau (Erdarbeiten, Kanal), Bad & Sanitär, Innenausbau sowie Renovierung und Sanierung – egal ob kleines Badezimmer oder großes Neubauprojekt.',
  },
  {
    q: 'Wie wählen Sie die vermittelten Betriebe aus?',
    a: 'Wir vermitteln Betriebe aus der Bodenseeregion, die zu Ihrem Vorhaben passen. Die Vertragsbeziehung für die Ausführung der Arbeiten besteht direkt zwischen Ihnen und dem jeweiligen Betrieb.',
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
            Alles, was Sie wissen <em>möchten.</em>
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
/* ── Kostenseiten ───────────────────────────────────────────────────────── */
function RatgeberTeaser() {
  // Alle Kostenseiten, in drei Spalten nach Leistungsbereich (Bauen · Sanieren · Ausbau & Außen) — interne Verlinkung.
  if (!RATGEBERLINKS.length) return null
  return (
    <section className="ratgeber-section start-ratgeber">
      <div className="wrap ratgeber-inner">
        <div className="eyebrow"><span className="bullet" /> Kosten</div>
        <h2>Was kostet Ihr Vorhaben?</h2>
        <p className="ratgeber-intro">Preisspannen aus zitierfähigen Quellen und die Faktoren, die den Preis bestimmen – als erste Orientierung vor dem Angebot.</p>
        <div className="kosten-spalten">
          {GRUPPEN.map((g) => {
            const themen = leistungenDerGruppe(g.gruppe).flatMap((l) => RATGEBERLINKS.filter((r) => r.leistung === l.slug))
            if (!themen.length) return null
            return (
              <div key={g.gruppe} className="kosten-spalte">
                <div className="kosten-spalte-kopf">
                  <h3>{g.titel}</h3>
                  <span className="kosten-spalte-anzahl">{themen.length} Themen</span>
                </div>
                <ul>
                  {themen.map((r) => (
                    <li key={r.slug}>
                      <a className="kosten-zeile" href={r.pfad}>
                        <span className="kosten-zeile-text">
                          <span className="kosten-zeile-titel">{r.anker}</span>
                          <span className="lk-zusatz">{LEISTUNGEN[r.leistung as LeistungSlug].name}</span>
                        </span>
                        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SeoText() {
  return (
    <section className="seo-section">
      <div className="wrap">
        <div className="seo-grid">
          <div className="seo-block">
            <h2 className="seo-heading">Handwerker am Bodensee – Ihr regionaler Vermittler</h2>
            <p className="seo-body">
              Die Suche nach einem passenden Handwerker am Bodensee ist oft zeitaufwendig und nervenraubend. Bodensee BauPartner übernimmt diese Arbeit für Sie: Wir vermitteln Fachbetriebe aus der Region – für Neubau und Rohbau, Dach und Fassade, Sanierung, Bad, Heizung, Elektro, Fenster, Innenausbau, Maler- und Bodenarbeiten sowie Garten und Außenanlagen. Wir vermitteln Unternehmen aus der gesamten Bodenseeregion.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Warum Bodensee BauPartner wählen?</h2>
            <p className="seo-body">
              Als Vermittler mit Sitz in Überlingen kennen wir die Bodenseeregion. Unser Service ist für Sie vollständig kostenlos und unverbindlich. Sie sparen Zeit, vermeiden lange Recherche und erhalten innerhalb von 24 Stunden eine persönliche Rückmeldung zu Ihrem Bauprojekt.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Unsere Leistungen im Überblick</h2>
            <p className="seo-body">
              Ob Neubau, Rohbau oder Dachausbau im Hochbaubereich, Erdarbeiten und Kanalbau im Tiefbau, moderne Badezimmer durch Bad & Sanitär-Fachbetriebe, oder hochwertige Innenausbauten und Renovierungen – Bodensee BauPartner vermittelt Ihnen den passenden Spezialisten für jedes Vorhaben. Was Vorhaben ungefähr kosten, zeigen unsere Kostenübersichten, etwa <a href="/leistungen/heizung-waermepumpe/waermepumpe-kosten/">Wärmepumpe Kosten</a> oder <a href="/leistungen/bad-sanitaer/badsanierung-kosten/">Badsanierung Kosten</a>.
            </p>
          </div>

          <div className="seo-block">
            <h2 className="seo-heading">Regional verwurzelt, persönlich vor Ort</h2>
            <p className="seo-body">
              Mit unserem Sitz in Überlingen sind wir mitten in der Bodenseeregion beheimatet – von Konstanz über Friedrichshafen bis Lindau. Diese regionale Verwurzelung ermöglicht es uns, Ihnen schnell den richtigen Handwerker zu vermitteln, der zu Ihrem Projekt passt. Bodensee BauPartner ist Ihr direkter Draht zu Fachbetrieben der Region. Wer hinter dem Unternehmen steht, lesen Sie unter <a href="/ueber-uns/">Über uns</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Page ────────────────────────────────────────────────────────────────── */
// LocalBusiness nur auf der Startseite (Sitz Überlingen); Unter- und Ortsseiten nutzen Service-Schema.
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Bodensee BauPartner GbR',
  description: 'Bauvermittlung in der Bodenseeregion – Handwerker & Baubetriebe für Neubau, Dach, Sanierung, Bad, Heizung, Elektro, Innenausbau, Maler & Garten.',
  url: 'https://www.bodensee-baupartner.de',
  telephone: '+4915752600306',
  email: 'info@bodensee-baupartner.de',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tulpenweg 1',
    addressLocality: 'Überlingen',
    postalCode: '88662',
    addressCountry: 'DE',
  },
  areaServed: [
    { '@type': 'City', name: 'Überlingen' },
    { '@type': 'City', name: 'Friedrichshafen' },
    { '@type': 'City', name: 'Konstanz' },
    { '@type': 'City', name: 'Ravensburg' },
    { '@type': 'City', name: 'Lindau' },
  ],
  serviceType: LEISTUNG_SLUGS.map((l) => LEISTUNGEN[l].name),
  priceRange: 'Kostenlose Vermittlung',
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Nav />
      <Hero />
      <StatsBar />
      <Intro />
      <Leistungen />
      <Prozess />
      <CTABand />
      <Kontakt />
      <FAQ />
      <RatgeberTeaser />
      <SeoText />
      <Footer />
    </>
  )
}
