# beluga-tokens-min-test

Minimal Vite + React + Tailwind app to validate:
Google Sheets -> Apps Script commits `design/tokens.json` -> Vercel build -> styles update.

## Local
```bash
npm install
npm run dev
```

## Notes
- `npm run tokens` generates:
  - `src/styles/tokens.css` (semantic tag styles + CSS vars)
  - `design/tailwind.tokens.cjs` (Tailwind extend: fontFamily, fontSize, colors)
