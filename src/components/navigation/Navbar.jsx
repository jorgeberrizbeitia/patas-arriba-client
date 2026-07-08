// The top identity strip: who is signed in and a shortcut to their profile.
// Primary navigation is NOT here — it lives in BottomNav (issue #34,
// Change 1), which replaced the old hamburger drawer this component used to
// own. What remains is deliberately thin: on a phone the top of the screen
// is the hardest place to reach, so nothing essential may live here.

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth.context";
import UserIcon from "@components/user/UserIcon";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, isOrganizerOrAdmin, isAdmin, loggedUser } =
    useContext(AuthContext);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Box
      component="header"
      sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", px: 1 }}
    >
      <Typography variant="caption">{loggedUser.username}</Typography>
      {isAdmin && <Typography variant="caption">, Admin</Typography>}
      {!isAdmin && isOrganizerOrAdmin && (
        <Typography variant="caption">, Organizador</Typography>
      )}
      <Tooltip title="Ver Perfil">
        <IconButton aria-label="Ver perfil" onClick={() => navigate("/user/own")}>
          <UserIcon size="small" user={loggedUser} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default Navbar;
