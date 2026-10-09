import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Site } from '@/components/Site'
import { essays } from '@/content/writing'

// Only essays have sub-pages: /writing/<slug>.
export const dynamicParams = false

export function generateStaticParams() {
  return essays.map(({ slug }) => ({ panel: 'writing', slug }))
}

function findEssay(panel: string, slug: string) {
  return panel === 'writing' ? essays.find((e) => e.slug === slug) : undefined
}

export async function generateMetadata({ params }: PageProps<'/[panel]/[slug]'>): Promise<Metadata> {
  const { panel, slug } = await params
  const essay = findEssay(panel, slug)
  if (!essay) return {}
  const url = `/writing/${essay.slug}`
  return {
    title: essay.title,
    description: essay.description,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title: essay.title, description: essay.description },
  }
}

export default async function EssayPage({ params }: PageProps<'/[panel]/[slug]'>) {
  const { panel, slug } = await params
  if (!findEssay(panel, slug)) notFound()
  return <Site />
}
