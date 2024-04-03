import { useContext, useEffect, useState } from "react"
import Loading from "@components/ui/Loading"
import service from "@service/config"

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../../context/auth.context";
import capitalizeAll from "@utils/capitalizeAll";
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import UpdateSingleField from "@components/profile/UpdateSingleField";

function OwnProfile() {

  const { ownProfile } = useContext(AuthContext)

  const [propertyToEdit, setPropertyToEdit] = useState(null)

  const { email, profilePic, username, fullName, phoneCode, phoneNumber, createdAt } = ownProfile

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Profile Picture */}
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <Avatar src={profilePic} alt={username} sx={{ width: 200, height: 200 }} />
          </Box>
        </Grid>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>

          <Typography variant="h5" gutterBottom>
            <span>Correo: </span>
            <span>{email}</span>
          </Typography>

          <Typography variant="h4" gutterBottom>
            <span>Usuario: </span>
            <span>{username}</span>
            <IconButton color={"warning"} onClick={() => setPropertyToEdit("username")}>
              <EditIcon />
            </IconButton>
            { propertyToEdit === "username" && <>
              <UpdateSingleField 
                value={username} 
                setPropertyToEdit={setPropertyToEdit} 
                propertyToEdit={propertyToEdit} 
              />
            </>}
          </Typography>

          <hr />

          <Typography variant="h3" gutterBottom>
            <span>Nombre: </span>
            <span>{capitalizeAll(fullName)}</span>
            <IconButton color={"warning"} onClick={() => setPropertyToEdit("fullName")}>
              <EditIcon />
            </IconButton>
            { propertyToEdit === "fullName" && <>
              <UpdateSingleField 
                value={fullName} 
                setPropertyToEdit={setPropertyToEdit} 
                propertyToEdit={propertyToEdit} 
              />
            </>}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <span>Telefono: </span>
            <span>+{phoneCode} {phoneNumber}</span>
          </Typography>

          <Typography variant="body1">
            <span>Desde: </span>
            <span>{new Date(createdAt).toDateString()}</span>
          </Typography>

        </Grid>
      </Grid>
    </Box>
  )
}

export default OwnProfile