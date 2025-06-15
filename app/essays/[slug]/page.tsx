import Link from 'next/link'

interface EssayPageProps {
  params: {
    slug: string
  }
}

const essays = {
  'the-privilege-of-failing': {
    title: 'The Privilege of Failing',
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
  'traits i respect': {
    title: 'Respectable Traits',
    content: `
    I recently came across a man who wasn’t the smartest or brightest. It seemed like he didn’t put effort into thinking about things deeply, our conversations always remained shallow, even when I tried to go deep. I initially thought perhaps he wasn’t comfortable doing so with me, but as time passed I came to realize he just couldn’t articulate his thoughts deeply enough. Yet he was kind and considerate. He had good manners. But I wouldn’t describe him as someone curious, or smart. I use these terms interchangeably cause I think intelligence comes from being curious - the more curious you are, the more you seek to know. And the more you seek to know, the smarter you become.

    I subconsciously didn’t respect him as much. I had to make a conscious effort to do so. But it seemed unfair to think this way since I’d been in a similar situation before, where I thought I knew enough, but I was proven to be wrong.

    So it made me think. What traits do I need to see in people to respect them? And are these valid? 

    Marcus Aurelius says one of the measures of the value of a man is measured by how kind he is to those unkind. I believe that to be true, but even that takes a level of emotional intelligence to do so. So I think it’s appropriate to have intelligence as one of the measures to respect someone.  At least emotional intelligence. This alone isn’t enough however, there are plenty of emotional intelligent people that act in bad ways. So this trait must be paired with others to be considered respectable. 

    One such trait is a willingness to try new things. Such people understand the embarrassment of being bad at something new and welcome it. They create a safe space without judgement. I think such an environment is necessary for someone to thrive as it provides security to fail, which is necessary for growth. 

    Being able to take criticism is another. Those who can’t don’t grow. But one should be able to distinguish who to take it from and who to ignore. If you take it from everyone, you don’t go nowhere. This adds on to the previous trait as well: creating a non judgmental zone is very useful when delivering or receiving criticism

    Authenticism is also extremely respectable. These people are different. For me, those that I’ve met who have such traits don’t fit into the categories of people I have in my mind. I’ve met quite a few, and even though I’ve disagreed with them on a lot of things, the respect is there because they know themselves, and act in accordance with who they are. In my experience, it’s actually very hard to find genuinely authentic people since a lot of people haven’t even scratched the surface of knowing who they really are.

    So I’d say these 4 traits are what I’d look for to consider someone extremely respectable. Those who don’t have them aren’t not respectable, they still are. But at least for me, my respect for those who do have these traits far exceeds those who don’t. 

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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <Link href="/" className="underline-link text-body mb-8 inline-block">
          ← Back to Home
        </Link>
        <hr className="border-white mb-8" />
        
        <article>
          <h1 className="text-large font-bold mb-12">{essay.title}</h1>
          
          <div className="prose prose-invert max-w-none">
            {essay.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-body mb-6 leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}