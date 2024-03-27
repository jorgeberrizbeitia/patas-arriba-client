import { createContext, useState, useEffect } from "react";
import service from "@service/config";

// 1. componente que transmite el contexto
const AuthContext = createContext()

// 2. componente envoltorio que tiene todos los conextos a pasar
function AuthWrapper(props) {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loggedUserId, setLoggedUserId ] = useState(null)
  const [ loggedUserRole, setLoggedUserRole ] = useState(null)
  const [ isAuthenticating, setIsAuthenticating ] = useState(true)

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken")
    
    if (!storedToken) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setLoggedUserRole(null)
      setIsAuthenticating(false)
      return
    }

    try {
      setIsAuthenticating(true)
      const response = await service.get("/auth/verify")
      
      setIsLoggedIn(true)
      setLoggedUserId(response.data.payload._id)
      setLoggedUserRole(response.data.payload.role)
      setIsAuthenticating(false)
    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setLoggedUserRole(null)
      setIsAuthenticating(false)
    }
  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    loggedUserRole,
    authenticateUser
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  if (isAuthenticating) {
    return <h2>...authenticating</h2>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthWrapper
}