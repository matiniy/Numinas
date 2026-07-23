export type SocialLink = {
  id: 'instagram' | 'pinterest' | 'linkedin'
  label: string
  href: string
  /** Icon under /public/footer */
  icon: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/_numinas',
    icon: '/footer/Instagram.svg',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    href: 'https://ca.pinterest.com/numinas_studio/',
    icon: '/footer/Pinterest.png',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/numinas/',
    icon: '/footer/LinkedIn.png',
  },
]
