import { Link } from 'react-router-dom'
import { PROJECTS } from '@/lib/projects'

export function Projects() {
  return (
    <section id="projects" className="wire-section" aria-labelledby="projects-heading">
      <div className="wire-container">
        <p className="wire-label">04 · Projects</p>
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 id="projects-heading" className="type-h2">
            Selected Work
          </h2>
          <p className="type-small text-[var(--n-mist)]">Case studies with media, motion, and story</p>
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/work/${project.slug}`}
                className="wire-box group block overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--n-paper)]"
              >
                <div
                  className="flex aspect-video items-center justify-center border-b border-dashed border-[var(--n-wire)] px-4 text-center font-mono text-[10px] uppercase tracking-wider text-balance text-[var(--n-mist)] line-clamp-2"
                  style={{
                    background: `linear-gradient(135deg, ${project.accentSoft}22, ${project.accent}33)`,
                  }}
                >
                  {project.client} · {project.title}
                </div>
                <div className="p-4">
                  <p className="type-eyebrow text-[var(--n-mist)]">{project.client}</p>
                  <h3 className="type-h3 mt-1">{project.title}</h3>
                  <p className="type-small mt-2 text-[var(--n-mist)]">View case study →</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
