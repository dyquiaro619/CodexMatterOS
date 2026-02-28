# MatterOS Frontend (Command Center)

This project is a Next.js App Router frontend for the MatterOS Partner Command Center.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. (Optional) set `MATTEROS_API_BASE_URL` in `.env.local` when your API is on a different origin.

3. Start dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data wiring

The page fetches:
- `GET /api/dashboard`
- `GET /api/at-risk`

Expected API response envelope:

```json
{ "data": ... }
```

If endpoints are unavailable, the UI falls back to deterministic mock data so the command surface still renders.
