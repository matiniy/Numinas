import { useEffect, useRef, useState } from 'react'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { BRAND_LOGO } from '@/lib/brand-logo'
import { cn } from '@/lib/utils'

const links = [
  { href: '#projects', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

const SCROLL_RANGE = 140
const LERP = 0.1

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t
}

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5)
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)
  const currentRef = useRef(0)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    let mounted = true
    let rafId = 0

    const loop = () => {
      if (!mounted) return

      const goal = open
        ? 1
        : Math.min(1, Math.max(0, window.scrollY / SCROLL_RANGE))

      if (reducedMotionRef.current) {
        currentRef.current = goal
      } else {
        const next = currentRef.current + (goal - currentRef.current) * LERP
        currentRef.current = Math.abs(goal - next) < 0.001 ? goal : next
      }

      setProgress(currentRef.current)
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)

    return () => {
      mounted = false
      cancelAnimationFrame(rafId)
    }
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const p = easeOutQuint(progress)
  const isFloating = p > 0.04 || open
  const floatInset = lerp(0, 16, p)
  const sideInset = lerp(0, 20, p)
  const shrunkWidth = isDesktop ? 50 : 92

  const headerStyle = {
    paddingTop: isFloating ? undefined : 'env(safe-area-inset-top)',
    paddingLeft: `${sideInset}px`,
    paddingRight: `${sideInset}px`,
    marginTop: `${floatInset}px`,
  }

  const shellStyle = {
    width: `${lerp(100, shrunkWidth, p)}%`,
    marginInline: 'auto' as const,
    borderRadius: `${lerp(0, 16, p)}px`,
    borderWidth: p > 0.05 ? 1 : 0,
    borderStyle: 'solid' as const,
    borderColor: `rgb(255 255 255 / ${lerp(0, 0.08, p)})`,
    backgroundColor: `rgb(10 10 11 / ${lerp(0, 0.32, p)})`,
    boxShadow:
      p > 0.05 ? `0 ${lerp(4, 8, p)}px ${lerp(16, 32, p)}px rgb(0 0 0 / ${lerp(0.08, 0.2, p)})` : 'none',
    backdropFilter: p > 0.02 ? `blur(${lerp(0, 28, p)}px) saturate(${lerp(110, 160, p)}%)` : 'none',
    WebkitBackdropFilter: p > 0.02 ? `blur(${lerp(0, 28, p)}px) saturate(${lerp(110, 160, p)}%)` : 'none',
    overflow: 'hidden' as const,
  }

  const rowStyle = {
    minHeight: `${lerp(56, 44, p)}px`,
    paddingTop: `${lerp(12, 6, p)}px`,
    paddingBottom: `${lerp(12, 6, p)}px`,
    paddingLeft: `calc(var(--gutter) * ${lerp(1, 0.45, p)})`,
    paddingRight: `calc(var(--gutter) * ${lerp(1, 0.45, p)})`,
    gap: `${lerp(16, 8, p)}px`,
  }

  const logoHeight = lerp(28, 20, p)

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={headerStyle}>
      <div style={shellStyle}>
        <div className="flex items-center justify-between gap-4" style={rowStyle}>
          <a href="#top" className="flex shrink-0 items-center" aria-label="Numinas home">
            <img
              src={BRAND_LOGO.white}
              alt=""
              width={356}
              height={50}
              className="w-auto"
              style={{ height: `${logoHeight}px` }}
              decoding="async"
            />
          </a>

          <nav
            className="hidden items-center lg:flex"
            style={{ gap: `${lerp(32, 16, p)}px` }}
            aria-label="Primary"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="type-small text-[var(--n-mist)] hover:text-[var(--n-paper)]"
                style={{ fontSize: `${lerp(14, 12, p)}px` }}
              >
                {link.label}
              </a>
            ))}
            <CreativeCallButton compact />
          </nav>

          <button
            type="button"
            className={cn(
              'site-nav__menu-btn flex min-h-11 min-w-11 items-center justify-center lg:hidden',
              isFloating
                ? 'rounded-xl border border-white/[0.08] bg-white/[0.04]'
                : 'wire-box',
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="font-mono text-xs">{open ? '✕' : '☰'}</span>
          </button>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className={cn(
              'border-t lg:hidden',
              isFloating ? 'border-white/[0.08] bg-[rgb(10_10_11/0.18)]' : 'border-[var(--n-fog)] bg-[var(--n-void)]',
            )}
          >
            <nav
              className="flex flex-col gap-2 py-4"
              style={{ paddingLeft: 'var(--gutter)', paddingRight: 'var(--gutter)' }}
              aria-label="Mobile"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="type-small flex min-h-11 items-center"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <CreativeCallButton
                className="mt-2 w-full"
                compact
                href="#contact"
                onClick={() => setOpen(false)}
              />
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}
