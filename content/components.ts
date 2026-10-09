import type { ComponentEntry } from './types'

export const componentsIntro =
  "ui i've built and want to share. each one is interactive, so copy the code or grab a prompt to drop into your own assistant."

export const components: ComponentEntry[] = [
  {
    name: 'prompt input box',
    description:
      'a voice-first prompt box. hold option to talk, see a live waveform, and a pulsing red glow while recording. built for [sema](https://try-sema.com).',
    demo: 'prompt-input-box',
  },
  {
    name: 'hero carousel',
    description:
      'the hero at the top of this site. backgrounds slide in from a different side every few seconds, a portrait pops into the next corner, and clicking the portrait grows it to full height. click anywhere else to skip ahead.',
    demo: 'hero-carousel',
  },
]
