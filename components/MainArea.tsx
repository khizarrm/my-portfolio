'use client'

import type { MouseEvent, ReactNode } from 'react'
import { MOBILE_QUERY, useMediaQuery } from '@/lib/useMediaQuery'
import { usePanel } from './PanelProvider'

/** True when the panel covers the whole screen, so content behind it must be inert. */
function useCoveredByPanel() {
  const { open } = usePanel()
  const isMobile = useMediaQuery(MOBILE_QUERY)
  return open !== null && isMobile
}

export function MainArea({ children }: { children: ReactNode }) {
  const { open, close } = usePanel()
  const covered = useCoveredByPanel()

  // Clicking anywhere in main closes the panel, except on links and buttons, which do their own thing.
  const onClick = (event: MouseEvent<HTMLElement>) => {
    if (!open) return
    if ((event.target as Element).closest('a, button, video, iframe')) return
    close()
  }

  return (
    // Keyboard users close with Escape (handled in PanelProvider), so no key handler here.
    <main
      onClick={onClick}
      inert={covered}
      className="flex min-w-0 flex-auto items-center justify-center px-5 py-12 desk:[container-type:size] desk:h-dvh desk:[scrollbar-width:none] desk:items-center-safe desk:overflow-y-auto desk:p-0 desk:[&::-webkit-scrollbar]:hidden"
    >
      <div className="home-column flex max-w-160 min-w-0 flex-[1_1_640px] flex-col gap-8 desk:flex-none desk:gap-(--home-gap)">
        {children}
      </div>
    </main>
  )
}
