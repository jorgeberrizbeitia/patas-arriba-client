import { useNavigate } from "react-router-dom"
import logo from "../assets/images/logo.png"
import Button from "@mui/material/Button";

import { useContext } from "react";
import { AuthContext} from "@context/auth.context"
import UpcomingEventsList from "../components/event/UpcomingEventsList";
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Home() {

  const navigate = useNavigate()
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>

      <hr style={{maxWidth:"initial"}} />
      {/* //* this will make the hr longer than the mui Container */}

      { !isLoggedIn ? (
        <>

          <img src={logo} alt="logo" style={{ width: 300, maxWidth: "100%" }}/>

          <Box mt={2}>
            <Typography variant="body1" color="initial">En esta página podrás ver y participar en eventos de la fundación Patas Arriba</Typography>
          </Box>

          <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center" height="200px">
            <Button sx={{width: "150px"}} onClick={() => navigate("/signup")} variant="contained">Registrate</Button>
            <Button sx={{width: "150px"}} onClick={() => navigate("/login")} variant="contained">Inicia Sesión</Button>
          </Box>
        </>
      ) : (

        <UpcomingEventsList />

      )}

    </>
  )
}

export default Home