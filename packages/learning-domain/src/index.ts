export type SkillDimension =
  | "discrimination"
  | "recognition"
  | "association"
  | "production"
  | "combination";

export type EvidenceOutcome = "success" | "retry";

export interface LearningEvidence {
  readonly evidenceId: string;
  readonly learnerId: string;
  readonly skillId: string;
  readonly dimension: SkillDimension;
  readonly outcome: EvidenceOutcome;
  readonly occurredAt: string;
  readonly activityId: string;
  readonly curriculumVersion: string;
}

export interface DimensionState {
  readonly successes: number;
  readonly retries: number;
  readonly lastEvidenceAt: string | null;
}

export type SkillState = Readonly<Record<SkillDimension, DimensionState>>;

export interface LearnerModel {
  readonly learnerId: string;
  readonly skills: Readonly<Record<string, SkillState>>;
  readonly evidence: readonly LearningEvidence[];
}

const emptyDimension = (): DimensionState => ({ successes: 0, retries: 0, lastEvidenceAt: null });

const emptySkill = (): SkillState => ({
  discrimination: emptyDimension(),
  recognition: emptyDimension(),
  association: emptyDimension(),
  production: emptyDimension(),
  combination: emptyDimension()
});

export function emptyLearnerModel(learnerId: string): LearnerModel {
  return { learnerId, skills: {}, evidence: [] };
}

export function applyEvidence(model: LearnerModel, evidence: LearningEvidence): LearnerModel {
  if (evidence.learnerId !== model.learnerId) {
    throw new Error("Learning evidence learner does not match learner model");
  }
  if (model.evidence.some((item) => item.evidenceId === evidence.evidenceId)) {
    throw new Error(`Duplicate evidence: ${evidence.evidenceId}`);
  }

  const currentSkill = model.skills[evidence.skillId] ?? emptySkill();
  const currentDimension = currentSkill[evidence.dimension];
  const nextDimension: DimensionState = {
    successes: currentDimension.successes + (evidence.outcome === "success" ? 1 : 0),
    retries: currentDimension.retries + (evidence.outcome === "retry" ? 1 : 0),
    lastEvidenceAt: evidence.occurredAt
  };
  const nextSkill: SkillState = { ...currentSkill, [evidence.dimension]: nextDimension };

  return {
    learnerId: model.learnerId,
    skills: { ...model.skills, [evidence.skillId]: nextSkill },
    evidence: [...model.evidence, evidence]
  };
}
