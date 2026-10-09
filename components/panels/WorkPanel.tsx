import Image from 'next/image'
import { work } from '@/content/work'
import { panelTitles } from '@/lib/panels'
import { VideoPlayer } from '../VideoPlayer'
import { PanelSection, PlaceholderLabel } from './PanelSection'

export function WorkPanel() {
  return (
    <PanelSection title={panelTitles.work}>
      <ul className="m-0 flex list-none flex-col p-0">
        {work.map((entry) => (
          <li
            key={`${entry.company}-${entry.role}`}
            className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 border-b border-rule py-5"
          >
            <div className="relative flex size-11 items-center justify-center">
              {entry.logo ? (
                <Image src={entry.logo} alt="" fill sizes="44px" className="object-contain" />
              ) : (
                <PlaceholderLabel className="text-[10px]">logo</PlaceholderLabel>
              )}
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="m-0 text-base font-medium">
                  {entry.href ? (
                    <a href={entry.href} target="_blank" rel="noopener noreferrer">
                      {entry.company}
                    </a>
                  ) : (
                    entry.company
                  )}{' '}
                  <span className="opacity-50">-</span>{' '}
                  <span className="font-normal opacity-75">{entry.role}</span>
                </h3>
                {entry.dates && <span className="text-[13px] opacity-50">{entry.dates}</span>}
              </div>
              <p className="m-0 text-[15px]/[1.5] text-pretty">{entry.summary}</p>
              {entry.video?.src && (
                <div
                  className={`${entry.video.ratio === '16:9' ? 'aspect-video' : 'aspect-[9/16] max-w-60'} relative mt-2 overflow-hidden rounded-[10px] border border-rule bg-frame`}
                >
                  <VideoPlayer
                    src={entry.video.src}
                    poster={entry.video.poster}
                    label={entry.video.description}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </PanelSection>
  )
}
