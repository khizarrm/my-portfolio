'use client'

import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { videoSections } from '@/content/videos'
import type { Video } from '@/content/types'
import { panelTitles } from '@/lib/panels'
import { useMediaQuery } from '@/lib/useMediaQuery'
import { RichText } from '../RichText'
import { useThumbnailViewer } from '../useThumbnailViewer'
import { VideoPlayer } from '../VideoPlayer'
import { PanelSection, PlaceholderLabel } from './PanelSection'

const aspectOf = (video: Video) => (video.ratio === '16:9' ? 16 / 9 : 9 / 16)

/**
 * Video grid. Tiles play silently on a loop; clicking one grows it out of its tile to almost full
 * screen and plays it from the start with sound.
 */
export function ContentPanel() {
  const { selected, show, hide, dialogProps, itemRef, controlsRef } = useThumbnailViewer<
    Video,
    HTMLDivElement
  >()

  return (
    <PanelSection title={panelTitles.content}>
      {videoSections.map((section) => (
        <section key={section.title} className="flex flex-col gap-2.5">
          <h3 className="m-0 font-normal text-pretty">
            <RichText text={section.title} />
          </h3>
          {/* 9:16 videos sit five to a row on desktop, two on mobile; 16:9 ones take the full row. */}
          <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 desk:grid-cols-5">
            {section.videos.map((video, i) => (
              <li
                key={video.src ?? video.embedUrl ?? i}
                className={video.ratio === '16:9' ? 'col-span-full' : ''}
              >
                <VideoTile video={video} onOpen={(thumb) => show(video, thumb)} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <dialog {...dialogProps} aria-label={selected?.description ?? 'Video'} className="media-viewer">
        {selected?.src && (
          <>
            <div
              ref={itemRef}
              className="media-viewer-item relative overflow-hidden bg-black"
              // A definite size from the known shape, so the grow can be measured before loading.
              style={{
                width: `min(94vw, 90dvh * ${aspectOf(selected)})`,
                aspectRatio: aspectOf(selected),
              }}
            >
              <VideoPlayer
                src={selected.src}
                poster={selected.poster}
                label={selected.description}
                autoPlay
              />
            </div>
            <div ref={controlsRef} className="absolute top-3 right-3 text-white">
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

function VideoTile({ video, onOpen }: { video: Video; onOpen: (thumb: HTMLElement) => void }) {
  const frame = `${video.ratio === '16:9' ? 'aspect-video' : 'aspect-[9/16]'} relative flex items-center justify-center overflow-hidden rounded-[10px] border border-rule bg-frame`

  if (video.src) {
    return (
      <button
        type="button"
        onClick={(event) => onOpen(event.currentTarget)}
        aria-label={`Play: ${video.description}`}
        className={`${frame} w-full cursor-pointer p-0`}
      >
        <PreviewLoop src={video.preview ?? video.src} poster={video.poster} />
      </button>
    )
  }

  return (
    <div className={frame}>
      {video.embedUrl ? (
        <iframe
          src={video.embedUrl}
          title={video.description}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <PlaceholderLabel className="text-xs">video {video.ratio}</PlaceholderLabel>
      )}
    </div>
  )
}

/**
 * Silent looping tile preview. It loads and plays only while it's on screen, so scrolled-away
 * tiles and a closed panel (which stays mounted at zero width) don't keep downloading or decoding.
 * With reduced motion it just shows the poster.
 */
function PreviewLoop({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    const video = videoRef.current
    if (!video || reducedMotion) return
    // Ratio, not isIntersecting: a zero-width clipped panel can still count as edge-adjacent.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.intersectionRatio > 0) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: [0, 0.1] },
    )
    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [reducedMotion])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className="absolute inset-0 size-full object-cover"
    />
  )
}
