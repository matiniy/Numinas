# AGENTS.md

## Cursor Cloud specific instructions

### What this is
Numinas is a static marketing site: React 18 + TypeScript + Vite + Tailwind, with GSAP/Motion animations. `src/` is the SPA (routes defined in `src/App.tsx`). `api/contact.ts` is a Vercel serverless function for the contact form; it is not served by `vite dev`.

### Commands (see `package.json` scripts)
- Dev server: `npm run dev` → http://localhost:5173
- Build: `npm run build` (runs `prebuild`/`postbuild` SEO scripts, then `tsc && vite build` → `dist/`)
- Preview built output: `npm run preview`
- Tests: `npm run test:run` (Vitest). There are currently no test files, so it reports "No test files found".

### Non-obvious caveats
- `npm run lint` currently fails due to a pre-existing eslint config bug in `.eslintrc.cjs`: it extends `@typescript-eslint/recommended` instead of `plugin:@typescript-eslint/recommended`. This is a code/config issue, not an environment problem.
- The contact form (`src/components/sections/Contact.tsx`) POSTs to `/api/contact`, which only runs under the Vercel runtime (needs `BREVO_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). Under `npm run dev` this endpoint returns 404, so form submission shows the error state. Everything else (routing, animations, media) works with plain `vite dev`.
- Env vars come from `.env` (see `.env.example`). `VITE_SITE_URL` feeds canonical/OG/sitemap generation; the app runs fine without a custom `.env`.
