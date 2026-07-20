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
  /** Homepage work card: defaults to video when heroVideo exists. Set to `image` to force thumbnail. */
  cardMedia?: 'video' | 'image'
}

const PROJECT_MEDIA = '/media/projects'
const BELLEMINT_MEDIA = `${PROJECT_MEDIA}/bellemint`
const DOLBY_MEDIA = `${PROJECT_MEDIA}/dolby`
const URBAN_DECAY_MEDIA = `${PROJECT_MEDIA}/urban-decay-ride-or-die`
const OLAY_STEM_MEDIA = `${PROJECT_MEDIA}/olay-stem`
const AMEX_MEDIA = `${PROJECT_MEDIA}/american-express-play-it`
const SECRET_MEDIA = `${PROJECT_MEDIA}/secret-aluminum-free`
const READCOIN_MEDIA = `${PROJECT_MEDIA}/readcoin`
const PLANET_MEDIA = `${PROJECT_MEDIA}/planet`

function projectMediaFile(base: string, filename: string) {
  return `${base}/${encodeURIComponent(filename)}`
}

export const PROJECTS: Project[] = [
  {
    slug: 'bellemint',
    client: 'Bellemint',
    title: 'Bellemint',
    tagline: 'Fresh breath, elevated through cinematic product motion.',
    year: '2024',
    services: ['Brand Film', '3D Motion', 'Social Content'],
    accent: '#34d399',
    accentSoft: '#d1fae5',
    overview:
      'A launch film and still suite for Bellemint — pairing crisp product beauty with a bright, confident visual world built for paid, owned, and social channels.',
    challenge:
      'Make a breath-care product feel premium and immediate in feeds that reward clarity in the first second.',
    approach:
      'Macro product passes, soft specular light, and rhythmic cuts keep the story fresh while typography lands the benefit fast.',
    outcome:
      'Hero film, key stills, and gallery assets ready for site, social, and campaign extensions.',
    story: [
      {
        id: 'look',
        eyebrow: 'Look',
        title: 'Clean, bright, tactile',
        body: 'Mint-forward palettes and high-key lighting keep the world feeling crisp without clinical coldness.',
      },
      {
        id: 'product',
        eyebrow: 'Product',
        title: 'Detail that sells',
        body: 'Close passes on pack, texture, and finish make the product hero in every frame.',
      },
    ],
    media: [
      {
        id: 'hero',
        type: 'video',
        label: 'Hero film',
        span: 'wide',
        parallax: 0.18,
        src: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1.mp4`,
        poster: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_10025.png`,
      },
      {
        id: 'still-01',
        type: 'image',
        label: 'Key still 01',
        span: 'tall',
        parallax: 0.32,
        src: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_10003.png`,
      },
      {
        id: 'still-02',
        type: 'image',
        label: 'Key still 02',
        span: 'square',
        parallax: 0.24,
        src: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_10009.png`,
      },
      {
        id: 'loop',
        type: 'image',
        label: 'Product frame',
        span: 'square',
        parallax: 0.4,
        src: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_10388.png`,
      },
      {
        id: 'still-03',
        type: 'image',
        label: 'Key still 03',
        span: 'wide',
        parallax: 0.28,
        src: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_10538.png`,
      },
      {
        id: 'bts',
        type: 'image',
        label: 'Gallery still',
        span: 'tall',
        parallax: 0.36,
        src: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_10613.png`,
      },
      {
        id: 'detail-01',
        type: 'image',
        label: 'Detail 01',
        span: 'square',
        parallax: 0.26,
        src: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_10706.png`,
      },
      {
        id: 'detail-02',
        type: 'image',
        label: 'Detail 02',
        span: 'wide',
        parallax: 0.22,
        src: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_10996.png`,
      },
      {
        id: 'detail-03',
        type: 'image',
        label: 'Detail 03',
        span: 'tall',
        parallax: 0.34,
        src: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_11161.png`,
      },
    ],
    heroVideo: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1.mp4`,
    heroImage: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_10025.png`,
    thumbnail: `${BELLEMINT_MEDIA}/BELLEMINT_16-9_1_10025.png`,
  },
  {
    slug: 'dolby',
    client: 'Dolby',
    title: 'Dolby',
    tagline: 'Immersive brand motion built around sound, light, and cinematic rhythm.',
    year: '2024',
    services: ['Brand Film', 'Motion Design', 'Sound Design'],
    accent: '#635bff',
    accentSoft: '#ebe8ff',
    overview:
      'A short-form brand film and styleframe suite for Dolby — translating premium audio identity into a visual language that feels spatial, precise, and alive.',
    challenge:
      'Express intangible sound quality in motion graphics that still feel human, premium, and immediately legible in short-form media.',
    approach:
      'We built a modular styleframe system — luminous gradients, waveform-inspired forms, and restrained typography — then carried it through a tight hero cut.',
    outcome:
      'Hero film, styleframes, and gallery assets ready for presentations, social, and brand extensions.',
    story: [
      {
        id: 'system',
        eyebrow: 'System',
        title: 'Sound made visible',
        body: 'Abstract waveforms and light fields give audio a tangible shape without literal UI or device clutter.',
      },
      {
        id: 'craft',
        eyebrow: 'Craft',
        title: 'Precision in every frame',
        body: 'Controlled contrast, soft bloom, and rhythmic cuts keep the film feeling technical yet emotive.',
      },
    ],
    media: [
      {
        id: 'hero',
        type: 'video',
        label: 'Hero film',
        span: 'wide',
        parallax: 0.18,
        src: projectMediaFile(DOLBY_MEDIA, '06 - Dolby_Short.mp4'),
        poster: projectMediaFile(DOLBY_MEDIA, 'Dolby_Styleframe_1.jpg'),
      },
      {
        id: 'still-01',
        type: 'image',
        label: 'Styleframe 01',
        span: 'tall',
        parallax: 0.32,
        src: projectMediaFile(DOLBY_MEDIA, 'Dolby_Styleframe_1.jpg'),
      },
      {
        id: 'still-02',
        type: 'image',
        label: 'Styleframe 02',
        span: 'square',
        parallax: 0.24,
        src: projectMediaFile(DOLBY_MEDIA, 'Dolby_Styleframe_2.jpg'),
      },
      {
        id: 'loop',
        type: 'image',
        label: 'Styleframe 03',
        span: 'square',
        parallax: 0.4,
        src: projectMediaFile(DOLBY_MEDIA, 'Dolby_Styleframe_3.jpg'),
      },
      {
        id: 'still-03',
        type: 'image',
        label: 'Styleframe 04',
        span: 'wide',
        parallax: 0.28,
        src: projectMediaFile(DOLBY_MEDIA, 'Dolby_Styleframe_4.jpg'),
      },
      {
        id: 'bts',
        type: 'image',
        label: 'Styleframe detail',
        span: 'tall',
        parallax: 0.36,
        src: projectMediaFile(DOLBY_MEDIA, 'Dolby_Styleframe_3_0.jpg'),
      },
    ],
    heroVideo: projectMediaFile(DOLBY_MEDIA, '06 - Dolby_Short.mp4'),
    heroImage: projectMediaFile(DOLBY_MEDIA, 'Dolby_Styleframe_1.jpg'),
    thumbnail: projectMediaFile(DOLBY_MEDIA, 'Dolby_Styleframe_1.jpg'),
  },
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
      {
        id: 'hero',
        type: 'video',
        label: 'Animation opener',
        span: 'wide',
        parallax: 0.18,
        src: projectMediaFile(URBAN_DECAY_MEDIA, '01 - Animation_Opener.mp4'),
        poster: projectMediaFile(URBAN_DECAY_MEDIA, 'Urban Decay.jpg'),
      },
      {
        id: 'still-01',
        type: 'image',
        label: 'Key still',
        span: 'tall',
        parallax: 0.32,
        src: projectMediaFile(URBAN_DECAY_MEDIA, 'Urban Decay.jpg'),
      },
      {
        id: 'loop',
        type: 'video',
        label: 'Ride or Die bumper',
        span: 'square',
        parallax: 0.4,
        src: projectMediaFile(URBAN_DECAY_MEDIA, '02 - Bumper_Transition_RIDE OR DIE.mp4'),
        poster: projectMediaFile(URBAN_DECAY_MEDIA, 'Urban Decay.jpg'),
      },
      {
        id: 'still-02',
        type: 'image',
        label: 'Campaign still',
        span: 'square',
        parallax: 0.24,
        src: projectMediaFile(URBAN_DECAY_MEDIA, 'Urban Decay.jpg'),
      },
      {
        id: 'still-03',
        type: 'image',
        label: 'Hero frame',
        span: 'wide',
        parallax: 0.28,
        src: projectMediaFile(URBAN_DECAY_MEDIA, 'Urban Decay.jpg'),
      },
      {
        id: 'bts',
        type: 'image',
        label: 'Styleframe',
        span: 'tall',
        parallax: 0.36,
        src: projectMediaFile(URBAN_DECAY_MEDIA, 'Urban Decay.jpg'),
      },
    ],
    heroVideo: projectMediaFile(URBAN_DECAY_MEDIA, '01 - Animation_Opener.mp4'),
    heroImage: projectMediaFile(URBAN_DECAY_MEDIA, 'Urban Decay.jpg'),
    thumbnail: projectMediaFile(URBAN_DECAY_MEDIA, 'Urban Decay.jpg'),
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
      {
        id: 'hero',
        type: 'video',
        label: 'Hero explainer',
        span: 'wide',
        parallax: 0.16,
        src: projectMediaFile(OLAY_STEM_MEDIA, 'ProjectOlay_STEM30_Seconds.mp4'),
        poster: projectMediaFile(OLAY_STEM_MEDIA, 'ProjectOlay_30_ENG_Final_00088.jpg'),
      },
      {
        id: 'diagram',
        type: 'image',
        label: 'Diagram frame',
        span: 'square',
        parallax: 0.3,
        src: projectMediaFile(OLAY_STEM_MEDIA, 'ProjectOlay_30_ENG_Final_00088.jpg'),
      },
      {
        id: 'product',
        type: 'image',
        label: 'Product beauty',
        span: 'tall',
        parallax: 0.26,
        src: projectMediaFile(OLAY_STEM_MEDIA, 'ProjectOlay_Phase 1_30_ENG_1920x1080_Final_00085.jpg'),
      },
      {
        id: 'social',
        type: 'image',
        label: 'Campaign still',
        span: 'square',
        parallax: 0.38,
        src: projectMediaFile(OLAY_STEM_MEDIA, 'ProjectOlay_30_ENG_Final_00719.jpg'),
      },
      {
        id: 'retail',
        type: 'image',
        label: 'Retail screen',
        span: 'wide',
        parallax: 0.22,
        src: projectMediaFile(OLAY_STEM_MEDIA, 'ProjectOlay_Phase 1_30_ENG_1920x1080_Final_00716.jpg'),
      },
      {
        id: 'detail',
        type: 'image',
        label: 'Macro detail',
        span: 'tall',
        parallax: 0.34,
        src: projectMediaFile(OLAY_STEM_MEDIA, 'WHite_00028.jpg'),
      },
    ],
    heroVideo: projectMediaFile(OLAY_STEM_MEDIA, 'ProjectOlay_STEM30_Seconds.mp4'),
    heroImage: projectMediaFile(OLAY_STEM_MEDIA, 'ProjectOlay_30_ENG_Final_00088.jpg'),
    thumbnail: projectMediaFile(OLAY_STEM_MEDIA, 'ProjectOlay_30_ENG_Final_00088.jpg'),
  },
  {
    slug: 'american-express-play-it',
    client: 'American Express',
    title: 'Plan It',
    tagline: 'Clear, confident motion for a product explainer built to scale.',
    year: '2023',
    services: ['Explainer Film', 'Motion Systems', 'Delivery Kits'],
    accent: '#2f6bff',
    accentSoft: '#dfe9ff',
    overview:
      'An explainer film and frame suite for American Express Plan It — turning a financial feature into motion that feels approachable, premium, and easy to follow.',
    challenge:
      'Make a multi-step product story legible in one hero film while leaving room for cutdowns and toolkit frames.',
    approach:
      'Structured story beats, clean UI-inspired compositions, and a repeatable frame system for channel variants.',
    outcome:
      'Hero explainer, thumbnail, and styleframes ready for digital, partner, and presentation use.',
    story: [
      {
        id: 'clarity',
        eyebrow: 'Clarity',
        title: 'Complex made simple',
        body: 'Each beat isolates one benefit so viewers grasp Plan It without dense on-screen copy.',
      },
      {
        id: 'toolkit',
        eyebrow: 'Toolkit',
        title: 'Built to scale',
        body: 'Frame exports and end states ship as modular assets for fast versioning across markets.',
      },
    ],
    media: [
      {
        id: 'hero',
        type: 'video',
        label: 'Explainer film',
        span: 'wide',
        parallax: 0.2,
        src: projectMediaFile(AMEX_MEDIA, '02 - AmericanExpress_PlanIt_ExplainerVideo.mp4'),
        poster: projectMediaFile(AMEX_MEDIA, 'AmericanExpress_PlanIt_ExplainerVideo_Thumbnail.jpg'),
      },
      {
        id: 'card-01',
        type: 'image',
        label: 'Frame 02',
        span: 'square',
        parallax: 0.28,
        src: projectMediaFile(AMEX_MEDIA, 'AMEX_PlanIt_Frame2.jpg'),
      },
      {
        id: 'card-02',
        type: 'image',
        label: 'Frame 04',
        span: 'tall',
        parallax: 0.34,
        src: projectMediaFile(AMEX_MEDIA, 'AMEX_PlanIt_Frame4.jpg'),
      },
      {
        id: 'end',
        type: 'image',
        label: 'Frame 05',
        span: 'square',
        parallax: 0.42,
        src: projectMediaFile(AMEX_MEDIA, 'AMEX_PlanIt_Frame5.jpg'),
      },
      {
        id: 'ooh',
        type: 'image',
        label: 'Frame 06',
        span: 'wide',
        parallax: 0.24,
        src: projectMediaFile(AMEX_MEDIA, 'AMEX_PlanIt_Frame6.jpg'),
      },
      {
        id: 'detail',
        type: 'image',
        label: 'Frame 07',
        span: 'tall',
        parallax: 0.3,
        src: projectMediaFile(AMEX_MEDIA, 'AMEX_PlanIt_Frame7.jpg'),
      },
    ],
    heroVideo: projectMediaFile(AMEX_MEDIA, '02 - AmericanExpress_PlanIt_ExplainerVideo.mp4'),
    heroImage: projectMediaFile(AMEX_MEDIA, 'AmericanExpress_PlanIt_ExplainerVideo_Thumbnail.jpg'),
    thumbnail: projectMediaFile(AMEX_MEDIA, 'AmericanExpress_PlanIt_ExplainerVideo_Thumbnail.jpg'),
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
    cardMedia: 'image',
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
      {
        id: 'hero',
        type: 'video',
        label: 'Hero film',
        span: 'wide',
        parallax: 0.18,
        src: projectMediaFile(SECRET_MEDIA, 'Secret_Aluminum Free_1.mp4'),
        poster: projectMediaFile(SECRET_MEDIA, 'Secret_Aluminum Free_Social Media thumbnail.jpg'),
      },
      {
        id: 'talent',
        type: 'image',
        label: 'Sea salt frame',
        span: 'tall',
        parallax: 0.3,
        src: projectMediaFile(SECRET_MEDIA, 'Secret_Aluminum Free_SeaSalt_Screenshot.jpg'),
      },
      {
        id: 'product',
        type: 'image',
        label: 'Logo lockup',
        span: 'square',
        parallax: 0.24,
        src: projectMediaFile(SECRET_MEDIA, 'Secret_Aluminum Free_Logo.jpg'),
      },
      {
        id: 'cutdown',
        type: 'image',
        label: 'pH levels styleframe',
        span: 'square',
        parallax: 0.38,
        src: projectMediaFile(SECRET_MEDIA, 'Secret_Aluminum Free_PH Levels_Styleframe.jpg'),
      },
      {
        id: 'typography',
        type: 'image',
        label: 'Social thumbnail',
        span: 'wide',
        parallax: 0.26,
        src: projectMediaFile(SECRET_MEDIA, 'Secret_Aluminum Free_Social Media thumbnail.jpg'),
      },
      {
        id: 'texture',
        type: 'image',
        label: 'Styleframe',
        span: 'tall',
        parallax: 0.34,
        src: projectMediaFile(SECRET_MEDIA, 'Secret_Aluminum Free_PH Levels_Styleframe.jpg'),
      },
    ],
    heroVideo: projectMediaFile(SECRET_MEDIA, 'Secret_Aluminum Free_1.mp4'),
    heroImage: projectMediaFile(SECRET_MEDIA, 'Secret_Aluminum Free_Social Media thumbnail.jpg'),
    thumbnail: projectMediaFile(SECRET_MEDIA, 'Secret_Aluminum Free_Social Media thumbnail.jpg'),
  },
  {
    slug: 'readcoin',
    client: 'Readcoin',
    title: 'Readcoin',
    tagline: 'Playful fintech motion that makes earning feel instant and rewarding.',
    year: '2025',
    services: ['Brand Film', '2D Motion', 'UI Animation'],
    accent: '#f59e0b',
    accentSoft: '#fcd34d',
    overview:
      'A launch film and visual toolkit for Readcoin — turning reading rewards into kinetic, app-native motion that feels fun, trustworthy, and shareable.',
    challenge:
      'Explain a coin-based rewards loop in seconds without feeling like crypto jargon or a dry product demo.',
    approach:
      'Bold coin metaphors, elastic UI transitions, and saturated color blocks keep the story energetic while typography carries the value prop.',
    outcome:
      'Hero film, styleframes, and gallery stills ready for app store, social, and investor decks.',
    story: [
      {
        id: 'metaphor',
        eyebrow: 'Metaphor',
        title: 'Coins in motion',
        body: 'Reward moments stack, bounce, and collect with tactile timing so earning feels physical and satisfying.',
      },
      {
        id: 'app',
        eyebrow: 'App',
        title: 'UI that moves',
        body: 'Screen flows animate with clarity-first pacing — every swipe and tally reads before the next beat lands.',
      },
    ],
    media: [
      {
        id: 'hero',
        type: 'video',
        label: 'Launch film',
        span: 'wide',
        parallax: 0.18,
        src: projectMediaFile(READCOIN_MEDIA, 'READCOIN (1).mp4'),
        poster: projectMediaFile(READCOIN_MEDIA, 'vlcsnap-2025-10-28-08h03m21s185.png'),
      },
      {
        id: 'still-01',
        type: 'image',
        label: 'Opening frame',
        span: 'tall',
        parallax: 0.32,
        src: projectMediaFile(READCOIN_MEDIA, 'vlcsnap-2025-10-28-08h03m21s185.png'),
      },
      {
        id: 'still-02',
        type: 'image',
        label: 'UI moment',
        span: 'square',
        parallax: 0.24,
        src: projectMediaFile(READCOIN_MEDIA, 'vlcsnap-2025-10-28-08h03m35s231.png'),
      },
      {
        id: 'still-03',
        type: 'image',
        label: 'Reward beat',
        span: 'wide',
        parallax: 0.28,
        src: projectMediaFile(READCOIN_MEDIA, 'vlcsnap-2025-10-28-08h03m54s813.png'),
      },
      {
        id: 'loop',
        type: 'image',
        label: 'Coin motion',
        span: 'square',
        parallax: 0.4,
        src: projectMediaFile(READCOIN_MEDIA, 'vlcsnap-2025-10-28-08h04m03s008.png'),
      },
      {
        id: 'bts',
        type: 'image',
        label: 'Styleframe',
        span: 'tall',
        parallax: 0.36,
        src: projectMediaFile(READCOIN_MEDIA, 'vlcsnap-2025-10-28-08h04m09s218.png'),
      },
      {
        id: 'detail-01',
        type: 'image',
        label: 'Detail 01',
        span: 'square',
        parallax: 0.26,
        src: projectMediaFile(READCOIN_MEDIA, 'vlcsnap-2025-10-28-08h04m14s468.png'),
      },
      {
        id: 'detail-02',
        type: 'image',
        label: 'Detail 02',
        span: 'wide',
        parallax: 0.22,
        src: projectMediaFile(READCOIN_MEDIA, 'vlcsnap-2025-10-28-08h04m26s058.png'),
      },
    ],
    heroVideo: projectMediaFile(READCOIN_MEDIA, 'READCOIN (1).mp4'),
    heroImage: projectMediaFile(READCOIN_MEDIA, 'vlcsnap-2025-10-28-08h03m21s185.png'),
    thumbnail: projectMediaFile(READCOIN_MEDIA, 'vlcsnap-2025-10-28-08h03m21s185.png'),
  },
  {
    slug: 'planet',
    client: 'Planet Toon',
    title: 'Broadcast Package',
    tagline: 'Playful broadcast motion that makes a kids network feel bigger, louder, and unforgettable.',
    year: '2024',
    services: ['Broadcast Design', '2D Motion', 'Brand Film'],
    accent: '#22d3ee',
    accentSoft: '#a5f3fc',
    overview:
      'A broadcast package for Planet Toon — openers, transitions, and channel branding built to cut through kids TV clutter with bold shape language and buoyant timing.',
    challenge:
      'Give a toon network instant recognition in linear and digital bumpers without feeling dated or over-busy.',
    approach:
      'Graphic character energy, saturated color fields, and snappy edit rhythms keep every ID feeling like an event — short enough for air, rich enough for social cutdowns.',
    outcome:
      'Hero package film and key stills ready for on-air, promos, and platform thumbnails.',
    story: [
      {
        id: 'identity',
        eyebrow: 'Identity',
        title: 'Channel in a flash',
        body: 'Logo moments and network color land early so the brand reads before the next program beat.',
      },
      {
        id: 'energy',
        eyebrow: 'Energy',
        title: 'Built for young eyes',
        body: 'Bounce, squash, and graphic punches keep the package playful while staying broadcast-clean.',
      },
    ],
    media: [
      {
        id: 'hero',
        type: 'video',
        label: 'Broadcast package',
        span: 'wide',
        parallax: 0.18,
        src: projectMediaFile(PLANET_MEDIA, '01 - Planet Toon - Broadcast Package2.mp4'),
        poster: projectMediaFile(PLANET_MEDIA, 'Planet Toon - Broadcast Package_00170.jpg'),
      },
      {
        id: 'still-01',
        type: 'image',
        label: 'Key still',
        span: 'tall',
        parallax: 0.3,
        src: projectMediaFile(PLANET_MEDIA, 'Planet Toon - Broadcast Package_00170.jpg'),
      },
      {
        id: 'still-02',
        type: 'image',
        label: 'Package frame',
        span: 'square',
        parallax: 0.24,
        src: projectMediaFile(PLANET_MEDIA, 'Planet Toon - Broadcast Package_00170.jpg'),
      },
      {
        id: 'still-03',
        type: 'image',
        label: 'Brand moment',
        span: 'wide',
        parallax: 0.28,
        src: projectMediaFile(PLANET_MEDIA, 'Planet Toon - Broadcast Package_00170.jpg'),
      },
    ],
    heroVideo: projectMediaFile(PLANET_MEDIA, '01 - Planet Toon - Broadcast Package2.mp4'),
    heroImage: projectMediaFile(PLANET_MEDIA, 'Planet Toon - Broadcast Package_00170.jpg'),
    thumbnail: projectMediaFile(PLANET_MEDIA, 'Planet Toon - Broadcast Package_00170.jpg'),
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
