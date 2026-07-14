import { Link } from 'react-router-dom'
import type { Project } from '@/lib/projects'

interface CaseStudyNextProps {
  next?: Project
}

export function CaseStudyNext({ next }: CaseStudyNextProps) {
  if (!next) return null

  return (
    <section className="case-study__next">
      <div className="wire-container">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cs-muted)]">
          Next project
        </p>
        <Link to={`/work/${next.slug}`} className="case-study__next-link mt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cs-muted)]">
              {next.client}
            </p>
            <p
              className="mt-1 text-2xl tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-title)', fontWeight: 'var(--font-weight-title)' }}
            >
              {next.title}
            </p>
          </div>
          <span className="font-mono text-sm text-[var(--cs-muted)]">→</span>
        </Link>
      </div>
    </section>
  )
}
