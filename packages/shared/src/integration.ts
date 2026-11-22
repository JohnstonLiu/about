import { cp, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

const THEME_COLOR = "#000000";

interface SharedAssetsOptions {
  name: string;
}

function getManifest({ name }: SharedAssetsOptions): string {
  return JSON.stringify({
    name,
    short_name: name,
    start_url: "/",
    display: "browser",
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon.ico", sizes: "256x256", type: "image/png" },
    ],
  });
}

export default function sharedAssets(
  options: SharedAssetsOptions,
): AstroIntegration {
  return {
    name: "@johnstonliu/shared",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const assetsDir = new URL("../assets/", import.meta.url);
        await cp(fileURLToPath(assetsDir), fileURLToPath(dir), {
          recursive: true,
        });
        await writeFile(new URL("site.webmanifest", dir), getManifest(options));
      },
    },
  };
}
