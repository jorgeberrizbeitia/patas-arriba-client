
import { useContext } from "react"
import { AuthContext } from "@context/auth.context"
import { Navigate } from "react-router-dom"

function OnlyOrganizerOrAdmin(props) {

  const { isOrganizerOrAdmin, isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn && isOrganizerOrAdmin) {
    return props.children
  } else {
    return <Navigate to="/login"/>
  }

}

export default OnlyOrganizerOrAdmin