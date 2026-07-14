import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS, type Project } from '@/lib/projects'

function scrollProjects(container: HTMLUListElement | null, direction: -1 | 1) {
  if (!container) return

  const card = container.querySelector<HTMLElement>('.projects-scroll__item')
  if (!card) return

  const styles = window.getComputedStyle(container)
  const gap = Number.parseFloat(styles.columnGap || styles.gap || '0')
  const amount = card.offsetWidth + gap

  container.scrollBy({ left: direction * amount, behavior: 'smooth' })
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

  return (
    <span className="relative px-4 text-center font-mono text-[10px] uppercase tracking-wider text-balance text-[var(--n-mist)] line-clamp-2">
      {project.client} · {project.title}
    </span>
  )
}

export function Projects() {
  const scrollRef = useRef<HTMLUListElement>(null)

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

      <div className="projects-scroll-viewport">
        <button
          type="button"
          className="projects-scroll__control projects-scroll__control--prev"
          aria-label="Scroll projects left"
          onClick={() => scrollProjects(scrollRef.current, -1)}
        >
          ←
        </button>

        <ul ref={scrollRef} className="projects-scroll" role="list">
          {PROJECTS.map((project) => {
            const hasVisual =
              (project.heroVideo && project.cardMedia !== 'image') ||
              project.thumbnail ||
              project.heroImage

            return (
              <li key={project.slug} className="projects-scroll__item">
                <Link
                  to={`/work/${project.slug}`}
                  className="wire-box group block h-full overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--n-paper)]"
                >
                  <div
                    className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-dashed border-[var(--n-wire)] bg-[var(--n-ink)]"
                    style={
                      hasVisual
                        ? undefined
                        : {
                            background: `linear-gradient(135deg, ${project.accentSoft}22, ${project.accent}33)`,
                          }
                    }
                  >
                    <ProjectCardMedia project={project} />
                  </div>
                  <div className="p-4">
                    <p className="type-eyebrow text-[var(--n-mist)]">{project.client}</p>
                    <h3 className="type-h3 mt-1">{project.title}</h3>
                    <p className="type-small mt-2 text-[var(--n-mist)]">View case study →</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="projects-scroll__control projects-scroll__control--next"
          aria-label="Scroll projects right"
          onClick={() => scrollProjects(scrollRef.current, 1)}
        >
          →
        </button>
      </div>
    </section>
  )
}
