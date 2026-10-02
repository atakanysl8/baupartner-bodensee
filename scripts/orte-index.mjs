// Erzeugt app/inhalte/orte/index.ts aus allen JSON-Dateien des Ordners. Nach jeder neuen Ortsseite ausführen.
import fs from 'node:fs'
import path from 'node:path'

const ordner = path.join(import.meta.dirname, '..', 'app', 'inhalte', 'orte')
fs.mkdirSync(ordner, { recursive: true })
const dateien = fs.readdirSync(ordner).filter((d) => d.endsWith('.json')).sort()
const zeilen = dateien.map((d, i) => `import s${i} from './${d}'`)
fs.writeFileSync(
  path.join(ordner, 'index.ts'),
  `// generiert von scripts/orte-index.mjs — nicht von Hand ändern\nimport type { Ortsseite } from '../orte'\n${zeilen.join('\n')}\n\nexport const ORTSSEITEN = [${dateien.map((_, i) => `s${i}`).join(', ')}] as Ortsseite[]\n`,
)
console.log(`${dateien.length} Ortsseiten im Index`)
