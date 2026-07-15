import type { Project } from '@/lib/projects'

type Rgb = [number, number, number]

const GRAINIENT_PALETTES = [
  { color1: '#FF9FFC', color2: '#5227FF', color3: '#B497CF' },
  { color1: '#8b5cf6', color2: '#6d28d9', color3: '#4c1d95' },
  { color1: '#fb923c', color2: '#ea580c', color3: '#9a3412' },
  { color1: '#34d399', color2: '#059669', color3: '#047857' },
  { color1: '#38bdf8', color2: '#0284c7', color3: '#0369a1' },
  { color1: '#f472b6', color2: '#db2777', color3: '#9d174d' },
  { color1: '#fbbf24', color2: '#d97706', color3: '#92400e' },
  { color1: '#c084fc', color2: '#9333ea', color3: '#6b21a8' },
] as const

function parseHex(hex: string): Rgb | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ]
}

function rgbToHex([r, g, b]: Rgb): string {
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}

function mixRgb(a: Rgb, b: Rgb, amount: number): Rgb {
  return a.map((channel, index) => Math.round(channel * (1 - amount) + b[index] * amount)) as Rgb
}

function relativeLuminance([r, g, b]: Rgb): number {
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const value = channel / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb
}

/** Reject near-white tints so Grainient backgrounds stay saturated. */
function isNearWhite(hex: string): boolean {
  const rgb = parseHex(hex)
  if (!rgb) return true

  const luminance = relativeLuminance(rgb)
  const minChannel = Math.min(...rgb)

  return luminance > 0.72 || minChannel > 205
}

function darken(hex: string, amount: number): string {
  const rgb = parseHex(hex)
  if (!rgb) return hex

  return rgbToHex(mixRgb(rgb, [0, 0, 0], amount))
}

function grainientColor(hex: string, fallback: string): string {
  return isNearWhite(hex) ? fallback : hex
}

function hashSlug(slug: string) {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % GRAINIENT_PALETTES.length
  }
  return hash
}

export function getProjectGrainientColors(project: Project) {
  const palette = GRAINIENT_PALETTES[hashSlug(project.slug)]
  const accent = project.accent || palette.color2
  const deepAccent = darken(accent, 0.48)

  const color1 = grainientColor(project.accentSoft || palette.color1, darken(accent, 0.22))
  const color2 = grainientColor(accent, palette.color2)
  const color3 = grainientColor(project.accent ? deepAccent : palette.color3, deepAccent)

  return { color1, color2, color3 }
}
