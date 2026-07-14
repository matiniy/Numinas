const services = [
  {
    n: '01',
    title: 'Brand Films',
    body: 'Cinematic motion-driven stories for launches, rebrands, and positioning.',
  },
  {
    n: '02',
    title: 'Explainer Videos',
    body: 'Complex products distilled into clean, story-driven visuals.',
  },
  {
    n: '03',
    title: 'Social Content',
    body: 'High-impact loops for TikTok, Instagram, YouTube, and beyond.',
  },
  {
    n: '04',
    title: 'Motion Systems',
    body: 'Scalable templates so content stays cohesive and fast to produce.',
  },
  {
    n: '05',
    title: 'Experiential & AR',
    body: 'Installations and AR that bring motion into physical space.',
  },
  {
    n: '06',
    title: 'Custom & R&D',
    body: 'Experimental briefs that challenge what motion can do.',
  },
]

export function Services() {
  return (
    <section id="services" className="wire-section" aria-labelledby="services-heading">
      <div className="wire-container">
        <p className="wire-label">06 · Services</p>
        <h2 id="services-heading" className="type-h2 mb-3">
          What We Make
        </h2>
        <p className="type-body mb-8 max-w-2xl text-[var(--n-mist)]">
          Animated content that clarifies, captivates, and connects — from brand films to full
          motion systems.
        </p>

        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.n} className="wire-box flex gap-4 p-4">
              <span className="font-mono text-xs text-[var(--n-mist)]">{service.n}</span>
              <div>
                <h3 className="type-service-title">{service.title}</h3>
                <p className="type-small mt-2 text-[var(--n-mist)]">{service.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
