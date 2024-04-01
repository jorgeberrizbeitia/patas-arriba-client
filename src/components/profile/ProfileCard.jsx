import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import capitalizeAll from "@utils/capitalizeAll"
import CardHeader from "@mui/material/CardHeader"

function ProfileCard({profile}) {

  const { profilePic, firstName, lastName, phoneCode, phoneNumber } = profile

  return <CardHeader 
  avatar={
    <Avatar src={profilePic} alt="foto-perfil"/>
  }
  title={`${capitalizeAll(firstName)} ${capitalizeAll(lastName)}`}
  subheader={`${phoneCode} ${phoneNumber}`}
  />
}

export default ProfileCard