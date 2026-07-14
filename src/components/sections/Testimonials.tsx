import { useState } from 'react'
import { TESTIMONIALS, TESTIMONIALS_HEADING } from '@/lib/testimonials'

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <figure>
      <figcaption className="type-h3 mb-4">{name}</figcaption>
      <blockquote className="type-body leading-relaxed text-[var(--n-mist)]">
        “{text}”
      </blockquote>
    </figure>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const quote = TESTIMONIALS[index]

  return (
    <section id="testimonials" className="wire-section" aria-labelledby="testimonials-heading">
      <div className="wire-container">
        <h2 id="testimonials-heading" className="type-h2 mb-8 text-center md:mb-10">
          {TESTIMONIALS_HEADING}
        </h2>

        <div className="md:hidden">
          <TestimonialCard name={quote.name} text={quote.text} />
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              className="min-h-11 min-w-11 text-[var(--n-mist)] transition-colors hover:text-[var(--n-paper)]"
              aria-label="Previous testimonial"
              onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            >
              ←
            </button>
            <button
              type="button"
              className="min-h-11 min-w-11 text-[var(--n-mist)] transition-colors hover:text-[var(--n-paper)]"
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
            >
              →
            </button>
            <span className="font-mono text-xs text-[var(--n-mist)]">
              {index + 1} / {TESTIMONIALS.length}
            </span>
          </div>
        </div>

        <ul className="hidden gap-10 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {TESTIMONIALS.map((item) => (
            <li key={item.name}>
              <TestimonialCard name={item.name} text={item.text} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
