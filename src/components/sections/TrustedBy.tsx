import { useState } from 'react'
import { TRUSTED_BY_LOGOS } from '@/lib/trusted-by-logos'

function TrustedByLogo({ name, src, alt }: { name: string; src: string; alt: string }) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--n-mist)]">
        {name}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="max-h-8 w-auto max-w-full object-contain opacity-50 transition-opacity duration-300 hover:opacity-100 md:max-h-9"
      onError={() => setMissing(true)}
    />
  )
}

export function TrustedBy() {
  return (
    <section id="trusted" className="wire-section" aria-labelledby="trusted-heading">
      <div className="wire-container">
        <p className="wire-label">02 · Trusted by</p>
        <h2 id="trusted-heading" className="type-h2 mb-8">
          Trusted by global brands and agencies
        </h2>
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible md:snap-none md:scroll-px-0 lg:grid-cols-8 [&::-webkit-scrollbar]:hidden">
          {TRUSTED_BY_LOGOS.map((logo) => (
            <li
              key={logo.slug}
              className="wire-box flex min-h-16 min-w-[7.5rem] shrink-0 snap-start items-center justify-center px-4 py-3 md:min-w-0"
            >
              <TrustedByLogo name={logo.name} src={logo.src} alt={logo.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
