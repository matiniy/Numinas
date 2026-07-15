import { FormEvent, useState } from 'react'
import Aurora from '@/components/ui/Aurora'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { CONTACT_AURORA_COLORS } from '@/lib/glass-chips'

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7.2C4 6.08 4 5.52 4.218 5.092c.192-.336.498-.642.834-.834C5.28 4 5.84 4 6.96 4h10.08c1.12 0 1.68 0 1.908.258.336.192.642.498.834.834C20 5.52 20 6.08 20 7.2v9.6c0 1.12 0 1.68-.218 2.108a1.6 1.6 0 0 1-.834.834C18.72 20 18.16 20 17.04 20H6.96c-1.12 0-1.68 0-1.908-.258a1.6 1.6 0 0 1-.834-.834C4 18.48 4 17.92 4 16.8V7.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m4 7 7.447 4.966a2 2 0 0 0 2.106 0L21 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
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
      <div className="contact-section__backdrop" aria-hidden="true">
        <div className="contact-section__aurora">
          <Aurora
            colorStops={CONTACT_AURORA_COLORS}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
      </div>

      <div className="wire-container contact-section__container">
        <div className="contact-section__grid">
          <div className="contact-section__content">
            <div className="contact-section__badge">
              <MailIcon />
            </div>

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
                <p className="type-h3">Thanks — we’ll be in touch.</p>
                <p className="type-small mt-2 text-[var(--n-mist)]">
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
      </div>
    </section>
  )
}
