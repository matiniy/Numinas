import { useEffect, useState } from 'react'
import { ScrollFloat } from '@/components/ui/scroll-float'
import { OptionWheel } from '@/components/ui/OptionWheel'
import { getGrainientPaletteByIndex } from '@/lib/grainient-palettes'

type ServiceItem = {
  n: string
  title: string
  body: string
}

const services: ServiceItem[] = [
  {
    n: '01',
    title: 'Brand Films',
    body: 'Cinematic, motion-led films for launches, rebrands, and positioning. We shape narrative, look, and pacing so the brand feels intentional on screen, from concept and boards through final delivery for web, events, and paid.',
  },
  {
    n: '02',
    title: 'Explainer Videos',
    body: 'Clear, story-driven explainers that turn complex products into something people get in minutes. Built for sales, onboarding, and product pages, with a structure that holds attention without drowning in detail.',
  },
  {
    n: '03',
    title: 'Social Content',
    body: 'Short-form motion for TikTok, Instagram, YouTube, and paid social. Hooks, loops, and platform-native cuts designed to stop the scroll and stay on-brand across a campaign calendar.',
  },
  {
    n: '04',
    title: 'Motion Systems',
    body: 'Scalable kits: templates, type, transitions, and rules so new assets stay cohesive and ship faster. Ideal when you need volume without reinventing the look every time.',
  },
  {
    n: '05',
    title: 'Experiential & AR',
    body: 'Motion for physical and hybrid spaces: installations, stages, and AR moments that extend the brand beyond the screen. Designed for how people move through a place, not just a timeline.',
  },
  {
    n: '06',
    title: 'Custom & R&D',
    body: 'Experimental and R&D briefs for new techniques, pipelines, and formats when the work doesn’t fit a standard deliverable. Prototyping first, then production when the idea proves out.',
  },
]

const SERVICE_TITLES = services.map((service) => service.title)

const SERVICE_GRADIENTS = services.map((_, index) => {
  const palette = getGrainientPaletteByIndex(index)
  return `linear-gradient(120deg, ${palette.color1} 0%, ${palette.color2} 52%, ${palette.color3} 100%)`
})

export function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [compact, setCompact] = useState(false)
  const selected = services[selectedIndex] ?? services[0]

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const sync = () => setCompact(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

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
          <div className="services-section__panel">
            <div className="services-section__wheel" aria-label="Service options">
              <OptionWheel
                items={SERVICE_TITLES}
                itemGradients={SERVICE_GRADIENTS}
                defaultSelected={0}
                value={selectedIndex}
                onChange={(index) => setSelectedIndex(index)}
                side="left"
                textColor="#8a8a93"
                activeColor="#f4f4f5"
                fontSize={compact ? 1.45 : 2.15}
                spacing={compact ? 1.25 : 1.35}
                curve={1}
                tilt={compact ? 4.5 : 5.5}
                blur={1.5}
                fade={0.22}
                minOpacity={0.08}
                smoothing={180}
                inset={compact ? 10 : 28}
                loop={false}
                draggable
              />
            </div>

            <div className="services-section__copy" key={selected.n} aria-live="polite">
              <p className="services-section__index">{selected.n}</p>
              <p className="services-section__body">{selected.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
