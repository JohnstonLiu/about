# johnstonliu

Bun workspace for two static Astro sites, deployed to Cloudflare Pages.

| Path | Site | Cloudflare Pages project |
| --- | --- | --- |
| `apps/about` | [johnstonliu.me](https://johnstonliu.me) | `johnstonliu-about` |
| `apps/docs` | [docs.johnstonliu.me](https://docs.johnstonliu.me) | `johnstonliu-docs` |
| `packages/shared` | Fonts, icons, `_headers`, `robots.txt` and the build integration both sites use | |

## Commands

| Command | What it does |
| --- | --- |
| `bun install` | Install the workspace (Bun version pinned by `packageManager`) |
| `bun run dev:about` / `bun run dev:docs` | Run one site locally |
| `bun run check` | Biome, then `astro check` in both apps |
| `bun run build` | Build both apps into `apps/*/dist` |
| `bun run format` | Apply Biome formatting and safe fixes |

## Deploys

`.github/workflows/ci.yml` checks and builds both apps on every pull request and push to `main`, then deploys only the apps whose files changed. A change under `packages/shared` or to root config deploys both. Pushes to `main` deploy to production; pull requests from this repository get preview deploys.

Repository secrets: `CLOUDFLARE_API_TOKEN` (Cloudflare Pages: Edit) and `CLOUDFLARE_ACCOUNT_ID`.

## Whitespace

Biome formats Astro markup with HTML whitespace rules, so both apps set `compressHTML: true` instead of Astro 7's `'jsx'` default. Markup inside `{}` expressions is formatted as JSX, which can move an inline element's text onto its own line; render inline links built in expressions through a component, as `ProjectLink.astro` does. Biome's Astro formatter is experimental and sometimes needs a second `bun run format` to settle.

## Licenses

CMU Sans Serif is under the SIL Open Font License (`packages/shared/fonts/OFL.txt`), subset to Latin. The contact icons on johnstonliu.me are from [Font Awesome Free](https://fontawesome.com/license/free) (CC BY 4.0).
