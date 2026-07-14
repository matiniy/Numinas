import type { Project } from '@/lib/projects'

interface CaseStudyHeroProps {
  project: Project
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className="case-study__hero">
      <div
        className="case-study__hero-glow"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${project.accent} 0%, transparent 62%), radial-gradient(circle at 80% 60%, ${project.accentSoft} 0%, transparent 55%)`,
        }}
        aria-hidden="true"
      />

      <div className="wire-container relative">
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="case-study__chip">{project.year}</span>
          {project.services.map((service) => (
            <span key={service} className="case-study__chip">
              {service}
            </span>
          ))}
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--cs-muted)]">
          {project.client}
        </p>
        <h1
          className="mt-3 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em]"
          style={{ fontFamily: 'var(--font-title)', fontWeight: 'var(--font-weight-title)' }}
        >
          {project.title}
        </h1>
        <p className="type-body mt-5 max-w-2xl text-[var(--cs-muted)]">{project.tagline}</p>

        <div className="case-study__panel mt-10 overflow-hidden">
          {project.heroVideo || project.heroImage ? (
            <div className="relative aspect-[16/8] bg-[var(--cs-ink)]">
              {project.heroVideo ? (
                <video
                  src={project.heroVideo}
                  poster={project.heroImage}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              ) : (
                <img
                  src={project.heroImage}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ) : (
            <div
              className="flex aspect-[16/8] flex-col items-start justify-end gap-4 p-5 sm:flex-row sm:items-end sm:justify-between md:p-6"
              style={{
                background: `linear-gradient(135deg, ${project.accentSoft} 0%, ${project.accent} 48%, #ffffff 120%)`,
              }}
            >
              <div>
                <p className="case-study__media-label">Hero media slot</p>
                <p className="mt-2 max-w-md text-balance text-sm text-white/90 md:text-base">
                  Drop `hero.mp4` or `hero.jpg` in `/public/media/projects/{project.slug}/`
                </p>
              </div>
              <span className="case-study__media-type">Video / Image</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
