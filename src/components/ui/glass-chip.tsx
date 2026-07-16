import { forwardRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import {
  GLASS_CHIP_GRADIENTS,
  GLASS_CHIP_HERO_TINTS,
  type GlassChipVariant,
} from '@/lib/glass-chips'

interface GlassChipProps {
  children: ReactNode
  variant?: GlassChipVariant
  className?: string
  /** Hero-only glass blur + refractor — shows background video through chip. */
  glass?: boolean
}

export function GlassChip({ children, variant = 'lavender', className, glass = false }: GlassChipProps) {
  const style: CSSProperties = {
    background: glass ? GLASS_CHIP_HERO_TINTS[variant] : GLASS_CHIP_GRADIENTS[variant],
  }

  return (
    <span className={cn('glass-chip', glass && 'glass-chip--refract', className)} style={style}>
      <span className="glass-chip__label">{children}</span>
    </span>
  )
}

interface GlassChipListProps {
  children: ReactNode
  className?: string
  'aria-label'?: string
}

export const GlassChipList = forwardRef<HTMLUListElement, GlassChipListProps>(function GlassChipList(
  { children, className, 'aria-label': ariaLabel },
  ref,
) {
  return (
    <ul ref={ref} className={cn('glass-chip-list', className)} aria-label={ariaLabel}>
      {children}
    </ul>
  )
})
