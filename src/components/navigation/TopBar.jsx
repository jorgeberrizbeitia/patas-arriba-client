// The top app bar: MUI's standard scaffold carrying ONLY the current
// screen's title, set in the brand display face (per the design rule:
// brand wins where an element carries identity — and a screen title is
// identity). It deliberately carries no user chrome — no username, role
// badge, avatar or overflow menu (issue #34, choice-story S5): identity
// lives on the Perfil screen and navigation in the BottomNav, so this bar
// never competes with them.

import { useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Route → screen title. Most-specific prefixes first; anything unmapped
// falls back to the wordmark, so a new route is never left with a bare bar.
const TITLES = [
  ["/event/create", "Crear Evento"],
  ["/event/", "Evento"],
  ["/event", "Eventos"],
  ["/user/own", "Perfil"],
  ["/user/", "Usuario"],
  ["/user", "Usuarios"],
  ["/glossary", "Glosario"],
  ["/login", "Acceso"],
  ["/signup", "Registro"],
  ["/password-forget", "Contraseña"],
  ["/password-reset", "Contraseña"],
  ["/car-group", "Grupo de Coche"],
];

function titleFor(pathname) {
  if (pathname === "/") return "Patas Arriba";
  const hit = TITLES.find(([prefix]) =>
    prefix.endsWith("/") ? pathname.startsWith(prefix) && pathname !== prefix.slice(0, -1) : pathname === prefix || pathname.startsWith(prefix + "/")
  );
  // "/event/" style prefixes match detail pages; exact entries match the
  // destination itself. Unknown routes wear the wordmark.
  return hit ? hit[1] : "Patas Arriba";
}

function TopBar() {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
        // Clear the notch/status area in installed PWAs (viewport-fit=cover).
        pt: "env(safe-area-inset-top)",
      }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: "center", minHeight: 52 }}>
        <Typography
          component="div"
          sx={{
            fontFamily: (theme) => theme.typography.h1.fontFamily,
            fontSize: "1.35rem",
            letterSpacing: "0.5px",
          }}
        >
          {titleFor(location.pathname)}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
