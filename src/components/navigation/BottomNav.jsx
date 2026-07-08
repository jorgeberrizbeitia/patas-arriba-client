// The app's primary navigation: a fixed bottom bar (issue #34, Change 1).
// On a phone-first PWA the main destinations must be thumb-reachable and
// always visible — the old hamburger drawer hid them behind a tap, which is
// why it's gone. What each visitor sees:
//
//   anonymous:  Inicio · Acceso · Registro
//   logged in:  Inicio · Eventos · Perfil · Más
//
// Every role gets the same 4-item bar: five items get tight on narrow
// phones, and the organizer-only destinations (Ver Usuarios, Crear Evento)
// are occasional tasks, so they live in the "Más" sheet together with
// Glosario and Cerrar Sesión. The FAB on the event list covers the frequent
// organizer action (Change 2), so nothing high-traffic is buried here.
//
// This component deliberately does NOT render a top bar — the identity strip
// stays in Navbar. Layout padding for the fixed bar is App's concern.

import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth.context";

import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isOrganizerOrAdmin, authenticateUser } =
    useContext(AuthContext);

  const [moreOpen, setMoreOpen] = useState(false);

  // The bar highlights a destination, not an exact URL: any event page keeps
  // "Eventos" lit, only the own-profile page lights "Perfil" (other /user/*
  // pages are reached from Más and have no tab of their own).
  const currentValue = (() => {
    const path = location.pathname;
    if (path === "/") return "/";
    if (path === "/login" || path === "/signup") return path;
    if (path.startsWith("/event")) return "/event";
    if (path === "/user/own") return "/user/own";
    return null;
  })();

  const go = (path) => {
    setMoreOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    setMoreOpen(false);
    localStorage.removeItem("authToken");
    await authenticateUser();
    navigate("/");
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
          <BottomNavigationAction label="Inicio" value="/" icon={<HomeIcon />} />
          {!isLoggedIn && (
            <BottomNavigationAction label="Acceso" value="/login" icon={<LoginIcon />} />
          )}
          {!isLoggedIn && (
            <BottomNavigationAction label="Registro" value="/signup" icon={<LockOpenIcon />} />
          )}
          {isLoggedIn && (
            <BottomNavigationAction label="Eventos" value="/event" icon={<CalendarMonthIcon />} />
          )}
          {isLoggedIn && (
            <BottomNavigationAction label="Perfil" value="/user/own" icon={<AccountBoxIcon />} />
          )}
          {isLoggedIn && (
            <BottomNavigationAction label="Más" value="more" icon={<MoreHorizIcon />} />
          )}
        </BottomNavigation>
      </Paper>

      <Drawer anchor="bottom" open={moreOpen} onClose={() => setMoreOpen(false)}>
        <List>
          {isOrganizerOrAdmin && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => go("/event/create")}>
                <ListItemIcon><AddBoxIcon /></ListItemIcon>
                <ListItemText primary="Crear Evento" />
              </ListItemButton>
            </ListItem>
          )}
          {isOrganizerOrAdmin && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => go("/user")}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary="Ver Usuarios" />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton onClick={() => go("/glossary")}>
              <ListItemIcon><MenuBookIcon /></ListItemIcon>
              <ListItemText primary="Glosario" />
            </ListItemButton>
          </ListItem>
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
