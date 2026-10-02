// generiert von scripts/ratgeber-index.mjs — nicht von Hand ändern
import type { Ratgeberseite } from '../ratgeber-seiten'
import s0 from './badsanierung-kosten.json'
import s1 from './waermepumpe-kosten.json'

export const RATGEBERSEITEN = ([s0, s1] as Ratgeberseite[]).sort((a, b) => a.rang - b.rang)
