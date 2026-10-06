import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import unicorn from 'eslint-plugin-unicorn';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      unicorn,
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  eslintPluginPrettier,
]);
