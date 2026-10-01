# Case Study Motion Graphics

Every approach section on `/case-studies/[slug]` carries an animated diagram that
illustrates it. This is the authoring guide: what a graphic must do, how to add
one, and the rules that keep them consistent.

---

## 1. The convention

**Every entry in `study.approach[]` has a `visual`.** Not optional in spirit — if you
add a section, you add its graphic. A section with no graphic is the one thing this
system is meant to prevent.

```ts
{
  heading: "Raft consensus & replicated KV",
  body: "Leader election, log replication, heartbeats…",
  visual: "atlas-raft",          // ← the graphic
}
```

The graphic renders **below** the section's body text, inside the same card.

---

## 2. How a graphic is wired

Four files, in order:

| Layer | File | Role |
| --- | --- | --- |
| Data | [`lib/case-studies.tsx`](../lib/case-studies.tsx) | `visual` field + the `VisualKey` union |
| Registry | [`motion/registry.ts`](./app/Components/site/motion/registry.ts) | key → component map |
| Renderer | [`motion/section-visual.tsx`](./app/Components/site/motion/section-visual.tsx) | looks up and renders |
| Render point | [`case-study-page.tsx`](./app/Components/site/case-study-page.tsx) | one line in the `approach.map()` |

The chain is **compile-time checked in both directions**, which is the whole point:

```ts
// registry.ts
} as const satisfies Record<VisualKey, VisualComponent>;
```

- A section citing a key with no component → **TypeScript error**.
- A component registered under a key missing from the `VisualKey` union → **TypeScript error**.

Neither mistake reaches a build. There is no runtime fallback to silently swallow a
missing diagram; `SectionVisual` returns `null` only so a page still renders while
you are mid-edit.

---

## 3. Adding a new graphic

1. **Write the component** in the matching file under `motion/visuals/` (`atlas.tsx`,
   `nexus.tsx`, `cs2rgb.tsx`, `school-erp.tsx`, `infrastructure.tsx`, `automation.tsx`,
   `neo-learn.tsx`).

   ```tsx
   export function MyVisual() {
     return (
       <VizFrame title="Diagram: …" caption="short summary">
         <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
           <VizNode x={2} y={30} w={40} h={20} label="EVENT" index={0} />
           <VizEdge path="M 42 40 L 56 40" index={0} />
           <VizFlow path="M 42 40 L 56 40" index={0} />
         </svg>
       </VizFrame>
     );
   }
   ```

2. **Add the key to the `VisualKey` union** in `lib/case-studies.tsx`.
3. **Register it** in `motion/registry.ts`, grouped under its case study's comment.
4. **Reference it** from the section: `visual: "my-key"`.

In dev, `auditVisuals()` warns about any registered graphic no case study uses —
call it from a page or leave it for manual use.

Naming: `<case-study-prefix>-<topic>`, kebab-case. Prefixes are `atlas`, `nexus`,
`cs2rgb`, `erp`, `infra`, `automation`, `neo`.

---

## 4. The primitive kit

All in [`motion/viz-primitives.tsx`](./app/Components/site/motion/viz-primitives.tsx).
Rebuild diagrams from these rather than hand-rolling SVG, so they stay on-palette.

| Primitive | Use |
| --- | --- |
| `VizFrame` | The box. Reserves space, owns `role="img"`, handles the entrance. **Always use it.** |
| `VizNode` | Bordered labelled box. Auto-fits its label to its own width. |
| `VizEdge` | Connector that draws itself via `pathLength`. `dashed` for secondary links. |
| `VizFlow` | Looping packet along a path. **Never renders under reduced motion.** |
| `VizBar` | Horizontal meter for numeric outcomes. |
| `VizLabel` | Small caption text inside a diagram. |

`VIEWBOX` is `"0 0 160 90"` — a 16:9 box. Lay out in those units.

### What each graphic should be

Purpose first. Ask what the diagram *tells the reader* that the paragraph does not.

| Section describes | Draw |
| --- | --- |
| Architecture, topology, modules | `VizNode` + `VizEdge` |
| A sequenced pipeline | nodes in a row + `VizFlow` packets |
| Consensus, sharding, traversal | rings, leader/follower, highlighted paths |
| Numeric outcomes | `VizBar`, one per metric |
| Gates, tiers, permission classes | ordered ramps via `TierLadder` |
| A loop or retry behaviour | a path that returns to its origin |

A bar chart is not a substitute for an architecture diagram. If a section explains
how two systems talk, draw two systems talking.

---

## 5. Hard rules

These are the constraints every graphic must satisfy.

**Tokens only.** Colour comes from the existing CSS custom properties — `--ink`,
`--flag`, `--bush`, `--water`, `--gravel`, `--sheet`, `--sheet-2`. Never hard-code a
hex value. A diagram re-themes across Bauhaus day, Field Station night and synth for
free as a result.

**`VizNode` tone semantics.** `ink` / `muted` are structural. `flag`, `bush` and
`water` are the only accent tones, and each should mean the same thing as it does
elsewhere on the site: `flag` = the thing that matters or the gate, `bush` = the
healthy or resolved outcome, `water` = the state being stored.

**`transform` and `opacity` only.** Never animate `width`, `height`, `top` or `left`.
`VizBar` scales with `transform: scaleX` and a fixed width for this reason.

**No layout shift.** `VizFrame` holds a fixed `aspectRatio`, so the page does not jump
as diagrams reveal.

**One star.** A diagram should have one focal element — the node, bar or path the
section is about. Everything else stays structural.

**Timing.** Stagger is `0.06s`, most reveals `0.32–0.55s`, nothing blocks past ~1s.
`VizFlow` loops every ~3s and is the only continuous motion.

---

## 6. Reduced motion

Every graphic honours `prefers-reduced-motion`, via `useSectionMotion()` in
[`lib/motion.ts`](../lib/motion.ts). **Under reduced motion a diagram renders
complete and static at its final state** — not hidden, not mid-animation. A reader
who has asked for less motion gets the same information, immediately.

> The global `prefers-reduced-motion` block in `app/globals.css` forces
> `animation-duration: 0.01ms !important`. That neutralises CSS keyframes but **not**
> framer-motion, which writes inline styles. That is why these graphics check the hook
> themselves. If you add motion outside this kit, you owe it the same check.

`useSectionMotion()` also returns `reduced` on low-performance devices, where the same
static rendering is the right response for a different reason.

---

## 7. Accessibility

- `VizFrame` requires a `title` that **describes the diagram**, not the section. It
  becomes the `aria-label` on a `role="img"` container, so a screen reader user gets
  the picture's content. Write it as prose: *"Diagram: a leader replicating log entries
  to two followers."*
- `caption` is optional and short. It is the visible line under the box.
- Nothing here hides content — the section's text is always present in the DOM and
  unaffected by the graphic.

---

## 8. Verify

```bash
npx tsc --noEmit   # 0 errors — catches missing/mistyped keys
npm run lint      # 0 errors (3 pre-existing warnings are tolerated)
npm run build     # must succeed
```

Then check by hand:

```bash
npm run dev
```

- Visit every `/case-studies/<slug>` and confirm each diagram appears and reveals on scroll.
- Enable reduced motion (OS setting, or Chrome's
  `--force-prefers-reduced-motion`) and confirm all diagrams are fully drawn and static.
- Check a mobile viewport — diagrams are SVG so they scale, but check label legibility.

Screenshots are useful for catching **overflow**: SVG text that exceeds the 160-unit
viewBox gets clipped. `VizNode` auto-fits its label, so node labels are safe, but
free `VizLabel` text at large widths can still run off the edge.