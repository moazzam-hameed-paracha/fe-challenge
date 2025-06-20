# ComboML Frontend Challenge

**Author:** Moazzam Hameed Paracha

**Reviewers:**

- [remi-guan](https://github.com/remi-guan)
- [lingjiekong](https://github.com/lingjiekong)
- [goldmermaid](https://github.com/goldmermaid)
- [EnergentAI](https://github.com/EnergentAI)

---

**Demo:** [Watch on Loom](https://www.loom.com/share/f21b54de93814323bd3db9d95f5773a4?sid=a23fc831-940a-479c-80da-e01e95f5ccd7)

**Live Deployment:** [fe-challenge-beryl.vercel.app](https://fe-challenge-beryl.vercel.app/en#ai-hub)

A modern, production-ready Next.js 15 app with TypeScript, Tailwind CSS 4, and a modular component structure. Built for scalability, maintainability, and rapid development.

---

## Quick Start

```bash
npm install           # Install dependencies
npm run dev           # Start development server
npm run build         # Build for production
npm start             # Start production server
npm run lint          # Lint code
npm run pretty        # Format code
```

---

## Project Structure & Key Concepts

### `src/components/`

- **`ui/`**: Reusable, atomic UI primitives (Button, Card, Dialog, Input, etc.) used throughout the app for design consistency. Stateless, style-focused, and do not contain business logic.
- **`sections/`**: Each file is a major landing page section (Hero, Features, Pricing, Team, FAQ, etc.), making the homepage modular and easy to reorder or extend.
- **`custom/`**: Feature-rich, business-specific, or complex components that encapsulate advanced logic, state, or third-party integrations. These are not simple UI primitives, but rather self-contained feature modules. Example: `AIAudioPlayer`.

### `src/components/custom/AIAudioPlayer/`

A modular, extensible AI-powered audio player with real-time integration for Gemini and GPT APIs.

- **`AIAudioPlayer.tsx`**: Main entry, composes the player UI and context.
- **`components/`**: Subcomponents (Altair, AudioVisualizer, ControlTray, AudioPulse) for UI and audio feedback.
- **`contexts/LiveAPIContext.tsx`**: React context/provider for sharing live API state and logic.
- **`hooks/`**: Custom hooks for managing Gemini and GPT live connections, audio streaming, and state.
- **`lib/`**: Core logic for audio recording, streaming, client implementations, and audio worklets.
- **`types.ts`**: TypeScript types for client options, logs, and API contracts.
- **SCSS Support:** Example: `components/AudioPulse/audio-pulse.scss` for custom styles.

**How it works:**

- Detects which API key is present (Gemini or GPT) and initializes the correct client.
- Provides a context with all live API state and actions.
- UI is composed of modular subcomponents for visualization and control.
- Audio is streamed, visualized, and can be controlled in real time.

### `src/components/ui/`

- Contains atomic, stateless UI elements (e.g., Button, Card, Dialog, Input, Select, etc.).
- Used by both `sections` and `custom` components for a consistent look and feel.

### ShadCN Integration

- This project leverages ShadCN for building reusable UI components with Tailwind CSS.
- ShadCN provides a library of pre-designed components that are customizable and optimized for modern web applications.
- Components are styled using Tailwind utilities, ensuring consistency and responsiveness across the app.
- Example components include buttons, modals, and dropdowns, which are used extensively throughout the app.

### `src/components/sections/`

- Each file is a self-contained section of the landing page (e.g., Hero, Features, Pricing, Contact, etc.).
- Sections are imported and composed in the main page layout for flexibility.

---

## Site Layout & Routing

- **App Directory Structure:** Uses Next.js 15 App Router. All routes and layouts are under `src/app/`.
- **Localization:**
  - All routes are locale-aware via `[locale]` segment in `src/app/[locale]/`.
  - `next-intl` is used for i18n, with helpers in `src/i18n/` and translation files in `src/locales/`.
  - The layout (`src/app/[locale]/layout.tsx`) loads the correct locale, provides translations, and wraps the app in a theme provider.
- **Theme:** Light/dark mode via `ThemeProvider`.
- **Error Handling:** Custom error and not-found pages in `src/app/[locale]/error.tsx` and `not-found.tsx`.

---



## State Management

This project uses the React Context API for state management, especially for sharing live API state and logic in the AI audio player and related components.

- The Google reference implementation for the Gemini/GPT audio client already used Context, so reusing and extending that code was the most efficient and robust approach.
- For a single-page application (SPA) with mostly local and feature-specific state, Context is lightweight, easy to reason about, and avoids unnecessary boilerplate.
- Solutions like Redux or Zustand are more suitable for large-scale, multi-page apps with deeply nested or cross-cutting state. For this project, they would add complexity without clear benefit.
- Context is fully compatible with React Server Components and the Next.js App Router.

**Summary:** Context API is a perfect fit for this SPA, and reusing the Google implementation ensures reliability and maintainability.

---

## Internationalization (i18n)

- **Locale Routing:** All pages are served under a locale prefix (e.g., `/en`).
- **Translation Files:** All strings are in `src/locales/en.json` (add more for other languages).
- **Helpers:**
  - `src/i18n/routing.ts`: Defines supported locales and default.
  - `src/i18n/navigation.ts`: Locale-aware navigation helpers.
  - `src/i18n/request.ts`: Loads messages for the current locale.

---

## Tailwind CSS 4 & Styling

- **Tailwind 4:** All Tailwind config is in `src/app/globals.css` (no separate config file). Tokens, colors, and custom variants are defined here for full design control.
- **@layer base:** Used for global resets and base styles.
- **SCSS Support:** You can use `.scss` files for custom component styles (see `AudioPulse/audio-pulse.scss`).
- **tw-animate-css:** Utility classes for advanced animations.

---

## Public Folder & Assets

- **Images & Icons:** All static assets (PNG, SVG, WEBP, ICO) are stored in `public/` and its subfolders (`logos/`, `icons/`).
- **How to update:** Add or replace files in `public/` to change images, icons, or branding. Example: `public/site-ss.png` for social previews.
- **SVG Placeholder:** `public/placeholder.svg` is used for empty or loading states.

---

## Prettier & Code Style

- **Prettier:** Formatting is enforced via the `pretty` script and `.prettierrc` config file. Change settings in `.prettierrc` to update formatting rules (e.g., quotes, tab width, trailing commas).
- **ESLint:** Linting is configured in `eslint.config.mjs` for code quality and style consistency.

---

## Packages Used

**Core:**

- next, react, react-dom, typescript, tailwindcss, postcss, sass

**UI & Styling:**

- @radix-ui/react-dialog, @radix-ui/react-label, @radix-ui/react-select, @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge, tw-animate-css, lucide-react

**AI & Audio:**

- @google/genai, eventemitter3

**Validation:**

- zod, lodash

**Animation:**

- framer-motion

**i18n:**

- next-intl

**Dev Tools:**

- eslint, prettier, @typescript-eslint/*, @types/*

---

## Environment & Configuration

- See `.env.template` for required environment variables (API keys, etc.).
- If both Gemini and GPT keys are set, Gemini takes precedence.
- Path aliases are set up in `tsconfig.json` and `components.json` for cleaner imports.

---

## GPT VAD Limitations & Recommendations

### GPT Voice Activity Detection (VAD) Limitations

- **Sensitivity:** OpenAI GPT's VAD is highly sensitive to background noise and short silences. This can cause the player to stop listening or cut off responses prematurely.
- **Robustness:** Gemini's VAD is more robust and tolerant to noise, which is why the Gemini player works more reliably in noisy environments.
- **Config Options:** The GPT VAD exposes only a few tunable parameters (e.g., `silence_duration_ms`, `prefix_padding_ms`), and even with adjustments, it may still be unreliable in non-ideal conditions.
- **Known Issue:** This is a limitation of the GPT API and not a bug in the implementation.

### Recommendations for Best Results

- **Increase `silence_duration_ms`:** Try values between 500–1000ms to make VAD less sensitive to short pauses. --- Already done.
- **Increase `prefix_padding_ms`:** Try 500ms or more to help with noise at the start of speech. --- Already done.
- **Noise Suppression:** Use a quiet environment or consider adding a client-side noise gate/filter before sending audio to GPT.
- **User Feedback:** Inform users that GPT's VAD is sensitive to background noise and recommend using Gemini for more robust audio streaming.

---

## Contributing

Contributions, bug reports, and feature requests are welcome! Please open an issue or submit a pull request.

For more, see the codebase and comments. Contributions and feedback welcome!
