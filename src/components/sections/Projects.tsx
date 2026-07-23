import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LazyLoopingVideo } from '@/components/ui/lazy-looping-video'
import { getProjectGrainientColors } from '@/lib/grainient-palettes'
import { PROJECTS, type Project } from '@/lib/projects'
import { getDeliverableVideoUrl } from '@/lib/video-delivery'

const AUTO_PLAY_MS = 8000
const MIN_SLIDE_MS = 4000
const CHEVRON_SIZE = 28
const DEFAULT_SCROLL_FOCUS = 0.5

function getScrollFocusRatio(container: HTMLElement) {
  const raw = getComputedStyle(container).getPropertyValue('--project-scroll-focus').trim()
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : DEFAULT_SCROLL_FOCUS
}

function getScrollTarget(container: HTMLElement, item: HTMLElement) {
  const focus = getScrollFocusRatio(container)
  const raw = item.offsetLeft + item.offsetWidth / 2 - container.offsetWidth * focus
  const maxScroll = container.scrollWidth - container.offsetWidth
  return Math.max(0, Math.min(maxScroll, raw))
}

function setActiveIndexState(
  index: number,
  activeIndexRef: { current: number },
  setActiveIndex: (index: number) => void,
) {
  activeIndexRef.current = index
  setActiveIndex(index)
}

type ChevronDirection = 'left' | 'right'

function ChevronIcon({
  direction,
  className,
  size = CHEVRON_SIZE,
}: {
  direction: ChevronDirection
  className?: string
  size?: number
}) {
  const points = direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points={points} />
    </svg>
  )
}

function ProjectCardMedia({
  project,
  isActive,
  onVideoReady,
  onVideoError,
}: {
  project: Project
  isActive: boolean
  onVideoReady?: () => void
  onVideoError?: () => void
}) {
  const poster = project.heroImage ?? project.thumbnail
  const imageSrc = project.thumbnail ?? project.heroImage
  const showVideo = isActive && Boolean(project.heroVideo) && project.cardMedia !== 'image'

  if (showVideo && project.heroVideo) {
    return (
      <LazyLoopingVideo
        src={getDeliverableVideoUrl(project.heroVideo)}
        poster={poster}
        active
        preload="auto"
        onReady={onVideoReady}
        onError={onVideoError}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    )
  }

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={`${project.title} by ${project.client}`}
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
  const slideReadyRef = useRef(true)
  const slideShownAtRef = useRef(Date.now())
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const centerProject = PROJECTS[activeIndex]
  const centerWantsVideo =
    Boolean(centerProject?.heroVideo) && centerProject?.cardMedia !== 'image'

  const markSlidePending = useCallback(() => {
    slideReadyRef.current = !centerWantsVideo
    slideShownAtRef.current = Date.now()
  }, [centerWantsVideo])

  const handleCenterVideoReady = useCallback(() => {
    slideReadyRef.current = true
  }, [])

  const handleCenterVideoError = useCallback(() => {
    slideReadyRef.current = true
  }, [])

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollRef.current
    const item = itemRefs.current[index]
    if (!container || !item) return

    const target = getScrollTarget(container, item)
    container.scrollTo({ left: target, behavior })
    setActiveIndexState(index, activeIndexRef, setActiveIndex)
  }, [])

  const syncActiveIndexFromScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const maxScroll = container.scrollWidth - container.offsetWidth
    const scrollLeft = container.scrollLeft

    if (scrollLeft <= 2) {
      setActiveIndexState(0, activeIndexRef, setActiveIndex)
      return
    }

    if (scrollLeft >= maxScroll - 2) {
      setActiveIndexState(PROJECTS.length - 1, activeIndexRef, setActiveIndex)
      return
    }

    const focus = getScrollFocusRatio(container)
    const focusPoint = scrollLeft + container.offsetWidth * focus
    let closest = 0
    let minDist = Infinity

    itemRefs.current.forEach((item, i) => {
      if (!item) return
      const itemCenter = item.offsetLeft + item.offsetWidth / 2
      const dist = Math.abs(itemCenter - focusPoint)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })

    activeIndexRef.current = closest
    setActiveIndex(closest)
  }, [setActiveIndex])

  useEffect(() => {
    markSlidePending()
  }, [activeIndex, markSlidePending])

  useEffect(() => {
    const nextProject = PROJECTS[(activeIndex + 1) % PROJECTS.length]
    if (!nextProject.heroVideo || nextProject.cardMedia === 'image') return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'video'
    link.href = getDeliverableVideoUrl(nextProject.heroVideo)
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [activeIndex])

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
      if (!slideReadyRef.current) return

      const elapsed = Date.now() - slideShownAtRef.current
      if (elapsed < MIN_SLIDE_MS) return

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
            <p className="wire-label">Projects</p>
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
          <li className="projects-scroll__spacer projects-scroll__spacer--lead" aria-hidden="true" />
          {PROJECTS.map((project, index) => {
            const hasVisual =
              project.thumbnail ||
              project.heroImage ||
              Boolean(project.heroVideo)
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
                        <ProjectCardMedia
                          project={project}
                          isActive={isCenter}
                          onVideoReady={isCenter ? handleCenterVideoReady : undefined}
                          onVideoError={isCenter ? handleCenterVideoError : undefined}
                        />
                        <div className="projects-scroll__overlay">
                          <p className="projects-scroll__overlay-client">{project.client}</p>
                          <h3 className="projects-scroll__overlay-title">{project.title}</h3>
                          <p
                            className="projects-scroll__cta type-small"
                            style={{
                              backgroundImage: `linear-gradient(120deg, ${grainient.color1} 0%, ${grainient.color2} 52%, ${grainient.color3} 100%)`,
                            }}
                          >
                            View project
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
            )
          })}
          <li className="projects-scroll__spacer projects-scroll__spacer--trail" aria-hidden="true" />
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
