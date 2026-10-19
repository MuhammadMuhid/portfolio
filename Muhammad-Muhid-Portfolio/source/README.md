# Muhammad Muhid - React + GSAP portfolio

## Preview or deploy without installation

Use the supplied `site` folder in the complete package, or the separate Vercel
Upload ZIP. `index.html` must be at the upload root, alongside `assets`, `images`,
`vendor`, the resume PDF, favicon, and third-party notices. Do not upload `source`
to Vercel Drop. This source directory is for editing and rebuilding.

The standalone `Muhammad-Muhid-Preview.html` embeds the SAME compiled app, React,
GSAP, photo, and resume. It is intended for a quick browser preview.

## Edit and run locally

Node.js 20 or later:

```sh
npm install
npm run dev
```

Open http://localhost:5173. Files are recompiled after changes; refresh the browser
to see them. Stop the server with Ctrl+C.

```sh
npm run build
npm run preview
```

`npm run build` creates `dist/` and a new standalone preview HTML. Upload the CONTENTS
of `dist/` to static hosting. There is no backend, database, API key, or .env file.

## Where to make changes

- `src/content.js`: name, contact links, resume path, projects, experience, skills.
- `src/App.jsx`: the actual React components, sections, accessible dialogs.
- `src/styles.css`: color variables, typography, spacing, mobile breakpoints.
- `src/motion.js`: actual GSAP timelines, ScrollTrigger pins, scroll-to, cleanup.
- `public/images/muhammad-muhid.jpg`: original supplied photo.
- `public/Muhammad-Muhid-Resume.pdf`: original supplied resume.
- `index.html`: title, description, social preview metadata.

For your final custom domain, replace `og:image` in index.html with the absolute
public URL of your photo, and add your production canonical URL. A working
portfolio does not require either to render; social link previews benefit from it.

## Runtime and build

The bundled runtime is React 18.3.1, ReactDOM 18.3.1, GSAP 3.15.0, ScrollTrigger,
and ScrollToPlugin. Vendor distributions, with their original license headers,
are in `public/vendor/`.

This is a small portable React JSX build, not a Vite project. The TypeScript
transpiler compiles the explicit modules into one browser script; the static
builder keeps React and GSAP local. `typescript` is the only install-time tool
needed, and its version is pinned in package.json. The tested builder does not
require bundler binaries, external fonts, or CDN access.

## Behavior

- Masked hero entrance and a reversible, scroll-expanding portrait (desktop).
- A pinned horizontal selected-work gallery (desktop); real vertical cards on mobile.
- Reversible scroll-controlled 3-layer system assembly, without WebGL.
- Scroll-painted introduction, animated real project metrics, rotating seal,
  moving type strip, magnetic primary links, and a reading-progress line.
- Project dialogs, experience/academic disclosures, mobile menu, keyboard focus,
  email/phone links, downloadable resume, and email-copy fallback.
- Motion toggle and OS reduced-motion support. Reduced motion retains all content.

There is NO fake contact form: email buttons open the visitor's email app; the
phone button opens the dialer. Nothing is silently submitted to a server.

## Content notes

Professional facts and all project metrics come from the supplied resume, not
LinkedIn. The LinkedIn page was not accessible during this build; the supplied
profile URL is included as a link. Company spelling is preserved as provided.

The 47/28/7/0 metrics describe one internal BI platform migration. The website
project artworks are labelled presentation illustrations, not screenshots of
production systems. No confidential dashboard, fabricated testimonial, invented
revenue, GitHub profile, or client count is published. See CONTENT-SOURCES.md.

## Validation

Read the complete package's QA-REPORT.json. Runtime validation uses the actual
compiled HTML in Chromium plus static-server response checks. Browser URL
navigation is administratively blocked in the build environment, so the compiled
standalone HTML was injected into Chromium for rendering and interaction tests.
Actual Vercel deployment, Safari, and real iOS devices were not tested.
