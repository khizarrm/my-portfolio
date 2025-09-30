import Link from 'next/link'

type EssayPageProps = {
  params: Promise<{
    slug: string
  }>
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
  },
  'changing-your-baseline': {
    title: 'Changing Your Baseline',
    date: 'September 2025',
    content: `
      When I first started creating my own coding projects like Passr, I blindly depended on AI. I remember making the whole app work fine until I got my first couple of users and it crashed. I spent more time debugging than I did actually prompting Claude to code it. This dependency made me content with having a surface level understanding of things, as it was enough for me to get by with at the time. I was happy with what I could build, whether it was perfect or not. I was proud I had a functioning application. That set my initial baseline of understanding, which was at a fairly high level. A persons baseline in any subject, in this context, refers to how deep of an understanding that person is willing to get of a subject. The lower the baseline, the deeper the understanding.

      I then had an internship at a company where I was creating the whole frontend for their LLM chat UI (User Interface). For those nontechnical, I was just implementing the design of the chat in the app. Using AI tools, I did it fairly quickly, and like before, found some issues which I had to later go on and fix. I did this for a while, until I realized my mind wasn’t being simulated at all during work. I had no idea what I was doing, just asking a bot to write code for me. Consulting a friend, I decided to completely stop using AI. I even switched to vim, which is a keyboard only text editor known to have quite a steep learning curve. This set my second baseline, which was significantly lower level than the previous one I had set for myself.

      Using vim was an excellent decision, it forced me to understand the code deeply. I remember creating a new component by writing each line of code myself since I didn’t know how to paste yet. While frustrating at first, I was then able to understand what each line of code does, where to locate issues, etc. I moved a lot faster than I had when I was completely dependent on AI. It was a satisfying feeling to deeply understand how something works. I later had to vibe code an app for another project, which I was able to do a lot better since I understood a lot more, but I didn’t feel truly satisfied since I used AI blindly for a lot of it. It also made me realize that AI coding isn’t that good. Or maybe I just hadn’t been using it right. Either way, since my baseline for understanding code was a lot lower, I knew I could do a lot better and wasn’t content with what I had, still having the drive to understand it even more.

      I find it quite extraordinary, by just consistency applying myself to something difficult for 2 weeks, my whole perspective and mindset on coding and learning itself changed. It’s quite simple to be good at something. You just need to grasp that feeling once, and thats enough. As soon as you realize how good something can be, just one time, it makes it hard to go back to being content with how things were. Not everything needs to be understood at a deep level. But for the things that I do want to understand, or the things I’m curious about, I’ll try to understand them a lot more deeply now.

      It’s fascinating how significant of an impact you can have on your life with just a small amount of hard work. It’s super linear, applying it in one area of knowledge makes you want to apply it to others. Ever since I shifted that baseline, I’ve been less interested in things like doomscrolling and feel a lot more simulated spending my time doing deep work, regardless of the subject.

      Peter Theil, founder of PayPal, once mentioned that excellent entrepreneurs are polymaths. A polymath is something who has expertise in a wide range of subjects. Mark Zuckenberg and Lex Fridman are some examples, both being excellent at not only tech but jujutsu as well. I think they might have started their journeys in the same way, having that feeling of success just once.

      So, in short, I think it’s important to keep your baseline in check. My dad once told me a quote - ‘Nothing Succeeds like success’. I think that’s very true, especially in this case. Changing your baseline is quite hard, takes some work. But you just need to do it once, and then the benefits are infinite. Superlinear.
    `
  }
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params
  const essay = essays[slug as keyof typeof essays]

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

      </div>
    </div>
  )
}