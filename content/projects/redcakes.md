---
title: Home of Cakes
tagline: An online cake-ordering platform with SMS-integrated order intake, so the bakery starts working the moment you hit "order".
year: 2024
role: Design & Full-Stack Development
stack: React, Node.js, SMS Gateway Integration, Netlify
live: https://redcakes.netlify.app/
color: #a34a6b
image: assets/projects/redcakes.jpeg
featured: false
---

## Overview

Home of Cakes lets customers browse, customize and order cakes online. The differentiator is operational: every order is pushed to the bakery via SMS the instant it's placed, so production can begin without anyone refreshing an admin panel.

## Technical choices

**SMS as the order channel.** In the Rwandan market, SMS is the one notification channel that always arrives, on any phone, without data. Integrating an SMS gateway into the order flow matched the client's real workflow instead of forcing a dashboard habit.

**Static-first frontend.** The catalog and ordering UI deploy as a static React build on Netlify: cheap to run, fast to load, trivial to update.

**Order flow over feature sprawl.** The entire UX is optimized for one path (pick, customize, order) because for a small bakery, conversion speed matters more than account systems.

## Outcome

Faster order turnaround for the bakery and a frictionless path to purchase for customers, technology fitted to the business, not the other way round.
