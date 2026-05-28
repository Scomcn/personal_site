import type { SimpleIcon } from "simple-icons";

/** Directory for custom PNG logos (files live in `public/tech-logos/`). */
export const TECH_LOGO_DIR = "/tech-logos";

export type TechnologyLogo =
  | { type: "simple-icon"; icon: SimpleIcon }
  | { type: "png"; src: string; alt: string }
  | { type: "emoji"; emoji: string };

/** Build a public URL for a PNG in `public/tech-logos/`. */
export function techLogoPng(filename: string): string {
  return `${TECH_LOGO_DIR}/${filename}`;
}
