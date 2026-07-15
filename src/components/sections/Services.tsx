import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OptionWheel } from '@/components/ui/OptionWheel'
import { ScrollFloat } from '@/components/ui/scroll-float'
import { getGrainientPaletteByIndex } from '@/lib/grainient-palettes'

gsap.registerPlugin(ScrollTrigger)

function useServicesWheelScale() {
  const [scale, setScale] = useState({ fontSize: 2.95, inset: 12 })

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScale({ fontSize: 1.5, inset: 14 })
      } else if (width < 1024) {
        setScale({ fontSize: 2.35, inset: 6 })
      } else {
        setScale({ fontSize: 2.95, inset: 8 })
      }
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return scale
}

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
  const stageRef = useRef<HTMLDivElement>(null)
  const wheelScale = useServicesWheelScale()
  const selected = services[selectedIndex]
  const grainient = getGrainientPaletteByIndex(selectedIndex)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      gsap.set(stage, { opacity: 1, y: 0 })
      return
    }

    const tween = gsap.fromTo(
      stage,
      { opacity: 0, y: 72 },
      {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stage,
          start: 'top 92%',
          end: 'top 62%',
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
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

      <div ref={stageRef} className="services-section__stage">
        <div className="wire-container services-section__inner">
          <div className="services-section__detail" aria-live="polite">
            <p className="services-section__index">{selected.n}</p>
            <div className="services-section__detail-stack">
              <div className="services-section__title-wrap">
                <h3
                  className="services-section__title"
                  style={{
                    backgroundImage: `linear-gradient(120deg, ${grainient.color1} 0%, ${grainient.color2} 52%, ${grainient.color3} 100%)`,
                  }}
                >
                  {selected.title}
                </h3>
              </div>
              <p className="services-section__body">{selected.body}</p>
            </div>
          </div>

          <div className="services-section__wheel">
            <OptionWheel
              items={services.map((service) => service.title)}
              defaultSelected={0}
              onChange={(index) => setSelectedIndex(index)}
              textColor="#8a8a93"
              activeColor="#ffffff"
              side="right"
              fontSize={wheelScale.fontSize}
              spacing={1.45}
              curve={1}
              tilt={7}
              blur={1.5}
              fade={0.2}
              minOpacity={0.12}
              smoothing={200}
              inset={wheelScale.inset}
              loop={false}
              draggable
              soundUrl="/sounds/click-soft.mp3"
              soundVolume={0.5}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
