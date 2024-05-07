import Avatar from "@mui/material/Avatar"
import CardHeader from "@mui/material/CardHeader"
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import IconButton from '@mui/material/IconButton'
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography'
import UserIcon from "./UserIcon";
import { useContext } from "react";
import { AuthContext } from "@context/auth.context.jsx"


function UserCard({user}) {

  const navigate = useNavigate()
  const { _id, username, role } = user
  const { loggedUserId } = useContext(AuthContext)

  const color = role === "admin" ? "warning.main" : (role === "pending" ? "error.main" : "success")

  return (
    <Card sx={{bgcolor: "gray.transparent", width:"100%"}}>
      <CardHeader 
      avatar={
        <UserIcon user={user} size="small"/>
      }
      title={<Typography variant="body2">
        <Typography variant="span">{user.username}</Typography>
        <Typography variant="span" color={"success.main"}>{user._id == loggedUserId && " (tú)"}</Typography>
      </Typography>}
      subheader={<Typography variant="caption" color={color}>{role}</Typography>}
      action={<IconButton onClick={() => navigate(`/user/${_id}`)}>
        <ReadMoreIcon />
        <Typography variant="icon">Ver info</Typography>
      </IconButton>}
      />
    </Card>
  )
}

export default UserCard