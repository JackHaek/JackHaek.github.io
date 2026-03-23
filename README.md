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
├── content.config.ts        # Content collection schema
├── content/
│   ├── projects/
│   │   └── my-project/          # one directory per project
│   │       ├── my-project.mdx   # same name as the directory
│   │       ├── hero.jpg         # images co-located here
│   │       └── screenshot.png
│   └── blog/
│       └── my-post/             # one directory per post
│           ├── my-post.mdx      # same name as the directory
│           └── hero.jpg
├── pages/
│   ├── index.astro
│   ├── projects.astro           # project gallery listing
│   ├── projects/
│   │   └── [id].astro           # dynamic project detail page
│   ├── blog.astro               # blog listing
│   ├── blog/
│   │   └── [slug].astro         # dynamic blog post page
│   ├── about.astro
├── components/              # Shared Astro components
├── layouts/
│   └── Layout.astro
└── styles/
    └── global.css           # Design system tokens
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
description: "One paragraph description shown in the page header."
tags: ["C++", "Kubernetes"]     # required — rendered as chips in the header
image: "./hero.jpg"             # optional — relative to the MDX file
imageAlt: "Description of image"        # optional
featured: false                 # optional, default false
publishDate: 2025-06-01         # required
status: "active"                # required — "active" | "completed" | "archived"
github: "https://github.com/..." # optional
demo: "https://..."              # optional
---
```

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
