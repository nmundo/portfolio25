# portfolio25

Personal portfolio a terminal/CRT-themed single-page site built with
SvelteKit. Live at [nathanmundo.com](https://nathanmundo.com).

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) 2 / [Svelte](https://svelte.dev) 5
- [Vite](https://vite.dev) 7
- [Tailwind CSS](https://tailwindcss.com) 4 (via `@tailwindcss/vite`)
- Deployed to GitHub Pages
## Structure

```
src/
  app.css                 global terminal theme, animations, a11y utilities
  app.html                document shell
  lib/
    Header.svelte         nav + social links
    Experience.svelte     work-history timeline
    Carousel.svelte       project screenshot slideshow (enhanced:img)
    assets/projects/      project screenshots (optimized at build time)
  routes/
    +layout.svelte        header, SEO <head>, view transitions
    +page.svelte          home (hero / about / skills / experience)
    +error.svelte         404 page
    projects/+page.svelte project showcase
    sitemap.xml/+server.ts  prerendered sitemap
static/                   favicon, robots.txt, og-image, CNAME
```

## Notes

