'use client'

import { Download, X } from 'lucide-react'
import Image from 'next/image'
import { paintings } from '@/content/paintings'
import type { Painting } from '@/content/types'
import { panelTitles } from '@/lib/panels'
import { useThumbnailViewer } from '../useThumbnailViewer'
import { PanelSection } from './PanelSection'

const fileName = (name: string) => `khizar-malik-${name.toLowerCase().replaceAll(' ', '-')}.jpg`

/** Links to the full-size file; the static import's URL is the original, not a resized copy. */
function DownloadLink({ painting, className }: { painting: Painting; className?: string }) {
  return (
    <a
      href={painting.src.src}
      download={fileName(painting.name)}
      aria-label={`Download ${painting.name}`}
      className={`icon-button shrink-0 ${className ?? ''}`}
    >
      <Download size={16} aria-hidden />
    </a>
  )
}

/**
 * Every hero painting, each downloadable. Clicking one grows it out of its thumbnail to almost
 * full screen; closing shrinks it back into the thumbnail.
 */
export function WallpapersPanel() {
  const { selected, show, hide, dialogProps, itemRef, controlsRef } = useThumbnailViewer<
    Painting,
    HTMLImageElement
  >()

  return (
    <PanelSection title={panelTitles.wallpapers}>
      <p className="m-0 text-pretty">
        The paintings from the top of the page. Free to download and use as wallpapers.
      </p>
      <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-5 p-0">
        {paintings.map((painting) => (
          <li key={painting.src.src} className="flex min-w-0 flex-col gap-2">
            <button
              type="button"
              onClick={(event) => show(painting, event.currentTarget)}
              aria-label={`View ${painting.name}`}
              className="relative aspect-video cursor-pointer overflow-hidden rounded-[10px] border border-rule bg-frame p-0"
            >
              <Image
                src={painting.src}
                alt={painting.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 900px) 25vw, 50vw"
                className="object-cover"
              />
            </button>
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="truncate opacity-75">{painting.name}</span>
              <DownloadLink painting={painting} className="-m-2" />
            </div>
          </li>
        ))}
      </ul>

      <dialog {...dialogProps} aria-label={selected?.name ?? 'Wallpaper'} className="media-viewer">
        {selected && (
          <>
            <Image
              ref={itemRef}
              src={selected.src}
              alt={selected.alt}
              placeholder="blur"
              quality={90}
              sizes="94vw"
              className="media-viewer-item"
              // A definite size from the known shape, so the open animation can measure the image
              // before the file has loaded (an auto-sized image is 0x0 until then).
              style={{ width: `min(94vw, 90dvh * ${selected.src.width / selected.src.height})` }}
            />
            <div ref={controlsRef} className="absolute top-3 right-3 flex gap-1 text-white">
              <DownloadLink painting={selected} />
              <button type="button" onClick={hide} aria-label="Close" className="icon-button">
                <X size={18} aria-hidden />
              </button>
            </div>
          </>
        )}
      </dialog>
    </PanelSection>
  )
}
