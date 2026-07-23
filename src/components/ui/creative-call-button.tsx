import type { ReactNode } from 'react'
import { NoiseBackground } from '@/components/ui/noise-background'
import { cn } from '@/lib/utils'

const GRADIENT_COLORS = [
  'rgb(120, 130, 220)',
  'rgb(100, 150, 255)',
  'rgb(255, 180, 140)',
]

interface CreativeCallButtonProps {
  href?: string
  className?: string
  compact?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  children?: ReactNode
  showArrow?: boolean
  gradientColors?: string[]
  /** Dark pill only — no noise / gradient border ring. */
  plain?: boolean
  /** Invert to white fill + dark text (best with `plain`). */
  tone?: 'dark' | 'light'
}

export function CreativeCallButton({
  href = '#contact',
  className,
  compact = false,
  onClick,
  type,
  children = 'Book a creative call',
  showArrow = true,
  gradientColors = GRADIENT_COLORS,
  plain = false,
  tone = 'dark',
}: CreativeCallButtonProps) {
  const sizeClassName = compact
    ? 'min-h-9 px-3 py-1.5 text-xs sm:min-h-10 sm:px-3.5 sm:text-sm'
    : 'min-h-11 px-4 py-2.5 text-sm md:px-5 md:py-2.5'

  const toneClassName =
    tone === 'light'
      ? 'border border-white/20 bg-[var(--n-paper)] text-[var(--n-void)] shadow-none hover:bg-white'
      : 'border-0 bg-gradient-to-r from-black via-neutral-950 to-neutral-900 text-white shadow-[0px_1px_0px_0px_#0a0a0a_inset,0px_1px_0px_0px_#262626]'

  const label = (
    <>
      {children}
      {showArrow ? (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          &rarr;
        </span>
      ) : null}
    </>
  )

  const controlClassName = cn(
    'group inline-flex w-auto max-w-full min-w-0 shrink cursor-pointer items-center justify-center gap-2 rounded-full',
    'whitespace-normal text-center sm:whitespace-nowrap',
    'transition-all duration-200 active:scale-[0.98]',
    toneClassName,
    sizeClassName,
    plain && className,
  )
  const controlStyle = {
    fontFamily: 'var(--font-title)',
    fontWeight: tone === 'light' ? 600 : 'var(--font-weight-title)',
  } as const

  const control = type ? (
    <button type={type} onClick={onClick} className={controlClassName} style={controlStyle}>
      {label}
    </button>
  ) : (
    <a href={href} onClick={onClick} className={controlClassName} style={controlStyle}>
      {label}
    </a>
  )

  if (plain) return control

  return (
    <NoiseBackground
      containerClassName={cn(
        'w-fit max-w-full shrink-0 rounded-full',
        compact ? 'p-1.5' : 'p-2',
        className,
      )}
      gradientColors={gradientColors}
      noiseIntensity={0.22}
    >
      {control}
    </NoiseBackground>
  )
}
