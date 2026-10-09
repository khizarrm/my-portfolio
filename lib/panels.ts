import { essays } from '@/content/writing'
import type { PanelKey } from '@/content/types'

export const panelTitles: Record<PanelKey, string> = {
  reading: 'Reading',
  writing: 'Writings',
  content: 'Content',
  work: "Things I've done",
  components: 'Components',
  wallpapers: 'Wallpapers',
}

export const panelKeys = Object.keys(panelTitles) as PanelKey[]

export function isPanelKey(value: string): value is PanelKey {
  return value in panelTitles
}

export type PanelRoute = { panel: PanelKey; essay: string | null }

/** URL scheme: `/` is closed, `/<panel>` opens a panel, `/writing/<slug>` opens an essay. */
export function parsePanelPath(pathname: string): PanelRoute | null {
  const [panel, essay, ...rest] = pathname.split('/').filter(Boolean)
  if (!panel || !isPanelKey(panel) || rest.length > 0) return null
  if (!essay) return { panel, essay: null }
  if (panel === 'writing' && essays.some((e) => e.slug === essay)) return { panel, essay }
  return null
}

export function panelPath({ panel, essay }: PanelRoute): string {
  return essay ? `/${panel}/${essay}` : `/${panel}`
}
