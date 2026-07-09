---
title: Animations are cheap, jank is expensive
date: 2026-06-10
excerpt: This portfolio runs a Three.js particle field, scroll reveals and a custom cursor, and still paints fast. The rules that make heavy motion feel weightless.
tags: Frontend, Performance, Three.js
---

This site is deliberately animation-heavy: a WebGL particle hero, staggered reveals, marquees, magnetic hovers. It also aims to paint fast on a mid-range phone. Those goals only conflict if you animate the wrong things.

## Rule 1: Only animate what the compositor can own

Every animation on this site touches exactly two properties: `transform` and `opacity`. Both are handled by the GPU compositor without triggering layout or paint. Animating `top`, `height`, `margin` or box-shadows forces the browser to redo layout at 60fps, and that's where jank is born. If a motion idea can't be expressed as a transform, I redesign the motion, not the budget.

## Rule 2: The 3D scene must earn its frame time

The Three.js hero follows a strict diet:

- **One draw call for ~2,600 particles** via a single `BufferGeometry` + `PointsMaterial`, plus one wireframe mesh. Draw calls, not polygon counts, are what kill mobile GPUs.
- **Pixel ratio capped at 1.75.** Rendering at DPR 3 on a modern phone quadruples fragment work for detail nobody perceives in a moving particle field.
- **It stops when unseen.** An `IntersectionObserver` pauses the render loop the moment the hero scrolls away, and `visibilitychange` pauses it on tab switch. A background tab burning GPU is a bug.
- **Loaded after first paint.** The module is dynamically imported during browser idle time, so text renders instantly and the particles fade in when ready.

## Rule 3: Respect the user's motion settings

`prefers-reduced-motion` isn't an edge case, it's an accessibility contract. Here it disables the WebGL scene entirely, removes reveal transitions, and stops the marquee. The site is fully usable as a static document.

## Rule 4: Measure like a pessimist

Lighthouse on a throttled profile, not a MacBook on fiber. The metrics I watch: LCP (hero text, not the canvas), total blocking time (kept low by deferring all non-critical JS), and long-task count during scroll.

Heavy motion done right is invisible as *effort*. The user should feel atmosphere, never the fan.
