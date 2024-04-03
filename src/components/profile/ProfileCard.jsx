import Avatar from "@mui/material/Avatar"
import CardHeader from "@mui/material/CardHeader"
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import IconButton from '@mui/material/IconButton'
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography'


function ProfileCard({profile}) {

  const navigate = useNavigate()

  const { profilePic, username, role, _id } = profile

  const color = role === "admin" ? "warning.main" : (role === "pending" ? "error.main" : "success")

  return <Card raised>
      <CardHeader 
      avatar={
        <Avatar src={profilePic} alt="foto-perfil"/>
      }
      title={username}
      subheader={<Typography variant="caption" color={color}>{role}</Typography>}
      action={<IconButton onClick={() => navigate(`/profile/${_id}`)}>
        <ReadMoreIcon />
        <Typography variant="icon">Ver más</Typography>
      </IconButton>}
    />
  </Card>
}

export default ProfileCard