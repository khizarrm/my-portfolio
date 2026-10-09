import type { Metadata } from 'next'
import Link from 'next/link'
import { CodeBlock } from '@/components/CodeBlock'
import { prompts } from '@/content/prompts'

export const metadata: Metadata = {
  title: 'Prompts',
  description: 'The prompts I use to code with AI.',
  alternates: { canonical: '/prompts' },
}

export default function PromptsPage() {
  return (
    <main className="mx-auto flex max-w-160 flex-col gap-6 px-5 py-12 text-[17px]/[1.7] desk:px-6 desk:py-20">
      <Link href="/writing/how-i-code-with-ai" className="self-start text-sm">
        Back to the essay
      </Link>
      <h1 className="m-0 text-[32px] font-bold tracking-[-0.01em]">Prompts</h1>
      <p className="m-0 text-pretty opacity-75">
        The commands I use with Cursor and Claude Code, explained in{' '}
        <Link href="/writing/how-i-code-with-ai">how i code with AI</Link>.
      </p>
      {prompts.map((prompt) => (
        <CodeBlock key={prompt.id} label={prompt.title} code={prompt.content} />
      ))}
    </main>
  )
}
