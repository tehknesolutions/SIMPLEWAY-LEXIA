# ADR-0001 — Lexia Learning Architecture v0.2

Status: PROPOSED — review gate
Date: 2026-09-29
Supersedes: none; refines the GDD/PDD vNext architecture

## Context

The initial reboot proved a useful boundary between Learning Domain and Session Domain, but its readiness state is intentionally primitive. Cross-repository review found mature patterns already present in the Tehkné/SimpleWay ecosystem and in Lexia legacy archaeology.

The Alpha must benefit from those patterns without turning A1 into a generalized learning-platform rewrite.

## Decision

Lexia adopts an evidence-first, policy-driven architecture.

### Authoritative layers

1. **Curriculum/Content** — authored, versioned, validated definitions.
2. **Activity Contract** — pedagogical interaction requirements independent of renderer.
3. **Evidence History** — durable learning events produced from evaluated interactions.
4. **Capability Projection** — reconstructable learner state derived from evidence.
5. **Progress Policy** — determines readiness/review/next pedagogical state.
6. **Session Director** — decides what happens now using curriculum + capability + policy outputs.
7. **Game Runtime** — renders/executes activities and emits interaction results.
8. **World/Companion** — project verified progression into fantasy/emotional state.

### Core invariants

- `InteractionResult != LearningEvidence` until an evaluation contract interprets it.
- `LearningEvidence != Mastery`.
- `ContentCompletion != Mastery`.
- `ActivityContract != Renderer`.
- `ActivityContract != EvaluationPolicy`.
- `SessionDirector != LearningPolicy`.
- `WorldState != LearningAuthority`.
- Supabase is persistence/adapters, not domain policy.

## Alpha contracts

### EvidenceEvent

Minimum common envelope:

```ts
interface EvidenceEvent {
  evidenceId: string;
  learnerId: string;
  capabilityId: string;
  dimension: string;
  activityId: string;
  activityVersion: string;
  curriculumVersion: string;
  occurredAt: string;
  outcome: "success" | "retry";
  value?: number;
  confidence?: number;
  assistanceLevel?: number;
  attempts?: number;
  modality?: string;
  latencyMs?: number;
  context?: Record<string, string | number | boolean>;
}
```

Only fields justified by an activity/evaluation contract need to be populated. Data minimization applies to child telemetry.

### CapabilityState

A projection, never the primary historical record. Alpha may expose `unseen | practicing | ready` while preserving a path to richer multidimensional state.

### ProgressPolicy

Owns the rule that maps evidence/capability to pedagogical readiness and review. The current `3 successes and success >= retries*2` rule becomes `alpha-readiness-v0`, explicitly provisional and versioned.

### ActivityContract

Minimum shape:

```ts
interface ActivityContract {
  id: string;
  version: string;
  capabilityId: string;
  dimension: string;
  family: "listen-choose" | "build-match" | "trace-create";
  inputModality: readonly string[];
  responseModality: readonly string[];
  allowedSupports: readonly string[];
  evaluationPolicyId: string;
}
```

Phaser receives a materialized activity instance derived from this contract. It does not know mastery thresholds.

## Handwriting/tracing specialization

`trace-create` may emit renderer metrics such as stroke path, direction and timing, but those metrics are not learning evidence until an evaluation policy maps them to pedagogical dimensions.

Candidate dimensions for later validation: control, directionality, shape fidelity, sequence, independence and fluency.

No biometric-style raw stroke retention is required by default; store only what is pedagogically necessary.

## Content pipeline

Target:

`authored source -> schema validation -> semantic validation -> compile -> versioned runtime artifact -> activity materialization`

Runtime must not silently invent missing curriculum/content.

## Persistence

Durable evidence should be append-oriented and idempotent by `evidenceId`. Capability state may be persisted as a cache/projection but must be reproducible where practical. Policy and content versions travel with evidence/projections to preserve interpretability.

## Migration from current reboot code

Do not discard the current A0/A1 implementation.

1. Rename/reframe current `LearningEvidence` toward `EvidenceEvent` without broad feature expansion.
2. Move the readiness formula behind a versioned `ProgressPolicy` implementation.
3. Keep current `SkillReadiness` as the first `CapabilityState` projection.
4. Change Session Domain to consume policy/projection outputs only.
5. Add `game-contracts` with ActivityContract and InteractionResult.
6. Add one evaluation adapter for `listen-choose` to close the first end-to-end evidence loop.
7. Defer sophisticated confidence/retention/handwriting scoring until after A1 works.

## Consequences

Positive:
- pedagogy is testable independently of Phaser;
- learner state can evolve without schema-by-UI coupling;
- legacy and sibling-project knowledge is incorporated without copying entire systems;
- future tracing and 2.5D renderers remain replaceable;
- evidence provenance supports debugging and parent explanations.

Costs:
- more explicit contracts than a page-centric app;
- requires version discipline;
- evaluation policies must be authored/tested rather than hidden in UI handlers.

## Rejected alternatives

- Phaser scenes directly updating mastery.
- A single global mastery percentage as the learner source of truth.
- Copying SimpleWay Drawing's mastery formula/thresholds directly into early literacy.
- Rebuilding the entire SimpleWay One engine before proving Lexia A1.
- Reusing legacy Lexia namespaces and aggregate mastery model.

## Gate

If approved, the next implementation increment is intentionally narrow:

`ProgressPolicy(alpha-readiness-v0) + ActivityContract + InteractionResult + listen-choose evaluator -> EvidenceEvent`

Then re-run the A1 vertical slice before adding richer learning dimensions.
