---
title: "Delimiting Scope to Overcome Procrastination"
description: "How I scoped down my personal project to overcome procrastination and ship something valuable."
date: "2026-05-26"
tags: ["product engineering"]
published: true
---

Ever since I started studying software development, I wanted a personal blog to share what I was learning. After some time in the field, I realized I had the skills to build one from scratch and showcase my technical abilities.

Starting a project is always exciting: I chose the stack, modeled the database tables, decided where to host the services — everything felt perfect. The problem was that complexity started to grow, and my time and motivation to keep working on a *side project* that was supposed to be simple and quick quickly ran out.

In other words, I procrastinated. That's when I felt the pain of having a half-baked product that brought me no value at all.

## Delimiting Scope
I had to take a step back and understand what product I actually needed. Here's how I scoped it down:
- Single author;
- Good performance and SEO metrics;
- Write in Markdown.

That product would already meet my original need: a personal blog to share my knowledge. This scoping pulled me out of the *overengineering* loop I had fallen into.

## Technical Decisions
The nice thing about having a defined scope is that technical decisions become much easier. Here are mine for this product:

The blog has only one author (me). Only I can contribute to the repo, the articles don't contain sensitive information, and the posting frequency will be low enough that I don't need to worry about infrastructure for now.

That means:
1. No authentication layer needed;
2. No admin environment needed;
3. No Markdown editor component needed (if you've ever needed one, you know what I mean);
4. No database to store articles;
5. No backend service.

The decision was to simplify by hosting the `.md` files inside Next.js and pre-generating each article page at build time — gaining performance, low cost, SEO, and system resilience. When the number of articles grows, I can reconsider.

Next.js already comes with a lot of batteries included and fit exactly what I needed: performance, SEO, and minimal configuration.

## Claude Code
I'll admit I was skeptical about Coding Agents, but I decided to follow advice I saw on LinkedIn: *"Test Claude Code on a personal project."* I did — and wow!

When I used *Prompt Engineering* techniques with the project's scope well defined, I was able to accelerate development and even add features that weren't in the original scope but made a lot of sense, like filtering articles by topic tags.

## Conclusion
This project helped me reconnect with the essence of why I do what I do: the product. Without a product, there's no value. Software is meant to be used. If it isn't, what's the point?

In the age of artificial intelligence, I don't believe we'll be replaced. Technical and product decisions still need to be made.

I think we're being invited to shift our focus a little — from code purism toward the product. Toward the user. Toward accessibility. That's the path I want to follow.

---

\* *This text was written by a human.*

\** *This was my first post — I hope it's one of many. See you in the next one!*
