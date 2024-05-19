
import { useContext } from "react"
import { AuthContext } from "@context/auth.context"
import { Navigate } from "react-router-dom"

function OnlyAdmin(props) {

  const { isAdmin, isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn && isAdmin) {
    return props.children
  } else {
    return <Navigate to="/login"/>
  }

}

export default OnlyAdmin