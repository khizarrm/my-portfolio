'use client'

import { usePathname } from 'next/navigation'
import { createContext, use, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { PanelKey } from '@/content/types'
import { panelPath, parsePanelPath, type PanelRoute } from '@/lib/panels'

type PanelContextValue = {
  /** The route that is open right now, or null while closed. */
  open: PanelRoute | null
  /** What the panel renders. Survives closing so the exit animation keeps its content. */
  view: PanelRoute | null
  openPanel: (panel: PanelKey, trigger?: HTMLElement | null) => void
  openEssay: (slug: string) => void
  backToList: () => void
  close: () => void
}

const PanelContext = createContext<PanelContextValue | null>(null)

export function usePanel() {
  const value = use(PanelContext)
  if (!value) throw new Error('usePanel must be used inside <PanelProvider>')
  return value
}

/**
 * Panel state lives in the URL, so every panel and essay is linkable and the browser
 * back button works. We move between URLs with history.pushState, which Next keeps in
 * sync with usePathname without a route transition or remount.
 *
 * Each entry we push records how many panel entries sit above the closed page
 * (`panelDepth`), so closing can rewind history instead of piling up entries.
 */
type HistoryState = { panelDepth?: number; essayPushed?: boolean } | null

function historyState(): HistoryState {
  return window.history.state as HistoryState
}

function push(url: string, state: HistoryState) {
  window.history.pushState(state, '', url)
}

function replace(url: string, state: HistoryState) {
  window.history.replaceState(state, '', url)
}

function sameRoute(a: PanelRoute | null, b: PanelRoute | null) {
  return a?.panel === b?.panel && a?.essay === b?.essay
}

export function PanelProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const open = useMemo(() => parsePanelPath(pathname), [pathname])

  // Keep the last open route while closing (adjusting state during render, not in an effect).
  const [view, setView] = useState(open)
  if (open && !sameRoute(open, view)) setView(open)

  const triggerRef = useRef<HTMLElement | null>(null)

  const openPanel = useCallback<PanelContextValue['openPanel']>(
    (panel, trigger) => {
      const url = panelPath({ panel, essay: null })
      if (open) {
        if (open.panel === panel && !open.essay) return
        replace(url, { panelDepth: historyState()?.panelDepth ?? 0 })
      } else {
        triggerRef.current = trigger ?? null
        push(url, { panelDepth: 1 })
      }
    },
    [open],
  )

  const openEssay = useCallback((slug: string) => {
    const depth = historyState()?.panelDepth ?? 0
    push(panelPath({ panel: 'writing', essay: slug }), { panelDepth: depth + 1, essayPushed: true })
  }, [])

  const backToList = useCallback(() => {
    const state = historyState()
    if (state?.essayPushed) window.history.back()
    else replace(panelPath({ panel: 'writing', essay: null }), { panelDepth: state?.panelDepth ?? 0 })
  }, [])

  const close = useCallback(() => {
    const depth = historyState()?.panelDepth ?? 0
    if (depth > 0) window.history.go(-depth)
    else replace('/', null)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  // Return focus to whatever opened the panel once it closes.
  const isOpen = open !== null
  const wasOpen = useRef(isOpen)
  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      const trigger = triggerRef.current
      triggerRef.current = null
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    }
    wasOpen.current = isOpen
  }, [isOpen])

  const value = useMemo(
    () => ({ open, view, openPanel, openEssay, backToList, close }),
    [open, view, openPanel, openEssay, backToList, close],
  )

  return <PanelContext value={value}>{children}</PanelContext>
}
