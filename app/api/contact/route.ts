// Nur für die lokale Entwicklung (`npm run dev`). Live auf Hostinger nimmt
// public/contact.php die Anfragen an – der statische Export enthält diese Route nicht.
// Mit SMTP_USER/SMTP_PASS in .env.local wird echt gemailt, sonst landet die Anfrage
// als JSON-Datei in anfragen-lokal/.
import nodemailer from 'nodemailer'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextRequest, NextResponse } from 'next/server'

type Anfrage = {
  typ?: string[]
  objekt?: string
  zeit?: string
  plz?: string
  ort?: string
  rolle?: string
  budget?: string
  beschr?: string
  name?: string
  telefon?: string
  email?: string
  einwWeitergabe?: boolean
  einwTelefon?: boolean
  website?: string
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

function pruefen(d: Anfrage): string[] {
  const fehler: string[] = []
  const t = (v?: string) => (v ?? '').trim()
  if (!d.typ?.length) fehler.push('typ')
  if (!t(d.objekt)) fehler.push('objekt')
  if (!t(d.zeit)) fehler.push('zeit')
  if (!/^\d{5}$/.test(t(d.plz))) fehler.push('plz')
  if (t(d.ort).length < 2) fehler.push('ort')
  if (!t(d.rolle)) fehler.push('rolle')
  if (t(d.name).length < 2) fehler.push('name')
  if (!t(d.telefon) && !t(d.email)) fehler.push('kontakt')
  if (t(d.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t(d.email))) fehler.push('email')
  if (!d.einwWeitergabe) fehler.push('einwWeitergabe')
  return fehler
}

function mailHtml(d: Anfrage, zeitpunkt: string) {
  const zeilen: [string, string][] = [
    ['Leistung', (d.typ ?? []).join(', ')],
    ['Objektart', d.objekt ?? ''],
    ['Zeitrahmen', d.zeit ?? ''],
    ['PLZ / Ort', `${d.plz ?? ''} ${d.ort ?? ''}`],
    ['Rolle', d.rolle ?? ''],
    ['Budget', d.budget ?? ''],
    ['Name', d.name ?? ''],
    ['Telefon', d.telefon ?? ''],
    ['E-Mail', d.email ?? ''],
    ['Einwilligung Weitergabe', d.einwWeitergabe ? `Ja (${zeitpunkt})` : 'Nein'],
    ['Einwilligung Telefon', d.einwTelefon ? `Ja (${zeitpunkt})` : 'Nein'],
  ]
  const tabelle = zeilen
    .map(([k, v]) => `<tr><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;width:40%;color:#666;font-size:14px">${k}</td><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px">${esc(v.trim()) || '–'}</td></tr>`)
    .join('')
  const beschr = (d.beschr ?? '').trim()
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <div style="background:#14365C;padding:24px 32px;border-radius:8px 8px 0 0">
        <span style="color:#fff;font-size:18px;font-weight:700">Bodensee BauPartner</span>
      </div>
      <div style="padding:32px;background:#f9f9f9;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px">
        <h2 style="margin:0 0 24px;color:#14365C">Neue Projektanfrage</h2>
        <table style="width:100%;border-collapse:collapse">${tabelle}</table>
        ${beschr ? `<div style="margin-top:24px;padding:16px;background:#fff;border-radius:6px;border:1px solid #e5e5e5"><div style="font-size:12px;color:#666;margin-bottom:8px">Projektbeschreibung</div><div style="font-size:14px;line-height:1.6">${esc(beschr).replace(/\n/g, '<br>')}</div></div>` : ''}
        <div style="margin-top:24px;font-size:12px;color:#999">Eingegangen am ${zeitpunkt} über das Anfrageformular (lokale Entwicklung).</div>
      </div>
    </div>`
}

export async function POST(req: NextRequest) {
  let d: Anfrage
  try {
    d = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  // Honeypot wie in contact.php
  if (d.website) return NextResponse.json({ ok: true })

  const fehler = pruefen(d)
  if (fehler.length) return NextResponse.json({ error: 'Invalid fields', fields: fehler }, { status: 400 })

  const zeitpunkt = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
      await transporter.sendMail({
        from: `"Bodensee BauPartner" <${process.env.SMTP_USER}>`,
        to: 'info@bodensee-baupartner.de',
        replyTo: d.email?.trim() || undefined,
        subject: `Neue Projektanfrage: ${(d.typ ?? []).join(', ')} – ${d.plz} ${d.ort}`,
        html: mailHtml(d, zeitpunkt),
      })
      return NextResponse.json({ ok: true, via: 'smtp' })
    } catch (err) {
      console.error('Mail error:', err)
      return NextResponse.json({ error: 'Mail konnte nicht gesendet werden.' }, { status: 500 })
    }
  }

  const ordner = path.join(process.cwd(), 'anfragen-lokal')
  await mkdir(ordner, { recursive: true })
  const datei = path.join(ordner, `${new Date().toISOString().replace(/[:.]/g, '-')}.json`)
  await writeFile(datei, JSON.stringify({ eingegangen: zeitpunkt, ...d }, null, 2), 'utf8')
  console.log(`[Anfrage lokal gespeichert] ${datei}`)
  return NextResponse.json({ ok: true, via: 'datei' })
}
