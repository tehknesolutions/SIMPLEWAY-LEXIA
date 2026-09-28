# LEXIA Alpha — A0/A1 Progress

Date: 2026-09-28

## Delivered
- Canonical A0/A1 implementation plan.
- pnpm monorepo workspace foundation.
- strict shared TypeScript baseline.
- first pure domain package: `@lexia/learning-domain`.
- multidimensional learner model foundation.
- append-only learning evidence with explicit provenance.
- duplicate-evidence and cross-learner guards.
- focused Vitest specification for the first domain behavior.

## Architectural evidence
`packages/learning-domain` has no React, Next.js, Phaser or Supabase dependency. Learning evidence is explicit by `skillId`, `dimension`, `activityId`, `curriculumVersion`, learner and occurrence time.

## Verification state
`IMPLEMENTED / UNVERIFIED`

This ChatGPT GitHub connector can mutate repository files but does not expose a package runner in this conversation. No claim of green tests is made. Fresh executable evidence is required before A0 or A1 can be marked VERIFIED.

## Next
Task 3: versioned Alpha curriculum content boundary, then Session Director.
