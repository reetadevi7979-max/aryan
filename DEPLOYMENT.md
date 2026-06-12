# Deployment

Recommended host: **Vercel**. It is the best fit for this TanStack Start app because it supports server-rendered React apps from GitHub with less setup than Render.

## Vercel

1. Push this project to GitHub.
2. Import the GitHub repo in Vercel.
3. Vercel will use `vercel.json`:
   - Install: `bun install --frozen-lockfile`
   - Build: `bun run build:vercel`
4. Add any real secrets in **Vercel → Project Settings → Environment Variables**.

Uploaded images are referenced through the published asset host, so the logo and portfolio images continue to load after deploying on Vercel or Render.

## Render

1. Push this project to GitHub.
2. In Render, create a new **Web Service** from the repo.
3. Render can use `render.yaml`, or set manually:
   - Build command: `bun install --frozen-lockfile && bun run build:render`
   - Start command: `bun run start:render`
   - Node version: `22`
4. Add any real secrets in **Render → Environment**.

## Env safety

- `.env` and `.env.*` are ignored by Git.
- Keep only example keys in `.env.example`.
- Never commit private keys or passwords.