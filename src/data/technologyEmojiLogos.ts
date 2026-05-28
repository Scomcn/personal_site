import type { Technology } from "./technologies";

/**
 * Emoji logos — keyed by the exact name from `technologies.ts`.
 * Overrides PNG and Simple Icons for the same technology.
 */
export const technologyEmojiLogos: Partial<Record<Technology, string>> = {
  A11y: "♿️",
  i18n: "🔡",
};

export function getTechnologyEmojiLogo(
  technology: Technology,
): string | undefined {
  return technologyEmojiLogos[technology];
}
