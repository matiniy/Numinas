import { useEffect, useMemo, useState } from 'react'
import type { MediaSlot, Project } from '@/lib/projects'
import { GridMotion, type GridMotionItem } from '@/components/ui/GridMotion'

interface ParallaxMediaGridProps {
  project: Project
}

function GridPlaceholderCell({
  slot,
  accent,
  accentSoft,
}: {
  slot: MediaSlot
  accent: string
  accentSoft: string
}) {
  return (
    <div
      className="case-study__grid-motion-placeholder"
      style={{
        background: `linear-gradient(160deg, ${accentSoft} 0%, ${accent} 58%, #ffffff 130%)`,
      }}
    >
      <span className="case-study__grid-motion-placeholder-label">{slot.label}</span>
    </div>
  )
}

function getGridVisualSrc(slot: MediaSlot): string | undefined {
  if (slot.type === 'image' && slot.src) return slot.src
  if (slot.poster) return slot.poster
  return undefined
}

function useIsMobileGrid() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return isMobile
}

function buildUniqueShowcase(project: Project) {
  const seen = new Set<string>()
  const items: { key: string; src?: string; slot: MediaSlot }[] = []

  for (const slot of project.media) {
    const src = getGridVisualSrc(slot)
    const key = src ?? `placeholder-${slot.id}`
    if (seen.has(key)) continue
    seen.add(key)
    items.push({ key, src, slot })
    if (items.length >= 6) break
  }

  return items
}

function buildGridItems(project: Project, count: number): GridMotionItem[] {
  const { media } = project

  if (media.length === 0) {
    return []
  }

  const visualSources = [
    ...new Set(
      media.map(getGridVisualSrc).filter((src): src is string => Boolean(src)),
    ),
  ]

  if (visualSources.length > 0) {
    return Array.from({ length: count }, (_, index) => visualSources[index % visualSources.length])
  }

  return Array.from({ length: count }, (_, index) => {
    const slot = media[index % media.length]

    return (
      <GridPlaceholderCell
        key={`${slot.id}-${index}`}
        slot={slot}
        accent={project.accent}
        accentSoft={project.accentSoft}
      />
    )
  })
}

export function ParallaxMediaGrid({ project }: ParallaxMediaGridProps) {
  const isMobile = useIsMobileGrid()
  const showcase = useMemo(() => buildUniqueShowcase(project), [project])
  const gridItems = useMemo(() => buildGridItems(project, 35), [project])

  if (isMobile) {
    return (
      <section className="case-study__media-showcase" aria-label="Project media">
        <div className="wire-container case-study__media-showcase-inner">
          {showcase.map((item, index) => (
            <figure
              key={item.key}
              className={`case-study__media-showcase-card case-study__media-showcase-card--${index % 3 === 0 ? 'wide' : 'tall'}`}
            >
              {item.src ? (
                <div
                  className="case-study__media-showcase-img"
                  style={{ backgroundImage: `url(${item.src})` }}
                  role="img"
                  aria-label={item.slot.label}
                />
              ) : (
                <GridPlaceholderCell
                  slot={item.slot}
                  accent={project.accent}
                  accentSoft={project.accentSoft}
                />
              )}
            </figure>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="case-study__grid-motion" aria-label="Project media">
      <div className="case-study__grid-motion-stage">
        <GridMotion items={gridItems} gradientColor={project.accentSoft} />
      </div>
    </section>
  )
}
