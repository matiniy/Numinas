import { FormEvent, useState } from 'react'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="wire-section" aria-labelledby="contact-heading">
      <div className="wire-container">
        <p className="wire-label">07 · Contact</p>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="contact-heading" className="type-h2">
              Get in Touch
            </h2>
            <p className="type-body mt-3 text-[var(--n-mist)]">
              Based in Vancouver and Toronto. Prefer email?
            </p>
            <a
              href="mailto:collab@numinas.studio"
              className="type-small mt-4 inline-block hover:underline"
            >
              collab@numinas.studio
            </a>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="wire-box p-6">
                <p className="type-h3">Thanks — we’ll be in touch.</p>
                <p className="type-small mt-2 text-[var(--n-mist)]">
                  Form is wireframe-only (no backend yet).
                </p>
                <button
                  type="button"
                  className="wire-btn mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Reset
                </button>
              </div>
            ) : (
              <form className="wire-box grid gap-4 p-4 md:p-6" onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="type-small flex flex-col gap-2">
                    First name
                    <input className="wire-input" name="firstName" autoComplete="given-name" required />
                  </label>
                  <label className="type-small flex flex-col gap-2">
                    Last name
                    <input className="wire-input" name="lastName" autoComplete="family-name" required />
                  </label>
                </div>
                <label className="type-small flex flex-col gap-2">
                  Email
                  <input
                    className="wire-input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="type-small flex flex-col gap-2">
                  Company name
                  <input className="wire-input" name="company" autoComplete="organization" />
                </label>
                <label className="type-small flex flex-col gap-2">
                  How can we help?
                  <textarea className="wire-input min-h-28 py-3" name="message" required />
                </label>
                <button type="submit" className="wire-btn w-full md:w-auto">
                  Let’s Talk
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
