import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AppearText } from '@/components/ui/appear-text'

gsap.registerPlugin(ScrollTrigger)

interface Pillar {
  index: string
  title: string
  body: string
  image?: string
}

const pillars: Pillar[] = [
  {
    index: '01',
    title: 'Communicate',
    body: 'Deliver clarity fast. Ambitious campaigns become cinematic visuals audiences instantly understand.',
    image: '/media/pillars/pillar1.png',
  },
  {
    index: '02',
    title: 'Captivate',
    body: 'Win attention in seconds. Explainers, ads, and animations built to cut through noise.',
    image: '/media/pillars/pillar2.png',
  },
  {
    index: '03',
    title: 'Connect',
    body: 'Build trust and buy-in. Story-driven motion that resonates with customers, teams, and investors.',
    image: '/media/pillars/pillar3.png',
  },
]

function PillarVisual({ pillar }: { pillar: Pillar }) {
  return (
    <div className="pillars-grid__cell pillars-grid__cell--visual">
      <div className="pillars-grid__visual-frame">
        {pillar.image ? (
          <img
            src={pillar.image}
            alt=""
            className="pillars-grid__image"
            loading="eager"
            decoding="async"
          />
        ) : null}
      </div>
      <span className="sr-only">{pillar.title} visual</span>
    </div>
  )
}

function PillarCopy({ pillar }: { pillar: Pillar }) {
  return (
    <article className="pillars-grid__cell pillars-grid__cell--copy" aria-labelledby={`pillar-${pillar.index}`}>
      <h3 id={`pillar-${pillar.index}`} className="pillars-grid__title">
        <AppearText
          text={pillar.title}
          scrub
          clip={false}
          scrubStart="top bottom-=10%"
          scrubEnd="top 50%"
        />
      </h3>
      <p className="pillars-grid__body">
        <AppearText
          text={pillar.body}
          scrub
          clip={false}
          scrubStart="top bottom-=5%"
          scrubEnd="top 42%"
        />
      </p>
    </article>
  )
}

export function Pillars() {
  const [communicate, captivate, connect] = pillars
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const frames = gsap.utils.toArray<HTMLElement>('.pillars-grid__visual-frame', section)
      if (!frames.length) return

      const grid = section.querySelector<HTMLElement>('.pillars-grid')
      const startInset = Math.round(Math.min(16, Math.max(10, window.innerWidth * 0.02)))

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) {
        gsap.set(frames, {
          borderRadius: '0%',
          scale: 1,
          clipPath: 'inset(0% round 0px)',
        })
        if (grid) gsap.set(grid, { '--pillar-visual-inset': '0px' })
        return
      }

      if (grid) {
        gsap.set(grid, { '--pillar-visual-inset': `${startInset}px` })
      }

      gsap.set(frames, {
        borderRadius: '22%',
        scale: 0.9,
        clipPath: 'inset(4% round 22%)',
        transformOrigin: '50% 50%',
        force3D: true,
      })

      const tween = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'top 30%',
          scrub: 0.75,
        },
      })

      tween.to(
        frames,
        {
          borderRadius: '0%',
          scale: 1,
          clipPath: 'inset(0% round 0px)',
          ease: 'none',
          stagger: {
            each: 0.12,
            from: 'start',
          },
        },
        0,
      )

      if (grid) {
        tween.to(
          grid,
          {
            '--pillar-visual-inset': '0px',
            ease: 'none',
          },
          0,
        )
      }

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="pillars"
      className="pillars-section wire-section"
      aria-label="Communicate, Captivate, Connect"
    >
      <div className="pillars-grid">
        <PillarVisual pillar={communicate} />
        <PillarCopy pillar={communicate} />
        <PillarVisual pillar={captivate} />
        <PillarCopy pillar={captivate} />
        <PillarVisual pillar={connect} />
        <PillarCopy pillar={connect} />
      </div>
    </section>
  )
}
