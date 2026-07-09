---
title: AutoElite
tagline: A bilingual car-dealership platform with searchable inventory, built to sell vehicles without a salesperson in the loop.
year: 2025
role: Design & Full-Stack Development
stack: Next.js, React, TypeScript, Tailwind CSS, Netlify
live: https://henry-cars.netlify.app/
color: #b0413e
image: assets/projects/autoelite.jpeg
featured: true
---

## Overview

AutoElite is a premium dealership storefront: a curated inventory of 50+ new and pre-owned vehicles across 20+ brands, with filtering, per-vehicle detail pages, and direct-contact conversion paths (free test drive, certified pre-owned, price guarantee messaging).

## Technical choices

**Next.js multi-page architecture.** The inventory browse experience (`/cars`) and per-vehicle pages are separate routes with shareable URLs, important for a dealership where customers send each other links to specific cars.

**Internationalization from day one.** The site ships English and French locales (`en_US` / `fr_FR` alternates in metadata), reflecting the real bilingual market it serves. Building i18n in early avoided the classic retrofit pain.

**Inventory as structured data.** Vehicles are data, not hand-written pages: one template renders every listing, so adding a car is a content operation, not a development task.

**Trust-first UX.** The layout leads with the three things car buyers actually worry about: inspection/certification, transparent pricing, and response time, before showing a single vehicle.

## Outcome

A dealership site that works as a self-service showroom: browse, compare, and reach out, with a content model the owner can maintain independently.
