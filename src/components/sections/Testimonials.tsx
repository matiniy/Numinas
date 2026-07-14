import { useState } from 'react'

const quotes = [
  {
    name: 'Kania Lou',
    text: 'Numinas brings fresh ideas, clear communication, and always delivers. They make the process smooth and stress-free.',
  },
  {
    name: 'Amanda Lulewicz',
    text: 'Working with Numinas was a pleasure. Their vision, collaboration, and thoughtful input led to a polished, visually stunning trailer.',
  },
  {
    name: 'Madelaine Rumball',
    text: 'Numinas brought creative vision, clear communication, and fun energy. They delivered on time and elevated the final product.',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const quote = quotes[index]

  return (
    <section id="testimonials" className="wire-section" aria-labelledby="testimonials-heading">
      <div className="wire-container">
        <p className="wire-label">05 · Testimonials</p>
        <h2 id="testimonials-heading" className="type-h2 mb-8">
          Trusted by Teams Like Yours
        </h2>

        {/* Mobile / tablet: one at a time */}
        <div className="wire-box p-6 md:hidden">
          <blockquote className="type-body leading-relaxed">“{quote.text}”</blockquote>
          <footer className="type-small mt-4 text-[var(--n-mist)]">— {quote.name}</footer>
          <div className="mt-6 flex items-center gap-2">
            <button
              type="button"
              className="wire-box flex min-h-11 min-w-11 items-center justify-center"
              aria-label="Previous testimonial"
              onClick={() => setIndex((i) => (i - 1 + quotes.length) % quotes.length)}
            >
              ←
            </button>
            <button
              type="button"
              className="wire-box flex min-h-11 min-w-11 items-center justify-center"
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % quotes.length)}
            >
              →
            </button>
            <span className="ml-2 font-mono text-xs text-[var(--n-mist)]">
              {index + 1} / {quotes.length}
            </span>
          </div>
        </div>

        {/* Desktop: three-up */}
        <ul className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((item) => (
            <li key={item.name} className="wire-box p-6">
              <blockquote className="type-body leading-relaxed">
                “{item.text}”
              </blockquote>
              <footer className="type-small mt-4 text-[var(--n-mist)]">— {item.name}</footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
