import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@context/auth.context';
import service from '@service/config';

// MUI Components
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function CarGroupActions({carGroup}) {

  const navigate = useNavigate()

  const { loggedUserId } = useContext(AuthContext)
  const [ areYouSure, setAreYouSure ] = useState(null)

  const handleLeaveCarGroup = async () => {
    
    try {
      
      service.patch(`/car-group/${carGroup._id}/leave`)
      navigate(`/event/${carGroup.event._id}`)

    } catch (error) {
      navigate("/server-error")
    }

  }

  return (
    <CardActions sx={{ display: "flex", flexDirection: "column", pl: 0}}>

      {loggedUserId == carGroup.owner._id 
        ? 
        <>
          <Box sx={{width:"100%", display: "flex", justifyContent: "space-evenly"}}>
            <IconButton color="warning" onClick={() => navigate(`/car-group/${carGroup._id}/edit`)}>
              <EditIcon />
              <Typography variant="caption">Editar</Typography>
            </IconButton> 
          </Box>
        </> 
        :
        <>
          <Box sx={{width:"100%", display: "flex", justifyContent: "space-evenly"}}>
            {/* <IconButton color="warning">
              <ChangeCircleIcon />
              <Typography variant="caption">Cambiar</Typography>
            </IconButton>  */}
            {/* //todo not yet implemented */}
            <IconButton color="error"onClick={() => setAreYouSure("exit")}>
              <ExitToAppIcon/>
              <Typography variant="caption">Salir</Typography>
            </IconButton> 
          </Box>
          {areYouSure === "exit" && 
            <>
              <Alert severity='error'>
                <Typography variant="caption" color="error">
                  Estas seguro que deseas salir de este grupo de coche?
                </Typography>
                <Box sx={{width:"100%", display: "flex", justifyContent: "space-evenly"}}>
                  {/* //todo asignar width and heigth a todos los IconButtons para que sean redondos */}
                  <IconButton color="error" onClick={handleLeaveCarGroup}>
                    <CheckIcon />
                    <Typography variant="caption">Si</Typography>
                  </IconButton> 
                  <IconButton color="none" onClick={() => setAreYouSure(null)}>
                    <CloseIcon/>
                    <Typography variant="caption">No</Typography>
                  </IconButton> 
                </Box>
              </Alert>
            </>
          }
        </> 
      }

      
    </CardActions>
  )
}

export default CarGroupActions