import fs from 'node:fs'
import path from 'node:path'
import type { ReactNode } from 'react'
import { components, componentsIntro } from '@/content/components'
import type { ComponentEntry } from '@/content/types'
import { panelTitles } from '@/lib/panels'
import { RichText } from '../RichText'
import { CopyButton } from '../showcase/CopyButton'
import { HeroCarousel, type HeroImage } from '../showcase/HeroCarousel'
import { PromptBox } from '../showcase/PromptInputBox'
import { ListRowContent, ListRowLink, listRowClass } from './ListRow'
import { PanelSection } from './PanelSection'

const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

// Placeholder photos from Unsplash.
const heroBackgrounds: HeroImage[] = [
  { src: unsplash('1506905925346-21bda4d32df4', 1280, 720), alt: 'Snowy peaks above a sea of clouds' },
  { src: unsplash('1501785888041-af3ef285b470', 1280, 720), alt: 'A boat on a turquoise mountain lake' },
  { src: unsplash('1470071459604-3b5ec3a7fe05', 1280, 720), alt: 'Mist rolling over green cliffs' },
  { src: unsplash('1469474968028-56623f02e42e', 1280, 720), alt: 'Sunlight over a mossy valley' },
  { src: unsplash('1500530855697-b586d89ba3ee', 1280, 720), alt: 'A road through red canyon walls' },
  { src: unsplash('1441974231531-c6227db76b6e', 1280, 720), alt: 'Sunlit forest path' },
]

const heroPortraits: HeroImage[] = [
  { src: unsplash('1494790108377-be9c29b29330', 480, 600), alt: 'Portrait of a smiling woman' },
  { src: unsplash('1507003211169-0a1dd7228f2d', 480, 600), alt: 'Portrait of a smiling man' },
  { src: unsplash('1438761681033-6461ffad8d80', 480, 600), alt: 'Portrait of a woman by a lake' },
  { src: unsplash('1500648767791-00dcc994a43e', 480, 600), alt: 'Portrait of a man in a grey sweater' },
  { src: unsplash('1517841905240-472988babdf9', 480, 600), alt: 'Portrait of a woman in a denim jacket' },
  { src: unsplash('1534528741775-53994a69daeb', 480, 600), alt: 'Portrait of a woman in blue light' },
]

type Demo = { file: string; preview: ReactNode; prompt: (source: string) => string }

const demos: Record<NonNullable<ComponentEntry['demo']>, Demo> = {
  'hero-carousel': {
    file: 'components/showcase/HeroCarousel.tsx',
    preview: <HeroCarousel backgrounds={heroBackgrounds} portraits={heroPortraits} />,
    prompt: (source) => `You are given a task to integrate an existing React component in the codebase.

The codebase should support React 19 and TypeScript. The component has no dependencies and ships its own CSS (a <style> tag React 19 hoists and dedupes), so Tailwind is not required.

Copy this component to the project's components folder as hero-carousel.tsx:
\`\`\`tsx
${source}
\`\`\`

Implementation guidelines
1. Props: backgrounds and portraits (arrays of { src, alt }), plus an optional className.
2. Backgrounds should be landscape images around 1280x720. Portraits are cropped to 4:5; around 480x600 is plenty.
3. It fills the width of its container at a 16:9 ratio. Place it in a container with a max width (e.g. 640px).
4. Backgrounds advance every 3s and on click; the portrait moves through the bottom-left, top-left and top-right corners. Clicking the portrait enlarges it to full height for 5s. All motion is off with prefers-reduced-motion.
5. Swap in your own images (or wire them to a CMS). Use next/image instead of <img> if you're on Next.js and want optimization.

Questions to ask
- Which images should be used for the backgrounds and portraits?
- Should clicking the hero do anything else, like open a gallery?
- Does the site need social links or a heading overlaid on the hero?
`,
  },
  'prompt-input-box': {
    file: 'components/showcase/PromptInputBox.tsx',
    preview: <PromptBox placeholder="Try typing, or hold Option to speak..." />,
    prompt: (source) => `You are given a task to integrate an existing React component in the codebase.

The codebase should support React 19, Tailwind CSS v4, and TypeScript. If it doesn't, explain how to set those up.

Copy this component to the project's components folder as prompt-input-box.tsx:
\`\`\`tsx
${source}
\`\`\`

Install the one dependency:
\`\`\`bash
npm install lucide-react
\`\`\`

Implementation guidelines
1. Props: className, placeholder, disabled, onSubmit, onStop, onTranscribe, ref (forwarded to the textarea).
2. The component records mic audio with MediaRecorder. Transcription is delegated to onTranscribe(blob: Blob) => Promise<string>. Wire it to a speech-to-text endpoint (OpenAI Whisper, Deepgram, Cloudflare Workers AI, etc.).
3. Holding Option (Alt) is a push-to-talk shortcut while the box is on screen. Clicking the mic button also starts recording.
4. The box is dark (#242424), so place it on a dark surface.

Questions to ask
- What transcription backend will onTranscribe call?
- What should onSubmit do with the submitted text?
- Is this for a chat interface or a one-shot prompt?
- Is a mic permission prompt acceptable in the UX flow?
`,
  },
}

function DemoBlock({ demo }: { demo: Demo }) {
  // Read at build time so "copy code" always matches the component on the page.
  const source = fs.readFileSync(path.join(/* turbopackIgnore: true */ process.cwd(), demo.file), 'utf8')
  return (
    <>
      <div className="rounded-[10px] border border-rule bg-frame p-4 desk:p-8">{demo.preview}</div>
      <div className="flex flex-wrap gap-2">
        <CopyButton label="Copy code" text={source} />
        <CopyButton label="Copy prompt" text={demo.prompt(source)} />
      </div>
    </>
  )
}

export function ComponentsPanel() {
  return (
    <PanelSection title={panelTitles.components}>
      <p className="m-0 text-pretty">{componentsIntro}</p>
      {components.length > 0 && (
        <ul className="m-0 flex list-none flex-col gap-10 p-0">
          {components.map((item) =>
            item.demo ? (
              <li key={item.name} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="m-0 text-base font-medium">{item.name}</h3>
                  <p className="m-0 text-[15px]/[1.5] text-pretty opacity-65">
                    <RichText text={item.description} />
                  </p>
                </div>
                <DemoBlock demo={demos[item.demo]} />
              </li>
            ) : (
              <li key={item.name}>
                {item.href ? (
                  <ListRowLink href={item.href}>
                    <ListRowContent title={item.name} note={<RichText text={item.description} />} />
                  </ListRowLink>
                ) : (
                  <div className={listRowClass}>
                    <ListRowContent title={item.name} note={<RichText text={item.description} />} />
                  </div>
                )}
              </li>
            ),
          )}
        </ul>
      )}
    </PanelSection>
  )
}
