/**
 * SEO + schema copy for /vancouver.
 * On-page layout mirrors the homepage; local keywords live mainly in meta/JSON-LD
 * plus a light Vancouver mention in the services intro.
 */

export const VANCOUVER_SEO = {
  path: '/vancouver',
  title: 'Motion Studio Vancouver | Brand Films & Animation | Numinas',
  description:
    'Vancouver motion studio for brand films, explainers, and social animation. Numinas works with Metro Vancouver brands and remote teams worldwide.',
  imageAlt: 'Numinas — Vancouver motion studio',
} as const

export const VANCOUVER_KEYWORDS = [
  'motion studio Vancouver',
  'Vancouver motion graphics',
  'animation studio Vancouver',
  'explainer video Vancouver',
  'brand film Vancouver',
  'motion design Vancouver BC',
  'Metro Vancouver animation',
  'Vancouver video studio',
  'Burnaby motion graphics',
  'North Vancouver animation',
  'Numinas Vancouver',
] as const

export const VANCOUVER_SERVICES = {
  items: [
    {
      title: 'Brand Films',
      body: 'Cinematic launch and positioning films for Vancouver startups, scale-ups, and established brands.',
    },
    {
      title: 'Explainer Videos',
      body: 'Story-led explainers that make complex products easy to grasp for sales, websites, and onboarding.',
    },
    {
      title: 'Social Content',
      body: 'Short-form motion for Instagram, TikTok, YouTube, and paid — built to stop the scroll and stay on-brand.',
    },
    {
      title: 'Motion Systems',
      body: 'Reusable templates, type, and transitions so your team can ship volume without losing the look.',
    },
    {
      title: 'Experiential & AR',
      body: 'Motion for physical and hybrid spaces across Metro Vancouver and beyond.',
    },
    {
      title: 'Custom & R&D',
      body: 'Experimental briefs and pipelines when the work does not fit a standard deliverable.',
    },
  ],
} as const

export const VANCOUVER_FAQS = [
  {
    question: 'Is Numinas a Vancouver motion studio?',
    answer:
      'Yes. Numinas is based in Vancouver, British Columbia. We create motion graphics, brand films, explainers, and social animation for local clients across Metro Vancouver and for remote partners worldwide.',
  },
  {
    question: 'What motion services do you offer in Vancouver?',
    answer:
      'We offer brand films, explainer videos, social content, motion systems, experiential and AR motion, and custom R&D. Most Vancouver projects start with a short creative call to scope goals and timeline.',
  },
  {
    question: 'Do you work with startups and agencies in Metro Vancouver?',
    answer:
      'Yes. We work with founders, in-house brand teams, and agencies across Downtown Vancouver, Burnaby, North Vancouver, Richmond, and nearby cities — as well as distributed teams that want a Vancouver-based studio partner.',
  },
  {
    question: 'Can you collaborate remotely outside Vancouver?',
    answer:
      'Absolutely. Many projects run fully remote with structured reviews. Vancouver remains our home base; we also support clients in Toronto, Seattle, Los Angeles, New York, and internationally.',
  },
  {
    question: 'How do I start a project with Numinas in Vancouver?',
    answer:
      'Book a creative call through the form on this page or email collab@numinas.studio. Share your timeline, audience, and any references — we typically reply within 1–2 business days.',
  },
] as const

export const VANCOUVER_HERO = {
  title: 'Vancouver Motion Graphics Studio, Crafting Scroll-Stopping Visuals That Convert',
  body: 'From our Vancouver studio, we create motion graphics and animation that help brands stand out, tell clear stories, and connect with their audience through visuals that convert.',
  accentWords: ['Scroll-Stopping', 'Convert'] as string[],
} as const

export const VANCOUVER_CTA = {
  eyebrow: 'Next step',
  title: 'Tell us about your Vancouver project',
  body: 'Share goals, timeline, and references. We will review and reply within 1–2 business days.',
} as const
