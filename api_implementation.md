# API Integration – Implementation Guide

This document turns the architectural discussion and `API_DOCUMENTATION.md` into concrete, atomic steps you can follow to wire the external QuickShelf API into this Next.js (app-router) code-base.

> **Target Audience** – Developers building or maintaining the frontend. Follow the steps in order; tick them off as you go.

---

## 0  Prerequisites

1. **Node & pnpm** – Make sure you have a recent LTS version of Node and the package manager used in this repo (`pnpm`).
2. **Next 13/14 (app-router)** – The project already uses the new file-system routing.
3. **API server running** – The QuickShelf backend must be reachable, e.g. `http://localhost:80`.

---

## 1  Environment & Secrets

| Step | Action |
|------|--------|
| 1.1 | Create `.env.local` in the project root. |
|      | ```bash
|      | BACKEND_URL=http://localhost:80
|      | ``` |
| 1.2 | **DO NOT** prefix with `NEXT_PUBLIC_`; we only need this on the server. |
| 1.3 | Restart `next dev` after adding env vars so they are picked up. |

---

## 2  Recommended Directory Layout

```
app/
├─ lib/               ← Pure helpers (no React)
│   ├─ api/           ← One file per resource (books.ts, members.ts …)
│   └─ types.ts       ← Shared TypeScript interfaces (optional)
│
├─ api/               ← Next.js route handlers (proxy to backend)
│   ├─ books/route.ts
│   ├─ members/route.ts
│   └─ transactions/route.ts
│
├─ (feature folders)/ ← e.g. staff/member/search/
│   ├─ page.tsx       ← Server component: initial fetch
│   └─ ClientForm.tsx ← Client component: interactivity / re-fetch
└─ …
```

> Not using TypeScript yet? Keep the same structure but use `.js/.jsx` files.

---

## 3  Create Shared Types  *(Skip if JS only)*

| Step | Action |
|------|--------|
| 3.1 | `app/lib/types.ts` – Define reusable interfaces:<br/>`Member`, `Book`, `Transaction`, `ProblemDetails`. |
| 3.2 | Export types so server and client code stay in sync. |

---

## 4  Write **API Wrapper Functions** (Server-only)

> Goal: Centralise **all** calls to the external API so components never talk to it directly.

| Step | Action |
|------|--------|
| 4.1 | For each resource create `app/lib/api/<resource>.ts`. Example: `members.ts`. |
| 4.2 | Inside, read `process.env.BACKEND_URL`. |
| 4.3 | Implement the CRUD helpers using `fetch`.<br/>```ts
|      | // app/lib/api/members.ts
|      | import type { Member } from '../types';
|      | const BASE = process.env.BACKEND_URL;
|      | export async function fetchMembers(q?: URLSearchParams): Promise<Member[]> {
|      |   const url = `${BASE}/api/members${q ? `?${q}` : ''}`;
|      |   const res = await fetch(url, { next: { revalidate: 60 } });
|      |   if (!res.ok) throw await res.json(); // QuickShelf uses RFC 7807
|      |   const json = await res.json();
|      |   return json.data?.members ?? [];
|      | }
|      | ``` |
| 4.4 | Repeat for `fetchBooks`, `createMember`, etc. Follow endpoints in `API_DOCUMENTATION.md`. |
| 4.5 | Export everything from `app/lib/api/index.ts` for convenience. |

---

## 5  Add **Proxy Route Handlers** (Optional but Recommended)

These live under `app/api/*` and re-expose the backend to the browser under the same origin, hiding secrets and solving CORS.

| Step | Action |
|------|--------|
| 5.1 | Create `app/api/members/route.ts`. |
| 5.2 | Inside, import wrapper(s) from step 4 and forward the request:
|      | ```ts
|      | // app/api/members/route.ts
|      | import { NextResponse } from 'next/server';
|      | import { fetchMembers } from '@/app/lib/api/members';
|      | export async function GET(req: Request) {
|      |   const members = await fetchMembers(new URL(req.url).searchParams);
|      |   return NextResponse.json({ members });
|      | }
|      | ``` |
| 5.3 | Repeat for `books` and `transactions`. |
| 5.4 | If you need POST/PUT/DELETE, create matching functions. |

---

## 6  Server Components – Fetch Initial Data

| Step | Action |
|------|--------|
| 6.1 | In a server component (`page.tsx`) call the **wrapper** from step 4.<br/>
|      | ```tsx
|      | import { fetchMembers } from '@/app/lib/api/members';
|      | export default async function SearchPage() {
|      |   const members = await fetchMembers();
|      |   return <ClientForm initialData={members} />;
|      | }
|      | ``` |
| 6.2 | Use `revalidate` or `cache: 'no-store'` depending on freshness needs. |

---

## 7  Client Components – Interactivity & Re-fetching

| Step | Action |
|------|--------|
| 7.1 | Mark interactive components with `'use client';`. |
| 7.2 | On form submit, call **proxy endpoint** (e.g. `/api/members?...`). |
| 7.3 | Update local state with the JSON response. |
| 7.4 | Handle errors: the backend sends RFC 7807 objects. Display `title` & `detail`. |

---

## 8  Error Handling Strategy

1. **Backend follows RFC 7807** → Always expect `{ type, title, status, detail }`.
2. Create `parseProblemDetails(error)` helper in `app/lib/` to normalise responses.
3. Display human-friendly toast or inline alert in client components.

---

## 9  Security & CORS

1. Secrets stay in `.env.local` (server only).
2. Browser only talks to `/_next` + `/api/*` on the same origin → no CORS headaches.
3. Use HTTPS & secure cookies in production.

---

## 10  Testing & Linting

| Step | Action |
|------|--------|
| 10.1 | Add unit tests for wrapper functions with mocked `fetch`. |
| 10.2 | Add e2e tests (e.g. Playwright) that spin up the backend and assert UI flows. |
| 10.3 | Run `pnpm lint` to keep code consistent. |

---

## 11  Migration Tips (JS → TS)

1. Rename files one by one: `.js` → `.ts` / `.tsx`.
2. Enable `"strict": true` in `tsconfig.json` once most errors are resolved.
3. Leverage shared `types.ts` to eliminate duplication.

---

## 12  Next Steps / Checklist

- [ ] Step 1 completed – `.env.local` present.
- [ ] Step 4 wrappers implemented for **all** API endpoints you plan to consume.
- [ ] Step 5 proxy routes tested in browser (`/api/members`).
- [ ] Server components fetch data successfully.
- [ ] Client components handle user input & display errors.
- [ ] Tests pass.

Once every box is ticked, the frontend is fully wired to the QuickShelf API and ready for production ✌️ 