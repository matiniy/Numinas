export const GLASS_CHIP_VARIANTS = ['lavender', 'peach', 'mint', 'sky', 'rose'] as const

export type GlassChipVariant = (typeof GLASS_CHIP_VARIANTS)[number]

export interface GlassChipItem {
  label: string
  variant: GlassChipVariant
}

export const HERO_OFFERINGS: GlassChipItem[] = [
  { label: 'Launch Films', variant: 'lavender' },
  { label: 'Motion Brand Systems', variant: 'peach' },
  { label: 'Social Loops', variant: 'mint' },
]
