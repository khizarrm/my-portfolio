import Link from 'next/link'

interface EssayPageProps {
  params: {
    slug: string
  }
}

const essays = {
  'the-privilege-of-failing': {
    title: 'The Privilege of Failing',
    date: 'December 2024',
    content: `
      There's a lot of privileges that a person has. This doesn't apply to everyone, but if you're reading this you probably have several privileges you don't think about. For example, access to wifi is a big one, you have an infinite amount of knowledge at your fingertips.

      It's quite hard to always remember our privileges. There's so many, but since we're usually around people who are the same as us, we don't realize it. At least that's the case for me. But to be happy and successful, I think, one must understand at least some of the privileges they have to utilize them fully.

      At this point in my life, at 21, The most important privilege that I have (besides basic living necessities/health) is the ability to fail.

      I've met quite few people who aren't aware of that privilege. And some of those who do become aware are unwilling to take risks because of the embarrassment and judgement that comes with. But how lucky are they to be able to fail with such little consequence.

      There's so many people who can't afford to do so. I've met several friends who can't afford to take the time to learn a new hobby because of other burdens. Or pressures from others to succeed in a certain field, one they might have no interest in. These people can't afford to fail in things of their choosing.

      Having the comfort of failing is one of the most critical things needed to succeed. Paul Graham says that to succeed, you must find what you love, which takes discipline and trying a bunch of different things. But to try a bunch of different things, you must be willing to fail. That's what makes the privilege such a gift. Therefore, I think, one should fail as often as they can.

      There's this one quote I remember hearing a while back: 'a smart man learns from his mistakes, but a wise man learns from those of others'. While this is true, people don't realize that to be wise, you must first be smart.
    `
  }
}

export default function EssayPage({ params }: EssayPageProps) {
  const essay = essays[params.slug as keyof typeof essays]

  if (!essay) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <Link href="/" className="underline-link text-body mb-8 inline-block">
            ← Back to Home
          </Link>
          <hr className="border-white mb-8" />
          <h1 className="text-large font-bold mb-8">Writing Not Found</h1>
          <p className="text-body">The writing you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header Section */}
        <header className="mb-16">
          <Link href="/essays" className="underline-link text-body mb-8 inline-block">
            ← Back to Writings
          </Link>
          <h1 className="text-large font-bold mb-4">{essay.title}</h1>
          <p className="text-body text-gray-500">{essay.date}</p>
        </header>

        {/* Divider */}
        <hr className="border-white mb-16" />
        
        {/* Article Content */}
        <article className="max-w-3xl">
          <div className="space-y-6">
            {essay.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-body leading-relaxed text-white">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </article>

        {/* Footer Navigation */}
        <footer className="mt-16 pt-8 border-t border-white">
          <Link href="/essays" className="underline-link text-body font-medium">
            ← View all writings
          </Link>
        </footer>
      </div>
    </div>
  )
}