import type { SimpleIcon } from "simple-icons";
import {
  siApachedruid,
  siApachesuperset,
  siArduino,
  siArm,
  siChartdotjs,
  siCircleci,
  siClaude,
  siCloudflare,
  siCursor,
  siDjango,
  siDocker,
  siExpo,
  siFastapi,
  siGithubactions,
  siGithubcopilot,
  siGo,
  siGooglecloud,
  siGooglegemini,
  siHtml5,
  siJest,
  siJquery,
  siKubernetes,
  siMdnwebdocs,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenaigym,
  siOpenapiinitiative,
  siPostgresql,
  siPython,
  siReact,
  siRedux,
  siRender,
  siSentry,
  siSquare,
  siSupabase,
  siSwr,
  siTerraform,
  siTypescript,
  siVercel,
  siWebpack,
  siWhatsapp
} from "simple-icons";
import type { Technology } from "./technologies";
import { getTechnologyEmojiLogo } from "./technologyEmojiLogos";
import type { TechnologyLogo } from "./technologyLogoTypes";
import { getTechnologyPngLogo } from "./technologyPngLogos";

/** Brand logos from Simple Icons (https://simpleicons.org), CC0-1.0 */
const technologySimpleIcons: Partial<Record<Technology, SimpleIcon>> = {
  "Apache Druid": siApachedruid,
  "Apache Superset": siApachesuperset,
  ChatGPT: siOpenaigym,
  CircleCI: siCircleci,
  "Claude Code": siClaude,
  "Claude Opus": siClaude,
  "OpenAI Codex": siGithubcopilot,
  Cloudflare: siCloudflare,
  Cursor: siCursor,
  Django: siDjango,
  Docker: siDocker,
  Expo: siExpo,
  FastAPI: siFastapi,
  GCP: siGooglecloud,
  Gemini: siGooglegemini,
  "GitHub Actions": siGithubactions,
  Golang: siGo,
  Heroku: siRender,
  HTML5: siHtml5,
  IoT: siArduino,
  Jest: siJest,
  jQuery: siJquery,
  Kubernetes: siKubernetes,
  MbedOS: siArm,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  OpenAI: siOpenaigym,
  PostgreSQL: siPostgresql,
  Python: siPython,
  React: siReact,
  "React Native": siReact,
  Recharts: siChartdotjs,
  Redux: siRedux,
  REST: siOpenapiinitiative,
  Sentry: siSentry,
  SQL: siMysql,
  Square: siSquare,
  Supabase: siSupabase,
  SWR: siSwr,
  Terraform: siTerraform,
  TypeScript: siTypescript,
  Vercel: siVercel,
  WCAG: siMdnwebdocs,
  Webpack: siWebpack,
  "WhatsApp API": siWhatsapp
};

export function getTechnologyLogo(
  technology: Technology
): TechnologyLogo | undefined {
  const emoji = getTechnologyEmojiLogo(technology);
  if (emoji) {
    return { type: "emoji", emoji };
  }

  const png = getTechnologyPngLogo(technology);
  if (png) {
    return { type: "png", src: png.src, alt: png.alt };
  }

  const icon = technologySimpleIcons[technology];
  if (icon) {
    return { type: "simple-icon", icon };
  }

  return undefined;
}
