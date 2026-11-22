import sitemap from "@astrojs/sitemap";
import sharedAssets from "@johnstonliu/shared/integration";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { SITE } from "./src/siteConfig.ts";

export default defineConfig({
  site: SITE.url,
  compressHTML: true,
  integrations: [sitemap(), sharedAssets({ name: SITE.title })],
  markdown: {
    shikiConfig: {
      theme: "kanagawa-wave",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
