import { useContext, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../../context/auth.context";
import capitalizeAll from "@utils/capitalizeAll";
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import UpdateSingleField from "@components/user/UpdateSingleField";
import UpdateUserIcon from "@components/user/UpdateUserIcon";
import UserIcon from "@components/user/UserIcon";
import GoBack from "@components/navigation/GoBack";
import Alert from "@mui/material/Alert";


function OwnUserDetails() {

  const { loggedUser } = useContext(AuthContext)

  const [propertyToEdit, setPropertyToEdit] = useState(null)

  const { email, username, fullName, phoneCode, phoneNumber, createdAt } = loggedUser

  return (
    <>

      <GoBack to={-1}/>

      <UserIcon size="big" user={loggedUser}/>

      <IconButton size="small" color={"warning"} onClick={() => setPropertyToEdit("icon")}>
        <EditIcon />
        <Typography variant="caption" color="main">Cambiar imagen</Typography>
      </IconButton>

      {/* //todo edit icon at the top right of the picture */}
      {propertyToEdit === "icon" && <UpdateUserIcon setPropertyToEdit={setPropertyToEdit} />}

      <hr />

      <Typography variant="h4" gutterBottom>
        <span>Usuario: </span>
        <span>{username}</span>
        <IconButton color={"warning"} onClick={() => setPropertyToEdit("username")}>
          <EditIcon />
          <Typography variant="caption" color="main">Cambiar</Typography>
        </IconButton>
        { propertyToEdit === "username" && <>
          <UpdateSingleField 
            value={username} 
            setPropertyToEdit={setPropertyToEdit} 
            propertyToEdit={propertyToEdit} 
          />
        </>}
      </Typography>

      <Typography variant="h4" gutterBottom>
        <span>Nombre: </span>
        <span>{capitalizeAll(fullName)}</span>
        <IconButton color={"warning"} onClick={() => setPropertyToEdit("fullName")}>
          <EditIcon />
          <Typography variant="caption" color="main">Cambiar</Typography>
        </IconButton>
        { propertyToEdit === "fullName" && <>
          <UpdateSingleField 
            value={fullName} 
            setPropertyToEdit={setPropertyToEdit} 
            propertyToEdit={propertyToEdit} 
          />
        </>}
      </Typography>

      <hr />

      <Typography variant="h5" gutterBottom>
        <span>Correo: </span>
        <span>{email}</span>
        {/* //todo update email  */}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <span>Teléfono: </span>
        <span>+{phoneCode} {phoneNumber}</span>
        {/* //todo update phone number  */}
      </Typography>

      <Alert severity="info">Si necesitas modificar tu correo electrónico o número telefónico, contacta a un administrador</Alert>

      <hr />

      <Typography variant="body1">
        <span>Desde: </span>
        <span>{new Date(createdAt).toDateString()}</span>
      </Typography>
    </>
  )
}

export default OwnUserDetails