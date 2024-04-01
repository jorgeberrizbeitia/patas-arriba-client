
import { useContext } from "react"
import { AuthContext } from "@context/auth.context"
import { Navigate } from "react-router-dom"

function IsAdmin(props) {

  const { loggedUserRole, isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn && loggedUserRole === "admin") {
    return props.children
  } else {
    return <Navigate to="/login"/>
  }

}

export default IsAdmin