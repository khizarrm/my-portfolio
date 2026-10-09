'use client'

import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import type { PanelKey } from '@/content/types'
import { panelTitles } from '@/lib/panels'
import { usePanel } from './PanelProvider'

export function SidePanel({ panels }: { panels: Record<PanelKey, ReactNode> }) {
  const { open, view, close } = usePanel()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const isOpen = open !== null

  // On every panel or essay change: start at the top and move focus to the new heading.
  // Skipped on first render so a deep link doesn't steal focus on page load.
  const hasMounted = useRef(false)
  const openKey = open ? `${open.panel}/${open.essay ?? ''}` : null
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    const scroller = scrollerRef.current
    if (!openKey || !scroller) return
    scroller.scrollTop = 0
    // preventScroll: the aside clips its content mid-animation and would otherwise scroll sideways.
    scroller.querySelector<HTMLElement>('[data-panel-heading]')?.focus({ preventScroll: true })
  }, [openKey])

  return (
    <aside
      className="side-panel"
      aria-label={view ? panelTitles[view.panel] : 'Side panel'}
      data-open={isOpen || undefined}
      inert={!isOpen}
    >
      <button type="button" className="side-panel-close icon-button" aria-label="Close panel" onClick={close}>
        <X size={18} aria-hidden />
      </button>
      <div ref={scrollerRef} className="side-panel-scroller">
        {view && panels[view.panel]}
      </div>
    </aside>
  )
}
