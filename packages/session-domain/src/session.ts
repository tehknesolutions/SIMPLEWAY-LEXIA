import type { LearnerModel, SkillDimension } from "@lexia/learning-domain";
import type { ActivityFamily, Curriculum, CurriculumNode } from "@lexia/content";

export interface MissionPlan {
  readonly curriculumVersion: string;
  readonly targetNodeId: string;
  readonly skillId: string;
  readonly dimension: SkillDimension;
  readonly activityFamily: ActivityFamily;
}

function hasSuccessfulEvidence(model: LearnerModel, node: CurriculumNode): boolean {
  return model.evidence.some((evidence) =>
    evidence.skillId === node.skillId &&
    evidence.dimension === node.dimension &&
    evidence.outcome === "success"
  );
}

export function planMission(model: LearnerModel, curriculum: Curriculum): MissionPlan {
  const completed = new Set(
    curriculum.nodes.filter((node) => hasSuccessfulEvidence(model, node)).map((node) => node.id)
  );

  const target = curriculum.nodes.find((node) =>
    !completed.has(node.id) && node.prerequisites.every((id) => completed.has(id))
  );

  if (!target) throw new Error("No available curriculum mission");

  return {
    curriculumVersion: curriculum.version,
    targetNodeId: target.id,
    skillId: target.skillId,
    dimension: target.dimension,
    activityFamily: target.activityFamily
  };
}
