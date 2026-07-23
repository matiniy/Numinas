import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { Waves } from '@/components/ui/waves'
import { BRAND_LOGO } from '@/lib/brand-logo'
import { SOCIAL_LINKS } from '@/lib/social-links'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: String(data.get('fullName') || ''),
          email: String(data.get('email') || ''),
          company: String(data.get('company') || ''),
          message: String(data.get('message') || ''),
          website: String(data.get('website') || ''),
        }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please email collab@numinas.studio.',
      )
    }
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-section__waves" aria-hidden="true">
        <Waves
          lineColor="#d8d8db"
          backgroundColor="#e9e9ec"
          waveSpeedX={0.02}
          waveSpeedY={0.015}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.77}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      <div className="wire-container contact-section__container">
        <div className="contact-section__grid">
          <div className="contact-section__content">
            <p className="contact-section__label">Contact</p>

            <h2 id="contact-heading" className="type-h2 contact-section__title">
              Tailored for You
            </h2>

            <p className="type-body contact-section__subtitle">
              Timelines and deliverables designed around your launch. We scope fast, share a clear
              plan, and deliver buttoned-up files for every channel.
            </p>

            <a href="mailto:collab@numinas.studio" className="contact-section__email">
              collab@numinas.studio
            </a>
          </div>

          <div className="contact-section__form-wrap">
            {status === 'success' ? (
              <div className="contact-form contact-form--success" role="status" aria-live="polite">
                <div className="contact-form__success-brand">
                  <img
                    src={BRAND_LOGO.mark}
                    alt="Numinas"
                    width={40}
                    height={40}
                    className="contact-form__success-mark"
                    decoding="async"
                  />
                  <p className="contact-form__success-eyebrow">Inquiry received</p>
                </div>
                <p className="type-h3 contact-form__success-title">
                  Thanks! Your inquiry has been received.
                </p>
                <p className="type-small contact-form__success-note">
                  We’ll review your project details and get back to you within 1–2 business days. We
                  appreciate you considering Numinas and look forward to learning more about your
                  project. Check your inbox (and spam folder) for a confirmation email.
                </p>
                <div className="contact-form__success-actions">
                  <CreativeCallButton href="/" compact showArrow={false}>
                    Back to home
                  </CreativeCallButton>
                  <a href="/#projects" className="contact-form__success-link">
                    View selected work
                  </a>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <label className="contact-field">
                  <span className="contact-field__label">Full name</span>
                  <input
                    className="contact-field__input"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    disabled={status === 'submitting'}
                  />
                </label>

                <label className="contact-field">
                  <span className="contact-field__label">Email Address</span>
                  <input
                    className="contact-field__input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                    disabled={status === 'submitting'}
                  />
                </label>

                <label className="contact-field">
                  <span className="contact-field__label">Company</span>
                  <input
                    className="contact-field__input"
                    name="company"
                    autoComplete="organization"
                    placeholder="Company name"
                    disabled={status === 'submitting'}
                  />
                </label>

                <label className="contact-field">
                  <span className="contact-field__label">Message</span>
                  <textarea
                    className="contact-field__input contact-field__input--textarea"
                    name="message"
                    placeholder="Tell us about your project"
                    required
                    disabled={status === 'submitting'}
                  />
                </label>

                <label className="sr-only" aria-hidden="true">
                  Website
                  <input tabIndex={-1} autoComplete="off" name="website" />
                </label>

                {status === 'error' ? (
                  <p className="type-small contact-form__error" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <CreativeCallButton
                  type="submit"
                  compact
                  className="contact-form__action"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Submit'}
                </CreativeCallButton>
              </form>
            )}
          </div>
        </div>

        <div className="contact-section__meta">
          <a href="mailto:collab@numinas.studio" className="contact-section__meta-email">
            collab@numinas.studio
          </a>

          <div className="contact-section__brand">
            <Link to="/" className="contact-section__logo" aria-label="Numinas home">
              <img src={BRAND_LOGO.mark} alt="Numinas" width={512} height={512} decoding="async" />
            </Link>

            <nav className="contact-section__social" aria-label="Social">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="contact-section__social-link"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={link.label}
                >
                  <img src={link.icon} alt={link.label} width={14} height={14} decoding="async" />
                </a>
              ))}
            </nav>
          </div>

          <p className="contact-section__copyright">
            © {new Date().getFullYear()} Numinas. All rights reserved.{' '}
            <Link to="/privacy" className="contact-section__legal-link">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
