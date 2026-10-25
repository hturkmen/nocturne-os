# Implementation notes

## Architecture and interaction

Next.js App Router with a client OS shell and five lazy-loaded application modules. The reducer centralizes app order, focus, open/close and minimization. Motion handles transform/opacity transitions and desktop drag controls. Windows remain within conservative movement bounds; title bars stay reachable. Red closes, yellow minimizes and green expands. Closing restores focus to the associated dock launcher. A phone-specific CSS mode presents applications as full-screen panels above the dock, using dynamic viewport height, safe-area padding and internal scrolling. The background desktop becomes inert and invisible while locked.

Lock: pointer swipe-up threshold 65px, click control and Enter/Space fallback, optional relock. Photos: lazy optimized local images, category filters, captioned viewer, arrows, swipe and keyboard navigation; Escape closes the viewer before its app. Safari: internal history/back/forward, home/work/about/contact views, explicit inspiration links and mailto/social destinations. Notes: validation, honeypot, length limits, pending/error/success states, persistent private browser demo. Guestbook: approved-only server query ordered newest, example seeds clearly labelled, private local submissions shown separately. After Hours: original event identity showcase and actual downloadable concept text file, no admission/payment claim.

## Configuration and assets

`src/content/site.ts` holds owner/contact/editorial/project/gallery/app metadata and seed examples. Static UI text belongs to app components. Edit example email and social root URLs before deployment. The current owner is fictional.

Local replacement imagery sourced from Unsplash (not copied from the reference):

- wallpaper.jpg: https://images.unsplash.com/photo-1519608487953-e999c86e7455 (night city photograph)
- live.jpg: https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3
- crowd.jpg: https://images.unsplash.com/photo-1514525253161-7a46d19cd819
- stage.jpg: https://images.unsplash.com/photo-1516450360452-9312f5e86fc7

Replace freely using local image paths; downloaded files total around 1.2MB and are further optimized by Next Image. Original custom typography/layout and Lucide-based app icon treatments; no proprietary reference logos. No autoplay video/audio, tracking, or external iframes.

## Storage, moderation and security

The optional Supabase path uses REST and a server-only service key, with DB length constraints, RLS and a service-only submission RPC. The RPC uses an advisory lock plus persistent hashed-client cooldown, so parallel/serverless instances cannot evade the 60-second per-client limit. Moderators approve manually in Supabase. Approved query exposes only id/name/message/date. Text is rendered through React, never arbitrary HTML. Origin is compared with the request Host, body is capped at 4096 characters, and a honeypot rejects simple bots. The client receives no service key. A reverse proxy must supply trustworthy IP headers; deployment-level abuse controls remain recommended for substantial public traffic.

Demo mode is intentionally private localStorage and shows success only after persistence succeeds. Storage failures show error feedback. The API does not claim durable public storage when credentials are absent. Live database credentials were not available, so the SQL/production integration is provided but not tested against a real Supabase instance.

## Reference comparison and scope

Retained: full-screen photographic world, OS menu/dock, live date/time, lock gesture, layered desktop windows, Notes/visitor messages, media library and browser/project showcase. Deliberately changed: original night-city wallpaper and sage/ivory palette, still photography rather than the reference's large video library, editorial serif accents, mobile full-screen app navigation, fitted dock. The reference's Camera and Calendar are documented but omitted; five required app workflows receive the implementation focus. The reference's Jetron is confirmed as a company showcase, so After Hours is explicitly a design concept with no checkout.

## Verification

Build, lint, strict typecheck, and Playwright smoke journeys run locally. The test suite covers desktop 1440×900, tablet 768×1024, iPhone 390×844, Android 412×915, and landscape 844×390. It exercises lock/unlock, app open/close, Safari history, gallery viewer/navigation, note submission/local persistence, guestbook rendering, ticket download, horizontal overflow, runtime errors, minimization, focus restoration and keyboard/drag unlocking. Screenshots under `docs/screenshots` record initial lock, home, desktop/mobile Safari, gallery, Notes and Guestbook. A separate Chromium touch-emulation test verifies swipe unlock, dock tap launching, gallery swipe and reduced-motion preference. Physical-device performance, Safari/WebKit rendering, assistive technology audits and production database access remain unverified.

The CLI GitHub token failed authentication. Connected GitHub read access confirmed the account, but available connector tools expose no create-repository action. Source is committed locally and ready to push once repository creation access is available; no remote URL is fabricated.
