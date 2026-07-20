import { ScrollFloat } from '@/components/ui/scroll-float'
import { getGrainientPaletteByIndex } from '@/lib/grainient-palettes'

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
    <section id="services" className="wire-section services-section" aria-labelledby="services-heading">
      <div className="services-section__hero">
        <div className="wire-container services-section__hero-inner">
          <ScrollFloat
            id="services-heading"
            containerClassName="services-section__scroll-float"
            textClassName="services-section__scroll-float-text"
            scrollStart="top bottom-=5%"
            scrollEnd="bottom top+=35%"
            stagger={0.04}
          >
            What We Make
          </ScrollFloat>
          <p className="type-body services-section__hero-copy max-w-xl text-[var(--n-mist)]">
            Animated content that clarifies, captivates, and connects.
          </p>
        </div>
      </div>

      <div className="services-section__stage">
        <div className="wire-container services-section__inner">
          <ul className="services-section__grid">
            {services.map((service, index) => {
              const grainient = getGrainientPaletteByIndex(index)

              return (
                <li key={service.n} className="services-section__item">
                  <p className="services-section__index">{service.n}</p>
                  <h3
                    className="services-section__title"
                    style={{
                      backgroundImage: `linear-gradient(120deg, ${grainient.color1} 0%, ${grainient.color2} 52%, ${grainient.color3} 100%)`,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="services-section__body">{service.body}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
