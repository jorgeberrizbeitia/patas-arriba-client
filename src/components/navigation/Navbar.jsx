import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GroupIcon from '@mui/icons-material/Group';
import Chip from '@mui/material/Chip';

import { Link } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";

import { useState, useContext } from "react";
import { AuthContext } from "@context/auth.context";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import UserIcon from "@components/user/UserIcon";

function Navbar() {

  const navigate = useNavigate()
  const { authenticateUser, isLoggedIn, loggedUserRole, loggedUser} = useContext(AuthContext)

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const handleLogout = async () => {
    
    localStorage.removeItem("authToken")
    await authenticateUser()
    navigate("/")

  };

  return (
    <nav>
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Button onClick={toggleDrawer(true)}>
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </Button>
        {isLoggedIn && <>
          <Box>
            <Typography variant="caption">{loggedUser.username}</Typography>
            {loggedUserRole === "admin" && <Typography variant="caption">, Admin</Typography>}
            <Tooltip title="Ver Perfil">
                <IconButton onClick={() => navigate("/user/own")}>
                <UserIcon size="small" user={loggedUser}/>
              </IconButton>
            </Tooltip>
          </Box>
        </>}
        
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <CloseIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
          </List>

          {!isLoggedIn && <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/signup")}>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary={"Registro"} />
              </ListItemButton>
            </ListItem>
          </List>}

          {!isLoggedIn && <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/login")}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Acceso"} />
                </ListItemButton>
            </ListItem>
          </List>}

          {isLoggedIn && <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/user/own")}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={"Tu Perfil"} />
              </ListItemButton>
            </ListItem>
          </List>}

          {isLoggedIn && <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/event")}>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary={"Eventos"} />
              </ListItemButton>
            </ListItem>
          </List>}

          {loggedUserRole === "admin" && <Divider><Chip label="Admin" size="small" /></Divider>}

          {loggedUserRole === "admin" && <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/event/create")}>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary={"Crear Evento"} />
              </ListItemButton>
            </ListItem>
          </List>}

          {loggedUserRole === "admin" && <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/user")}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={"Ver Usuarios"} />
              </ListItemButton>
            </ListItem>
          </List>}

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

          {isLoggedIn && <Divider />}

          {isLoggedIn && <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Cerrar Sesión"} />
            </ListItemButton>
          </ListItem>}
        </Box>
      </Drawer>

    </nav>
  );
}

export default Navbar;
