import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import ShowcaseCard from "./showcase-card.client";
import { PromptBox } from "@/components/showcase/prompt-input-box";

function buildPromptInputBoxPrompt(source: string) {
  return `You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.
If default path for components is not /components/ui, provide instructions on why it's important to create this folder

Copy-paste this component to /components/ui folder:
\`\`\`tsx
prompt-input-box.tsx
${source}
\`\`\`

Install NPM dependencies:
\`\`\`bash
@radix-ui/react-tooltip, lucide-react, framer-motion
\`\`\`

Make sure \`cn\` is available at \`@/lib/utils\` (standard shadcn helper). If not, create it:
\`\`\`ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
\`\`\`

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's props: className, placeholder, disabled, onSubmit, onStop, onTranscribe
 3. The component records mic audio with MediaRecorder. Transcription is delegated to a parent-provided onTranscribe(blob: Blob) => Promise<string> callback. Wire this to your speech-to-text endpoint.
 4. Hold Option (Alt) anywhere on the page is a global push-to-talk shortcut. Click on the mic button toggles recording.
 5. Questions to Ask
 - What transcription backend will onTranscribe call? (OpenAI Whisper, Cloudflare Workers AI, Deepgram, etc.)
 - What should onSubmit do with the submitted text?
 - Will this be used in a chat interface or a one-shot prompt?
 - Is mic permission acceptable in the UX flow?

Steps to integrate
 0. Copy paste the code above into /components/ui/prompt-input-box.tsx
 1. Install external dependencies
 2. Implement an onTranscribe callback that sends the blob to your speech-to-text endpoint and returns the transcribed text
 3. Wire onSubmit to your chat or agent send action
 4. Make sure the page or layout has a dark background so the input-surface and pulsing-red glow read correctly
`;
}

export default function ComponentsPage() {
  const promptInputBoxSource = fs.readFileSync(
    path.join(
      process.cwd(),
      "components/showcase/prompt-input-box.tsx",
    ),
    "utf-8",
  );

  const promptInputBoxPrompt = buildPromptInputBoxPrompt(promptInputBoxSource);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-3xl px-8 py-12">
        <Link
          href="/"
          className="text-sm text-text-secondary hover:text-teal transition-colors inline-block mb-6"
        >
          ← back
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-medium mb-2">components</h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            ui i&apos;ve built and want to share. each one is interactive. copy
            the code or grab a prompt to drop into your own assistant.
          </p>
        </header>

        <div className="space-y-16">
          <ShowcaseCard
            title="prompt input box"
            description={
              <>
                voice-first prompt box. hold Option to talk, see a live
                waveform, pulsing red glow while recording. built for{" "}
                <a
                  href="https://try-sema.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-teal underline transition-colors"
                >
                  sema
                </a>
                .
              </>
            }
            source={promptInputBoxSource}
            prompt={promptInputBoxPrompt}
          >
            <PromptBox placeholder="Try typing, or hold Option to speak..." />
          </ShowcaseCard>
        </div>
      </div>
    </div>
  );
}
