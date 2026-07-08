// The design-system theme: the single place where the foundation's visual
// identity becomes MUI tokens. Every color, radius and component default in
// the app resolves through here — components style themselves with named
// tokens (`surface.subtle`, `brand.coral`, `category.protectora`), never
// hardcoded hex.
//
// The values are not invented: they were extracted from the live
// fundacionpatasarriba.com Elementor globals and curated in
// docs/design-tokens-issue-14.md (monorepo), which also records the WCAG
// contrast check behind each contrastText. The interactive reference is
// docs/mockup/v6-mui-light.html. Two decisions worth knowing:
//
// - Coral #EA5347 is the PRIMARY (the site's own --e-global-color-primary);
//   amber #EFB666 is the secondary/accent. Earlier app versions had this
//   reversed, and used a navy (#173A5E) that appears nowhere in the brand —
//   text is now the site's warm near-black instead.
// - White on coral is 3.6:1 — AA for large/bold text and UI components, and
//   what the foundation's own buttons do. Where a contained button must carry
//   body-size text to strict AA, use `primary.dark` (#C13A2E, ~5.1:1) as fill.
//
// This file deliberately does NOT touch the user-chosen avatar icon/color
// feature (users pick their `iconColor` in UpdateUserIcon and it is stored
// server-side). `avatarColorFor` exists for surfaces that need a color when
// the user never picked one.

import { createTheme } from "@mui/material/styles";

// Warm off-white surface ramp — a name for every near-white that used to be
// an inline hex scattered through the components.
const SURFACE = { subtle: "#F5F5F2", muted: "#F0F0EC", line: "#E8E8E4" };

// The foundation's full playful palette. Only coral/amber are MUI semantic
// slots; the rest stay available as `brand.*` for accents.
const BRAND = {
  coral: "#EA5347", coralDeep: "#E23125",
  amber: "#EFB666", amberDeep: "#D99946",
  teal: "#98D2CD", tealDeep: "#3E9B95",
  pink: "#FFB3B9", pinkDeep: "#E06B8D",
  black: "#1A1A1A",
};

// ONE category vocabulary for the whole app — events and glossary share it
// (they used to run two separate color systems). Slug-keyed; each swatch
// carries its own contrastText so chips never guess their text color.
const CATEGORY = {
  protectora: { main: "#3E9B95", contrastText: "#FFFFFF" },
  mercadillo: { main: "#E8850C", contrastText: "#212121" },
  recogida: { main: "#8E7CC3", contrastText: "#FFFFFF" },
  otro: { main: "#7A8691", contrastText: "#FFFFFF" },
  plataforma: { main: "#5B8DEF", contrastText: "#FFFFFF" },
  rol: { main: "#95A5A6", contrastText: "#212121" },
  evento: { main: "#EA5347", contrastText: "#FFFFFF" },
  refugio: { main: "#E06B8D", contrastText: "#FFFFFF" },
};

// Brand-harmonised ring for derived avatar colors — see avatarColorFor below.
const AVATAR_COLORS = [
  "#EA5347", "#D99946", "#3E9B95", "#E06B8D",
  "#8E7CC3", "#E8850C", "#5B8DEF", "#98D2CD",
];

// Staatliches is the wordmark face ("PATAS ARRIBA" on the site IS this font).
// It is display-only: condensed all-caps hurts legibility at body sizes.
const DISPLAY_FONT = "'Staatliches', 'Roboto', sans-serif";

const RADII = { sm: 8, md: 12, lg: 16, pill: 999 };

// Shadows are retinted off the brand near-black, not pure black (and not the
// deleted navy that used to tint them cold).
export const SHADOW = {
  card: "0 1px 3px rgba(26,26,26,0.06), 0 1px 2px rgba(26,26,26,0.04)",
  fab: "0 8px 24px rgba(234,83,71,0.28)",
};

// A deterministic color for a username: stable hash of the seed → ring index.
// Reproducible without being stored, so nothing about it lives in the DB.
export const avatarColorFor = (seed = "") =>
  AVATAR_COLORS[
    [...String(seed)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) %
      AVATAR_COLORS.length
  ];

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: BRAND.coral, light: "#F4837A", dark: "#C13A2E", contrastText: "#FFFFFF" },
    secondary: { main: BRAND.amber, light: "#F4CC95", dark: BRAND.amberDeep, contrastText: "#212121" },
    // Functional colors are kept clearly apart from the brand reds/ambers:
    // error is a deep crimson so destructive actions never read as the coral
    // primary; warning is unmistakably orange, not the yellow-amber secondary.
    error: { main: "#C62828", contrastText: "#FFFFFF" },
    warning: { main: "#E8850C", contrastText: "#212121" },
    success: { main: "#2E7D46", contrastText: "#FFFFFF" },
    info: { main: "#147A70", contrastText: "#FFFFFF" },
    background: { default: "#FAFAF8", paper: "#FFFFFF" },
    text: { primary: "#2E2E2E", secondary: "#6B7078" },
    divider: SURFACE.line,
    // Custom named tokens — resolvable in sx via bgcolor:'surface.subtle',
    // color:'brand.black', bgcolor:'category.protectora.main', etc.
    surface: SURFACE,
    brand: BRAND,
    category: CATEGORY,
    avatar: AVATAR_COLORS,
  },
  typography: {
    fontFamily: "'Roboto', -apple-system, sans-serif",
    // Body, subtitle, caption and input sizes are LEFT AT MUI DEFAULTS on
    // purpose: body1=16px, body2=14px, caption=12px — already the
    // mobile-first values we want, and 16px inputs avoid iOS focus zoom.
    // h1/h2 are display type in the brand face and scale with the viewport;
    // h3–h6 stay Roboto because they are mixed-case UI section labels.
    h1: { fontFamily: DISPLAY_FONT, fontSize: "clamp(1.9rem, 6vw, 2.35rem)", fontWeight: 400, letterSpacing: "0.5px", lineHeight: 1.05 },
    h2: { fontFamily: DISPLAY_FONT, fontSize: "clamp(1.5rem, 5vw, 1.8rem)", fontWeight: 400, letterSpacing: "0.4px", lineHeight: 1.1 },
    h3: { fontSize: "1.2rem", fontWeight: 700 },
    h4: { fontSize: "1.0625rem", fontWeight: 700 },
    h5: { fontSize: "1rem", fontWeight: 600 },
    h6: { fontSize: "0.9375rem", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
    // Pre-existing app idiom, not part of the v6 system: the tiny captions
    // under icon buttons ("guardar", "refrescar mensajes"). Kept so the 13
    // existing usages don't silently lose their sizing; candidates for
    // rethinking in the touch-target pass.
    icon: { fontSize: "0.5rem" },
  },
  shape: { borderRadius: RADII.md },
  // Radius scale for one-off sx use; component defaults below already apply
  // the standard steps (button 10, card 16, chip 20).
  radii: RADII,
  components: {
    // 48px buttons / 44px icon buttons are the Material touch minimums —
    // these overrides replace the old App.css !important block.
    MuiButton: { styleOverrides: { root: { minHeight: 48, borderRadius: 10, padding: "12px 20px" } } },
    MuiIconButton: { styleOverrides: { root: { minWidth: 44, minHeight: 44 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: RADII.lg, backgroundImage: "none", boxShadow: SHADOW.card } } },
    MuiFab: { styleOverrides: { root: { textTransform: "none", fontWeight: 600 } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600, borderRadius: 20 } } },
    MuiTextField: { styleOverrides: { root: { "& .MuiOutlinedInput-root": { borderRadius: 10 } } } },
    MuiAccordion: { styleOverrides: { root: { backgroundImage: "none", "&:before": { display: "none" } } } },
    MuiBottomNavigationAction: { styleOverrides: { root: { minWidth: 0, "&.Mui-selected": { color: BRAND.coral } } } },
  },
});

// One accessor for BOTH event and glossary category colors → the swatch with
// its contrastText, falling back to the neutral "otro" so an unknown slug
// still renders legibly instead of throwing.
export const catColor = (slug) => CATEGORY[slug] || CATEGORY.otro;

export default theme;
