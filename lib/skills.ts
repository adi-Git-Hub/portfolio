import {
  siDocker,
  siExpress,
  siGit,
  siGithubactions,
  siHelm,
  siJenkins,
  siKubernetes,
  siLinux,
  siMongodb,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siReact,
  siTerraform,
  siTypescript,
} from "simple-icons";

export type SkillIcon = {
  title: string;
  slug: string;
  path: string;
  hex: string;
};

// 3×5 grid — consumed by the 3D keyboard (one icon per keycap) and, on mobile,
// by the flat list for the static skills grid.
// Strictly derived from Aditya Pande's Backend & DevOps stack:
export const SKILLS_GRID: readonly (readonly SkillIcon[])[] = [
  [siNodedotjs, siExpress, siMongodb, siReact, siNextdotjs],
  [siDocker, siKubernetes, siLinux, siNginx, siTerraform],
  [siJenkins, siHelm, siGithubactions, siGit, siTypescript],
] as const;

export const SKILLS_FLAT: readonly SkillIcon[] = SKILLS_GRID.flat();
