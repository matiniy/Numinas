const projects = [
  { name: 'Urban Decay', title: 'Ride or Die' },
  { name: 'Olay', title: 'STEM' },
  { name: 'American Express', title: 'Play It' },
  { name: 'Excel', title: 'Get Chewing' },
  { name: 'Secret', title: 'Aluminum Free' },
  { name: 'Pellican', title: 'Cushion' },
]

export function Projects() {
  return (
    <section id="projects" className="wire-section" aria-labelledby="projects-heading">
      <div className="wire-container">
        <p className="wire-label">04 · Projects</p>
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 id="projects-heading" className="type-h2">
            Selected Work
          </h2>
          <p className="type-small text-[var(--n-mist)]">Wireframe grid · media later</p>
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <li key={`${project.name}-${project.title}`}>
              <article className="wire-box group overflow-hidden">
                <div className="flex aspect-video items-center justify-center border-b border-dashed border-[var(--n-wire)] font-mono text-[10px] uppercase tracking-wider text-[var(--n-mist)]">
                  [ project thumbnail ]
                </div>
                <div className="p-4">
                  <p className="type-eyebrow text-[var(--n-mist)]">{project.name}</p>
                  <h3 className="type-h3 mt-1">{project.title}</h3>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
