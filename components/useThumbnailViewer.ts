'use client'

import { type KeyboardEvent, type MouseEvent, useLayoutEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const BACKDROP = 'rgb(0 0 0 / 0.88)'
const CLEAR = 'rgb(0 0 0 / 0)'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The frame that lays the full-size item exactly over its thumbnail: scaled down to cover it,
 * cropped (clip-path, in the item's own pixels) to the thumbnail's window and corner radius.
 */
function overThumbnail(item: HTMLElement, thumb: HTMLElement): Keyframe {
  const t = thumb.getBoundingClientRect()
  const i = item.getBoundingClientRect()
  const scale = Math.max(t.width / i.width, t.height / i.height)
  const insetX = (i.width - t.width / scale) / 2
  const insetY = (i.height - t.height / scale) / 2
  const dx = t.left + t.width / 2 - (i.left + i.width / 2)
  const dy = t.top + t.height / 2 - (i.top + i.height / 2)
  return {
    transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
    clipPath: `inset(${insetY}px ${insetX}px round ${10 / scale}px)`,
  }
}

const fullSize: Keyframe = { transform: 'none', clipPath: 'inset(0px 0px round 12px)' }

/**
 * A modal viewer that grows an item out of the thumbnail that was clicked and shrinks it back
 * on close. Spread `dialogProps` on a <dialog className="media-viewer">, put `itemRef` on the
 * element that should grow (it needs a definite size before its media loads), and `controlsRef`
 * on any buttons that fade in after it.
 */
export function useThumbnailViewer<T, E extends HTMLElement = HTMLElement>() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const itemRef = useRef<E>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLElement | null>(null)
  const closing = useRef(false)
  const [selected, setSelected] = useState<T | null>(null)

  const show = (value: T, thumb: HTMLElement) => {
    thumbRef.current = thumb
    setSelected(value)
  }

  // Open once the item is in the DOM, and start the grow before the first paint.
  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const item = itemRef.current
    const thumb = thumbRef.current
    if (selected === null || !dialog || !item || !thumb) return
    if (!dialog.open) dialog.showModal()
    if (reducedMotion()) return
    item.animate([overThumbnail(item, thumb), fullSize], { duration: 450, easing: EASE })
    dialog.animate([{ backgroundColor: CLEAR }, { backgroundColor: BACKDROP }], { duration: 300 })
    controlsRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 300,
      delay: 200,
      fill: 'backwards',
    })
  }, [selected])

  const hide = () => {
    const dialog = dialogRef.current
    const item = itemRef.current
    const thumb = thumbRef.current
    if (!dialog?.open || closing.current) return
    if (!item || !thumb?.isConnected || reducedMotion()) return dialog.close()
    closing.current = true
    const options = { duration: 380, easing: EASE, fill: 'forwards' } as const
    controlsRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: 'forwards' })
    dialog.animate([{ backgroundColor: BACKDROP }, { backgroundColor: CLEAR }], options)
    void item.animate([fullSize, overThumbnail(item, thumb)], options).finished.then(() => dialog.close())
  }

  const dialogProps = {
    ref: dialogRef,
    // However the dialog closed, clear the held closing frames so the next open starts fresh.
    onClose: () => {
      closing.current = false
      dialogRef.current?.getAnimations().forEach((animation) => animation.cancel())
      setSelected(null)
    },
    // Clicks on the backdrop land on the dialog itself; clicks on the item or buttons don't.
    onClick: (event: MouseEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget) hide()
    },
    // Handle Escape here and mark it handled, so the side panel underneath doesn't close too.
    onKeyDown: (event: KeyboardEvent<HTMLDialogElement>) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      hide()
    },
  }

  return { selected, show, hide, dialogProps, itemRef, controlsRef }
}
