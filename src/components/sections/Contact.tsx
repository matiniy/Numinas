import { FormEvent, useState } from 'react'
import Aurora from '@/components/ui/Aurora'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { CONTACT_AURORA_COLORS } from '@/lib/glass-chips'

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
