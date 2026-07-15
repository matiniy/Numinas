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

function buildGridItems(project: Project): GridMotionItem[] {
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
    return Array.from({ length: 35 }, (_, index) => visualSources[index % visualSources.length])
  }

  return Array.from({ length: 35 }, (_, index) => {
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
  const items = buildGridItems(project)

  return (
    <section className="case-study__grid-motion" aria-label="Project media">
      <div className="case-study__grid-motion-stage">
        <GridMotion items={items} gradientColor={project.accentSoft} />
      </div>
    </section>
  )
}
