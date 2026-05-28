import type { Technology } from "./technologies";

/** Top proficiencies — static pyramid; excluded from the scrolling ticker. */
export const stackPyramid = [
  ["TypeScript"],
  ["React", "Node.js"],
  ["Python", "React Native", "SQL"],
] as const satisfies readonly (readonly Technology[])[];

export const stackPyramidTechnologies = new Set<Technology>(
  stackPyramid.flat(),
);
