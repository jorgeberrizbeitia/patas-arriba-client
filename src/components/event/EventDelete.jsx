import { useNavigate } from 'react-router-dom'
import service from '@service/config'

// MUI Componentes
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import formatDate from "@utils/formatDate.js"


function EventDelete({event}) {

  const navigate = useNavigate()

  const handleDelete = async () => {

    try {
      
      await service.delete(`/event/${event._id}`)
      navigate(`/`)

    } catch (error) {
      navigate("/server-error")
    }

  }

  return (
    <>

      <Alert sx={{width: "100%", mb: 2}} severity='error'>Solo borrar si el evento fue creado por error. Al eliminar el evento se eliminará permanentemente toda la información del evento, incluyendo grupos de coche y mensajes</Alert>

      <Alert sx={{width: "100%", mb: 2}} severity='warning'>Si el evento fue cancelado, considerar cambiar el estado a cancelado</Alert>

      <Alert sx={{width: "100%", mb: 2}} severity='error'>
        <Typography variant="body2" color="error">
          Estas seguro que quieres eliminar el evento
          <Typography variant="span" fontWeight="bold"> {event.title} </Typography>
          de fecha 
          <Typography variant="span" fontWeight="bold"> {formatDate(event.date, "event")}</Typography>
          ?
        </Typography>
        <Button onClick={handleDelete} variant="contained" color="error" sx={{my: 2}}>
          Si, ¡eliminalo!
        </Button>
      </Alert>

    </>
  )
}

export default EventDelete