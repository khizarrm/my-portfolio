'use client'

/**
 * A status indicator for an AI agent: one shape that changes what it is doing.
 *
 * A spinner says "wait" and nothing else. An agent's wait has stages, and showing
 * which one is happening makes a long wait feel like progress. Each phase has its
 * own motion, so the change reads without a label:
 *
 *   intake    one wobbling square: taking the request in, nothing produced yet
 *   working   three orbs in a row, swaying into each other: output underway
 *   settling  the orbs slow into an orbit and pulse in turn: consolidating
 *   sighting  a fast shuttle between two endpoints: re-verifying before answering
 *
 * The same three orbs draw every phase. Changing `phase` does not remount anything;
 * each frame blends the old phase's live motion into the new one's over
 * `transitionMs`, and an SVG goo filter fuses the orbs wherever they overlap.
 * Every phase has roughly the same footprint (~3.6 x `size` wide), so a phase
 * change never shifts layout.
 *
 * Defaults to white, intended for a dark or brand-coloured surface. Pass `color`
 * for anything else; `currentColor` inherits from the text colour. No dependencies
 * beyond React. Honours `prefers-reduced-motion` by slowing to a quarter speed
 * rather than stopping, since a frozen loader reads as broken.
 */

import * as React from 'react'

export type LoaderPhase = 'intake' | 'working' | 'settling' | 'sighting'

export interface ChatLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** What the agent is doing. Change it freely; the shape morphs between phases. */
  phase?: LoaderPhase
  /** Base orb diameter in px. The whole loader scales from this (box is 4.4 x 4.2 size). */
  size?: number
  /** Fill colour. Any CSS colour, including `currentColor`. */
  color?: string
  /** Animation speed multiplier */
  speed?: number
  /** Morph duration between phases, ms */
  transitionMs?: number
}

type OrbState = {
  x: number
  y: number
  w: number
  r: number
  rot: number
  sc: number
  sx: number
  sy: number
}

const TAU = Math.PI * 2

const LABELS: Record<LoaderPhase, string> = {
  intake: 'Reading your request',
  working: 'Working',
  settling: 'Settling',
  sighting: 'Verifying',
}

const lerp = (a: number, b: number, k: number) => a + (b - a) * k
const easeInOutCubic = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2)

function getState(phase: LoaderPhase, t: number, i: number, s: number): OrbState {
  switch (phase) {
    // Squircle that stays square but wobbles: lumps nudge slightly apart so
    // edges bulge and the shape drifts and tilts a little, no full rotation
    case 'intake': {
      const p = i * 2.1 // phase offset per lump
      const R = s * 0.12
      return {
        x: R * (0.6 * Math.sin(t * 1.7 + p) + 0.4 * Math.sin(t * 2.9 + p * 1.7)),
        y: R * (0.6 * Math.cos(t * 1.3 + p * 1.3) + 0.4 * Math.sin(t * 2.3 + p)),
        w: s * 2.4,
        r: 26 + 4 * Math.sin(t * 2.1 + p),
        rot: 7 * Math.sin(t * 1.5) + 3 * Math.sin(t * 2.7 + p),
        sc: 1,
        sx: 1 + 0.05 * Math.sin(t * 2.4 + p),
        sy: 1 + 0.05 * Math.cos(t * 2.0 + p * 1.4),
      }
    }

    // Row of orbs that stretch into each other as they sway
    case 'working': {
      const ph = TAU * ((t - i * 0.2) / 1.5)
      return {
        x: (i - 1) * s * 1.02 + s * 0.27 * Math.sin(ph),
        y: 0,
        w: s * 0.85,
        r: 50,
        rot: 0,
        sc: 1 + 0.15 * Math.abs(Math.sin(ph)),
        sx: 1,
        sy: 1,
      }
    }

    // Slow orbit with a sequential pulse
    case 'settling': {
      const a = t * 1.1 + (i * TAU) / 3
      const R = s * 1.3
      return {
        x: Math.cos(a) * R,
        y: Math.sin(a) * R,
        w: s * 0.85,
        r: 50,
        rot: 0,
        sc: 1 + 0.14 * Math.max(0, Math.sin(t * 2.6 - i * 2.1)),
        sx: 1,
        sy: 1,
      }
    }

    // Fast shuttle: middle orb zips between two endpoints, which pulse on contact
    case 'sighting': {
      const P = 0.8
      const D = s * 1.25
      const shuttleX = -D * Math.cos((TAU * t) / P)
      const v = Math.abs(Math.sin((TAU * t) / P))
      if (i === 1) {
        return { x: shuttleX, y: 0, w: s * 0.75, r: 50, rot: 0, sc: 1, sx: 1 + 0.4 * v, sy: 1 - 0.15 * v }
      }
      const ex = i === 0 ? -D : D
      const hit = Math.max(0, 1 - Math.abs(shuttleX - ex) / s)
      return { x: ex, y: 0, w: s * 0.9, r: 50, rot: 0, sc: 1 + 0.22 * hit, sx: 1, sy: 1 }
    }
  }
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )
}

export function ChatLoader({
  phase = 'working',
  size = 20,
  color = '#FFFFFF',
  speed = 1,
  transitionMs = 700,
  className,
  style,
  ...props
}: ChatLoaderProps) {
  const uid = React.useId().replace(/:/g, '')
  const filterId = `gooey-${uid}`
  const orbRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const reduced = usePrefersReducedMotion()

  const from = React.useRef<LoaderPhase>(phase)
  const to = React.useRef<LoaderPhase>(phase)
  const changedAt = React.useRef<number | null>(null)

  // Keep latest tunables readable inside the rAF loop without restarting it
  const opts = React.useRef({ size, speed, transitionMs, reduced })
  React.useLayoutEffect(() => {
    opts.current = { size, speed, transitionMs, reduced }
  })

  React.useEffect(() => {
    if (phase === to.current) return
    from.current = to.current
    to.current = phase
    changedAt.current = null // stamped on next frame
  }, [phase])

  React.useEffect(() => {
    let raf = 0
    const frame = (time: number) => {
      const { size: s, speed: sp, transitionMs: tm, reduced: rm } = opts.current
      if (changedAt.current === null) changedAt.current = time
      const t = (time / 1000) * sp * (rm ? 0.25 : 1)
      const k = easeInOutCubic(Math.min(1, (time - changedAt.current) / tm))

      orbRefs.current.forEach((el, i) => {
        if (!el) return
        const a = getState(from.current, t, i, s)
        const b = getState(to.current, t, i, s)
        const w = lerp(a.w, b.w, k)
        const sc = lerp(a.sc, b.sc, k)
        el.style.width = `${w}px`
        el.style.height = `${w}px`
        el.style.borderRadius = `${lerp(a.r, b.r, k)}%`
        el.style.transform =
          `translate(-50%, -50%) translate(${lerp(a.x, b.x, k)}px, ${lerp(a.y, b.y, k)}px) ` +
          `rotate(${lerp(a.rot, b.rot, k)}deg) ` +
          `scale(${sc * lerp(a.sx, b.sx, k)}, ${sc * lerp(a.sy, b.sy, k)})`
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      role="status"
      aria-label={LABELS[phase]}
      className={['relative inline-block', className].filter(Boolean).join(' ')}
      style={{ position: 'relative', width: size * 4.4, height: size * 4.2, ...style }}
      {...props}
    >
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation={size * 0.175} result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
          </filter>
        </defs>
      </svg>
      <div style={{ position: 'absolute', inset: 0, filter: `url(#${filterId})` }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => {
              orbRefs.current[i] = el
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              backgroundColor: color,
              willChange: 'transform',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatLoader
