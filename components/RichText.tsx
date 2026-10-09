import type { ReactNode } from 'react'

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

/** Renders a string with inline [text](url) links. External links open in a new tab. */
export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const external = /^https?:\/\//.test(href!)
    nodes.push(
      <a key={match.index} href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
        {label}
      </a>,
    )
    last = match.index + whole.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}
