import { useState } from 'react'
import { OptionWheel } from '@/components/ui/OptionWheel'
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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = services[selectedIndex]
  const grainient = getGrainientPaletteByIndex(selectedIndex)

  return (
    <section id="services" className="wire-section services-section" aria-labelledby="services-heading">
      <div className="wire-container services-section__inner">
        <div className="services-section__intro">
          <p className="wire-label">06 · Services</p>
          <h2 id="services-heading" className="type-h2">
            What We Make
          </h2>
          <p className="type-body mt-4 max-w-xl text-[var(--n-mist)]">
            Animated content that clarifies, captivates, and connects.
          </p>
        </div>

        <div className="services-section__detail" aria-live="polite">
          <p className="services-section__index">{selected.n}</p>
          <h3
            className="type-service-title services-section__title mt-2"
            style={{
              backgroundImage: `linear-gradient(120deg, ${grainient.color1} 0%, ${grainient.color2} 52%, ${grainient.color3} 100%)`,
            }}
          >
            {selected.title}
          </h3>
          <p className="type-small mt-3 text-[var(--n-mist)]">{selected.body}</p>
        </div>

        <div className="services-section__wheel">
          <OptionWheel
            items={services.map((service) => service.title)}
            defaultSelected={0}
            onChange={(index) => setSelectedIndex(index)}
            textColor="#8a8a93"
            activeColor="#ffffff"
            side="right"
            fontSize={2.15}
            spacing={1.3}
            curve={1}
            tilt={7}
            blur={1.5}
            fade={0.2}
            minOpacity={0.12}
            smoothing={200}
            inset={20}
            loop={false}
            draggable
            soundUrl="/sounds/click-soft.mp3"
            soundVolume={0.5}
          />
        </div>
      </div>
    </section>
  )
}
