# Changelog

## 2026-07-07

### Replace React 19-incompatible dependencies

- **Event detail page no longer renders blank for described events (#31).**
  Swapped the unmaintained `react-linkify@1.0.0-alpha` for the maintained
  `linkify-react` (+ `linkifyjs`) in `EventDescription.jsx`. Under the React 19
  / Vite 8 toolchain the old default import resolved to an object, so
  `<Linkify>` threw React error #130 and blanked the whole event-detail screen
  for admins and attendees of any event that had a description. Added
  `EventDescription.test.jsx` pinning the contract: a described event renders,
  and bare URLs become clickable links. Links now open in a new tab
  (`target="_blank" rel="noopener noreferrer"`) so the PWA stays mounted.
- **404 / 500 animations moved to a React 19-native Lottie player (#16).**
  Replaced `@lottiefiles/react-lottie-player` (peer-capped at React 16–18) with
  `@lottiefiles/dotlottie-react` in `NotFound.jsx` and `ServerError.jsx`, passing
  the imported animation JSON via `data`.
- **Removed the `legacy-peer-deps=true` workaround** from `.npmrc`. It existed
  only to force-install the two packages above under React 19; with both gone a
  clean `npm install` resolves peer dependencies without it.

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
