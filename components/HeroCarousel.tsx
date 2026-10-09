'use client'

import Image, { getImageProps, type StaticImageData } from 'next/image'
import { type CSSProperties, type MouseEvent, useEffect, useState } from 'react'
import { preload } from 'react-dom'
import type { Painting } from '@/content/types'
import { usePanel } from './PanelProvider'

export type Portrait = {
  src: StaticImageData
  alt: string
  /** Multiplies the default (unexpanded) width, for photos that read better a bit bigger. */
  scale?: number
}

// Where each new painting slides in from, in turn: right, left, bottom, top.
const ENTRANCES = ['100% 0', '-100% 0', '0 100%', '0 -100%']

// How long each painting stays before the next one slides in.
const AUTO_ADVANCE_MS = 3000

// How long an enlarged portrait stays open before it shrinks back on its own.
const AUTO_SHRINK_MS = 5000

// The portrait moves through these spots in turn.
const CORNERS = ['bottom-left', 'top-left', 'top-right'] as const

// Image settings, shared by the rendered images and their warm-up preloads so both resolve to
// the same file. Portraits use a small file normally and a sharp one only while enlarged.
const PAINTING = { quality: 90, sizes: '(min-width: 688px) 640px, calc(100vw - 40px)' }
const PORTRAIT = { quality: 90, sizes: '(min-width: 688px) 192px, 30vw' }
const PORTRAIT_BIG = { quality: 90, sizes: '(min-width: 688px) 480px, 75vw' }

/** Fetches an image ahead of time at low priority, as exactly the candidate next/image will pick. */
function warmUp(src: StaticImageData, settings: { quality: number; sizes: string }) {
  const { props } = getImageProps({ src, alt: '', fill: true, ...settings })
  preload(props.src, {
    as: 'image',
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
    fetchPriority: 'low',
  })
}

type CarouselState = { index: number; previous: number; turns: number }

const advance = (state: CarouselState, count: number): CarouselState => ({
  index: (state.index + 1) % count,
  previous: state.index,
  turns: state.turns + 1,
})

/**
 * Hero carousel. Clicking anywhere on the hero slides the next painting in over the current one.
 * The portrait fades out of its corner and the next one bounces in at the next corner. Clicking
 * the portrait grows it from its corner to the hero's full height; clicking it or the background
 * again shrinks it.
 */
export function HeroCarousel({ paintings, portraits }: { paintings: Painting[]; portraits: Portrait[] }) {
  const [{ index, previous, turns }, setState] = useState({ index: 0, previous: -1, turns: 0 })
  const [expanded, setExpanded] = useState(false)

  // Advance on a timer. Restarting it on every turn means a manual click gets a full 3s too. It
  // waits while a portrait is enlarged, and is off for reduced motion.
  useEffect(() => {
    if (expanded || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => {
      setState((state) => advance(state, paintings.length))
    }, AUTO_ADVANCE_MS)
    return () => window.clearTimeout(timer)
  }, [turns, expanded, paintings.length])

  // Only the visible painting and portrait are mounted, so fetch the next ones before they're needed.
  useEffect(() => {
    warmUp(paintings[(index + 1) % paintings.length]!.src, PAINTING)
    warmUp(portraits[(turns + 1) % portraits.length]!.src, PORTRAIT)
  }, [index, turns, paintings, portraits])

  // An enlarged portrait shrinks back after 5s, which also lets the carousel carry on.
  useEffect(() => {
    if (!expanded) return
    const timer = window.setTimeout(() => setExpanded(false), AUTO_SHRINK_MS)
    return () => window.clearTimeout(timer)
  }, [expanded])

  // While a portrait is enlarged, a click on the background only shrinks it back.
  // A click also opens the Wallpapers panel, where every painting can be downloaded.
  const { openPanel } = usePanel()
  const onBackgroundClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (expanded) return setExpanded(false)
    next()
    openPanel('wallpapers', event.currentTarget)
  }

  const next = () => {
    setExpanded(false)
    setState((state) => advance(state, paintings.length))
  }

  return (
    <>
      {/* Own stacking context, so the active painting's z-index stays below the portrait and icons. */}
      <div className="absolute inset-0 isolate">
        {/* Only the active painting and the one it slides over are mounted. */}
        {paintings.map((painting, i) => {
          const active = i === index
          if (!active && i !== previous) return null
          const sliding = active && turns > 0
          return (
            <Image
              key={painting.src.src}
              src={painting.src}
              alt={painting.alt}
              aria-hidden={!active}
              fill
              preload={i === 0}
              placeholder="blur"
              {...PAINTING}
              className={`object-cover ${active ? 'z-1' : ''} ${sliding ? 'hero-slide-in' : ''}`}
              style={
                sliding
                  ? ({ '--hero-from': ENTRANCES[(turns - 1) % ENTRANCES.length] } as CSSProperties)
                  : undefined
              }
            />
          )
        })}
      </div>
      <button
        type="button"
        onClick={onBackgroundClick}
        aria-label={expanded ? 'Shrink photo' : 'Show next painting'}
        className="absolute inset-0 cursor-pointer border-0 bg-transparent p-0 focus-visible:-outline-offset-4"
      />
      {CORNERS.map((corner, slot) => {
        // The last turn this slot was used. A slot keeps that portrait, so it can fade out without
        // changing. All slots stay mounted (hidden ones at opacity 0); none pops in on load. A slot
        // that hasn't been used yet holds no image.
        const lastTurn = turns - ((((turns - slot) % CORNERS.length) + CORNERS.length) % CORNERS.length)
        const shown = lastTurn === turns
        const current = lastTurn >= 0 ? portraits[lastTurn % portraits.length]! : undefined
        const { width, height } = (current ?? portraits[0]!).src
        const scale = current?.scale ?? 1
        const big = shown && expanded
        return (
          <button
            key={corner}
            type="button"
            onClick={() => setExpanded((value) => !value)}
            disabled={!shown}
            tabIndex={shown ? undefined : -1}
            aria-label={big ? 'Shrink photo' : 'Enlarge photo'}
            aria-pressed={big}
            className="hero-portrait"
            data-corner={corner}
            data-shown={shown || undefined}
            data-pop={(shown && turns > 0) || undefined}
            data-expanded={big || undefined}
            style={
              {
                aspectRatio: `${width} / ${height}`,
                '--aspect': width / height,
                '--portrait-scale': scale,
              } as CSSProperties
            }
          >
            {current && (
              <Image
                key={current.src.src}
                src={current.src}
                alt={current.alt}
                aria-hidden={!shown}
                fill
                loading="eager"
                placeholder="blur"
                // The browser keeps the small file on screen until the sharp one has loaded.
                {...(big ? PORTRAIT_BIG : PORTRAIT)}
                className="object-cover"
              />
            )}
          </button>
        )
      })}
    </>
  )
}
