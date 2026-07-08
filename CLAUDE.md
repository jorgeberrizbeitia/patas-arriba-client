# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Patas Arriba WebApp Client is a React-based Progressive Web App (PWA) for managing and coordinating volunteer participation in the Fundación Patas Arriba events. This repository contains only the client-side application; the server-side API is in a separate repository.

Website: https://www.fundacionpatasarriba.com/

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (accessible on local network)
npm run dev

# Build for production
npm run build

# Lint the code
npm run lint

# Preview production build
npm run preview
```

## Environment Setup

1. Copy `.env.local.example` to `.env.local` for local development
2. Set these environment variables:
   ```
   VITE_SERVER_URL=http://localhost:5005  # or appropriate server URL
   VITE_VAPID_PUSH_PUBLIC_KEY=            # Get this from the server-side project
   ```

## Architecture Overview

### Tech Stack
- **Framework**: React 18 with Vite
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Real-time Communication**: Socket.io
- **PWA Support**: Service Worker

### Application Structure

1. **Authentication & Authorization**:
   - AuthContext provides user authentication state and methods
   - Role-based access control with components like OnlyPrivate, OnlyAnon, OnlyOrganizerOrAdmin
   - JWT tokens stored in localStorage

2. **Component Organization**:
   - Components organized by domain/feature: attendee, auth, car-group, event, etc.
   - UI components separated in dedicated directory

3. **Routing**:
   - Central routing in App.jsx
   - Routes organized by access level (public, anon, admin, private)

4. **Theming**:
   - Design-system theme lives in `src/theme.js` (imported by main.jsx) — named
     `surface`/`brand`/`category`/`avatar` tokens; style with tokens, never raw hex
   - Foundation branding: primary is coral #EA5347, secondary amber #EFB666;
     Staatliches for h1/h2 display headings, Roboto for body/UI
   - Token provenance + WCAG checks: `docs/design-tokens-issue-14.md` in the monorepo

5. **API Communication**:
   - Centralized Axios instance in service/config.js
   - Interceptor for adding JWT to requests

6. **Path Aliases**:
   - Configured in vite.config.js (e.g., @components, @pages, @service)

## Important Notes

- This project is a PWA with service worker support
- The app communicates with a separate backend server
- Responsive design with Material-UI components
- Three user roles: regular user, organizer, and admin
- Notifications are supported via Web Push API