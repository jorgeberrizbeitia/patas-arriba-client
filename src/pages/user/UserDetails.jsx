import Loading from '@components/ui/Loading'
import Button from '@mui/material/Button'
import service from '@service/config'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import capitalizeAll from '@utils/capitalizeAll'
import Typography from '@mui/material/Typography'
import { AuthContext } from '@context/auth.context'
import UserIcon from '@components/user/UserIcon'
import GoBack from '@components/navigation/GoBack'
import formatDate from '@utils/formatDate'

function UserDetails() {

  const { loggedUserRole } = useContext(AuthContext)
  const { userId } = useParams()
  const navigate = useNavigate()

  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = async () => {
    try {
      const response = await service.get(`/user/${userId}`)
      setUser(response.data)
      setIsLoading(false)
    } catch (error) {
      navigate("/server-error")
    }
  }

  const handleAllowUser = async () => {
    setIsLoading(true)
    try {
      const response = await service.patch(`/user/${userId}/user-role-validation`)
      setUser(response.data) //* the updated user
      setIsLoading(false)
    } catch (error) {
      navigate("/server-error")
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
          avatar={<UserIcon user={user}/>}
          title={username}
          subheader={capitalizeAll(fullName)}
        />

        <hr />

        <CardContent sx={{display: "flex", flexDirection: "column"}}>
          <Typography variant="body">
            +{phoneCode} {phoneNumber}
          </Typography>
          {role === "admin" && <Typography variant="body" color="warning.main">
            Este usuario es admin
          </Typography>}
          <Typography variant="body">
            Desde: {formatDate(createdAt)}
          </Typography>

          <hr />
          {loggedUserRole === "admin" && <>

            {role === "pending" ? 
              <>
                <Typography variant="h5" color="error.main" gutterBottom>
                  Pendiente por permiso
                </Typography>
                <Button variant="contained" onClick={handleAllowUser}>
                  Permitir acceso a la página
                </Button>
              </> : <>
                <Typography variant="h5" color="success.main">
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