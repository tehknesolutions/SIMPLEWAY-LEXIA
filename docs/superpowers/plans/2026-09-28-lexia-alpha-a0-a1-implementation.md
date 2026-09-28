# LEXIA Alpha A0–A1 Implementation Plan

**Goal:** establish the new repository foundation and prove one complete child learning loop without importing legacy implementation authority.

**Architecture:** pnpm workspace. Next.js product shell in `apps/web`; pure TypeScript domain packages for learning, session, world and companion; renderer-independent game contracts; Phaser adapter in `packages/game`; Supabase only behind persistence ports. Domain packages MUST NOT import React, Next.js, Phaser or Supabase.

**Verification:** Vitest for domain/contract tests; Playwright for the vertical slice. Every behavior task starts with a failing test and ends with fresh executable evidence before being marked verified.

## Task 1 — Workspace foundation
Create root `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.gitignore`, and `README.md`. Add workspace scripts for `typecheck`, `test`, `lint`, and `test:e2e`. No product behavior yet.

## Task 2 — Learning evidence contracts
Create `packages/learning-domain` with explicit `Skill`, `LearningEvidence`, `SkillState` and `LearnerModel` contracts. Write tests first for evidence application: correct evidence strengthens only the targeted skill/dimension; unrelated skills remain unchanged; attempts are append-only/provenance-bearing.

## Task 3 — Alpha curriculum content boundary
Create `packages/content` with versioned curriculum schema and a minimal authored first node. Content declares skill IDs, prompts/assets by reference, interaction family and prerequisites; engine code does not hardcode the curriculum sequence. Validate content with tests.

## Task 4 — Session Director
Create `packages/session-domain`. Given learner state + curriculum snapshot, deterministically produce a 3–5 encounter mission. Tests cover new learner, review-needed learner, deterministic seed, and no mutation of learner state.

## Task 5 — Game result contracts
Create `packages/game-contracts` defining renderer-independent `GameEncounter`, `GameResult` and translation to `LearningEvidence`. Tests ensure Phaser-specific types never enter domain contracts.

## Task 6 — World projection
Create `packages/world-domain`. A verified `ProgressionEvent` projects to an idempotent `WorldTransformation`. Tests cover first awakening, replay/idempotency and unrelated events.

## Task 7 — Companion projection
Create `packages/companion-domain`. Authored deterministic reactions consume session/world context; companion never grants mastery. Tests cover celebration, retry encouragement and evolution threshold projection.

## Task 8 — Next.js shell + Phaser boundary
Create `apps/web` and `packages/game`. Next.js owns routing/adult shell; Phaser owns playable canvas/scenes. A thin adapter receives `GameEncounter` and emits `GameResult`. Add a smoke test that domain packages have no renderer/framework imports.

## Task 9 — Supabase persistence port
Define persistence interfaces at application boundary, then implement Supabase adapter plus initial migrations for adult account ownership, learner profile, sessions, attempts/evidence and projection state. RLS must enforce adult ownership. Persistence writes use stable IDs/idempotency where retries are possible.

## Task 10 — A1 vertical slice
Implement one complete mission: learner entry -> living-world scene -> companion invitation -> Listen & Choose encounter -> Build & Match encounter -> evidence evaluation -> learner update -> progression event -> visible world awakening -> companion reaction -> persistence -> reload/resume. Keep authored scope intentionally tiny.

## Task 11 — E2E evidence
Playwright mobile viewport test proves the vertical slice, reload persistence, no-reading critical navigation path, and adult/child boundary. Add accessibility smoke checks and performance budget capture.

## Task 12 — A1 gate
Run `pnpm install`, `pnpm typecheck`, `pnpm test`, `pnpm lint`, `pnpm test:e2e`. Record exact command evidence in `docs/progress/`. A1 is not VERIFIED until all required commands pass freshly.

## A1 Exit Contract
A1 is complete only when one real learning interaction produces durable evidence and the resulting learning event changes the world and companion, survives reload, and is proven by automated tests. Breadth, extra worlds, economy, social, generative AI and legacy feature migration remain out of scope.
