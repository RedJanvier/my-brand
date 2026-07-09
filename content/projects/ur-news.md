---
title: UR News
tagline: A progressive web app where the entire University of Rwanda community shares news, installable, offline-capable, campus-wide.
year: 2020
role: Design & Full-Stack Development
stack: TypeScript, React, PWA, Service Workers, Firebase
live: https://ur-news.netlify.app/
repo: https://github.com/RedJanvier/ur-news
color: #3e7a8a
image: assets/projects/ur-news.jpeg
featured: false
---

## Overview

UR News is a news-sharing platform for the University of Rwanda: any member of the community can publish and read campus news. It was built as a **progressive web app** so it installs to the home screen and keeps working when campus connectivity doesn't.

## Technical choices

**PWA over native app.** Students weren't going to download a campus app from a store. A PWA gives the install-and-notify experience with zero distribution friction and one codebase.

**Offline-first with service workers.** Cached shell and content mean previously loaded news remains readable offline, which matters on a campus with uneven Wi-Fi.

**TypeScript throughout.** Type safety across a contributor-facing codebase kept a student-community project maintainable as it grew.

## Outcome

One of my earliest products with real community usage, and the project that made offline-first thinking a permanent part of my toolkit.
