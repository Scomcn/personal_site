# Scott McNicol — Personal Site

Portfolio site for Scott McNicol, a senior frontend engineer. It introduces my work, links to GitHub and LinkedIn, offers a CV download, and showcases my skills and career history.

## Stack

- **[Next.js 16](https://nextjs.org/)** (App Router) with **[React 19](https://react.dev/)** and **[TypeScript](https://www.typescriptlang.org/)**
- **[SCSS modules](https://sass-lang.com/)** for component styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** for global utilities and design tokens
- **[simple-icons](https://simple-icons.org/)** for technology logos in the stack ticker
- **[Inter](https://fonts.google.com/specimen/Inter)** via `next/font`

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Run ESLint                   |

## Project layout

```
src/
├── app/           # Next.js routes and page-level styles
├── components/    # UI components (Timeline, TechTicker, ShaderBackground, …)
├── data/          # Static content (timeline entries, tech stack, social links)
└── styles/        # Shared SCSS utilities
public/            # Static assets (logos, CV)
```

Content such as timeline entries and social links lives in `src/data/` — edit those files to update copy without touching component logic.

## Deployment

The site is a standard Next.js application and deploys cleanly to [Vercel](https://vercel.com):

1. Push the repository to GitHub.
2. Import the project in Vercel and connect the repo.
3. Use the default settings — **Framework Preset: Next.js**, build command `npm run build`, output handled automatically.
4. Vercel will build and deploy on every push to the production branch.

For other hosts, run `npm run build` and serve with `npm run start`, or follow the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
