# GigLedger

Taxes for the 1099 life. Track income, expenses, and estimated taxes for rideshare, freelance, and every side hustle in between.

## Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict)
- **Tailwind v4** (CSS-first, no config file)
- **pnpm**

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo, features, waitlist form |
| `/try` | Tax estimator — enter income + expense, see quarterly estimate + YTD table |
| `/api/waitlist` | `POST { email }` — proxies to waitlist API with `product: "gigledger"` |

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Hosted on [Vercel](https://vercel.com). Push to `main` to auto-deploy. No environment variables required.

## Status

v0 skeleton — landing page ported from `index.html`, tax estimator at `/try`, and waitlist API wired up. Full product (bank connect, auto-categorization, filing) coming post-launch.
