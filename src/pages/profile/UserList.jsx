import ProfileCard from '@components/profile/ProfileCard'
import Loading from '@components/ui/Loading'
import Container from '@mui/material/Container'
import service from '@service/config'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'

function UserList() {

  const [ users, setUsers ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = async () => {

    try {
      
      const response = await service.get("/profile")
      setUsers(response.data)
      setTimeout(() => setIsLoading(false), 700)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  const pendingUsers = users
  .filter((eachUser) => eachUser.role === "pending")
  .map((eachUser) => <ProfileCard key={eachUser._id} profile={eachUser}/>)

  const allowedUsers = users
  .filter((eachUser) => eachUser.role !== "pending")
  .map((eachUser) => <ProfileCard key={eachUser._id} profile={eachUser}/>)

  return (
    <Container maxWidth="xs">

      
      {pendingUsers.length > 0 && <>
        <Typography variant="h1" gutterBottom>Por aprobación</Typography>
        {pendingUsers}
        <hr />
      </>}


      <Typography variant="h1" gutterBottom>Usuarios</Typography>
      
      {allowedUsers}

    </Container>
  )
}

export default UserList