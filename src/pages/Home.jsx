import { Link } from "react-router-dom"
import logo from "../assets/images/logo.png"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useContext } from "react";
import { AuthContext} from "@context/auth.context"
import UpcomingEventsList from "../components/event/UpcomingEventsList";

function Home() {

  const { isLoggedIn } = useContext(AuthContext)

  return (
    <Box  display="flex" flexDirection="column" alignItems="center">

      { !isLoggedIn ? (
        <>
          <img src={logo} alt="logo" width={"300px"}/>

          <p><Link to="/signup"><Button variant="contained">Registrarse</Button></Link></p>
          <p><Link to="/login"><Button variant="contained">Iniciar Sesión</Button></Link></p>
        </>
      ) : (

        <UpcomingEventsList />

      )}


      
      

    </Box>
  )
}

export default Home