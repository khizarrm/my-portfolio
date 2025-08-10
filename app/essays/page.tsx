import Link from 'next/link'

const essays = [
  {
    slug: 'the-privilege-of-failing',
    title: 'The Privilege of Failing',
    excerpt: 'Having the comfort of failing is one of the most critical things needed to succeed. Paul Graham says that to succeed, you must find what you love, which takes discipline and trying a bunch of different things.',
    date: 'December 2024'
  }
]

export default function EssaysPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header Section */}
        <header className="mb-16">
          <Link href="/" className="underline-link text-body mb-8 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-large font-bold mb-4">Writings</h1>
          <p className="text-body text-gray-400">Thoughts on technology, life, and everything in between.</p>
        </header>

        {/* Divider */}
        <hr className="border-white mb-16" />
        
        {/* Essays List */}
        <section>
          <div className="space-y-8">
            {essays.map((essay) => (
              <article key={essay.slug} className="border-b border-white pb-8 last:border-b-0">
                <Link href={`/essays/${essay.slug}`} className="block group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <h2 className="text-medium font-bold group-hover:text-gray-300 transition-colors">
                      {essay.title}
                    </h2>
                    <span className="text-body text-gray-500 mt-2 md:mt-0 md:ml-4">
                      {essay.date}
                    </span>
                  </div>
                  <p className="text-body text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {essay.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}