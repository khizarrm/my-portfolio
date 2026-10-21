# Add "chat loader" to the Components panel

## What I found

- This is not a shadcn project (no `components.json`, no `components/ui`). Components panel demos live in `components/showcase/` and are registered in `components/panels/ComponentsPanel.tsx` + `content/components.ts`. The "copy code" button reads the source file at build time.
- Stack already fits: React 19, Tailwind v4, strict TypeScript. The loader has no dependencies.
- The component needs a dark surface (default color is white). The demo frame uses `bg-frame`, so I'd verify it on the real frame colour.

## Plan

1. Create `components/showcase/ChatLoader.tsx` (instead of `components/ui/loaders-gooey-blobs.tsx`, to match the existing showcase pattern). Contents: the gooey-blobs component from your paste (with `"use client"`), exported as `ChatLoader` (props type `ChatLoaderProps`, `LoaderPhase` type kept). Reformatted to the repo style (single quotes, no semicolons) via prettier.
2. Add a small client demo in the same folder, `ChatLoaderDemo` (exported from `ChatLoader.tsx` or its own file): the loader on a dark `bg-neutral-950` tile with four phase buttons (intake / working / settling / sighting) and an Auto toggle that cycles every 3s. Needs to be a client component because it holds state; `ComponentsPanel` is a server component.
3. `content/types.ts`: add `'chat-loader'` to `ComponentEntry['demo']`.
4. `content/components.ts`: add entry `name: 'chat loader'`, with a lowercase description matching the others (a status indicator for an AI agent: one shape that morphs between phases of a request).
5. `ComponentsPanel.tsx`: register `'chat-loader'` in `demos` with `file`, `preview: <ChatLoaderDemo />`, and a "copy prompt" text in the same format as the existing two (props, phase mapping, dark-surface note, questions to ask).
6. Verify: `pnpm check` (em-dash check, typecheck, lint, prettier). You check the look in your browser.

## Questions

- Where in the list should it go: at the end (default) or at the top?
- Should the demo have the phase buttons + Auto toggle (as in your paste), or just auto-cycle with no controls?
- Any description wording you want, or should I write it in your usual lowercase style?
