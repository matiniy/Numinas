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
}

export function CreativeCallButton({
  href = '#contact',
  className,
  compact = false,
  onClick,
}: CreativeCallButtonProps) {
  return (
    <NoiseBackground
      containerClassName={cn('w-fit rounded-full p-2', className)}
      gradientColors={GRADIENT_COLORS}
      noiseIntensity={0.22}
    >
      <a
        href={href}
        onClick={onClick}
        className={cn(
          'inline-flex w-auto shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full',
          'bg-gradient-to-r from-black via-neutral-950 to-neutral-900 text-white',
          'shadow-[0px_1px_0px_0px_#0a0a0a_inset,0px_1px_0px_0px_#262626]',
          'transition-all duration-100 active:scale-[0.98]',
          compact ? 'px-3.5 py-2 text-sm' : 'px-4 py-2.5 text-sm md:px-5 md:py-2.5',
        )}
        style={{ fontFamily: 'var(--font-title)', fontWeight: 'var(--font-weight-title)' }}
      >
        Book a creative call
        <span aria-hidden="true">&rarr;</span>
      </a>
    </NoiseBackground>
  )
}
