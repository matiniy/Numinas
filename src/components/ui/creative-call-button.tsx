import type { ReactNode } from 'react'
import { NoiseBackground } from '@/components/ui/noise-background'
import { cn } from '@/lib/utils'

const GRADIENT_COLORS = [
  'rgb(120, 130, 220)',
  'rgb(100, 150, 255)',
  'rgb(255, 180, 140)',
]

const BUTTON_CLASSNAME = cn(
  'inline-flex w-auto max-w-full min-w-0 shrink cursor-pointer items-center justify-center gap-2 rounded-full',
  'whitespace-normal text-center sm:whitespace-nowrap',
  'border-0 bg-gradient-to-r from-black via-neutral-950 to-neutral-900 text-white',
  'shadow-[0px_1px_0px_0px_#0a0a0a_inset,0px_1px_0px_0px_#262626]',
  'transition-all duration-100 active:scale-[0.98]',
)

interface CreativeCallButtonProps {
  href?: string
  className?: string
  compact?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  children?: ReactNode
  showArrow?: boolean
}

export function CreativeCallButton({
  href = '#contact',
  className,
  compact = false,
  onClick,
  type,
  children = 'Book a creative call',
  showArrow = true,
}: CreativeCallButtonProps) {
  const sizeClassName = compact ? 'px-3.5 py-2 text-sm' : 'px-4 py-2.5 text-sm md:px-5 md:py-2.5'
  const label = (
    <>
      {children}
      {showArrow ? <span aria-hidden="true">&rarr;</span> : null}
    </>
  )

  return (
    <NoiseBackground
      containerClassName={cn('w-fit max-w-full rounded-full p-2', className)}
      gradientColors={GRADIENT_COLORS}
      noiseIntensity={0.22}
    >
      {type ? (
        <button
          type={type}
          onClick={onClick}
          className={cn(BUTTON_CLASSNAME, sizeClassName)}
          style={{ fontFamily: 'var(--font-title)', fontWeight: 'var(--font-weight-title)' }}
        >
          {label}
        </button>
      ) : (
        <a
          href={href}
          onClick={onClick}
          className={cn(BUTTON_CLASSNAME, sizeClassName)}
          style={{ fontFamily: 'var(--font-title)', fontWeight: 'var(--font-weight-title)' }}
        >
          {label}
        </a>
      )}
    </NoiseBackground>
  )
}
