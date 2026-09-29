# Lexia Cross-Repo Knowledge Map v1

Status: REVIEWED — architecture v0.2 corrections applied
Date: 2026-09-29
Product authority: `tehknesolutions/SIMPLEWAY-LEXIA`

## Purpose

This map separates reference knowledge from Lexia product authority. External repositories may provide evidence, patterns and tested mechanisms; they do not become Lexia canon automatically.

Decision flow:

`SOURCE -> OBSERVATION -> LEXIA DECISION -> SPEC -> TEST -> IMPLEMENTATION -> EVIDENCE`

## Source authority map

| Source | Primary authority for Lexia consultation | Lexia use |
|---|---|---|
| `tehkne-os` | institutional governance, provenance, evidence lifecycle, RAG/lineage | ADOPT governance principles |
| `codex-hnk` | execution discipline, gates, source/canon/release distinctions | ADOPT verification discipline |
| `hnk-kode` | experimental acquisition, transfer/generalization, provenance | ADAPT learning research patterns |
| `SW-ENGLISH` | mature product UX, learning mechanics, audio and adaptive experiences | ADAPT selectively; claims require validation |
| `simpleway-hnk` | governed pedagogical authoring and domain-consumer boundaries | ADOPT authoring authority separation |
| `SIMPLEWAY-ONE` | universal learning architecture, EvidenceEvent, Activity Contract, capability state | ADOPT architectural primitives |
| `simpleway-drawing` | visuomotor practice, tracing/drawing evidence, assistance-aware mastery, content validation, Alpha operations | ADAPT to early literacy |
| `simpleway-math` | reserved reference | NO MATERIAL YET |
| `lexia-game` legacy | Lexia product archaeology, prior intent, mechanics, curriculum experiments and operational lessons | KEEP/REDESIGN/REBUILD/DEFER/DROP |
| `SIMPLEWAY-LEXIA` | literacy pedagogy decisions, child game experience, world, companion and release | CANONICAL PRODUCT AUTHORITY |

## Cross-repo findings

### Governance and provenance

Adopt: source is not canon; canon is not release; release is not deployment; deployment is not production. RAG/indexes are derived retrieval surfaces, not truth. Decisions must retain provenance and a reproducible path back to sources.

### Learning architecture

Adopt from SimpleWay One: `CURRICULUM != LANGUAGE != CONTENT != PLAYER`; correct interaction is evidence, not mastery; learning history should be append-oriented; capability state is derived/recalculable; adaptation is deterministic and policy-driven.

Adopt: `Activity Contract != Renderer != Evaluation Policy`. Phaser executes a playable representation; it must not define pedagogical meaning or mastery.

### Content architecture

Adopt/adapt from SimpleWay One, Drawing and HNK authoring patterns: authored curriculum/content is versioned, schema-validated and compiled into runtime-safe artifacts. Missing content must fail validation rather than authorize runtime invention.

### Evidence and mastery

Adapt from Drawing: evidence should preserve quality/confidence/assistance information. Completion is not mastery. First success is not mastery. Assistance changes the evidential meaning of success.

Lexia target evidence dimensions should support, where applicable: outcome/value, confidence, assistance level, attempts, modality, latency, context and retention interval. Activity-specific evidence may extend this without collapsing everything into one score.

Durable EvidenceEvents are immutable and append-oriented. Corrections are additional explicit events/mechanisms, never in-place mutation of history.

### Visuomotor / handwriting

Adapt from Drawing: separate the drawing/tracing tool from the pedagogical method. For Lexia, `Tracing Renderer != Writing Pedagogy`.

Candidate handwriting evidence dimensions: stroke control, directionality, shape fidelity, sequence/order, independence and motor fluency. These remain multidimensional evidence, not an opaque handwriting grade.

### Generalization

Adapt from HNK-KODE: learning should eventually demonstrate transfer to unseen or recombined material. For Lexia this means moving beyond memorized letter screens toward novel sound-symbol recognition and simple syllabic construction.

### Product UX

Adapt selectively from SW-English and Lexia legacy: audio-first instruction, compact guided sessions, adaptive review, clear next action, resume, rich feedback and premium interaction quality. Reject importing adult-language assumptions or unvalidated neuroscience claims as literacy canon.

## Legacy Lexia archaeology

Legacy is evidence, not implementation authority.

| Legacy concept | Decision | vNext treatment |
|---|---|---|
| Learning engine separated from UI/persistence | KEEP | preserve as pure domain boundary |
| adaptive review / difficulty / novelty selection | REDESIGN | express through explicit Progress/Session policies |
| letters -> syllables -> words -> sentences progression | KEEP CONCEPT | re-author for Alpha 4-6 and version curriculum |
| gameplay presentation separate from learning scoring | KEEP | formalize through Activity Contracts |
| aggregate mastery from accuracy/stability/streak | REBUILD | replace with evidence history + multidimensional capability state |
| different implicit mastery rules by content namespace | DROP | explicit typed skills/capabilities and versioned policies |
| `SYL_*`, `WORD_*`, `SENT_*` string-prefix polymorphism | DROP | explicit IDs/types/provenance |
| broad legacy feature surface | DEFER | only reintroduce when supported by Alpha evidence |

## Canonical Lexia target flow

```text
Versioned Curriculum/Content
        |
        v
Curriculum Graph -> Progress Policy -> Session Director
                                      |
                                      v
                               Activity Contract
                                      |
                                      v
                              Phaser Renderer
                                      |
                                      v
                              Interaction Result
                                      |
                                      v
                              Evaluation Policy
                                      |
                                      v
                               Evidence Event
                                      |
                                      v
                               Learning History
                                      |
                                      v
                               Evidence Profile
                                      |
                                      v
                              Capability State
                                      |
                 +--------------------+--------------------+
                 |                                         |
                 v                                         v
          next Session policy                    World/Companion projections
```

The renderer reports interaction facts only. Evaluation Policy is the authority that maps those facts to pedagogical EvidenceEvents.

## Guardrails

1. No reference repository becomes Lexia canon by copying code or terminology.
2. Pedagogical claims require an explicit Lexia decision and provenance.
3. Presentation cannot mutate mastery directly.
4. Completion cannot be used as a synonym for mastery.
5. Capability state must be reconstructable from durable evidence where practical.
6. Renderer-specific metrics only become learning evidence through an explicit evaluation contract.
7. Durable EvidenceEvents are immutable after append.
8. Alpha may use simple policies, but provisional policy must be labeled as such.
9. Child privacy and safety override analytics richness.

## Immediate impact

The existing `successes >= 3` readiness rule in the reboot is accepted only as an Alpha vertical-slice policy, not the final mastery architecture.

Before Game Contracts expand, Lexia should introduce the vocabulary and contracts for EvidenceEvent, CapabilityState, ProgressPolicy and ActivityContract while keeping implementation scope small enough to finish A1.
