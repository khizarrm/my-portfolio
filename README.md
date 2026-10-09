# Khizar Malik

Personal site. Next.js (App Router) + TypeScript + Tailwind CSS v4. Every route is prerendered as static HTML, and it deploys to Vercel with zero config.

## Run

Uses pnpm. Node is pinned through `devEngines.runtime`, so pnpm downloads the right version itself.

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the build
pnpm check      # em dash check, typecheck, lint, prettier
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourdomain.com`) once a custom domain is live. It's used for canonical URLs, the sitemap and Open Graph. On Vercel it falls back to the project's production URL.

## Edit content

Everything you'd edit lives in `content/`, typed by `content/types.ts`:

| File                    | What                                                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `content/site.ts`       | Name, meta description, social links, intro paragraphs (objects in the intro become panel links)                |
| `content/writing.ts`    | Essays. Body blocks are paragraphs (inline links as `[text](url)`) or `{ type: 'code', label, code }`           |
| `content/reading.ts`    | Reading intro and list                                                                                          |
| `content/videos.ts`     | Content panel, grouped into sections with a one-line title. Use `src` + `poster` for self-hosted, or `embedUrl` |
| `content/work.ts`       | Things I've done. Logos go in `public/logos/`                                                                   |
| `content/components.ts` | Components panel (layout still to be designed)                                                                  |
| `content/prompts.ts`    | The `/prompts` page                                                                                             |

Images live in `public/images`, videos in `public/videos`.

### Adding a video

Phone exports are often HEVC, which Firefox and some Chrome setups can't play. Re-encode to H.264 with faststart and grab a poster:

```sh
ffmpeg -i in.mov -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -vf "scale='min(720,iw)':-2" \
  -c:a aac -b:a 96k -movflags +faststart public/videos/video-7.mp4
ffmpeg -ss 0.5 -i public/videos/video-7.mp4 -frames:v 1 -vf scale=480:-2 -q:v 4 public/videos/video-7.jpg
```

Grid tiles play a short silent loop instead of the full file. Make one and set it as `preview` in `content/videos.ts`. Keep it at least 576px wide so tiles stay sharp on retina screens (use `scale=1280:-2` for 16:9, which spans the full row):

```sh
ffmpeg -ss 0.5 -t 4 -i public/videos/video-7.mp4 -an -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p \
  -vf "scale=576:-2" -movflags +faststart public/videos/video-7-preview.mp4
```

## How it works

- **URLs drive the side panel.** `/` is closed, `/<panel>` opens a panel (`reading`, `writing`, `content`, `work`, `components`), and `/writing/<slug>` opens an essay. Each one is a static page, so links can be shared and indexed. In the app, `PanelProvider` moves between them with `history.pushState`, with no route transition or remount, and closing rewinds history so the back button behaves.
- **Panel links are real `<a href>`s.** They work without JavaScript, and cmd/middle-click opens them in a new tab.
- **Animation:** on desktop the panel's width animates 0 to 50vw, and its inner scroller keeps a fixed 50vw width so content never reflows. Below 900px it's a full-screen layer that animates only `transform`, which keeps it on the compositor. `prefers-reduced-motion` turns transitions off.
- **Theme:** dark only. Colors are tokens on `:root` in `app/globals.css`.
- **Accessibility:** focus moves to the panel heading when a panel opens and returns to the link that opened it on close. The closed panel, and the page behind the mobile panel, are `inert`.
- Old URLs redirect: `/essays/:slug` goes to `/writing/:slug`, and `/ugc` goes to `/content`.

## No em dashes

`pnpm check:dashes` (part of `pnpm check`) fails if `—` appears anywhere in `app/`, `components/`, `content/` or `lib/`.
