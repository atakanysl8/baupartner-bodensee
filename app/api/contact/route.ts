import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(req: NextRequest) {
  const { typ, zeit, beschr, ort, budget, vorname, nachname, email, telefon } = await req.json()

  try {
    await transporter.sendMail({
      from: `"Bodensee BauPartner" <${process.env.SMTP_USER}>`,
      to: 'info@bodensee-baupartner.de',
      replyTo: email,
      subject: `Neue Projektanfrage: ${typ?.join(', ') || 'Sonstiges'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#14365C;padding:24px 32px;border-radius:8px 8px 0 0">
            <span style="color:#fff;font-size:18px;font-weight:700">Bodensee BauPartner</span>
          </div>
          <div style="padding:32px;background:#f9f9f9;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px">
            <h2 style="margin:0 0 24px;color:#14365C">Neue Projektanfrage</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;width:40%;color:#666;font-size:14px">Projektart</td><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px">${typ?.join(', ') || '–'}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px">Zeitrahmen</td><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px">${zeit || '–'}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px">Ort / PLZ</td><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px">${ort || '–'}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px">Budget</td><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px">${budget || '–'}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px">Name</td><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px">${vorname} ${nachname}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;color:#666;font-size:14px">E-Mail</td><td style="padding:8px 0;border-bottom:1px solid #e5e5e5;font-size:14px"><a href="mailto:${email}" style="color:#14365C">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#666;font-size:14px">Telefon</td><td style="padding:8px 0;font-size:14px">${telefon || '–'}</td></tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#fff;border-radius:6px;border:1px solid #e5e5e5">
              <div style="font-size:12px;color:#666;margin-bottom:8px">Projektbeschreibung</div>
              <div style="font-size:14px;line-height:1.6">${beschr}</div>
            </div>
            <div style="margin-top:24px;font-size:12px;color:#999">
              Diese Anfrage wurde über das Kontaktformular auf bodensee-baupartner.de gesendet.
            </div>
          </div>
        </div>
      `,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Mail error:', err)
    return NextResponse.json({ error: 'Mail konnte nicht gesendet werden.' }, { status: 500 })
  }
}
