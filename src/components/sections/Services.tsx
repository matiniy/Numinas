import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollFloat } from '@/components/ui/scroll-float'
import { OptionWheel } from '@/components/ui/OptionWheel'
import { getGrainientPaletteByIndex } from '@/lib/grainient-palettes'
import { cn } from '@/lib/utils'

type ServiceItem = {
  n: string
  title: string
  body: string
  /** Optional media — drop files later under /public/media/services/ */
  image?: string
  video?: string
}

const services: ServiceItem[] = [
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

const SERVICE_TITLES = services.map((service) => service.title)

function ServiceMediaSlide({
  service,
  index,
  active,
}: {
  service: ServiceItem
  index: number
  active: boolean
}) {
  const grainient = getGrainientPaletteByIndex(index)
  const hasMedia = Boolean(service.image || service.video)

  return (
    <div
      className={cn(
        'services-section__media-slide',
        service.video && 'services-section__media-slide--video',
      )}
      style={
        !hasMedia
          ? {
              backgroundImage: `linear-gradient(145deg, ${grainient.color1}33 0%, ${grainient.color2}55 48%, ${grainient.color3}22 100%)`,
            }
          : undefined
      }
      aria-hidden={!active}
    >
      {service.video ? (
        <video
          className="services-section__media-asset"
          src={service.video}
          muted
          loop
          playsInline
          autoPlay={active}
          preload={active ? 'metadata' : 'none'}
        />
      ) : service.image ? (
        <img
          className="services-section__media-asset"
          src={service.image}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="services-section__media-placeholder">{service.title}</span>
      )}
    </div>
  )
}

export function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = services[selectedIndex] ?? services[0]
  const grainient = getGrainientPaletteByIndex(selectedIndex)
  const mediaStageRef = useRef<HTMLDivElement>(null)
  const previousIndexRef = useRef(0)

  useGSAP(
    () => {
      const stage = mediaStageRef.current
      if (!stage) return

      const slides = gsap.utils.toArray<HTMLElement>('.services-section__media-slide', stage)
      if (!slides.length) return

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const previousIndex = previousIndexRef.current
      const direction = selectedIndex >= previousIndex ? 1 : -1

      slides.forEach((slide, index) => {
        const isActive = index === selectedIndex
        const wasActive = index === previousIndex

        if (reducedMotion) {
          gsap.set(slide, {
            opacity: isActive ? 1 : 0,
            xPercent: 0,
            scale: 1,
            zIndex: isActive ? 2 : 0,
            visibility: isActive ? 'visible' : 'hidden',
          })
          return
        }

        if (previousIndex === selectedIndex) {
          gsap.set(slide, {
            opacity: isActive ? 1 : 0,
            xPercent: 0,
            scale: isActive ? 1 : 1.03,
            zIndex: isActive ? 2 : 0,
            visibility: isActive ? 'visible' : 'hidden',
          })
          return
        }

        if (isActive) {
          gsap.set(slide, {
            visibility: 'visible',
            zIndex: 2,
            opacity: 0,
            xPercent: 10 * direction,
            scale: 1.04,
          })
          gsap.to(slide, {
            opacity: 1,
            xPercent: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
          })
          return
        }

        if (wasActive) {
          gsap.set(slide, { zIndex: 1, visibility: 'visible' })
          gsap.to(slide, {
            opacity: 0,
            xPercent: -8 * direction,
            scale: 1.02,
            duration: 0.55,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(slide, { visibility: 'hidden', xPercent: 0, scale: 1.03, zIndex: 0 })
            },
          })
          return
        }

        gsap.set(slide, {
          opacity: 0,
          xPercent: 0,
          scale: 1.03,
          zIndex: 0,
          visibility: 'hidden',
        })
      })

      previousIndexRef.current = selectedIndex
    },
    { dependencies: [selectedIndex], scope: mediaStageRef },
  )

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
                defaultSelected={0}
                value={selectedIndex}
                onChange={(index) => setSelectedIndex(index)}
                side="left"
                textColor="#8a8a93"
                activeColor="#f4f4f5"
                fontSize={2.15}
                spacing={1.35}
                curve={1}
                tilt={5.5}
                blur={1.5}
                fade={0.22}
                minOpacity={0.08}
                smoothing={180}
                inset={28}
                loop={false}
                draggable
              />
            </div>

            <div className="services-section__copy" key={selected.n} aria-live="polite">
              <p className="services-section__index">{selected.n}</p>
              <h3
                className="services-section__title"
                style={{
                  backgroundImage: `linear-gradient(120deg, ${grainient.color1} 0%, ${grainient.color2} 52%, ${grainient.color3} 100%)`,
                }}
              >
                {selected.title}
              </h3>
              <p className="services-section__body">{selected.body}</p>
            </div>

            <div className="services-section__media">
              <div ref={mediaStageRef} className="services-section__media-frame">
                {services.map((service, index) => (
                  <ServiceMediaSlide
                    key={service.n}
                    service={service}
                    index={index}
                    active={index === selectedIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
