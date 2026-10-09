import Image from 'next/image'
import { reading, readingIntro } from '@/content/reading'
import type { ReadingEntry } from '@/content/types'
import { panelTitles } from '@/lib/panels'
import { PanelSection, PlaceholderLabel } from './PanelSection'

/** A grid of book covers, each with just its title underneath. */
export function ReadingPanel() {
  return (
    <PanelSection title={panelTitles.reading}>
      <p className="m-0 text-pretty">{readingIntro}</p>
      {reading.length > 0 && (
        <ul className="m-0 grid list-none grid-cols-3 gap-x-3 gap-y-5 p-0 desk:grid-cols-5">
          {reading.map((entry) => (
            <li key={entry.title} className="min-w-0">
              {entry.href ? (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 text-inherit no-underline"
                >
                  <Book entry={entry} />
                </a>
              ) : (
                <div className="flex flex-col gap-2">
                  <Book entry={entry} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </PanelSection>
  )
}

function Book({ entry }: { entry: ReadingEntry }) {
  return (
    <>
      <div className="relative flex aspect-[2/3] items-center justify-center overflow-hidden rounded-md border border-rule bg-frame">
        {entry.cover ? (
          <Image
            src={entry.cover}
            alt={`Cover of ${entry.title}`}
            fill
            placeholder="blur"
            sizes="(min-width: 900px) 10vw, 30vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderLabel className="text-xs">cover</PlaceholderLabel>
        )}
      </div>
      <span className="flex flex-col text-sm/[1.4] text-pretty">
        {entry.title}
        {entry.current && <span className="opacity-50">currently reading</span>}
      </span>
    </>
  )
}
