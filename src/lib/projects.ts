export type MediaSlot = {
  id: string
  type: 'image' | 'video'
  label: string
  span: 'tall' | 'wide' | 'square'
  parallax: number
  src?: string
  poster?: string
}

export type StorySection = {
  id: string
  eyebrow: string
  title: string
  body: string
}

export type Project = {
  slug: string
  client: string
  title: string
  tagline: string
  year: string
  services: string[]
  accent: string
  accentSoft: string
  overview: string
  challenge: string
  approach: string
  outcome: string
  story: StorySection[]
  media: MediaSlot[]
  thumbnail?: string
  heroVideo?: string
  heroImage?: string
}

const PROJECT_MEDIA = '/media/projects'

export const PROJECTS: Project[] = [
  {
    slug: 'urban-decay-ride-or-die',
    client: 'Urban Decay',
    title: 'Ride or Die',
    tagline: 'High-gloss beauty launch film with attitude and velocity.',
    year: '2024',
    services: ['Brand Film', '3D Motion', 'Color Grade'],
    accent: '#ff4fa3',
    accentSoft: '#ffe3f1',
    overview:
      'A campaign-forward launch piece built to feel fearless on social, in-store, and paid media — with a cinematic spine that carries the brand voice.',
    challenge:
      'Translate a bold product story into motion that reads in three seconds while still rewarding a full watch.',
    approach:
      'We paired macro product beauty with kinetic type systems and rhythmic cuts tuned for vertical and widescreen crops.',
    outcome:
      'A modular film toolkit with hero, cutdowns, and loopable social shells ready for channel-specific delivery.',
    story: [
      {
        id: 'concept',
        eyebrow: 'Concept',
        title: 'Attitude first, product second',
        body: 'Moodboards leaned into nightlife texture, chrome highlights, and punchy contrast before we locked frame rhythm.',
      },
      {
        id: 'craft',
        eyebrow: 'Craft',
        title: 'Texture you can feel',
        body: 'Layered grain, specular hits, and tactile typography keep the film vibrant without losing product clarity.',
      },
    ],
    media: [
      { id: 'hero', type: 'video', label: 'Hero film', span: 'wide', parallax: 0.18 },
      { id: 'still-01', type: 'image', label: 'Key still 01', span: 'tall', parallax: 0.32 },
      { id: 'still-02', type: 'image', label: 'Key still 02', span: 'square', parallax: 0.24 },
      { id: 'loop', type: 'video', label: 'Social loop', span: 'square', parallax: 0.4 },
      { id: 'still-03', type: 'image', label: 'Key still 03', span: 'wide', parallax: 0.28 },
      { id: 'bts', type: 'image', label: 'Process frame', span: 'tall', parallax: 0.36 },
    ],
    heroVideo: `${PROJECT_MEDIA}/urban-decay-ride-or-die/hero.mp4`,
    heroImage: `${PROJECT_MEDIA}/urban-decay-ride-or-die/hero.jpg`,
    thumbnail: `${PROJECT_MEDIA}/urban-decay-ride-or-die/thumb.jpg`,
  },
  {
    slug: 'olay-stem',
    client: 'Olay',
    title: 'STEM',
    tagline: 'Science-led storytelling with warmth, clarity, and trust.',
    year: '2024',
    services: ['Explainer', '2D Motion', 'Sound Design'],
    accent: '#ff6b2c',
    accentSoft: '#ffe8d8',
    overview:
      'An explainer ecosystem that makes complex skincare science feel human, premium, and easy to share.',
    challenge:
      'Balance clinical credibility with emotional resonance across hero film, cutdowns, and retail screens.',
    approach:
      'We built a modular visual language — soft gradients, diagrammatic motion, and voice-led pacing.',
    outcome:
      'A cohesive STEM story that scales from 6-second hooks to long-form education without reworking the system.',
    story: [
      {
        id: 'system',
        eyebrow: 'System',
        title: 'Diagrams that breathe',
        body: 'Animated infographics stay legible at every size, with color coding that guides the eye through each claim.',
      },
      {
        id: 'tone',
        eyebrow: 'Tone',
        title: 'Warm science',
        body: 'Rounded forms and sunlit palettes keep the film approachable while the VO anchors authority.',
      },
    ],
    media: [
      { id: 'hero', type: 'video', label: 'Hero explainer', span: 'wide', parallax: 0.16 },
      { id: 'diagram', type: 'image', label: 'Diagram frame', span: 'square', parallax: 0.3 },
      { id: 'product', type: 'image', label: 'Product beauty', span: 'tall', parallax: 0.26 },
      { id: 'social', type: 'video', label: 'Paid social', span: 'square', parallax: 0.38 },
      { id: 'retail', type: 'image', label: 'Retail screen', span: 'wide', parallax: 0.22 },
      { id: 'detail', type: 'image', label: 'Macro detail', span: 'tall', parallax: 0.34 },
    ],
    heroVideo: `${PROJECT_MEDIA}/olay-stem/hero.mp4`,
    heroImage: `${PROJECT_MEDIA}/olay-stem/hero.jpg`,
    thumbnail: `${PROJECT_MEDIA}/olay-stem/thumb.jpg`,
  },
  {
    slug: 'american-express-play-it',
    client: 'American Express',
    title: 'Play It',
    tagline: 'Premium motion for a campaign built around momentum.',
    year: '2023',
    services: ['Campaign Film', 'Motion Systems', 'Delivery Kits'],
    accent: '#2f6bff',
    accentSoft: '#dfe9ff',
    overview:
      'A high-energy campaign film and motion toolkit designed for broadcast, digital, and partner channels.',
    challenge:
      'Create a distinctive visual tempo that feels unmistakably Amex while staying flexible for regional variants.',
    approach:
      'We developed a beat-mapped edit language with repeatable type cards, transitions, and logo resolves.',
    outcome:
      'A campaign system with master film, toolkit elements, and channel-ready exports.',
    story: [
      {
        id: 'rhythm',
        eyebrow: 'Rhythm',
        title: 'Cut to the beat',
        body: 'Motion beats align to a flexible audio grid so regional edits stay on-brand without rebuilding timelines.',
      },
      {
        id: 'toolkit',
        eyebrow: 'Toolkit',
        title: 'Built to scale',
        body: 'End cards, supers, and logo resolves ship as editable shells for fast versioning.',
      },
    ],
    media: [
      { id: 'hero', type: 'video', label: 'Master film', span: 'wide', parallax: 0.2 },
      { id: 'card-01', type: 'image', label: 'Title card', span: 'square', parallax: 0.28 },
      { id: 'card-02', type: 'image', label: 'Scene still', span: 'tall', parallax: 0.34 },
      { id: 'end', type: 'video', label: 'End frame loop', span: 'square', parallax: 0.42 },
      { id: 'ooh', type: 'image', label: 'OOH mockup', span: 'wide', parallax: 0.24 },
      { id: 'detail', type: 'image', label: 'Typography study', span: 'tall', parallax: 0.3 },
    ],
    heroVideo: `${PROJECT_MEDIA}/american-express-play-it/hero.mp4`,
    heroImage: `${PROJECT_MEDIA}/american-express-play-it/hero.jpg`,
    thumbnail: `${PROJECT_MEDIA}/american-express-play-it/thumb.jpg`,
  },
  {
    slug: 'excel-get-chewing',
    client: 'Excel',
    title: 'Get Chewing',
    tagline: 'Playful product energy with snackable motion loops.',
    year: '2023',
    services: ['Social Content', '3D Product', 'Animation'],
    accent: '#00b86b',
    accentSoft: '#d9f8ea',
    overview:
      'A vibrant product campaign built for scroll-stopping loops and upbeat brand personality.',
    challenge:
      'Make gum feel dynamic and craveable in silent feeds while keeping flavor cues crystal clear.',
    approach:
      'Bold color blocking, elastic easing, and macro product moments anchor a family of short-form loops.',
    outcome:
      'A library of vertical loops, stills, and toolkit frames for always-on social.',
    story: [
      {
        id: 'loops',
        eyebrow: 'Loops',
        title: 'Silent-first hooks',
        body: 'Each loop leads with shape and color contrast so the product reads before a single word appears.',
      },
      {
        id: 'flavor',
        eyebrow: 'Flavor',
        title: 'Color as cue',
        body: 'Flavor variants map to accent shifts across pack, background, and particle trails.',
      },
    ],
    media: [
      { id: 'hero', type: 'video', label: 'Hero loop', span: 'wide', parallax: 0.22 },
      { id: 'pack', type: 'image', label: 'Pack shot', span: 'square', parallax: 0.26 },
      { id: 'macro', type: 'image', label: 'Macro chew', span: 'tall', parallax: 0.36 },
      { id: 'variant', type: 'video', label: 'Flavor variant', span: 'square', parallax: 0.4 },
      { id: 'grid', type: 'image', label: 'Social grid', span: 'wide', parallax: 0.2 },
      { id: 'sticker', type: 'image', label: 'Sticker frame', span: 'tall', parallax: 0.32 },
    ],
    heroVideo: `${PROJECT_MEDIA}/excel-get-chewing/hero.mp4`,
    heroImage: `${PROJECT_MEDIA}/excel-get-chewing/hero.jpg`,
    thumbnail: `${PROJECT_MEDIA}/excel-get-chewing/thumb.jpg`,
  },
  {
    slug: 'secret-aluminum-free',
    client: 'Secret',
    title: 'Aluminum Free',
    tagline: 'Clean beauty messaging with soft light and confident motion.',
    year: '2023',
    services: ['Brand Film', 'Live Action Comp', 'Motion'],
    accent: '#8b5cf6',
    accentSoft: '#ede6ff',
    overview:
      'A campaign film introducing aluminum-free benefits with a calm, premium visual world.',
    challenge:
      'Communicate formulation change clearly without clinical coldness or category clichés.',
    approach:
      'Airy photography, gentle camera moves, and typographic emphasis on benefit-led headlines.',
    outcome:
      'Hero film plus cutdowns and stills for site, social, and retail partners.',
    story: [
      {
        id: 'light',
        eyebrow: 'Light',
        title: 'Soft confidence',
        body: 'High-key lighting and slow parallax keep the film feeling fresh, clean, and trustworthy.',
      },
      {
        id: 'message',
        eyebrow: 'Message',
        title: 'Benefit-forward',
        body: 'Headlines land early and often, supported by product demos and ingredient callouts.',
      },
    ],
    media: [
      { id: 'hero', type: 'video', label: 'Hero film', span: 'wide', parallax: 0.18 },
      { id: 'talent', type: 'image', label: 'Talent frame', span: 'tall', parallax: 0.3 },
      { id: 'product', type: 'image', label: 'Product lineup', span: 'square', parallax: 0.24 },
      { id: 'cutdown', type: 'video', label: 'Cutdown', span: 'square', parallax: 0.38 },
      { id: 'typography', type: 'image', label: 'Type study', span: 'wide', parallax: 0.26 },
      { id: 'texture', type: 'image', label: 'Texture plate', span: 'tall', parallax: 0.34 },
    ],
    heroVideo: `${PROJECT_MEDIA}/secret-aluminum-free/hero.mp4`,
    heroImage: `${PROJECT_MEDIA}/secret-aluminum-free/hero.jpg`,
    thumbnail: `${PROJECT_MEDIA}/secret-aluminum-free/thumb.jpg`,
  },
  {
    slug: 'pellican-cushion',
    client: 'Pellican',
    title: 'Cushion',
    tagline: 'Product beauty with tactile materials and precise macro motion.',
    year: '2022',
    services: ['Product Film', 'CGI', 'Finishing'],
    accent: '#00c2d7',
    accentSoft: '#d7f7fb',
    overview:
      'A tactile product story highlighting cushion engineering through macro detail and soft specular light.',
    challenge:
      'Show technical comfort features in a premium way without feeling like a spec sheet.',
    approach:
      'Material studies, slow-motion compressions, and cross-section reveals build understanding through feel.',
    outcome:
      'A hero film and image suite for ecommerce, packaging, and trade presentations.',
    story: [
      {
        id: 'material',
        eyebrow: 'Material',
        title: 'Touch translated to motion',
        body: 'Foam rebound, fabric weave, and edge detail are shot and enhanced with subtle CG support.',
      },
      {
        id: 'reveal',
        eyebrow: 'Reveal',
        title: 'Inside the cushion',
        body: 'Layered reveals explain support zones with color-coded motion rather than dense copy.',
      },
    ],
    media: [
      { id: 'hero', type: 'video', label: 'Hero film', span: 'wide', parallax: 0.2 },
      { id: 'macro', type: 'image', label: 'Macro weave', span: 'tall', parallax: 0.32 },
      { id: 'section', type: 'image', label: 'Cross section', span: 'square', parallax: 0.28 },
      { id: 'spin', type: 'video', label: 'Product spin', span: 'square', parallax: 0.4 },
      { id: 'lifestyle', type: 'image', label: 'Lifestyle still', span: 'wide', parallax: 0.22 },
      { id: 'detail', type: 'image', label: 'Edge detail', span: 'tall', parallax: 0.36 },
    ],
    heroVideo: `${PROJECT_MEDIA}/pellican-cushion/hero.mp4`,
    heroImage: `${PROJECT_MEDIA}/pellican-cushion/hero.jpg`,
    thumbnail: `${PROJECT_MEDIA}/pellican-cushion/thumb.jpg`,
  },
]

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug)
}

export function getAdjacentProjects(slug: string) {
  const index = PROJECTS.findIndex((project) => project.slug === slug)
  if (index === -1) return { prev: undefined, next: undefined }
  return {
    prev: PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(index + 1) % PROJECTS.length],
  }
}
