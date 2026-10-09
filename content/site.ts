import type { SiteConfig } from './types'

export const site: SiteConfig = {
  name: 'Khizar Malik',
  // Set NEXT_PUBLIC_SITE_URL once a custom domain is live. On Vercel this falls back to the
  // project's production URL automatically.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000'),
  description: 'i like to create things. currently a cs student @ carleton in my final year!',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/khizar--malik/' },
    { label: 'X', href: 'https://x.com/khizar_mm' },
    { label: 'GitHub', href: 'https://github.com/khizarrm' },
  ],
  // Each inner array is one paragraph; { panel } opens a side panel, { href } is an external link.
  intro: [
    ['i like to create things. currently a cs student @ carleton in my final year!'],
    [
      'i started creating things at ',
      { text: 'thirdspace', href: 'https://thirdspace.so' },
      ' with 2 friends. we scaled the app to 10k+ users, helping people build relationships throughout the world.',
    ],
    [
      'i eventually got into cold emailing and found it was quite effective once i was able to pitch mark cuban a startup. so i decided to automate it by making my own product, ',
      { text: 'sema', href: 'https://try-sema.com' },
      ', which i scaled to 500+ users and $200+ mrr. ',
      { text: "here's an email", href: 'https://try-sema.com/email' },
      ' i wrote about it when i realized what it could be.',
    ],
    [
      "since then i've interned at a couple of different places like ",
      { text: 'here', href: 'https://fullscript.com' },
      ', ',
      { text: 'here', href: 'https://studenthaus.ca' },
      ' and ',
      { text: 'here', href: 'https://wiredin.rw' },
      '. i like working at startups because i value the freedom they come with.',
    ],
    [
      "i'm currently leading product and design at ",
      { text: 'bramble', href: 'https://bramble.solutions' },
      '. i made a pretty cool ad for them, you can view it ',
      {
        text: 'here',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7511757586505826304/?actorCompanyId=99927845',
      },
      '.',
    ],
    [
      'i like to focus on the tiny details that make software feel premium. here are some ',
      { text: 'components', panel: 'components' },
      " which i'll be keeping up to date as i build.",
    ],
    [
      'besides tech, i enjoy ',
      { text: 'writing', panel: 'writing' },
      ', ',
      { text: 'reading', panel: 'reading' },
      ', and ',
      { text: 'making art using ai', panel: 'wallpapers' },
      ". i've also recently gotten into ",
      { text: 'content', panel: 'content' },
      ' as a way to get out of my comfort zone and build a personal brand.',
    ],
    [
      "i love learning about people. if u wanna have a chat, don't hesitate to ",
      { text: 'email me', href: 'mailto:khizarmalik2003@gmail.com' },
      '. enjoy!',
    ],
  ],
}
