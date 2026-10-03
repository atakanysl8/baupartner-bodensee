// rel-Attribut für ausgehende Quellenlinks: amtliche und neutrale Quellen werden normal verlinkt
// (thematischer Verweis auf Autoritäten), kommerzielle Quellen (Banken, Bausparkassen, Vermittler,
// Hersteller, Fachverlage) bleiben nofollow.
const NEUTRAL = [
  /\.bund\.de$/, /(^|\.)baden-wuerttemberg\.de$/, /(^|\.)service-bw\.de$/, /(^|\.)landesrecht-bw\.de$/,
  /(^|\.)destatis\.de$/, /(^|\.)gesetze-im-internet\.de$/, /(^|\.)bundesnetzagentur\.de$/, /(^|\.)marktstammdatenregister\.de$/,
  /(^|\.)kfw\.de$/, /(^|\.)bafa\.de$/, /(^|\.)co2online\.de$/, /(^|\.)verbraucherzentrale(-[a-z]+)?\.de$/,
  /(^|\.)zukunftaltbau\.de$/, /(^|\.)kea-bw\.de$/, /(^|\.)energieatlas-bw\.de$/, /(^|\.)lubw\.de$/, /lgrb(-bw|wissen)?/,
  /energieagentur/, /(^|\.)klimaschutzagentur/, /(^|\.)adac\.de$/, /(^|\.)test\.de$/, /(^|\.)finanztip\.de$/,
  /(^|\.)denkmalpflege-bw\.de$/, /(^|\.)polizei-beratung\.de$/,
]

export function quellenRel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    return NEUTRAL.some((r) => r.test(host)) ? 'noopener' : 'nofollow noopener'
  } catch {
    return 'nofollow noopener'
  }
}
