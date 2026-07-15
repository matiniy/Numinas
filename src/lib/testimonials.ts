import type { GlassChipVariant } from './glass-chips'

export type Testimonial = {
  name: string
  text: string
}

export const TESTIMONIAL_INDICATOR_VARIANTS: GlassChipVariant[] = ['lavender', 'peach', 'mint']

/** Pastel quote-mark colors — one per testimonial, aligned with timer chip palette. */
export const TESTIMONIAL_QUOTE_COLORS = ['#c4b5fd', '#fdba74', '#6ee7b7', '#7dd3fc', '#f9a8d4', '#fda4af'] as const

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Kania Lou',
    text: 'Numinas brings fresh ideas, clear communication, and always delivers. They make the process smooth and stress-free.',
  },
  {
    name: 'Amanda Lulewicz',
    text: 'Working with Numinas was a pleasure. Their vision, collaboration, and thoughtful input led to a polished, visually stunning trailer.',
  },
  {
    name: 'Madelaine Rumball',
    text: 'Numinas brought creative vision, clear communication, and fun energy. They delivered on time and elevated the final product.',
  },
]
