import UserCard from '@components/user/UserCard'
import Loading from '@components/ui/Loading'
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
      
      const response = await service.get("/user")
      console.log(response.data)
      setUsers(response.data)
      setIsLoading(false)

    } catch (error) {
      console.log(error)
    }

  }

  if (isLoading) {
    return <Loading />
  }

  const pendingUsers = users
  .filter((eachUser) => eachUser.role === "pending")
  .map((eachUser) => <UserCard key={eachUser._id} user={eachUser}/>)

  const allowedUsers = users
  .filter((eachUser) => eachUser.role !== "pending")
  .map((eachUser) => <UserCard key={eachUser._id} user={eachUser}/>)

  return (
    <>

      <hr style={{maxWidth:"initial"}} />
      {/* //* this will make the hr longer than the mui Container */}
      
      {pendingUsers.length > 0 && <>
        <Typography variant="h1" gutterBottom>Por aprobación</Typography>
        {pendingUsers}
        <hr />
      </>}


      <Typography variant="h1" gutterBottom>Usuarios</Typography>
      
      {allowedUsers}

    </>
  )
}

export default UserList