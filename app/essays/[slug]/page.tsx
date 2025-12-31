'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { use } from 'react'

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
  },
  'how-i-code-with-ai': {
    title: 'how i code with AI',
    date: 'january 2025',
    content: `
      I have a few friends who aren't keen on using AI to code. Partly because I believe they don't know how to do it properly, so their perception of it is flawed. I use it quite often, and while I'm not excellent, I think I'm getting the hang of it. So this is a short essay on how I code with AI.

      Most of the content in this essay is inspired by Dex Horthy's AI engineers lecture, a 20 min watch, which you can view [here](https://bagrounds.org/videos/no-vibes-allowed-solving-hard-problems-in-complex-codebases-dex-horthy-humanlayer).

      To start, it's important to note that everyone has a different way of coding, so my approach might not work for you. I do however think that it's a good place to start. I also don't think people depend on a really good model, rather just really good prompts. For all prompts below, you'd get reasonable results using Claude Sonnet 3.5, but I'll also specify which models work best for each of those too (for when you haven't hit your cursor limits).

      Context engineering is how you manage the AI's mental state, what it knows. In my own use case, I keep it stateless, so it knows nothing about the codebase to start. It's my responsibility to feed it all it needs. A lot of tokens are saved this way. Additionally, I try not to go above 40% of my context window, as that's when the AI starts to dumb down.

      I use the RPI method, which is research plan and implement. Cursor has commands, so each of this steps can be made into their own command. For each of these, it's best to open a new chat.

      When implementing a feature or solving a bug, you first describe what it is using the /research command. Claude Sonnet 4.5 works best for this.

---CODE_BLOCK_START:research prompt---
I have a task to [DESCRIBE FEATURE/BUG]. Goal: Provide all context needed for a junior developer to implement this without asking further questions. Instructions:
1. Do not write any code or modify the codebase yet.
2. Explore the codebase to understand existing systems, data models, and patterns relevant to this task.
3. Return your findings in markdown document with these sections:
    * Files: List of relevant files and their roles
    * Data Structures: Key types, interfaces, database schemas involved
    * Patterns: How similar features are implemented (e.g., 'React Query for fetching', 'errors via middleware')
    * Strategy: High-level implementation approach
    * Unknowns: Ambiguities needing resolution Be brutally concise. Use bullet points. Verify by reading code before stating anything.
Constraints: **Do not modify the .cursor/commands/research.md, make your own RESEARCH.MD in the root directory**
---CODE_BLOCK_END---

      This command collects all parts of the code needed for a junior level dev to be able to implement it. Observe how there is an unknowns section specified, this prevents the AI from hallucinating. It saves these unknowns as questions in the RESEARCH.md file it creates, in which you can answer these unknowns. Depending on the model you used and the feature you are trying to implement, the research can sometimes include unnecessary information, so it's important to proofread. For example, if I'm implementing a system to send notifications on the frontend of the app, and the API is already implemented and working, I do not need to know how it works, I just need to know the input and response type of the API to implement it. The more concise this file is, the better.

      Next is /plan. For this ideally you want to use a reasoning model like Gemini 3 or Opus 4.5 (in my experience Opus is faster). This part requires most of the critical thinking:

---CODE_BLOCK_START:plan prompt---
We are working on [FEATURE/BUG]. Research has been completed above.
Goal: Provide an implementation checklist in markdown document.
Instructions:
1. Create a checklist with atomic implementation steps.
2. Each step must be:
    * Atomic: One clear action (e.g., 'Create file X', 'Add function Y to file Z')
    * Verifiable: Include a check to ensure it works (e.g., 'Run test X', 'Verify log output')
    * No Code: Instructions only, not actual code
Format:

[ ] Step 1: [Action] - [Verification]
[ ] Step 2: [Action] - [Verification]

Create the file in the root directory, in a PLAN.MD file. Do not implement yet.
Constraints: **Do not modify the .cursor/commands/plan.md. Create your own PLAN.MD in the root directory**
---CODE_BLOCK_END---

      When prompting it in Cursor, you can use @RESEARCH.MD and describe the feature you want to add or the bug you're solving. What's crucial about this is that the instructions themselves are concise and clear, meant to make it so the AI does more doing and less thinking. It tells it exactly what to do, making it very easy to follow the instructions. This is the most important part of the process to review.

      So now we have the relevant RESEARCH.md and PLAN.md files.

      We then have the implementation command. Cursor's composer model works very fast for this, so that's what I prefer to use:

---CODE_BLOCK_START:implementation prompt---
I want to implement the feature. Context: RESEARCH.MD and PLAN.MD have been provided above. Instructions:
1. Execute Step 1 ONLY.
2. Verify it works as described.
3. Mark Step 1 as completed (change [ ] to [x]).
4. STOP and ask for confirmation before proceeding to Step 2.
Do not deviate from the plan. If the plan is wrong, stop and tell me.
**EXCEPTION: If the user says 'do all' you may do all steps at once**.
---CODE_BLOCK_END---

      When you start implementation, the LLM follows the plan step by step. For this, you also make a new chat, just tagging both the research and plan. You don't really need to say anything else.

      Since the steps are 'atomic' (as mentioned in the planning prompt), the AI makes minimal changes each step, so it's easy to see what it's doing and stop it from going off track if it starts to do so. You can also test after each small step, so finding exactly where the issue happened and debugging it is a lot easier too.

      The 'do all' command in the prompt is when I'm feeling extremely lazy. Do not recommend to use that unless it's a real basic feature.

      This is the main flow of how I code. Other prompts I use are explained below, which you can find on my [prompts](/prompts) page.

      Sometimes, when the chat gets too big (or if I cross the 40% context window), I use the /summary prompt. It's useful when starting another implementation chat completing the same feature. Also useful when I want to create a message for several bugs that I've implemented in one PR.

      After implementation, I use this /pr command. It's specifically written so it's easier for bots (like CodeRabbit, Mesa, Greptile, etc.) to code review.

      Besides that, I also have these 2 other commands: initialize and find. I use initialize when I want to ask a series of questions about a certain feature or part of the codebase. It can also be faster sometimes to initialize first, and then do research on a more niche part of the codebase. Sonnet 4.5 works best for both of these.

      Happy coding.
    `
  }
}

function CodeBlock({ content, label, blockId }: { content: string; label: string; blockId: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const formatLabel = (label: string) => {
    return label
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-text-muted tracking-wide">{formatLabel(label)}</p>
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
        <pre className="bg-zinc-950 border border-zinc-800 p-5 pr-16 rounded-2xl overflow-x-auto">
          <code className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
            {content}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default function EssayPage({ params }: EssayPageProps) {
  const { slug } = use(params)
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
          <h1 className="text-3xl font-normal mb-4 text-white">writing not found</h1>
          <p className="text-sm text-white font-light">the writing you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  // Parse content to handle code blocks that may span multiple paragraphs
  const parseContent = (content: string) => {
    const codeBlockRegex = /---CODE_BLOCK_START:([^-]+)---([\s\S]*?)---CODE_BLOCK_END---/g
    const parts: Array<{ type: 'text' | 'code'; content: string; label?: string; blockId?: string }> = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    let blockCounter = 0

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before the code block
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: content.substring(lastIndex, match.index) })
      }
      // Add the code block
      const label = match[1].trim()
      const codeContent = match[2].trim()
      const blockId = `code-block-${blockCounter++}`
      parts.push({ type: 'code', content: codeContent, label, blockId })
      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({ type: 'text', content: content.substring(lastIndex) })
    }

    return parts
  }

  const contentParts = parseContent(essay.content)

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
          <h1 className="text-3xl font-normal mb-2">{essay.title}</h1>
          <p className="text-sm text-text-muted font-light">{essay.date}</p>
        </header>

        {/* Article Content */}
        <article className="max-w-2xl">
          <div className="space-y-4">
            {contentParts.flatMap((part, partIndex) => {
              if (part.type === 'code') {
                return (
                  <CodeBlock
                    key={part.blockId}
                    content={part.content}
                    label={part.label || 'code'}
                    blockId={part.blockId || `block-${partIndex}`}
                  />
                )
              }

              // Process text content - split by paragraphs and handle links
              return part.content.split('\n\n').map((paragraph, paraIndex) => {
                const trimmed = paragraph.trim()
                if (!trimmed) return null

                // Check for links in the format [text](/link)
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
                const linkParts: Array<{ type: 'text'; content: string } | { type: 'link'; text: string; href: string }> = []
                let lastIndex = 0
                let match: RegExpExecArray | null

                while ((match = linkRegex.exec(trimmed)) !== null) {
                  // Add text before the link
                  if (match.index > lastIndex) {
                    linkParts.push({ type: 'text', content: trimmed.substring(lastIndex, match.index) })
                  }
                  // Add the link
                  if (match[1] && match[2]) {
                    linkParts.push({ type: 'link', text: match[1], href: match[2] })
                  }
                  lastIndex = match.index + match[0].length
                }

                // Add remaining text
                if (lastIndex < trimmed.length) {
                  linkParts.push({ type: 'text', content: trimmed.substring(lastIndex) })
                }

                // If no links found, render as plain paragraph
                if (linkParts.length === 0 || (linkParts.length === 1 && linkParts[0].type === 'text')) {
                  return (
                    <p key={`${partIndex}-${paraIndex}`} className="text-sm text-white leading-relaxed font-light">
                      {trimmed}
                    </p>
                  )
                }

                // Render paragraph with links
                return (
                  <p key={`${partIndex}-${paraIndex}`} className="text-sm text-white leading-relaxed font-light">
                    {linkParts.map((linkPart, linkPartIndex) => {
                      if (linkPart.type === 'link') {
                        return (
                          <Link
                            key={linkPartIndex}
                            href={linkPart.href}
                            className="text-white hover:text-teal underline transition-colors"
                          >
                            {linkPart.text}
                          </Link>
                        )
                      }
                      return <span key={linkPartIndex}>{linkPart.content}</span>
                    })}
                  </p>
                )
              }).filter(Boolean)
            })}
          </div>
        </article>

      </div>
    </div>
  )
}
