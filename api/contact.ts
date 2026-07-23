import nodemailer from 'nodemailer'
import type { VercelRequest, VercelResponse } from '@vercel/node'

type ContactPayload = {
  fullName?: string
  email?: string
  company?: string
  message?: string
  website?: string
}

type MailMessage = {
  from: string
  to: string
  replyTo: string
  subject: string
  html: string
  text?: string
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

function cleanEnv(value: string | undefined) {
  return (value || '').trim().replace(/^['"]|['"]$/g, '')
}

function getSiteUrl() {
  return (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://www.numinas.studio')
    .trim()
    .replace(/\/$/, '')
}

function parseFromAddress(from: string) {
  const match = from.match(/^(.*)<([^>]+)>\s*$/)
  if (match) {
    return {
      name: match[1].trim().replace(/^["']|["']$/g, '') || 'Numinas',
      email: match[2].trim(),
    }
  }
  return { name: 'Numinas', email: from.trim() }
}

/** Branded HTML shell — logo + PP Mori when clients allow web fonts. */
function buildEmailShell(options: {
  siteUrl: string
  title: string
  preheader: string
  bodyHtml: string
}) {
  const { siteUrl, title, preheader, bodyHtml } = options
  const logoUrl = `${siteUrl}/logo/numinas-logo-white.svg`
  const markUrl = `${siteUrl}/logo/Logo.png`
  const fontBook = `${siteUrl}/fonts/Mori/PPMori-Book.woff2`
  const fontRegular = `${siteUrl}/fonts/Mori/PPMori-Regular.woff2`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(title)}</title>
  <style>
    @font-face {
      font-family: "PP Mori";
      src: url("${fontBook}") format("woff2");
      font-weight: 450;
      font-style: normal;
    }
    @font-face {
      font-family: "PP Mori";
      src: url("${fontRegular}") format("woff2");
      font-weight: 400;
      font-style: normal;
    }
    body, table, td, a {
      font-family: "PP Mori", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#e9e9ec;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e9e9ec;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid rgba(10,10,11,0.08);">
          <tr>
            <td style="background:#0a0a0b;padding:28px 32px;">
              <img src="${logoUrl}" width="140" height="20" alt="Numinas" style="display:block;height:20px;width:auto;border:0;" />
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 28px;color:#0a0a0b;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(10,10,11,0.08);padding-top:20px;">
                <tr>
                  <td style="padding-top:20px;">
                    <img src="${markUrl}" width="28" height="28" alt="" style="display:block;border:0;border-radius:6px;" />
                    <p style="margin:12px 0 0;font-size:12px;line-height:1.5;color:#8a8a93;">
                      Numinas · Vancouver motion studio<br />
                      <a href="mailto:collab@numinas.studio" style="color:#0a0a0b;text-decoration:none;">collab@numinas.studio</a>
                      ·
                      <a href="${siteUrl}" style="color:#0a0a0b;text-decoration:none;">numinas.studio</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function formatMailError(message: string) {
  const lower = message.toLowerCase()

  if (lower.includes('unauthorized ip') || lower.includes('525')) {
    return 'Brevo blocked this server IP. Prefer BREVO_API_KEY (HTTPS API) instead of SMTP on Vercel.'
  }

  if (lower.includes('sender') && (lower.includes('not valid') || lower.includes('validate'))) {
    return 'Brevo sender is not verified. Verify collab@numinas.studio under Senders, then retry.'
  }

  if (lower.includes('unauthorized') || lower.includes('api-key') || lower.includes('401')) {
    return 'Brevo API key is missing or invalid. Set BREVO_API_KEY in Vercel (SMTP & API → API keys).'
  }

  if (
    lower.includes('invalid login') ||
    lower.includes('username and password') ||
    lower.includes('authentication') ||
    lower.includes('535')
  ) {
    return `Mail login failed (${message.slice(0, 120)}). On Vercel use BREVO_API_KEY instead of SMTP.`
  }

  if (lower.includes('enotfound') || lower.includes('connect') || lower.includes('timeout') || lower.includes('econn')) {
    return 'Could not reach the mail server over SMTP. Set BREVO_API_KEY in Vercel — Vercel often blocks outbound SMTP ports.'
  }

  return `Could not send your message (${message.slice(0, 160)}). Please email collab@numinas.studio.`
}

async function sendViaBrevoApi(apiKey: string, message: MailMessage) {
  const sender = parseFromAddress(message.from)
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender,
      to: [{ email: message.to }],
      replyTo: { email: message.replyTo },
      subject: message.subject,
      htmlContent: message.html,
      textContent: message.text,
    }),
  })

  const payload = (await response.json().catch(() => null)) as
    | { messageId?: string; message?: string; code?: string }
    | null

  if (!response.ok) {
    throw new Error(payload?.message || `Brevo API error ${response.status}`)
  }

  return { messageId: payload?.messageId || 'brevo-api' }
}

async function sendViaSmtp(message: MailMessage) {
  const smtpUser = cleanEnv(process.env.SMTP_USER || process.env.CONTACT_TO_EMAIL).toLowerCase()
  const smtpPass = cleanEnv(process.env.SMTP_PASS).replace(/\s+/g, '')
  const smtpHost = cleanEnv(process.env.SMTP_HOST || 'smtp-relay.brevo.com')
  const defaultPort = smtpHost.includes('brevo') ? '2525' : '587'
  const smtpPort = Number(cleanEnv(process.env.SMTP_PORT || defaultPort)) || Number(defaultPort)

  if (!smtpUser || !smtpPass) {
    throw new Error('SMTP_USER / SMTP_PASS missing. Prefer BREVO_API_KEY on Vercel.')
  }

  const transporter = nodemailer.createTransport(
    smtpHost.includes('gmail.com')
      ? {
          service: 'gmail',
          auth: { user: smtpUser, pass: smtpPass },
        }
      : {
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          requireTLS: smtpPort === 587 || smtpPort === 2525,
          connectionTimeout: 15_000,
          greetingTimeout: 15_000,
          family: 4,
          auth: { user: smtpUser, pass: smtpPass },
        },
  )

  const info = await transporter.sendMail({
    from: message.from,
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    html: message.html,
    text: message.text,
  })

  return { messageId: info.messageId || 'smtp' }
}

async function sendMail(message: MailMessage) {
  const brevoApiKey = cleanEnv(process.env.BREVO_API_KEY)
  if (brevoApiKey) {
    return sendViaBrevoApi(brevoApiKey, message)
  }
  return sendViaSmtp(message)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const toEmail = cleanEnv(process.env.CONTACT_TO_EMAIL || 'collab@numinas.studio')
  const fromEmail = cleanEnv(
    process.env.CONTACT_FROM_EMAIL || 'Numinas Studio <collab@numinas.studio>',
  )
  const siteUrl = getSiteUrl()
  const brevoApiKey = cleanEnv(process.env.BREVO_API_KEY)
  const smtpPass = cleanEnv(process.env.SMTP_PASS)

  if (!brevoApiKey && !smtpPass) {
    return res.status(500).json({
      error: 'Email is not configured. Set BREVO_API_KEY in Vercel (recommended on Vercel hosting).',
    })
  }

  let body: ContactPayload
  try {
    body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as ContactPayload
  } catch {
    return res.status(400).json({ error: 'Invalid request body.' })
  }

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

  const firstName = fullName.split(/\s+/)[0] || fullName
  const safeName = escapeHtml(fullName)
  const safeFirstName = escapeHtml(firstName)
  const safeEmail = escapeHtml(email)
  const safeCompany = escapeHtml(company || '—')
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />')
  const portfolioUrl = `${siteUrl}/#projects`

  const adminHtml = buildEmailShell({
    siteUrl,
    title: `New inquiry from ${fullName}`,
    preheader: `${fullName} sent a project inquiry via numinas.studio`,
    bodyHtml: `
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a8a93;">New inquiry</p>
      <h1 style="margin:0 0 20px;font-size:28px;line-height:1.15;font-weight:450;color:#0a0a0b;">${safeName}</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;font-size:15px;line-height:1.55;color:#2a2a32;">
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(10,10,11,0.08);"><strong style="color:#0a0a0b;">Email</strong><br /><a href="mailto:${safeEmail}" style="color:#0a0a0b;">${safeEmail}</a></td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(10,10,11,0.08);"><strong style="color:#0a0a0b;">Company</strong><br />${safeCompany}</td></tr>
        <tr><td style="padding:8px 0;"><strong style="color:#0a0a0b;">Message</strong><br />${safeMessage}</td></tr>
      </table>
      <p style="margin:0;font-size:13px;color:#8a8a93;">Reply directly to this email to respond to ${safeName}.</p>
    `,
  })

  const userHtml = buildEmailShell({
    siteUrl,
    title: 'Thanks for contacting Numinas',
    preheader: 'We’ve received your inquiry and will get back to you within 1–2 business days.',
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#2a2a32;">Hi ${safeFirstName},</p>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#2a2a32;">
        Thanks for reaching out to Numinas! We’ve received your inquiry and appreciate you taking the time to tell us about your project.
      </p>
      <p style="margin:0 0 10px;font-size:16px;line-height:1.55;color:#0a0a0b;font-weight:450;">Here’s what happens next:</p>
      <ul style="margin:0 0 20px;padding-left:20px;font-size:16px;line-height:1.6;color:#2a2a32;">
        <li style="margin-bottom:8px;">We’ll review your project details.</li>
        <li style="margin-bottom:8px;">We’ll get back to you within 1–2 business days.</li>
        <li style="margin-bottom:8px;">If it seems like a good fit, we’ll schedule a discovery call to discuss your goals, timeline, and next steps.</li>
      </ul>
      <p style="margin:0 0 8px;font-size:16px;line-height:1.55;color:#2a2a32;">
        In the meantime, you’re welcome to explore our latest work:
      </p>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.55;">
        <a href="${portfolioUrl}" style="color:#0a0a0b;">Portfolio: ${escapeHtml(portfolioUrl)}</a>
      </p>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.55;color:#2a2a32;">
        If you have any additional information you’d like to share, simply reply to this email.
      </p>
      <p style="margin:0 0 4px;font-size:16px;line-height:1.55;color:#2a2a32;">Looking forward to connecting!</p>
      <p style="margin:16px 0 0;font-size:16px;line-height:1.55;color:#0a0a0b;">
        Best,<br />
        Numinas<br />
        <a href="mailto:collab@numinas.studio" style="color:#0a0a0b;">collab@numinas.studio</a>
      </p>
    `,
  })

  const transport = brevoApiKey ? 'brevo-api' : 'smtp'

  try {
    const admin = await sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New inquiry from ${fullName}${company ? ` (${company})` : ''}`,
      html: adminHtml,
    })
    console.info('Admin email sent', { to: toEmail, from: fromEmail, messageId: admin.messageId, transport })
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Unknown mail error'
    console.error('Admin email failed', { message: messageText, from: fromEmail, to: toEmail, transport })
    return res.status(502).json({ error: formatMailError(messageText) })
  }

  let confirmationSent = false
  try {
    const confirmation = await sendMail({
      from: fromEmail,
      to: email,
      replyTo: toEmail,
      subject: 'Thanks for contacting Numinas',
      html: userHtml,
      text: `Hi ${firstName},\n\nThanks for reaching out to Numinas! We've received your inquiry and will get back to you within 1–2 business days.\n\nBest,\nNuminas\ncollab@numinas.studio\n`,
    })
    confirmationSent = true
    console.info('Confirmation email sent', {
      to: email,
      from: fromEmail,
      messageId: confirmation.messageId,
      transport,
    })
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Unknown mail error'
    console.error('Confirmation email failed', { message: messageText, to: email, from: fromEmail, transport })
  }

  return res.status(200).json({ ok: true, confirmationSent })
}
