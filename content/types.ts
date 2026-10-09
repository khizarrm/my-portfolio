import type { StaticImageData } from 'next/image'

export type PanelKey = 'reading' | 'writing' | 'content' | 'work' | 'components' | 'wallpapers'

/** A run of intro text, a link that opens a side panel, or an external link (new tab unless mailto:). */
export type IntroSegment = string | { text: string; panel: PanelKey } | { text: string; href: string }

export type SocialLink = {
  label: 'LinkedIn' | 'X' | 'GitHub'
  href: string
}

export type SiteConfig = {
  name: string
  /** Production origin, used for canonical URLs and Open Graph. No trailing slash. */
  url: string
  description: string
  socials: SocialLink[]
  intro: IntroSegment[][]
}

export type ReadingEntry = {
  title: string
  /** Book cover, imported from /public/books. Shown as a placeholder frame until added. */
  cover?: StaticImageData
  /** Marks the book being read right now. */
  current?: boolean
  href?: string
}

/** A paragraph (inline links as [text](url)), a copyable code block, or a bulleted list. */
export type EssayBlock =
  string | { type: 'code'; label: string; code: string } | { type: 'list'; items: string[] }

export type Essay = {
  slug: string
  title: string
  description: string
  /** Optional line shown under the title when the essay is open. Inline links as [text](url). */
  subtitle?: string
  date?: string
  body: EssayBlock[]
}

export type Video = {
  ratio: '16:9' | '9:16'
  /** Not shown; read out by screen readers as the video's label. */
  description: string
  /** Self-hosted file under /public, rendered with <video>. */
  src?: string
  /** Short silent loop the grid tile plays instead of the full file (see README). */
  preview?: string
  poster?: string
  /** YouTube or Vimeo embed URL, rendered as a lazy iframe. */
  embedUrl?: string
}

/** A group of videos in the Content panel, introduced by a one-line title. */
export type VideoSection = {
  /** Inline links as [text](url). */
  title: string
  videos: Video[]
}

export type WorkEntry = {
  company: string
  role: string
  dates?: string
  /** Path under /public/logos. */
  logo?: string
  /** Company website; the company name links to it. */
  href?: string
  summary: string
  /** Optional self-hosted video shown under the description. */
  video?: Video
}

export type ComponentEntry = {
  name: string
  /** Inline links as [text](url). */
  description: string
  href?: string
  /** Live demo with copy code / copy prompt buttons; keys are registered in ComponentsPanel. */
  demo?: 'prompt-input-box' | 'hero-carousel'
}

export type Prompt = {
  id: string
  title: string
  content: string
}

export type Painting = {
  src: StaticImageData
  /** Short title, shown in the Wallpapers panel and used for the download file name. */
  name: string
  alt: string
}
