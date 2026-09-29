import { describe, expect, it } from "vitest";
import { alphaCurriculum } from "./curriculum";

describe("alpha curriculum", () => {
  it("exposes explicit versioned nodes and skill dimensions", () => {
    expect(alphaCurriculum.version).toBe("alpha-0.1");
    expect(alphaCurriculum.nodes[0]).toMatchObject({
      id: "sound-a-discrimination",
      skillId: "phoneme:a",
      dimension: "discrimination",
      activityFamily: "listen-choose"
    });
  });

  it("keeps prerequisite relationships explicit", () => {
    const association = alphaCurriculum.nodes.find((node) => node.id === "a-association");
    expect(association?.prerequisites).toEqual(["sound-a-discrimination", "a-recognition"]);
  });
});
