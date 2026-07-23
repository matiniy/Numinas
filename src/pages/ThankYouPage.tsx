import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '@/components/layout/Nav'
import { PageSeo } from '@/components/seo/PageSeo'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { Waves } from '@/components/ui/waves'
import { BRAND_LOGO } from '@/lib/brand-logo'
import { buildThankYouSeo } from '@/lib/seo'
import '@/styles/case-study.css'

const thankYouSeo = buildThankYouSeo()

export function ThankYouPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="thank-you-page overflow-x-clip">
      <PageSeo {...thankYouSeo} />
      <Nav surface="light" />
      <main className="thank-you-page__main">
        <div className="thank-you-page__waves" aria-hidden="true">
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

        <div className="wire-container thank-you-page__container">
          <div className="contact-form contact-form--success thank-you-page__card" role="status">
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
            <h1 className="type-h3 contact-form__success-title">
              Thanks! Your inquiry has been received.
            </h1>
            <p className="type-small contact-form__success-note">
              We’ll review your project details and get back to you within 1–2 business days. We
              appreciate you considering Numinas and look forward to learning more about your
              project.
            </p>
            <div className="contact-form__success-actions">
              <CreativeCallButton href="/" compact showArrow={false}>
                Back to home
              </CreativeCallButton>
              <Link to="/#projects" className="contact-form__success-link">
                View selected work
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
