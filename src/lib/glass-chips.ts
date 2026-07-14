export const GLASS_CHIP_VARIANTS = ['lavender', 'peach', 'mint', 'sky', 'rose'] as const

export type GlassChipVariant = (typeof GLASS_CHIP_VARIANTS)[number]

export interface GlassChipItem {
  label: string
  variant: GlassChipVariant
}

export const GLASS_CHIP_GRADIENTS: Record<GlassChipVariant, string> = {
  lavender: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 50%, #c4b5fd 100%)',
  peach: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 50%, #fdba74 100%)',
  mint: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)',
  sky: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)',
  rose: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)',
}

export const HERO_OFFERINGS: GlassChipItem[] = [
  { label: 'Launch Films', variant: 'lavender' },
  { label: 'Motion Brand Systems', variant: 'peach' },
  { label: 'Social Loops', variant: 'mint' },
]
