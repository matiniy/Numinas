import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { Waves } from '@/components/ui/waves'
import { BRAND_LOGO } from '@/lib/brand-logo'
import { SOCIAL_LINKS, type SocialLink } from '@/lib/social-links'

function SocialIcon({ id }: { id: SocialLink['id'] }) {
  if (id === 'instagram') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    )
  }

  if (id === 'pinterest') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 7.2c-1.9 0-3.1 1.28-3.1 3.05 0 1.47.78 2.2 1.76 2.2.27 0 .52-.14.61-.49.05-.18.17-.64.22-.83.07-.3.04-.41-.18-.67-.5-.6-.82-1.34-.82-2.41 0-3.1 2.33-5.33 5.99-5.33 3.26 0 5.05 1.99 5.05 4.65 0 3.44-1.52 5.99-3.77 5.99-.83 0-1.45-.68-1.25-1.52.24-.99.7-2.06.7-2.78 0-.64-.34-1.18-1.05-1.18-.83 0-1.5.86-1.5 2.01 0 .73.25 1.23.25 1.23l-1 4.22c-.3 1.24-.04 2.76-.02 2.91.01.12.17.15.24.06.1-.14 1.42-2.22 1.86-3.27.13-.31.72-1.8.72-1.8.36.68 1.4 1.27 2.51 1.27 3.3 0 5.55-3.01 5.55-7.04C18.3 9.55 15.64 7.2 12 7.2Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M8 10.2v6.1M8 7.6v.01M12 16.3V13c0-1.1.9-1.7 1.9-1.7 1.1 0 1.8.7 1.8 1.9v3.1M12 16.3h3.7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
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
            {submitted ? (
              <div className="contact-form contact-form--success">
                <p className="type-h3 contact-form__success-title">Thanks, we’ll be in touch.</p>
                <p className="type-small mt-2 contact-form__success-note">
                  Form is wireframe-only (no backend yet).
                </p>
                <CreativeCallButton
                  type="button"
                  className="mt-6"
                  showArrow={false}
                  compact
                  onClick={() => setSubmitted(false)}
                >
                  Reset
                </CreativeCallButton>
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
                  />
                </label>

                <label className="contact-field">
                  <span className="contact-field__label">Company</span>
                  <input
                    className="contact-field__input"
                    name="company"
                    autoComplete="organization"
                    placeholder="Company name"
                  />
                </label>

                <label className="contact-field">
                  <span className="contact-field__label">Message</span>
                  <textarea
                    className="contact-field__input contact-field__input--textarea"
                    name="message"
                    placeholder="Tell us about your project"
                    required
                  />
                </label>

                <CreativeCallButton type="submit" compact className="contact-form__action">
                  Submit
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
              <img src={BRAND_LOGO.mark} alt="" width={718} height={601} decoding="async" />
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
                  <SocialIcon id={link.id} />
                </a>
              ))}
            </nav>
          </div>

          <p className="contact-section__copyright">© {new Date().getFullYear()} Numinas</p>
        </div>
      </div>
    </section>
  )
}
