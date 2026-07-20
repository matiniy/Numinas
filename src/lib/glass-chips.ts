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

/** Semi-transparent tints for hero glass chips — video shows through blur. */
export const GLASS_CHIP_HERO_TINTS: Record<GlassChipVariant, string> = {
  lavender:
    'linear-gradient(135deg, rgb(237 233 254 / 0.34) 0%, rgb(196 181 253 / 0.2) 52%, rgb(139 92 246 / 0.12) 100%)',
  peach:
    'linear-gradient(135deg, rgb(255 237 213 / 0.36) 0%, rgb(251 191 36 / 0.18) 52%, rgb(250 96 25 / 0.14) 100%)',
  mint:
    'linear-gradient(135deg, rgb(209 250 229 / 0.34) 0%, rgb(110 231 183 / 0.18) 52%, rgb(16 185 129 / 0.12) 100%)',
  sky: 'linear-gradient(135deg, rgb(224 242 254 / 0.34) 0%, rgb(125 211 252 / 0.2) 52%, rgb(14 165 233 / 0.12) 100%)',
  rose:
    'linear-gradient(135deg, rgb(252 231 243 / 0.34) 0%, rgb(249 168 212 / 0.18) 52%, rgb(238 46 90 / 0.12) 100%)',
}

export const HERO_OFFERINGS: GlassChipItem[] = [
  { label: 'Launch Films', variant: 'lavender' },
  { label: 'Motion Brand Systems', variant: 'peach' },
  { label: 'Social Loops', variant: 'mint' },
]
