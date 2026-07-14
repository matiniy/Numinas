const logos = [
  'American Express',
  'Air Canada',
  'Hootsuite',
  'Secret',
  'Excel',
  'Urban Decay',
  'Dolby',
  'Olay',
]

export function TrustedBy() {
  return (
    <section id="trusted" className="wire-section" aria-labelledby="trusted-heading">
      <div className="wire-container">
        <p className="wire-label">02 · Trusted by</p>
        <h2 id="trusted-heading" className="type-h2 mb-8">
          Trusted by global brands and agencies
        </h2>
        <ul className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible lg:grid-cols-8">
          {logos.map((name) => (
            <li
              key={name}
              className="wire-box flex min-h-16 min-w-[7.5rem] shrink-0 items-center justify-center px-3 text-center font-mono text-[10px] uppercase tracking-wider text-[var(--n-mist)] md:min-w-0"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
