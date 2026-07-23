import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { Waves } from '@/components/ui/waves'
import { BRAND_LOGO } from '@/lib/brand-logo'
import { SOCIAL_LINKS } from '@/lib/social-links'

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
              <img src={BRAND_LOGO.mark} alt="" width={512} height={512} decoding="async" />
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
                  <img src={link.icon} alt="" width={14} height={14} decoding="async" />
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
