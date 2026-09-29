import { describe, expect, it } from "vitest";
import { applyEvidence, emptyLearnerModel, getSkillReadiness } from "./index";

describe("getSkillReadiness", () => {
  it("does not mark a skill ready from a single successful attempt", () => {
    const learner = applyEvidence(emptyLearnerModel("learner-1"), {
      evidenceId: "e-1", learnerId: "learner-1", skillId: "phoneme:a",
      dimension: "discrimination", outcome: "success", occurredAt: "2026-09-29T12:00:00Z",
      activityId: "listen-a", curriculumVersion: "alpha-0.1"
    });
    expect(getSkillReadiness(learner, "phoneme:a", "discrimination")).toBe("practicing");
  });

  it("marks a dimension ready only after repeated successful evidence without excessive retries", () => {
    let learner = emptyLearnerModel("learner-1");
    for (const [index, outcome] of ["success", "success", "success"] as const).entries()) {
      learner = applyEvidence(learner, {
        evidenceId: `e-${index}`, learnerId: "learner-1", skillId: "phoneme:a",
        dimension: "discrimination", outcome, occurredAt: `2026-09-29T12:0${index}:00Z`,
        activityId: "listen-a", curriculumVersion: "alpha-0.1"
      });
    }
    expect(getSkillReadiness(learner, "phoneme:a", "discrimination")).toBe("ready");
  });
});
