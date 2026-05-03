# Changelog

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
