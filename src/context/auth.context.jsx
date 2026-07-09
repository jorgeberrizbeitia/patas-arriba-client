import { createContext, useState, useEffect } from "react";
import service from "@service/config";

// import Loading from "@components/ui/Loading";

import dogSleepingGif from "../assets/animations/dog-sleeping.gif"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// 1. componente que transmite el contexto
const AuthContext = createContext()

// 2. componente envoltorio que tiene todos los conextos a pasar
function AuthWrapper(props) {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loggedUserId, setLoggedUserId ] = useState(null)
  // const [ loggedUserRole, setLoggedUserRole ] = useState(null)
  const [ isOrganizerOrAdmin, setIsOrganizerOrAdmin ] = useState(false)
  const [ isAdmin, setIsAdmin ] = useState(false)
  //todo maybe above 2 states are not needed since we have loggedUser
  const [ isAuthenticating, setIsAuthenticating ] = useState(true)
  const [ loggedUser, setLoggedUser ] = useState(null) // all user info

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken")
    
    if (!storedToken) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      // setLoggedUserRole(null)
      setIsOrganizerOrAdmin(false)
      setIsAdmin(false)
      setLoggedUser(null)
      setTimeout(() => {
        setIsAuthenticating(false)
      }, 1000)
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
        // setLoggedUserRole(null)
        setIsOrganizerOrAdmin(false)
        setIsAdmin(false)
        setLoggedUser(null)
        setTimeout(() => {
          setIsAuthenticating(false)
        }, 1000)
        return
      }
      
      setIsLoggedIn(true)
      setLoggedUserId(responsePayload.data.payload._id)
      // setLoggedUserRole(responsePayload.data.payload.role)
      const { role } = responsePayload.data.payload
      setIsOrganizerOrAdmin(role === "organizer" || role === "admin")
      setIsAdmin(role === "admin")
      setLoggedUser(responseOwnUserDetails.data)
      setTimeout(() => {
        setIsAuthenticating(false)
      }, 1000)
    } catch (error) {
      console.log(error);
      
      setIsLoggedIn(false)
      setLoggedUserId(null)
      // setLoggedUserRole(null)
      setIsOrganizerOrAdmin(false)
      setIsAdmin(false)
      setLoggedUser(null)
      setTimeout(() => {
        setIsAuthenticating(false)
      }, 1000)
    }
  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    // loggedUserRole,
    isOrganizerOrAdmin,
    isAdmin,
    authenticateUser,
    loggedUser,
    setLoggedUser
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  if (isAuthenticating) {
    // The waking-up splash: brand wordmark (Staatliches via the theme's h1)
    // over the warm canvas, with the sleeping-dog mascot kept on purpose.
    return (
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          px: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">Estás accediendo a</Typography>
        <Typography variant="h1" sx={{ color: "brand.black" }}>Patas Arriba</Typography>
        <img src={dogSleepingGif} alt="dog-sleeping" style={{ width: 220, maxWidth: "80%" }}/>
        <Typography variant="body2" color="text.secondary">
          Espera unos segundos, me estoy despertando…
        </Typography>
      </Box>
    )
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