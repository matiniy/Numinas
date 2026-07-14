import type { Project } from '@/lib/projects'

interface CaseStudyStoryProps {
  project: Project
}

export function CaseStudyStory({ project }: CaseStudyStoryProps) {
  return (
    <section className="case-study__story">
      <div className="wire-container">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cs-muted)]">
              Case study
            </p>
            <h2
              className="mt-3 text-[clamp(1.75rem,2.5vw,2.5rem)] tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-title)', fontWeight: 'var(--font-weight-title)' }}
            >
              Overview
            </h2>
            <p className="type-body mt-4 text-[var(--cs-muted)]">{project.overview}</p>
          </div>

          <div className="grid gap-4 lg:col-span-8">
            {[
              { label: 'Challenge', body: project.challenge },
              { label: 'Approach', body: project.approach },
              { label: 'Outcome', body: project.outcome },
            ].map((block) => (
              <article key={block.label} className="case-study__story-card">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cs-muted)]">
                  {block.label}
                </p>
                <p className="type-body mt-3 text-[var(--cs-ink)]">{block.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {project.story.map((section) => (
            <article
              key={section.id}
              className="case-study__story-card"
              style={{ borderColor: 'var(--cs-line)' }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cs-muted)]">
                {section.eyebrow}
              </p>
              <h3
                className="mt-3 text-xl tracking-[-0.01em]"
                style={{ fontFamily: 'var(--font-title)', fontWeight: 'var(--font-weight-title)' }}
              >
                {section.title}
              </h3>
              <p className="type-body mt-3 text-[var(--cs-muted)]">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
