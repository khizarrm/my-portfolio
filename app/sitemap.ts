import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { essays } from '@/content/writing'
import { panelKeys } from '@/lib/panels'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    ...panelKeys.map((p) => `/${p}`),
    ...essays.map((e) => `/writing/${e.slug}`),
    '/prompts',
  ]
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }))
}
