import Link from 'next/link'

const essays = [
  {
    slug: 'the-privilege-of-failing',
    title: 'The Privilege of Failing'
  }
]

export default function EssaysPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <Link href="/" className="underline-link text-body mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="text-large font-bold mb-12">Writings</h1>
        
        <div className="space-y-6">
          {essays.map((essay, index) => (
            <div key={essay.slug}>
              <Link href={`/essays/${essay.slug}`} className="text-body font-medium hover:text-gray-300 transition-colors">
                {essay.title}
              </Link>
              <hr className="border-white mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}