/// <reference types="vitest" />

import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/colors",
  plugins: [svelte(), svelteTesting()],
  test: { globals: true, environment: "jsdom" },
});
