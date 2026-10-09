import type { WorkEntry } from './types'

// Logos go in /public/logos, e.g. logo: '/logos/fullscript.svg'.
export const work: WorkEntry[] = [
  {
    company: 'Bramble',
    href: 'https://bramble.solutions',
    logo: '/logos/bramble-tile.png',
    role: 'product and brand',
    summary:
      "where i'm working now. i'm in charge of product and branding, and pitch in on customer support, growth, design, and more. a lot of the design and content you see from bramble is mine. here's an ad i made for them with higgsfield, figma, and midjourney, with more to come.",
    video: {
      ratio: '16:9',
      description: 'Bramble ad',
      src: '/videos/bramble-ad.mp4',
      poster: '/videos/bramble-ad.jpg',
    },
  },
  {
    company: 'Fullscript',
    href: 'https://fullscript.com',
    logo: '/logos/fullscript.svg',
    role: 'software developer intern',
    summary:
      '8 months as a software developer intern. i learned a lot about testing, how ruby works, and ui/ux practices.',
  },
  {
    company: 'Sema',
    href: 'https://try-sema.com',
    logo: '/logos/sema.svg',
    role: 'side project, just to learn stuff',
    summary:
      "a tool i built myself to help with cold emailing, which has landed me a ton of opportunities. it's at 500+ users and $200+ MRR, and i'm still learning how to grow it.",
  },
  {
    company: 'Thirdspace',
    href: 'https://thirdspace.so',
    logo: '/logos/thirdspace.svg',
    role: 'engineering',
    summary:
      "where i learned the bulk of what i know about building software. i started out building a simple to-do list for them, and by the end i'd built their internal dashboard system, plus a lot of work on the main app.",
  },
]
