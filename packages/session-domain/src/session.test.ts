import { describe, expect, it } from "vitest";
import { emptyLearnerModel, applyEvidence } from "@lexia/learning-domain";
import { alphaCurriculum } from "@lexia/content";
import { planMission } from "./session";

describe("planMission", () => {
  it("selects the first available unmet curriculum node", () => {
    const mission = planMission(emptyLearnerModel("learner-1"), alphaCurriculum);
    expect(mission).toMatchObject({
      curriculumVersion: "alpha-0.1",
      targetNodeId: "sound-a-discrimination",
      skillId: "phoneme:a",
      activityFamily: "listen-choose"
    });
  });

  it("unlocks association only after its prerequisites have evidence", () => {
    let learner = emptyLearnerModel("learner-1");
    learner = applyEvidence(learner, {
      evidenceId: "e-1", learnerId: "learner-1", skillId: "phoneme:a",
      dimension: "discrimination", outcome: "success", occurredAt: "2026-09-28T00:00:00Z",
      activityId: "listen-a", curriculumVersion: "alpha-0.1"
    });
    learner = applyEvidence(learner, {
      evidenceId: "e-2", learnerId: "learner-1", skillId: "grapheme:a",
      dimension: "recognition", outcome: "success", occurredAt: "2026-09-28T00:01:00Z",
      activityId: "recognize-a", curriculumVersion: "alpha-0.1"
    });

    expect(planMission(learner, alphaCurriculum).targetNodeId).toBe("a-association");
  });
});
