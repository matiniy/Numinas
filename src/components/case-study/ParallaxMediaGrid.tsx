import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { MediaSlot, Project } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxMediaGridProps {
  project: Project
}

function MediaCell({ slot, accent }: { slot: MediaSlot; accent: string }) {
  const hasMedia = Boolean(slot.src)

  return (
    <article className={`case-study__grid-item case-study__grid-item--${slot.span}`}>
      <div className="case-study__media-placeholder">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="case-study__media-type">{slot.type}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--cs-muted)]">
            {slot.id}
          </span>
        </div>

        <div
          className="case-study__media-surface"
          style={{
            background: hasMedia
              ? undefined
              : `linear-gradient(160deg, ${accent}22 0%, ${accent} 55%, #ffffff 130%)`,
          }}
        >
          {hasMedia && slot.type === 'image' ? (
            <img
              src={slot.src}
              alt={slot.label}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : null}

          {hasMedia && slot.type === 'video' ? (
            <video
              src={slot.src}
              poster={slot.poster}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
            />
          ) : null}

          {!hasMedia ? (
            <div className="flex h-full flex-col justify-end p-4">
              <p className="case-study__media-label">{slot.label}</p>
              <p className="mt-1 text-xs text-white/85">Media slot ready</p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function ParallaxMediaGrid({ project }: ParallaxMediaGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const parallaxRange = isMobile ? 48 : 120

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item, index) => {
        if (!item) return
        const slot = project.media[index]
        if (!slot) return

        gsap.to(item, {
          y: () => -parallaxRange * slot.parallax,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [project.media])

  return (
    <section ref={sectionRef} className="case-study__parallax-grid" aria-label="Project media">
      <div className="wire-container">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cs-muted)]">
              Media grid
            </p>
            <h2
              className="mt-2 text-[clamp(1.75rem,3vw,2.75rem)] tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-title)', fontWeight: 'var(--font-weight-title)' }}
            >
              Scroll-driven gallery
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--cs-muted)]">
            Parallax layers respond as you scroll. Drop images and videos into each project folder
            to replace the vibrant placeholders.
          </p>
        </div>

        <div className="case-study__grid">
          {project.media.map((slot, index) => (
            <div
              key={slot.id}
              ref={(node) => {
                if (node) itemRefs.current[index] = node
              }}
            >
              <MediaCell slot={slot} accent={project.accent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
