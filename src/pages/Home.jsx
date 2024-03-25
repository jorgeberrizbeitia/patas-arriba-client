import { Link } from "react-router-dom"
import logo from "../assets/images/logo.png"

function Home() {
  return (
    <div>
      
      <img src={logo} alt="logo" width={"300px"}/>

      <p><Link to="/signup">Registrarse</Link></p>
      <p><Link to="/signup">Iniciar Sesión</Link></p>

    </div>
  )
}

export default Home