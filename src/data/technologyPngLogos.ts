import type { Technology } from "./technologies";
import { techLogoPng } from "./technologyLogoTypes";

/**
 * Custom PNG logos — drop files into `public/tech-logos/`.
 * Entries here override Simple Icons for the same technology name.
 *
 * To add one:
 * 1. Add the PNG to `public/tech-logos/` (e.g. `react-testing-library.png`)
 * 2. Add a row below keyed by the exact name from `technologies.ts`
 *
 * @example
 * "React Testing Library": "react-testing-library.png",
 */
export const technologyPngLogos: Partial<Record<Technology, string>> = {
  "React Testing Library": "rtl.png",
  Java: "java.png",
};

export function getTechnologyPngLogo(
  technology: Technology,
): { src: string; alt: string } | undefined {
  const filename = technologyPngLogos[technology];
  if (!filename) return undefined;

  return {
    src: techLogoPng(filename),
    alt: technology,
  };
}
