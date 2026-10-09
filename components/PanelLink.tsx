'use client'

import type { MouseEvent, ReactNode } from 'react'
import type { PanelKey } from '@/content/types'
import { panelPath } from '@/lib/panels'
import { usePanel } from './PanelProvider'

/** Opens a side panel in place. A real link underneath, so it works without JS and in new tabs. */
export function PanelLink({ panel, children }: { panel: PanelKey; children: ReactNode }) {
  const { openPanel } = usePanel()

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    event.stopPropagation()
    openPanel(panel, event.currentTarget)
  }

  return (
    <a href={panelPath({ panel, essay: null })} onClick={onClick} className="panel-link">
      {children}
    </a>
  )
}
