# Alpha A0/A1 — Curriculum + Session Increment

Date: 2026-09-28
Branch: `feat/a0-curriculum-session`

## Delivered
- versioned `@lexia/content` package;
- explicit curriculum nodes, skill dimensions, activity families and prerequisites;
- first authored Alpha arc for sound/grapheme `A`;
- pure `@lexia/session-domain` package;
- deterministic `LearnerModel + Curriculum -> MissionPlan` boundary;
- mission selection cannot bypass explicit prerequisites;
- focused tests authored before implementation files.

## Authority
Content owns authored curriculum structure. Learning Domain owns evidence/learner state. Session Domain chooses the next available mission but does not redefine mastery. React, Phaser and Supabase are absent from these packages.

## Verification
`IMPLEMENTED / UNVERIFIED`.

The available GitHub execution surface does not run pnpm/Vitest, so no green claim is made. Fresh executable RED/GREEN evidence remains required before merge/verification.

## Next
Game Contracts: renderer-independent mission/activity input and interaction result contracts, followed by the first vertical path from game result to `LearningEvidence`.
