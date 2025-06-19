import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1) Next.js defaults
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2) TypeScript recommended rules
  ...compat.extends("plugin:@typescript-eslint/recommended"),

  // 3) Prettier integration (disables ESLint formatting rules that conflict)
  ...compat.extends("plugin:prettier/recommended"),

  // 4) Your custom rules
  {
    rules: {
      // enforce semicolons, warn only
      semi: ["warn", "always"],

      // catch unused vars, warn only
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // keep these off or in sync with Prettier
      quotes: ["warn", "double"], // if you want double-quotes
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
];

export default eslintConfig;
