import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grainient } from '@/components/ui/Grainient'
import { getProjectGrainientColors } from '@/lib/grainient-palettes'
import type { Project } from '@/lib/projects'

interface CaseStudyNextProps {
  next?: Project
}

export function CaseStudyNext({ next }: CaseStudyNextProps) {
  const [animating, setAnimating] = useState(true)

  useEffect(() => {
    setAnimating(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (!next) return null

  const colors = getProjectGrainientColors(next)

  return (
    <section className="case-study__next">
      <div className="wire-container">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cs-muted)]">
          Next project
        </p>

        <Link to={`/work/${next.slug}`} className="case-study__next-link mt-4">
          <div className="case-study__next-surface">
            <Grainient
              className="case-study__next-grainient"
              color1={colors.color1}
              color2={colors.color2}
              color3={colors.color3}
              timeSpeed={animating ? 0.18 : 0}
              warpStrength={0.85}
              warpAmplitude={60}
              grainAmount={0.04}
              grainAnimated={false}
              contrast={1.35}
              saturation={1.05}
              zoom={0.92}
            />

            <div className="case-study__next-link-content">
              <div className="case-study__next-copy">
                <p className="case-study__next-eyebrow">{next.client}</p>
                <p className="case-study__next-title">{next.title}</p>
              </div>

              <span className="case-study__next-arrow" aria-hidden="true">
                →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
