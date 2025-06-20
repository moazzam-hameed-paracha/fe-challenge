# ComboML Frontend Challenge

**Author:** Moazzam Hameed Paracha

A modern, production-ready Next.js 15 app with TypeScript, Tailwind CSS, and a modular component structure. Built for scalability, maintainability, and rapid development.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run pretty
```

## Scripts (package.json)

- `dev` – Start Next.js in development mode
- `build` – Build the app for production
- `start` – Start the production server
- `lint` – Run ESLint for code quality
- `pretty` – Format code with Prettier

## File Structure

- `src/app/` – App entry, routing, layouts, and global styles
- `src/components/` – UI, custom, and section components
- `src/components/custom/GeminiLivePlayer/` – Modular live player with subcomponents, hooks, and context
- `src/components/sections/` – Page sections (hero, features, pricing, etc.)
- `src/components/ui/` – Reusable UI primitives (button, card, dialog, etc.)
- `src/i18n/` – Internationalization helpers
- `src/locales/` – Translation files (e.g., `en.json`)
- `public/` – Static assets (images, icons, logos)
- `middleware.ts` – Next.js middleware
- `utils/` – Shared utility functions

## Tech Stack & Config

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** (with PostCSS)
- **Radix UI** (accessible UI primitives)
- **Prettier & ESLint** (code style & linting)
- **Zod** (schema validation)
- **Framer Motion** (animations)
- **next-intl** (i18n)
- **Lucide** (icon library)

## Notes

- Uses path aliases (see `tsconfig.json` and `components.json`)
- All styling via Tailwind CSS (`src/app/globals.css`)
- Modular, scalable component and section structure
- Just look at (`.env.template`) to know env var names.
- If both **gemin** and **gpt** key added, gemini takes precedence.

---

For more, see the codebase and comments. Contributions and feedback welcome!
