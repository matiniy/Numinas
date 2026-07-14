import { Link } from 'react-router-dom'
import { BRAND_LOGO } from '@/lib/brand-logo'
import type { Project } from '@/lib/projects'

interface CaseStudyHeaderProps {
  project: Project
}

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  return (
    <header className="case-study__header">
      <div
        className="wire-container flex min-h-14 items-center justify-between gap-4 py-3"
        style={{ color: 'var(--cs-ink)' }}
      >
        <Link to="/" className="flex items-center gap-3" aria-label="Back to home">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cs-muted)]">
            ← Home
          </span>
        </Link>

        <Link to="/" className="flex shrink-0 items-center" aria-label="Numinas home">
          <img
            src={BRAND_LOGO.white}
            alt=""
            width={356}
            height={50}
            className="h-5 w-auto brightness-0 md:h-6"
            decoding="async"
          />
        </Link>

        <p className="hidden max-w-[30%] truncate font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cs-muted)] sm:block">
          {project.client}
        </p>
      </div>
    </header>
  )
}
