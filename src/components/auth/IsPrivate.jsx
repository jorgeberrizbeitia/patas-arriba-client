
import { useContext } from "react"
import { AuthContext } from "@context/auth.context"
import { Navigate } from "react-router-dom"

function IsPrivate(props) {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn === true) {
    return props.children
  } else {
    return <Navigate to="/login"/>
  }

}

export default IsPrivate