import { useState } from 'react'
import { TRUSTED_BY_LOGOS } from '@/lib/trusted-by-logos'

function TrustedByLogo({ name, src, alt }: { name: string; src: string; alt: string }) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <span className="trusted-by-marquee__fallback font-mono text-[10px] uppercase tracking-wider text-[var(--n-mist)]">
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
      className="trusted-by-marquee__logo"
      onError={() => setMissing(true)}
    />
  )
}

export function TrustedBy() {
  return (
    <section id="trusted" className="wire-section trusted-by-section" aria-labelledby="trusted-heading">
      <div className="wire-container">
        <p className="wire-label">02 · Trusted by</p>
        <h2 id="trusted-heading" className="type-h3 mb-8 md:mb-10">
          Trusted by global brands and agencies
        </h2>
      </div>

      <div className="trusted-by-marquee">
        <div className="trusted-by-marquee__viewport">
          <div className="trusted-by-marquee__track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="trusted-by-marquee__group"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {TRUSTED_BY_LOGOS.map((logo) => (
                  <li key={`${copy}-${logo.slug}`} className="trusted-by-marquee__item">
                    <TrustedByLogo name={logo.name} src={logo.src} alt={logo.alt} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
