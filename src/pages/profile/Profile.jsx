import Loading from '@components/ui/Loading'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import service from '@service/config'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import capitalizeAll from '@utils/capitalizeAll'
import Typography from '@mui/material/Typography'
import { AuthContext } from '@context/auth.context'
import CardMedia from '@mui/material/CardMedia'
import placeholderProfilePic from "@assets/images/placeholder-profile-pic.png"


function Profile() {

  const { loggedUserRole } = useContext(AuthContext)

  const { userId } = useParams()

  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = async () => {
    try {
      
      const response = await service.get(`/profile/${userId}`)

      setUser(response.data)
      setTimeout(() => setIsLoading(false), 700)

    } catch (error) {
      console.log(error)
    }
  }

  const handleImageError = (e) => {
    e.target.src = placeholderProfilePic; // Replace with your placeholder image URL
  };

  const handleAllowUser = async () => {
    setIsLoading(true)
    try {
      
      const response = await service.patch(`/profile/${userId}/user-role-validation`)
      setUser(response.data) // the updated user
      setTimeout(() => setIsLoading(false), 700)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  const { username, email, profilePic, fullName, phoneCode, phoneNumber, createdAt, role } = user

  return (
    <Container maxWidth="xs">
      
      <Card>
        <CardHeader
          title={username}
          subheader={capitalizeAll(fullName)}
        />
        <CardMedia 
          component="img"
          height="250px" 
          image={profilePic || placeholderProfilePic} 
          onError={handleImageError}
        />
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

    </Container>
  )
}

export default Profile