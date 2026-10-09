'use client'

/* eslint-disable @next/next/no-img-element -- plain <img> keeps this copyable outside Next.js. */

import { useEffect, useState, type CSSProperties } from 'react'

export type HeroImage = { src: string; alt: string }

// Where each new background slides in from, in turn: right, left, bottom, top.
const ENTRANCES = ['100% 0', '-100% 0', '0 100%', '0 -100%']
// The portrait moves through these corners in turn.
const CORNERS = ['bottom-left', 'top-left', 'top-right'] as const
const AUTO_ADVANCE_MS = 3000
const AUTO_SHRINK_MS = 5000
// Portrait width / height. All portraits are cropped to this shape.
const PORTRAIT_ASPECT = 4 / 5

const css = `
.hc-root { position: relative; aspect-ratio: 16 / 9; width: 100%; overflow: hidden; border-radius: 12px; contain: layout paint; }
.hc-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hc-bg[data-active] { z-index: 1; }
.hc-bg[data-sliding] { animation: hc-slide-in 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.hc-next { position: absolute; inset: 0; z-index: 2; padding: 0; border: 0; background: none; cursor: pointer; }
.hc-portrait {
  --inset: 10px;
  position: absolute; z-index: 3; bottom: var(--inset); left: var(--inset);
  width: 20%; aspect-ratio: ${PORTRAIT_ASPECT}; padding: 0; border: 0; overflow: hidden; border-radius: 8px;
  background: none; cursor: pointer; opacity: 0; pointer-events: none; scale: 0.9;
  transition: opacity 0.2s ease-in, scale 0.2s ease-in, width 0.2s ease-in;
}
.hc-portrait[data-corner^='top'] { top: var(--inset); bottom: auto; }
.hc-portrait[data-corner$='right'] { right: var(--inset); left: auto; }
.hc-portrait[data-shown] {
  opacity: 1; scale: 1; pointer-events: auto;
  transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.hc-portrait[data-expanded] { width: min(100% - 2 * var(--inset), (56.25% - 2 * var(--inset)) * ${PORTRAIT_ASPECT}); }
.hc-portrait[data-pop] { animation: hc-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both; }
.hc-portrait img { display: block; width: 100%; height: 100%; object-fit: cover; }
@keyframes hc-slide-in { from { translate: var(--hc-from); } }
@keyframes hc-pop { from { opacity: 0; scale: 0.6; } }
@media (prefers-reduced-motion: reduce) {
  .hc-bg, .hc-portrait { animation: none !important; transition: none !important; }
}
`

type State = { index: number; previous: number; turns: number }

const advance = (state: State, count: number): State => ({
  index: (state.index + 1) % count,
  previous: state.index,
  turns: state.turns + 1,
})

/** Starts downloading an image so it's ready before it's shown. */
const warmUp = (src: string) => {
  const img = new Image()
  img.src = src
}

/**
 * Hero carousel: a background slides in over the last one every 3s (or on click), while a small
 * portrait pops into the next corner. Clicking the portrait grows it to the hero's full height.
 */
export function HeroCarousel({
  backgrounds,
  portraits,
  className = '',
}: {
  backgrounds: HeroImage[]
  portraits: HeroImage[]
  className?: string
}) {
  const [{ index, previous, turns }, setState] = useState<State>({ index: 0, previous: -1, turns: 0 })
  const [expanded, setExpanded] = useState(false)

  // Restarting the timer on every turn gives a manual click a full 3s too. Paused while a
  // portrait is enlarged, and off for reduced motion.
  useEffect(() => {
    if (expanded || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(
      () => setState((state) => advance(state, backgrounds.length)),
      AUTO_ADVANCE_MS,
    )
    return () => window.clearTimeout(timer)
  }, [turns, expanded, backgrounds.length])

  useEffect(() => {
    warmUp(backgrounds[(index + 1) % backgrounds.length]!.src)
    warmUp(portraits[(turns + 1) % portraits.length]!.src)
  }, [index, turns, backgrounds, portraits])

  useEffect(() => {
    if (!expanded) return
    const timer = window.setTimeout(() => setExpanded(false), AUTO_SHRINK_MS)
    return () => window.clearTimeout(timer)
  }, [expanded])

  const onBackgroundClick = () => {
    if (expanded) return setExpanded(false)
    setState((state) => advance(state, backgrounds.length))
  }

  return (
    <div className={`hc-root ${className}`}>
      <style href="hero-carousel" precedence="default">
        {css}
      </style>
      {/* Only the active background and the one it slides over are mounted. */}
      {backgrounds.map((bg, i) => {
        const active = i === index
        if (!active && i !== previous) return null
        const sliding = active && turns > 0
        return (
          <img
            key={bg.src}
            src={bg.src}
            alt={bg.alt}
            aria-hidden={!active}
            className="hc-bg"
            data-active={active || undefined}
            data-sliding={sliding || undefined}
            style={
              sliding
                ? ({ '--hc-from': ENTRANCES[(turns - 1) % ENTRANCES.length] } as CSSProperties)
                : undefined
            }
          />
        )
      })}
      <button
        type="button"
        onClick={onBackgroundClick}
        aria-label={expanded ? 'Shrink photo' : 'Show next image'}
        className="hc-next"
      />
      {CORNERS.map((corner, slot) => {
        // The last turn this corner was used. A corner keeps its portrait so it can fade out
        // unchanged; one that hasn't been used yet holds no image.
        const lastTurn = turns - ((((turns - slot) % CORNERS.length) + CORNERS.length) % CORNERS.length)
        const shown = lastTurn === turns
        const current = lastTurn >= 0 ? portraits[lastTurn % portraits.length] : undefined
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
            className="hc-portrait"
            data-corner={corner}
            data-shown={shown || undefined}
            data-pop={(shown && turns > 0) || undefined}
            data-expanded={big || undefined}
          >
            {current && <img key={current.src} src={current.src} alt={current.alt} aria-hidden={!shown} />}
          </button>
        )
      })}
    </div>
  )
}
