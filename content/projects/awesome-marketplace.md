---
title: Awesome Marketplace
tagline: A polyglot microservices marketplace API, Spring Boot and NestJS working side by side, with automatic email-signature propagation.
year: 2023
role: Architect & Developer (Open Source)
stack: Java, Spring Boot, NestJS, TypeScript, PostgreSQL, Microservices
repo: https://github.com/RedJanvier/awesomePlace
color: #6d5a3e
featured: false
---

## Overview

Awesome Marketplace is a RESTful API for an online marketplace: users buy and sell products, manage inventory and process orders. I built it partly as a real product and partly as an architecture exercise: what does it take to run **Spring Boot and NestJS services in the same system** cleanly?

## Technical choices

**Deliberate polyglot microservices.** Java/Spring Boot handles the transactional core (orders, inventory) where the ecosystem's maturity pays off; NestJS handles auxiliary services where Node's speed of iteration wins. The two communicate over well-defined REST contracts.

**Event-driven propagation.** The signature feature: user email signatures are generated centrally and automatically re-propagated whenever underlying user data changes, a small, concrete demonstration of eventual consistency done right.

**Open source by default.** The repository is public because APIs improve when their contracts are scrutinized.

## Outcome

A working reference for polyglot service design that I still borrow patterns from in client work.
