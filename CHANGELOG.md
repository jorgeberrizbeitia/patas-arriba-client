# Changelog

## 2026-07-09

### UI review round (monorepo issue #34 follow-through)

- **Navigation restructure**: the Inicio tab is gone — `/` redirects
  logged-in users to `/event` (Home stays as the anonymous landing) and the
  bar becomes Eventos/Glosario/Perfil/Más. Back navigation moved into the
  top bar (arrow on detail/flow screens only); the in-page GoBack component
  and page titles duplicating the top bar are deleted.
- **Events screen hierarchy**: Próximos/Pasados is an exclusive toggle;
  informational chips no longer wear the CTA coral (teal corner banner,
  outlined state chips, "Estado:" prefix dropped); the whole event card is
  the tap target (the "ver mas detalles" button is gone); the organizer CTA
  on details is outlined so the viewer CTA owns the coral.
- **Profile**: compact header (avatar + identity side by side), edit
  affordances switch from warning-amber to primary, icon-button captions
  raised from 8px to legible caption size app-wide.
- **Fixes**: events with a deleted/absent owner no longer render a blank
  organizer link, and no longer crash the details page for volunteers
  (`event.owner._id` null guard); the Más sheet gets the design-system
  rounded top corners.
- **Card affordance + motion**: tappable event cards show a right-edge
  chevron, and list↔details navigation morphs the card via the View
  Transitions API (`useTransitionNavigate` hook — manual wrapper because
  the app mounts a plain BrowserRouter; graceful no-op on Firefox,
  disabled under prefers-reduced-motion).

## 2026-07-08

### Mobile-first design system applied (monorepo issue #34)

- **New token theme in `src/theme.js`** built from the foundation's real
  branding: coral `#EA5347` primary / amber `#EFB666` secondary, Staatliches
  display headings (h1/h2), named `surface`/`brand`/`category`/`avatar`
  palette tokens, warm near-black text (the old navy `#173A5E` is gone), and
  touch-sized component defaults (Button 48px, IconButton 44px, card/chip/
  input radii). `main.jsx` slims down to the entry point; `CssBaseline` now
  paints the warm off-white canvas.
- **`App.css` overrides removed** — the `!important` font-size block and the
  html rem-inflation media queries are superseded by `theme.components` and
  `clamp()` display headings. Components using the deleted palette keys
  (`gray.*`, `primary.lighterSaturation`) migrated to named tokens; Glossary
  chips now share the app-wide `palette.category` vocabulary.
- **BottomNavigation replaces the hamburger drawer** as primary navigation:
  Inicio/Acceso/Registro for visitors, Inicio/Eventos/Perfil/Más when logged
  in, with Glosario, Cerrar Sesión and the organizer destinations in the Más
  sheet. The top of the screen is a title-only sticky AppBar (`TopBar`,
  screen title in the brand display face) with deliberately no identity
  chrome — no username, role, avatar or overflow; identity lives on the
  Perfil screen. The old Navbar identity strip is deleted.
- **"Crear Evento" FAB** on the event list for organizers/admins.
- **Mobile keyboards**: `inputMode` on email, phone, and numeric fields.
- **Accessibility**: aria-labels on icon-only buttons; `aria-expanded` on
  the three collapse toggles.
- **Responsive layout fixes**: percentage-width button rows wrap or stack,
  Signup phone fields stack on phones, Home logo caps at 100% width, GoBack
  is a plain arrow + label, auth links are proper text Buttons, message list
  height leaves room on small screens.
- Test-first where behavior changed: new suites for BottomNav, the EventList
  FAB, Signup keyboard hints, Message menu accessibility, and the
  EventDescription disclosure (30 tests total now pass).

## 2026-05-03

### Vitest + React Testing Library test harness

- Introduced `tests/setup.js` (wires `@testing-library/jest-dom` matchers
  into Vitest) — `vite.config.js` already declared `setupFiles` pointing at
  this path but the file was missing on disk.
- Seeded the harness with 14 example tests covering `validateField` and the
  three route guards (`OnlyPrivate`, `OnlyAnon`, `OnlyOrganizerOrAdmin`).
- `npm test` and `npm run test:watch` are wired to run the suite.

### Attendance UI: drop "still pending" warning Alert

- Removed the warning Alert from `AttendeeAttendance` that fired when any
  attendee's status was `"pending"`. The warning was meaningful only while
  the server-side default was `"pending"`; the server now defaults new
  sign-ups to `"show"`, so the warning either never fires (new events) or
  alarms organizers about historical records they already know about.
- The four-option dropdown in `AttendeeAttendanceCard` is unchanged so legacy
  `"pending"` records can still be cleaned up manually.
- Added a unit test (`AttendeeAttendance.test.jsx`) pinning the absence of
  the warning Alert in both the all-attended and legacy-pending scenarios.
- Cleaned up unused imports in `AttendeeAttendance.jsx` (left over from a
  previous version of the component).
- See `specs/attendance-default.md` for the user story, acceptance scenarios,
  and functional requirements.
