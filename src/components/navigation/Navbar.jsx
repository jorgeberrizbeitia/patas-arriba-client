import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";

import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const handleLogout = () => {
    console.log("handle logout here");
  };

  return (
    <nav>
      <Button onClick={toggleDrawer(true)}>
        {open ? <MenuOpenIcon /> : <MenuIcon />}
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <Link to="/" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>

          <List>
            <ListItem disablePadding>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Registro"} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>

          <List>
            <ListItem disablePadding>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Acceso"} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem disablePadding>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "inherit", width: "100%" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Sobre nosotros"} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>

          <Divider />

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Cerrar Sesión"} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </nav>
  );
}

export default Navbar;
