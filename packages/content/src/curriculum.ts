export type CurriculumSkillDimension =
  | "discrimination"
  | "recognition"
  | "association"
  | "production"
  | "combination";

export type ActivityFamily = "listen-choose" | "build-match" | "trace-create";

export interface CurriculumNode {
  readonly id: string;
  readonly skillId: string;
  readonly dimension: CurriculumSkillDimension;
  readonly activityFamily: ActivityFamily;
  readonly prerequisites: readonly string[];
}

export interface Curriculum {
  readonly version: string;
  readonly nodes: readonly CurriculumNode[];
}

export const alphaCurriculum: Curriculum = {
  version: "alpha-0.1",
  nodes: [
    {
      id: "sound-a-discrimination",
      skillId: "phoneme:a",
      dimension: "discrimination",
      activityFamily: "listen-choose",
      prerequisites: []
    },
    {
      id: "a-recognition",
      skillId: "grapheme:a",
      dimension: "recognition",
      activityFamily: "listen-choose",
      prerequisites: []
    },
    {
      id: "a-association",
      skillId: "sound-grapheme:a",
      dimension: "association",
      activityFamily: "build-match",
      prerequisites: ["sound-a-discrimination", "a-recognition"]
    }
  ]
};
