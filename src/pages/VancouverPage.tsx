import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '@/components/layout/Nav'
import { Contact } from '@/components/sections/Contact'
import { HeroVideo } from '@/components/sections/HeroVideo'
import { PageSeo } from '@/components/seo/PageSeo'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { PROJECTS } from '@/lib/projects'
import { buildVancouverSeo, getProjectOgImage } from '@/lib/seo'
import {
  VANCOUVER_AREAS,
  VANCOUVER_CTA,
  VANCOUVER_FAQS,
  VANCOUVER_HERO,
  VANCOUVER_INTRO,
  VANCOUVER_PROCESS,
  VANCOUVER_SERVICES,
  VANCOUVER_WORK,
} from '@/lib/vancouver-content'
import { cn } from '@/lib/utils'
import '@/styles/vancouver.css'

const vancouverSeo = buildVancouverSeo()
const featuredWork = PROJECTS.slice(0, 3)

function VancouverFaq() {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="vancouver-section" aria-labelledby={`${baseId}-heading`} id="faq">
      <div className="wire-container">
        <p className="vancouver-section__eyebrow">FAQ</p>
        <h2 id={`${baseId}-heading`} className="vancouver-section__title">
          Vancouver motion studio questions
        </h2>
        <p className="vancouver-section__intro">
          Local answers for brands looking for a motion graphics and animation partner in Vancouver,
          BC.
        </p>

        <div className="vancouver-faq__list">
          {VANCOUVER_FAQS.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`

            return (
              <div
                key={item.question}
                className={cn('vancouver-faq__item', isOpen && 'vancouver-faq__item--open')}
              >
                <h3 className="vancouver-faq__question">
                  <button
                    type="button"
                    id={buttonId}
                    className="vancouver-faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="vancouver-faq__icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="vancouver-faq__panel"
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function VancouverPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="vancouver-page overflow-x-clip">
      <PageSeo {...vancouverSeo} />
      <Nav />
      <main className="vancouver-page__main">
        <header className="vancouver-hero">
          <div className="vancouver-hero__media" aria-hidden="true">
            <HeroVideo />
          </div>
          <div className="vancouver-hero__veil" aria-hidden="true" />
          <div className="vancouver-hero__content wire-container">
            <p className="vancouver-hero__brand">{VANCOUVER_HERO.brand}</p>
            <h1 className="vancouver-hero__headline">{VANCOUVER_HERO.headline}</h1>
            <p className="type-body vancouver-hero__support">{VANCOUVER_HERO.support}</p>
            <div className="vancouver-hero__actions">
              <CreativeCallButton href={VANCOUVER_HERO.ctaHref} tone="light" plain>
                {VANCOUVER_HERO.ctaLabel}
              </CreativeCallButton>
              <Link to="/#projects" className="vancouver-hero__secondary">
                View selected work
              </Link>
            </div>
          </div>
        </header>

        <section className="vancouver-section" aria-labelledby="vancouver-intro-heading">
          <div className="wire-container">
            <p className="vancouver-section__eyebrow">{VANCOUVER_INTRO.eyebrow}</p>
            <h2 id="vancouver-intro-heading" className="vancouver-section__title">
              {VANCOUVER_INTRO.title}
            </h2>
            <div className="vancouver-section__body type-body">
              {VANCOUVER_INTRO.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="vancouver-section" aria-labelledby="vancouver-services-heading">
          <div className="wire-container">
            <p className="vancouver-section__eyebrow">{VANCOUVER_SERVICES.eyebrow}</p>
            <h2 id="vancouver-services-heading" className="vancouver-section__title">
              {VANCOUVER_SERVICES.title}
            </h2>
            <p className="vancouver-section__intro type-body">{VANCOUVER_SERVICES.intro}</p>
            <div className="vancouver-services">
              {VANCOUVER_SERVICES.items.map((item) => (
                <article key={item.title} className="vancouver-services__item">
                  <h3 className="vancouver-services__name">{item.title}</h3>
                  <p className="vancouver-services__body type-body">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="vancouver-section" aria-labelledby="vancouver-areas-heading">
          <div className="wire-container">
            <p className="vancouver-section__eyebrow">{VANCOUVER_AREAS.eyebrow}</p>
            <h2 id="vancouver-areas-heading" className="vancouver-section__title">
              {VANCOUVER_AREAS.title}
            </h2>
            <p className="vancouver-section__intro type-body">{VANCOUVER_AREAS.intro}</p>
            <ul className="vancouver-areas">
              {VANCOUVER_AREAS.places.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="vancouver-section" aria-labelledby="vancouver-work-heading">
          <div className="wire-container">
            <p className="vancouver-section__eyebrow">{VANCOUVER_WORK.eyebrow}</p>
            <h2 id="vancouver-work-heading" className="vancouver-section__title">
              {VANCOUVER_WORK.title}
            </h2>
            <p className="vancouver-section__intro type-body">{VANCOUVER_WORK.intro}</p>
            <div className="vancouver-work">
              {featuredWork.map((project) => (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  className="vancouver-work__link"
                >
                  <img
                    className="vancouver-work__media"
                    src={getProjectOgImage(project)}
                    alt={`${project.title} for ${project.client} — Numinas case study`}
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="vancouver-work__meta">
                    <p className="vancouver-work__client">{project.client}</p>
                    <p className="vancouver-work__title">{project.title}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="vancouver-work__cta">
              <CreativeCallButton href={VANCOUVER_WORK.ctaHref} compact showArrow={false} tone="light" plain>
                {VANCOUVER_WORK.ctaLabel}
              </CreativeCallButton>
            </div>
          </div>
        </section>

        <section className="vancouver-section" aria-labelledby="vancouver-process-heading">
          <div className="wire-container">
            <p className="vancouver-section__eyebrow">{VANCOUVER_PROCESS.eyebrow}</p>
            <h2 id="vancouver-process-heading" className="vancouver-section__title">
              {VANCOUVER_PROCESS.title}
            </h2>
            <div className="vancouver-process">
              {VANCOUVER_PROCESS.steps.map((step) => (
                <article key={step.n}>
                  <span className="vancouver-process__n">{step.n}</span>
                  <h3 className="vancouver-process__title">{step.title}</h3>
                  <p className="vancouver-process__body type-body">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <VancouverFaq />

        <section className="vancouver-cta" aria-labelledby="vancouver-cta-heading">
          <div className="wire-container vancouver-cta__inner">
            <p className="vancouver-section__eyebrow">{VANCOUVER_CTA.eyebrow}</p>
            <h2 id="vancouver-cta-heading" className="vancouver-section__title">
              {VANCOUVER_CTA.title}
            </h2>
            <p className="vancouver-section__intro type-body">{VANCOUVER_CTA.body}</p>
            <CreativeCallButton href="#contact" tone="light" plain>
              Book a creative call
            </CreativeCallButton>
          </div>
        </section>

        <Contact />
      </main>
    </div>
  )
}
