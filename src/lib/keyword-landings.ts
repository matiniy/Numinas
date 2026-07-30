import type { SiteFaqItem } from '@/lib/privacy-faq'

export type KeywordLandingConfig = {
  id: string
  path: string
  breadcrumb: string
  seo: {
    title: string
    description: string
    imageAlt: string
    keywords: string[]
  }
  hero: {
    title: string
    body: string
    accentWords: string[]
  }
  mid: {
    eyebrow: string
    title: string
    body: string
    points: { title: string; body: string }[]
  }
  faqs: SiteFaqItem[]
  contact: {
    label: string
    title: string
    subtitle: string
    messagePlaceholder: string
  }
  serviceName: string
}

/**
 * Keyword landings mirror the homepage (minus Services/wheel).
 * Page-specific keywords live in hero, mid band + FAQ, contact, and SEO/JSON-LD.
 */
export const KEYWORD_LANDINGS: KeywordLandingConfig[] = [
  {
    id: 'vancouver',
    path: '/vancouver',
    breadcrumb: 'Vancouver',
    seo: {
      title: 'Motion Graphics Vancouver | Animation Studio | Numinas',
      description:
        'Motion graphics Vancouver studio for brand films, explainers, and animation. Numinas is a Vancouver animation company serving Metro Vancouver brands.',
      imageAlt: 'Numinas — motion graphics Vancouver studio',
      keywords: [
        'motion graphics vancouver',
        'animation studios vancouver',
        'animation companies vancouver',
        'illustration agency vancouver',
        'Vancouver motion studio',
        'Vancouver animation studio',
        'motion design Vancouver BC',
        'Numinas Vancouver',
      ],
    },
    hero: {
      title: 'Vancouver Motion Graphics Studio, Crafting Scroll-Stopping Visuals That Convert',
      body: 'From our Vancouver studio, we create motion graphics and animation that help brands stand out, tell clear stories, and connect with their audience through visuals that convert.',
      accentWords: ['Scroll-Stopping', 'Convert'],
    },
    mid: {
      eyebrow: 'Vancouver animation studio',
      title: 'Motion graphics for Metro Vancouver brands',
      body: 'Numinas is a Vancouver motion graphics studio and animation company. We partner with startups, agencies, and in-house teams that need clear, scroll-stopping visuals — not generic stock motion.',
      points: [
        {
          title: 'Motion graphics Vancouver',
          body: 'Launch films, explainers, and social animation designed for local brands and remote collaborators.',
        },
        {
          title: 'Animation studio craft',
          body: '2D/3D animation, brand systems, and delivery kits built for web, paid, and broadcast.',
        },
        {
          title: 'Illustration in motion',
          body: 'Looking for an illustration agency in Vancouver that also animates? We turn illustrated systems into living brand films and loops.',
        },
      ],
    },
    faqs: [
      {
        question: 'Is Numinas a motion graphics studio in Vancouver?',
        answer:
          'Yes. Numinas is a Vancouver-based motion graphics studio creating brand films, explainers, social loops, and animation for Metro Vancouver clients and partners worldwide.',
      },
      {
        question: 'Are you an animation studio or animation company in Vancouver?',
        answer:
          'Yes. Brands search for animation studios Vancouver and animation companies Vancouver when they need production partners — Numinas delivers end-to-end motion from concept through final delivery.',
      },
      {
        question: 'Do you work like an illustration agency in Vancouver?',
        answer:
          'We focus on motion, not static illustration alone. If you need illustrated worlds that move — styleframes, character systems, and animated campaigns — Numinas is the Vancouver partner for illustration brought to life on screen.',
      },
      {
        question: 'How do I hire Numinas for a Vancouver project?',
        answer:
          'Use the form on this page or email collab@numinas.studio. Share goals, timeline, and references — we typically reply within 1–2 business days.',
      },
    ],
    contact: {
      label: 'Contact',
      title: 'Tell us about your Vancouver project',
      subtitle:
        'Share goals, timeline, and references. We will review and reply within 1–2 business days.',
      messagePlaceholder: 'Tell us about your Vancouver motion graphics project',
    },
    serviceName: 'Vancouver motion graphics and animation',
  },
  {
    id: 'motion-graphics',
    path: '/motion-graphics',
    breadcrumb: 'Motion Graphics',
    seo: {
      title: 'Motion Graphics Services, Studio & Agency | Numinas',
      description:
        'Motion graphics services from a Vancouver studio: brand films, explainers, social systems, and campaign kits. Hire Numinas as your motion graphics agency partner.',
      imageAlt: 'Numinas motion graphics studio',
      keywords: [
        'motion graphics services',
        'motion graphics agency',
        'motion graphics studio',
        'motion design studio',
        'brand motion graphics',
        'explainer motion graphics',
        'Numinas motion graphics',
      ],
    },
    hero: {
      title: 'Motion Graphics Services That Clarify, Captivate, And Convert',
      body: 'Numinas is a motion graphics studio and agency partner for brands that need intentional animation — from hero films and explainers to scalable social systems.',
      accentWords: ['Clarify', 'Captivate', 'Convert'],
    },
    mid: {
      eyebrow: 'Motion graphics studio',
      title: 'Agency-grade motion graphics services',
      body: 'Whether you search for a motion graphics studio, a motion graphics agency, or full-service motion graphics services, Numinas scopes clear deliverables and ships buttoned-up files for every channel.',
      points: [
        {
          title: 'Motion graphics services',
          body: 'Brand films, product explainers, paid social packs, and reusable motion kits.',
        },
        {
          title: 'Studio partnership',
          body: 'Direct creative collaboration with a lean Vancouver team — no black-box agency layers.',
        },
        {
          title: 'Agency support',
          body: 'We also embed with agencies that need a trusted motion graphics production partner.',
        },
      ],
    },
    faqs: [
      {
        question: 'What motion graphics services does Numinas offer?',
        answer:
          'Brand films, explainer videos, social content, motion systems, experiential and AR motion, and custom R&D. Engagements range from a single hero film to ongoing campaign kits.',
      },
      {
        question: 'Is Numinas a motion graphics studio or agency?',
        answer:
          'Numinas is a motion graphics studio that also acts as an agency partner. You get studio craft with clear scopes, timelines, and delivery — whether you hire us directly or through your agency.',
      },
      {
        question: 'How do motion graphics projects start?',
        answer:
          'Book a creative call or use the form below. Share audience, message, and channels. We align on concept, boards, and production before animation begins.',
      },
    ],
    contact: {
      label: 'Contact',
      title: 'Start a motion graphics project',
      subtitle:
        'Tell us about the film, explainer, or system you need. We reply within 1–2 business days.',
      messagePlaceholder: 'Tell us about your motion graphics needs',
    },
    serviceName: 'Motion graphics services',
  },
  {
    id: 'industrial-animation-vancouver',
    path: '/industrial-animation-vancouver',
    breadcrumb: 'Industrial Animation',
    seo: {
      title: 'Industrial Animation Vancouver | Technical Motion | Numinas',
      description:
        'Industrial animation Vancouver for products, processes, and technical stories. Numinas turns complex industrial systems into clear motion graphics.',
      imageAlt: 'Numinas industrial animation Vancouver',
      keywords: [
        'industrial animation vancouver',
        'industrial motion graphics',
        'technical animation Vancouver',
        'product animation Vancouver',
        'process animation BC',
        'Numinas industrial animation',
      ],
    },
    hero: {
      title: 'Industrial Animation Vancouver For Products That Need Clarity',
      body: 'From machinery and manufacturing flows to B2B product stories, Numinas creates industrial animation that makes complex systems easy to understand — and easier to sell.',
      accentWords: ['Clarity'],
    },
    mid: {
      eyebrow: 'Industrial & technical motion',
      title: 'Animation for industrial and technical brands in Vancouver',
      body: 'Industrial animation Vancouver searches usually mean one thing: make the invisible visible. We storyboard processes, products, and systems, then animate with precision for sales decks, websites, trade shows, and training.',
      points: [
        {
          title: 'Process & product explainers',
          body: 'Step-through industrial workflows and product mechanisms without drowning viewers in jargon.',
        },
        {
          title: 'Technical brand films',
          body: 'Cinematic but accurate motion for manufacturing, energy, hardware, and B2B launches.',
        },
        {
          title: 'Trade show & sales kits',
          body: 'Loops, cutdowns, and stills sized for booths, decks, and paid campaigns.',
        },
      ],
    },
    faqs: [
      {
        question: 'Do you offer industrial animation in Vancouver?',
        answer:
          'Yes. Numinas produces industrial animation in Vancouver for technical products, manufacturing processes, and B2B brands that need clarity on screen.',
      },
      {
        question: 'What kinds of industrial projects do you animate?',
        answer:
          'Product mechanisms, facility or process flows, hardware launches, safety and training explainers, and sales films where accuracy matters as much as craft.',
      },
      {
        question: 'Can industrial animation run alongside brand marketing?',
        answer:
          'Absolutely. We often pair technical explainers with brand films and social cutdowns so industrial stories stay consistent across channels.',
      },
    ],
    contact: {
      label: 'Contact',
      title: 'Brief your industrial animation project',
      subtitle:
        'Share product context, audience, and deadlines. We will reply within 1–2 business days.',
      messagePlaceholder: 'Tell us about your industrial animation needs',
    },
    serviceName: 'Industrial animation Vancouver',
  },
]

export function getKeywordLandingByPath(path: string) {
  return KEYWORD_LANDINGS.find((landing) => landing.path === path)
}

export function getKeywordLandingById(id: string) {
  return KEYWORD_LANDINGS.find((landing) => landing.id === id)
}

export const KEYWORD_LANDING_PATHS = KEYWORD_LANDINGS.map((landing) => landing.path)
