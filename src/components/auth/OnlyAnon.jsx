
import { useContext } from "react"
import { AuthContext } from "@context/auth.context"
import { Navigate } from "react-router-dom"

function OnlyAnon(props) {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn === false) {
    return props.children
  } else {
    return <Navigate to="/"/>
  }

}

export default OnlyAnon