'use client'

import { useCallback, useSyncExternalStore } from 'react'

/** Subscribes to a media query. Returns false during server rendering. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Keep in sync with the `desk` breakpoint in app/globals.css. */
export const MOBILE_QUERY = '(width < 900px)'
