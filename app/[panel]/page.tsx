import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Site } from '@/components/Site'
import { isPanelKey, panelKeys, panelTitles } from '@/lib/panels'

// Each panel has its own URL so it can be linked and opens on load.
export const dynamicParams = false

export function generateStaticParams() {
  return panelKeys.map((panel) => ({ panel }))
}

export async function generateMetadata({ params }: PageProps<'/[panel]'>): Promise<Metadata> {
  const { panel } = await params
  if (!isPanelKey(panel)) return {}
  return {
    title: panelTitles[panel],
    alternates: { canonical: `/${panel}` },
    openGraph: { url: `/${panel}` },
  }
}

export default async function PanelPage({ params }: PageProps<'/[panel]'>) {
  const { panel } = await params
  if (!isPanelKey(panel)) notFound()
  return <Site />
}
