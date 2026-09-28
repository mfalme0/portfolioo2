# Scheduling a post for a future date

The blog is static. Posts are `.mdx` files, read at build time by `lib/blog.ts`, and
prerendered to HTML by `next build`. There is no database and no server-side job that
runs on a clock.

**So a post cannot wake itself up.** What the scheduling field does is hold a post back
until its date has passed. The post then goes live **on the next deploy**.

## How to use it

```mdx
---
title: "I Built Atlas, Then Started Breaking It on Purpose"
description: "What a distributed systems lab taught me about Raft and network partitions."
datePublished: "2026-10-06"
publishOn: "2026-10-06"
tags: ["Distributed Systems", "Raft", "Go", "Failure Injection"]
---
```

`publishOn` is optional. When omitted it defaults to `datePublished`, so ordinary posts
need no extra field.

- `publishOn` **later** than `datePublished` → the post is withheld until that date.
- `publishOn` **earlier** than `datePublished` → the build fails, because it is almost
  certainly a typo.

A withheld post is not merely unlisted. It is **absent**: it does not appear in the blog
index, the tag pills, the tag-filtered views, the RSS feed, the sitemap, the "keep reading"
cards, the older/newer links, or `generateStaticParams`. Requesting its URL returns 404,
because `dynamicParams = false`.

## Getting it to actually appear on the day

A post goes live the first time a build runs on or after its `publishOn` date. So one of
these has to happen on the day:

**Option 1 — redeploy manually (simplest, no setup).**
Push an empty commit, or re-run a deploy from the Vercel dashboard:

```bash
git commit --allow-empty -m "trigger deploy for scheduled post"
git push
```

> **Currently pending.** Two posts are staged and waiting: the Business Central integration
> post for 2 Oct 2026 and the Atlas post for 6 Oct 2026. See
> [PUBLISH-REMINDER.md](PUBLISH-REMINDER.md) for the dates and the exact command.

**Option 2 — let the build run on its own.**
Vercel rebuilds on every push to `master`. If you push a batch of scheduled posts ahead of
time, each one appears on the next deploy after its date — which may be later than you
intended.

**Option 3 — schedule the push itself.**
If you want it to happen without you, schedule it where you already schedule things:

- a local `cron` / Task Scheduler entry that runs the empty-commit push at the target time
- GitHub Actions with a `schedule:` trigger and a `git push`
- Vercel Cron, though note it fires on UTC and cannot itself push to the repo

## Why there is no cron in the repo

I have deliberately not added one. A cron job that mutates `master` is a self-push: it needs
credentials, it rewrites history or adds empty commits on a schedule, and it can fail
silently. On a personal site with a handful of posts that is a poor trade for the convenience
of not pressing a button once.

If you do add one, keep it to a scheduled empty commit and keep the secret in Vercel
environment variables — never in the repo.

## Checking what is scheduled

`getScheduledPosts()` in `lib/blog.ts` returns everything withheld by its date. It is not
wired to any page, because a public "coming soon" page defeats the purpose. To see what is
waiting, run a one-off script or add the import to a local route while you are testing.
