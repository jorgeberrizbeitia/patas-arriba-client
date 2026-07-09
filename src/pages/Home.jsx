// The anonymous landing IS the login screen (v6 "welcome + login in one
// screen"): brand wordmark, the login form right there, one forgot-password
// link and exactly ONE register path. No tap stands between arriving and
// logging in — the old landing made users tap through to a separate /login
// page while showing register three times across the funnel.
//
// Logged-in users never see this page: HomeGate redirects "/" to /event.

import { Link } from "react-router-dom"
import Box from '@mui/material/Box'
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography'
import LoginForm from "@components/auth/LoginForm";

function Home() {

  return (
    <Box sx={{ width: "100%", pt: 5, pb: 2 }}>

      {/* Text wordmark per the v6 landing — the brand face itself, not the
          amber logo block, so the screen reads as an app, not a poster. */}
      <Typography sx={{ fontFamily: (theme) => theme.typography.h1.fontFamily, letterSpacing: "0.4em", fontSize: "0.9rem", ml: "0.4em" }}>
        FUNDACIÓN
      </Typography>
      <Typography sx={{ fontFamily: (theme) => theme.typography.h1.fontFamily, fontSize: "3rem", lineHeight: 0.9, color: "brand.black", letterSpacing: "0.5px", mb: 1 }}>
        PATAS<br />ARRIBA
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Participa en los eventos de la fundación
      </Typography>

      <LoginForm />

      <Box sx={{ mt: 1 }}>
        <Button component={Link} variant="text" size="small" sx={{ color: "text.secondary" }} to="/password-forget">
          ¿Olvidaste tu contraseña?
        </Button>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary" component="span">
          ¿No tienes cuenta?{" "}
        </Typography>
        <Button component={Link} variant="text" size="small" to="/signup">
          Regístrate
        </Button>
      </Box>

    </Box>
  )
}

export default Home
