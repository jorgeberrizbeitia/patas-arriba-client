import Avatar from "@mui/material/Avatar"
import CardHeader from "@mui/material/CardHeader"
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import IconButton from '@mui/material/IconButton'
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography'
import UserIcon from "./UserIcon";


function UserCard({attendee}) {

  const navigate = useNavigate()
  console.log(attendee)
  const { user } = attendee
  const { _id, username, role } = user

  const color = role === "admin" ? "warning.main" : (role === "pending" ? "error.main" : "success")

  return (
    <Card sx={{bgcolor: "gray.lighter", width:"100%"}}>
      <CardHeader 
      avatar={
        <UserIcon user={user} size="small"/>
      }
      title={username}
      subheader={<Typography variant="caption" color={color}>{role}</Typography>}
      action={<IconButton onClick={() => navigate(`/user/${_id}`)}>
        <ReadMoreIcon />
        <Typography variant="icon">Ver más</Typography>
      </IconButton>}
      />
    </Card>
  )
}

export default UserCard