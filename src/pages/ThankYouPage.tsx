import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '@/components/layout/Nav'
import { PageSeo } from '@/components/seo/PageSeo'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { buildThankYouSeo } from '@/lib/seo'
import '@/styles/case-study.css'

const thankYouSeo = buildThankYouSeo()

export function ThankYouPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="case-study overflow-x-clip">
      <PageSeo {...thankYouSeo} />
      <Nav surface="light" />
      <main className="case-study__main">
        <article className="legal-page wire-container">
          <p className="legal-page__eyebrow">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            Thank you
          </p>

          <h1 className="legal-page__title">Thanks, we’ll be in touch.</h1>
          <p className="legal-page__meta">Your message is on its way to the Numinas team.</p>

          <div className="legal-page__body">
            <p>
              We just sent a confirmation to your inbox. Someone from Numinas will follow up at{' '}
              <a href="mailto:collab@numinas.studio">collab@numinas.studio</a> shortly.
            </p>
            <p className="mt-8">
              <CreativeCallButton href="/" compact showArrow={false}>
                Back to home
              </CreativeCallButton>
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}
