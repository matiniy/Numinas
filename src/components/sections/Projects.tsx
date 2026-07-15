import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjectGrainientColors } from '@/lib/grainient-palettes'
import { PROJECTS, type Project } from '@/lib/projects'

const AUTO_PLAY_MS = 5000
const CHEVRON_SIZE = 28

type ChevronDirection = 'left' | 'right'

function ChevronIcon({
  direction,
  className,
  size = CHEVRON_SIZE,
  gradient,
  gradientId,
}: {
  direction: ChevronDirection
  className?: string
  size?: number
  gradient?: { color1: string; color2: string; color3: string }
  gradientId?: string
}) {
  const points = direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'
  const stroke = gradient && gradientId ? `url(#${gradientId})` : 'currentColor'

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {gradient && gradientId ? (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradient.color1} />
            <stop offset="52%" stopColor={gradient.color2} />
            <stop offset="100%" stopColor={gradient.color3} />
          </linearGradient>
        </defs>
      ) : null}
      <polyline points={points} />
    </svg>
  )
}

function ProjectCardMedia({ project }: { project: Project }) {
  const useVideo = Boolean(project.heroVideo) && project.cardMedia !== 'image'
  const poster = project.heroImage ?? project.thumbnail
  const imageSrc = project.thumbnail ?? project.heroImage

  if (useVideo && project.heroVideo) {
    return (
      <video
        src={project.heroVideo}
        poster={poster}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden="true"
      />
    )
  }

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />
    )
  }

  return null
}

export function Projects() {
  const scrollRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollRef.current
    const item = itemRefs.current[index]
    if (!container || !item) return

    const target = item.offsetLeft - (container.offsetWidth - item.offsetWidth) / 2
    container.scrollTo({ left: target, behavior })
  }, [])

  const syncActiveIndexFromScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const center = container.scrollLeft + container.offsetWidth / 2
    let closest = 0
    let minDist = Infinity

    itemRefs.current.forEach((item, i) => {
      if (!item) return
      const itemCenter = item.offsetLeft + item.offsetWidth / 2
      const dist = Math.abs(itemCenter - center)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })

    activeIndexRef.current = closest
    setActiveIndex(closest)
  }, [])

  const clearAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
  }, [])

  const startAutoPlay = useCallback(() => {
    if (prefersReducedMotion.current) return

    clearAutoPlay()
    autoPlayTimerRef.current = setInterval(() => {
      const next = (activeIndexRef.current + 1) % PROJECTS.length
      scrollToIndex(next)
    }, AUTO_PLAY_MS)
  }, [clearAutoPlay, scrollToIndex])

  const goTo = useCallback(
    (index: number) => {
      scrollToIndex(index)
      startAutoPlay()
    },
    [scrollToIndex, startAutoPlay],
  )

  const goBy = useCallback(
    (direction: -1 | 1) => {
      const next = (activeIndexRef.current + direction + PROJECTS.length) % PROJECTS.length
      goTo(next)
    },
    [goTo],
  )

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(syncActiveIndexFromScroll)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    const layoutRaf = requestAnimationFrame(() => {
      scrollToIndex(0, 'instant')
      syncActiveIndexFromScroll()
    })

    return () => {
      container.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(layoutRaf)
    }
  }, [scrollToIndex, syncActiveIndexFromScroll])

  useEffect(() => {
    startAutoPlay()
    return clearAutoPlay
  }, [startAutoPlay, clearAutoPlay])

  return (
    <section id="projects" className="wire-section projects-section" aria-labelledby="projects-heading">
      <div className="wire-container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="wire-label">04 · Projects</p>
            <h2 id="projects-heading" className="type-h2">
              Selected Work
            </h2>
          </div>

          <p className="type-small self-start text-[var(--n-mist)] md:self-auto">
            Case studies with media, motion, and story
          </p>
        </div>
      </div>

      <div
        className="projects-scroll-viewport"
        onMouseEnter={clearAutoPlay}
        onMouseLeave={startAutoPlay}
        onFocusCapture={clearAutoPlay}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            startAutoPlay()
          }
        }}
      >
        <button
          type="button"
          className="projects-scroll__control projects-scroll__control--prev"
          aria-label="Previous project"
          onClick={() => goBy(-1)}
        >
          <ChevronIcon direction="left" className="projects-scroll__control-icon" />
        </button>

        <ul ref={scrollRef} className="projects-scroll" role="list">
          {PROJECTS.map((project, index) => {
            const hasVisual =
              (project.heroVideo && project.cardMedia !== 'image') ||
              project.thumbnail ||
              project.heroImage
            const isCenter = index === activeIndex
            const grainient = getProjectGrainientColors(project)

            return (
              <li
                key={project.slug}
                ref={(node) => {
                  itemRefs.current[index] = node
                }}
                className={`projects-scroll__item${isCenter ? ' projects-scroll__item--center' : ''}`}
                aria-current={isCenter ? 'true' : undefined}
              >
                <div className="projects-scroll__item-inner">
                  <Link
                    to={`/work/${project.slug}`}
                    className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--n-paper)]"
                  >
                    <div className="projects-scroll__media-wrap">
                      <div
                        className="projects-scroll__media relative aspect-video overflow-hidden rounded-[8px] bg-[var(--n-ink)] transition-transform duration-300 group-hover:-translate-y-1"
                        style={
                          hasVisual
                            ? undefined
                            : {
                                background: `linear-gradient(135deg, ${project.accentSoft}22, ${project.accent}33)`,
                              }
                        }
                      >
                        <ProjectCardMedia project={project} />
                        <div className="projects-scroll__overlay">
                          <p className="projects-scroll__overlay-client">{project.client}</p>
                          <h3 className="projects-scroll__overlay-title">{project.title}</h3>
                          <p className="projects-scroll__cta type-small">
                            <span
                              className="projects-scroll__cta-text"
                              style={{
                                backgroundImage: `linear-gradient(120deg, ${grainient.color1} 0%, ${grainient.color2} 52%, ${grainient.color3} 100%)`,
                              }}
                            >
                              View project
                            </span>
                            <ChevronIcon
                              direction="right"
                              className="projects-scroll__cta-icon"
                              gradient={grainient}
                              gradientId={`projects-cta-chevron-${project.slug}`}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="projects-scroll__control projects-scroll__control--next"
          aria-label="Next project"
          onClick={() => goBy(1)}
        >
          <ChevronIcon direction="right" className="projects-scroll__control-icon" />
        </button>
      </div>
    </section>
  )
}
