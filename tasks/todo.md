# New, longer home intro

Copy: the user's 9-paragraph intro (Thirdspace, cold emailing / Sema, internships, Bramble, components, writing/reading/AI art/content, this site, email).

## Problem: desktop fit-to-screen

The desktop home column scales as one unit so name + hero + intro fit in the viewport without scrolling (`.home-column` / `--home-ratio` in `app/globals.css`). The new copy roughly doubles the height (ratio ~1.4 -> ~2.0), which shrinks body text to ~10px on an 800px-tall window. Options:

- **A. Let the home page scroll on desktop** (recommended): fixed comfortable size (640px column, ~18px text, same as max today), page scrolls. Remove the ratio-based scaling, keep cqi sizing so nothing else changes.
- **B. Keep fit-to-screen with a minimum size**: scale down until text hits ~15px, then scroll. More code, two behaviours.

## Links

- Add external-link support to intro segments: `{ text, href }` alongside `{ text, panel }`, rendered with `RichText`-style `<a target=_blank>`.
- Panel links: "components" -> Components, "writing" -> Thoughts, "reading" -> Reading, "making art using ai" -> Wallpapers, "content" -> Content, "the things i've done" -> Work.
- External: "thirdspace" -> thirdspace.so, "sema" -> try-sema.com, "bramble" -> bramble.solutions.
- Needs URLs from user: "here's an email i wrote" (the email), the three "here"s (which internships + links), "email me" (address).

## Verify

- `pnpm check`; user checks layout in their browser.
