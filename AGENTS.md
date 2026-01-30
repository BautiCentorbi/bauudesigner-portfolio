# Repository Guidelines

## Project Structure & Module Organization
- `app/` is the Next.js App Router source. Route entry points live in `app/page.tsx` and `app/layout.tsx`.
- Feature-level UI sits in `app/components/` (section components, shared UI).
- Content/data modules live in `app/data/` (e.g., `*.data.ts`).
- Client utilities and hooks are in `app/lib/` and `app/hooks/`.
- API routes are under `app/api/` (e.g., `app/api/send/route.ts`).
- Static assets are in `public/`.

## Build, Test, and Development Commands
- `npm run dev`: start the local dev server at `http://localhost:3000`.
- `npm run build`: create the production build.
- `npm run start`: run the production server from the build output.
- `npm run lint`: run ESLint with the Next.js + TypeScript config.

## Coding Style & Naming Conventions
- TypeScript + React (Next.js App Router). Use 2-space indentation and match existing file formatting.
- Components use PascalCase (e.g., `Hero.tsx`), hooks use `useX` (e.g., `useScroll.ts`).
- Tailwind CSS is used for styling via `@tailwindcss/postcss`; keep class lists readable and grouped by layout → spacing → color.
- Linting is enforced by `eslint-config-next` (core-web-vitals + TypeScript). Run `npm run lint` before PRs.

## Testing Guidelines
- No automated test framework is configured in this repo yet.
- If you add tests, document the framework in this file and include commands in the `scripts` section.

## Commit & Pull Request Guidelines
- Commit messages are short, imperative, and human-readable (e.g., “Responsive Nav+Hero+LogoGallery”).
- Keep commits focused on a single change set.
- PRs should include: a clear summary, screenshots for UI changes, and any relevant issue links.

## Security & Configuration Tips
- Secrets are loaded from `.env` (Resend + reCAPTCHA). Do not commit real keys.
- If you introduce new env vars, update `.env` and document expected names here.