# mfalme.runs-on.dev — Portfolio & Lead Generation Site

Personal portfolio and service-sales site for **Joseph Gitau Chege** (brand: **Mfalme·0**), a
technology engineer, systems architect and IT/cloud consultant based in Nairobi, Kenya.

This is a commercial site, not just a CV. It runs alongside a home-lab showcase, a technical
guide library, and two lead-capture tools. Every architectural decision below assumes that
distinction.

- **Production URL:** https://mfalme.runs-on.dev
- **Repo:** `github.com/mfalme0/portfolioo2` (branch `master`)
- **Deployment:** Vercel (auto-detected from `@vercel/analytics`; no `vercel.json`)

---

## 1. Read this first if you're an agent

Five things will save you an hour of confusion:

1. **The commercial site lives in the `app/(site)/` route group.** Parentheses mean the folder
   contributes *no URL segment* — `app/(site)/cloud/page.tsx` serves `/cloud`. `app/homelab/`,
   `app/LAN/` and `app/layout.tsx` sit *outside* that group and have their own layouts.
2. **Adding a nav-visible page requires editing three files.** Header nav, footer column, *and*
   `app/sitemap.ts`. Miss one and the page exists but is unreachable or unindexed. See §6.
3. **The theme is locked to a single value.** `app/Context/theme.tsx` sets `themeKeys = ['daylight']`
   and an inline script in `app/layout.tsx` forces `data-theme='daylight'` before paint. The other
   themes in `globals.css` are dead code. Don't build UI that depends on switching themes.
4. **There is no database and no test suite.** Zero test files, no test script, no test framework in
   `package.json`. Form submissions go to Formspree over HTTP. Don't invent tests to "verify" a
   change — verification is `tsc`, `eslint`, and `next build` (§4). The only `route.ts` in the repo
   is `/blog/feed.xml`, which is `force-static` and prerenders to a file — there are no dynamic
   server endpoints.
5. **Don't trust `llm.txt` or this file's route table blindly.** `llm.txt` is *stale*: it describes
   an old horizontal-scroll homepage and a `/gear` route that no longer exist. Where they conflict,
   the code is the source of truth.

---

## 2. Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16, **App Router** | `next dev/build/start` (Turbopack) |
| UI runtime | React 19.2 | |
| Language | TypeScript 5, `strict: true` | |
| Styling | **Tailwind CSS v4** (CSS-first) + a large hand-written design system | No `tailwind.config.js` — config lives in `app/globals.css` under `@theme inline` |
| Animation | framer-motion 12, animejs 4, react-type-animation | |
| 3D | @react-three/fiber, drei, postprocessing | |
| Icons | react-icons 5 | Predominantly `react-icons/fi` and `react-icons/bs` |
| Data | axios, @tanstack/react-query, react-github-calendar | |
| Content | **MDX 3** via `@next/mdx` | Blog posts are `.mdx` files in `content/blog/` |
| Analytics | @vercel/analytics 1.5 + Google Analytics 4 | **Consent-gated** — see §9 |
| Lint | ESLint 9 flat config + eslint-config-next | `core-web-vitals` + `typescript` |
| Hosting | Vercel | |

Path alias is `@/*` → **repo root** (not `./src/*`). There is no `src/` directory.

**Package manager: npm.** The only lockfile is `package-lock.json`.

---

## 3. Commands

```bash
npm run dev      # dev server on :3000
npm run build    # production build (also runs typecheck)
npm start        # serve the production build
npm run lint     # eslint (bare, no path arg)

npx tsc --noEmit # typecheck only (no dedicated script exists)
```

> There is **no `test` script and no typecheck script.** `npm run build` is the type gate because
> Next runs TypeScript during the build.

---

## 4. Definition of done

Every change must pass all three, in this order:

```bash
npx tsc --noEmit   # 0 errors
npm run lint       # 0 errors (3 pre-existing warnings are tolerated — see below)
npm run build      # must succeed
```

The three tolerated warnings are pre-existing and unrelated to new work:

- `app/Components/page-loader.tsx` — `glitchTriggeredRef`, `sensors` unused
- `app/homelab/[slug]/client.tsx` — loop variable `i` unused

ESLint config deliberately relaxes `react-hooks/set-state-in-effect` and `react-hooks/purity` to
`off`, and `no-explicit-any` to `warn`. Don't "fix" these — you'll fight the existing codebase.

---

## 5. Architecture

```
app/
  layout.tsx              root: fonts, metadata, theme script, providers
  template.tsx            framer-motion fade applied to EVERY route
  globals.css             2505 lines — the entire design system
  robots.ts  sitemap.ts  opengraph-image.tsx
  (site)/                 ← commercial site, no URL segment
    layout.tsx            SiteHeader + <main id="main-content"> + SiteFooter
    page.tsx              HOME (450 lines)
    about/  work/  contact/  services/  resources/
    ai-automation/  case-studies/  cloud/  devops/  infrastructure/
    it-consulting/  pc-building/  pc-consulting/  pc-troubleshooting/
    pc-upgrades/  gaming-pcs/  workstations/  software-engineering/
    technical-leadership/
    case-studies/[slug]/  guides/[slug]/
    guides/
    blog/                 ← MDX posts
      page.tsx  [slug]/page.tsx  feed.xml/route.ts
    tools/pc-build/  tools/infrastructure-check/
    privacy/  terms/  cookies/        ← legal (see §10)
  homelab/                outside the group, own layout
    layout.tsx  page.tsx  [slug]/  [slug]/client.tsx
  LAN/                    outside the group, own layout
  Components/             NOTE: capital "C" — import as "@/app/Components/..."
content/
  blog/                  ← MDX posts; filename is the slug. See §13
mdx-components.tsx       global MDX element map (required by @next/mdx)
    site/                 ← the site design system (§7)
    main/                 legacy single-page sections (about, education, skills, …)
    game/ homelab/ lan/   animated-bar/ collectibles/ cursor-glow/ …
    footer.tsx  end.tsx   legacy footers, still tracked, see §11
lib/                      content data lives HERE, not in pages (§8)
```

Dynamic routes use **Next 16 async params**:

```tsx
interface Props { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> { … }
export default async function Page({ params }: Props) { … }
```

---

## 6. Adding a page — the three-file rule

This is the single most common way to break the site. A new route needs registration in **three**
places:

1. **`app/Components/site/site-header.tsx`** — add to `siteNavGroups` or `plainLinks`
2. **`app/Components/site/site-footer.tsx`** — add to the relevant `columns` array
3. **`app/sitemap.ts`** — add to `staticPages`

If the page is `/privacy`-style (legal) it is deliberately in the footer only, not the main nav.

### Existing routes

**Core:** `/` · `/about` · `/work` · `/contact` · `/services` · `/resources`

**Services (7, config in `lib/service-pages.tsx`):** `/software-engineering` · `/it-consulting` ·
`/infrastructure` · `/cloud` · `/devops` · `/ai-automation` · `/technical-leadership`

**PC building (6, config in `lib/pc-pages.tsx`):** `/pc-building` · `/gaming-pcs` · `/workstations` ·
`/pc-upgrades` · `/pc-troubleshooting` · `/pc-consulting`

**Content:** `/case-studies` (6) · `/case-studies/[slug]` · `/guides` (8) · `/guides/[slug]` ·
`/blog` · `/blog/[slug]` · `/blog/feed.xml` (RSS) · `/sitemap` (human-readable index)

**Tools:** `/tools/pc-build` · `/tools/infrastructure-check`

**Legal:** `/privacy` · `/terms` · `/cookies`

**Outside the group:** `/homelab` (2 items) · `/homelab/[slug]` · `/LAN`

---

## 7. Design system

All tokens are CSS custom properties in `app/globals.css`. The active theme is **Bauhaus
"daylight"** (defined at the top, then *overridden* again in the `BAUHAUS SYSTEM OVERRIDES` block
around line 1600 — later rules win, so read both if you're confused).

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#F0F0F0` | Page background |
| `--sheet` | `#FFFFFF` | Card surface |
| `--sheet-2` | `#E0E0E0` | Alternating section background |
| `--ink` | `#121212` | Text **and** borders |
| `--flag` | `#D02020` | Primary accent (red) |
| `--water` | `#F0C020` | Secondary accent (yellow) |
| `--bush` | `#1040C0` | Tertiary accent (blue) — also the focus ring |
| `--gravel` | `#4A4A4A` | Muted body text |
| `--rule` / `--rule-strong` | `#121212` | Hairlines / strong borders |
| `--fg` | `--ink` | Foreground text |

Fonts are `next/font/google`: **Outfit** (→ `--font-outfit`, weights 400/500/700/900) and
**Spline Sans Mono** (→ `--font-mono`). The Bauhaus override forces everything display to Outfit
900, uppercase, `letter-spacing: -0.055em`, `line-height: 0.92`.

### Reuse these classes — don't reinvent them

`apple-heading` · `apple-heading-compact` · `apple-subtitle` · `apple-eyebrow` ·
`apple-eyebrow-accent` · `apple-card` · `apple-card-flat` · `apple-tag` · `badge-est` ·
`rog-btn-primary` · `rog-btn-secondary` · `section-grid` · `divider-ornament` · `vintage-frame` ·
`hover-lift` · `link-underline` · `font-display`

### The canonical page skeleton

Every hand-built page follows this shape. **Sections alternate `--paper` and `--sheet-2`** and the
inner wrapper is almost always `max-w-7xl mx-auto px-6 md:px-14` (narrow/FAQ sections use
`max-w-3xl` or `max-w-4xl`).

```tsx
<PageHero … />
<section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
  <div className="max-w-7xl mx-auto px-6 md:px-14">…</div>
</section>
<section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
  <div className="max-w-7xl mx-auto px-6 md:px-14">…</div>
</section>
<CtaBand … />
```

`app/Components/site/` is the de-facto UI kit. There is **no** `components/ui` and **no**
shadcn/ui. Key primitives:

`PageHero` · `SectionHeading` · `CtaBand` · `CtaLink` / `CtaAnchor` · `buttonBase` · `Breadcrumbs` ·
`Faq` · `ProcessSteps` · `MetricCard` / `PillarCard` / `PcServiceCard` / `CaseStudyCard` /
`GuideCard` · `ServicePage` · `PcPage` · `CaseStudyPage` · `GuideArticle` · `LegalPage` ·
`ContactForm` · `pc-build-tool` · `infra-check-tool`

> **`buttonBase` is exported from `buttons.tsx` and must be used for any `<button>` that wears
> `rog-btn-primary`/`rog-btn-secondary`.** Those CSS classes assume an anchor and supply no
> `display`, no flex centering, and don't neutralise the button's UA `appearance`. Without
> `buttonBase` the button renders at a different height and alignment than every other CTA.

---

## 8. Where content lives

**Content is data, not markup.** Adding a guide or case study means adding an object to a `lib/`
file — not creating a page.

| File | Shape | Count |
| --- | --- | --- |
| `lib/site-config.ts` | **Single source of brand/contact truth.** Name, email, phone, WhatsApp, location, resume path, Formspree endpoint, GA ID, socials, service areas, metrics. Also `whatsappLink()` and `mailtoLink()` helpers. | — |
| `lib/guides.ts` | `Guide[]` + `guideClusters` + `relatedGuides()`. Guides are a typed block array (`p`, `h2`, `list`, `table`, `callout`) — `GuideArticle` renders them. | 8 |
| `lib/blog.ts` | Reads `content/blog/*.mdx` frontmatter at build time. `getAllPosts`, `getPost`, `getPostSlugs`, `getScheduledPosts`, `allTags`, `postsByTag`, `relatedPosts`, `adjacentPosts`, `latestPosts`, `formatDate`. Derives reading time and the TOC. **Server-only.** | 0 published |
| `lib/sitemap.ts` | Single source of truth for every indexable route. `getSitemapEntries()` feeds `app/sitemap.ts`; `getSitemapGroups()` feeds the `/sitemap` page. Add a page here once, not in two lists. | — |
| `lib/case-studies.tsx` | `CaseStudy[]`, rendered by `CaseStudyPage` | 6 |
| `lib/homelab-data.tsx` | `homelabItems[]` | 2 |
| `lib/service-pages.tsx` | `Record<string, ServicePageConfig>`, keyed `"/slug"` | 7 |
| `lib/pc-pages.tsx` | `Record<string, PcPageConfig>`, keyed `"/slug"` | 6 |
| `lib/services.ts` | `pillars`, `pricing`, `pcServices`, `pcBuildProcess`, `stackLayers` | — |
| `lib/seo.ts` | `pageMeta()` + JSON-LD builders (`webPageJsonLd`, `breadcrumbJsonLd`, `serviceJsonLd`, `faqJsonLd`, `articleJsonLd`, `blogPostingJsonLd`, `personJsonLd`) | — |
| `lib/cta-messages.ts` | `whatsappCtaMessage(key)` — pre-written WhatsApp openers | — |
| `lib/legal.ts` | Legal doc registry, controller details, "last updated" | — |
| `lib/consent.ts` | Cookie-consent model, storage, GPC/DNT detection, event bus | — |
| `lib/analytics.ts` | `track()` dispatcher → `window.dataLayer`. **Consent-aware** — see §9 | — |
| `lib/theme-config.ts` | Theme definitions | — |

> **Never hardcode** the name, email, phone, domain, social URLs or the GA measurement ID in a
> component. Import from `lib/site-config.ts`. The domain is duplicated in exactly 4 places
> (`site-config.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`) — keep them in sync.

---

## 9. Analytics & consent (important)

Google Analytics 4 and Vercel Analytics are **not** in `app/layout.tsx`. They are rendered by
`<ConsentProvider>` (`app/Components/site/consent-gate.tsx`) **only after a visitor opts in**, so
before consent the scripts are never even fetched.

```
lib/consent.ts                    storage key mfalme.consent.v1, read/write, GPC/DNT, events
app/Components/site/consent-gate.tsx     provider + useConsent() hook + the gated <Script>/<Analytics>
app/Components/site/cookie-consent.tsx    banner + accessible preference dialog
app/Components/site/cookie-settings-button.tsx   footer/settings trigger
```

- Consent state is `localStorage`, **not** a cookie, versioned via `CONSENT_VERSION`.
- `track()` in `lib/analytics.ts` **refuses to buffer** into `dataLayer` unless consent is granted,
  so a tag added later can't flush a pre-consent queue.
- `Global Privacy Control` and `Do Not Track` are honoured as opt-out defaults (not locks).
- The dialog implements a focus trap, Escape-to-close, scroll lock and focus restoration.

**If you add any new analytics, pixels, embeds or tracking, it must go behind the consent gate
and be declared in the `/cookies` inventory table.** That is the whole point of the architecture.

---

## 10. Legal pages

`/privacy`, `/terms`, `/cookies` — all built on the shared `LegalPage` component
(`app/Components/site/legal-page.tsx`), which supplies the hero, the document switcher, the summary
cards, a sticky "on this page" TOC, numbered sections, and a contact card.

- Applies to **Kenya's Data Protection Act 2019 (ODPC)** and **EU/UK GDPR** — the stricter of the two.
- `app/Components/site/legal-page.tsx` exports prose helpers: `LegalP`, `LegalList`, `LegalItem`,
  `LegalLink`, `LegalNote`, `LegalTable`, `LegalContactCard`.
- **When editing legal text, update `legalUpdated` / `legalUpdatedLabel` in `lib/legal.ts` and add
  a row to the revision-history table on that page.** The privacy policy and cookie policy both
  document a revision table; keeping them honest is the point.
- The cookie inventory table in `/cookies` lists every cookie by name/provider/purpose/duration.
  Keep it accurate.

---

## 11. Known-stale and dead things

Don't "fix" these unless asked; they're documented here so you don't waste time rediscovering them.

- **⚠️ `next` is below the security-fix threshold.** The installed `next@16.2.9` falls under
  `GHSA-p293-qw3h-jr36` (critical, unauthenticated RCE) and `GHSA-2xp9-vwfh-vxw4` (critical RCE in
  the Image Optimization API via AVIF). Both are fixed in `16.3.3`. The first explicitly affects
  **Windows-hosted servers**, so a `next dev` server bound to a LAN interface is exposed. Run
  `npm audit fix` and pin to `^16.3.3` or later. 13 transitive advisories are open in total.
- **`llm.txt` is stale.** Describes an old horizontal-scroll homepage and a `/gear` route. Wrong
  domain (`josephgitauc.vercel.app`). It also contains a stray agent-session note around lines
  146–147. Treat as junk; the code is authoritative.
- **`app/Components/main/*`** — legacy single-page sections. `about.tsx`, `education.tsx`, `skills.tsx`,
  `languages.tsx`, `techstack.tsx`, `competencies.tsx` are still rendered by `/about`. Others may be orphaned.
- **`app/Components/footer.tsx` and `app/Components/end.tsx`** — legacy footers, not the live footer.
- **Dead theme blocks** in `globals.css` for `night` / `synth` / `light` / `.homelab-theme` /
  `.gear-theme` — only `daylight` is reachable.
- **Tracked noise in git:** `dev-server.log`, `lighthouse-report.report.html`,
  `lighthouse-report.report.json`. Harmless but not source. Consider `git rm --cached`.
- **`.env.example` contains the placeholder text `" be back in a few"`** — not a real env file. The
  only real env is the GA ID, which is hardcoded in `lib/site-config.ts`.
- **`tsconfig.tsbuildinfo`** is generated and gitignored — safe to delete locally.

---

## 12. Content accuracy notes

- Case study metrics (uptime, cost reductions, hours saved) are **real figures from real
  environments**, provided as evidence of method, not as a guarantee. `/terms` §5 says so
  explicitly — keep that honest if you edit either.
- Career history lives in **two** places and they must agree: `app/Components/main/education.tsx`
  (`timelineItems`, the compact `/about` timeline) and `app/Components/main/mboka.tsx`
  (`experiences`, the detailed list). These have drifted before — check both when editing.
  - Umma University B.Sc. Computer Science 2021–2024
  - **VisionFund Kenya — Software Engineering Intern, Oct–Dec 2023** (career start)
  - Gituamba Girls — Software Consultant, Jan 2024–Mar 2025
  - Steadfast Academy — Engineering Team Lead & Head of IT, Apr 2025–Present
- There is **no X/Twitter account** on this site. `siteConfig.socials` contains only GitHub,
  LinkedIn and Instagram, and the X profile is deliberately absent from all JSON-LD `sameAs` arrays.
  The `twitter: { card: … }` blocks in the layouts are **Open Graph link-preview metadata** and
  must stay — they control how links render in Slack/WhatsApp/iMessage and have nothing to do with X.

---

## 13. Writing a blog post

`/guides` and `/blog` are deliberately separate. Guides answer a specific question directly
(`How much RAM do I need?`). The blog carries the reasoning, the trade-offs and what actually
happened. Both are static — no database, no CMS, no API.

**To publish, drop an `.mdx` file into `content/blog/`.** The filename is the slug. There is no
registration step, no page to create, and no rebuild beyond the normal Vercel deploy.

```text
content/blog/rebuilding-the-homelab.mdx   →   /blog/rebuilding-the-homelab
```

### Frontmatter

| Field | Required | Purpose |
| --- | --- | --- |
| `title` | yes | Post headline and `<h1>` |
| `description` | yes | Card text, meta description, RSS item |
| `datePublished` | yes | `YYYY-MM-DD`. Drives sort order |
| `dateModified` | no | Renders an "Updated" line when it differs from published |
| `publishOn` | no | Withhold the post until this date. Defaults to `datePublished` |
| `tags` | no | Powers the filter pills and related-post matching |
| `cover` | no | Path to an image under `public/`. Omit for a generated placeholder |
| `draft` | no | `true` hides the post from the index, feed, sitemap and routing |

Malformed frontmatter **fails the build** rather than rendering a broken page.

**Full authoring guide: [`content/blog/README.md`](content/blog/README.md).**
Scheduling is covered separately in [`SCHEDULING.md`](SCHEDULING.md), with the
currently pending scheduled posts listed in
[`PUBLISH-REMINDER.md`](PUBLISH-REMINDER.md).

### Body

Start at `##` — the `<h1>` is rendered from frontmatter, so a leading `#` would duplicate it.
`##` and `###` headings automatically populate the "on this page" table of contents.

Styling comes from `mdx-components.tsx`, which maps every element onto the Bauhaus tokens so posts
match the block-rendered guides. GFM tables, fenced code, blockquote callouts and `next/image` all
work. To restyle posts, edit that one file — it affects every post at once.

### Cover images

Put files in `public/images/blog/`. A post without `cover` renders a Bauhaus composition
generated from its slug, so the index grid stays visually even. The composition is **seeded from
the slug**, so a given post always draws the same shapes — deterministic across builds, identical
on every device, no hydration mismatch.

### Drafts

`content/blog/how-to-write-a-post.mdx` ships as a `draft: true` template. Delete it whenever you
like.

### Scheduling

`publishOn` withholds a post until its date passes; the post then appears on the next deploy.
A static site has no clock of its own, so a scheduled post needs a build on the day — see
[SCHEDULING.md](SCHEDULING.md) for the options and why no cron is checked in.

> **Do not leave `content/blog/` completely empty.** `app/(site)/blog/[slug]/page.tsx` imports MDX
> via a template-literal specifier, which Turbopack resolves against a glob of the directory. With
> zero files there is nothing to resolve and **the build fails** with
> `Module not found: Can't resolve '@/content/blog/'`. Keeping one draft (or any post) in the
> directory avoids this. `/blog` itself handles the empty state correctly and shows a call-to-action
> panel instead of a blank grid.

### RSS

`/blog/feed.xml` is hand-rolled RSS 2.0 in `app/(site)/blog/feed.xml/route.ts` — no dependency.
It prerenders at build time and is valid-but-empty when no posts are published.
