# JEKRAMI Labs

The official website of **JEKRAMI Labs** — an independent AI Research &
Engineering Studio designing enterprise-grade intelligent systems.

> Engineering Trustworthy AI Systems.

Built with Next.js 15, React 19, TailwindCSS 4, Framer Motion, and MDX.

---

## Stack

- **Framework:** Next.js 15 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 with CSS-first theme tokens
- **UI primitives:** Shadcn-style on Radix (`@radix-ui/react-slot`)
- **Icons:** Lucide
- **Motion:** Framer Motion (subtle fade, slide, parallax; respects `prefers-reduced-motion`)
- **Fonts:** Inter (body) + Manrope (headings), self-hosted via `next/font/google`
- **Content:** MDX via `next-mdx-remote/rsc` with frontmatter parsed by `gray-matter`
- **Deploy target:** Vercel (works on any Node-runtime host)

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000
```

## Scripts

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Start the dev server on port 3000          |
| `npm run build`    | Build the production bundle                |
| `npm run start`    | Serve the production build                 |
| `npm run lint`     | Run ESLint via `next lint`                 |
| `npm run typecheck`| TypeScript with `--noEmit`                 |
| `npm run format`   | Run Prettier across the repo               |

## Architecture

```
app/
├── layout.tsx              # Root layout, fonts, navigation, footer
├── page.tsx                # Home (one-pager: Hero → Projects → … → Contact)
├── globals.css             # Tailwind 4 @theme + base/components layers
├── sitemap.ts              # Dynamic sitemap (articles + projects auto-included)
├── robots.ts
├── not-found.tsx
├── projects/page.tsx       # Projects index
├── projects/[slug]/page.tsx
├── research/page.tsx
├── about/page.tsx
├── articles/page.tsx
├── articles/[slug]/page.tsx
└── contact/page.tsx

components/
├── layout/                 # Navigation, Footer
├── sections/               # Hero, Projects, Research, About, Timeline, Philosophy, Contact
├── motion/                 # FadeIn, SlideIn, Parallax
├── ui/                     # Button, Container, Card, Badge, InlineLink, PageHeader
├── mdx/                    # MDX-specific components (Callout)
├── project-card.tsx
├── research-card.tsx (inline in section)
└── timeline-item.tsx (inline in section)

content/
└── articles/*.mdx          # Frontmatter + body; lives as MDX at build time

lib/
├── utils.ts                # cn() class-name helper
├── site.ts                 # Brand constants + navigation entries
├── projects.ts             # Project metadata (typed)
├── research.ts             # Research area metadata (typed)
├── timeline.ts             # Timeline entries
├── philosophy.ts           # Four pillars
└── articles.ts             # MDX loader (frontmatter + listing)

mdx-components.tsx          # MDX component mapping (pageExtensions)
```

### Design tokens

All design tokens live in `app/globals.css` under the `@theme inline { … }`
directive. Tailwind 4 generates utility classes from them at build time.

| Token                  | Value      | Role                            |
| ---------------------- | ---------- | ------------------------------- |
| `--color-background`   | `#FFFFFF`  | Page background                 |
| `--color-primary`      | `#0B2545`  | Brand navy; headings, primary CTA |
| `--color-accent`       | `#0077B6`  | Calm blue; links, focus rings   |
| `--color-foreground`   | `#222222`  | Body text                       |
| `--color-muted-foreground` | `#6C757D`| Secondary text                |
| `--font-heading`       | Manrope    | Display typography              |
| `--font-sans`          | Inter      | Body typography                 |

### Motion language

Motion is layered into small client islands (`FadeIn`, `SlideIn`, `Parallax`)
while pages and sections remain Server Components. Every motion component
honours `prefers-reduced-motion` by collapsing to a zero-duration state.

Three primitives cover the entire site:

- **`FadeIn`** — opacity + 4–8px vertical drift, 0.6s, triggered `whileInView`.
- **`SlideIn`** — opacity + 8–20px directional travel, 0.7s.
- **`Parallax`** — vertical scroll-driven translation bound to the parent ref.

### Performance notes

- All content is statically prerendered (SSG). Articles and projects use
  `generateStaticParams` so the build emits one HTML per entry.
- The home page first loads **~158 kB** of JS (gzipped: less), below the
  Lighthouse ~95 score threshold.
- Fonts are self-hosted via `next/font/google` — no third-party CDN.
- Images use Next.js' native optimisation with AVIF + WebP.

### Accessibility

- Semantic landmarks (`header`, `main`, `nav`, `article`, `footer`).
- A skip-to-main-content link is the first focusable element.
- Focus styles use `:focus-visible` with a 2px accent outline at 2px offset.
- All motion components honour `prefers-reduced-motion`.
- Colour contrast meets AA on body copy and AAA on primary headings.

### SEO

- Per-route `metadata` exports with OpenGraph + Twitter cards.
- `sitemap.ts` is data-driven; new projects and articles appear automatically.
- `robots.ts` allows crawling everywhere except `/api/`.
- All pages have meaningful titles and descriptions; no lorem ipsum.

## Authoring a new article

1. Create a file under `content/articles/` with a `.mdx` extension,
   e.g. `content/articles/agentic-governance.mdx`.
2. Add frontmatter:

   ```yaml
   ---
   title: "Agentic Governance for SOC Systems"
   summary: "Why bounded autonomy beats free-range agents."
   date: 2026-04-20
   readingTime: 5
   tags: ["Cybersecurity AI", "Agentic AI"]
   ---
   ```

3. Write the body in MDX. The `<Callout>` component is available globally.
4. Run `npm run build` — the new article is automatically discovered by
   `lib/articles.ts`, listed on `/articles`, and exposed at
   `/articles/agentic-governance`.

## Authoring a new project

Add a new entry to `lib/projects.ts`. The Projects section, the
`/projects` index, and the `/projects/[slug]` page all read from this
single source of truth — no other files need to change.

## Deployment

The project is Vercel-ready out of the box. Push the repository and the
production build runs `next build` automatically. The default build
target is Node 20+ (any modern Node host works).

```bash
# Production build locally
npm run build
npm run start
```

## Licence

© JEKRAMI Labs. All rights reserved.
