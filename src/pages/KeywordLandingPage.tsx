import { useId, useState } from 'react'
import { Nav } from '@/components/layout/Nav'
import { Hero } from '@/components/sections/Hero'
import { TrustedBy } from '@/components/sections/TrustedBy'
import { Pillars } from '@/components/sections/Pillars'
import { Projects } from '@/components/sections/Projects'
import { Testimonials } from '@/components/sections/Testimonials'
import { HowIdeas } from '@/components/sections/HowIdeas'
import { ContactMarquee } from '@/components/sections/ContactMarquee'
import { Contact } from '@/components/sections/Contact'
import { PageSeo } from '@/components/seo/PageSeo'
import type { KeywordLandingConfig } from '@/lib/keyword-landings'
import { buildKeywordLandingSeo } from '@/lib/seo'
import { cn } from '@/lib/utils'

function LandingFaq({ faqs }: { faqs: KeywordLandingConfig['faqs'] }) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="keyword-landing__faq" id="faq">
      <p className="type-eyebrow mb-4 text-[var(--n-mist)]">FAQ</p>
      <div className="keyword-landing__faq-list">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index
          const panelId = `${baseId}-panel-${index}`
          const buttonId = `${baseId}-button-${index}`

          return (
            <div
              key={item.question}
              className={cn('keyword-landing__faq-item', isOpen && 'keyword-landing__faq-item--open')}
            >
              <h3 className="keyword-landing__faq-question">
                <button
                  type="button"
                  id={buttonId}
                  className="keyword-landing__faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="keyword-landing__faq-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="keyword-landing__faq-panel"
                hidden={!isOpen}
              >
                <p className="type-body text-[var(--n-mist)]">{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Homepage layout minus Services/wheel; keyword-specific hero, band, and contact. */
export function KeywordLandingPage({ config }: { config: KeywordLandingConfig }) {
  const seo = buildKeywordLandingSeo(config)

  return (
    <div className="keyword-landing min-h-screen overflow-x-clip">
      <PageSeo {...seo} />
      <Nav revealDelayMs={5000} />
      <main>
        <Hero
          title={config.hero.title}
          body={config.hero.body}
          accentWords={config.hero.accentWords}
        />
        <TrustedBy />
        <Testimonials />
        <Pillars />
        <Projects />

        <section
          className="wire-section keyword-landing__mid"
          aria-labelledby={`${config.id}-mid-heading`}
        >
          <div className="wire-container">
            <p className="type-eyebrow mb-3 text-[var(--n-mist)]">{config.mid.eyebrow}</p>
            <h2 id={`${config.id}-mid-heading`} className="type-h2 mb-4 max-w-[20ch] text-balance">
              {config.mid.title}
            </h2>
            <p className="type-body mb-10 max-w-2xl text-[var(--n-mist)]">{config.mid.body}</p>

            <div className="keyword-landing__points">
              {config.mid.points.map((point) => (
                <article key={point.title} className="keyword-landing__point">
                  <h3 className="keyword-landing__point-title">{point.title}</h3>
                  <p className="type-body text-[var(--n-mist)]">{point.body}</p>
                </article>
              ))}
            </div>

            <LandingFaq faqs={config.faqs} />
          </div>
        </section>

        <HowIdeas />
        <ContactMarquee />
        <Contact
          label={config.contact.label}
          title={config.contact.title}
          subtitle={config.contact.subtitle}
          messagePlaceholder={config.contact.messagePlaceholder}
        />
      </main>
    </div>
  )
}
