# Kinetic Blueprint — Personal Portfolio

Jack Haek's personal portfolio site. Built with Astro 6, a custom CSS design system (no Tailwind), and MDX-powered project writeups.

## Commands

All commands are run from the root of the project:

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start local dev server at `localhost:4321` |
| `npm run build`   | Build for production to `./dist/`          |
| `npm run preview` | Preview production build locally           |

## Project Structure

```
src/
├── content.config.ts        # Content collection schemas (single source of truth)
├── content/
│   ├── projects/            # One directory per project
│   │   └── my-project/
│   │       ├── my-project.mdx
│   │       └── hero.jpg
│   ├── blog/                # One directory per post
│   │   └── my-post/
│   │       ├── my-post.mdx
│   │       └── hero.jpg
│   ├── experience/          # One MDX file per role
│   │   └── company-name.mdx
│   └── education/           # One MDX file per institution
│       └── university.mdx
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── projects.astro       # Project gallery listing
│   ├── projects/
│   │   └── [id].astro       # Dynamic project detail page
│   ├── blog.astro           # Blog listing
│   └── blog/
│       └── [slug].astro     # Dynamic blog post page
├── components/              # Shared Astro components
├── layouts/
│   └── Layout.astro         # Root layout (View Transitions, scroll reveal, theme)
└── styles/
    └── global.css           # Design system tokens and global utilities
```

The **directory name** becomes the URL slug. The MDX file inside must share the same name as its directory.

---

## Adding a Project Writeup

Each directory in `src/content/projects/` becomes a page at `/projects/<directory-name>`.

### 1. Create the directory and file

```
src/content/projects/my-project/my-project.mdx
```

The directory name becomes the URL slug: `/projects/my-project`.

### 2. Add frontmatter

Every project file must start with a YAML frontmatter block. All fields match the collection schema in `src/content.config.ts`:

```yaml
---
title: "PROJECT_NAME"           # required — displayed as the page heading
category: "Hybrid Architecture" # required — displayed above the title
filter: "Software"              # required — "Simulation" | "Software" | "Modeling"
description: "One paragraph description shown in the page header."
tags: ["C++", "Kubernetes"]     # required — rendered as chips in the header
image: "./hero.jpg"             # optional — relative to the MDX file
imageAlt: "Description of image"
featured: false                 # optional, default false
publishDate: 2025-06-01         # required
status: "active"                # required — "active" | "completed" | "archived"
github: "https://github.com/..." # optional
demo: "https://..."              # optional
---
```

> **`filter`** must be exactly one of `Simulation`, `Software`, or `Modeling`. This controls which filter chip shows the project on the projects listing page. The schema enforces this — an invalid value will fail the build.

### 3. Write the content

Below the frontmatter, write in standard Markdown. MDX allows you to include HTML elements when you need more structure — see the reference below.

**Standard Markdown is all you need for most content:**

```md
## Section Heading

Normal paragraph text with **bold**, _italic_, and `inline code`.

- Bullet list item
- Another item

> A blockquote for emphasis.

​```cpp
// A fenced code block
int main() { return 0; }
​```
```

**Use HTML elements only when you need a specific layout block.** All styling is applied automatically by `src/pages/projects/[id].astro` — never add `<style>` tags or `style=""` attributes to your content (the only exception is `perf-fill` width, which is a data value).

---

## HTML Layout Blocks

These class names are recognised and styled by the project detail page template. Drop the corresponding HTML into any `.mdx` file and it renders consistently across all projects.

### Section label

A small uppercase label to introduce a section:

```html
<p class="section-label">Mission Overview</p>
```

### Callout

Highlighted aside with a cyan left border — good for constraints, warnings, or status notes:

```html
<div class="callout">
  <strong>Note</strong> — Your callout text here.
</div>
```

### Stat grid

A row of KPI cards with a cyan accent border:

```html
<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-label">Metric name</span>
    <span class="stat-value">42</span>
    <span class="stat-unit">unit or context</span>
  </div>
  <!-- repeat stat-card as needed -->
</div>
```

### Architecture diagram

Monospace pre-formatted block for ASCII diagrams. Text renders verbatim:

```html
<div class="arch-diagram">
  ┌──────────┐
  │  System  │
  └──────────┘
</div>
```

Use `<span class="highlight">` or `<span class="dim">` inside to colour specific characters.

### Development timeline

Vertical timeline with animated glowing dots:

```html
<div class="dev-timeline">
  <div class="timeline-entry">
    <div class="timeline-date">Q1 2025 — Phase 0</div>
    <div class="timeline-title">Phase Title</div>
    <div class="timeline-body">Description of what happened in this phase.</div>
  </div>
  <!-- repeat timeline-entry as needed (up to 5 get staggered animations) -->
</div>
```

### Performance bars

Labelled progress bars. The `width` inline style on `perf-fill` is a data value — set it to match your metric:

```html
<div class="perf-table">
  <div class="perf-row">
    <div class="perf-header">
      <span class="perf-label">Metric name</span>
      <span class="perf-value">95%</span>
    </div>
    <div class="perf-track">
      <div class="perf-fill" style="width: 95%;"></div>
    </div>
  </div>
  <!-- repeat perf-row as needed -->
</div>
```

### Scan-line image

An image with a moving cyan scan animation and fade overlay:

```html
<div class="scan-wrap">
  <img src="/projects/my-project/screenshot.jpg" alt="Description" />
  <div class="scan-line"></div>
  <div class="scan-overlay"></div>
</div>
```

---

## Adding Images

Place images inside the same directory as the MDX file and reference them with a relative path. Astro will optimise them (resize, convert to WebP, generate srcset) at build time.

```
src/content/projects/my-project/
├── my-project.mdx
├── hero.jpg           ← frontmatter `image: "./hero.jpg"`
└── dashboard.png      ← imported inside the MDX body
```

```
src/content/blog/my-post/
├── my-post.mdx
├── hero.jpg           ← frontmatter `image: "./hero.jpg"`
└── screenshot.png     ← imported inside the MDX body
```

**Frontmatter hero image** — use a relative path:

```yaml
image: "./hero.jpg"
```

**Body images** — import the file at the top of the MDX (after frontmatter) and use Astro's `<Image>` component:

```mdx
import { Image } from 'astro:assets';
import dashboardImg from './dashboard.png';

<div class="scan-wrap">
  <Image src={dashboardImg} alt="Description" />
  <div class="scan-line"></div>
  <div class="scan-overlay"></div>
</div>
```

> Images placed in `public/` are served as-is with no optimisation. Always co-locate images with their MDX file.

---

## Adding a Blog Post

Each directory in `src/content/blog/` becomes a page at `/blog/<directory-name>`.

### 1. Create the directory and file

```
src/content/blog/my-post/my-post.mdx
```

The directory name becomes the URL slug: `/blog/my-post`.

### 2. Add frontmatter

```yaml
---
title: "Post Title"                          # required — displayed as the page heading
filter: "Software"                           # required — "Simulation" | "Infrastructure" | "Software"
description: "One sentence summary."         # required — shown in the blog listing card
publishDate: 2025-06-01                      # required
updatedDate: 2025-06-15                      # optional — shown if the post was revised
tags: ["Linux", "C++"]                       # required — rendered as chips in the header
image: "./hero.jpg"                          # optional — relative to the MDX file
imageAlt: "Description of image"            # optional
draft: false                                 # optional, default false — drafts are hidden from the listing
---
```

> **`filter`** must be exactly one of `Simulation`, `Infrastructure`, or `Software`. This drives the filter chips on the blog listing page. An invalid value will fail the build.

### 3. Write the content

Below the frontmatter, write in standard Markdown. The same HTML layout blocks available in project writeups (`section-label`, `callout`, `stat-grid`, `arch-diagram`, `dev-timeline`, `perf-table`, `scan-wrap`) work in blog posts too — see the **HTML Layout Blocks** section above for reference.

---

## Adding Experience Entries

Experience entries appear in the timeline on the About page, sorted by `order` (ascending).

Create a new MDX file directly in `src/content/experience/`:

```
src/content/experience/company-name.mdx
```

### Frontmatter

```yaml
---
title: "Job Title"             # required
company: "Company Name"        # required
dateRange: "2023 – 2025"       # required — displayed as-is (free text)
tags: ["Python", "Kubernetes"] # required — rendered as chips on the entry
badge: "Current"               # optional — shown as a highlighted badge next to the company name
accent: false                  # optional, default false — adds a cyan left accent border to the entry
order: 1                       # required — controls display order (1 = top)
---
```

### Body

Write a short paragraph below the frontmatter describing responsibilities and impact. Keep it to 2–4 sentences — it appears in a condensed timeline layout.

```md
---
# frontmatter above...
---

Designed and deployed real-time simulation infrastructure for LVC training environments,
integrating live flight telemetry with constructive models across distributed nodes.
```

---

## Adding Education Entries

Education entries appear in the Education card on the About page, sorted by `order` (ascending).

Create a new MDX file directly in `src/content/education/`:

```
src/content/education/university.mdx
```

### Frontmatter

```yaml
---
institution: "University Name"                      # required
degree: "Bachelor's in Computer Science"            # required
year: "2022"                                        # required — graduation year (free text)
details:                                            # optional — bullet points shown below the degree
  - "Concentration: Software Engineering"
  - "GPA: 3.9"
order: 1                                            # required — controls display order (1 = first)
---
```

The body of an education entry is not rendered — leave it empty.

---

## Design System

All design tokens live in `src/styles/global.css` under `:root`. Use these variables throughout components — never hardcode colors, spacing, or radii.

### Key tokens

| Category      | Token examples                                                                 |
| :------------ | :----------------------------------------------------------------------------- |
| Surfaces      | `--surface`, `--surface-container-low`, `--surface-container-high`            |
| Primary       | `--primary`, `--primary-container`, `--primary-fixed-dim`                     |
| Text          | `--on-surface`, `--text-secondary`, `--text-muted`                            |
| Typography    | `--font-display` (Space Grotesk), `--font-body` (Inter)                       |
| Type scale    | `--display-lg` … `--label-sm` (see global.css for the full scale)             |
| Spacing       | `--space-1` (0.25rem) … `--space-20` (7rem)                                  |
| Border radius | `--radius-sm`, `--radius-md` (buttons/chips), `--radius-lg` (cards)          |
| Motion        | `--ease-kinetic`, `--duration-fast`, `--duration-base`, `--duration-slow`     |

### Light mode

The site ships with a dark default and a `[data-theme="light"]` override block in `global.css`. The theme toggle in the header sets `localStorage('theme')` and flips `document.documentElement.dataset.theme`. `Layout.astro` reads this value on page load (before paint) to prevent flash.

### Global utility classes

| Class           | Description                                            |
| :-------------- | :----------------------------------------------------- |
| `.btn-primary`  | Gradient CTA button                                    |
| `.btn-secondary`| Transparent button with border                         |
| `.btn-ghost`    | Transparent button, subtle outline, used for secondary actions |
| `.chip`         | Uppercase label chip (tags, metadata)                  |
| `.display-lg/md`| Display heading helpers                                |
| `.label-lg/md/sm` | Uppercase label helpers                              |
| `.body-lg/md`   | Body text helpers                                      |

---

## Scroll Reveal

Elements animate in (fade + translate up) as they enter the viewport. Add `data-reveal` to any element to opt in:

```html
<div data-reveal>Fades in when scrolled into view.</div>
```

Stagger multiple elements using `data-reveal-delay` (milliseconds):

```html
<h2 data-reveal data-reveal-delay="0">First</h2>
<p  data-reveal data-reveal-delay="80">Second</p>
<p  data-reveal data-reveal-delay="160">Third</p>
```

The IntersectionObserver is initialized globally in `Layout.astro` on `astro:page-load`, so it automatically re-runs after every View Transition navigation. Elements animate once and are then unobserved.

> **Do not add `data-reveal` to elements that already have a View Transition `transition:animate`** — the two systems will fight each other and produce a broken animation.

---

## Contact Modal

The contact form is powered by [EmailJS](https://www.emailjs.com/) and lives in `src/components/ContactModal.astro`. It is rendered inside `src/components/footer.astro`, which means it is available on every page.

Any element with the `data-open-contact` attribute will open the modal when clicked:

```html
<button data-open-contact>Get in Touch</button>
```

The EmailJS credentials (`SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY`) are set directly in `ContactModal.astro`. They are public-key credentials safe to expose in client-side code.

---

## View Transitions

Page navigation uses Astro's `ClientRouter` (View Transitions API). Project and blog listing cards share a `transition:name` with their corresponding detail page headers, enabling a morph animation between the two.

**Writing scripts that work with View Transitions:**

- Listen on `astro:page-load` instead of `DOMContentLoaded` — this fires on both the initial load and every subsequent navigation.
- For animations driven by `requestAnimationFrame`, cancel the loop on `astro:before-swap` (fires just before the DOM is replaced) and restart it on `astro:page-load`. This prevents stale loops running against a detached DOM.
- Re-query DOM elements inside the `astro:page-load` handler — never cache them at module top level, as they will be replaced on navigation.

```js
let rafId: number | null = null;

document.addEventListener('astro:before-swap', () => {
  if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
});

document.addEventListener('astro:page-load', () => {
  const el = document.getElementById('my-element'); // fresh query each time
  if (!el) return;
  function tick() { /* ... */ rafId = requestAnimationFrame(tick); }
  rafId = requestAnimationFrame(tick);
});
```
