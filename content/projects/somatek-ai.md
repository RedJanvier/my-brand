---
title: SomaTek AI
tagline: An AI-powered Chrome extension that simplifies complex technical text and images, co-founded and engineered from zero to production.
year: 2024
role: Co-Founder & Senior Software Engineer
stack: React, Chrome Extension APIs, Chart.js, OpenAI API, Anthropic API, Spring Boot, Jenkins, Docker
live: https://github.com/SomaTekAI
color: #3e6d8a
featured: false
---

## Overview

SomaTek AI helps people understand difficult technical content where they encounter it: in the browser. Select a dense paragraph or a technical diagram and the extension rewrites or explains it at your level, powered by OpenAI and Anthropic models.

## Technical choices

**Chrome extension as the delivery surface.** Meeting users inside the page they're already reading beats asking them to copy-paste into a separate app. The extension uses content scripts for in-page selection and a service worker for API orchestration.

**Dual-provider LLM strategy.** Routing between OpenAI and Anthropic APIs gave us resilience against provider outages and let us match model strengths to task types (summarization vs. visual explanation).

**Operator analytics dashboard.** I built the internal dashboard in React with Chart.js, surfacing usage metrics, latency and cost per feature, the data we used to decide what to build next.

**Infrastructure economics.** Migrating our Spring Boot services to CONTABO cut hosting cost by roughly 25% while improving availability about 15%. Jenkins + Docker CI/CD plus a real test suite reduced post-deploy bugs by around 30%.

## Outcome

A shipped AI product with real users, real cost constraints and real uptime requirements, the fastest engineering education I've had.
