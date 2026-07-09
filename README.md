# RedJanvier — Portfolio

Dark editorial portfolio for Janvier Ntwali (RedJanvier). Pure static site:
no build step, no backend, no framework runtime. Deploys as-is to Netlify.

## Stack

- **HTML + CSS + vanilla ES modules** (zero framework payload)
- **Three.js** (CDN, ES module) for the hero particle field
- **marked.js** (CDN) to render markdown content client-side
- **Fonts:** Fraunces (display), Switzer (body), IBM Plex Mono (labels)

## Run locally

Markdown content is loaded with `fetch()`, so open it over HTTP, not `file://`:

```bash
npx serve .          # or: python3 -m http.server 8080
```

## Deploy

Drag the folder into Netlify, or connect the repo. `netlify.toml` already
sets publish dir and cache headers. No build command needed.

## Adding a project

1. Create `content/projects/my-project.md`:

```md
---
title: My Project
tagline: One-sentence pitch shown on cards and the case-study header.
year: 2026
role: Design & Development
stack: Next.js, TypeScript, Tailwind CSS
live: https://example.com
repo: https://github.com/redjanvier/my-project   (optional)
color: #7a4a3e        (card accent tint, optional)
featured: true        (shows on the homepage, max 4 used)
---

## Overview
Markdown body. Use "## Technical choices" and "## Outcome" sections
to match the existing case studies.
```

2. Add `"my-project"` to `content/projects/index.json` (order = display order).

## Adding a blog post

Same pattern in `content/blog/`, with front-matter keys:
`title`, `date` (YYYY-MM-DD, used for sorting), `excerpt`, `tags`.
Then add the slug to `content/blog/index.json`.

## Performance notes (why it stays fast despite heavy animation)

- All animations use **transform/opacity only** (compositor-friendly)
- Scroll reveals via **IntersectionObserver**, no scroll-position math
- Three.js scene: single-draw-call particles, **DPR capped at 1.75**,
  **pauses when off-screen or tab hidden**, loaded via dynamic import
  during `requestIdleCallback` (after first paint)
- Full **prefers-reduced-motion** support (3D + transitions disabled)
- Fonts loaded with `display=swap`; content cached 5 min, assets 7 days
