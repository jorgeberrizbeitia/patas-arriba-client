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
  const [ isAuthenticating, setIsAuthenticating ] = useState(true)
  const [ ownProfile, setOwnProfile ] = useState(null) // for user profile

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken")
    
    if (!storedToken) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setLoggedUserRole(null)
      setOwnProfile(null)
      setTimeout(() => setIsAuthenticating(false), 700)
      return
    }

    try {
      setIsAuthenticating(true)
      const response = await service.get("/auth/verify")
      const responseOwnProfile = await service.get("/profile/own")
      if (!responseOwnProfile.data) {
        //* user was deleted after creating a Token
        localStorage.removeItem("authToken")
        setIsLoggedIn(false)
        setLoggedUserId(null)
        setLoggedUserRole(null)
        setOwnProfile(null)
        setTimeout(() => setIsAuthenticating(false), 700)
        return
      }
      
      setIsLoggedIn(true)
      setLoggedUserId(response.data.payload._id)
      setLoggedUserRole(response.data.payload.role)
      setOwnProfile(responseOwnProfile.data)
      setTimeout(() => setIsAuthenticating(false), 700)
    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setLoggedUserRole(null)
      setOwnProfile(null)
      setTimeout(() => setIsAuthenticating(false), 700)
    }
  }

  const getUpdatedOwnProfile = async() => {

    setIsAuthenticating(true)

    try {

      const response = await service.get("/profile/own")

      setOwnProfile(response.data)
      setTimeout(() => setIsAuthenticating(false), 700)
    } catch (error) {
      setOwnProfile(response.data)
      setTimeout(() => setIsAuthenticating(false), 700)
    }

  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    loggedUserRole,
    authenticateUser,
    ownProfile,
    getUpdatedOwnProfile
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