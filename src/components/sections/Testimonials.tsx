import { useEffect, useState } from 'react'
import { AppearText } from '@/components/ui/appear-text'
import { TESTIMONIALS } from '@/lib/testimonials'

const ROTATE_MS = 4000

function TestimonialSlide({ name, text }: { name: string; text: string }) {
  return (
    <figure className="testimonial-rotator__slide">
      <figcaption className="type-h3 mb-4">
        <AppearText text={name} />
      </figcaption>
      <blockquote className="type-body max-w-prose text-balance leading-relaxed text-[var(--n-mist)]">
        <AppearText text={`“${text}”`} />
      </blockquote>
    </figure>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const quote = TESTIMONIALS[index]

  useEffect(() => {
    if (paused) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % TESTIMONIALS.length)
    }, ROTATE_MS)

    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="wire-container">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
          <h2
            id="testimonials-heading"
            className="type-h2 testimonials-heading text-balance md:col-span-4"
          >
            <span className="testimonials-heading__accent">Trusted</span>
            <br />
            by Teams Like Yours
          </h2>

          <div
            className="testimonial-rotator md:col-span-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setPaused(false)
              }
            }}
          >
            <div className="testimonial-rotator__viewport" aria-live="polite" aria-atomic="true">
              <TestimonialSlide key={quote.name} name={quote.name} text={quote.text} />
            </div>

            <div className="mt-6 flex items-center gap-2 md:mt-8" aria-hidden="true">
              {TESTIMONIALS.map((item, itemIndex) => (
                <span
                  key={item.name}
                  className={`testimonial-rotator__dot${itemIndex === index ? ' testimonial-rotator__dot--active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
