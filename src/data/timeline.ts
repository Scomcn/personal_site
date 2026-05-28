export type TimelineEntryType = "professional_experience" | "publication" | "education";

export type TimelineProject = {
  id: string;
  title: string;
  period?: string;
  role?: string;
  description: string;
  highlights?: string[];
  href?: string;
};

export type TimelineEntry = {
  id: string;
  type: TimelineEntryType;
  sortDate: number;
  period: string;
  title: string;
  organization: string;
  role?: string;
  description: string;
  highlights?: string[];
  logo: string;
  href?: string;
  /** Projects delivered during this role (shown inside the same card) */
  projects?: TimelineProject[];
};

const entries: TimelineEntry[] = [
  {
    id: "felist",
    type: "professional_experience",
    sortDate: 202605,
    period: "2025 – Present",
    title: "Félist",
    organization: "Félist",
    role: "Founder",
    description:
      "A consumer app for discovering and ordering from local businesses. I built the product end to end—the React Native apps, Node.js API with Square payments and location-based search, and the Next.js site on Vercel with Postgres on Supabase.",
    highlights: [
      "React Native app for iOS and Android via Expo",
      "Node.js REST API with Square payments and geo-based results",
      "Next.js landing page on Vercel; PostgreSQL on Supabase",
    ],
    logo: "/logos/felist.png",
    href: "https://felist.app",
  },
  {
    id: "aion",
    type: "professional_experience",
    sortDate: 202604,
    period: "2025 – Present",
    title: "Aion",
    organization: "Aion",
    role: "Engineering Lead",
    description:
      "An early-stage AI startup shipping a SaaS platform with conversational AI. I lead engineering across the React product, FastAPI backend, RAG chatbot, and infrastructure on Heroku, GCP, and Supabase.",
    highlights: [
      "React/TypeScript SaaS with FastAPI, PostgreSQL (Supabase), and RAG chatbot",
      "Deployed on Heroku and GCP; monitoring with Sentry",
      "WhatsApp messaging automation and GitHub Actions deployments",
    ],
    logo: "/logos/aion.svg",
    href: "https://iamaion.framer.ai",
  },
  {
    id: "pub-oral-oncology",
    type: "publication",
    sortDate: 202601,
    period: "2026",
    title:
      "Survival in Node-Positive Early Oral Squamous Cell Carcinoma Following Sentinel Lymph Node Biopsy or Elective Neck Dissection",
    organization: "Oral Oncology",
    description:
      "A clinical study comparing sentinel lymph node biopsy with elective neck dissection for early oral squamous cell carcinoma. I co-authored the paper and built open-source tooling to improve matched-pair analysis of patient records.",
    logo: "/logos/oral-oncology.jpg",
    href: "https://www.sciencedirect.com/science/article/pii/S1368837526001247",
  },
  {
    id: "skyscanner",
    type: "professional_experience",
    sortDate: 202412,
    period: "2022 – 2024",
    title: "Skyscanner",
    organization: "Skyscanner",
    role: "Full Stack Software Engineer II",
    description:
      "A global travel metasearch that compares flights, hotels, and car hire across hundreds of partners. I worked on the core flight search experience and a B2B analytics product for airline and airport partners.",
    logo: "/logos/skyscanner.svg",
    href: "https://www.skyscanner.net",
    projects: [
      {
        id: "skyscanner-tiv",
        title: "Traveller Insights Vision",
        period: "2022 – 2024",
        role: "Technical lead",
        description:
          "A B2B analytics platform that turns Skyscanner search data into insights for airlines and airports. I led the rebuild on Apache Superset and built Druid pipelines ingesting trillions of search events.",
        highlights: [
          "Ingestion pipelines processing trillions of search events into Apache Druid",
          "Product demos for airline and airport partners",
          "Weekly syncs with backend, frontend, product, and principal engineers",
        ],
      },
      {
        id: "skyscanner-srp",
        title: "Flight Search Results Page",
        period: "2024 – 2024",
        description:
          "The main page where travellers compare flight itineraries after a search—one of Skyscanner's highest-traffic surfaces. I shipped React and TypeScript features with a focus on accessibility and experimentation at scale.",
        highlights: [
          "Accessible UI with screen reader, keyboard, and RTL language support",
          "A/B experiments on features reaching over 1M users",
        ],
      },
    ],
  },
  {
    id: "treasure-data",
    type: "professional_experience",
    sortDate: 202212,
    period: "2020 – 2022",
    title: "Treasure Data",
    organization: "Treasure Data",
    role: "Software Engineer",
    description:
      "An enterprise customer data platform that unifies first-party data for marketing and analytics teams. I built UI across a microfrontend monorepo—dashboards, audience tools, and platform features—with a focus on visualisation, i18n, and accessibility.",
    highlights: [
      "Microfrontend architecture in a large monorepo",
      "Redux to React Hooks + SWR migration; Recharts visualisations",
      "i18n with RTL support; accessibility panel from hackathon",
      "Bundle-size optimisation; CircleCI and Docker deployments",
    ],
    logo: "/logos/treasure-data.svg",
    href: "https://www.treasure.ai/",
  },
  {
    id: "pub-bjoms",
    type: "publication",
    sortDate: 202212,
    period: "2022",
    title:
      "Survival in node positive early oral SCC: Sentinel Node Biopsy versus Elective Neck Dissection",
    organization: "British Journal of Oral & Maxillofacial Surgery",
    description:
      "Earlier publication in the same research programme on surgical management of node-positive early oral cancer. I co-authored the study and contributed software to support matched-pair analysis of clinical records.",
    logo: "/logos/baoms.svg",
    href: "https://www.sciencedirect.com/science/article/abs/pii/S0266435622000754",
  },
  {
    id: "arm",
    type: "professional_experience",
    sortDate: 202012,
    period: "2018 – 2020",
    title: "Arm",
    organization: "Arm",
    role: "Graduate Software Engineer",
    description:
      "Arm designs the processors in most of the world's phones and embedded devices. I worked on Mbed Cloud—a portal for managing IoT devices—and developer-facing web properties for the Mbed ecosystem.",
    highlights: [
      "React/TypeScript portal for Arm Mbed Cloud device management",
      "Python/Django MbedOS website; Docker, Kubernetes, and Terraform infrastructure",
    ],
    logo: "/logos/arm.svg",
    href: "https://www.arm.com",
  },
  {
    id: "st-andrews",
    type: "education",
    sortDate: 201806,
    period: "2014 – 2018",
    title: "BSc Computer Science (2:1)",
    organization: "University of St Andrews",
    description:
      "Undergraduate computer science at Scotland's oldest university. My dissertation explored ILNP—a network-layer protocol for separating identity from location—and implemented a TOR-like anonymity overlay in Go.",
    highlights: [
      "Peer-to-peer file sharing client",
      "Networked Settlers of Catan implementation",
      "Huffman compression and Hamming error correction",
    ],
    logo: "/logos/st-andrews.svg",
    href: "https://www.st-andrews.ac.uk",
  },
];

export const timelineItems = [...entries].sort((a, b) => b.sortDate - a.sortDate);

export function getEntryYear(entry: TimelineEntry): number {
  return Math.floor(entry.sortDate / 100);
}

export type TimelineSide = "left" | "right";

export type PlacedTimelineEntry = {
  item: TimelineEntry;
  side: TimelineSide;
  row: number;
};

export type TimelineYearGroup = {
  year: number;
  items: PlacedTimelineEntry[];
};

export function groupTimelineByYear(items: TimelineEntry[]): TimelineYearGroup[] {
  const byYear = new Map<number, TimelineEntry[]>();

  for (const item of items) {
    const year = getEntryYear(item);
    const group = byYear.get(year);
    if (group) {
      group.push(item);
    } else {
      byYear.set(year, [item]);
    }
  }

  let sideCounter = 0;

  return [...byYear.entries()]
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([year, yearItems]) => {
      let leftRow = 1;
      let rightRow = 1;

      const placed = yearItems.map((item) => {
        const side: TimelineSide = sideCounter++ % 2 === 0 ? "left" : "right";
        const row = side === "left" ? leftRow++ : rightRow++;

        return { item, side, row };
      });

      return { year, items: placed };
    });
}

export const typeLabels: Record<TimelineEntryType, string> = {
  professional_experience: "Professional Experience",
  publication: "Publication",
  education: "Education",
};
