# NOCTURNE OS

An immersive personal portfolio built with Next.js App Router, strict TypeScript, Tailwind CSS, Motion, Lucide, and Next Image. A lock screen opens into a desktop with draggable, focusable windows; phones get intentional full-screen applications.

## Run

Node 22+ recommended.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. No database credentials needed. Swipe up, click the unlock control, or press Enter. Launch apps from the desktop or dock. Drag a window title bar; red closes, yellow minimizes, green expands. Escape closes the active app; gallery arrows navigate photographs. Lock again with the menu bar lock.

```sh
npm run build
npm start
npm run lint
npm run typecheck
npm test
```

Playwright uses system Chromium at `/usr/bin/chromium` in this workspace. On other machines install Chromium with `npx playwright install chromium` and remove the `executablePath` override in `playwright.config.ts`. Smoke tests start or reuse port 3000. Tests assume local demo mode; do not point them at production credentials.

## Personalize

Edit `src/content/site.ts`: owner, name, email, biography, location, app labels, wallpaper, gallery, socials, projects, seed testimonials and event details. Example owner/contact data are intentionally labelled and should be replaced before publishing. Project links are explicitly inspiration destinations, not fabricated live client work. Images are local Unsplash replacements, not reference-site assets. Sources are listed in implementation notes.

## Visitor notes

Without credentials, server validates the note, then the client persists it in localStorage. Success is shown only after localStorage succeeds. Notes survive reloads in the same browser; they are private, can be removed by clearing site data, and do not sync. Seed guestbook messages are visibly labelled examples.

For production, create a Supabase PostgreSQL project, execute `docs/supabase.sql`, and configure the three server-only variables in `.env.example`. All inserts remain pending until a moderator sets `approved=true` in Supabase. No public update/insert policy is granted. The database RPC serializes submissions per hashed IP and enforces a 60-second cooldown across server instances. Configure your deployment proxy to overwrite `x-forwarded-for` with trusted client IPs; do not expose the origin directly with spoofable forwarding headers. Configure an infrastructure-level rate limit/WAF for high-traffic deployment. No payment, booking or email delivery is simulated.

## Documentation

- `docs/reference-analysis.md`: confirmed reference observations and limitations.
- `docs/implementation-notes.md`: architecture, verification, storage and tradeoffs.
- `docs/screenshots/`: implementation and reference screenshots.
- `tests/os.spec.ts`: desktop/tablet/mobile/Android/landscape journeys.

## GitHub

Source repository: [hturkmen/nocturne-os](https://github.com/hturkmen/nocturne-os). The default branch is `main`.

```sh
git clone https://github.com/hturkmen/nocturne-os.git
cd nocturne-os
npm ci
npm run dev
```

The repository includes the complete Next.js application, setup documentation, reference analysis, browser screenshots, and Playwright smoke tests. Database credentials are optional for local exploration.
