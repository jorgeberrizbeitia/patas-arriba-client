import { useNavigate } from 'react-router-dom'
import service from '@service/config'

// MUI Componentes
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

function CarGroupDelete({carGroup}) {

  const navigate = useNavigate()

  const handleDelete = async () => {

    try {
      
      await service.delete(`/car-group/${carGroup._id}`)
      navigate(`/event/${carGroup.event._id}`)

    } catch (error) {
      navigate("/server-error")
    }

  }

  if (carGroup.event.status === "closed") {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
  
        <Alert severity='error'>No puedes borrar este grupo de coche porque el evento ha sido cerrado. Si ya no puedes ir al evento o no puedes llevar el coche contacta a un admin para que te ayude a borrarlo e indicar a los pasajeros apuntados.</Alert>
  
      </Box>
    )
  }

  if (carGroup.event.status === "open" || carGroup.event.status === "cancelled") {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
  
        <Alert severity='error'>Al borrar el grupo de coche se eliminarán tambien todos los mensajes creados. Todos los pasajeros quedarán sin grupo de coche y tendrán que buscar uno nuevo</Alert>
  
        <Alert severity='error' sx={{mt: 2}}>
          <Typography variant="body2" color="error">Estas seguro que quieres eliminar el Grupo de Coche?</Typography>
          <Button 
            onClick={handleDelete} 
            variant="contained" 
            color="error" 
            sx={{mt: 2}} 
          >Si, eliminalo!
          </Button>
        </Alert>
  
      </Box>
    )
  }
}

export default CarGroupDelete