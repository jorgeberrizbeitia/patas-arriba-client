// The per-screen header from the v6 design system: a first-name greeting, a
// display-face title, and the user's avatar as a profile shortcut. There is
// deliberately NO global top bar in this app (issue #34, objection O4) —
// screens own their headers, so the hardest-to-reach zone of the phone
// screen carries page identity instead of app chrome. Role information is
// not shown here; it lives on the Perfil screen.

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth.context";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import UserIcon from "@components/user/UserIcon";

function PageHeader({ title }) {
  const navigate = useNavigate();
  const { loggedUser } = useContext(AuthContext);

  // First name from the profile, username as fallback — the greeting should
  // never render an empty "Hola,".
  const firstName = loggedUser?.fullName?.split(" ")[0] || loggedUser?.username;

  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pt: 2,
        pb: 1,
      }}
    >
      <Box sx={{ textAlign: "start" }}>
        {loggedUser && (
          <Typography variant="body2" color="text.secondary">
            Hola, {firstName}
          </Typography>
        )}
        <Typography variant="h1">{title}</Typography>
      </Box>
      {loggedUser && (
        <Tooltip title="Ver Perfil">
          <IconButton aria-label="Ver perfil" onClick={() => navigate("/user/own")}>
            <UserIcon size="small" user={loggedUser} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default PageHeader;
