---
title: Bloom Spa
tagline: A luxury wellness sanctuary in Kibagabaga, Kigali, with a booking flow that feels as calm as the spa itself.
year: 2025
role: Design & Full-Stack Development
stack: Next.js, React, TypeScript, Tailwind CSS, Netlify
live: https://bloom-spa.netlify.app/
color: #5f7a63
image: assets/projects/bloom-spa.jpeg
featured: true
---

## Overview

Bloom Spa needed a digital presence that matched the physical experience: quiet, deliberate, premium. The site presents signature treatments (massages, advanced facials, waxing) with per-service detail pages, pricing in RWF, a gallery, and an online booking flow.

## Technical choices

**Next.js with static generation.** Every service page is pre-rendered, so the site is effectively static HTML served from a CDN. For a local business site, that means near-instant loads on Rwandan mobile networks, strong SEO, and zero server cost.

**`next/image` for the photography.** A spa site lives or dies by its imagery. All photography is served through Next.js image optimization: responsive sizes, modern formats, and lazy loading below the fold, keeping Largest Contentful Paint fast despite full-bleed hero images.

**Structured metadata and local SEO.** Open Graph tags, locale (`en_RW`), keyword targeting for "spa Kigali" and "massage Kibagabaga", and semantic headings, because a spa's website is primarily a discovery and conversion tool.

**Design system in Tailwind.** A muted botanical palette (deep green `#2e3d33`, warm neutrals), generous whitespace, and slow, subtle reveals. Motion is used to slow the visitor down, not to show off.

## Outcome

A fast, elegant marketing and booking site that positions Bloom as the premium option in its neighborhood, with a service menu the owners can extend without touching layout code.
