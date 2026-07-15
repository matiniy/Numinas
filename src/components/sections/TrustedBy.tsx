import { useState, type CSSProperties } from 'react'
import { TRUSTED_BY_LOGOS } from '@/lib/trusted-by-logos'
import { cn } from '@/lib/utils'

function TrustedByLogo({
  name,
  src,
  alt,
  scale = 1,
  offsetY = 0,
}: {
  name: string
  src: string
  alt: string
  scale?: number
  offsetY?: number
}) {
  const [missing, setMissing] = useState(false)
  const hasAdjust = scale !== 1 || offsetY !== 0

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
      className={cn('trusted-by-marquee__logo', hasAdjust && 'trusted-by-marquee__logo--adjusted')}
      style={
        hasAdjust
          ? ({
              '--logo-scale': scale,
              '--logo-offset-y': `${offsetY}px`,
            } as CSSProperties)
          : undefined
      }
      onError={() => setMissing(true)}
    />
  )
}

export function TrustedBy() {
  return (
    <section id="trusted" className="trusted-by-section wire-section" aria-labelledby="trusted-heading">
      <div className="trusted-by-strip">
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
                      <TrustedByLogo
                        name={logo.name}
                        src={logo.src}
                        alt={logo.alt}
                        scale={logo.scale}
                        offsetY={logo.offsetY}
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="trusted-by-strip__title">
          <h2 id="trusted-heading" className="trusted-by-strip__heading">
            Trusted by global brands
          </h2>
        </div>
      </div>
    </section>
  )
}
