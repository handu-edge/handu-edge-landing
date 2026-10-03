# handu-edge-landing

Marketing and documentation site for handuEDGE. Almost all copy, URLs, navigation, theme defaults, and documentation sources are driven from **`src/config/`**. Types live in **`src/types/config.ts`** and **`src/types/theme.ts`**. Config modules are re-exported from **`src/config/index.ts`**.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Documentation cache (recommended for faster dev and offline builds):**

```bash
npm run sync:docs   # downloads markdown into content/documentation/
```

`prebuild` runs the same sync script automatically when you run `npm run build`.

---

## Configuration map

| File | What it controls |
|------|------------------|
| `brand.ts` | Product name, tagline, logo flags, long description, copyright year |
| `site.ts` | Canonical URL, routes, workspace/sign-in links, layout Tailwind classes, section DOM ids |
| `seo.ts` | Default site metadata (title, OG, Twitter, robots) |
| `navigation.ts` | Header: explore vs engage links, labels, workspace action |
| `footer.ts` | Footer CTAs, columns, legal, social |
| `landing.ts` | Home: hero, edge diagram, section toggles, capabilities, final CTA |
| `platform.ts` | Platform split copy + belief/audiences narrative (independent of enable flags) |
| `about.ts` | `/about` copy and SEO |
| `pricing.ts` | `/pricing` copy, tiers, custom tier, SEO |
| `documentation.ts` | Docs route, GitHub source, pages, sidebar |
| `theme.ts` | Light/dark/system, accents, radius, localStorage keys, appearance UI copy |
| `typography.ts` | Font picker entries + type scale (display/headline/body/label) |

**Related (not under `src/config/` but tied to configuration)**

| Location | Role |
|----------|------|
| `src/lib/nav-item-key.ts` | Which home sections participate in scroll-spy and nav highlighting |
| `src/lib/icons.ts` | Allowed `icon` names for capabilities, theme mode icons, footer social |
| `src/lib/theme/fonts.ts` + `font-variables.ts` | Which Google fonts are actually loaded (`next/font`) |
| `content/documentation/{slug}.md` | Local override for doc markdown (preferred over GitHub fetch) |
| `scripts/sync-documentation.mjs` | Offline copy of GitHub docs (must match `documentation.ts`) |
| `.env` | `NEXT_PUBLIC_API_URL` → `siteConfig.apiUrl` (reserved; not used elsewhere in the app yet) |

---

## Brand — `src/config/brand.ts`

| Field | Purpose |
|-------|---------|
| `name`, `shortName` | Shown in metadata, copy, docs |
| `tagline` | Hero eyebrow (via `landing.ts`), SEO titles |
| `logo.type` | Currently only `"wordmark"` |
| `logo.showMark`, `logo.showWordmark` | Header branding visibility |
| `description` | Default SEO description and long-form brand text |
| `year` | Footer copyright |

Changing `name`, `tagline`, or `description` propagates to SEO and many strings that interpolate `brandConfig`.

---

## Site — `src/config/site.ts`

### Routes and links

| Field | Example | Notes |
|-------|---------|--------|
| `url` | `https://handuedge.com` | `metadataBase` and canonical URLs in `src/lib/seo.ts` |
| `homeHref` | `/` | Base for section hash links |
| `aboutPath`, `pricingPath`, `documentationPath` | `/about`, etc. | Also exported as named constants at the top of the file |
| `workspaceUrl` | External workspace URL | Used by pricing CTAs and links |
| `workspace`, `signIn` | `LinkConfig` | `label`, `href`, optional `external: true` |
| `documentationUrl` | Usually same as `documentationPath` | |
| `supportUrl` | `#` or real URL | Footer “Support” |
| `apiUrl` | From `NEXT_PUBLIC_API_URL` or `""` | Wired in config only; no UI usage yet |

Set in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Layout (Tailwind class strings)

| Field | Default | Effect |
|-------|---------|--------|
| `layout.containerMaxWidth` | `max-w-screen-2xl` | Main content width |
| `layout.sectionMinHeight` | `min-h-dvh` | Full-viewport sections |
| `layout.headerBarHeightClass` | `h-20` | Header height |
| `layout.scrollMarginTopClass` | `scroll-mt-20` | Anchor scroll offset for sections |
| `layout.pageShellMinHeightClass` | `min-h-dvh` | Page shell min height |

If you change header height, align **`scrollMarginTopClass`** with it. Scroll-spy also uses a fixed **`HEADER_SCROLL_OFFSET = 88`** in `src/hooks/use-active-nav.ts` (not config)—adjust that if header height changes significantly.

### Home section IDs (`sections`)

Maps logical section → **HTML `id`** on the home page:

| Key | Default id | Used by |
|-----|------------|---------|
| `overview` | `overview` | Hero |
| `platform` | `platform` | Platform split |
| `capabilities` | `capabilities` | Capabilities block |
| `belief` | `belief` | Belief narrative (when enabled) |
| `audiences` | `audiences` | Audiences narrative (when enabled) |

Hash links are built with `sectionHref()` in `src/lib/section-href.ts`: `{homeHref}#{sections[id]}`.

**When renaming a section id, update:**

- `siteConfig.sections`
- `landingConfig` ids where they reference sections (e.g. capabilities `id`)
- `navigation.ts` / `footer.ts` links if you use `sectionHref`
- `homeNavSectionIds` / `homeSupplementalSectionIds` in `src/lib/nav-item-key.ts` if scroll-spy should follow

---

## SEO — `src/config/seo.ts`

| Field | Purpose |
|-------|---------|
| `title`, `titleTemplate` | Root metadata; per-page titles use template `%s — {brand}` |
| `description`, `keywords` | Default meta |
| `locale` | Open Graph locale |
| `openGraph.*`, `twitter.*` | Social cards |
| `robots.index`, `robots.follow` | Crawling |

Per-route SEO also lives in **`aboutConfig.seo`**, **`pricingConfig.seo`**, **`documentationConfig.seo`**, and each **`remotePages[]`** entry (`title`, `description`).

---

## Navigation — `src/config/navigation.ts`

| Field | Purpose |
|-------|---------|
| `explore` | In-page / home section links (Overview, Platform, Capabilities) |
| `engage` | Secondary column (e.g. Pricing, Documentation) |
| `engageMenuLabel` | Mobile grouping label (“Get started”) |
| `actions.workspace` | Header workspace button (typically `siteConfig.workspace`) |
| `menuLabel`, `openMenuLabel`, `closeMenuLabel` | A11y / mobile chrome |

Each link is `LinkConfig`: `label`, `href`, optional `external`.

**Explore vs engage:** The UI renders explore items, then a visual separator, then engage items (`nav-main-links.tsx`). Home section links use client-side scroll behavior; route links prefetch when they are same-origin paths without `#`.

**Scroll-spy (not in this file):**

- Primary nav highlights: `overview`, `platform`, `capabilities` (`homeNavSectionIds` in `src/lib/nav-item-key.ts`).
- While scrolling **Audiences**, nav stays on **Capabilities** (`homeSupplementalSectionIds`).
- To change which sections drive the header highlight, edit **`src/lib/nav-item-key.ts`**, not only `navigation.ts`.

---

## Footer — `src/config/footer.ts`

| Field | Purpose |
|-------|---------|
| `primaryCta`, `secondaryCta` | Main footer buttons |
| `statement`, `getStartedNote` | Copy blocks |
| `columns[]` | `{ title, links: LinkConfig[] }` |
| `legal[]` | Privacy, Terms, etc. |
| `social[]` | `LinkConfig & { icon: IconName }` — empty array hides social |

Footer “Explore” can include **Audiences** even when it is not in the header explore list.

---

## Landing — `src/config/landing.ts`

### Hero (`hero`)

| Field | Notes |
|-------|--------|
| `enabled` | `false` removes hero entirely |
| `eyebrow`, `title`, `description`, `highlights[]` | Copy |
| `primaryCta`, `secondaryCta` | `LinkConfig` |

Hero sets `id={siteConfig.sections.overview}`.

### Edge diagram (`edgeVisual`)

| Field | Notes |
|-------|--------|
| `enabled` | Toggles diagram in hero |
| `accessibleName` | Screen reader label |
| `stages` | Tuple of 3 labels: Sources → Gateway → Consume |
| `pipelineSteps` | Spoke labels (cleaning, refresh, etc.) |
| `consumerLabel` | e.g. `"YOU"` |

### Platform section toggles (`platform`)

| Field | Effect |
|-------|--------|
| `platform.split.enabled` | Platform split section (`platformConfig.model`) |
| `platform.belief.enabled` | Belief narrative after capabilities |
| `platform.audiences.enabled` | Audiences + domain chips |

**Home order** (`src/app/page.tsx`): Hero → Platform split → Capabilities → supplemental (belief, then audiences).

Copy for platform / belief / audiences comes from **`platform.ts`**, not `landing.ts`.

### Capabilities (`capabilities`)

| Field | Notes |
|-------|--------|
| `enabled` | Toggle section |
| `id` | Should match `siteConfig.sections.capabilities` |
| `title`, `description` | Section intro |
| `items[]` | `{ title, description, icon }` — **`icon` must be in `iconRegistry`** (`src/lib/icons.ts`) |

### Final CTA (`finalCta`)

| Field | Notes |
|-------|--------|
| `enabled` | When `true`, renders bottom CTA block |
| `id`, `eyebrow`, `title`, `description`, `points[]`, `button` | Copy and CTA link |

---

## Platform copy — `src/config/platform.ts`

Three blocks:

1. **`model`** — Platform split: `eyebrow`, `lead`, `title`, `consume` / `operate` (each with `label`, `description`, `points[]`), `visual`, `visualLabel`.
2. **`belief`** — Narrative when `landingConfig.platform.belief.enabled`.
3. **`audiences`** — Narrative + `domainsLabel` + `domains[]`.

### Visual ids (`PlatformVisualId`)

| Value | Use |
|-------|-----|
| `hero-split` | Split illustration |
| `pipeline` | Pipeline visual |
| `domains` | Domain grid visual |

Set `visual` + `visualLabel` per block; rendering is in `src/components/visuals/platform-visuals.tsx`.

---

## About — `src/config/about.ts`

| Field | Purpose |
|-------|---------|
| `path` | Should match `siteConfig.aboutPath` |
| `seo.title`, `seo.description` | Page metadata |
| `eyebrow`, `title`, `body` | Page content |
| `cta` | `LinkConfig` back to home or elsewhere |

---

## Pricing — `src/config/pricing.ts`

| Field | Purpose |
|-------|---------|
| `path` | `/pricing` |
| `seo` | Page metadata |
| `eyebrow`, `title`, `description` | Page header |
| `tiers[]` | Each tier: `id`, `name`, `description`, `price`, `priceNote?`, `features[]`, `cta`, `highlighted?` |
| `customTier` | Enterprise tier with extra `subtitle` |

Tier CTAs are usually `siteConfig.workspaceUrl` with `external: true`.

---

## Documentation — `src/config/documentation.ts`

### Top-level

| Field | Purpose |
|-------|---------|
| `path` | Base route (`/documentation`) |
| `defaultSlug` | Slug served at `/documentation` (not `/documentation/{slug}`) |
| `github.owner`, `github.repo`, `github.branch` | Remote markdown source |
| `seo` | Index docs metadata |
| `sidebarLabel`, `mobileMenuLabel` | Docs chrome |
| `remotePages[]` | Every published doc page |
| `sidebar[]` | Sidebar groups referencing slugs |

### Each `remotePages` entry

| Field | Purpose |
|-------|---------|
| `slug` | URL segment and cache filename |
| `label` | Sidebar label |
| `title`, `description` | Page title + meta |
| `path` | Path to `.md` **inside the GitHub repo** (e.g. `README.md`, `docs/guide.md`) |

### How markdown is loaded

1. **`content/documentation/{slug}.md`** if present (local edit or `sync:docs`).
2. Else fetch from GitHub raw content using configured `github` + `path` (`src/lib/documentation-markdown.ts`).

### Adding a new doc page

1. Add an object to **`documentationConfig.remotePages`**.
2. Add a sidebar item under **`documentationConfig.sidebar`** (matching `slug`).
3. Mirror **`slug` + `path`** in **`scripts/sync-documentation.mjs`** (`github` + `pages` arrays).
4. Run **`npm run sync:docs`** (or rely on `prebuild`).
5. Routing:
   - **`defaultSlug`** → `src/app/documentation/page.tsx` only.
   - Other slugs → `src/app/documentation/[slug]/page.tsx` via `generateStaticParams`.
   - Optional: dedicated **`src/app/documentation/<slug>/page.tsx`** for a static route (see `global-gitignore`); if you do, add the slug to **`STATIC_DOC_SLUGS`** in `[slug]/page.tsx` so it is not duplicated.

URLs: `documentationPagePath(slug)` in `src/lib/documentation.ts` — default slug maps to `/documentation`, others to `/documentation/{slug}`.

Engage nav “Documentation” uses **`siteConfig.documentationPath`** (keep in sync with `documentationConfig.path`).

---

## Theme — `src/config/theme.ts`

| Field | Purpose |
|-------|---------|
| `defaultMode` | `light` \| `dark` \| `system` — also on `<html data-mode>` |
| `modes[]` | Picker options: `id`, `label`, `icon` (`IconName`) |
| `defaultAccent` | Key in `accents` (e.g. `emerald`) |
| `accents` | Named palettes; each has `label`, `light`/`dark` tokens (`primary`, `primaryForeground`, `ring` as OKLCH) |
| `radius` | Active radius id (`none`, `small`, `medium`, `large`) |
| `radii` | CSS length per id → `data-radius` on `<html>` |
| `storageKeys` | localStorage keys for user overrides (mode, accent, font) |
| `settings` | Copy for appearance popover |

Users can override mode, accent, and font in the browser; defaults come from this file and root layout `data-*` attributes.

To add a **new accent**: add an entry under `accents` and set `defaultAccent` to a valid key (`defineThemeConfig` enforces that at compile time).

---

## Typography — `src/config/typography.ts`

| Field | Purpose |
|-------|---------|
| `defaultFont` | Key in `fonts` — `data-font` on `<html>` |
| `fonts` | Map of id → `{ label, cssVariable }` for the font picker |
| `scale.display` / `headline` / `body` / `label` | Each: `size`, `leading`, `tracking` |

**Adding a font (two steps required)**

1. Register in **`typographyConfig.fonts`** with a `cssVariable` from `font-variables.ts`.
2. Add a static **`next/font`** import in **`src/lib/theme/fonts.ts`** and include it in `fontLoaders` / `fontVariableClassName`.

You cannot add a font from `typography.ts` alone because Next requires static font imports.

---

## Icons — `src/lib/icons.ts`

Allowed names today: `search`, `plug`, `arrow-left-right`, `sun`, `moon`, `monitor`, `check`, `link`, `globe`, `layout-grid`, `server`, `shield`, `handshake`.

To use a new icon on capabilities or theme modes: import from `lucide-react`, add to **`iconRegistry`**, then use that key in config.

---

## Link type (`LinkConfig`)

Used for nav, CTAs, and footer:

```ts
{ label: string; href: string; external?: boolean }
```

`external: true` is typical for workspace URLs.

---

## Scripts

| Script | Behavior |
|--------|----------|
| `npm run dev` | Development server |
| `npm run sync:docs` | Fetches configured GitHub paths → `content/documentation/*.md` |
| `npm run build` | Runs sync via `prebuild`, then Next build |
| `npm run start` | Production server after build |
| `npm run lint` | ESLint |

---

## Not config-driven (code changes)

- **Scroll-spy section lists** — `src/lib/nav-item-key.ts`
- **Scroll offset constant** — `use-active-nav.ts` (`HEADER_SCROLL_OFFSET`)
- **Static doc slug exceptions** — `STATIC_DOC_SLUGS` in `src/app/documentation/[slug]/page.tsx`
- **Home page composition order** — `src/app/page.tsx` (respects `enabled` flags only)
- **Skip link / smooth scroll** — root `src/app/layout.tsx`

---

## Quick reference

| Goal | Edit |
|------|------|
| Product name / tagline | `src/config/brand.ts` |
| Workspace / sign-in URLs | `src/config/site.ts` |
| Header links | `src/config/navigation.ts` + possibly `src/lib/nav-item-key.ts` |
| Footer columns | `src/config/footer.ts` |
| Hero or capabilities copy | `src/config/landing.ts` |
| Show/hide home sections | `src/config/landing.ts` `enabled` flags |
| Platform / belief / audiences text | `src/config/platform.ts` |
| Pricing tiers | `src/config/pricing.ts` |
| Docs from your GitHub repo | `src/config/documentation.ts` + `scripts/sync-documentation.mjs` + `npm run sync:docs` |
| Default colors / radius | `src/config/theme.ts` |
| Fonts in picker | `src/config/typography.ts` + `src/lib/theme/fonts.ts` |
| Global SEO | `src/config/seo.ts` + `site.url` |
| Section hash URLs | `site.sections` + links using `sectionHref` |
