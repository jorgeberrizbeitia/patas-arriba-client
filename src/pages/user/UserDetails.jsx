import Loading from '@components/ui/Loading'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import service from '@service/config'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import capitalizeAll from '@utils/capitalizeAll'
import Typography from '@mui/material/Typography'
import { AuthContext } from '@context/auth.context'
import CardMedia from '@mui/material/CardMedia'
import UserIcon from '@components/user/UserIcon'
import GoBack from '@components/navigation/GoBack'

function UserDetails() {

  const { loggedUserRole } = useContext(AuthContext)

  const { userId } = useParams()

  const [user, setUser] = useState()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = async () => {
    try {
      
      const response = await service.get(`/user/${userId}`)

      setUser(response.data)
      // setTimeout(() => {
        setIsLoading(false)
      // }, 700)

    } catch (error) {
      console.log(error)
    }
  }

  const handleAllowUser = async () => {
    setIsLoading(true)
    try {
      
      const response = await service.patch(`/user/${userId}/user-role-validation`)
      setUser(response.data) // the updated user
      // setTimeout(() => {
        setIsLoading(false)
      // }, 700)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  const { username, email, fullName, phoneCode, phoneNumber, createdAt, role } = user

  return (
    <>

      <GoBack to={-1}/>
      
      <Card sx={{width: "100%"}}>
        <CardHeader
          avatar={<UserIcon size="medium" user={user}/>}
          title={username}
          subheader={capitalizeAll(fullName)}
        />

        <hr />

        <CardContent sx={{display: "flex", flexDirection: "column"}}>
          <Typography variant="body">
            {email}
          </Typography>
          <Typography variant="body">
            +{phoneCode} {phoneNumber}
          </Typography>
          {role === "admin" && <Typography variant="body" color="warning.main">
            Este usuario es admin
          </Typography>}
          <Typography variant="body">
            Desde: {new Date(createdAt).toDateString()}
          </Typography>

          <hr />
          {loggedUserRole === "admin" && <>

            {role === "pending" ? 
              <>
                <Typography variant="body" color="error.main">
                  Pendiente por permiso
                </Typography>
                <Button variant="contained" onClick={handleAllowUser}>
                  Permitir
                </Button>
              </> : <>
                <Typography variant="body" color="success.main">
                  Usuario habilitado
                </Typography>
              </>
            }

          </>}
          
        </CardContent> 
      </Card>

    </>
  )
}

export default UserDetails