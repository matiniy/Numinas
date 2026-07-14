/**
 * Trusted-by client logos — drop files into /public/media/trusted-by/logos/
 *
 * Preferred: SVG (monochrome / white). PNG also works — use the same slug filename.
 */

export type TrustedByLogo = {
  name: string
  slug: string
  src: string
  alt: string
}

const LOGO_DIR = '/media/trusted-by/logos'

export const TRUSTED_BY_LOGOS: TrustedByLogo[] = [
  {
    name: 'American Express',
    slug: 'american-express',
    src: `${LOGO_DIR}/american-express.svg`,
    alt: 'American Express logo',
  },
  {
    name: 'Air Canada',
    slug: 'air-canada',
    src: `${LOGO_DIR}/air-canada.svg`,
    alt: 'Air Canada logo',
  },
  {
    name: 'Hootsuite',
    slug: 'hootsuite',
    src: `${LOGO_DIR}/hootsuite.svg`,
    alt: 'Hootsuite logo',
  },
  {
    name: 'Secret',
    slug: 'secret',
    src: `${LOGO_DIR}/secret.svg`,
    alt: 'Secret logo',
  },
  {
    name: 'Excel',
    slug: 'excel',
    src: `${LOGO_DIR}/excel.svg`,
    alt: 'Excel logo',
  },
  {
    name: 'Urban Decay',
    slug: 'urban-decay',
    src: `${LOGO_DIR}/urban-decay.svg`,
    alt: 'Urban Decay logo',
  },
  {
    name: 'Dolby',
    slug: 'dolby',
    src: `${LOGO_DIR}/dolby.svg`,
    alt: 'Dolby logo',
  },
  {
    name: 'Olay',
    slug: 'olay',
    src: `${LOGO_DIR}/olay.svg`,
    alt: 'Olay logo',
  },
]
