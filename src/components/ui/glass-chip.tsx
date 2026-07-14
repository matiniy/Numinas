import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { GLASS_CHIP_GRADIENTS, type GlassChipVariant } from '@/lib/glass-chips'

interface GlassChipProps {
  children: ReactNode
  variant?: GlassChipVariant
  className?: string
}

export function GlassChip({ children, variant = 'lavender', className }: GlassChipProps) {
  const style: CSSProperties = {
    background: GLASS_CHIP_GRADIENTS[variant],
  }

  return (
    <span className={cn('glass-chip', className)} style={style}>
      {children}
    </span>
  )
}

interface GlassChipListProps {
  children: ReactNode
  className?: string
  'aria-label'?: string
}

export function GlassChipList({ children, className, 'aria-label': ariaLabel }: GlassChipListProps) {
  return (
    <ul className={cn('glass-chip-list', className)} aria-label={ariaLabel}>
      {children}
    </ul>
  )
}
