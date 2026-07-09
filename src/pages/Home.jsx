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
import logoPatasArriba from "@assets/images/logo-patas-arriba.svg";

function Home() {

  return (
    <Box sx={{ width: "100%", pt: 3, pb: 2 }}>

      {/* The foundation's official logo (fundacionpatasarriba.com footer
          asset, dark-on-transparent) — kept unmodified; its built-in
          transparent padding is the hero's breathing room. */}
      <img
        src={logoPatasArriba}
        alt="Fundación Patas Arriba"
        style={{ width: 240, maxWidth: "70%" }}
      />

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
