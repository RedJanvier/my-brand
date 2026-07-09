---
title: What Kafka taught me about calm systems
date: 2026-05-18
excerpt: I have introduced Apache Kafka at three different companies. The technology was never the hard part; changing how teams think about time was.
tags: Architecture, Kafka, Microservices
---

I have now introduced Apache Kafka-based event processing at three different companies: at Andela to decouple a freshly split monolith, at Codeland for asynchronous processing on enterprise banking platforms, and in my own services since. Each time, the cluster setup took days. The mindset shift took months.

## Synchronous thinking is the real legacy system

Most teams don't have a monolith problem; they have a *request-response* problem. Every feature is imagined as "A calls B and waits." When B slows down, A slows down, and the outage graph looks like dominoes.

The unlock with Kafka isn't throughput. It's that **producers stop caring who is listening**. The order service announces "order placed" and moves on. Invoicing, notifications, analytics: all of them subscribe without the order service ever knowing they exist. Adding a consumer becomes a deployment, not a coordination meeting.

## Three lessons that survived contact with production

**1. Design events as facts, not commands.** `PaymentReceived` ages well; `SendReceiptEmail` does not. Facts let future consumers you haven't imagined yet do things you haven't imagined yet. Commands couple you to today's org chart.

**2. Idempotency is not optional.** Kafka gives you at-least-once delivery, which means your consumers *will* see duplicates on a bad day. Every consumer we wrote after the first incident checks "have I processed this key before?" as instinctively as it checks for null.

**3. The dead-letter topic is a product feature.** Where failed events go determines whether an incident is a quiet replay or a data-loss postmortem. We treat DLQ depth as a first-class dashboard metric, right next to latency.

## When I don't reach for it

A CRUD app with one consumer per event does not need Kafka; it needs a database and honesty. The complexity tax (partitioning strategy, consumer groups, schema evolution) only pays off once multiple teams or services genuinely need the same facts at different speeds.

Calm systems aren't the ones where nothing fails. They're the ones where failure in one place is just a lag metric somewhere else.
