import { Link } from "react-router-dom"
import logo from "../assets/images/logo.png"
import Button from "@mui/material/Button";

import { useContext } from "react";
import { AuthContext} from "@context/auth.context"
import UpcomingEventsList from "../components/event/UpcomingEventsList";
import Typography from '@mui/material/Typography'

function Home() {

  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>

      <hr style={{maxWidth:"initial"}} />
      {/* //* this will make the hr longer than the mui Container */}

      { !isLoggedIn ? (
        <>
          <img src={logo} alt="logo" width={"300px"}/>

          <p><Link to="/signup"><Button variant="contained">Registrate!</Button></Link></p>
          <p><Link to="/login"><Button variant="contained">Inicia Sesión</Button></Link></p>
        </>
      ) : (

        <UpcomingEventsList />

      )}

    </>
  )
}

export default Home