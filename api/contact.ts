import { Resend } from 'resend'
import type { VercelRequest, VercelResponse } from '@vercel/node'

type ContactPayload = {
  fullName?: string
  email?: string
  company?: string
  message?: string
  website?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function readString(value: unknown, max = 2000) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const toEmail = (process.env.CONTACT_TO_EMAIL || 'collab@numinas.studio').trim()
  const fromEmail = (process.env.CONTACT_FROM_EMAIL || 'Numinas <collab@numinas.studio>').trim()

  if (!apiKey) {
    return res.status(500).json({ error: 'Email service is not configured.' })
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as ContactPayload

  // Honeypot — bots fill hidden "website" fields
  if (readString(body.website, 100)) {
    return res.status(200).json({ ok: true })
  }

  const fullName = readString(body.fullName, 120)
  const email = readString(body.email, 200).toLowerCase()
  const company = readString(body.company, 160)
  const message = readString(body.message, 5000)

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  const resend = new Resend(apiKey)
  const safeName = escapeHtml(fullName)
  const safeEmail = escapeHtml(email)
  const safeCompany = escapeHtml(company || '—')
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />')

  const adminResult = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: `New inquiry from ${fullName}${company ? ` (${company})` : ''}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Company:</strong> ${safeCompany}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  })

  if (adminResult.error) {
    console.error('Resend admin email failed', adminResult.error)
    return res.status(502).json({ error: 'Could not send your message. Please email collab@numinas.studio.' })
  }

  const userResult = await resend.emails.send({
    from: fromEmail,
    to: [email],
    subject: 'Thanks for reaching out to Numinas',
    html: `
      <p>Hi ${safeName},</p>
      <p>Thanks for contacting Numinas. We received your note and will get back to you soon.</p>
      <p>If anything is urgent, reply to this email or write us at
        <a href="mailto:collab@numinas.studio">collab@numinas.studio</a>.</p>
      <p>— Numinas</p>
    `,
  })

  if (userResult.error) {
    // Admin mail already sent — still treat as success for the visitor
    console.error('Resend confirmation email failed', userResult.error)
  }

  return res.status(200).json({ ok: true })
}
