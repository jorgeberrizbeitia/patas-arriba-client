import { useContext, useState } from "react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AuthContext } from "../../context/auth.context";
import capitalizeAll from "@utils/capitalizeAll";
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import UpdateSingleField from "@components/user/UpdateSingleField";
import UpdateUserIcon from "@components/user/UpdateUserIcon";
import UserIcon from "@components/user/UserIcon";
import Alert from "@mui/material/Alert";
import formatDate from "@utils/formatDate.js"
import NotificationSettings from "@components/user/NotificationSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "@utils/useLogout";

function OwnUserDetails() {

  const { loggedUser } = useContext(AuthContext)
  const { isOrganizerOrAdmin } = useContext(AuthContext)

  const [propertyToEdit, setPropertyToEdit] = useState(null)
  const logout = useLogout()

  const { email, username, fullName, phoneCode, phoneNumber, createdAt } = loggedUser

  return (
    <>

      {/* Compact header: avatar + identity side by side, so the editable
          fields land above the fold instead of below a 200px portrait. */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%", textAlign: "start", mt: 2 }}>
        <UserIcon size="medium" user={loggedUser}/>
        <Box>
          <Typography variant="h3">{username}</Typography>
          <Typography variant="body2" color="text.secondary">{capitalizeAll(fullName)}</Typography>
          <Button size="small" variant="text" startIcon={<EditIcon />} onClick={() => setPropertyToEdit("icon")}>
            Cambiar imagen
          </Button>
        </Box>
      </Box>

      {propertyToEdit === "icon" && <UpdateUserIcon setPropertyToEdit={setPropertyToEdit} />}

      <hr />

      <Typography variant="body1" gutterBottom>
        <span>Usuario: </span>
        <span>{username}</span>
        <IconButton aria-label="Cambiar usuario" color="primary" onClick={() => setPropertyToEdit("username")}>
          <EditIcon />
          <Typography variant="icon">Cambiar</Typography>
        </IconButton>
        { propertyToEdit === "username" && <>
          <UpdateSingleField
            value={username}
            setPropertyToEdit={setPropertyToEdit}
            propertyToEdit={propertyToEdit}
          />
        </>}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <span>Nombre: </span>
        <span>{capitalizeAll(fullName)}</span>
        <IconButton aria-label="Cambiar nombre" color="primary" onClick={() => setPropertyToEdit("fullName")}>
          <EditIcon />
          <Typography variant="icon">Cambiar</Typography>
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
        <span>Usuario desde: </span>
        <span>{formatDate(createdAt, "member-since")}</span>
      </Typography>

      <hr/>
      <NotificationSettings/>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        startIcon={<LogoutIcon />}
        onClick={logout}
        sx={{ mt: 3 }}
      >
        Cerrar Sesión
      </Button>
    </>
  )
}

export default OwnUserDetails
