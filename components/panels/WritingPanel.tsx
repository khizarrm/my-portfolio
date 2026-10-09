'use client'

import { ArrowLeft } from 'lucide-react'
import type { MouseEvent } from 'react'
import { essays } from '@/content/writing'
import type { Essay as EssayData } from '@/content/types'
import { panelPath, panelTitles } from '@/lib/panels'
import { CodeBlock } from '../CodeBlock'
import { usePanel } from '../PanelProvider'
import { RichText } from '../RichText'
import { ListRowContent, ListRowLink } from './ListRow'
import { PanelSection } from './PanelSection'

export function WritingPanel() {
  const { view, openEssay } = usePanel()
  const essay = view?.essay ? essays.find((e) => e.slug === view.essay) : undefined

  if (essay) return <Essay essay={essay} />

  const onRowClick = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    openEssay(slug)
  }

  // The list and an essay each fade up as they mount, so switching between them eases in.
  return (
    <div className="panel-swap-in">
      <PanelSection title={panelTitles.writing}>
        <ul className="m-0 flex list-none flex-col p-0">
          {essays.map(({ slug, title }) => (
            <li key={slug}>
              <ListRowLink
                href={panelPath({ panel: 'writing', essay: slug })}
                onClick={(event) => onRowClick(event, slug)}
              >
                <ListRowContent title={title} />
              </ListRowLink>
            </li>
          ))}
        </ul>
      </PanelSection>
    </div>
  )
}

function Essay({ essay }: { essay: EssayData }) {
  const { backToList } = usePanel()

  return (
    <article className="panel-swap-in flex flex-col gap-4.5 text-[17px]/[1.7] desk:text-[16px]/[1.7]">
      <button
        type="button"
        onClick={backToList}
        aria-label="Back to writings"
        className="icon-button -m-2 self-start"
      >
        <ArrowLeft size={18} aria-hidden />
      </button>
      <header className="flex flex-col gap-1.5">
        <h2 data-panel-heading tabIndex={-1} className="m-0 text-2xl/[1.3] font-bold">
          {essay.title}
        </h2>
        {essay.subtitle && (
          <p className="m-0 text-pretty opacity-60">
            <RichText text={essay.subtitle} />
          </p>
        )}
      </header>
      {essay.body.map((block, i) =>
        typeof block === 'string' ? (
          <p key={i} className="m-0 text-pretty">
            <RichText text={block} />
          </p>
        ) : block.type === 'list' ? (
          <ul key={i} className="m-0 flex list-disc flex-col gap-1 pl-5">
            {block.items.map((item) => (
              <li key={item}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        ) : (
          <CodeBlock key={i} label={block.label} code={block.code} />
        ),
      )}
    </article>
  )
}
