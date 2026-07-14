import { useEffect, useState } from 'react'
import { CreativeCallButton } from '@/components/ui/creative-call-button'
import { BRAND_LOGO } from '@/lib/brand-logo'
const links = [
  { href: '#projects', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-dashed border-[var(--n-fog)] transition-colors ${
        scrolled || open ? 'bg-[var(--n-void)]/95' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="wire-container flex min-h-14 items-center justify-between gap-4 py-3">
        <a href="#top" className="flex shrink-0 items-center" aria-label="Numinas home">
          <img
            src={BRAND_LOGO.white}
            alt="Numinas"
            width={356}
            height={50}
            className="h-6 w-auto md:h-7"
            decoding="async"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="type-small text-[var(--n-mist)] hover:text-[var(--n-paper)]"
            >
              {link.label}
            </a>
          ))}
          <CreativeCallButton compact />        </nav>

        <button
          type="button"
          className="wire-box flex min-h-11 min-w-11 items-center justify-center lg:hidden"
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
          className="border-t border-dashed border-[var(--n-fog)] bg-[var(--n-void)] lg:hidden"
        >
          <nav className="wire-container flex flex-col gap-2 py-4" aria-label="Mobile">
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
            />          </nav>
        </div>
      ) : null}
    </header>
  )
}
