import { getSkillReadiness, type LearnerModel, type SkillDimension } from "@lexia/learning-domain";
import type { ActivityFamily, Curriculum, CurriculumNode } from "@lexia/content";

export interface MissionPlan {
  readonly kind: "mission";
  readonly curriculumVersion: string;
  readonly targetNodeId: string;
  readonly skillId: string;
  readonly dimension: SkillDimension;
  readonly activityFamily: ActivityFamily;
}

export interface CurriculumComplete {
  readonly kind: "curriculum-complete";
  readonly curriculumVersion: string;
}

export type SessionPlan = MissionPlan | CurriculumComplete;

function isReady(model: LearnerModel, node: CurriculumNode): boolean {
  return getSkillReadiness(model, node.skillId, node.dimension) === "ready";
}

export function planMission(model: LearnerModel, curriculum: Curriculum): SessionPlan {
  const completed = new Set(curriculum.nodes.filter((node) => isReady(model, node)).map((node) => node.id));
  const target = curriculum.nodes.find((node) =>
    !completed.has(node.id) && node.prerequisites.every((id) => completed.has(id))
  );

  if (!target) return { kind: "curriculum-complete", curriculumVersion: curriculum.version };

  return {
    kind: "mission", curriculumVersion: curriculum.version, targetNodeId: target.id,
    skillId: target.skillId, dimension: target.dimension, activityFamily: target.activityFamily
  };
}
