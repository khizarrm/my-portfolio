// Fails if any source or content file contains an em dash. The site uses plain hyphens only.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const DIRS = ['app', 'components', 'content', 'lib']
const EXTENSIONS = /\.(tsx?|mdx?|css|json|txt)$/
const EM_DASH = '—'

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* walk(path)
    else if (EXTENSIONS.test(name)) yield path
  }
}

const hits = []
for (const dir of DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        if (line.includes(EM_DASH)) hits.push(`${relative(ROOT, file)}:${i + 1}`)
      })
  }
}

if (hits.length > 0) {
  console.error(`Found em dashes (use "-" instead):\n${hits.join('\n')}`)
  process.exit(1)
}
console.log('No em dashes found.')
