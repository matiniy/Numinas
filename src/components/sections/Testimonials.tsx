import { useEffect, useState } from 'react'
import { AppearText } from '@/components/ui/appear-text'
import { GLASS_CHIP_GRADIENTS } from '@/lib/glass-chips'
import { TESTIMONIAL_INDICATOR_VARIANTS, TESTIMONIALS } from '@/lib/testimonials'

const ROTATE_MS = 4000

function TestimonialSlide({ name, text }: { name: string; text: string }) {
  return (
    <figure className="testimonial-rotator__slide">
      <figcaption className="type-h3 mb-4">
        <AppearText text={name} />
      </figcaption>
      <blockquote className="type-body text-balance leading-relaxed text-[var(--n-mist)]">
        <AppearText text={`“${text}”`} />
      </blockquote>
    </figure>
  )
}

function TestimonialTimers({
  index,
  paused,
  onSelect,
}: {
  index: number
  paused: boolean
  onSelect: (nextIndex: number) => void
}) {
  return (
    <div
      className="testimonial-timers"
      role="tablist"
      aria-label="Testimonial progress"
      data-paused={paused ? 'true' : 'false'}
    >
      {TESTIMONIALS.map((item, itemIndex) => {
        const isComplete = itemIndex < index
        const isActive = itemIndex === index
        const variant = TESTIMONIAL_INDICATOR_VARIANTS[itemIndex] ?? 'lavender'

        return (
          <button
            key={item.name}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Show testimonial from ${item.name}`}
            className="testimonial-timer"
            onClick={() => onSelect(itemIndex)}
          >
            <span
              key={isActive ? `active-${index}` : `idle-${itemIndex}`}
              className={[
                'testimonial-timer__fill',
                isComplete ? 'testimonial-timer__fill--complete' : '',
                isActive ? 'testimonial-timer__fill--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{
                background: GLASS_CHIP_GRADIENTS[variant],
                animationDuration: `${ROTATE_MS}ms`,
              }}
            />
          </button>
        )
      })}
    </div>
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
  }, [paused, index])

  return (
    <section id="testimonials" className="testimonials-section" aria-labelledby="testimonials-heading">
      <div className="wire-container">
        <div className="testimonials-section__inner">
          <div
            className="testimonials-section__grid"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setPaused(false)
              }
            }}
          >
            <div className="testimonials-section__heading">
              <h2
                id="testimonials-heading"
                className="type-h2 testimonials-heading text-balance"
              >
                <span className="testimonials-heading__accent">Trusted</span>
                <br />
                by Teams Like Yours
              </h2>

              <TestimonialTimers index={index} paused={paused} onSelect={setIndex} />
            </div>

            <div className="testimonial-rotator">
              <div className="testimonial-rotator__viewport" aria-live="polite" aria-atomic="true">
                <TestimonialSlide key={quote.name} name={quote.name} text={quote.text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
