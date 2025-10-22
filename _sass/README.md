---
title: StudioRich CSS Pipeline Overview
date: 2025-10-06
purpose: README
status: internal
visibility: private
---

# 🎨 StudioRich CSS Pipeline Overview

This document explains how the StudioRich CSS system is structured and maintained.  
It uses
**Sass (modular @use syntax)** with **PostCSS**,
**PurgeCSS**,
**Autoprefixer**,
for performance, automation, and maintainability.

---

## 🧠 Architecture

**Pipeline Flow:**
\_sass/partials → css/main.scss → css/main.css → css/main.purged.css

**Core Tools**
| Tool | Purpose |
|------------------------|-------------------------------------------------------------|
| **Sass** | Modular architecture using `@use` + shared mixins/variables |
| **PostCSS** | Handles Autoprefixer, PurgeCSS, and custom logging |
| **PurgeAndLog.js** | Logs removed selectors to `css/unused.css` |
| **Autoprefixer** | Adds vendor prefixes for cross-browser support |
| **CSS Stats Reporter** | Reports bundle size and selector counts at build time |

---

## 🧩 Folder Structure

```bash
_sass/
utils/
    _variables.scss
    _mixins.scss
base/
    _reset.scss
    _typography.scss
layout/
    _grid.scss
    _containers.scss
ui/
    _nav.scss
    _index.scss
css/
    main.scss
    main.purged.css # production output
```

---

## 🧱 Commands

| Command             | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| `npm run sass`      | Compiles Sass → `css/main.css`                              |
| `npm run build:css` | Compiles Sass, then runs PostCSS (Purge + Autoprefix + Log) |
| `npm run dev`       | Runs Jekyll locally (`jekyll serve`)                        |
| `npm run build`     | Full production build (`JEKYLL_ENV=production`)             |
| `npm run watch:css` | Watches Sass for changes and auto-builds (see below)        |

---

## ⚙️ Development Convenience

Add this script to `package.json` for live rebuilding during development:

```json
"watch:css": "sass --watch --load-path=_sass css/main.scss css/main.css" #added
```

This keeps the CSS current without needing to re-run npm run build:css.

# 🧹 CSS Stats Reporting

You can install and use
[postcss-reporter] [https://github.com/postcss/postcss-reporter]
[postcss-browser-reporter] [https://github.com/postcss/postcss-browser-reporter]
to log CSS size and rule counts.

Example addition to postcss.config.cjs:

```js
require('postcss-reporter')({ clearReportedMessages: true })
```

Run:

```bash

npm run build:css

```

Console will print number of selectors, file size, and warnings.

# 🚨 Error Guard

To prevent the build from halting on syntax errors, add a wrapper script:

```bash
npm run sass || echo "⚠️ Sass compilation failed — check your syntax."
```

Or in package.json:

```json
"build:css": "npm run sass || exit 0 && postcss css/main.css -o css/main.purged.css"
```

This ensures the pipeline doesn’t break your Jekyll serve process mid-edit.

# Git Hygiene

`.gitignore`

```bash
css/main.css
css/unused.css
```

Keeps transient files out of commits.

# 🧩 Notes

- All dynamic selectors (is-, js-, u-, etc.) are safelisted in PurgeCSS.
- Only main.purged.css should be used in production.
- Always verify npm run build:css before deploying.

\_layouts/
├── default.html
├── home.html
├── post.html
\_includes/
├── head.html
├── header.html
├── footer.html
├── sidebar.html ← ✅ we’ll create or replace this
\_sass/
└── ui/\_nav.scss
assets/
└── img/icons/...
