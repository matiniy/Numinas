import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '@/components/layout/Nav'
import { PageSeo } from '@/components/seo/PageSeo'
import { SITE_FAQS } from '@/lib/privacy-faq'
import { buildPrivacySeo } from '@/lib/seo'
import { cn } from '@/lib/utils'
import '@/styles/case-study.css'

const privacySeo = buildPrivacySeo()

function PrivacyFaq() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="legal-faq" aria-labelledby={`${baseId}-heading`} id="faq">
      <h2 id={`${baseId}-heading`} className="legal-faq__title">
        FAQ
      </h2>
      <p className="legal-faq__intro">
        Common questions about Numinas, our motion studio, services, process, and how we work with brands.
      </p>

      <div className="legal-faq__list">
        {SITE_FAQS.map((item, index) => {
          const isOpen = openIndex === index
          const panelId = `${baseId}-panel-${index}`
          const buttonId = `${baseId}-button-${index}`

          return (
            <div key={item.question} className={cn('legal-faq__item', isOpen && 'legal-faq__item--open')}>
              <h3 className="legal-faq__question">
                <button
                  type="button"
                  id={buttonId}
                  className="legal-faq__trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="legal-faq__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="legal-faq__panel"
                hidden={!isOpen}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="case-study overflow-x-clip">
      <PageSeo {...privacySeo} />
      <Nav surface="light" />
      <main className="case-study__main">
        <article className="legal-page wire-container">
          <p className="legal-page__eyebrow">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            Privacy Policy
          </p>

          <h1 className="legal-page__title">Privacy Policy</h1>
          <p className="legal-page__meta">
            <strong>Effective Date:</strong> July 22, 2026
          </p>

          <div className="legal-page__body">
            <p>
              At <strong>Numinas</strong>, we value your privacy and are committed to protecting your personal
              information. This Privacy Policy explains what information we collect, how we use it, and the choices
              you have regarding your data when you visit <strong>numinas.studio</strong>.
            </p>
            <p>
              This website is operated by <strong>Numinas Canada</strong> (&quot;Numinas&quot;, &quot;we&quot;,
              &quot;our&quot;, or &quot;us&quot;).
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect information you voluntarily provide, including:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Company name</li>
              <li>Phone number (if provided)</li>
              <li>Project details or messages submitted through our contact forms</li>
              <li>Any other information you choose to share with us</li>
            </ul>
            <p>We also collect certain technical information automatically, including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser and device information</li>
              <li>Pages visited</li>
              <li>Referring website</li>
              <li>Date and time of your visit</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Respond to inquiries and project requests</li>
              <li>Communicate about our services</li>
              <li>Deliver proposals and project information</li>
              <li>Improve our website and user experience</li>
              <li>Analyze website traffic and performance</li>
              <li>Send marketing communications if you have chosen to receive them</li>
              <li>Protect our website from fraud or misuse</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Cookies</h2>
            <p>
              Our website uses cookies and similar technologies to improve your browsing experience, understand
              website usage, and enhance our services.
            </p>
            <p>
              You can control or disable cookies through your browser settings. Please note that some features of the
              website may not function properly if cookies are disabled.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We use trusted third-party providers to operate our website and business, which may include:
            </p>
            <ul>
              <li>Wix</li>
              <li>Google Analytics</li>
              <li>Google Tag Manager</li>
              <li>Calendly</li>
              <li>HubSpot</li>
              <li>Google Workspace</li>
            </ul>
            <p>
              These providers may process personal information on our behalf in accordance with their own privacy
              policies.
            </p>

            <h2>Marketing Communications</h2>
            <p>
              If you subscribe to our newsletter or request updates, we may occasionally send you emails about our
              services, insights, or company news.
            </p>
            <p>
              You may unsubscribe at any time by clicking the unsubscribe link included in our emails or by contacting
              us directly.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to fulfill the purposes described in this
              Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h2>Data Security</h2>
            <p>
              We take reasonable administrative, technical, and organizational measures to safeguard personal
              information against unauthorized access, disclosure, alteration, or destruction.
            </p>
            <p>
              While we strive to protect your information, no method of internet transmission or electronic storage is
              completely secure.
            </p>

            <h2>International Data Transfers</h2>
            <p>
              Some of our service providers may process information outside of Canada. By using our website, you
              understand that your information may be transferred to and processed in other countries where privacy
              laws may differ from those in your jurisdiction.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location and applicable law, you may have the right to:</p>
            <ul>
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information where permitted</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p>To exercise these rights, please contact us using the information below.</p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices
              or content of those websites.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our services are intended for businesses and individuals over the age of 16. We do not knowingly collect
              personal information from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
              updated Effective Date.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle your personal information, please
              contact us:
            </p>
            <ul>
              <li>
                Website:{' '}
                <a href="https://www.numinas.studio" target="_blank" rel="noreferrer noopener">
                  https://www.numinas.studio
                </a>
              </li>
              <li>
                Email: <a href="mailto:info@numinas.studio">info@numinas.studio</a>
              </li>
            </ul>
          </div>

          <PrivacyFaq />
        </article>
      </main>
    </div>
  )
}
