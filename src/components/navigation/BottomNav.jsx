// The app's primary navigation: a fixed bottom bar (issue #34, Change 1;
// items revised 2026-07-09). On a phone-first PWA the main destinations
// must be thumb-reachable and always visible — the old hamburger drawer hid
// them behind a tap, which is why it's gone. What each visitor sees:
//
//   anonymous:  nothing — the landing page IS the funnel (issue #36); its
//               Regístrate / Inicia Sesión buttons are the only path in
//   logged in:  Eventos · Glosario · Perfil · Más
//
// There is no Inicio tab when logged in — Home duplicated the events list,
// so "/" redirects to /event (see HomeGate) and Eventos IS home. Every role
// gets the same 4-item bar: Ver Usuarios (organizer-only, occasional)
// lives in the "Más" sheet with Cerrar Sesión; creating an event belongs to
// the FAB on the event list (Change 2), so nothing high-traffic is buried
// here.
//
// Layout padding for the fixed bar is App's concern; the title bar is
// TopBar's.

import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import useLogout from "@utils/useLogout";

import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isOrganizerOrAdmin } = useContext(AuthContext);
  const logout = useLogout();

  const [moreOpen, setMoreOpen] = useState(false);

  // Anonymous visitors get the auth funnel, not an app shell — the landing
  // page's own CTAs are the only way in (issue #36).
  if (!isLoggedIn) {
    return null;
  }

  // The bar highlights a destination, not an exact URL: any event page keeps
  // "Eventos" lit, only the own-profile page lights "Perfil" (other /user/*
  // pages are reached from Más and have no tab of their own).
  const currentValue = (() => {
    const path = location.pathname;
    if (path.startsWith("/event")) return "/event";
    if (path === "/glossary") return "/glossary";
    if (path === "/user/own") return "/user/own";
    return null;
  })();

  const go = (path) => {
    setMoreOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    setMoreOpen(false);
    await logout();
  };

  return (
    <>
      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          // Keep the bar clear of iOS home-indicator / gesture areas.
          pb: "env(safe-area-inset-bottom)",
        }}
      >
        <BottomNavigation
          component="nav"
          showLabels
          value={currentValue}
          onChange={(event, value) => {
            if (value === "more") return setMoreOpen(true);
            navigate(value);
          }}
        >
          <BottomNavigationAction label="Eventos" value="/event" icon={<CalendarMonthIcon />} />
          <BottomNavigationAction label="Glosario" value="/glossary" icon={<MenuBookIcon />} />
          <BottomNavigationAction label="Perfil" value="/user/own" icon={<AccountBoxIcon />} />
          <BottomNavigationAction label="Más" value="more" icon={<MoreHorizIcon />} />
        </BottomNavigation>
      </Paper>

      <Drawer
        anchor="bottom"
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        // Rounded top corners: the sheet follows the design system's radius
        // scale instead of MUI's square default.
        PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}
      >
        <List>
          {isOrganizerOrAdmin && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => go("/user")}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary="Ver Usuarios" />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default BottomNav;
