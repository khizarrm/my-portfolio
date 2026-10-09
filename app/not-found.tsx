import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-5 text-center">
      <h1 className="m-0 text-[32px] font-bold tracking-[-0.01em]">Page not found</h1>
      <Link href="/">Back home</Link>
    </main>
  )
}
