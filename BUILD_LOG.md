# Build log

## 2026-10-07 — Case-study transfer motion

- Made diagram traffic more legible: transfer paths now show a direction arrow, marching
  dashes and a looping square packet using the site's existing theme tokens.
- Kept reduced-motion behavior informative: packets and moving dashes stop, while
  arrowheads remain to communicate direction.
- Added transfer motion only to case-study edges representing actual data, event,
  request, replication or workflow-state movement; static metrics and relationships
  remain still.
- Updated `MOTION_GRAPHICS_CASE_STUDIES.md` and the bundled motion-graphics skill with
  the directional-flow convention and its reduced-motion requirements.
- Validation: production build, TypeScript, ESLint and whitespace checks passed.
