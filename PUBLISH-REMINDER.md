# Scheduled posts — push reminder

Two blog posts are committed but withheld from the site. Nothing in this repo
publishes itself: `lib/blog.ts` checks `publishOn` **at build time**, so a
scheduled post appears on the first deploy that runs on or after its date.

A deploy only happens when you push to `master`. If you forget, the post stays
invisible past its date.

---

## The dates

| Date | Post | Slug |
| --- | --- | --- |
| **Fri 2 Oct 2026** | Making Business Central Talk to Our ERP Without Creating a Distributed Mess | `business-central-erp-integration` |
| **Tue 6 Oct 2026** | I Built Atlas, Then Started Breaking It on Purpose | `built-atlas-then-broke-it` |

Both are in `content/blog/` and both currently return 404. That is correct
behaviour, not a bug.

---

## What to run

On the day, from the repo root:

```bash
git commit --allow-empty -m "deploy: publish scheduled blog post"
git push
```

That is it. The empty commit exists purely to trigger a Vercel build.

Then confirm the post is actually live:

```bash
curl -sI https://mfalme.runs-on.dev/blog/built-atlas-then-broke-it | head -1
curl -s https://mfalme.runs-on.dev/blog/feed.xml | grep -c "<item>"
```

A `200` on the post URL and **7** items in the feed means it worked. There are
6 today; the Atlas post is the seventh. For the Business Central post on 2 Oct,
use `business-central-erp-integration` instead and expect the same 7 — the two
posts are published four days apart, so the count goes to 7 either way.

---

## To get the dates off your calendar

On **1 Oct** and **5 Oct** respectively — the day before each, so the post is
live by the morning of its date. Missing the day isn't catastrophic: the post
goes live on the next push after the date.

If you would rather not think about it, the same empty commit works any time
after the date:

```bash
git commit --allow-empty -m "deploy: publish scheduled posts" && git push
```

---

## Two things to finish first

**The Business Central post is not ready to publish as written.** It was written
at a conceptual level because the repository contains no Business Central
integration code. Before it goes out on 2 Oct, every `[IMPLEMENTATION]` marker
in the post body needs replacing with what the integration actually does, and
the "Before this goes live" checklist at the bottom needs ticking off.

Eight markers. They cover the operation identity scheme, the in-flight state,
the real failure categories, the retry policy, the correlation field name, how
reconciliation runs, the recovery tooling, and the repository link.

**The Atlas post has no placeholders** and can go live as-is.

---

## Turning scheduling off

To publish a post immediately, either set `publishOn` to today or delete the
line — it defaults to `datePublished`:

```yaml
---
title: "My post"
datePublished: "2026-10-06"
# publishOn omitted — publishes on the next deploy
---
```

Full details in [SCHEDULING.md](SCHEDULING.md).
