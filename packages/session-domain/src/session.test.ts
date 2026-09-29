import { describe, expect, it } from "vitest";
import { emptyLearnerModel, applyEvidence, type LearnerModel, type SkillDimension } from "@lexia/learning-domain";
import { alphaCurriculum } from "@lexia/content";
import { planMission } from "./session";

function makeReady(model: LearnerModel, skillId: string, dimension: SkillDimension, prefix: string): LearnerModel {
  let next = model;
  for (let index = 0; index < 3; index += 1) {
    next = applyEvidence(next, {
      evidenceId: `${prefix}-${index}`, learnerId: model.learnerId, skillId, dimension,
      outcome: "success", occurredAt: `2026-09-29T12:0${index}:00Z`,
      activityId: prefix, curriculumVersion: "alpha-0.1"
    });
  }
  return next;
}

describe("planMission", () => {
  it("selects the first available unmet curriculum node", () => {
    expect(planMission(emptyLearnerModel("learner-1"), alphaCurriculum)).toMatchObject({
      kind: "mission", curriculumVersion: "alpha-0.1", targetNodeId: "sound-a-discrimination",
      skillId: "phoneme:a", activityFamily: "listen-choose"
    });
  });

  it("does not unlock a dependent node from a single success", () => {
    let learner = emptyLearnerModel("learner-1");
    learner = applyEvidence(learner, {
      evidenceId: "single", learnerId: "learner-1", skillId: "phoneme:a", dimension: "discrimination",
      outcome: "success", occurredAt: "2026-09-29T12:00:00Z", activityId: "listen-a", curriculumVersion: "alpha-0.1"
    });
    expect(planMission(learner, alphaCurriculum)).toMatchObject({ kind: "mission", targetNodeId: "sound-a-discrimination" });
  });

  it("unlocks association only after Learning Domain reports both prerequisites ready", () => {
    let learner = makeReady(emptyLearnerModel("learner-1"), "phoneme:a", "discrimination", "listen-a");
    learner = makeReady(learner, "grapheme:a", "recognition", "recognize-a");
    expect(planMission(learner, alphaCurriculum)).toMatchObject({ kind: "mission", targetNodeId: "a-association" });
  });

  it("returns an explicit curriculum-complete result instead of throwing", () => {
    let learner = makeReady(emptyLearnerModel("learner-1"), "phoneme:a", "discrimination", "listen-a");
    learner = makeReady(learner, "grapheme:a", "recognition", "recognize-a");
    learner = makeReady(learner, "sound-grapheme:a", "association", "associate-a");
    expect(planMission(learner, alphaCurriculum)).toEqual({ kind: "curriculum-complete", curriculumVersion: "alpha-0.1" });
  });
});
