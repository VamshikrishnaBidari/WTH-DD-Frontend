import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js, react: pluginReact },
    languageOptions: {
      globals: globals.browser,
    },
    extends: ["js/recommended"],
    rules: {
      // Disable this rule completely
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect", // auto-detect React version
      },
    },
  },
  tseslint.configs.recommended,
  // Important: Override pluginReact flat recommended config to disable the rule:
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: { react: pluginReact },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
]);
