import type { MediaSlot, Project } from '@/lib/projects'
import { GridMotion, type GridMotionItem } from '@/components/ui/GridMotion'

interface ParallaxMediaGridProps {
  project: Project
}

function GridMediaCell({
  slot,
  accent,
  accentSoft,
}: {
  slot: MediaSlot
  accent: string
  accentSoft: string
}) {
  const hasMedia = Boolean(slot.src)

  return (
    <div className="case-study__grid-motion-cell">
      <div
        className="case-study__grid-motion-media"
        style={
          hasMedia
            ? undefined
            : {
                background: `linear-gradient(160deg, ${accentSoft} 0%, ${accent} 58%, #ffffff 130%)`,
              }
        }
      >
        {hasMedia && slot.type === 'image' ? (
          <img src={slot.src} alt="" className="h-full w-full object-cover" loading="lazy" />
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
            preload="metadata"
          />
        ) : null}
      </div>

      <div className="case-study__grid-motion-meta">
        <span className="case-study__grid-motion-type">{slot.type}</span>
        <span className="case-study__grid-motion-label">{slot.label}</span>
      </div>
    </div>
  )
}

function buildGridItems(project: Project): GridMotionItem[] {
  const { media } = project

  if (media.length === 0) {
    return []
  }

  return Array.from({ length: 35 }, (_, index) => {
    const slot = media[index % media.length]

    return (
      <GridMediaCell
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
