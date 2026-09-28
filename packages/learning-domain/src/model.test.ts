import { describe, expect, it } from "vitest";
import { applyEvidence, emptyLearnerModel, type LearningEvidence } from "./index";

const evidence: LearningEvidence = {
  evidenceId: "ev-001",
  learnerId: "learner-001",
  skillId: "pt-BR.phoneme.m",
  dimension: "association",
  outcome: "success",
  occurredAt: "2026-09-28T20:00:00.000Z",
  activityId: "listen-match-m-01",
  curriculumVersion: "alpha-0.1.0"
};

describe("applyEvidence", () => {
  it("strengthens only the targeted skill dimension", () => {
    const initial = emptyLearnerModel("learner-001");
    const next = applyEvidence(initial, evidence);

    expect(next.skills["pt-BR.phoneme.m"]?.association.successes).toBe(1);
    expect(next.skills["pt-BR.phoneme.m"]?.recognition.successes).toBe(0);
    expect(Object.keys(next.skills)).toEqual(["pt-BR.phoneme.m"]);
  });

  it("preserves evidence provenance append-only", () => {
    const next = applyEvidence(emptyLearnerModel("learner-001"), evidence);
    expect(next.evidence).toEqual([evidence]);
    expect(() => applyEvidence(next, evidence)).toThrow(/duplicate evidence/i);
  });

  it("rejects evidence belonging to another learner", () => {
    expect(() => applyEvidence(emptyLearnerModel("other"), evidence)).toThrow(/learner/i);
  });
});
