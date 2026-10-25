# Reference investigation — frvky.online

Inspected 25 October 2026 using Playwright + system Chromium. Evidence in `screenshots/reference`, raw publicly visible text/control inventories in `reference-observations.txt`, `reference-apps.txt`, and `reference-details.txt`. No forms submitted, no private content requested, no reference scripts downloaded for execution outside normal page browsing.

## Confirmed visual structure

Full viewport interface. Initial photographic black-and-white lock wallpaper (DJ/concert portrait), not a conventional landing page. Clock/date appear after the initial transition: approximately 86px bold sans serif clock on desktop, date centered above. Two translucent rounded notifications are centered lower on the desktop; a small chevron and “Swipe up to unlock” sit at the bottom. The initial screenshot captures an early state before the clock appeared; `desktop-lock-loaded.png` captures the settled state.

Unlocking by upward mouse drag worked at 1440×900, 768×1024 and 390×844. The unlocked background is a moving warm-toned photographic/video scene, rather than the grayscale lock image. Top menu reads frvky, Finder (or active app), File, Edit, View, Window; Wi-Fi, battery, date/time sit right. Desktop dock has rounded translucent brown/gray glass, app icons, active dots, and separated social links. The phone view hides the text menu items but retains top status and a wide dock; the dock is visibly clipped at 390px in the captured state.

Desktop windows are floating, layered, light surfaces, ~12px corners with substantial dark soft shadows. Title bars have macOS red/yellow/green controls labelled Close, Minimize, Full size. Opening successive apps leaves preceding windows behind and updates the active menu name. Escape did not close those windows during inspection. Some launcher clicks were intercepted by an overlapping window; the follow-up investigation used a clean view and explicit closing. Drag boundaries and keyboard focus cycling were not fully established.

## Application inventory and user flow

- Calendar: month grid, previous/next controls, selected date, “Book a meeting”, and an event entry. This was discovered beyond the initial brief.
- Photos: Library grid with many video durations and Library/Albums navigation. Selecting a media item opened a viewer with Done and a playback timeline. Playback availability and swipe navigation were not verified; do not infer a still-photo-only library.
- Safari: project tabs (including Creativblock and Dance Eko), address bar and description. A portfolio/project browser concept is confirmed. Back/forward behavior and all remote projects were not exhaustively inspected.
- Notes: pale warm paper background, folder list (Testimonials, Websites), long list of personal/work writing. Selecting Testimonials displayed many visitor messages attributed to a name or “someone who stopped by.” Read-only workflow was inspected. A notification invites visitors to write a note. No actual message submitted; moderation, persistence, rate limiting and server validation cannot be established from this public inspection.
- Camera: displays “Camera access is off” and “Choose a photo instead”, with PHOTO mode. Permission was not granted and no photo uploaded.
- Jetron Ticket: confirmed project/company showcase, headed “Co-founder & CEO”, with Visit, description and features (event moments, embedded ticketing, seat maps, fair queues, music previews, offline tickets, event map, wallet payouts). It is not an observed checkout. The implementation therefore uses an original event-identity showcase with an explicitly non-valid concept ticket, not a booking claim.
- External dock links: mailto, Instagram, X, YouTube, TikTok, LinkedIn. Destination hrefs were inspected, no messages sent. Owner identities are not reused.

## Screen/state inventory

Captured: initial and post-gesture at all three required viewports; settled desktop lock; Calendar; Photos library; Safari; Notes folder screen; Camera access-off; Jetron showcase; Testimonials; media viewer. Initial loading reveals wallpaper before clock. Notification content varies with viewport/time. Reference backend error/confirmation states could not be safely triggered without a submission. Keyboard Escape was tested and did not dismiss windows in this session. Touch input as actual hardware was not tested; pointer drag was tested at mobile dimensions.

## Typography, colors and spacing

Visible typography is a conventional compact system-like sans serif, not a display serif. White top menu ~12–13px, dark text on white window content ~13–15px, bold Notes title ~22px. Lock date ~18px, desktop clock ~86px. Exact font family was not conclusively established. Notes paper roughly #fff7d9, title bar #efefef, dark charcoal lock overlay; warm orange/brown home backdrop. Dock icons ~50–80px in observed desktop states and icon magnification/hover emphasis. Window content spacing mostly 12–24px, tightly aligned rows and fine separators.

## Responsive and animation observations

Desktop 1440×900 has centered floating windows and dock. Tablet 768×1024 keeps desktop menu/dock concepts. Mobile 390×844 hides menu text and retains the photographic environment; home dock overflows horizontally in the screenshot. Lock content becomes a narrow notification stack. Unlock transition moves the lock upward and exposes home; launch transitions are brief, windows layer immediately; animated home background continues. Exact easing/duration are estimates, not measured. Reduced-motion support and screen-reader behavior were not established.

## Interpretation for this project

Original NOCTURNE identity, quiet city wallpaper, sage/ivory surfaces, a serif editorial accent, custom Lucide-based icons, five curated applications. Desktop layering/drag/minimize is retained. Mobile is intentionally redesigned into full-screen panels and a fitted dock. Camera/Calendar are not implemented because the required five portfolio workflows take priority. Event showcase is an original interpretation of the confirmed Jetron project showcase. User-provided preliminary observations remain distinct from the confirmed browser findings above.
