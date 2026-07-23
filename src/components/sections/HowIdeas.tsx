import { useEffect, useRef, useState } from 'react'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { cn } from '@/lib/utils'

type Phase = {
  index: string
  title: string
  body: string
}

const PHASES: Phase[] = [
  {
    index: '01',
    title: 'Strategy',
    body: 'Turn objectives into clear, actionable strategy. We align audience, message, and metrics so every frame advances your goals.',
  },
  {
    index: '02',
    title: 'Direction',
    body: 'Turn goals into a clear, creative strategy. Every frame is aligned to your audience, message, and metrics.',
  },
  {
    index: '03',
    title: 'Story',
    body: 'Stories are the heart of great content; we help you tell yours with clarity and impact. From brand messaging to visual storytelling, we shape ideas into narratives your audience remembers.',
  },
  {
    index: '04',
    title: 'Multi-Format',
    body: 'Motion content optimized for any platform and purpose, from social media to internal communications.',
  },
  {
    index: '05',
    title: 'Production',
    body: 'From scripting and 2D/3D animation to editing, sound, and visual effects, we handle every phase of production.',
  },
]

export function HowIdeas() {
  const [activeIndex, setActiveIndex] = useState(0)
  const phaseRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const elements = phaseRefs.current.filter(Boolean) as HTMLElement[]
    if (!elements.length) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const top = visible[0]
        if (!top) return

        const nextIndex = Number((top.target as HTMLElement).dataset.phaseIndex)
        if (Number.isFinite(nextIndex)) {
          setActiveIndex(nextIndex)
        }
      },
      {
        threshold: [0.25, 0.45, 0.65],
        rootMargin: reducedMotion ? '0px' : '-28% 0px -28% 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="approach"
      className="wire-section approach-section"
      aria-labelledby="approach-heading"
    >
      <div className="wire-container approach-section__inner">
        <div className="approach-section__title-col">
          <h2 id="approach-heading" className="approach-section__title">
            How Ideas Become Motion
          </h2>
          <div className="approach-section__cta">
            <CreativeCallButton href="#contact" plain tone="light" className="font-semibold">
              Connect
            </CreativeCallButton>
          </div>
        </div>

        <div className="approach-section__rule" aria-hidden="true" />

        <ol className="approach-section__phases">
          {PHASES.map((phase, index) => {
            const isActive = index === activeIndex

            return (
              <li key={phase.index} className="approach-section__phase-wrap">
                <article
                  ref={(el) => {
                    phaseRefs.current[index] = el
                  }}
                  data-phase-index={index}
                  className={cn(
                    'approach-section__phase',
                    isActive && 'approach-section__phase--active',
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <p className="approach-section__index">{phase.index}</p>
                  <h3 className="approach-section__phase-title">{phase.title}</h3>
                  <p className="approach-section__phase-body">{phase.body}</p>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
