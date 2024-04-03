import { createContext, useState, useEffect } from "react";
import service from "@service/config";

import Loading from "@components/ui/Loading";

// 1. componente que transmite el contexto
const AuthContext = createContext()

// 2. componente envoltorio que tiene todos los conextos a pasar
function AuthWrapper(props) {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loggedUserId, setLoggedUserId ] = useState(null)
  const [ loggedUserRole, setLoggedUserRole ] = useState(null)
  //todo maybe above 2 states are not needed since we have loggedUser
  const [ isAuthenticating, setIsAuthenticating ] = useState(true)
  const [ loggedUser, setLoggedUser ] = useState(null) // all user info

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken")
    
    if (!storedToken) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setLoggedUserRole(null)
      setLoggedUser(null)
      setTimeout(() => setIsAuthenticating(false), 700)
      return
    }

    try {
      setIsAuthenticating(true)
      const responsePayload = await service.get("/auth/verify")
      const responseOwnUserDetails = await service.get("/user/own")
      if (!responseOwnUserDetails.data) {
        //* user was deleted after creating a Token
        localStorage.removeItem("authToken")
        setIsLoggedIn(false)
        setLoggedUserId(null)
        setLoggedUserRole(null)
        setLoggedUser(null)
        setTimeout(() => setIsAuthenticating(false), 700)
        return
      }
      
      setIsLoggedIn(true)
      setLoggedUserId(responsePayload.data.payload._id)
      setLoggedUserRole(responsePayload.data.payload.role)
      setLoggedUser(responseOwnUserDetails.data)
      setTimeout(() => setIsAuthenticating(false), 700)
    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setLoggedUserRole(null)
      setLoggedUser(null)
      setTimeout(() => setIsAuthenticating(false), 700)
    }
  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    loggedUserRole,
    authenticateUser,
    loggedUser,
    setLoggedUser
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  if (isAuthenticating) {
    return <Loading />
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