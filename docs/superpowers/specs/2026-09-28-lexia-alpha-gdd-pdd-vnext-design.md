# LEXIA Alpha — GDD/PDD vNext Design

**Status:** DESIGN SPEC — awaiting final review gate  
**Date:** 2026-09-28  
**Product authority:** `tehknesolutions/SIMPLEWAY-LEXIA`  
**Legacy evidence:** `Tehkne-Solutions/lexia-game`  
**Knowledge / lineage:** `tehknesolutions/tehkne-os`

## 1. Product Thesis

LEXIA is a literacy adventure for children aged 4–6 in which language is a creative force. The learner does not experience a worksheet sequence disguised as a game: listening, distinguishing, associating, recognizing, constructing and recalling language causes the playable world and its companion creature to awaken and grow.

Child-facing promise: **Aprenda os sons e desperte o mundo.**

Alpha exists to prove one thing: a child can repeatedly complete a short, joyful, adaptive literacy loop, retain what was learned, understand their progress without needing to read the interface, and want to return.

## 2. Target Learner

Primary Alpha audience: children aged **4–6**, in pre-literacy / emergent literacy.

Consequences:
- reading cannot be a prerequisite for navigation;
- spoken instruction, symbols, animation, touch and demonstration are first-class;
- text supports adults and emerging readers but does not carry critical child instructions alone;
- interactions must tolerate developing fine-motor control;
- sessions should be short, resumable and non-punitive;
- adult configuration and child play are distinct surfaces.

## 3. Lexia Method v0.1

LEXIA uses a hybrid adaptive foundation and expresses it through an original pedagogical model.

Core learning progression:

`escutar -> distinguir -> associar -> reconhecer -> construir -> pronunciar -> escrever/desenhar -> recordar -> combinar -> compreender`

The method combines:
- phonological awareness;
- phoneme–grapheme association;
- early grapheme recognition;
- syllabic construction;
- vocabulary and meaning;
- retrieval practice;
- spaced/adaptive review;
- multimodal practice.

The system models skills separately. Recognizing a symbol, distinguishing its sound, associating sound and grapheme, producing it, and combining it are not collapsed into one mastery percentage.

Alpha must remain deterministic and auditable. Generative AI is not required to decide curriculum, mastery, rewards or safety-critical child interactions.

## 4. Fantasy and World

Language is a force that gives form and meaning to the LEXIA universe.

For the child, the cosmology stays simple: sounds awaken symbols; symbols combine; combinations create meaning; learning restores life to the world.

LEXIA uses **one continuous world** divided into pedagogical regions. The world begins partially dormant. Learning changes it permanently: vegetation returns, creatures appear, paths open, objects gain names/sounds and the environment becomes richer.

Pedagogical progression and fantasy progression are two representations of the same event. Arbitrary XP is not the primary progression truth.

## 5. Companion

The learner receives a language creature that is born near the beginning of the journey.

The companion:
- guides without requiring reading;
- celebrates effort and learning;
- reacts to learner state;
- visually evolves with meaningful progress;
- provides contextual demonstrations and prompts;
- acts as the emotional interface to the Learning Engine without owning pedagogical authority.

Alpha companion behavior is authored/deterministic. Architecture may later support constrained generative behavior behind explicit safety and content boundaries, but the Alpha does not depend on it.

## 6. Core Gameplay Loop

Canonical session loop:

`Enter -> Companion invitation -> Short mission -> Small exploration -> 2–3 microgames -> Learning evidence -> World awakening -> Companion reaction -> Next discovery`

Target guided session duration: approximately **3–5 minutes**.

Exploration can continue outside the guided mission, but Alpha is not an open-world project. Exploration is intentionally small and controlled.

A successful session should produce:
1. observable learning evidence;
2. an understandable world change;
3. an emotionally positive companion response;
4. a persisted learner state;
5. a clear return point.

## 7. Alpha Curriculum Scope

Alpha prioritizes depth over the legacy product's breadth.

The first complete learning arc covers:
- phonological listening/discrimination;
- initial grapheme/letter discovery;
- sound-symbol association;
- recognition and recall;
- touch/manipulation activities;
- tracing/drawing where appropriate;
- an initial bridge from learned sounds/letters into simple syllabic construction.

The exact authored grapheme/phoneme sequence is curriculum content and must be versioned separately from engine code.

The Alpha does **not** require all five legacy chapters or all 106 legacy targets.

## 8. Alpha Interaction Families

Alpha should prove three strong reusable interaction families rather than many shallow minigames:

1. **Listen & Choose** — hear a target and identify/discriminate it visually or aurally.
2. **Build & Match** — manipulate symbols/sounds to create an association or early combination.
3. **Trace & Create** — gesture/draw/trace a grapheme with forgiving feedback appropriate for 4–6-year-old motor control.

Each family exposes a renderer-independent result contract so learning evidence is owned by the domain rather than Phaser scenes.

## 9. Product Surfaces

### Child
- child entry / learner selection;
- living-world home;
- current mission;
- playable world exploration;
- microgames;
- companion moments;
- lightweight practice/replay;
- progress manifested in the world.

### Parent / responsible adult
Alpha parent surface is deliberately small:
- account/authentication;
- learner profile;
- recent sessions;
- current learning focus;
- strengths / needs derived from learner evidence;
- recommended next focus;
- basic settings and privacy controls.

Complex reports, email programs and achievement administration are post-Alpha unless evidence proves they are necessary.

## 10. Explicit Alpha Non-Goals

Do not carry legacy breadth forward automatically. Alpha excludes by default:
- store/economy;
- leaderboards/social competition;
- large collectible systems;
- multiple parallel side modes;
- extensive story library;
- speed challenge;
- complex email reporting;
- broad achievement matrices;
- open world;
- mandatory generative AI;
- full legacy curriculum migration;
- migration of legacy learner history.

Legacy systems remain evidence and may be reintroduced only when they support an observed product need.

## 11. Technical Stack

Approved Alpha base:

- **Next.js + React + TypeScript** — product shell, parent surfaces, routing and web platform integration;
- **Phaser** — playable 2D world and microgame rendering;
- **Supabase** — authentication, PostgreSQL persistence and storage;
- **PWA** — installable mobile-first delivery and controlled offline capabilities;
- **Vitest** — deterministic domain/unit/contract tests;
- **Playwright** — browser/E2E and critical mobile viewport evidence.

Visual direction is **premium animated 2D**, using parallax, particles, authored transitions and cinematic moments. Renderer contracts must not make the learning model dependent on Phaser, preserving a future path toward richer 2.5D presentation.

## 12. Architecture

Canonical dependency direction:

`Product Shell -> Application Use Cases -> Domain Engines -> Ports`

Adapters implement ports for Phaser, Supabase, browser audio, storage and telemetry.

Five conceptual engines organize behavior:

### Learning Engine
Owns what should be learned/reviewed and evaluates evidence against curriculum rules.

### Learner Model
Owns the learner's evidence-derived skill state. It distinguishes dimensions such as discrimination, recognition, association, production and combination.

### Session Director
Builds a short session from learner state, curriculum constraints and authored activity inventory. It decides what happens now, not what mastery means.

### World Engine
Maps verified learning/progression events to persistent world-state transformations. It never invents mastery.

### Companion Engine
Maps learner/session/world context to authored reactions, prompts and evolution states. It never grants pedagogical progress.

### Game Runtime
Phaser executes scenes, input, camera, animation and microgame presentation. It emits interaction results through contracts; it does not own curriculum or persistence policy.

## 13. Suggested Code Boundaries

Initial target shape:

```text
apps/
  web/                  # Next.js product shell
packages/
  learning-domain/      # curriculum, evidence, mastery, adaptation
  session-domain/       # session planning and mission state
  world-domain/         # world progression model
  companion-domain/     # companion state/reactions
  game-contracts/       # renderer-independent game IO contracts
  content/              # versioned authored curriculum/world content
  platform/             # shared ports/contracts where justified
  ui/                   # product-shell UI primitives
  game/                 # Phaser runtime/scenes/adapters
supabase/
  migrations/
  seed/
tests/
  e2e/
```

Boundaries may be refined during implementation planning, but domain packages must remain independent of React, Phaser and Supabase.

## 14. Core Domain Model

Minimum conceptual entities:
- `Learner`
- `Skill`
- `CurriculumNode`
- `ActivityDefinition`
- `LearningEvidence`
- `Attempt`
- `SkillState`
- `Mission`
- `Session`
- `ProgressionEvent`
- `WorldState`
- `WorldTransformation`
- `CompanionState`
- `RewardEvent`

Do not reproduce legacy key-prefix polymorphism such as using string namespaces as the primary type system. Persistence should carry explicit `skill_type`, `skill_id`, `curriculum_node_id`, version and provenance fields where applicable.

## 15. Data Flow

Canonical successful interaction:

`Phaser interaction -> Game result -> Application use case -> Learning evidence -> Learning Engine -> Learner Model update -> Progression event -> World/Companion projection -> Persistence -> UI/game projection`

Critical rule: presentation cannot directly mutate mastery.

World and companion state are projections of authoritative learning/progression events and should be rebuildable where practical.

## 16. Persistence and Offline Direction

Server persistence remains authoritative for accounts and durable learner progress.

PWA/offline support in Alpha is intentionally limited:
- cache shell and required authored assets;
- permit safe continuation where a bounded session has already been materialized;
- queue only operations with explicit idempotency semantics;
- reconcile on reconnect;
- never silently manufacture mastery when synchronization fails.

A fully offline curriculum platform is not an Alpha requirement.

## 17. Child Safety and Privacy

LEXIA is designed for young children, so data minimization is architectural rather than cosmetic.

Principles:
- adult-controlled account boundary;
- child profile stores only what is necessary for learning/product function;
- no behavioral advertising;
- no public child profiles;
- no child-to-child messaging in Alpha;
- no open-ended generative conversation in Alpha;
- strict Supabase RLS and ownership boundaries;
- telemetry avoids raw sensitive content and unnecessary identifiers;
- microphone/camera features, if later introduced, require explicit product/privacy design rather than incidental browser permission requests.

Legal/compliance requirements for target launch jurisdictions must be reviewed before public release; this spec is a product/architecture design, not legal advice.

## 18. UX Principles for Ages 4–6

- spoken + visual instruction before textual explanation;
- one primary action at a time;
- large forgiving targets;
- immediate audiovisual feedback;
- failure is information, not punishment;
- no shame mechanics, loss streaks or coercive retention;
- replay and demonstration are always accessible;
- animation communicates state but must not block repeated interaction unnecessarily;
- parent-only actions require a clear adult boundary;
- accessibility includes reduced motion, audio controls, contrast and non-audio reinforcement.

## 19. Product Measurement

Alpha telemetry exists to answer product/learning questions, not maximize compulsive engagement.

Key measures:
- mission start/completion;
- session completion and voluntary return;
- interaction error/retry patterns;
- skill evidence progression;
- retention of previously learned material;
- time-to-understand interaction patterns;
- abandonment points;
- parent comprehension of learner state;
- technical reliability/performance.

Do not optimize Alpha around raw time-on-device.

## 20. Alpha Roadmap

### A0 — Re-Foundation
Canonical GDD/PDD, architecture, domain language, curriculum-content boundary, design system foundations, repository/tooling and safety/privacy baseline.

### A1 — Vertical Slice
One complete path: adult/learner entry -> living world -> mission -> microgame sequence -> evidence -> persisted progress -> visible world transformation -> return state.

### A2 — Learning Engine
Versioned curriculum graph, multidimensional skill state, evidence evaluation, adaptive selection/review and deterministic session planning.

### A3 — Core Game
Alpha learning content, three reusable interaction families, audio, companion feedback, world reactions and polished mobile interaction.

### A4 — First Reading Bridge
Use learned sound-symbol relationships to construct the first simple syllabic combinations, proving progression beyond alphabet recognition.

### A5 — Learner Journey
Compact continuous world, mission continuity, lightweight free practice and persistent transformations.

### A6 — Parent Alpha
Learner management, recent progress, current focus, strengths/needs and next recommendation.

### A7 — Alpha Hardening
PWA/offline-lite, RLS/security review, accessibility, performance budgets, telemetry validation, browser/device evidence and closed-alpha packaging.

## 21. Alpha Exit Criteria

Alpha is not defined by curriculum breadth. It is achieved when:
- a 4–6-year-old can navigate the child loop without reading instructions;
- a learner can complete repeated 3–5 minute sessions;
- the system adapts subsequent sessions from persisted learning evidence;
- the first learning arc reaches a simple syllabic bridge;
- learning causes persistent, understandable world/companion change;
- progress survives logout/reload/re-entry correctly;
- the parent can understand current focus and next recommendation;
- core flows meet agreed mobile performance/accessibility targets;
- domain and persistence boundaries have executable contract coverage;
- critical child/parent paths have Playwright evidence;
- privacy/security gates are satisfied for closed Alpha.

## 22. Legacy and TEHKNÉ-OS Relationship

`Tehkne-Solutions/lexia-game` is **Legacy Source / Archaeology**, not implementation authority. Its five-chapter journey, 106-target model, learning-engine experiments, parent insights, practice, daily challenge, world/relic systems and operational lessons are evidence to mine selectively.

`tehknesolutions/SIMPLEWAY-LEXIA` is the **operational product authority** for the reboot.

`tehknesolutions/tehkne-os` is the **knowledge, lineage, evidence and RAG authority**. Decisions, extracted legacy knowledge, provenance and cross-repository relationships should be registered there without making TEHKNÉ-OS the product runtime repository.

No legacy feature enters the reboot solely because it already exists.

## 23. Architecture Decision Summary

Approved design decisions:
- audience: 4–6;
- pedagogy: hybrid adaptive foundation + original Lexia method;
- fantasy: language as a creative force;
- companion: evolving language creature, deterministic in Alpha;
- core loop: guided mission + controlled exploration + microgames + world transformation;
- world: one continuous growing world with pedagogical regions;
- rendering: premium 2D Alpha with future 2.5D-compatible boundaries;
- stack: Next.js + TypeScript + Phaser + Supabase + PWA;
- authority: new repo is canonical product; old repo is legacy evidence; TEHKNÉ-OS is RAG/lineage.

## 24. Next Gate

After this written spec is reviewed and approved, the next artifact is the implementation plan. Implementation must not begin from this design spec alone.
