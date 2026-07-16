export type SocialLink = {
  id: 'instagram' | 'pinterest' | 'linkedin'
  label: string
  href: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/numinas.studio/',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    href: 'https://www.pinterest.com/numinas/',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/numinas/',
  },
]
