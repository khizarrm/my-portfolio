import Link from 'next/link'

type EssayPageProps = {
  params: Promise<{
    slug: string
  }>
}

const essays = {
  'the-privilege-of-failing': {
    title: 'the privilege of failing',
    date: 'december 2024',
    content: `
      there's a lot of privileges that a person has. this doesn't apply to everyone, but if you're reading this you probably have several privileges you don't think about. for example, access to wifi is a big one, you have an infinite amount of knowledge at your fingertips.

      it's quite hard to always remember our privileges. there's so many, but since we're usually around people who are the same as us, we don't realize it. at least that's the case for me. but to be happy and successful, i think, one must understand at least some of the privileges they have to utilize them fully.

      at this point in my life, at 21, the most important privilege that i have (besides basic living necessities/health) is the ability to fail.

      i've met quite few people who aren't aware of that privilege. and some of those who do become aware are unwilling to take risks because of the embarrassment and judgement that comes with. but how lucky are they to be able to fail with such little consequence.

      there's so many people who can't afford to do so. i've met several friends who can't afford to take the time to learn a new hobby because of other burdens. or pressures from others to succeed in a certain field, one they might have no interest in. these people can't afford to fail in things of their choosing.

      having the comfort of failing is one of the most critical things needed to succeed. paul graham says that to succeed, you must find what you love, which takes discipline and trying a bunch of different things. but to try a bunch of different things, you must be willing to fail. that's what makes the privilege such a gift. therefore, i think, one should fail as often as they can.

      there's this one quote i remember hearing a while back: 'a smart man learns from his mistakes, but a wise man learns from those of others'. while this is true, people don't realize that to be wise, you must first be smart.
    `
  },
  'changing-your-baseline': {
    title: 'changing your baseline',
    date: 'september 2025',
    content: `
      when i first started creating my own coding projects like passr, i blindly depended on ai. i remember making the whole app work fine until i got my first couple of users and it crashed. i spent more time debugging than i did actually prompting claude to code it. this dependency made me content with having a surface level understanding of things, as it was enough for me to get by with at the time. i was happy with what i could build, whether it was perfect or not. i was proud i had a functioning application. that set my initial baseline of understanding, which was at a fairly high level. a persons baseline in any subject, in this context, refers to how deep of an understanding that person is willing to get of a subject. the lower the baseline, the deeper the understanding.

      i then had an internship at a company where i was creating the whole frontend for their llm chat ui (user interface). for those nontechnical, i was just implementing the design of the chat in the app. using ai tools, i did it fairly quickly, and like before, found some issues which i had to later go on and fix. i did this for a while, until i realized my mind wasn't being simulated at all during work. i had no idea what i was doing, just asking a bot to write code for me. consulting a friend, i decided to completely stop using ai. i even switched to vim, which is a keyboard only text editor known to have quite a steep learning curve. this set my second baseline, which was significantly lower level than the previous one i had set for myself.

      using vim was an excellent decision, it forced me to understand the code deeply. i remember creating a new component by writing each line of code myself since i didn't know how to paste yet. while frustrating at first, i was then able to understand what each line of code does, where to locate issues, etc. i moved a lot faster than i had when i was completely dependent on ai. it was a satisfying feeling to deeply understand how something works. i later had to vibe code an app for another project, which i was able to do a lot better since i understood a lot more, but i didn't feel truly satisfied since i used ai blindly for a lot of it. it also made me realize that ai coding isn't that good. or maybe i just hadn't been using it right. either way, since my baseline for understanding code was a lot lower, i knew i could do a lot better and wasn't content with what i had, still having the drive to understand it even more.

      i find it quite extraordinary, by just consistency applying myself to something difficult for 2 weeks, my whole perspective and mindset on coding and learning itself changed. it's quite simple to be good at something. you just need to grasp that feeling once, and thats enough. as soon as you realize how good something can be, just one time, it makes it hard to go back to being content with how things were. not everything needs to be understood at a deep level. but for the things that i do want to understand, or the things i'm curious about, i'll try to understand them a lot more deeply now.

      it's fascinating how significant of an impact you can have on your life with just a small amount of hard work. it's super linear, applying it in one area of knowledge makes you want to apply it to others. ever since i shifted that baseline, i've been less interested in things like doomscrolling and feel a lot more simulated spending my time doing deep work, regardless of the subject.

      peter theil, founder of paypal, once mentioned that excellent entrepreneurs are polymaths. a polymath is something who has expertise in a wide range of subjects. mark zuckenberg and lex fridman are some examples, both being excellent at not only tech but jujutsu as well. i think they might have started their journeys in the same way, having that feeling of success just once.

      so, in short, i think it's important to keep your baseline in check. my dad once told me a quote - 'nothing succeeds like success'. i think that's very true, especially in this case. changing your baseline is quite hard, takes some work. but you just need to do it once, and then the benefits are infinite. superlinear.
    `
  }
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params
  const essay = essays[slug as keyof typeof essays]

  if (!essay) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-3xl px-8 py-6">
          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-teal transition-colors inline-block mb-6"
          >
            ← back
          </Link>
          <h1 className="text-3xl font-medium mb-4">writing not found</h1>
          <p className="text-sm text-text-secondary">the writing you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-3xl px-8 py-6">

        {/* Back Link */}
        <Link
          href="/"
          className="text-sm text-text-secondary hover:text-teal transition-colors inline-block mb-6"
        >
          ← back
        </Link>

        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-medium mb-2">{essay.title}</h1>
          <p className="text-sm text-text-muted">{essay.date}</p>
        </header>

        {/* Article Content */}
        <article className="max-w-2xl">
          <div className="space-y-4">
            {essay.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-sm text-text-secondary leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </article>

      </div>
    </div>
  )
}
