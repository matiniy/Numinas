/**
 * Trusted-by client logos — /public/media/trusted-by/logos/
 */

export type TrustedByLogo = {
  name: string
  slug: string
  src: string
  alt: string
  /** Visual scale when artwork has extra padding in the asset (e.g. 2). */
  scale?: number
  /** Vertical nudge in px (negative moves up). */
  offsetY?: number
}

const LOGO_DIR = '/media/trusted-by/logos'

export const TRUSTED_BY_LOGOS: TrustedByLogo[] = [
  {
    name: 'American Express',
    slug: 'amex',
    src: `${LOGO_DIR}/amex.png`,
    alt: 'American Express logo',
  },
  {
    name: 'Air Canada',
    slug: 'air-canada',
    src: `${LOGO_DIR}/aircanada.png`,
    alt: 'Air Canada logo',
  },
  {
    name: 'Urban Decay',
    slug: 'urban-decay',
    src: `${LOGO_DIR}/urbandecay.png`,
    alt: 'Urban Decay logo',
    scale: 2,
    offsetY: -8,
  },
  {
    name: 'Secret',
    slug: 'secret',
    src: `${LOGO_DIR}/secret.png`,
    alt: 'Secret logo',
  },
  {
    name: 'Excel',
    slug: 'excel',
    src: `${LOGO_DIR}/excel.png`,
    alt: 'Excel logo',
  },
  {
    name: 'Hootsuite',
    slug: 'hootsuite',
    src: `${LOGO_DIR}/hootsuit.png`,
    alt: 'Hootsuite logo',
    scale: 2,
  },
  {
    name: 'Dolby',
    slug: 'dolby',
    src: `${LOGO_DIR}/dolby.png`,
    alt: 'Dolby logo',
    scale: 2,
  },
  {
    name: 'Olay',
    slug: 'olay',
    src: `${LOGO_DIR}/olay.png`,
    alt: 'Olay logo',
  },
]
