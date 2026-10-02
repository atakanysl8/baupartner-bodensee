// Liefert den statischen Export lokal aus — wie Hostinger, ohne PHP.
// Aufruf: node scripts/server.mjs [port=3417] [ordner=out]
// Tipp: Weil OneDrive Dateien in out/ zeitweise sperrt, besser die lokale Build-Kopie ausliefern:
//   node scripts/server.mjs 3417 "%LOCALAPPDATA%/bbp-build/repo/out"
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const port = Number(process.argv[2] ?? 3417)
const root = path.resolve(process.argv[3] ?? 'out')
const typ = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.ico': 'image/x-icon', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2',
}

http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0])
  let f = path.join(root, p)
  if (path.relative(root, f).startsWith('..')) { res.writeHead(403); return res.end() }
  try {
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html')
    if (!fs.existsSync(f)) {
      const nf = path.join(root, '404.html')
      res.writeHead(404, { 'content-type': typ['.html'] })
      return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'not found')
    }
    const inhalt = fs.readFileSync(f)
    res.writeHead(200, { 'content-type': typ[path.extname(f)] ?? 'application/octet-stream' })
    res.end(inhalt)
  } catch (e) {
    // z. B. OneDrive-Sperre beim Lesen: Anfrage scheitert, Server läuft weiter
    res.writeHead(503, { 'content-type': 'text/plain; charset=utf-8' })
    res.end(`Datei gerade nicht lesbar: ${e.code ?? e.message}`)
  }
}).listen(port, () => console.log(`${root} auf http://localhost:${port}`))
