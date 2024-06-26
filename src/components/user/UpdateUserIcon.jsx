import { useContext, useState } from 'react'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton'
import service from '@service/config'
import { AuthContext } from '@context/auth.context'

import icons from '@utils/icons'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'


function UpdateUserIcon({setPropertyToEdit}) {

  const navigate = useNavigate()

  const { loggedUser, setLoggedUser } = useContext(AuthContext)
  const [ icon, setIcon ] = useState(loggedUser.icon) 
  const [ iconColor, setIconColor ] = useState(loggedUser.iconColor)
  const [ isUpdating, setIsUpdating ] = useState(false)

  const handleSubmit = async () => {
    setIsUpdating(true)

    try {
      
      const response = await service.patch("/user/icon", { icon, iconColor })
        
      setLoggedUser(response.data)
      setPropertyToEdit(null)
      setIsUpdating(false)

    } catch (error) {
      navigate("/server-error")
    }

  }

  return (
    <>

    <Box 
      bgcolor={iconColor} 
      borderRadius="50%" 
      width={50} 
      height={50} 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
    >
      <img src={icon} alt={`icono-de-perfil`} width={25} height={25} />
    </Box>

    <Typography variant="caption" color="initial">Vista previa</Typography>
    {/* //todo change preview to component UserIcon */}

      <TextField
        select
        label="Selecciona un icono"
        fullWidth
        onChange={(e) => setIcon(e.target.value)} 
        size="small"
        sx={{m: 1}}
      >
        {icons.map((eachIcon, i) => {
          return <MenuItem key={i} value={eachIcon}>
            <img src={eachIcon} alt={`Icon ${i}`} width="24px" height="24px" />
          </MenuItem>
        })}
      </TextField>

      <TextField
        label="Selecciona un color"
        type="color"
        fullWidth
        sx={{m: 1}}
        value={iconColor}
        size="small"
        onChange={(e) => setIconColor(e.target.value)}
      />

      <Box>
        <IconButton color={"success"} onClick={handleSubmit} disabled={isUpdating}>
          <CheckIcon />
          <Typography variant="icon">aceptar</Typography>
        </IconButton>
        <IconButton color={"error"} onClick={() => setPropertyToEdit(null)} disabled={isUpdating}>
          <CloseIcon />
          <Typography variant="icon">cancelar</Typography>
        </IconButton>
      </Box>

    </>
  )
}

export default UpdateUserIcon